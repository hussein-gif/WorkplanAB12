import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../supabaseClient';
import {
  TopBar,
  EmptyState as Empty,
  formatDate,
  Job,
  slugify,
} from '../shared';
import { Pencil, Trash2, Plus, Globe, EyeOff } from 'lucide-react';

export default function JobsSection() {
  const [items, setItems] = useState<Job[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal/form state
  const [open, setOpen] = useState(false);
  const empty: Partial<Job> & any = {
    // Befintliga fält
    title: '',
    location: '',
    employment_type: '', // mappar till "omfattning" i publik sida
    description_md: '',
    salary_min: null,
    salary_max: null,
    slug: '',
    published: false,
    posted_at: new Date().toISOString(),
    expires_at: null,
    // 🔽 Nya fält för att matcha JobDetailPage
    company: '',
    companyLogo: '',
    summary: '',
    aboutRole: '',
    responsibilitiesText: '', // textarea som radbryts → responsibilities[]
    requirementsText: '',     // textarea som radbryts → requirements[]
    recruitmentProcess: '',
    recruiterEmail: '',
    recruiterPhone: '',
    industry: '',
    salary: '',               // fri text (ersätter min/max om du vill visa exakt text)
    startDate: '',            // valfri (JobDetailPage fallback: "Enligt överenskommelse")
  };
  const [form, setForm] = useState<Partial<Job> & any>(empty);
  const [saving, setSaving] = useState(false);

  async function fetchJobs() {
    setLoading(true);
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('posted_at', { ascending: false });
    if (!error) setItems((data ?? []) as Job[]);
    setLoading(false);
  }
  useEffect(() => { fetchJobs(); }, []);

  const filtered = useMemo(() => {
    const ql = q.toLowerCase();
    return items.filter(j =>
      [j.title, j.location ?? '', j.employment_type ?? '', (j as any).slug ?? '']
        .join(' ')
        .toLowerCase()
        .includes(ql)
    );
  }, [items, q]);

  function openNew() {
    setForm(empty);
    setOpen(true);
  }
  function openEdit(j: Job) {
    // Hydrera textarea-fälten från ev. lagrade arrays
    const jAny: any = j || {};
    setForm({
      ...jAny,
      responsibilitiesText: Array.isArray(jAny.responsibilities) ? jAny.responsibilities.join('\n') : (jAny.responsibilitiesText ?? ''),
      requirementsText: Array.isArray(jAny.requirements) ? jAny.requirements.join('\n') : (jAny.requirementsText ?? ''),
    });
    setOpen(true);
  }

  function requiredMissing() {
    const must: Array<[string, string]> = [
      ['title', 'Titel'],
      ['company', 'Företag'],
      ['location', 'Plats'],
      ['employment_type', 'Omfattning'],
      ['summary', 'Kort säljtext'],
      ['aboutRole', 'Om rollen'],
      ['responsibilitiesText', 'Arbetsuppgifter'],
      ['requirementsText', 'Vem vi söker'],
      ['recruitmentProcess', 'Vår rekryteringsprocess'],
      ['recruiterEmail', 'Rekryterarens e-post'],
      ['recruiterPhone', 'Rekryterarens telefon'],
      ['industry', 'Bransch'],
      ['salary', 'Lön (text)'],
    ];
    const missing = must.filter(([k]) => {
      const v = (form as any)[k];
      if (typeof v === 'string') return v.trim().length === 0;
      return v === null || v === undefined;
    });
    return missing.map(([, label]) => label);
  }

  function toArrayLines(s: string): string[] {
    return (s || '')
      .split('\n')
      .map(x => x.trim())
      .filter(Boolean);
  }

  async function saveJob(e?: React.FormEvent) {
    e?.preventDefault?.();

    // Hårdvalidera obligatoriska fält
    const missing = requiredMissing();
    if (missing.length) {
      alert('Följande fält måste fyllas i:\n• ' + missing.join('\n• '));
      return;
    }

    setSaving(true);

    // Bygg rad – bibehåll befintliga kolumner + lägg till nya fält
    const responsibilities = toArrayLines(form.responsibilitiesText);
    const requirements = toArrayLines(form.requirementsText);

    const row: any = {
      ...form,
      // slug: generera om tom
      slug: (form.slug && form.slug.trim().length > 0) ? form.slug.trim() : slugify(form.title!),

      // Säkerställ att dessa är strängar
      title: String(form.title || '').trim(),
      location: String(form.location || '').trim(),
      employment_type: String(form.employment_type || '').trim(), // "Heltid", "Deltid", etc.

      // Nya fält som JobDetailPage läser
      company: String(form.company || '').trim(),
      companyLogo: String(form.companyLogo || '').trim() || null,
      summary: String(form.summary || '').trim(),
      aboutRole: String(form.aboutRole || '').trim(),
      responsibilities, // jsonb[]
      requirements,     // jsonb[]
      recruitmentProcess: String(form.recruitmentProcess || '').trim(),
      recruiterEmail: String(form.recruiterEmail || '').trim(),
      recruiterPhone: String(form.recruiterPhone || '').trim(),
      industry: String(form.industry || '').trim(),
      salary: String(form.salary || '').trim(),
      startDate: String(form.startDate || '').trim() || null,

      // Städning av textarea-proxy-fält (sparas ej som egna kolumner)
      responsibilitiesText: undefined,
      requirementsText: undefined,
    };

    const { error } = await supabase
      .from('jobs')
      .upsert(row, { onConflict: 'slug' });

    setSaving(false);
    if (error) return alert('Kunde inte spara: ' + error.message);

    setOpen(false);
    setForm(empty);
    await fetchJobs();
  }

  async function togglePublished(j: Job) {
    const { error } = await supabase
      .from('jobs')
      .update({ published: !j.published })
      .eq('id', j.id);
    if (error) return alert('Kunde inte uppdatera: ' + error.message);
    setItems(prev => prev.map(x => x.id === j.id ? { ...x, published: !x.published } : x));
  }

  async function removeJob(j: Job) {
    if (!confirm(`Ta bort jobbet "${j.title}"?`)) return;
    const { error } = await supabase.from('jobs').delete().eq('id', j.id);
    if (error) return alert('Kunde inte ta bort: ' + error.message);
    setItems(prev => prev.filter(x => x.id !== j.id));
  }

  return (
    <div>
      <TopBar
        title="Jobb"
        q={q}
        setQ={setQ}
        right={
          <>
            <button onClick={fetchJobs} className="border rounded-lg px-3 py-2">Uppdatera</button>
            <button
              onClick={openNew}
              className="ml-2 inline-flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-900 text-white"
            >
              <Plus className="w-4 h-4" /> Nytt jobb
            </button>
          </>
        }
      />

      {loading ? (
        <div className="p-8 text-gray-500">Laddar…</div>
      ) : filtered.length === 0 ? (
        <Empty title="Inga jobb" hint="Klicka på ”Nytt jobb” för att skapa ett." />
      ) : (
        <div className="overflow-x-auto border rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Titel</th>
                <th className="px-4 py-3 text-left">Ort</th>
                <th className="px-4 py-3 text-left">Anställning</th>
                <th className="px-4 py-3 text-left">Publicerad</th>
                <th className="px-4 py-3 text-left">Publicerad datum</th>
                <th className="px-4 py-3 text-left">Går ut</th>
                <th className="px-4 py-3 text-left">Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(j => (
                <tr key={j.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{j.title}</td>
                  <td className="px-4 py-3">{j.location ?? '—'}</td>
                  <td className="px-4 py-3">{j.employment_type ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${
                        j.published
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {j.published ? 'Ja' : 'Nej'}
                    </span>
                  </td>
                  <td className="px-4 py-3">{formatDate(j.posted_at)}</td>
                  <td className="px-4 py-3">{j.expires_at ? formatDate(j.expires_at) : '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        className="border rounded-lg px-2 py-1 inline-flex items-center gap-1"
                        onClick={() => openEdit(j)}
                      >
                        <Pencil className="w-4 h-4" /> Redigera
                      </button>
                      <button
                        className={`border rounded-lg px-2 py-1 inline-flex items-center gap-1 ${
                          j.published ? '' : 'bg-gray-900 text-white'
                        }`}
                        onClick={() => togglePublished(j)}
                        title={j.published ? 'Avpublicera' : 'Publicera'}
                      >
                        {j.published ? <EyeOff className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                        {j.published ? 'Avpublicera' : 'Publicera'}
                      </button>
                      <button
                        className="border rounded-lg px-2 py-1 inline-flex items-center gap-1 text-red-700"
                        onClick={() => removeJob(j)}
                      >
                        <Trash2 className="w-4 h-4" /> Ta bort
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: komplett formulär som matchar JobDetailPage */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
          <div className="w-[min(95vw,900px)] bg-white border rounded-2xl shadow-xl">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div className="text-lg font-semibold">{form.id ? 'Redigera jobb' : 'Nytt jobb'}</div>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">Stäng</button>
            </div>

            <form onSubmit={saveJob} className="p-5 space-y-6">
              {/* Grundinfo */}
              <div>
                <h3 className="text-base font-semibold mb-3">Grundinformation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Titel *</label>
                    <input
                      className="w-full border rounded-lg px-3 py-2"
                      value={form.title ?? ''}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Företag *</label>
                    <input
                      className="w-full border rounded-lg px-3 py-2"
                      value={form.company ?? ''}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Plats *</label>
                    <input
                      className="w-full border rounded-lg px-3 py-2"
                      value={form.location ?? ''}
                      onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Omfattning *</label>
                    <input
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Heltid, Deltid, Konsult…"
                      value={form.employment_type ?? ''}
                      onChange={e => setForm(f => ({ ...f, employment_type: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Startdatum (valfritt)</label>
                    <input
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enligt överenskommelse"
                      value={form.startDate ?? ''}
                      onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Slug (valfri)</label>
                    <input
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="automatisk om tomt"
                      value={form.slug ?? ''}
                      onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Sälj / introduktion */}
              <div>
                <h3 className="text-base font-semibold mb-3">Kort säljtext *</h3>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 min-h-[100px]"
                  value={form.summary ?? ''}
                  onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}
                  required
                />
              </div>

              {/* Om rollen */}
              <div>
                <h3 className="text-base font-semibold mb-3">Om rollen *</h3>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 min-h-[120px]"
                  value={form.aboutRole ?? ''}
                  onChange={e => setForm(f => ({ ...f, aboutRole: e.target.value }))}
                  required
                />
              </div>

              {/* Arbetsuppgifter / Vem vi söker */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-base font-semibold mb-3">Arbetsuppgifter *</h3>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 min-h-[160px]"
                    placeholder="En per rad…"
                    value={form.responsibilitiesText ?? ''}
                    onChange={e => setForm(f => ({ ...f, responsibilitiesText: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-3">Vem vi söker *</h3>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 min-h-[160px]"
                    placeholder="En per rad…"
                    value={form.requirementsText ?? ''}
                    onChange={e => setForm(f => ({ ...f, requirementsText: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Process */}
              <div>
                <h3 className="text-base font-semibold mb-3">Vår rekryteringsprocess *</h3>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 min-h-[100px]"
                  value={form.recruitmentProcess ?? ''}
                  onChange={e => setForm(f => ({ ...f, recruitmentProcess: e.target.value }))}
                  required
                />
              </div>

              {/* Kontakt */}
              <div>
                <h3 className="text-base font-semibold mb-3">Kontaktperson</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Rekryterarens e-post *</label>
                    <input
                      type="email"
                      className="w-full border rounded-lg px-3 py-2"
                      value={form.recruiterEmail ?? ''}
                      onChange={e => setForm(f => ({ ...f, recruiterEmail: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Rekryterarens telefon *</label>
                    <input
                      className="w-full border rounded-lg px-3 py-2"
                      value={form.recruiterPhone ?? ''}
                      onChange={e => setForm(f => ({ ...f, recruiterPhone: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Bransch, Lön, Logotyp */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Bransch *</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Lager & Logistik…"
                    value={form.industry ?? ''}
                    onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Lön (text) *</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Ex: Enl. kollektivavtal / 30–34 000 kr/mån"
                    value={form.salary ?? ''}
                    onChange={e => setForm(f => ({ ...f, salary: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Företagslogotyp (URL, valfri)</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="https://…"
                    value={form.companyLogo ?? ''}
                    onChange={e => setForm(f => ({ ...f, companyLogo: e.target.value }))}
                  />
                </div>
              </div>

              {/* Publicering + datum */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Publicerad datum *</label>
                  <input
                    type="datetime-local"
                    className="w-full border rounded-lg px-3 py-2"
                    value={form.posted_at ? new Date(form.posted_at).toISOString().slice(0,16) : ''}
                    onChange={e => setForm(f => ({ ...f, posted_at: new Date(e.target.value).toISOString() }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Går ut (valfritt)</label>
                  <input
                    type="datetime-local"
                    className="w-full border rounded-lg px-3 py-2"
                    value={form.expires_at ? new Date(form.expires_at).toISOString().slice(0,16) : ''}
                    onChange={e => setForm(f => ({ ...f, expires_at: e.target.value ? new Date(e.target.value).toISOString() : null }))}
                  />
                </div>
              </div>

              {/* Toggle publicerad + åtgärder */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!form.published}
                    onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                  />
                  <span className="text-sm text-gray-700">Publicerad</span>
                </label>

                <div className="flex items-center gap-3">
                  <button type="button" className="border rounded-lg px-4 py-2" onClick={() => setOpen(false)}>
                    Avbryt
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="border rounded-lg px-4 py-2 bg-gray-900 text-white disabled:opacity-60"
                  >
                    {saving ? 'Sparar…' : 'Spara'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

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

  // Helpers för datetime-local (lokal tid utan tidszons-förskjutning)
  const pad = (n: number) => String(n).padStart(2, '0');
  const toLocalInputValue = (iso?: string | null) => {
    if (!iso) return '';
    const d = new Date(iso);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };
  const nowLocalInput = () => {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };
  // Konvertera en lokal "YYYY-MM-DDTHH:mm" till ISO så att lagrat UTC matchar valt klockslag
  const fromLocalInputPreserveWallTime = (localStr: string) => {
    const d = new Date(localStr); // tolkas som lokal
    const corrected = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return corrected.toISOString();
  };

  // Modal/form state
  const [open, setOpen] = useState(false);
  const empty: Partial<Job> & any = {
    // Befintliga fält
    id: undefined,
    title: '',
    location: '',
    employment_type: '', // mappar till "omfattning" i publik sida
    description_md: '',
    salary_min: null,
    salary_max: null,
    // slug: tas alltid fram automatiskt vid save
    published: false,
    posted_at: new Date().toISOString(),
    expires_at: null,
    // 🔽 Fält som JobDetailPage nyttjar
    company: '',
    companyLogo: '',        // <- vi använder camelCase i formuläret, mappar till company_logo vid save
    summary: '',
    aboutRole: '',
    responsibilitiesText: '', // textarea som radbryts → responsibilities[]
    requirementsText: '',     // textarea som radbryts → requirements[]
    recruitmentProcess: '',
    recruiterEmail: '',
    // recruiterPhone: borttagen
    industry: '',
    // salary: BORTTAGET från formuläret och sparlogiken
    startDate: '',            // valfri (mappar till start_date)
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
    // Hydrera textarea-fälten från ev. lagrade arrays + mappa snake_case → camelCase
    const jAny: any = j || {};
    setForm({
      ...empty,
      ...jAny,
      // mappa snake_case till formfält vi använder i UI
      companyLogo: jAny.companyLogo ?? jAny.company_logo ?? '',
      aboutRole: jAny.aboutRole ?? jAny.about_role ?? '',
      recruitmentProcess: jAny.recruitmentProcess ?? jAny.recruitment_process ?? '',
      recruiterEmail: jAny.recruiterEmail ?? jAny.recruiter_email ?? '',
      startDate: jAny.startDate ?? jAny.start_date ?? '',
      responsibilitiesText: Array.isArray(jAny.responsibilities)
        ? jAny.responsibilities.join('\n')
        : (jAny.responsibilitiesText ?? ''),
      requirementsText: Array.isArray(jAny.requirements)
        ? jAny.requirements.join('\n')
        : (jAny.requirementsText ?? ''),
    });
    setOpen(true);
  }

  function requiredMissing() {
    // ❗ Justerad: slug tas alltid automatiskt, recruiterPhone borttagen, salary ej obligatorisk och BORTTAGEN
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
      ['industry', 'Bransch'],
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

  // enkel URL-koll
  const normalizeLogoUrl = (val?: string | null) => {
    const v = (val ?? '').trim();
    if (!v) return null;
    if (/^https?:\/\//i.test(v)) return v;
    return null; // spara som null om det inte ser ut som en riktig URL
  };

  async function saveJob(e?: React.FormEvent) {
    e?.preventDefault?.();

    const missing = requiredMissing();
    if (missing.length) {
      alert('Följande fält måste fyllas i:\n• ' + missing.join('\n• '));
      return;
    }

    setSaving(true);

    const responsibilities = toArrayLines(form.responsibilitiesText);
    const requirements = toArrayLines(form.requirementsText);

    // ✅ Mappa camelCase → snake_case innan upsert (matchar DB-kolumner)
    // ⚠️ Salary helt borttagen – vi skriver inte över något salary-värde i DB.
    const row: any = {
      id: form.id,                                   // om redigering
      slug: slugify(form.title!),                    // slug alltid automatisk

      title: String(form.title || '').trim(),
      company: String(form.company || '').trim(),
      company_logo: normalizeLogoUrl(form.companyLogo), // ← spara som URL eller null
      location: String(form.location || '').trim(),
      industry: String(form.industry || '').trim(),
      employment_type: String(form.employment_type || '').trim(),
      start_date: String(form.startDate || '').trim() || null,     // ← snake_case

      summary: String(form.summary || '').trim(),
      about_role: String(form.aboutRole || '').trim(),             // ← snake_case
      responsibilities,                                            // jsonb[]
      requirements,                                                // jsonb[]
      recruitment_process: String(form.recruitmentProcess || '').trim(), // ← snake_case
      recruiter_email: String(form.recruiterEmail || '').trim(),         // ← snake_case
      // recruiter_phone: utelämnad (borttagen)

      // Publicering
      published: !!form.published,
      posted_at: form.posted_at,
      expires_at: form.expires_at ?? null,

      // Städa bort UI-hjälpfält (för säkerhets skull, men de ignoreras ändå av Supabase)
      responsibilitiesText: undefined,
      requirementsText: undefined,
      companyLogo: undefined,
      aboutRole: undefined,
      recruitmentProcess: undefined,
      recruiterEmail: undefined,
      startDate: undefined,
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

  // Hjälpare för min-värden & clamping
  const minPostedLocal = nowLocalInput();
  const minExpiresLocal = (() => {
    const now = nowLocalInput();
    const postedLocal = toLocalInputValue(form.posted_at);
    // ta den som ligger senast i tiden
    return postedLocal && postedLocal > now ? postedLocal : now;
  })();

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

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
          <div className="w-[min(95vw,900px)] bg-white border rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div className="text-lg font-semibold">{form.id ? 'Redigera jobb' : 'Nytt jobb'}</div>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">Stäng</button>
            </div>

            <div className="p-5 overflow-y-auto">
              <form onSubmit={saveJob} className="space-y-6">
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
                    {/* Slug-fältet borttaget */}
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
                    {/* Rekryterarens telefon borttagen */}
                  </div>
                </div>

                {/* Bransch, Logotyp (URL) – LÖN BORTTAGEN */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-sm text-gray-600 mb-1">Bransch *</label>
                    <input
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Lager & Logistik…"
                      value={form.industry ?? ''}
                      onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
                      required
                    />
                  </div>
                  {/* Lön-fältet borttaget */}
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">Företagslogotyp (URL, valfri)</label>
                    <input
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="https://…"
                      value={form.companyLogo ?? ''}
                      onChange={e => setForm(f => ({ ...f, companyLogo: e.target.value }))}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Klistra in en fullständig URL (börja med <code>http://</code> eller <code>https://</code>).
                    </p>
                  </div>
                </div>

                {/* Publicering + datum */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Publicerad datum *</label>
                    <input
                      type="datetime-local"
                      className="w-full border rounded-lg px-3 py-2"
                      value={toLocalInputValue(form.posted_at)}
                      min={minPostedLocal}
                      onChange={e => {
                        const v = e.target.value;
                        const clamped = v < minPostedLocal ? minPostedLocal : v;
                        setForm(f => ({ ...f, posted_at: fromLocalInputPreserveWallTime(clamped) }));
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Går ut (valfritt)</label>
                    <input
                      type="datetime-local"
                      className="w-full border rounded-lg px-3 py-2"
                      value={toLocalInputValue(form.expires_at)}
                      min={minExpiresLocal}
                      onChange={e => {
                        const v = e.target.value;
                        const clamped = v < minExpiresLocal ? minExpiresLocal : v;
                        setForm(f => ({ ...f, expires_at: clamped ? fromLocalInputPreserveWallTime(clamped) : null }));
                      }}
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
            {/* /Scrollande innehåll */}
          </div>
        </div>
      )}
    </div>
  );
}

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
  const empty: Partial<Job> = {
    title: '',
    location: '',
    employment_type: '',
    description_md: '',
    salary_min: null,
    salary_max: null,
    slug: '',
    published: false,
    posted_at: new Date().toISOString(),
    expires_at: null,
  };
  const [form, setForm] = useState<Partial<Job>>(empty);
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
      [j.title, j.location ?? '', j.employment_type ?? '', j.slug ?? '']
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
    setForm({ ...j });
    setOpen(true);
  }

  async function saveJob(e?: React.FormEvent) {
    e?.preventDefault?.();
    if (!form.title || !form.posted_at) return;

    setSaving(true);
    const row = {
      ...form,
      slug: (form.slug && form.slug.trim().length > 0) ? form.slug.trim() : slugify(form.title!),
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

      {/* Enkel modal */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
          <div className="w-[min(95vw,720px)] bg-white border rounded-2xl shadow-xl">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div className="text-lg font-semibold">{form.id ? 'Redigera jobb' : 'Nytt jobb'}</div>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">Stäng</button>
            </div>

            <form onSubmit={saveJob} className="p-5 space-y-4">
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
                  <label className="block text-sm text-gray-600 mb-1">Ort</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2"
                    value={form.location ?? ''}
                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Anställningstyp</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Heltid, Deltid, Konsult…"
                    value={form.employment_type ?? ''}
                    onChange={e => setForm(f => ({ ...f, employment_type: e.target.value }))}
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

              <div>
                <label className="block text-sm text-gray-600 mb-1">Beskrivning (Markdown/HTML)</label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 min-h-[160px]"
                  value={form.description_md ?? ''}
                  onChange={e => setForm(f => ({ ...f, description_md: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Lön (min)</label>
                  <input
                    type="number"
                    className="w-full border rounded-lg px-3 py-2"
                    value={form.salary_min ?? ''}
                    onChange={e => setForm(f => ({ ...f, salary_min: e.target.value ? Number(e.target.value) : null }))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Lön (max)</label>
                  <input
                    type="number"
                    className="w-full border rounded-lg px-3 py-2"
                    value={form.salary_max ?? ''}
                    onChange={e => setForm(f => ({ ...f, salary_max: e.target.value ? Number(e.target.value) : null }))}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600">Publicerad</label>
                  <input
                    type="checkbox"
                    checked={!!form.published}
                    onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                  />
                </div>
              </div>

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

              <div className="flex items-center justify-end gap-3 pt-2">
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

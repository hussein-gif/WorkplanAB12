import React, { useEffect, useMemo, useState } from 'react';
import { adminSupabase as supabase } from '../../supabaseClient';

import {
  Application,
  TopBar,
  EmptyState as Empty,
  formatDate,
  badgeClass,
  APP_STATUSES,
} from '../shared';
import { Mail, Phone } from 'lucide-react';

export default function ApplicationsSection() {
  const [apps, setApps] = useState<Application[]>([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | Application['status']>('all');
  const [loading, setLoading] = useState(true);

  // NYTT: enkel modal-state för att visa personligt brev (befintlig)
  const [openLetter, setOpenLetter] = useState<string | null>(null);

  // NYTT: detaljmodal för en hel ansökan
  const [selected, setSelected] = useState<any | null>(null);

  async function fetchApps() {
    setLoading(true);
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setApps((data ?? []) as Application[]);
    setLoading(false);
  }
  useEffect(() => { fetchApps(); }, []);

  const filtered = useMemo(() => {
    const ql = q.toLowerCase();
    return apps.filter(a => {
      const blob = [a.full_name, a.email, (a as any).city, (a as any).role_applied]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const matchQ = blob.includes(ql);
      const matchS = status === 'all' ? true : a.status === status;
      return matchQ && matchS;
    });
  }, [apps, q, status]);

  async function updateStatus(id: string, s: Application['status']) {
    const { error } = await supabase.from('applications').update({ status: s }).eq('id', id);
    if (!error) {
      setApps(prev => prev.map(a => a.id === id ? { ...a, status: s } : a));
      // uppdatera även i detaljmodalen om den är öppen
      setSelected(prev => (prev && prev.id === id ? { ...prev, status: s } : prev));
    }
  }

  // Generisk öppnare för signerad fil-URL i privata bucketen "applications"
  async function openFile(path: string | null) {
    if (!path) return;
    const { data, error } = await supabase.storage.from('applications').createSignedUrl(path, 60);
    if (error) {
      alert('Kunde inte öppna filen: ' + error.message);
      return;
    }
    if (data?.signedUrl) window.open(data.signedUrl, '_blank');
  }

  // Hjälp för namn i detaljmodalen
  const getFullName = (a: any) =>
    a?.full_name ||
    [a?.first_name, a?.last_name].filter(Boolean).join(' ') ||
    '—';

  return (
    <div>
      <TopBar
        title="Ansökningar"
        q={q}
        setQ={setQ}
        right={
          <>
            <select
              className="border rounded-lg px-3 py-2"
              value={status}
              onChange={e => setStatus(e.target.value as any)}
            >
              <option value="all">Alla statusar</option>
              {APP_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <button onClick={fetchApps} className="border rounded-lg px-3 py-2">Uppdatera</button>
          </>
        }
      />

      {loading ? (
        <div className="p-8 text-gray-500">Laddar…</div>
      ) : filtered.length === 0 ? (
        <Empty title="Inga ansökningar" hint="Prova att justera filtren." />
      ) : (
        <div className="overflow-x-auto border rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Sökande</th>
                <th className="px-4 py-3 text-left">Kontakt</th>
                {/* Kolumnerna Ort och Roll borttagna */}
                <th className="px-4 py-3 text-left">Skickad</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">CV</th>
                <th className="px-4 py-3 text-left">Övrigt</th>
                <th className="px-4 py-3 text-left">Brev</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => {
                const otherPath = (a as any).other_path as string | null | undefined;
                const otherName = (a as any).other_name as string | null | undefined;
                const coverLetter = (a as any).cover_letter as string | null | undefined;

                return (
                  <tr
                    key={a.id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelected(a)} // NYTT: öppna detaljmodal
                  >
                    <td className="px-4 py-3 font-medium">{a.full_name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {a.email}</div>
                      {a.phone && (
                        <div className="flex items-center gap-2 text-gray-500">
                          <Phone className="w-4 h-4" /> {a.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">{formatDate(a.created_at)}</td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <select
                        className={`border rounded-lg px-2 py-1 ${badgeClass(a.status)}`}
                        value={a.status}
                        onChange={e => updateStatus(a.id, e.target.value as Application['status'])}
                      >
                        {APP_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      {a.cv_path ? (
                        <button className="underline" onClick={() => openFile(a.cv_path! as any)}>
                          Visa CV{(a as any).cv_name ? ` (${(a as any).cv_name})` : ''}
                        </button>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      {otherPath ? (
                        <button className="underline" onClick={() => openFile(otherPath)}>
                          Visa{otherName ? ` (${otherName})` : ' fil'}
                        </button>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      {coverLetter ? (
                        <button className="underline" onClick={() => setOpenLetter(coverLetter!)}>
                          Visa
                        </button>
                      ) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* NYTT: detaljmodal för hel ansökan */}
      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
          <div className="w-[min(95vw,800px)] bg-white border rounded-2xl shadow-xl">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div className="text-lg font-semibold">Ansökan</div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700">Stäng</button>
            </div>
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Sökande</div>
                  <div className="font-medium">{getFullName(selected)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Skickad</div>
                  <div>{formatDate(selected.created_at)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">E-post</div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a className="underline" href={`mailto:${selected.email}`}>{selected.email}</a>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Telefon</div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {selected.phone ? <a className="underline" href={`tel:${selected.phone}`}>{selected.phone}</a> : '—'}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Jobbtitel</div>
                  <div>{selected.job_title ?? '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Företag</div>
                  <div>{selected.company ?? '—'}</div>
                </div>

                <div className="md:col-span-2">
                  <div className="text-xs text-gray-500 mb-1">Status</div>
                  <select
                    className={`border rounded-lg px-2 py-1 ${badgeClass(selected.status)}`}
                    value={selected.status}
                    onChange={e => updateStatus(selected.id, e.target.value as Application['status'])}
                  >
                    {APP_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">CV</div>
                  {selected.cv_path ? (
                    <button
                      className="underline"
                      onClick={() => openFile(selected.cv_path)}
                    >
                      Visa CV{selected.cv_name ? ` (${selected.cv_name})` : ''}
                    </button>
                  ) : '—'}
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Övrig fil</div>
                  {selected.other_path ? (
                    <button
                      className="underline"
                      onClick={() => openFile(selected.other_path)}
                    >
                      Visa{selected.other_name ? ` (${selected.other_name})` : ' fil'}
                    </button>
                  ) : '—'}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Personligt brev</div>
                <div className="whitespace-pre-wrap text-sm text-gray-800 border rounded-lg p-3 bg-gray-50">
                  {selected.cover_letter ?? '—'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Befintlig modal för att visa personligt brev (lämnad kvar) */}
      {openLetter && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
          <div className="w-[min(95vw,700px)] bg-white border rounded-2xl shadow-xl">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div className="text-lg font-semibold">Personligt brev</div>
              <button onClick={() => setOpenLetter(null)} className="text-gray-500 hover:text-gray-700">Stäng</button>
            </div>
            <div className="p-5">
              <div className="whitespace-pre-wrap text-sm text-gray-800">
                {openLetter}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

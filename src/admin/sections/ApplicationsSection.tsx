import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../supabaseClient';
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

  // NYTT: enkel modal-state för att visa personligt brev
  const [openLetter, setOpenLetter] = useState<string | null>(null);

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
    if (!error) setApps(prev => prev.map(a => a.id === id ? { ...a, status: s } : a));
  }

  // NYTT: generisk öppnare för signerad fil-URL i privata bucketen "applications"
  async function openFile(path: string | null) {
    if (!path) return;
    const { data, error } = await supabase.storage.from('applications').createSignedUrl(path, 60);
    if (error) {
      alert('Kunde inte öppna filen: ' + error.message);
      return;
    }
    if (data?.signedUrl) window.open(data.signedUrl, '_blank');
  }

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
                <th className="px-4 py-3 text-left">Ort</th>
                <th className="px-4 py-3 text-left">Roll</th>
                <th className="px-4 py-3 text-left">Skickad</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">CV</th>
                {/* NYTT: kolumn för övrig fil */}
                <th className="px-4 py-3 text-left">Övrigt</th>
                {/* NYTT: kolumn för personligt brev */}
                <th className="px-4 py-3 text-left">Brev</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => {
                const otherPath = (a as any).other_path as string | null | undefined;
                const otherName = (a as any).other_name as string | null | undefined;
                const coverLetter = (a as any).cover_letter as string | null | undefined;

                return (
                  <tr key={a.id} className="border-t">
                    <td className="px-4 py-3 font-medium">{a.full_name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {a.email}</div>
                      {a.phone && (
                        <div className="flex items-center gap-2 text-gray-500">
                          <Phone className="w-4 h-4" /> {a.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">{(a as any).city ?? '—'}</td>
                    <td className="px-4 py-3">{(a as any).role_applied ?? '—'}</td>
                    <td className="px-4 py-3">{formatDate(a.created_at)}</td>
                    <td className="px-4 py-3">
                      <select
                        className={`border rounded-lg px-2 py-1 ${badgeClass(a.status)}`}
                        value={a.status}
                        onChange={e => updateStatus(a.id, e.target.value as Application['status'])}
                      >
                        {APP_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      {a.cv_path ? (
                        <button className="underline" onClick={() => openFile(a.cv_path! as any)}>
                          Visa CV{(a as any).cv_name ? ` (${(a as any).cv_name})` : ''}
                        </button>
                      ) : '—'}
                    </td>
                    {/* NYTT: övrig fil */}
                    <td className="px-4 py-3">
                      {otherPath ? (
                        <button className="underline" onClick={() => openFile(otherPath)}>
                          Visa{otherName ? ` (${otherName})` : ' fil'}
                        </button>
                      ) : '—'}
                    </td>
                    {/* NYTT: personligt brev */}
                    <td className="px-4 py-3">
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

      {/* NYTT: modal för att visa personligt brev */}
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

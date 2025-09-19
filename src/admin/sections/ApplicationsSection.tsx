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
      const blob = [a.full_name, a.email, a.city, a.role_applied]
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

  async function openCv(path: string | null) {
    if (!path) return;
    const { data } = await supabase.storage.from('cv').createSignedUrl(path, 60);
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
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
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
                  <td className="px-4 py-3">{a.city ?? '—'}</td>
                  <td className="px-4 py-3">{a.role_applied ?? '—'}</td>
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
                      <button className="underline" onClick={() => openCv(a.cv_path!)}>Visa CV</button>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

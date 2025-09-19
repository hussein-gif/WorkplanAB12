import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../supabaseClient';
import {
  StaffingRequest,
  TopBar,
  EmptyState as Empty,
  formatDate,
  badgeClass,
  REQ_STATUSES,
} from '../shared';

export default function RequestsSection() {
  const [items, setItems] = useState<StaffingRequest[]>([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | StaffingRequest['status']>('all');
  const [location, setLocation] = useState<'all' | string>('all');
  const [loading, setLoading] = useState(true);

  async function fetchRequests() {
    setLoading(true);
    // Hämta från contact_messages där from_type=staffing_request
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('from_type', 'staffing_request')
      .order('created_at', { ascending: false });
    if (!error) setItems((data ?? []) as unknown as StaffingRequest[]);
    setLoading(false);
  }
  useEffect(() => { fetchRequests(); }, []);

  const filtered = useMemo(() => {
    const ql = q.toLowerCase();
    return items.filter(r => {
      // contact_messages-fält: company_name, full_name, subject (roll), message (detaljer), ev. location
      const blob = [
        (r as any).company_name,
        (r as any).full_name,
        (r as any).subject,
        (r as any).message,
      ].filter(Boolean).join(' ').toLowerCase();
      const matchQ = blob.includes(ql);
      const matchS = status === 'all' ? true : (r as any).status === status;
      const rowLocation = ((r as any).location ?? '').toString();
      const matchL = location === 'all' ? true : rowLocation === location;
      return matchQ && matchS && matchL;
    });
  }, [items, q, status, location]);

  async function updateStatus(id: string, s: StaffingRequest['status']) {
    const { error } = await supabase.from('contact_messages').update({ status: s }).eq('id', id);
    if (!error) setItems(prev => prev.map(r => (r as any).id === id ? { ...(r as any), status: s } as any : r));
  }

  // location-lista (kan vara tom då location inte är egen kolumn)
  const locations = Array.from(new Set((items as any[]).map(i => i.location).filter(Boolean)));

  return (
    <div>
      <TopBar
        title="Förfrågningar"
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
              {REQ_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <select
              className="border rounded-lg px-3 py-2"
              value={location}
              onChange={e => setLocation(e.target.value)}
            >
              <option value="all">Alla orter</option>
              {locations.map(l => <option key={l as any} value={l as any}>{l as any}</option>)}
            </select>
            <button onClick={fetchRequests} className="border rounded-lg px-3 py-2">Uppdatera</button>
          </>
        }
      />

      {loading ? (
        <div className="p-8 text-gray-500">Laddar…</div>
      ) : filtered.length === 0 ? (
        <Empty title="Inga förfrågningar" hint="Prova att justera filtren." />
      ) : (
        <div className="overflow-x-auto border rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Företag</th>
                <th className="px-4 py-3 text-left">Kontakt</th>
                <th className="px-4 py-3 text-left">Roll</th>
                <th className="px-4 py-3 text-left">Antal</th>
                <th className="px-4 py-3 text-left">Ort</th>
                <th className="px-4 py-3 text-left">Skapad</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={(r as any).id} className="border-t">
                  <td className="px-4 py-3 font-medium">{(r as any).company_name ?? '—'}</td>
                  <td className="px-4 py-3">
                    <div>{(r as any).full_name ?? '—'}</div>
                    <div className="text-gray-500">
                      {(r as any).email ?? '—'}{(r as any).phone ? ` • ${(r as any).phone}` : ''}
                    </div>
                  </td>
                  <td className="px-4 py-3">{(r as any).subject ?? '—'}</td>
                  <td className="px-4 py-3">{(r as any).headcount ?? '—'}</td>
                  <td className="px-4 py-3">{(r as any).location ?? '—'}</td>
                  <td className="px-4 py-3">{formatDate((r as any).created_at)}</td>
                  <td className="px-4 py-3">
                    <select
                      className={`border rounded-lg px-2 py-1 ${badgeClass((r as any).status)}`}
                      value={(r as any).status}
                      onChange={e => updateStatus((r as any).id, e.target.value as StaffingRequest['status'])}
                    >
                      {REQ_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
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

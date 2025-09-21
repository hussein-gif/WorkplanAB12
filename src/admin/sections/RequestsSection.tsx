import React, { useEffect, useMemo, useRef, useState } from 'react';
import { adminSupabase as supabase } from '../../supabaseClient';

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

  // NYTT: detaljmodal
  const [selected, setSelected] = useState<any | null>(null);

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
    if (!error) {
      setItems(prev =>
        prev.map(r => ((r as any).id === id ? ({ ...(r as any), status: s } as any) : r))
      );
      setSelected(prev => (prev && prev.id === id ? { ...prev, status: s } : prev));
    }
  }

  // NYTT: dynamiska värden för "Ny" och "Granskad/Pågående"
  const NEW_VALUE = useMemo(() => {
    return (REQ_STATUSES.find(s => /ny/i.test(s.label))?.value ??
      ('new' as StaffingRequest['status']));
  }, []);
  const REVIEWED_VALUE = useMemo(() => {
    // plocka något som motsvarar granskad/pågående/behandlas/reviewed
    const found = REQ_STATUSES.find(s =>
      /(gransk|pågå|behand|review)/i.test(s.label)
    )?.value;
    return (found ?? ('reviewed' as StaffingRequest['status']));
  }, []);

  // NYTT: auto-markera efter 1.5s när modalen öppnas
  useEffect(() => {
    if (!selected) return;
    if (selected.status !== NEW_VALUE) return;
    const t = setTimeout(() => {
      updateStatus(selected.id, REVIEWED_VALUE);
    }, 1500);
    return () => clearTimeout(t);
  }, [selected, NEW_VALUE, REVIEWED_VALUE]);

  // NYTT: lås body-scroll när modal är öppen
  const originalOverflow = useRef<string>('');
  useEffect(() => {
    const hasModal = !!selected;
    if (typeof document !== 'undefined') {
      if (!originalOverflow.current) originalOverflow.current = document.body.style.overflow || '';
      document.body.style.overflow = hasModal ? 'hidden' : originalOverflow.current;
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = originalOverflow.current;
      }
    };
  }, [selected]);

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
                <tr
                  key={(r as any).id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelected(r as any)}
                >
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
                      onClick={e => e.stopPropagation()} // gör select klickbar även när raden är klickbar
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

      {/* NYTT: detaljmodal */}
      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
          <div className="w-[min(95vw,900px)] bg-white border rounded-2xl shadow-xl">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div className="text-lg font-semibold">Förfrågan</div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700">Stäng</button>
            </div>

            <div className="p-5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Företag</div>
                  <div className="font-medium">{selected.company_name ?? '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Skapad</div>
                  <div>{formatDate(selected.created_at)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Status</div>
                  <select
                    className={`border rounded-lg px-2 py-1 ${badgeClass(selected.status)}`}
                    value={selected.status}
                    onChange={e => updateStatus(selected.id, e.target.value as StaffingRequest['status'])}
                  >
                    {REQ_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Kontaktperson</div>
                  <div className="font-medium">{selected.full_name ?? '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">E-post</div>
                  <div>{selected.email ?? '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Telefon</div>
                  <div>{selected.phone ?? '—'}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Roll</div>
                  <div>{selected.subject ?? '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Antal</div>
                  <div>{selected.headcount ?? '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Ort</div>
                  <div>{selected.location ?? '—'}</div>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Detaljer</div>
                <div className="whitespace-pre-wrap text-sm text-gray-800 border rounded-lg p-3 bg-gray-50">
                  {selected.message ?? '—'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { adminSupabase as supabase } from '../../supabaseClient';

import {
  ContactMessage,
  TopBar,
  EmptyState as Empty,
  formatDate,
  badgeClass,
  MSG_STATUSES,
} from '../shared';

export default function MessagesSection() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [q, setQ] = useState('');
  const [type, setType] = useState<'all' | 'candidate' | 'company'>('all');
  const [status, setStatus] = useState<'all' | ContactMessage['status']>('all');
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const NEW_VALUE = useMemo(() => {
    return (MSG_STATUSES.find(s => s.label.toLowerCase().includes('ny'))?.value ??
      ('new' as ContactMessage['status']));
  }, []);
  const READ_VALUE = useMemo(() => {
    const found =
      MSG_STATUSES.find(s => /läst|last|read/i.test(s.label))?.value;
    return (found ?? ('read' as ContactMessage['status']));
  }, []);

  useEffect(() => {
    if (!selected) return;
    if (selected.status !== NEW_VALUE) return;
    const t = setTimeout(() => {
      updateStatus(selected.id, READ_VALUE);
    }, 1500);
    return () => clearTimeout(t);
  }, [selected, NEW_VALUE, READ_VALUE]);

  const originalOverflow = useRef<string>('');
  useEffect(() => {
    const hasModal = !!selected;
    if (typeof document !== 'undefined') {
      if (!originalOverflow.current) {
        originalOverflow.current = document.body.style.overflow || '';
      }
      document.body.style.overflow = hasModal ? 'hidden' : originalOverflow.current;
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = originalOverflow.current;
      }
    };
  }, [selected]);

  async function fetchMessages() {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .in('from_type', ['candidate', 'company'])
      .order('created_at', { ascending: false });
    if (!error) setItems((data ?? []) as ContactMessage[]);
    setLoading(false);
  }
  useEffect(() => { fetchMessages(); }, []);

  const filtered = useMemo(() => {
    const ql = q.toLowerCase();
    return items.filter(m => {
      const blob = [
        m.full_name,
        m.email,
        (m as any).company_name ?? (m as any).company,
        m.subject,
        m.message,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const matchQ = blob.includes(ql);
      const matchT = type === 'all' ? true : m.from_type === type;
      const matchS = status === 'all' ? true : m.status === status;
      return matchQ && matchT && matchS;
    });
  }, [items, q, type, status]);

  // ⬇️ ENDA ÄNDRINGEN: skicka "msg:read" när ett 'new' blir något annat
  async function updateStatus(id: string, s: ContactMessage['status']) {
    const prevRow = items.find(m => m.id === id) || (selected?.id === id ? selected : undefined);
    const wasNew = prevRow?.status === NEW_VALUE;

    const { error } = await supabase.from('contact_messages').update({ status: s }).eq('id', id);
    if (!error) {
      setItems(prev => prev.map(m => (m.id === id ? { ...m, status: s } : m)));
      setSelected(prev => (prev && prev.id === id ? { ...prev, status: s } : prev));

      // 🔔 Optimistisk badge-minskning i sidomenyn
      if (wasNew && s !== NEW_VALUE) {
        window.dispatchEvent(new CustomEvent('msg:read', { detail: { wasNew: true } }));
      }
    }
  }

  const typeBadgeClass = (from_type: 'candidate' | 'company') =>
    from_type === 'company'
      ? 'bg-purple-100 text-purple-800 border border-purple-200'
      : 'bg-blue-100 text-blue-800 border border-blue-200';

  return (
    <div>
      <TopBar
        title="Meddelanden"
        q={q}
        setQ={setQ}
        right={
          <>
            <select
              className="border rounded-lg px-3 py-2"
              value={type}
              onChange={e => setType(e.target.value as any)}
            >
              <option value="all">Alla typer</option>
              <option value="candidate">Kandidat</option>
              <option value="company">Företag</option>
            </select>
            <select
              className="border rounded-lg px-3 py-2"
              value={status}
              onChange={e => setStatus(e.target.value as any)}
            >
              <option value="all">Alla statusar</option>
              {MSG_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <button onClick={fetchMessages} className="border rounded-lg px-3 py-2">Uppdatera</button>
          </>
        }
      />

      {loading ? (
        <div className="p-8 text-gray-500">Laddar…</div>
      ) : filtered.length === 0 ? (
        <Empty title="Inga meddelanden" hint="Prova att justera filtren." />
      ) : (
        <div className="overflow-x-auto border rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Typ</th>
                <th className="px-4 py-3 text-left">Avsändare</th>
                <th className="px-4 py-3 text-left">E-post</th>
                <th className="px-4 py-3 text-left">Ämne</th>
                <th className="px-4 py-3 text-left">Mottaget</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr
                  key={m.id}
                  className="border-t hover:bg-gray-50 cursor-pointer align-top"
                  onClick={() => setSelected(m)}
                >
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-md ${typeBadgeClass(m.from_type)}`}>
                      {m.from_type === 'candidate' ? 'Kandidat' : 'Företag'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{m.full_name}</div>
                    {(m as any).company_name && <div className="text-gray-500">{(m as any).company_name}</div>}
                  </td>
                  <td className="px-4 py-3">{m.email}</td>
                  <td className="px-4 py-3 max-w-[28ch] truncate" title={m.subject}>{m.subject}</td>
                  <td className="px-4 py-3">{formatDate(m.created_at)}</td>
                  <td className="px-4 py-3">
                    <select
                      className={`border rounded-lg px-2 py-1 ${badgeClass(m.status)}`}
                      value={m.status}
                      onClick={e => e.stopPropagation()}
                      onChange={e => updateStatus(m.id, e.target.value as ContactMessage['status'])}
                    >
                      {MSG_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
          <div className="w-[min(95vw,800px)] bg-white border rounded-2xl shadow-xl">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div className="text-lg font-semibold">Meddelande</div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700">Stäng</button>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Typ</div>
                  <div>
                    <span className={`mt-1 inline-block px-2 py-1 rounded-md ${typeBadgeClass(selected.from_type)}`}>
                      {selected.from_type === 'candidate' ? 'Kandidat' : 'Företag'}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Mottaget</div>
                  <div>{formatDate(selected.created_at)}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Avsändare</div>
                  <div className="font-medium">{selected.full_name}</div>
                  {(selected as any).company_name && (
                    <div className="text-gray-500">{(selected as any).company_name}</div>
                  )}
                </div>
                <div>
                  <div className="text-xs text-gray-500">E-post</div>
                  <div>{selected.email}</div>
                </div>

                <div className="md:col-span-2">
                  <div className="text-xs text-gray-500 mb-1">Status</div>
                  <select
                    className={`border rounded-lg px-2 py-1 ${badgeClass(selected.status)}`}
                    value={selected.status}
                    onChange={e => updateStatus(selected.id, e.target.value as ContactMessage['status'])}
                  >
                    {MSG_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Ämne</div>
                <div className="font-medium">{selected.subject}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Meddelande</div>
                <div className="whitespace-pre-wrap text-sm text-gray-800 border rounded-lg p-3 bg-gray-50">
                  {selected.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

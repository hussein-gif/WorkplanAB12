import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../supabaseClient';
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

  async function fetchMessages() {
    setLoading(true);
    // Bara kandidat/företag – exkludera staffing_request
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

  async function updateStatus(id: string, s: ContactMessage['status']) {
    const { error } = await supabase.from('contact_messages').update({ status: s }).eq('id', id);
    if (!error) setItems(prev => prev.map(m => (m.id === id ? { ...m, status: s } : m)));
  }

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
                <tr key={m.id} className="border-t align-top">
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-md ${badgeClass(m.from_type)}`}>
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
    </div>
  );
}

import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Application, ContactMessage, StaffingRequest, TopBar, EmptyState, formatDate, badgeClass } from './shared';
import { Mail, Phone } from 'lucide-react';

/* ========== APPLICATIONS ========== */

const STATUSES: Application['status'][] = ['new','reviewed','interview','rejected','hired'];

export function ApplicationsSection() {
  const [apps, setApps] = useState<Application[]>([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | Application['status']>('all');
  const [loading, setLoading] = useState(true);

  async function fetchApps() {
    setLoading(true);
    const { data, error } = await supabase.from('applications').select('*').order('created_at', { ascending: false });
    if (!error) setApps((data ?? []) as Application[]);
    setLoading(false);
  }
  useEffect(() => { fetchApps(); }, []);

  const filtered = useMemo(() => {
    const ql = q.toLowerCase();
    return apps.filter(a => {
      const blob = [a.full_name, a.email, a.city, a.role_applied].filter(Boolean).join(' ').toLowerCase();
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
        title="Applications"
        q={q}
        setQ={setQ}
        right={
          <>
            <select className="border rounded-lg px-3 py-2" value={status} onChange={e => setStatus(e.target.value as any)}>
              <option value="all">Alla statusar</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={fetchApps} className="border rounded-lg px-3 py-2">Uppdatera</button>
          </>
        }
      />

      {loading ? (
        <div className="p-8 text-gray-500">Laddar…</div>
      ) : filtered.length === 0 ? (
        <EmptyState title="Inga ansökningar" hint="Prova att justera filtren." />
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
                    {a.phone && <div className="flex items-center gap-2 text-gray-500"><Phone className="w-4 h-4" /> {a.phone}</div>}
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
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
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

/* ========== MESSAGES ========== */

const MSG_STATUSES: ContactMessage['status'][] = ['new', 'read', 'archived'];

export function MessagesSection() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [q, setQ] = useState('');
  const [type, setType] = useState<'all' | 'candidate' | 'company'>('all');
  const [status, setStatus] = useState<'all' | ContactMessage['status']>('all');
  const [loading, setLoading] = useState(true);

  async function fetchMessages() {
    setLoading(true);
    const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (!error) setItems((data ?? []) as ContactMessage[]);
    setLoading(false);
  }
  useEffect(() => { fetchMessages(); }, []);

  const filtered = useMemo(() => {
    const ql = q.toLowerCase();
    return items.filter(m => {
      const blob = [m.full_name, m.email, m.company, m.subject, m.message].filter(Boolean).join(' ').toLowerCase();
      const matchQ = blob.includes(ql);
      const matchT = type === 'all' ? true : m.from_type === type;
      const matchS = status === 'all' ? true : m.status === status;
      return matchQ && matchT && matchS;
    });
  }, [items, q, type, status]);

  async function updateStatus(id: string, s: ContactMessage['status']) {
    const { error } = await supabase.from('contact_messages').update({ status: s }).eq('id', id);
    if (!error) setItems(prev => prev.map(m => m.id === id ? { ...m, status: s } : m));
  }

  return (
    <div>
      <TopBar
        title="Messages"
        q={q}
        setQ={setQ}
        right={
          <>
            <select className="border rounded-lg px-3 py-2" value={type} onChange={e => setType(e.target.value as any)}>
              <option value="all">Alla typer</option>
              <option value="candidate">Candidate</option>
              <option value="company">Company</option>
            </select>
            <select className="border rounded-lg px-3 py-2" value={status} onChange={e => setStatus(e.target.value as any)}>
              <option value="all">Alla statusar</option>
              {MSG_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={fetchMessages} className="border rounded-lg px-3 py-2">Uppdatera</button>
          </>
        }
      />

      {loading ? (
        <div className="p-8 text-gray-500">Laddar…</div>
      ) : filtered.length === 0 ? (
        <EmptyState title="Inga meddelanden" hint="Prova att justera filtren." />
      ) : (
        <div className="overflow-x-auto border rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Typ</th>
                <th className="px-4 py-3 text-left">Avsändare</th>
                <th className="px-4 py-3 text-left">E-post</th>
                {/** Visa subject kort för tydlighet */}
                <th className="px-4 py-3 text-left">Ämne</th>
                <th className="px-4 py-3 text-left">Mottaget</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id} className="border-t align-top">
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-md ${badgeClass(m.from_type)}`}>{m.from_type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{m.full_name}</div>
                    {m.company && <div className="text-gray-500">{m.company}</div>}
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
                      {MSG_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
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

/* ========== STAFFING REQUESTS ========== */

const REQ_STATUSES: StaffingRequest['status'][] = ['new','qualified','contacted','won','lost'];

export function RequestsSection() {
  const [items, setItems] = useState<StaffingRequest[]>([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | StaffingRequest['status']>('all');
  const [location, setLocation] = useState<'all' | string>('all');
  const [loading, setLoading] = useState(true);

  async function fetchRequests() {
    setLoading(true);
    const { data, error } = await supabase.from('staffing_requests').select('*').order('created_at', { ascending: false });
    if (!error) setItems((data ?? []) as StaffingRequest[]);
    setLoading(false);
  }
  useEffect(() => { fetchRequests(); }, []);

  const filtered = useMemo(() => {
    const ql = q.toLowerCase();
    return items.filter(r => {
      const blob = [r.company_name, r.contact_person, r.role_needed, r.location].join(' ').toLowerCase();
      const matchQ = blob.includes(ql);
      const matchS = status === 'all' ? true : r.status === status;
      const matchL = location === 'all' ? true : r.location === location;
      return matchQ && matchS && matchL;
    });
  }, [items, q, status, location]);

  async function updateStatus(id: string, s: StaffingRequest['status']) {
    const { error } = await supabase.from('staffing_requests').update({ status: s }).eq('id', id);
    if (!error) setItems(prev => prev.map(r => r.id === id ? { ...r, status: s } : r));
  }

  const locations = Array.from(new Set(items.map(i => i.location))).filter(Boolean);

  return (
    <div>
      <TopBar
        title="Staffing Requests"
        q={q}
        setQ={setQ}
        right={
          <>
            <select className="border rounded-lg px-3 py-2" value={status} onChange={e => setStatus(e.target.value as any)}>
              <option value="all">Alla statusar</option>
              {REQ_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="border rounded-lg px-3 py-2" value={location} onChange={e => setLocation(e.target.value)}>
              <option value="all">Alla orter</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <button onClick={fetchRequests} className="border rounded-lg px-3 py-2">Uppdatera</button>
          </>
        }
      />

      {loading ? (
        <div className="p-8 text-gray-500">Laddar…</div>
      ) : filtered.length === 0 ? (
        <EmptyState title="Inga förfrågningar" hint="Prova att justera filtren." />
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
                <tr key={r.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{r.company_name}</td>
                  <td className="px-4 py-3">
                    <div>{r.contact_person}</div>
                    <div className="text-gray-500">{r.email} • {r.phone}</div>
                  </td>
                  <td className="px-4 py-3">{r.role_needed}</td>
                  <td className="px-4 py-3">{r.headcount}</td>
                  <td className="px-4 py-3">{r.location}</td>
                  <td className="px-4 py-3">{formatDate(r.created_at)}</td>
                  <td className="px-4 py-3">
                    <select
                      className={`border rounded-lg px-2 py-1 ${badgeClass(r.status)}`}
                      value={r.status}
                      onChange={e => updateStatus(r.id, e.target.value as StaffingRequest['status'])}
                    >
                      {REQ_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
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

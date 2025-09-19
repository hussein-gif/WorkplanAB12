import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../supabaseClient';
import {
  Application,
  ContactMessage,
  StaffingRequest,
  TopBar,
  EmptyState as Empty,
  formatDate,
  badgeClass,
} from './shared';
import { Mail, Phone, Users, MessageSquare, Briefcase, Check, Pencil, Trash2, Plus, Globe, EyeOff } from 'lucide-react';

/* Hjälp: svenska etiketter för statusar */
function statusLabel(
  domän: 'application' | 'message' | 'request',
  värde: string
): string {
  if (domän === 'application') {
    const map: Record<string, string> = {
      new: 'Ny',
      reviewed: 'Granskad',
      interview: 'Intervju',
      rejected: 'Avslagen',
      hired: 'Anställd',
    };
    return map[värde] ?? värde;
  }
  if (domän === 'message') {
    const map: Record<string, string> = {
      new: 'Ny',
      read: 'Läst',
      archived: 'Arkiverad',
    };
    return map[värde] ?? värde;
  }
  const map: Record<string, string> = {
    new: 'Ny',
    qualified: 'Kvalificerad',
    contacted: 'Kontaktad',
    won: 'Vunnen',
    lost: 'Förlorad',
  };
  return map[värde] ?? värde;
}

/* ========== ÖVERSIKT (Dashboard) ========== */

export function DashboardSection() {
  const [q, setQ] = useState('');
  const [appsTotal, setAppsTotal] = useState<number | null>(null);
  const [appsHired, setAppsHired] = useState<number | null>(null);
  const [msgsNew, setMsgsNew] = useState<number | null>(null);
  const [reqsActive, setReqsActive] = useState<number | null>(null);
  const [recentApps, setRecentApps] = useState<Array<Pick<Application, 'id' | 'full_name' | 'role_applied' | 'status' | 'created_at'>>>([]);
  const [recentMsgs, setRecentMsgs] = useState<Array<Pick<ContactMessage, 'id' | 'full_name' | 'subject' | 'status' | 'created_at'>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      // Antal
      const appsCount = supabase.from('applications').select('*', { count: 'exact', head: true });
      const hiredCount = supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'hired');

      // Nya meddelanden: ENBART candidate/company
      const newMsgsCount = supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .in('from_type', ['candidate', 'company'])
        .eq('status', 'new');

      // Aktiva förfrågningar: från contact_messages där from_type='staffing_request'
      const activeReqsCount = supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('from_type', 'staffing_request');

      // Listor
      const lastApps = supabase
        .from('applications')
        .select('id, full_name, role_applied, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      // Senaste meddelanden: exkludera förfrågningar
      const lastMsgs = supabase
        .from('contact_messages')
        .select('id, full_name, subject, status, created_at')
        .in('from_type', ['candidate', 'company'])
        .order('created_at', { ascending: false })
        .limit(5);

      const [
        appsCountRes,
        hiredCountRes,
        newMsgsCountRes,
        activeReqsCountRes,
        lastAppsRes,
        lastMsgsRes,
      ] = await Promise.allSettled([
        appsCount,
        hiredCount,
        newMsgsCount,
        activeReqsCount,
        lastApps,
        lastMsgs,
      ]);

      const getCount = (r: PromiseSettledResult<any>) =>
        r.status === 'fulfilled' && r.value && typeof r.value.count === 'number' ? r.value.count : 0;

      setAppsTotal(getCount(appsCountRes));
      setAppsHired(getCount(hiredCountRes));
      setMsgsNew(getCount(newMsgsCountRes));
      setReqsActive(getCount(activeReqsCountRes));

      setRecentApps(
        lastAppsRes.status === 'fulfilled' && Array.isArray(lastAppsRes.value.data) ? lastAppsRes.value.data : []
      );
      setRecentMsgs(
        lastMsgsRes.status === 'fulfilled' && Array.isArray(lastMsgsRes.value.data) ? lastMsgsRes.value.data : []
      );

      setLoading(false);
    }

    load();
  }, []);

  return (
    <div>
      <TopBar title="Översikt" q={q} setQ={setQ} />

      {/* KPI-kort */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Antal ansökningar</div>
              <div className="text-2xl font-semibold">{appsTotal ?? (loading ? '…' : 0)}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-900 text-white grid place-items-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Nya meddelanden</div>
              <div className="text-2xl font-semibold">{msgsNew ?? (loading ? '…' : 0)}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-900 text-white grid place-items-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Aktiva förfrågningar</div>
              <div className="text-2xl font-semibold">{reqsActive ?? (loading ? '…' : 0)}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-900 text-white grid place-items-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Placeringar (anställda)</div>
              <div className="text-2xl font-semibold">{appsHired ?? (loading ? '…' : 0)}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-900 text-white grid place-items-center">
              <Check className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Listor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6">
          <div className="text-lg font-semibold mb-4">Senaste ansökningar</div>
          {loading ? (
            <div className="text-gray-500">Laddar…</div>
          ) : recentApps.length === 0 ? (
            <Empty title="Inga ansökningar" hint="Visas här när nya kommer in." />
          ) : (
            <div className="space-y-3">
              {recentApps.map((a) => (
                <div key={a.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{a.full_name}</div>
                    <div className="text-sm text-gray-500">{a.role_applied ?? '—'} • {formatDate(a.created_at)}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs ${badgeClass(a.status)}`}>
                    {statusLabel('application', a.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border rounded-xl p-6">
          <div className="text-lg font-semibold mb-4">Senaste meddelanden</div>
          {loading ? (
            <div className="text-gray-500">Laddar…</div>
          ) : recentMsgs.length === 0 ? (
            <Empty title="Inga meddelanden" hint="Visas här när nya kommer in." />
          ) : (
            <div className="space-y-3">
              {recentMsgs.map((m) => (
                <div key={m.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{m.full_name}</div>
                    <div className="text-sm text-gray-500">{m.subject}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs ${badgeClass(m.status)}`}>
                    {statusLabel('message', m.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ========== ANSÖKNINGAR ========== */

const STATUSES: { value: Application['status']; label: string }[] = [
  { value: 'new', label: 'Ny' },
  { value: 'reviewed', label: 'Granskad' },
  { value: 'interview', label: 'Intervju' },
  { value: 'rejected', label: 'Avslagen' },
  { value: 'hired', label: 'Anställd' },
];

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
        title="Ansökningar"
        q={q}
        setQ={setQ}
        right={
          <>
            <select className="border rounded-lg px-3 py-2" value={status} onChange={e => setStatus(e.target.value as any)}>
              <option value="all">Alla statusar</option>
              {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
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
                      {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
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

/* ========== MEDDELANDEN ========== */

const MSG_STATUSES: { value: ContactMessage['status']; label: string }[] = [
  { value: 'new', label: 'Ny' },
  { value: 'read', label: 'Läst' },
  { value: 'archived', label: 'Arkiverad' },
];

export function MessagesSection() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [q, setQ] = useState('');
  const [type, setType] = useState<'all' | 'candidate' | 'company'>('all');
  const [status, setStatus] = useState<'all' | ContactMessage['status']>('all');
  const [loading, setLoading] = useState(true);

  async function fetchMessages() {
    setLoading(true);
    // ⬇️ Bara kandidat/företag – exkludera staffing_request
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
      const blob = [m.full_name, m.email, (m as any).company_name ?? (m as any).company, m.subject, m.message].filter(Boolean).join(' ').toLowerCase();
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
        title="Meddelanden"
        q={q}
        setQ={setQ}
        right={
          <>
            <select className="border rounded-lg px-3 py-2" value={type} onChange={e => setType(e.target.value as any)}>
              <option value="all">Alla typer</option>
              <option value="candidate">Kandidat</option>
              <option value="company">Företag</option>
            </select>
            <select className="border rounded-lg px-3 py-2" value={status} onChange={e => setStatus(e.target.value as any)}>
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
                    <span className={`px-2 py-1 rounded-md ${badgeClass(m.from_type)}`}>{m.from_type === 'candidate' ? 'Kandidat' : 'Företag'}</span>
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

/* ========== FÖRFRÅGNINGAR (Bemanning) ========== */

const REQ_STATUSES: { value: StaffingRequest['status']; label: string }[] = [
  { value: 'new', label: 'Ny' },
  { value: 'qualified', label: 'Kvalificerad' },
  { value: 'contacted', label: 'Kontaktad' },
  { value: 'won', label: 'Vunnen' },
  { value: 'lost', label: 'Förlorad' },
];

export function RequestsSection() {
  const [items, setItems] = useState<StaffingRequest[]>([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | StaffingRequest['status']>('all');
  const [location, setLocation] = useState<'all' | string>('all');
  const [loading, setLoading] = useState(true);

  async function fetchRequests() {
    setLoading(true);
    // ⬇️ Hämta från contact_messages där from_type=staffing_request
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
      // contact_messages-fält: company_name, full_name (kontakt), email, phone, subject (roll), message (detaljer), ev. location i text
      const blob = [ (r as any).company_name, (r as any).full_name, (r as any).subject, (r as any).message ].filter(Boolean).join(' ').toLowerCase();
      const matchQ = blob.includes(ql);
      const matchS = status === 'all' ? true : (r as any).status === status;
      // Vi har ev. inte separat location-kolumn – filtrera bara om den finns lika med value
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
            <select className="border rounded-lg px-3 py-2" value={status} onChange={e => setStatus(e.target.value as any)}>
              <option value="all">Alla statusar</option>
              {REQ_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <select className="border rounded-lg px-3 py-2" value={location} onChange={e => setLocation(e.target.value)}>
              <option value="all">Alla orter</option>
              {locations.map(l => <option key={l} value={l as any}>{l as any}</option>)}
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
                    <div className="text-gray-500">{(r as any).email ?? '—'}{(r as any).phone ? ` • ${(r as any).phone}` : ''}</div>
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

/* ========== JOBB (CRUD) ========== */

/** Lokal typ för jobb-poster i public.jobs */
type Job = {
  id: string;
  title: string;
  location: string | null;
  employment_type: string | null;
  description_md: string | null;
  salary_min: number | null;
  salary_max: number | null;
  slug: string | null;
  published: boolean;
  posted_at: string;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export function JobsSection() {
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

    const { data, error } = await supabase
      .from('jobs')
      .upsert(row, { onConflict: 'slug' })
      .select()
      .single();

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
            <button onClick={openNew} className="ml-2 inline-flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-900 text-white">
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
                    <span className={`px-2 py-1 rounded-md text-xs ${j.published ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
                      {j.published ? 'Ja' : 'Nej'}
                    </span>
                  </td>
                  <td className="px-4 py-3">{formatDate(j.posted_at)}</td>
                  <td className="px-4 py-3">{j.expires_at ? formatDate(j.expires_at) : '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="border rounded-lg px-2 py-1 inline-flex items-center gap-1" onClick={() => openEdit(j)}>
                        <Pencil className="w-4 h-4" /> Redigera
                      </button>
                      <button
                        className={`border rounded-lg px-2 py-1 inline-flex items-center gap-1 ${j.published ? '' : 'bg-gray-900 text-white'}`}
                        onClick={() => togglePublished(j)}
                        title={j.published ? 'Avpublicera' : 'Publicera'}
                      >
                        {j.published ? <EyeOff className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                        {j.published ? 'Avpublicera' : 'Publicera'}
                      </button>
                      <button className="border rounded-lg px-2 py-1 inline-flex items-center gap-1 text-red-700" onClick={() => removeJob(j)}>
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

import React, { useEffect, useMemo, useState } from 'react';
import {
  Menu, LogOut, Users, MessageSquare, Briefcase, Settings,
  Search, RefreshCw, Download, Eye, ChevronDown, ChevronUp, Mail, Phone, Calendar, Building, FileText, Edit
} from 'lucide-react';
import { supabase } from '../supabaseClient';

/** =========================
 *  Typer (matchar ditt schema)
 *  ========================= */
type Application = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  role_applied: string | null;
  cover_letter: string | null;
  cv_path: string | null;
  status: 'new' | 'reviewed' | 'interview' | 'rejected' | 'hired';
  created_at: string;
};

type ContactMessage = {
  id: string;
  from_type: 'candidate' | 'company';
  full_name: string;
  company: string | null;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'archived';
};

type StaffingRequest = {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  role_needed: string;
  headcount: number;
  location: string;
  contract_length: string | null;
  shift_type: string | null;
  notes: string | null;
  created_at: string;
  status: 'new' | 'qualified' | 'contacted' | 'won' | 'lost';
};

/** =========================
 *  Små utils
 *  ========================= */
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('sv-SE', { year: 'numeric', month: 'short', day: 'numeric' });

const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ');

const badgeClass = (kind: string) => {
  const map: Record<string, string> = {
    // applications
    new: 'bg-blue-100 text-blue-800',
    reviewed: 'bg-yellow-100 text-yellow-800',
    interview: 'bg-purple-100 text-purple-800',
    rejected: 'bg-red-100 text-red-800',
    hired: 'bg-green-100 text-green-800',
    // messages
    read: 'bg-gray-100 text-gray-800',
    archived: 'bg-gray-100 text-gray-800',
    candidate: 'bg-blue-100 text-blue-800',
    company: 'bg-indigo-100 text-indigo-800',
    // requests
    qualified: 'bg-orange-100 text-orange-800',
    contacted: 'bg-indigo-100 text-indigo-800',
    won: 'bg-green-100 text-green-800',
    lost: 'bg-red-100 text-red-800',
  };
  return map[kind] || 'bg-gray-100 text-gray-800';
};

/** =========================
 *  Delkomponenter (UI)
 *  ========================= */
function TopBar({
  title,
  search,
  onSearch,
  children,
}: {
  title: string;
  search: string;
  onSearch: (v: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search…"
            className="pl-9 pr-3 h-10 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500"
          />
        </div>
        {children}
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  onReset,
}: {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  onReset?: () => void;
}) {
  return (
    <div className="py-12 text-center">
      <Icon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
      <div className="text-lg font-medium text-gray-900">{title}</div>
      <div className="text-sm text-gray-500 mt-1">{description}</div>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-4 inline-flex items-center gap-2 px-4 h-10 rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          Reset filters
        </button>
      )}
    </div>
  );
}

/** =========================
 *  Sektion: Applications
 *  ========================= */
function ApplicationsSection() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | Application['status']>('all');
  const [city, setCity] = useState<'all' | string>('all');
  const [role, setRole] = useState<'all' | string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  async function fetchApps() {
    setLoading(true);
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setApps((data ?? []) as Application[]);
    setLoading(false);
  }
  useEffect(() => {
    fetchApps();
  }, []);

  const cities = useMemo(
    () => Array.from(new Set(apps.map((a) => a.city).filter(Boolean))) as string[],
    [apps]
  );
  const roles = useMemo(
    () => Array.from(new Set(apps.map((a) => a.role_applied).filter(Boolean))) as string[],
    [apps]
  );

  const filtered = useMemo(() => {
    let out = apps.filter((a) => {
      const text = [a.full_name, a.email, a.city, a.role_applied].join(' ').toLowerCase();
      const matchQ = text.includes(q.toLowerCase());
      const matchS = status === 'all' ? true : a.status === status;
      const matchC = city === 'all' ? true : a.city === city;
      const matchR = role === 'all' ? true : a.role_applied === role;
      return matchQ && matchS && matchC && matchR;
    });
    out.sort((a, b) => {
      if (sortBy === 'name') {
        return order === 'asc'
          ? a.full_name.localeCompare(b.full_name)
          : b.full_name.localeCompare(a.full_name);
      }
      const aa = new Date(a.created_at).getTime();
      const bb = new Date(b.created_at).getTime();
      return order === 'asc' ? aa - bb : bb - aa;
    });
    return out;
  }, [apps, q, status, city, role, sortBy, order]);

  const start = (page - 1) * size;
  const rows = filtered.slice(start, start + size);
  const pages = Math.max(1, Math.ceil(filtered.length / size));

  async function updateStatus(id: string, s: Application['status']) {
    const { error } = await supabase.from('applications').update({ status: s }).eq('id', id);
    if (!error) setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status: s } : a)));
  }

  async function openCv(path: string | null) {
    if (!path) return;
    const { data } = await supabase.storage.from('cv').createSignedUrl(path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, '_blank');
  }

  const reset = () => {
    setQ('');
    setStatus('all');
    setCity('all');
    setRole('all');
    setSortBy('date');
    setOrder('desc');
    setPage(1);
  };

  return (
    <div>
      <TopBar title="Applications" search={q} onSearch={setQ}>
        <div className="flex flex-wrap gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm"
          >
            <option value="all">All status</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm"
          >
            <option value="all">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm"
          >
            <option value="all">All roles</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <button
            onClick={() => fetchApps()}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>

          <button
            onClick={() => {
              if (!rows.length) return;
              const headers = Object.keys(rows[0] as any);
              const csv = [
                headers.join(','),
                ...rows.map((r) => headers.map((h) => `"${(r as any)[h] ?? ''}"`).join(',')),
              ].join('\n');
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'applications.csv';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </TopBar>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-gray-600">
                <th className="px-4 py-3 text-left">
                  <button
                    className="inline-flex items-center gap-1"
                    onClick={() => {
                      setSortBy('name');
                      setOrder(sortBy === 'name' && order === 'asc' ? 'desc' : 'asc');
                    }}
                  >
                    Applicant
                    {sortBy === 'name' ? (
                      order === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : null}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">City</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">
                  <button
                    className="inline-flex items-center gap-1"
                    onClick={() => {
                      setSortBy('date');
                      setOrder(sortBy === 'date' && order === 'asc' ? 'desc' : 'asc');
                    }}
                  >
                    Submitted
                    {sortBy === 'date' ? (
                      order === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : null}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">CV</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    Laddar…
                  </td>
                </tr>
              ) : rows.length ? (
                rows.map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="px-4 py-3 font-medium text-gray-900">{a.full_name}</td>
                    <td className="px-4 py-3">
                      <div className="text-gray-900 flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-gray-500" />
                        {a.email}
                      </div>
                      {a.phone && (
                        <div className="text-gray-500 text-xs flex items-center gap-2 mt-0.5">
                          <Phone className="h-3.5 w-3.5" />
                          {a.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">{a.city ?? '—'}</td>
                    <td className="px-4 py-3">{a.role_applied ?? '—'}</td>
                    <td className="px-4 py-3">{formatDate(a.created_at)}</td>
                    <td className="px-4 py-3">
                      <select
                        value={a.status}
                        onChange={(e) => updateStatus(a.id, e.target.value as any)}
                        className={cx(
                          'h-8 rounded-md px-2 text-xs border',
                          'bg-white',
                          'border-gray-200'
                        )}
                      >
                        <option value="new">new</option>
                        <option value="reviewed">reviewed</option>
                        <option value="interview">interview</option>
                        <option value="rejected">rejected</option>
                        <option value="hired">hired</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      {a.cv_path ? (
                        <button
                          onClick={() => openCv(a.cv_path)}
                          className="inline-flex items-center gap-1 h-8 px-3 rounded-md border border-gray-200 hover:bg-gray-50"
                        >
                          <FileText className="h-4 w-4" />
                          View CV
                        </button>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => alert(a.cover_letter || 'No cover letter')}
                        className="inline-flex items-center gap-1 h-8 px-3 rounded-md border border-gray-200 hover:bg-gray-50"
                      >
                        <Eye className="h-4 w-4" />
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-6" colSpan={8}>
                    <EmptyState
                      icon={Users}
                      title="No applications found"
                      description="No applications match your current filters."
                      onReset={reset}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobilkort */}
        <div className="md:hidden divide-y">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Laddar…</div>
          ) : rows.length ? (
            rows.map((a) => (
              <div key={a.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-gray-900">{a.full_name}</div>
                    <div className="text-sm text-gray-500">{a.role_applied ?? '—'}</div>
                  </div>
                  <span className={cx('px-2 py-0.5 rounded-md text-xs', badgeClass(a.status))}>
                    {a.status}
                  </span>
                </div>
                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-gray-500" />
                    {a.email}
                  </div>
                  {a.phone && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Phone className="h-3.5 w-3.5" />
                      {a.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-500">
                    <Building className="h-3.5 w-3.5" />
                    {a.city ?? '—'}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(a.created_at)}
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => alert(a.cover_letter || 'No cover letter')}
                    className="flex-1 inline-flex items-center justify-center gap-1 h-9 rounded-md border border-gray-200 hover:bg-gray-50"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                  <button
                    onClick={() => openCv(a.cv_path)}
                    className="flex-1 inline-flex items-center justify-center gap-1 h-9 rounded-md border border-gray-200 hover:bg-gray-50"
                  >
                    <FileText className="h-4 w-4" />
                    CV
                  </button>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              icon={Users}
              title="No applications found"
              description="No applications match your current filters."
              onReset={reset}
            />
          )}
        </div>
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {start + 1} to {Math.min(start + size, filtered.length)} of {filtered.length}
          </div>
          <div className="flex items-center gap-2">
            <select
              value={size}
              onChange={(e) => {
                setSize(Number(e.target.value));
                setPage(1);
              }}
              className="h-9 rounded-lg border border-gray-200 bg-white px-2 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-9 px-3 rounded-lg border border-gray-200 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm">
              Page {page} / {pages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
              className="h-9 px-3 rounded-lg border border-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** =========================
 *  Sektion: Contact Messages
 *  ========================= */
function MessagesSection() {
  const [list, setList] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [type, setType] = useState<'all' | 'candidate' | 'company'>('all');
  const [status, setStatus] = useState<'all' | ContactMessage['status']>('all');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  async function fetchMessages() {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setList((data ?? []) as ContactMessage[]);
    setLoading(false);
  }
  useEffect(() => {
    fetchMessages();
  }, []);

  const filtered = useMemo(() => {
    let out = list.filter((m) => {
      const text = [m.full_name, m.company, m.email, m.subject].join(' ').toLowerCase();
      const matchQ = text.includes(q.toLowerCase());
      const matchT = type === 'all' ? true : m.from_type === type;
      const matchS = status === 'all' ? true : m.status === status;
      return matchQ && matchT && matchS;
    });
    out.sort((a, b) => {
      const aa = new Date(a.created_at).getTime();
      const bb = new Date(b.created_at).getTime();
      return order === 'asc' ? aa - bb : bb - aa;
    });
    return out;
  }, [list, q, type, status, order]);

  async function updateStatus(id: string, s: ContactMessage['status']) {
    const { error } = await supabase.from('contact_messages').update({ status: s }).eq('id', id);
    if (!error) setList((prev) => prev.map((m) => (m.id === id ? { ...m, status: s } : m)));
  }

  const reset = () => {
    setQ('');
    setType('all');
    setStatus('all');
    setOrder('desc');
  };

  return (
    <div>
      <TopBar title="Messages" search={q} onSearch={setQ}>
        <div className="flex flex-wrap gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm"
          >
            <option value="all">All types</option>
            <option value="candidate">Candidate</option>
            <option value="company">Company</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm"
          >
            <option value="all">All status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="archived">Archived</option>
          </select>
          <button
            onClick={() => fetchMessages()}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
          <button
            onClick={() => {
              if (!filtered.length) return;
              const headers = Object.keys(filtered[0] as any);
              const csv = [
                headers.join(','),
                ...filtered.map((r) => headers.map((h) => `"${(r as any)[h] ?? ''}"`).join(',')),
              ].join('\n');
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'messages.csv';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </TopBar>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">From</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Subject</th>
                <th className="px-4 py-3 text-left">Received</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    Laddar…
                  </td>
                </tr>
              ) : filtered.length ? (
                filtered.map((m) => (
                  <tr key={m.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{m.full_name}</div>
                      <div className="text-xs text-gray-500">
                        {m.company ? m.company + ' • ' : ''}
                        <span className={cx('px-2 py-0.5 rounded-md text-xs', badgeClass(m.from_type))}>
                          {m.from_type}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{m.email}</td>
                    <td className="px-4 py-3 max-w-[360px] truncate">{m.subject}</td>
                    <td className="px-4 py-3">{formatDate(m.created_at)}</td>
                    <td className="px-4 py-3">
                      <select
                        value={m.status}
                        onChange={(e) => updateStatus(m.id, e.target.value as any)}
                        className="h-8 rounded-md px-2 text-xs border border-gray-200 bg-white"
                      >
                        <option value="new">new</option>
                        <option value="read">read</option>
                        <option value="archived">archived</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert(m.message)}
                          className="inline-flex items-center gap-1 h-8 px-3 rounded-md border border-gray-200 hover:bg-gray-50"
                        >
                          <Eye className="h-4 w-4" /> View
                        </button>
                        <a
                          href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                          className="inline-flex items-center gap-1 h-8 px-3 rounded-md border border-gray-200 hover:bg-gray-50"
                        >
                          <Mail className="h-4 w-4" /> Reply
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-6" colSpan={6}>
                    <EmptyState
                      icon={MessageSquare}
                      title="No messages found"
                      description="No messages match your current filters."
                      onReset={reset}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden divide-y">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Laddar…</div>
          ) : filtered.length ? (
            filtered.map((m) => (
              <div key={m.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{m.full_name}</div>
                    <div className="text-xs text-gray-500">
                      {m.company ? m.company + ' • ' : ''}
                      <span className={cx('px-2 py-0.5 rounded-md text-xs', badgeClass(m.from_type))}>
                        {m.from_type}
                      </span>
                    </div>
                  </div>
                  <span className={cx('px-2 py-0.5 rounded-md text-xs', badgeClass(m.status))}>
                    {m.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-700">{m.subject}</div>
                <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(m.created_at)}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => alert(m.message)}
                    className="flex-1 inline-flex items-center justify-center gap-1 h-9 rounded-md border border-gray-200 hover:bg-gray-50"
                  >
                    <Eye className="h-4 w-4" /> View
                  </button>
                  <a
                    href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                    className="flex-1 inline-flex items-center justify-center gap-1 h-9 rounded-md border border-gray-200 hover:bg-gray-50"
                  >
                    <Mail className="h-4 w-4" /> Reply
                  </a>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              icon={MessageSquare}
              title="No messages found"
              description="No messages match your current filters."
              onReset={reset}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/** =========================
 *  Sektion: Staffing Requests
 *  ========================= */
function RequestsSection() {
  const [list, setList] = useState<StaffingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | StaffingRequest['status']>('all');
  const [location, setLocation] = useState<'all' | string>('all');
  const [role, setRole] = useState<'all' | string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'company'>('date');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [editing, setEditing] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  async function fetchReqs() {
    setLoading(true);
    const { data, error } = await supabase
      .from('staffing_requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setList((data ?? []) as StaffingRequest[]);
    setLoading(false);
  }
  useEffect(() => {
    fetchReqs();
  }, []);

  const locations = useMemo(
    () => Array.from(new Set(list.map((r) => r.location).filter(Boolean))) as string[],
    [list]
  );
  const roles = useMemo(
    () => Array.from(new Set(list.map((r) => r.role_needed).filter(Boolean))) as string[],
    [list]
  );

  const filtered = useMemo(() => {
    let out = list.filter((r) => {
      const text = [r.company_name, r.contact_person, r.role_needed, r.location].join(' ').toLowerCase();
      const matchQ = text.includes(q.toLowerCase());
      const matchS = status === 'all' ? true : r.status === status;
      const matchL = location === 'all' ? true : r.location === location;
      const matchR = role === 'all' ? true : r.role_needed === role;
      return matchQ && matchS && matchL && matchR;
    });
    out.sort((a, b) => {
      if (sortBy === 'company') {
        return order === 'asc'
          ? a.company_name.localeCompare(b.company_name)
          : b.company_name.localeCompare(a.company_name);
      }
      const aa = new Date(a.created_at).getTime();
      const bb = new Date(b.created_at).getTime();
      return order === 'asc' ? aa - bb : bb - aa;
    });
    return out;
  }, [list, q, status, location, role, sortBy, order]);

  async function updateStatus(id: string, s: StaffingRequest['status']) {
    const { error } = await supabase.from('staffing_requests').update({ status: s }).eq('id', id);
    if (!error) setList((prev) => prev.map((r) => (r.id === id ? { ...r, status: s } : r)));
  }

  async function saveNotes(id: string) {
    const { error } = await supabase.from('staffing_requests').update({ notes }).eq('id', id);
    if (!error)
      setList((prev) => prev.map((r) => (r.id === id ? { ...r, notes } : r)));
    setEditing(null);
    setNotes('');
  }

  const reset = () => {
    setQ('');
    setStatus('all');
    setLocation('all');
    setRole('all');
    setSortBy('date');
    setOrder('desc');
  };

  return (
    <div>
      <TopBar title="Staffing Requests" search={q} onSearch={setQ}>
        <div className="flex flex-wrap gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm"
          >
            <option value="all">All status</option>
            <option value="new">New</option>
            <option value="qualified">Qualified</option>
            <option value="contacted">Contacted</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm"
          >
            <option value="all">All locations</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm"
          >
            <option value="all">All roles</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <button
            onClick={() => fetchReqs()}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
          <button
            onClick={() => {
              if (!filtered.length) return;
              const headers = Object.keys(filtered[0] as any);
              const csv = [
                headers.join(','),
                ...filtered.map((r) => headers.map((h) => `"${(r as any)[h] ?? ''}"`).join(',')),
              ].join('\n');
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'staffing-requests.csv';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </TopBar>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">
                  <button
                    className="inline-flex items-center gap-1"
                    onClick={() => {
                      setSortBy('company');
                      setOrder(sortBy === 'company' && order === 'asc' ? 'desc' : 'asc');
                    }}
                  >
                    Company
                    {sortBy === 'company' ? (
                      order === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : null}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Role Needed</th>
                <th className="px-4 py-3 text-left">Headcount</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">
                  <button
                    className="inline-flex items-center gap-1"
                    onClick={() => {
                      setSortBy('date');
                      setOrder(sortBy === 'date' && order === 'asc' ? 'desc' : 'asc');
                    }}
                  >
                    Created
                    {sortBy === 'date' ? (
                      order === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : null}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Notes</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                    Laddar…
                  </td>
                </tr>
              ) : filtered.length ? (
                filtered.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.company_name}</td>
                    <td className="px-4 py-3">
                      <div className="text-gray-900">{r.contact_person}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5" />
                        {r.email}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                        <Phone className="h-3.5 w-3.5" />
                        {r.phone}
                      </div>
                    </td>
                    <td className="px-4 py-3">{r.role_needed}</td>
                    <td className="px-4 py-3">{r.headcount}</td>
                    <td className="px-4 py-3">{r.location}</td>
                    <td className="px-4 py-3">{formatDate(r.created_at)}</td>
                    <td className="px-4 py-3">
                      <select
                        value={r.status}
                        onChange={(e) => updateStatus(r.id, e.target.value as any)}
                        className="h-8 rounded-md px-2 text-xs border border-gray-200 bg-white"
                      >
                        <option value="new">new</option>
                        <option value="qualified">qualified</option>
                        <option value="contacted">contacted</option>
                        <option value="won">won</option>
                        <option value="lost">lost</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      {editing === r.id ? (
                        <div className="space-y-2">
                          <textarea
                            className="w-full min-h-[64px] rounded-md border border-gray-200 p-2 text-sm"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveNotes(r.id)}
                              className="h-8 px-3 rounded-md border border-gray-200 hover:bg-gray-50"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditing(null);
                                setNotes('');
                              }}
                              className="h-8 px-3 rounded-md border border-gray-200 hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="group">
                          <div className="text-sm text-gray-700 line-clamp-2">{r.notes || '—'}</div>
                          <button
                            onClick={() => {
                              setEditing(r.id);
                              setNotes(r.notes || '');
                            }}
                            className="mt-1 inline-flex items-center gap-1 h-8 px-2 rounded-md border border-gray-200 hover:bg-gray-50 opacity-0 group-hover:opacity-100"
                          >
                            <Edit className="h-3.5 w-3.5" />
                            Edit
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${r.email}?subject=Re: ${encodeURIComponent(r.role_needed)}`}
                        className="inline-flex items-center gap-1 h-8 px-3 rounded-md border border-gray-200 hover:bg-gray-50"
                      >
                        <Mail className="h-4 w-4" />
                        Contact
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-6" colSpan={9}>
                    <EmptyState
                      icon={Briefcase}
                      title="No staffing requests found"
                      description="No requests match your current filters."
                      onReset={reset}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden divide-y">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Laddar…</div>
          ) : filtered.length ? (
            filtered.map((r) => (
              <div key={r.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{r.company_name}</div>
                    <div className="text-sm text-gray-500">{r.role_needed}</div>
                  </div>
                  <span className={cx('px-2 py-0.5 rounded-md text-xs', badgeClass(r.status))}>
                    {r.status}
                  </span>
                </div>
                <div className="mt-2 text-sm">
                  <div>
                    <b>Contact:</b> {r.contact_person}
                  </div>
                  <div className="text-gray-500 flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" />
                    {r.email}
                  </div>
                  <div className="text-gray-500 flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" />
                    {r.phone}
                  </div>
                  <div>
                    <b>Headcount:</b> {r.headcount}
                  </div>
                  <div>
                    <b>Location:</b> {r.location}
                  </div>
                  <div className="text-gray-500 flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(r.created_at)}
                  </div>
                  {r.notes && (
                    <div className="mt-1">
                      <b>Notes:</b> {r.notes}
                    </div>
                  )}
                </div>
                <div className="mt-3 flex gap-2">
                  <a
                    href={`mailto:${r.email}?subject=Re: ${encodeURIComponent(r.role_needed)}`}
                    className="flex-1 inline-flex items-center justify-center gap-1 h-9 rounded-md border border-gray-200 hover:bg-gray-50"
                  >
                    <Mail className="h-4 w-4" /> Contact
                  </a>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              icon={Briefcase}
              title="No staffing requests found"
              description="No requests match your current filters."
              onReset={reset}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/** =========================
 *  AdminShell med sidebar
 *  ========================= */
export default function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'applications' | 'messages' | 'requests' | 'settings'>('applications');

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Mobil topp */}
      <div className="lg:hidden flex items-center justify-between px-4 h-14 border-b">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-gray-200"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="font-semibold">Workplan Admin</div>
        <div className="w-9" />
      </div>

      {/* Sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-80 bg-white border-r">
            <SidebarContent tab={tab} setTab={(t) => { setTab(t); setOpen(false); }} onSignOut={signOut} />
          </aside>
        </div>
      )}

      <aside className="hidden lg:flex lg:flex-col lg:w-80 lg:fixed lg:inset-y-0 bg-white border-r">
        <SidebarContent tab={tab} setTab={setTab} onSignOut={signOut} />
      </aside>

      {/* Content */}
      <main className="lg:pl-80 p-6">
        {tab === 'applications' && <ApplicationsSection />}
        {tab === 'messages' && <MessagesSection />}
        {tab === 'requests' && <RequestsSection />}
        {tab === 'settings' && (
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold mb-2">Settings</h2>
            <p className="text-gray-600 mb-6">Manage your admin preferences.</p>
            <div className="rounded-xl border p-6 space-y-4">
              <div>
                <label className="text-sm font-medium">Company name</label>
                <input className="mt-1 w-full h-10 rounded-lg border px-3" placeholder="Workplan AB" />
              </div>
              <div>
                <label className="text-sm font-medium">Admin email</label>
                <input className="mt-1 w-full h-10 rounded-lg border px-3" type="email" placeholder="admin@company.com" />
              </div>
              <button className="h-10 px-4 rounded-lg border border-gray-200 hover:bg-gray-50">Save</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarContent({
  tab,
  setTab,
  onSignOut,
}: {
  tab: 'applications' | 'messages' | 'requests' | 'settings';
  setTab: (t: 'applications' | 'messages' | 'requests' | 'settings') => void;
  onSignOut: () => void;
}) {
  const items = [
    { id: 'applications', label: 'Applications', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'requests', label: 'Requests', icon: Briefcase },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="flex flex-col h-full">
      <div className="h-14 px-6 border-b flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gray-900 text-white grid place-items-center">W</div>
        <div>
          <div className="font-semibold">Workplan</div>
          <div className="text-xs text-gray-500">Admin Panel</div>
        </div>
      </div>

      <nav className="flex-1 p-3">
        <ul className="space-y-1.5">
          {items.map((it) => {
            const Icon = it.icon;
            const active = tab === it.id;
            return (
              <li key={it.id}>
                <button
                  onClick={() => setTab(it.id)}
                  className={cx(
                    'w-full h-10 rounded-lg px-3 flex items-center gap-3 text-sm transition-colors',
                    active
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {it.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t">
        <button
          onClick={onSignOut}
          className="w-full h-10 rounded-lg px-3 inline-flex items-center gap-3 text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4.5 w-4.5" />
          Sign out
        </button>
      </div>
    </div>
  );
}

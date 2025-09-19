// src/admin/shared.tsx
import React from 'react';

/* ========== Typer ========== */
export type Application = {
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

export type ContactMessage = {
  id: string;
  from_type: 'candidate' | 'company' | 'staffing_request';
  full_name: string;
  company: string | null;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'archived';
};

export type StaffingRequest = {
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

/* 🔥 Ny typ för jobbannonser */
export type Job = {
  id: string;
  title: string;
  location: string | null;
  employment_type: string | null; // ex: heltid, deltid
  description_md: string | null; // markdown-text
  salary_min: number | null;
  salary_max: number | null;
  slug: string | null; // för URL:er
  published: boolean;
  posted_at: string;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
};

/* ========== Utils ========== */
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('sv-SE', { year: 'numeric', month: 'short', day: 'numeric' });

export const badgeClass = (kind: string) => {
  const map: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    reviewed: 'bg-yellow-100 text-yellow-800',
    interview: 'bg-purple-100 text-purple-800',
    rejected: 'bg-red-100 text-red-800',
    hired: 'bg-green-100 text-green-800',
    read: 'bg-gray-100 text-gray-800',
    archived: 'bg-gray-100 text-gray-800',
    candidate: 'bg-blue-100 text-blue-800',
    company: 'bg-indigo-100 text-indigo-800',
    qualified: 'bg-orange-100 text-orange-800',
    contacted: 'bg-indigo-100 text-indigo-800',
    won: 'bg-green-100 text-green-800',
    lost: 'bg-red-100 text-red-800',
    published: 'bg-green-100 text-green-800',
    draft: 'bg-gray-100 text-gray-800',
  };
  return map[kind] ?? 'bg-gray-100 text-gray-800';
};

/* Hjälp: svenska etiketter för statusar */
export function statusLabel(
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

/* Statuslistor (för select-fält) */
export const APP_STATUSES: { value: Application['status']; label: string }[] = [
  { value: 'new', label: 'Ny' },
  { value: 'reviewed', label: 'Granskad' },
  { value: 'interview', label: 'Intervju' },
  { value: 'rejected', label: 'Avslagen' },
  { value: 'hired', label: 'Anställd' },
];

export const MSG_STATUSES: { value: ContactMessage['status']; label: string }[] = [
  { value: 'new', label: 'Ny' },
  { value: 'read', label: 'Läst' },
  { value: 'archived', label: 'Arkiverad' },
];

export const REQ_STATUSES: { value: StaffingRequest['status']; label: string }[] = [
  { value: 'new', label: 'Ny' },
  { value: 'qualified', label: 'Kvalificerad' },
  { value: 'contacted', label: 'Kontaktad' },
  { value: 'won', label: 'Vunnen' },
  { value: 'lost', label: 'Förlorad' },
];

/* Slugify */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

/* ========== Delade UI-komponenter ========== */
export function TopBar({
  title, q, setQ, right,
}: { title: string; q: string; setQ: (v: string) => void; right?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex gap-2 items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Sök…"
          className="border rounded-lg px-3 py-2 w-64"
        />
        {right}
      </div>
    </div>
  );
}

export function EmptyState({
  title, hint,
}: { title: string; hint?: string }) {
  return (
    <div className="p-10 text-center text-gray-600">
      <div className="text-lg font-medium">{title}</div>
      {hint && <div className="text-sm text-gray-500 mt-1">{hint}</div>}
    </div>
  );
}

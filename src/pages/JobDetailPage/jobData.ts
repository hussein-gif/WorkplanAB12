// src/pages/JobsPage/jobData.ts
import { supabase } from '../../supabaseClient';

// Samma typnamn som tidigare exporteras
export type JobData = {
  id: string;
  slug: string | null;
  title: string;
  company: string;
  location: string;
  industry: string | null;
  omfattning: string;            // från employment_type
  salary: string | null;         // fri text
  summary: string;
  aboutRole: string;
  responsibilities: string[];    // jsonb[]
  requirements: string[];        // jsonb[]
  recruitmentProcess: string;
  recruiterEmail: string;
  companyLogo: string | null;
  posted_at: string;
  expires_at: string | null;
  published: boolean;
  startDate: string | null;
};

// Behåll export-namnet så att befintliga imports inte kraschar
// (detta används inte längre – lämnas tomt med flit)
export const mockJobData: JobData[] = [];

// Enkel slugify om du behöver generera länkar lokalt
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Mapper från DB-rad → JobData som UI-koden förväntar sig
function mapRow(r: any): JobData {
  return {
    id: String(r.id),
    slug: r.slug ?? null,
    title: r.title,
    company: r.company,
    location: r.location,
    industry: r.industry ?? null,
    omfattning: r.employment_type,       // mappning
    salary: r.salary ?? null,
    summary: r.summary,
    aboutRole: r.about_role ?? r.aboutRole ?? '', // stöd för ev. snake_case
    responsibilities: Array.isArray(r.responsibilities) ? r.responsibilities : [],
    requirements: Array.isArray(r.requirements) ? r.requirements : [],
    recruitmentProcess: r.recruitment_process ?? r.recruitmentProcess ?? '',
    recruiterEmail: r.recruiter_email ?? r.recruiterEmail ?? '',
    companyLogo: r.company_logo ?? r.companyLogo ?? null,
    posted_at: r.posted_at,
    expires_at: r.expires_at ?? null,
    published: !!r.published,
    startDate: r.start_date ?? r.startDate ?? null,
  };
}

/**
 * Hämta alla publicerade jobb (exkludera utgångna om expires_at < now()).
 * Sorteras med senaste först.
 */
export async function fetchPublishedJobs(): Promise<JobData[]> {
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('published', true)
    .or(`expires_at.is.null,expires_at.gt.${nowIso}`)
    .order('posted_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRow);
}

/**
 * Hämta ett specifikt publicerat jobb via slug eller id.
 * Returnerar null om inget hittas eller om det är opublicerat/utgånget.
 */
export async function fetchPublishedJobByIdOrSlug(idOrSlug: string): Promise<JobData | null> {
  const nowIso = new Date().toISOString();
  // Supabase or-filter: matcha antingen id eller slug
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('published', true)
    .or(`expires_at.is.null,expires_at.gt.${nowIso}`)
    .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
  return data ? mapRow(data) : null;
}

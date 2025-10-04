import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, MapPin, Building, Mail } from 'lucide-react';
import JobApplicationSection from './JobApplicationSection';
import SEO from '../../components/SEO';
import { supabase } from '../../supabaseClient';

type SharedFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  gdprConsent: boolean;
};

type JobData = {
  id: string;
  slug: string | null;
  title: string;
  company: string;
  companyLogo?: string | null;
  location: string;
  industry?: string | null;
  omfattning: 'Heltid' | 'Deltid' | 'OTHER';
  salary?: string | null;
  summary?: string | null;
  aboutRole?: string | null;
  responsibilities: string[];
  requirements: string[];
  recruitmentProcess?: string | null;
  recruiterEmail?: string | null;
  startDate?: string | null;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const isUrl = (v?: string | null) => !!v && /^https?:\/\//i.test(v);

const JobDetailPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<JobData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<SharedFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    gdprConsent: false,
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [otherFile, setOtherFile] = useState<File | null>(null);

  useLayoutEffect(() => {
    document.documentElement.classList.add('force-nav-dark');
    return () => {
      document.documentElement.classList.remove('force-nav-dark');
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
    (async () => {
      if (!jobId) {
        setJob(null);
        setLoading(false);
        return;
      }

      const rawKey = decodeURIComponent(jobId ?? '');
const key = rawKey.trim();           // t.ex. "skjutstativförare"
const normKey = slugify(key);        // --> "skjutstativforare" (utan å/ä/ö)


      let { data, error } = await supabase
        .from('jobs')
        .select(
          [
            'id',
            'slug',
            'title',
            'company',
            'company_logo',
            'location',
            'industry',
            'employment_type',
            'salary',
            'summary',
            'about_role',
            'responsibilities',
            'requirements',
            'recruitment_process',
            'recruiter_email',
            'start_date',
            'published',
          ].join(', ')
        )
        .or(`slug.eq.${key},id.eq.${key}`)
        .eq('published', true)
        .limit(1)
        .maybeSingle();

      if (!data) {
        const { data: list } = await supabase
          .from('jobs')
          .select(
            [
              'id',
              'slug',
              'title',
              'company',
              'company_logo',
              'location',
              'industry',
              'employment_type',
              'salary',
              'summary',
              'about_role',
              'responsibilities',
              'requirements',
              'recruitment_process',
              'recruiter_email',
              'start_date',
              'published',
            ].join(', ')
          )
          .eq('published', true);

        const found =
          (list ?? []).find((j: any) => j.title && slugify(j.title) === key) ?? null;
        data = found || null;
      }

      if (error) {
        console.error(error);
      }

      if (!data) {
        setJob(null);
        setLoading(false);
        return;
      }

      const rawEmployment = (data.employment_type ?? '').toString().trim();
      const rawLower = rawEmployment.toLowerCase();

      let omfattning: 'Heltid' | 'Deltid' | 'OTHER' = 'OTHER';
      if (rawLower.includes('heltid') || rawLower.includes('full')) {
        omfattning = 'Heltid';
      } else if (rawLower.includes('deltid') || rawLower.includes('part')) {
        omfattning = 'Deltid';
      }

      const employmentDisplay = rawEmployment;

      const mapped: JobData = {
        id: data.id,
        slug: data.slug,
        title: data.title ?? '',
        company: data.company ?? 'Workplan',
        companyLogo: data.company_logo ?? (data.company ? data.company[0] : '•'),
        location: data.location ?? '',
        industry: data.industry ?? 'Lager & Logistik',
        omfattning,
        salary: data.salary ?? '',
        summary: data.summary ?? '',
        aboutRole: data.about_role ?? '',
        responsibilities: Array.isArray(data.responsibilities) ? data.responsibilities : [],
        requirements: Array.isArray(data.requirements) ? data.requirements : [],
        recruitmentProcess: data.recruitment_process ?? '',
        recruiterEmail: data.recruiter_email ?? '',
        startDate: data.start_date ?? null,
      };

      // @ts-expect-error – behåll för visning om OTHER
      (mapped as any).employmentDisplay = employmentDisplay;

      setJob(mapped);
      setLoading(false);
    })();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7FAFF] flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#0B274D]/20 border-top-[#0B274D] rounded-full animate-spin mx-auto mb-6" />
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-[#0B274D]/40 rounded-full animate-spin mx-auto"
              style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
            />
          </div>
          <p className="text-[#08132B]/70 text-lg font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
            Laddar tjänst...
          </p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#F7FAFF] flex items-center justify-center">
        <p className="text-[#08132B]/70 text-lg">Kunde inte hitta tjänsten.</p>
      </div>
    );
  }

  const handleBack = () => navigate('/jobb');

  // ⭐️ ÄNDRING: scrolla med fast offset i stället för scrollIntoView
  const handleApply = () => {
    const el = document.getElementById('application-form');
    if (!el) return;
    const HEADER_OFFSET = 120; // ~höjd för header + sticky tillbaka-knapp
    const rect = el.getBoundingClientRect();
    const y = window.scrollY + rect.top - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const startDate = job.startDate || 'Enligt överenskommelse';
  const industry = job.industry || '';

  const employmentType =
    job.omfattning === 'Heltid' ? 'FULL_TIME' :
    job.omfattning === 'Deltid' ? 'PART_TIME' : 'OTHER';

  const hiringOrgLogo = 'https://www.work-plan.se/logo.png';
  const canonicalUrl = `https://www.work-plan.se/jobb/${encodeURIComponent(jobId ?? '')}`;

  const jobDescription = `
    <p>${job.summary || ''}</p>
    ${job.aboutRole ? `<p>${job.aboutRole}</p>` : ''}
  `.trim();

  const jobPostingLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": jobDescription,
    "datePosted": new Date().toISOString(),
    "employmentType": employmentType,
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company,
      "sameAs": "https://www.work-plan.se",
      "logo": hiringOrgLogo
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location,
        "addressCountry": "SE"
      }
    },
    "applicantLocationRequirements": { "@type": "Country", "name": "SE" },
    "industry": industry || "Lager & Logistik",
    "incentiveCompensation": job.salary || undefined,
    "validThrough": undefined,
    "directApply": true,
    "url": canonicalUrl
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Jobb", "item": "https://www.work-plan.se/jobb" },
      { "@type": "ListItem", "position": 2, "name": job.title, "item": canonicalUrl }
    ]
  };

  return (
    <>
      <SEO
        title={`${job.title} – ${job.location} | Workplan`}
        description={`Workplan söker ${job.title} för ${job.company} i ${job.location}. Start: ${startDate}. Ansök idag och bli en del av framtidens lager & logistik.`}
        canonical={canonicalUrl}
        jsonLd={[jobPostingLd, breadcrumbsLd]}
      />

      <div className="relative min-h-screen bg-[#F7FAFF] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-24 -left-24 w-[40rem] h-[40rem] rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle at top left, rgba(8,19,43,0.12), transparent 60%)' }}
          />
          <div
            className="absolute -bottom-32 -right-16 w-[36rem] h-[36rem] rounded-full opacity-15 blur-3xl"
            style={{ background: 'radial-gradient(circle at bottom right, rgba(8,19,43,0.10), transparent 60%)' }}
          />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(8,19,43,0.18) 1px, transparent 1px),
                linear-gradient(90deg, rgba(8,19,43,0.18) 1px, transparent 1px)
              `,
              backgroundSize: '56px 56px',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-8 pt-28 md:pt-32">
          {/* Sticky “Tillbaka” – oförändrat från förra steget */}
          <div className="sticky top-24 md:top-28 z-20">
            <button
              onClick={handleBack}
              className="
                group flex items-center space-x-2 px-4 py-2 mb-6
                rounded-lg border bg-transparent
                text-[#08132B]/60 border-[#08132B]/10
                hover:bg-[#08132B]/5 hover:text-[#08132B]
                transition-all duration-200
              "
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
              <span className="text-sm">Tillbaka</span>
            </button>
          </div>

          <div
            className={`
              flex items-start justify-between gap-4 mb-4
              transition-all duration-700 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}
            `}
            style={{ transitionDelay: '120ms' }}
          >
            <h1
              className="text-4xl md:text-5xl leading-tight text-[#08132B]"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
            >
              {job.title}
            </h1>

            <div className="shrink-0">
              <div className="w-16 h-16 rounded-xl bg-[#0B274D]/5 border border-[#0B274D]/20 flex items-center justify-center overflow-hidden">
                {isUrl(job.companyLogo) ? (
                  <img
                    src={job.companyLogo as string}
                    alt={`${job.company} logotyp`}
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                  />
                ) : (
                  <span
                    className="text-2xl font-bold select-none text-[#0B274D]"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    {job.companyLogo || (job.company?.[0] ?? '•')}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p
            className={`
              text-[#08132B]/80 leading-relaxed mb-5 max-w-3xl
              transition-all duration-700 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
            `}
            style={{ transitionDelay: '200ms', fontFamily: 'Inter, sans-serif' }}
          >
            {job.summary}
          </p>

          <div className="mb-8">
            <button
              onClick={handleApply}
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0B274D] text-white font-medium shadow-[0_10px_24px_rgba(11,39,77,0.28)] transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="relative z-10">Ansök här</span>
              <ArrowRight size={18} className="relative z-10" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(120px 60px at 20% 0%, rgba(255,255,255,0.22), transparent 70%)' }}
              />
              <div className="pointer-events-none absolute -left-16 top-0 bottom-0 w-16 bg-white/25 -skew-x-12 -translate-x-24 group-hover:translate-x-[140%] transition-transform duration-700" />
            </button>
          </div>

          <div
            className={`
              bg-white border border-[#08132B]/10 rounded-xl p-6 mb-14
              grid grid-cols-2 md:grid-cols-4 gap-6
              transition-all duration-700 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
            `}
            style={{ transitionDelay: '260ms' }}
          >
            <div className="text-center">
              <Building size={20} className="text-[#08132B]/60 mx-auto mb-2" />
              <div className="text-xs uppercase tracking-wider text-[#08132B]/60 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Företag
              </div>
              <div className="text-[#08132B] font-bold" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}>
                {job.company}
              </div>
            </div>
            <div className="text-center">
              <Clock size={20} className="text-[#08132B]/60 mx-auto mb-2" />
              <div className="text-xs uppercase tracking-wider text-[#08132B]/60 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Startdatum
              </div>
              <div className="text-[#08132B] font-bold" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}>
                {startDate}
              </div>
            </div>
            <div className="text-center">
              <MapPin size={20} className="text-[#08132B]/60 mx-auto mb-2" />
              <div className="text-xs uppercase tracking-wider text-[#08132B]/60 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Plats
              </div>
              <div className="text-[#08132B] font-bold" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}>
                {job.location}
              </div>
            </div>
            <div className="text-center">
              <svg className="mx-auto mb-2" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h10" stroke="#0B274D" strokeWidth="2" strokeLinecap="round" className="opacity-60" />
              </svg>
              <div className="text-xs uppercase tracking-wider text-[#08132B]/60 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Omfattning
              </div>
              <div className="text-[#08132B] font-bold" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}>
                {job.omfattning === 'OTHER'
                  ? (job as any).employmentDisplay || 'OTHER'
                  : job.omfattning}
              </div>
            </div>
          </div>

          <div className="space-y-16">
            <section className={`${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'} transition-all duration-700 transform`}>
              <h2
                className="text-3xl md:text-4xl text-[#08132B] mb-4 md:mb-6"
                style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
              >
                Om rollen
              </h2>
              <p className="text-[#08132B]/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                {job.aboutRole}
              </p>
            </section>

            <section className={`${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'} transition-all duration-700 transform`}>
              <h2
                className="text-3xl md:text-4xl text-[#08132B] mb-4 md:mb-6"
                style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
              >
                Arbetsuppgifter
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#08132B]/30 rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-[#08132B]/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {responsibility}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={`${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'} transition-all duration-700 transform`}>
              <h2
                className="text-3xl md:text-4xl text-[#08132B] mb-4 md:mb-6"
                style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
              >
                Vem vi söker
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#08132B]/30 rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-[#08132B]/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {requirement}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={`${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'} transition-all duration-700 transform`}>
              <h2
                className="text-3xl md:text-4xl text-[#08132B] mb-4 md:mb-6"
                style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
              >
                Vår rekryteringsprocess
              </h2>
              <p className="text-[#08132B]/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                {job.recruitmentProcess}
              </p>
            </section>

            <section className={`${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'} transition-all duration-700 transform`}>
              <div className="bg-white border border-[#08132B]/10 rounded-xl p-6">
                <h3
                  className="text-2xl md:text-3xl text-[#08132B] mb-4"
                  style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
                >
                  Har du frågor?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={`mailto:${job.recruiterEmail}`}
                    className="flex items-center gap-3 p-4 bg-[#0B274D]/5 rounded-lg hover:bg-[#0B274D]/10 transition-colors"
                  >
                    <Mail size={20} className="text-[#0B274D]" />
                    <div>
                      <div className="text-[#08132B]/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>E-post</div>
                      <div className="text-[#08132B] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {job.recruiterEmail}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-14 flex">
            <button
              onClick={handleApply}
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0B274D] text-white font-medium shadow-[0_10px_24px_rgba(11,39,77,0.28)] transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="relative z-10">Ansök här</span>
              <ArrowRight size={18} className="relative z-10" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(120px 60px at 20% 0%, rgba(255,255,255,0.22), transparent 70%)' }}
              />
              <div className="pointer-events-none absolute -left-16 top-0 bottom-0 w-16 bg-white/25 -skew-x-12 -translate-x-24 group-hover:translate-x-[140%] transition-transform duration-700" />
            </button>
          </div>
        </div>

        <JobApplicationSection
          jobTitle={job.title}
          companyName={job.company}
          industry={industry}
          location={job.location}
          formData={formData}
          setFormData={setFormData}
          cvFile={cvFile}
          setCvFile={setCvFile}
          otherFile={otherFile}
          setOtherFile={setOtherFile}
        />
      </div>
    </>
  );
};

export default JobDetailPage;

import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Briefcase, Building, Search } from 'lucide-react';
import { supabase } from '../../supabaseClient';

interface FeaturedJobsSectionProps {
  isVisible: boolean;
}

const SimpleHoverCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div
    className={`rounded-2xl transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl ${className ?? ''} group`}
  >
    {children}
  </div>
);

// ===== Helpers (identiska med JobsList) =====
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const isUrl = (v?: string | null) => !!v && /^https?:\/\//i.test(v || '');

const getOmfattning = (job: any) =>
  job.omfattning ?? job.employment_type ?? '';

const getJobImageUrl = (job: any): string | undefined => {
  if (isUrl(job.company_logo)) return job.company_logo as string;
  if (isUrl(job.companyLogo)) return job.companyLogo as string;
  if (isUrl(job.logo_url)) return job.logo_url as string;
  if (isUrl(job.logoUrl)) return job.logoUrl as string;
  if (isUrl(job.image_url)) return job.image_url as string;
  if (isUrl(job.imageUrl)) return job.imageUrl as string;
  if (isUrl(job.image)) return job.image as string;
  const maybeUrl: string | undefined =
    typeof job.companyLogo === 'string' ? job.companyLogo : undefined;
  if (isUrl(maybeUrl)) return maybeUrl;
  return undefined;
};

const getPostedLabel = (job: any): string => {
  const candidates = [
    job.posted_at,
    job.published_at,
    job.created_at,
    job.createdAt,
    job.inserted_at,
    job.updated_at,
    job.posted,
  ].filter(Boolean);

  let postedDate: Date | null = null;
  for (const c of candidates) {
    const d = new Date(c);
    if (!isNaN(d.getTime())) {
      postedDate = d;
      break;
    }
  }

  if (postedDate) {
    const now = new Date();
    let diffMs = now.getTime() - postedDate.getTime();
    if (diffMs < 0) diffMs = 0;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diffMs < 30 * 1000) return 'nyss';
    if (diffMs < minute) return 'mindre än 1 minut sedan';
    if (diffMs < hour) {
      const mins = Math.floor(diffMs / minute);
      return `${mins} minut${mins === 1 ? '' : 'er'} sedan`;
    }
    if (diffMs < day) {
      const hrs = Math.floor(diffMs / hour);
      return `${hrs} timme${hrs === 1 ? '' : 'r'} sedan`;
    }
    const days = Math.floor(diffMs / day);
    if (days <= 30) return `${days} dag${days === 1 ? '' : 'ar'} sedan`;
    try {
      return postedDate.toLocaleDateString('sv-SE');
    } catch {
      return '';
    }
  }

  if (typeof job.posted === 'string' && job.posted.trim()) {
    return job.posted.replace(/^[\s]*[-\u2212]\s*/, '');
  }
  return '';
};
// ===========================================

const FeaturedJobsSection: React.FC<FeaturedJobsSectionProps> = React.memo(({ isVisible }) => {
  const navigate = useNavigate();

  // Memoisera brus-bakgrunden så den inte skapas om varje render
  const noiseDataUrl = useMemo(() => {
    const noiseSvg = `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 1" />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#n)" opacity="0.3" />
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(noiseSvg)}`;
  }, []);

  // ✅ Hämta publicerade jobb (max 3) – exakt som i JobsList
  const [featuredJobs, setFeaturedJobs] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('published', true)
        .order('posted_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('FeaturedJobsSection fetch error:', error);
        setFeaturedJobs([]);
        return;
      }
      setFeaturedJobs(data ?? []);
    })();
  }, []);

  // Samma navigering som i JobsList
  const goToJob = (job: any) => {
    const idOrSlug = job.slug ?? (job.id != null ? String(job.id) : slugify(job.title ?? ''));
    navigate(`/jobb/${encodeURIComponent(idOrSlug)}`);
  };

  return (
    <section
      id="featured-jobs"
      className="relative py-16 md:py-24 px-6 md:px-8"
      style={{
        backgroundColor: '#08132B',
        contentVisibility: 'auto',
        containIntrinsicSize: '1px 1200px',
      }}
    >
      {/* Artistic background (oförändrad) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform" style={{ transform: 'translateZ(0)' }}>
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(800px 500px at 10% 15%, rgba(49,104,255,0.28), rgba(49,104,255,0) 60%)',
              'radial-gradient(700px 420px at 85% 30%, rgba(0,196,204,0.22), rgba(0,196,204,0) 62%)',
              'radial-gradient(600px 360px at 30% 90%, rgba(120,119,198,0.18), rgba(120,119,198,0) 64%)',
              'radial-gradient(900px 540px at 75% 80%, rgba(0,122,255,0.16), rgba(0,122,255,0) 65%)'
            ].join(','),
            mixBlendMode: 'screen',
          }}
        />
        <div
          className="absolute inset-0 opacity-20 rotate-[-8deg]"
          style={{
            backgroundImage:
              'linear-gradient( to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0) 70% )',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] opacity-15"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.12) 0deg, rgba(255,255,255,0) 60deg, rgba(255,255,255,0.12) 120deg, rgba(255,255,255,0) 180deg, rgba(255,255,255,0.12) 240deg, rgba(255,255,255,0) 300deg, rgba(255,255,255,0.12) 360deg)',
            WebkitMaskImage: 'radial-gradient(circle at center, transparent 0, black 28%, black 55%, transparent 70%)',
            maskImage: 'radial-gradient(circle at center, transparent 0, black 28%, black 55%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              'radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,0.35) 50%, transparent 51%)',
              'radial-gradient(1px 1px at 60% 10%, rgba(255,255,255,0.25) 50%, transparent 51%)',
              'radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.25) 50%, transparent 51%)',
              'radial-gradient(1px 1px at 35% 80%, rgba(255,255,255,0.2) 50%, transparent 51%)'
            ].join(', '),
            opacity: 0.25,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: `url(${noiseDataUrl})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 700px at 50% 20%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.25) 100%)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-medium text-white mb-3"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Lediga Jobb
          </h2>
          <p
            className="text-white/60 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            Upptäck utvalda roller från seriösa arbetsgivare. Klicka för detaljer och ansök direkt.
          </p>
        </div>

        {/* ===== MOBIL: identisk markup som JobsList ===== */}
        <div className="sm:hidden px-0">
          {featuredJobs.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-white/40" />
              </div>
              <h3 className="text-lg text-white/80">Inga lediga jobb tillgängliga just nu.</h3>
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {featuredJobs.map((job) => (
                <li
                  key={job.slug ?? job.id ?? job.title}
                  className="py-4 active:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => goToJob(job)}
                >
                  <div className="flex items-start gap-3">
                    {getJobImageUrl(job) ? (
                      <img
                        src={getJobImageUrl(job)}
                        alt={job.title}
                        loading="lazy"
                        className="w-9 h-9 rounded-lg object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center font-semibold shrink-0">
                        {(job.company ?? '•').charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3
                        className="text-white text-base font-semibold leading-tight truncate"
                        style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                      >
                        {job.title}
                      </h3>
                    </div>
                  </div>

                  <div
                    className="mt-2 flex flex-wrap items-center gap-3 text-[13px] text-white/75"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase size={14} /> {job.company}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} /> {getOmfattning(job)}
                    </span>
                  </div>

                  <div
                    className="mt-1 text-[12px] text-white/60"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {getPostedLabel(job)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ===== DESKTOP: identisk grid/kort som JobsList ===== */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16 justify-center">
            {featuredJobs.map((job) => (
              <SimpleHoverCard
                key={job.slug ?? job.id ?? job.title}
                className="w-full max-w-sm bg-white/95 backdrop-blur-sm border border-white/20 flex flex-col cursor-pointer"
              >
                <div className="p-5 flex-1 flex flex-col" onClick={() => goToJob(job)}>
                  <div className="flex items-start space-x-4 mb-4">
                    {getJobImageUrl(job) ? (
                      <img
                        src={getJobImageUrl(job)}
                        alt={job.title}
                        loading="lazy"
                        className="w-14 h-14 rounded-xl object-cover shadow-lg flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                        {(job.company ?? '•').charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-lg text-gray-900 mb-2 leading-tight font-medium"
                        style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                      >
                        {job.title}
                      </h3>
                      <div
                        className="text-base text-gray-700"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                      >
                        {job.company}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} className="text-gray-400" />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        {job.location}
                      </span>
                    </div>
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-gray-400" />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        {getOmfattning(job)}
                      </span>
                    </div>
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    <div className="flex items-center space-x-2">
                      <Building size={14} className="text-gray-400" />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        {job.industry ?? ''}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-end justify-between" onClick={() => goToJob(job)}>
                  <div
                    className="text-sm text-gray-500"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  >
                    {getPostedLabel(job)}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                      Ansök senast
                    </div>
                    <div
                      className="text-gray-700"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE')}
                    </div>
                  </div>
                </div>
              </SimpleHoverCard>
            ))}
          </div>
        </div>

        {/* CTA-knapp – oförändrad */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/jobs')}
            className="
              group relative px-8 py-4
              bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl
              font-medium tracking-wide
              hover:border-white/40 hover:bg-white/20
              transition-all duration-300
              shadow-lg hover:shadow-xl
              hover:scale-105 hover:-translate-y-1
              overflow-hidden
            "
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            <div className="relative flex items-center space-x-2">
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500
                }}
              >
                Se Alla Jobb
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
});

export default FeaturedJobsSection;

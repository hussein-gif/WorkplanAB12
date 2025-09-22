// src/pages/JobsPage/index.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import JobsHeader from './JobsHeader';
import JobsFilters from './JobsFilters';
import JobsList from './JobsList';
import SEO from '../../components/SEO';
import { supabase } from '../../supabaseClient';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  industry: string;
  omfattning: 'Heltid' | 'Deltid' | string;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  featured: boolean;
  urgent: boolean;
  companyLogo: string;
  slug?: string;
  employment_type?: string;
  /** 🔹 Läggs till för att lista ska kunna visa bilden (samma fält som detaljsidan använder) */
  company_logo?: string;
}

const RichBackground: React.FC = React.memo(() => {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        size: Math.random() * 6 + 4,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 10,
      })),
    []
  );

  useEffect(() => {
    let frame: number;
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      frame = requestAnimationFrame(() => setMouse({ x, y }));
    };
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`@keyframes fadePulse{0%,100%{opacity:.03}50%{opacity:.07}}`}</style>
      <div className="absolute inset-0" style={{ backgroundColor: '#08132B' }} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 40px),
            repeating-linear-gradient(45deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 60px)
          `,
          mixBlendMode: 'overlay',
          transform: `translate(${(mouse.x - 50) * 0.02}px, ${(mouse.y - 50) * 0.02}px)`,
        }}
      />
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: `${p.top}%`,
            left: `${p.left}%`,
            backgroundColor: 'rgba(255,255,255,0.04)',
            borderRadius: '2px',
            transform: `translate(${(mouse.x - 50) * 0.018}px, ${(mouse.y - 50) * 0.018}px)`,
            animation: `fadePulse ${p.duration}s ease-in-out ${p.delay}s infinite`,
            mixBlendMode: 'screen',
          }}
        />
      ))}
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[500px] h-[140px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 80%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.45) 100%)' }}
      />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E<filter id='n'%3E<feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
});

const LoadingPlaceholder = React.memo(() => (
  <div className="min-h-screen flex items-center justify-center relative bg-[#08132B]">
    <RichBackground />
    <div className="relative z-10 text-center">
      <div className="inline-flex items-center space-x-3 mb-2">
        <div
          role="status"
          aria-label="Laddar jobb"
          className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"
        />
        <h3
          className="text-xl text-white/90"
          style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
        >
          Laddar alla jobb...
        </h3>
      </div>
    </div>
  </div>
));

const EmptyState = React.memo(({ clearFilters }: { clearFilters: () => void }) => (
  <div className="py-20 text-center">
    <h3
      className="text-2xl text-white/80 mb-2"
      style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 400 }}
    >
      Inga tjänster hittades
    </h3>
    <p className="text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
      Prova att ändra dina sökkriterier eller återställ filtren.
    </p>
    <button
      onClick={clearFilters}
      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 transition rounded-md text-white"
    >
      Rensa filter
    </button>
  </div>
));

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedOmfattning, setSelectedOmfattning] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Blockera horisontell scroll globalt
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflowX;
    const prevBody = body.style.overflowX;
    html.style.overflowX = 'hidden';
    body.style.overflowX = 'hidden';
    return () => {
      html.style.overflowX = prevHtml;
      body.style.overflowX = prevBody;
    };
  }, []);

  // Hämta endast publicerade jobb
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('published', true)
        .order('posted_at', { ascending: false });

      if (error) {
        console.error('Supabase jobs error:', error);
        setJobs([]);
        setFilteredJobs([]);
        setIsLoading(false);
        return;
      }

      const mapped: Job[] = (data ?? []).map((j: any) => {
        const postedAt = j.posted_at ? new Date(j.posted_at) : null;
        const now = new Date();
        const diffMs = postedAt ? now.getTime() - postedAt.getTime() : 0;
        const diffH = Math.floor(diffMs / 36e5);
        const posted = !postedAt
          ? ''
          : diffH < 24
          ? `${diffH} timmar sedan`
          : `${Math.floor(diffH / 24)} dagar sedan`;

        return {
          id: String(j.id),
          title: j.title,
          company: j.company ?? '—',
          location: j.location ?? '—',
          industry: j.industry ?? '',
          omfattning: j.omfattning ?? j.employment_type ?? '',
          salary: j.salary ?? '',
          posted,
          description: j.summary ?? '',
          requirements: Array.isArray(j.requirements) ? j.requirements : [],
          featured: !!j.featured,
          urgent: !!j.urgent,
          /** 🔹 Om det är en full URL använder JobsList den direkt som bild */
          company_logo: j.company_logo ?? undefined,
          /** 🔹 Behåller bef. fält men låter URL vinna om den finns */
          companyLogo: (j.company_logo as string) ?? (j.company ? j.company[0] : ''),
          slug: j.slug,
          employment_type: j.employment_type,
        };
      });

      setJobs(mapped);
      setFilteredJobs(mapped);
      setIsLoading(false);
    })();
  }, []);

  // Filtrering
  useEffect(() => {
    let f = jobs;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      f = f.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.company.toLowerCase().includes(term) ||
          job.description.toLowerCase().includes(term) ||
          job.requirements.some((r) => r.toLowerCase().includes(term))
      );
    }
    if (selectedLocation) f = f.filter((j) => j.location === selectedLocation);
    if (selectedIndustry) f = f.filter((j) => j.industry === selectedIndustry);
    if (selectedOmfattning) f = f.filter((j) => j.omfattning === selectedOmfattning);
    if (showFeaturedOnly) f = f.filter((j) => j.featured);
    if (showUrgentOnly) f = f.filter((j) => j.urgent);
    setFilteredJobs(f);
  }, [
    searchTerm,
    selectedLocation,
    selectedIndustry,
    selectedOmfattning,
    showFeaturedOnly,
    showUrgentOnly,
    jobs,
  ]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedIndustry('');
    setSelectedOmfattning('');
    setShowFeaturedOnly(false);
    setShowUrgentOnly(false);
  };

  const locations = [...new Set(jobs.map((j) => j.location).filter(Boolean))];
  const industries = [...new Set(jobs.map((j) => j.industry).filter(Boolean))];
  const omfattningar = [...new Set(jobs.map((j) => j.omfattning).filter(Boolean))];

  if (isLoading) return <LoadingPlaceholder />;

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://www.work-plan.se/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.work-plan.se/jobb?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Jobb', item: 'https://www.work-plan.se/jobb' }],
  };

  return (
    <>
      <SEO
        title="Lediga jobb inom lager & logistik – sök idag | Workplan"
        description="Bläddra bland aktuella tjänster inom lager och logistik. Filtrera på ort, bransch och omfattning. Enkel ansökan och snabb återkoppling från Workplan."
        canonical="https://www.work-plan.se/jobb"
        jsonLd={[websiteLd, breadcrumbsLd]}
      />
      <div
        className="min-h-screen relative bg-[#08132B] overflow-x-hidden"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 1200px' }}
      >
        <RichBackground />
        <div className="relative z-10">
          <div
            className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[160px] rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
          />
          <JobsHeader filteredJobsCount={filteredJobs.length} />
          <JobsFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
            selectedOmfattning={selectedOmfattning}
            setSelectedOmfattning={setSelectedOmfattning}
            locations={locations}
            industries={industries}
            omfattningar={omfattningar}
            clearFilters={clearFilters}
          />
          {filteredJobs.length === 0 ? (
            <EmptyState clearFilters={clearFilters} />
          ) : (
            <JobsList jobs={filteredJobs} />
          )}
        </div>
      </div>
    </>
  );
};

export default JobsPage;

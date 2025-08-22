import React, { useState, useEffect, useRef } from 'react';
import JobsHeader from './JobsHeader';
import JobsFilters from './JobsFilters';
import JobsList from './JobsList';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  industry: string;
  omfattning: 'Heltid' | 'Deltid';
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  featured: boolean;
  urgent: boolean;
  companyLogo: string;
}

// Mer diskret, professionell mörkblå bakgrund med subtil struktur och liv
const RichBackground: React.FC = () => {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div
      ref={(el) => (containerRef.current = el)}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <style>{`
        @keyframes fadePulse {
          0%,100% { opacity: 0.03; }
          50% { opacity: 0.07; }
        }
      `}</style>

      {/* Bas: solid #08132B */}
      <div className="absolute inset-0" style={{ backgroundColor: '#08132B' }} />

      {/* Subtil diagonal textur – diskret och professionell */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 40px),
            repeating-linear-gradient(45deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 60px)
          `,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          transform: `translate(${(mouse.x - 50) * 0.02}px, ${(mouse.y - 50) * 0.02}px)`,
        }}
      />

      {/* Små subtila flytande rutor */}
      {Array.from({ length: 15 }).map((_, i) => {
        const size = Math.random() * 6 + 4;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderRadius: '2px',
              transform: `translate(${(mouse.x - 50) * 0.018}px, ${(mouse.y - 50) * 0.018}px)`,
              animation: `fadePulse ${10 + Math.random() * 10}s ease-in-out ${delay}s infinite`,
              pointerEvents: 'none',
              mixBlendMode: 'screen',
            }}
          />
        );
      })}

      {/* Mild halo bakom header */}
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[500px] h-[140px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 80%)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* Noise-overlay */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E<filter id='n'%3E<feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

const LoadingPlaceholder = () => (
  <div className="min-h-screen flex items-center justify-center relative bg-[#08132B]">
    <RichBackground />
    <div className="relative z-10 text-center">
      <div className="inline-flex items-center space-x-3 mb-2">
        <div role="status" aria-label="Laddar jobb" className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        <h3 className="text-xl text-white/90" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}>
          Laddar alla jobb...
        </h3>
      </div>
    </div>
  </div>
);

const EmptyState = ({ clearFilters }: { clearFilters: () => void }) => (
  <div className="py-20 text-center">
    <h3 className="text-2xl text-white/80 mb-2" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 400 }}>
      Inga tjänster hittades
    </h3>
    <p className="text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
      Prova att ändra dina sökkriterier eller återställ filtren.
    </p>
    <button onClick={clearFilters} className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 transition rounded-md text-white">
      Rensa filter
    </button>
  </div>
);

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

  // NYTT: blockera horisontell scroll globalt medan sidan är aktiv
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

  // Mock job data
  const mockJobs: Job[] = [/* ...samma som din kod... */];

  useEffect(() => {
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(term) ||
          job.company.toLowerCase().includes(term) ||
          job.description.toLowerCase().includes(term) ||
          job.requirements.some(req => req.toLowerCase().includes(term))
      );
    }
    if (selectedLocation) filtered = filtered.filter(job => job.location === selectedLocation);
    if (selectedIndustry) filtered = filtered.filter(job => job.industry === selectedIndustry);
    if (selectedOmfattning) filtered = filtered.filter(job => job.omfattning === selectedOmfattning);
    if (showFeaturedOnly) filtered = filtered.filter(job => job.featured);
    if (showUrgentOnly) filtered = filtered.filter(job => job.urgent);

    setFilteredJobs(filtered);
  }, [searchTerm, selectedLocation, selectedIndustry, selectedOmfattning, showFeaturedOnly, showUrgentOnly, jobs]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedIndustry('');
    setSelectedOmfattning('');
    setShowFeaturedOnly(false);
    setShowUrgentOnly(false);
  };

  const locations = [...new Set(jobs.map(job => job.location))];
  const industries = [...new Set(jobs.map(job => job.industry))];
  const omfattningar = [...new Set(jobs.map(job => job.omfattning))];

  if (isLoading) return <LoadingPlaceholder />;

  return (
    // NYTT: overflow-x-hidden även på sidan (extra säkerhet)
    <div className="min-h-screen relative bg-[#08132B] overflow-x-hidden">
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

        {filteredJobs.length === 0 ? <EmptyState clearFilters={clearFilters} /> : <JobsList jobs={filteredJobs} />}
      </div>
    </div>
  );
};

export default JobsPage;

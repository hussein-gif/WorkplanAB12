import React, { useState, useEffect, useRef } from 'react';
import JobsHeader from './JobsHeader';
import JobsFilters from './JobsFilters';
// import JobsList from './JobsList'; // inte längre används
import { MapPin, Clock } from 'lucide-react';

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

// Rich, mörkblå bakgrund med parallax, glows, grid, vignette och noise
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
    <div ref={(el) => (containerRef.current = el)} className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes floatSlow {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(8px,-6px); }
        }
        @keyframes floatSlowRev {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(-7px,5px); }
        }
        @keyframes pulseSmall {
          0%,100% { opacity: 0.08; }
          50% { opacity: 0.16; }
        }
      `}</style>

      {/* Basgradient: mörkblå utan lila */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0d1b35 0%, #112a5f 45%, #0d1b35 100%)',
        }}
      />

      {/* Parallax grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '160px 160px',
          transform: `translate(${(mouse.x - 50) * 0.08}px, ${(mouse.y - 50) * 0.08}px)`,
          mixBlendMode: 'overlay',
          opacity: 0.85,
        }}
      />

      {/* Flytande blå glows */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full blur-3xl animate-floatSlow"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.35) 0%, transparent 70%)',
          opacity: 0.25,
          top: '-150px',
          left: '-120px',
          transform: `translate(${(mouse.x - 50) * 0.18}px, ${(mouse.y - 50) * 0.12}px)`,
        }}
      />
      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-3xl animate-floatSlowRev"
        style={{
          background: 'radial-gradient(circle at 60% 50%, rgba(16,185,252,0.25) 0%, transparent 70%)',
          opacity: 0.2,
          right: '10%',
          bottom: '120px',
          transform: `translate(${(mouse.x - 50) * -0.15}px, ${(mouse.y - 50) * -0.08}px)`,
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-2xl"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(125,211,252,0.12) 0%, transparent 75%)',
          opacity: 0.15,
          left: '15%',
          top: '40%',
          transform: `translate(${(mouse.x - 50) * 0.1}px, ${(mouse.y - 50) * 0.07}px)`,
        }}
      />

      {/* Driftande soft overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 25% 35%, rgba(255,255,255,0.015) 0%, transparent 60%)',
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtil noise */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Pulserande små prickar */}
      {Array.from({ length: 30 }).map((_, i) => {
        const size = Math.random() * 2 + 1;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              backgroundColor: 'rgba(255,255,255,0.08)',
              animation: `pulseSmall ${6 + Math.random() * 4}s ease-in-out ${delay}s infinite`,
              mixBlendMode: 'screen',
            }}
          />
        );
      })}
    </div>
  );
};

// Loading placeholder med nya bakgrunden
const LoadingPlaceholder = () => (
  <div className="min-h-screen flex items-center justify-center relative">
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
);

// Tomtillstånd
const EmptyState = ({ clearFilters }: { clearFilters: () => void }) => (
  <div className="py-20 text-center">
    <h3 className="text-2xl text-white/80 mb-2" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 400 }}>
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
);

// Eget jobbkort som ersätter potentiellt problematiskt JobsList
const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const applyBy = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE');

  return (
    <div
      className="relative rounded-2xl cursor-pointer p-5 flex flex-col justify-between min-h-[170px]"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 25px 60px -10px rgba(0,0,0,0.35)',
      }}
    >
      <div>
        <div className="flex items-start gap-4 mb-3">
          <div
            className="
              w-14 h-14 rounded-xl
              bg-gradient-to-br from-[#1f3f8b] to-[#3b6de8]
              flex items-center justify-center
              text-white font-bold text-lg shadow
              flex-shrink-0
            "
          >
            {job.companyLogo}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="text-lg font-bold mb-0"
              style={{
                fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                color: '#fff',
              }}
            >
              {job.title}
            </h3>
            <div
              className="text-sm"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {job.company}
            </div>
          </div>
        </div>

        <div className="flex text-xs gap-4 mb-2" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif' }}>
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{job.omfattning}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-xs mt-4" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif' }}>
        <div>{job.posted}</div>
        <div>Ansök senast {applyBy}</div>
      </div>
    </div>
  );
};

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

  // Mock job data
  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechFlow AB',
      location: 'Örebro',
      industry: 'Lager & Logistik',
      omfattning: 'Heltid',
      salary: '650,000 - 850,000 SEK',
      posted: '2 dagar sedan',
      description: 'Vi söker en erfaren mjukvaruingenjör för att bygga nästa generations plattform.',
      requirements: ['React', 'TypeScript', 'Node.js', '5+ års erfarenhet'],
      featured: true,
      urgent: false,
      companyLogo: 'T',
    },
    {
      id: '2',
      title: 'Marketing Manager',
      company: 'GrowthCo',
      location: 'Örebro',
      industry: 'Lager & Logistik',
      omfattning: 'Heltid',
      salary: '450,000 - 550,000 SEK',
      posted: '1 dag sedan',
      description: 'Leda vårt marknadsföringsteam och utveckla strategier för tillväxt.',
      requirements: ['Digital marknadsföring', 'Google Analytics', 'SEO/SEM'],
      featured: false,
      urgent: true,
      companyLogo: 'G',
    },
    {
      id: '3',
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Örebro',
      industry: 'Lager & Logistik',
      omfattning: 'Deltid',
      salary: '4,000 - 5,000 SEK/dag',
      posted: '3 timmar sedan',
      description: 'Skapa användarcentrerade designlösningar för våra kunder.',
      requirements: ['Figma', 'Prototyping', 'User Research', 'Portfolio'],
      featured: true,
      urgent: false,
      companyLogo: 'D',
    },
    {
      id: '4',
      title: 'Data Analyst',
      company: 'DataInsights',
      location: 'Örebro',
      industry: 'Lager & Logistik',
      omfattning: 'Heltid',
      salary: '420,000 - 520,000 SEK',
      posted: '1 dag sedan',
      description: 'Analysera data för att ge insikter som driver affärsbeslut.',
      requirements: ['SQL', 'Python', 'Tableau', 'Statistik'],
      featured: false,
      urgent: false,
      companyLogo: 'D',
    },
    {
      id: '5',
      title: 'Project Manager',
      company: 'BuildCorp',
      location: 'Örebro',
      industry: 'Lager & Logistik',
      omfattning: 'Heltid',
      salary: '500,000 - 650,000 SEK',
      posted: '4 dagar sedan',
      description: 'Leda byggprojekt från planering till färdigställande.',
      requirements: ['PMP', 'Agile', 'Byggbransch', 'Ledarskap'],
      featured: false,
      urgent: false,
      companyLogo: 'B',
    },
    {
      id: '6',
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Örebro',
      industry: 'Lager & Logistik',
      omfattning: 'Heltid',
      salary: '580,000 - 750,000 SEK',
      posted: '6 timmar sedan',
      description: 'Automatisera och optimera vår molninfrastruktur.',
      requirements: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      featured: true,
      urgent: true,
      companyLogo: 'C',
    },
    {
      id: '7',
      title: 'Sales Representative',
      company: 'SalesForce Nordic',
      location: 'Örebro',
      industry: 'Lager & Logistik',
      omfattning: 'Heltid',
      salary: '380,000 - 480,000 SEK + provision',
      posted: '2 dagar sedan',
      description: 'Utveckla nya kundrelationer och öka försäljningen.',
      requirements: ['B2B försäljning', 'CRM', 'Kommunikation', 'Måldriven'],
      featured: false,
      urgent: false,
      companyLogo: 'S',
    },
    {
      id: '8',
      title: 'Frontend Developer',
      company: 'WebStudio',
      location: 'Örebro',
      industry: 'Lager & Logistik',
      omfattning: 'Deltid',
      salary: '2,500 - 3,500 SEK/dag',
      posted: '5 timmar sedan',
      description: 'Utveckla responsiva webbapplikationer med modern teknik.',
      requirements: ['React', 'CSS', 'JavaScript', 'Responsive design'],
      featured: false,
      urgent: false,
      companyLogo: 'W',
    },
  ];

  useEffect(() => {
    // Simulera laddning
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

    if (selectedLocation) {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    if (selectedIndustry) {
      filtered = filtered.filter(job => job.industry === selectedIndustry);
    }

    if (selectedOmfattning) {
      filtered = filtered.filter(job => job.omfattning === selectedOmfattning);
    }

    if (showFeaturedOnly) {
      filtered = filtered.filter(job => job.featured);
    }

    if (showUrgentOnly) {
      filtered = filtered.filter(job => job.urgent);
    }

    setFilteredJobs(filtered);
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

  const locations = [...new Set(jobs.map(job => job.location))];
  const industries = [...new Set(jobs.map(job => job.industry))];
  const omfattningar = [...new Set(jobs.map(job => job.omfattning))];

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  return (
    <div className="relative">
      <RichBackground />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Diskret halo bakom header för subtilt liv */}
        <div
          className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[160px] rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Header */}
        <JobsHeader filteredJobsCount={filteredJobs.length} />

        {/* Search and Filters */}
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

        {/* Jobs List / Empty */}
        {filteredJobs.length === 0 ? (
          <EmptyState clearFilters={clearFilters} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 mb-16">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;

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

      {/* Basgradient: djup mörkblå professionell ton */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0f233d 0%, #0c1d32 70%, #0f233d 100%)',
        }}
      />

      {/* Subtil diagonal linje-textur för unikhet utan att dra uppmärksamhet */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 40px),
            repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 60px)
          `,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          transform: `translate(${(mouse.x - 50) * 0.02}px, ${(mouse.y - 50) * 0.02}px)`,
        }}
      />

      {/* Små subtila flytande rutor med lätt parallax och pulsering */}
      {Array.from({ length: 15 }).map((_, i) => {
        const size = Math.random() * 6 + 4; // 4–10px
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
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: '2px',
              transform: `translate(${(mouse.x - 50) * 0.018}px, ${(mouse.y - 50) * 0.018}px)`,
              animation: `fadePulse ${10 + Math.random() * 10}s ease-in-out ${delay}s infinite`,
              pointerEvents: 'none',
              mixBlendMode: 'screen',
            }}
          />
        );
      })}

      {/* Mild halo bakom header/centralt fokus */}
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[500px] h-[140px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 80%)',
        }}
      />

      {/* Vignette för fokus mot mitten */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* Subtil noise-overlay för textur */}
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
    <h3
      className="text-2xl text-white/80 mb-2"
      style={{
        fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
        fontWeight: 400,
      }}
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
    console.log('Filter state changed:', {
      searchTerm,
      selectedLocation,
      selectedIndustry,
      selectedOmfattning,
      showFeaturedOnly,
      showUrgentOnly
    });

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

    console.log('Filtered jobs count:', filtered.length);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <RichBackground />

      <div className="relative z-10">
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
          <JobsList jobs={filteredJobs} />
        )}
      </div>
    </div>
  );
};

export default JobsPage;
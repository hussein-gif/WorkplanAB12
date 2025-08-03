import React, { useState, useEffect } from 'react';
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

// Ny bakgrundskomponent: professionell, levande men diskret
const LiveBackground: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Keyframes inbäddade så ingen global CSS krävs */}
    <style>{`
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes floatSlow {
        0% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-48%, -52%) scale(1.015); }
        100% { transform: translate(-50%, -50%) scale(1); }
      }
    `}</style>

    {/* Animera gradientbas */}
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #10B981 75%, #0f172a 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 35s ease infinite',
        zIndex: 0,
      }}
    />

    {/* Subtilt grid-mönster */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'><path d='M20 0 L0 0 0 20' stroke='rgba(255,255,255,0.4)' stroke-width='0.5' fill='none'/></pattern></defs><rect width='160' height='160' fill='url(%23grid)' opacity='0.03'/></svg>")`,
        zIndex: 1,
      }}
    />

    {/* Flytande orb 1 */}
    <div
      className="absolute w-[500px] h-[500px] rounded-full filter blur-3xl opacity-25"
      style={{
        background: 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.35) 0%, transparent 70%)',
        left: `calc(${mousePosition.x * 0.2}% + 10%)`,
        top: `calc(${mousePosition.y * 0.15}% + 5%)`,
        transform: 'translate(-50%, -50%)',
        animation: 'floatSlow 28s ease-in-out infinite',
        mixBlendMode: 'overlay',
        zIndex: 2,
      }}
    />

    {/* Flytande orb 2 */}
    <div
      className="absolute w-[600px] h-[600px] rounded-full filter blur-3xl opacity-20"
      style={{
        background: 'radial-gradient(circle at 70% 60%, rgba(16,185,129,0.25) 0%, transparent 70%)',
        right: `calc(${mousePosition.x * 0.15}% + 8%)`,
        bottom: `calc(${mousePosition.y * 0.1}% + 10%)`,
        transform: 'translate(50%, 50%)',
        animation: 'floatSlow 32s ease-in-out 5s infinite',
        mixBlendMode: 'overlay',
        zIndex: 2,
      }}
    />

    {/* Subtil shimmer-overlay för extra liv */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.003) 50%, rgba(255,255,255,0.01) 100%)',
        mixBlendMode: 'overlay',
        backgroundSize: '200% 100%',
        animation: 'gradientShift 60s ease-in-out infinite',
        zIndex: 3,
      }}
    />
  </div>
);

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedOmfattning, setSelectedOmfattning] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
      companyLogo: 'T'
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
      companyLogo: 'G'
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
      companyLogo: 'D'
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
      companyLogo: 'D'
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
      companyLogo: 'B'
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
      companyLogo: 'C'
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
      companyLogo: 'S'
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
      companyLogo: 'W'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setIsLoading(false);
    }, 1000);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    // Industry filter
    if (selectedIndustry) {
      filtered = filtered.filter(job => job.industry === selectedIndustry);
    }

    // Omfattning filter
    if (selectedOmfattning) {
      filtered = filtered.filter(job => job.omfattning === selectedOmfattning);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, selectedLocation, selectedIndustry, selectedOmfattning, jobs]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedIndustry('');
    setSelectedOmfattning('');
  };

  const locations = [...new Set(jobs.map(job => job.location))];
  const industries = [...new Set(jobs.map(job => job.industry))];
  const omfattningar = [...new Set(jobs.map(job => job.omfattning))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl text-white/80 mb-2" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '400' }}>Inga tjänster hittades</h3>
          <p className="text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>Prova att ändra dina sökkriterier</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Uppgraderad, levande men professionell bakgrund */}
      <LiveBackground mousePosition={mousePosition} />

      <div className="relative z-10">
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

        {/* Jobs List */}
        <JobsList jobs={filteredJobs} />
      </div>
    </div>
  );
};

export default JobsPage;

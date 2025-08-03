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

const LoadingPlaceholder = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-flex items-center space-x-3">
        <div
          role="status"
          aria-label="Laddar jobb"
          className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"
        />
        <h3
          className="text-xl text-white/90"
          style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '500' }}
        >
          Laddar alla jobb...
        </h3>
      </div>
    </div>
  </div>
);

const EmptyState = ({ clearFilters }: { clearFilters: () => void }) => (
  <div className="py-20 text-center">
    <h3
      className="text-2xl text-white/80 mb-2"
      style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '400' }}
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

// Enkel och stilren bakgrund med samma färgpalett
const SimpleBackground = () => (
  <div className="absolute inset-0">
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
      }}
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23f)' opacity='0.02'/></svg>")`,
        backgroundSize: '200px 200px',
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
    return <LoadingPlaceholder />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Enkel bakgrund */}
      <SimpleBackground />

      <div className="relative z-10">
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
  );
};

export default JobsPage;

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

// Enkel, professionell bakgrund med subtil textur
const SimpleBackground: React.FC = () => (
  <div className="absolute inset-0">
    {/* Mjuk gradientbakgrund */}
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
      }}
    />
    {/* Mycket subtilt rutmönster för djup */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><defs><pattern id='p' width='20' height='20' patternUnits='userSpaceOnUse'><path d='M20 0 L0 0 0 20' stroke='%23ffffff' stroke-width='0.5' fill='none'/></pattern></defs><rect width='120' height='120' fill='url(%23p)' opacity='0.015'/></svg>")`,
        backgroundSize: '120px 120px',
      }}
    />
  </div>
);

// Loading placeholder med samma bakgrund
const LoadingPlaceholder = () => (
  <div className="min-h-screen flex items-center justify-center relative">
    <SimpleBackground />
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

// Tomtillstånd (oförändrat)
const EmptyState = ({ clearFilters }: { clearFilters: () => void }) => (
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
    <div className="min-h-screen relative">
      {/* Enkel bakgrund */}
      <SimpleBackground />

      <div className="relative z-10">
        {/* Diskret halo bakom header för lite liv, utan att bli mycket */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[160px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.2) 0%, transparent 70%)' }} />

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

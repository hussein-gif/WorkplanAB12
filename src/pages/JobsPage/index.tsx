import React, { useState } from 'react';
import JobsHeader from './JobsHeader';
import JobsFilters from './JobsFilters';
import JobsList from './JobsList';

// Mock job data
const mockJobs = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "TechFlow AB",
    location: "Stockholm",
    industry: "Teknologi",
    omfattning: "Heltid",
    salary: "650,000 - 850,000 SEK",
    posted: "2 dagar sedan",
    companyLogo: "T",
    featured: true
  },
  {
    id: "2",
    title: "Marketing Manager",
    company: "GrowthCo",
    location: "Göteborg",
    industry: "Marknadsföring",
    omfattning: "Heltid",
    salary: "450,000 - 550,000 SEK",
    posted: "1 dag sedan",
    companyLogo: "G",
    featured: true
  },
  {
    id: "3",
    title: "UX Designer",
    company: "DesignStudio",
    location: "Remote",
    industry: "Design",
    omfattning: "Konsult",
    salary: "4,000 - 5,000 SEK/dag",
    posted: "3 timmar sedan",
    companyLogo: "D",
    featured: false
  },
  {
    id: "4",
    title: "Data Analyst",
    company: "DataInsights",
    location: "Malmö",
    industry: "Analys",
    omfattning: "Heltid",
    salary: "420,000 - 520,000 SEK",
    posted: "1 dag sedan",
    companyLogo: "D",
    featured: false
  },
  {
    id: "5",
    title: "Project Manager",
    company: "BuildCorp",
    location: "Uppsala",
    industry: "Byggnad",
    omfattning: "Heltid",
    salary: "500,000 - 650,000 SEK",
    posted: "4 dagar sedan",
    companyLogo: "B",
    featured: true
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Stockholm",
    industry: "Teknologi",
    omfattning: "Heltid",
    salary: "580,000 - 750,000 SEK",
    posted: "6 timmar sedan",
    companyLogo: "C",
    featured: false
  },
  {
    id: "7",
    title: "Sales Representative",
    company: "SalesForce Nordic",
    location: "Göteborg",
    industry: "Försäljning",
    omfattning: "Heltid",
    salary: "380,000 - 480,000 SEK + provision",
    posted: "2 dagar sedan",
    companyLogo: "S",
    featured: true
  },
  {
    id: "8",
    title: "Frontend Developer",
    company: "WebStudio",
    location: "Remote",
    industry: "Teknologi",
    omfattning: "Deltid",
    salary: "2,500 - 3,500 SEK/dag",
    posted: "1 vecka sedan",
    companyLogo: "W",
    featured: false
  }
];

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  industry: string;
  omfattning: string;
  salary: string;
  posted: string;
  companyLogo: string;
  featured: boolean;
}

// Professional background component
const ProfessionalBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen relative overflow-hidden">
    {/* Base gradient */}
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 65%, #0f172a 100%)',
        zIndex: 0,
      }}
    />

    {/* Subtle geometric pattern (diagonal grid) */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'><path d='M20 0 L0 0 0 20' stroke='%23ffffff' stroke-width='0.5' fill='none'/></pattern></defs><rect width='160' height='160' fill='url(%23grid)' opacity='0.04'/></svg>")`,
        zIndex: 1,
      }}
    />

    {/* Soft floating shapes for depth */}
    <div
      aria-hidden="true"
      className="absolute top-1/4 left-[15%] w-[480px] h-[480px] rounded-[100px] blur-[140px] opacity-20"
      style={{
        background: 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.3) 0%, transparent 70%)',
        mixBlendMode: 'overlay',
        animation: 'float 32s ease-in-out infinite',
        zIndex: 2,
      }}
    />
    <div
      aria-hidden="true"
      className="absolute bottom-1/3 right-[10%] w-[600px] h-[600px] rounded-[140px] blur-[160px] opacity-18"
      style={{
        background: 'radial-gradient(circle at 70% 60%, rgba(16,185,129,0.25) 0%, transparent 70%)',
        mixBlendMode: 'overlay',
        animation: 'float 38s ease-in-out 1s infinite',
        zIndex: 2,
      }}
    />

    {/* Content on top */}
    <div className="relative z-10">{children}</div>

    {/* Keyframes inline to avoid requiring global CSS changes */}
    <style>{`
      @keyframes float {
        0% { transform: translate(0,0) scale(1); }
        50% { transform: translate(8px,-6px) scale(1.01); }
        100% { transform: translate(0,0) scale(1); }
      }
    `}</style>
  </div>
);

const JobsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedOmfattning, setSelectedOmfattning] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);

  // Extract unique values for filter options
  const locations = Array.from(new Set(mockJobs.map(job => job.location)));
  const industries = Array.from(new Set(mockJobs.map(job => job.industry)));
  const omfattningar = Array.from(new Set(mockJobs.map(job => job.omfattning)));

  // Apply filters whenever filter state changes
  React.useEffect(() => {
    let filtered = mockJobs;
    
    if (selectedLocation) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }
    
    if (selectedIndustry) {
      filtered = filtered.filter(job => 
        job.industry.toLowerCase().includes(selectedIndustry.toLowerCase())
      );
    }
    
    if (selectedOmfattning) {
      filtered = filtered.filter(job => 
        job.omfattning.toLowerCase().includes(selectedOmfattning.toLowerCase())
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredJobs(filtered);
  }, [searchTerm, selectedLocation, selectedIndustry, selectedOmfattning]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedIndustry('');
    setSelectedOmfattning('');
  };

  return (
    <ProfessionalBackground>
      <div className="container mx-auto px-4 py-8">
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
        <JobsList jobs={filteredJobs} />
      </div>
    </ProfessionalBackground>
  );
};

export default JobsPage;
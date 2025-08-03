import React, { useState } from 'react';
import JobsHeader from './JobsHeader';
import JobsFilters from './JobsFilters';
import JobsList from './JobsList';

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp AB",
    location: "Stockholm",
    type: "Heltid",
    salary: "45,000 - 60,000 SEK",
    posted: "2 dagar sedan",
    deadline: "Sista ansökningsdag: 2024-02-15",
    description: "Vi söker en erfaren frontend-utvecklare...",
    requirements: ["React", "TypeScript", "3+ års erfarenhet"]
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Growth Solutions",
    location: "Göteborg",
    type: "Heltid",
    salary: "40,000 - 50,000 SEK",
    posted: "1 vecka sedan",
    deadline: "Sista ansökningsdag: 2024-02-20",
    description: "Erfaren marknadsförare för att leda vårt team...",
    requirements: ["Digital marknadsföring", "5+ års erfarenhet", "Teamledning"]
  },
  {
    id: 3,
    title: "UX Designer",
    company: "Design Studio",
    location: "Malmö",
    type: "Deltid",
    salary: "35,000 - 45,000 SEK",
    posted: "3 dagar sedan",
    deadline: "Sista ansökningsdag: 2024-02-18",
    description: "Kreativ UX-designer för spännande projekt...",
    requirements: ["Figma", "Användarforskning", "Prototyping"]
  }
];

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
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  const handleFilterChange = (filters: any) => {
    // Apply filters to jobs
    let filtered = mockJobs;
    
    if (filters.location && filters.location !== 'all') {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(job => 
        job.type.toLowerCase() === filters.type.toLowerCase()
      );
    }
    
    if (filters.search) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    setFilteredJobs(filtered);
  };

  return (
    <ProfessionalBackground>
      <div className="container mx-auto px-4 py-8">
        <JobsHeader />
        <JobsFilters onFilterChange={handleFilterChange} />
        <JobsList jobs={filteredJobs} />
      </div>
    </ProfessionalBackground>
  );
};

export default JobsPage;
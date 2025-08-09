import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';

interface FeaturedJobsSectionProps {
  isVisible: boolean;
}

const FeaturedJobsSection: React.FC<FeaturedJobsSectionProps> = ({
  isVisible,
}) => {
  const navigate = useNavigate();

  const featuredJobs = [
    { id: '1', title: 'Senior Software Engineer', company: 'TechFlow', location: 'Stockholm', type: 'Heltid', companyLogo: 'T' },
    { id: '2', title: 'Marketing Manager', company: 'GrowthCo', location: 'Göteborg', type: 'Heltid', companyLogo: 'G' },
    { id: '3', title: 'UX Designer', company: 'DesignStudio', location: 'Remote', type: 'Konsult', companyLogo: 'D' },
    { id: '4', title: 'Data Analyst', company: 'DataInsights', location: 'Malmö', type: 'Heltid', companyLogo: 'D' },
    { id: '5', title: 'DevOps Engineer', company: 'CloudTech', location: 'Stockholm', type: 'Heltid', companyLogo: 'C' },
    { id: '6', title: 'Project Manager', company: 'BuildCorp', location: 'Uppsala', type: 'Heltid', companyLogo: 'B' }
  ];

  return (
    <section
      id="featured-jobs"
      className="relative py-24 px-8"
      style={{ backgroundColor: '#08132B' }}
    >
      {/* Artistic background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Abstract flowing shapes */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgba(49,104,255,0.25)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'rgba(0,196,204,0.25)', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          <path d="M0,300 Q300,150 600,300 T1200,300 V800 H0 Z" fill="url(#grad1)" opacity="0.4" />
          <path d="M0,500 Q400,350 800,500 T1600,500 V800 H0 Z" fill="rgba(255,255,255,0.05)" />
        </svg>

        {/* Soft spotlight gradients */}
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full opacity-40 blur-3xl" style={{ background: 'radial-gradient(circle at center, rgba(49,104,255,0.35), rgba(49,104,255,0) 60%)' }} />
        <div className="absolute bottom-0 right-[-120px] w-[640px] h-[640px] rounded-full opacity-30 blur-3xl" style={{ background: 'radial-gradient(circle at center, rgba(0,196,204,0.28), rgba(0,196,204,0) 60%)' }} />

        {/* Fine noise texture */}
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<?xml version=\\'1.0\\' encoding=\\'UTF-8\\'?><svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'120\\' height=\\'120\\' viewBox=\\'0 0 120 120\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/><feColorMatrix type=\\'saturate\\' values=\\'0\\'/><feComponentTransfer><feFuncA type=\\'table\\' tableValues=\\'0 1\\'/></feComponentTransfer></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(#n)\\' opacity=\\'0.3\\'/></svg>")' }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-3">Lediga Jobb</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Upptäck utvalda roller från seriösa arbetsgivare. Klicka för detaljer och ansök direkt.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300" onClick={() => navigate(`/job/${job.id}`)}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-white font-semibold text-sm ring-1 ring-inset ring-white/20">{job.companyLogo}</div>
                <div>
                  <div className="text-sm font-medium text-white/90">{job.company}</div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">{job.title}</h3>

              <div className="flex items-center space-x-4 text-sm text-white/70 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin size={14} className="text-white/50" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} className="text-white/50" />
                  <span>{job.type}</span>
                </div>
              </div>

              <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors">Ansök Nu</button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button onClick={() => navigate('/jobs')} className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg tracking-wide hover:bg-blue-500 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-black/30">Se Alla Jobb</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;

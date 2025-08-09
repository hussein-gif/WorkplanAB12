import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';

interface FeaturedJobsSectionProps {
  isVisible: boolean;
}

const SimpleHoverCard: React.FC<{ children: React.ReactNode; className?: string }>=({ children, className }) => (
  <div
    className={`rounded-2xl transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl ${className ?? ''} group`}
  >
    {children}
  </div>
);

const FeaturedJobsSection: React.FC<FeaturedJobsSectionProps> = ({ isVisible }) => {
  const navigate = useNavigate();

  const featuredJobs = [
    { id:'1', title:'Senior Software Engineer', company:'TechFlow', location:'Stockholm', type:'Heltid', posted:'2 dagar sedan', companyLogo:'T' },
    { id:'2', title:'Marketing Manager',        company:'GrowthCo',  location:'Göteborg', type:'Heltid', posted:'1 dag sedan',    companyLogo:'G' },
    { id:'3', title:'UX Designer',              company:'DesignStudio',location:'Remote',   type:'Konsult',posted:'3 timmar sedan', companyLogo:'D' },
    { id:'4', title:'Data Analyst',             company:'DataInsights',location:'Malmö',    type:'Heltid', posted:'1 dag sedan',    companyLogo:'D' },
    { id:'5', title:'Project Manager',          company:'BuildCorp',   location:'Uppsala',  type:'Heltid', posted:'4 dagar sedan',  companyLogo:'B' },
    { id:'6', title:'DevOps Engineer',          company:'CloudTech',   location:'Stockholm',type:'Heltid', posted:'6 timmar sedan', companyLogo:'C' },
  ];

  return (
    <section id="featured-jobs" className="relative py-24 px-8" style={{ backgroundColor: '#08132B' }}>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-3">Lediga Jobb</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Upptäck utvalda roller från seriösa arbetsgivare. Klicka för detaljer och ansök direkt.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {featuredJobs.map((job, idx) => (
            <SimpleHoverCard
              key={job.id}
              className="w-full max-w-sm bg-white/95 backdrop-blur-sm border border-white/20 flex flex-col cursor-pointer"
            >
              <div
                className="p-5 flex-1 flex flex-col"
                onClick={() => navigate(`/job/${job.id}`)}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                    {job.companyLogo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg mb-1 leading-tight font-bold" style={{ color: '#111827' }}>
                      {job.title}
                    </h3>
                    <div className="text-base" style={{ color: '#374151' }}>
                      {job.company}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm mb-4" style={{ color: '#6B7280' }}>
                  <div className="flex items-center space-x-2">
                    <MapPin size={14} />
                    <span>{job.location}</span>
                  </div>
                  <span className="w-1 h-1 bg-gray-400 rounded-full" />
                  <div className="flex items-center space-x-2">
                    <Clock size={14} />
                    <span>{job.type}</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 p-5 pt-0 flex items-end justify-between">
                <div className="text-sm text-gray-500">{job.posted}</div>
                <div className="text-right text-sm text-gray-500">
                  <div>Ansök senast</div>
                  <div className="text-gray-700">{new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE')}</div>
                </div>
              </div>
            </SimpleHoverCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/jobs')}
            className="
              group relative px-8 py-4
              bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl
              font-medium tracking-wide
              hover:border-white/40 hover:bg-white/20
              transition-all duration-300
              shadow-lg hover:shadow-xl
              hover:scale-105 hover:-translate-y-1
              overflow-hidden
            "
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            <div className="relative flex items-center space-x-2">
              <span className="font-medium">Se Alla Jobb</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;

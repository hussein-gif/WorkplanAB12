import React from "react";
import { Search, MapPin, Building, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Job } from "./index";

interface JobsListProps {
  jobs: Job[];
}

// Simple hover card wrapper
const SimpleHoverCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={`
      rounded-2xl transition-all duration-300 ease-out
      hover:scale-105 hover:-translate-y-2 hover:shadow-2xl
      ${className ?? ""}
      group
    `}
  >
    {children}
  </div>
);

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  const navigate = useNavigate();

  const handleJobClick = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

  if (jobs.length === 0) {
    return (
      <div className="px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-white/40" />
            </div>
            <h3 className="text-xl text-white/80 mb-2">Inga tjänster hittades</h3>
            <p className="text-white/60" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>Prova att ändra dina sökkriterier</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-center">
          {jobs.map(job => (
            <SimpleHoverCard
              key={job.id}
              className="
                w-full max-w-sm
                bg-white/95 backdrop-blur-sm
                border border-white/20
                flex flex-col
                cursor-pointer
              "
            >
              {/* Innehåll */}
              <div 
                className="p-5 flex-1 flex flex-col"
                onClick={() => handleJobClick(job.id)}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="
                      w-14 h-14 rounded-xl
                      bg-gradient-to-br from-gray-600 to-gray-800
                      flex items-center justify-center
                      text-white font-bold text-lg
                      shadow-lg flex-shrink-0
                    ">
                    {job.companyLogo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg text-gray-900 mb-2 leading-tight" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '500' }}>
                      {job.title}
                    </h3>
                    <div className="text-base text-gray-700" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>
                      {job.company}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin size={14} className="text-gray-400" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>{job.location}</span>
                  </div>
                  <span className="w-1 h-1 bg-gray-400 rounded-full" />
                  <div className="flex items-center space-x-2">
                    <Clock size={14} className="text-gray-400" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>{job.omfattning}</span>
                  </div>
                  <span className="w-1 h-1 bg-gray-400 rounded-full" />
                  <div className="flex items-center space-x-2">
                    <Building size={14} className="text-gray-400" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>{job.industry}</span>
                  </div>
                </div>
              </div>

              {/* Datum-footer */}
              <div 
                className="p-5 pt-0 flex items-end justify-between"
                onClick={() => handleJobClick(job.id)}
              >
                <div className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>{job.posted}</div>
                <div className="text-right text-sm text-gray-500">
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>Apply by</div>
                  <div className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>
                    {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE')}
                  </div>
                </div>
              </div>
            </SimpleHoverCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsList;

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
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechFlow',
      location: 'Stockholm',
      type: 'Heltid',
      companyLogo: 'T'
    },
    {
      id: '2',
      title: 'Marketing Manager',
      company: 'GrowthCo',
      location: 'Göteborg',
      type: 'Heltid',
      companyLogo: 'G'
    },
    {
      id: '3',
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Remote',
      type: 'Konsult',
      companyLogo: 'D'
    },
    {
      id: '4',
      title: 'Data Analyst',
      company: 'DataInsights',
      location: 'Malmö',
      type: 'Heltid',
      companyLogo: 'D'
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Stockholm',
      type: 'Heltid',
      companyLogo: 'C'
    },
    {
      id: '6',
      title: 'Project Manager',
      company: 'BuildCorp',
      location: 'Uppsala',
      type: 'Heltid',
      companyLogo: 'B'
    }
  ];

  return (
    <section id="featured-jobs" className="py-24 px-8 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">
            Lediga Jobb
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl p-6 cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => navigate(`/job/${job.id}`)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-semibold text-sm">
                  {job.companyLogo}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{job.company}</div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {job.title}
              </h3>

              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin size={14} className="text-gray-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} className="text-gray-400" />
                  <span>{job.type}</span>
                </div>
              </div>

              <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                Ansök Nu
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/jobs')}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg tracking-wide hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Se Alla Jobb
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
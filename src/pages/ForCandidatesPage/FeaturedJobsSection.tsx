import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';

interface FeaturedJobsSectionProps {
  isVisible: boolean;
}

const FeaturedJobsSection: React.FC<FeaturedJobsSectionProps> = ({
  isVisible,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <section id="featured-jobs" className="relative py-24 px-8 overflow-hidden" style={{ backgroundColor: '#08132B' }}>
      {/* Creative Dark Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sophisticated wave patterns */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wavePattern" width="120" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M0 40 Q30 20 60 40 T120 40"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M0 60 Q30 40 60 60 T120 60"
                stroke="rgba(59,130,246,0.08)"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
            <filter id="blurDark">
              <feGaussianBlur stdDeviation="100" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#wavePattern)" />
          <circle cx="25%" cy="25%" r="250" fill="rgba(59,130,246,0.15)" filter="url(#blurDark)" />
          <circle cx="75%" cy="75%" r="200" fill="rgba(16,185,129,0.12)" filter="url(#blurDark)" />
        </svg>

        {/* Interactive floating orbs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl transition-all duration-1000"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl transition-all duration-1000 delay-500"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
            right: `${mousePosition.x * 0.2}%`,
            bottom: `${mousePosition.y * 0.25}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Elegant grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />

        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating accent elements */}
        <div className="absolute top-20 right-32 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-emerald-400/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

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

import { useState, useEffect } from 'react';

export default FeaturedJobsSection;
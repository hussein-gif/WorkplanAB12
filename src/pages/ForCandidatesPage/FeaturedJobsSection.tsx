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

  // Build a safe inline SVG noise texture without breaking TSX strings
  const noiseSvg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 1" />
      </feComponentTransfer>
    </filter>
    <rect width="100%" height="100%" filter="url(#n)" opacity="0.3" />
  </svg>`;
  const noiseDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(noiseSvg)}`;

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
        {/* Aurora mesh background */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(800px 500px at 10% 15%, rgba(49,104,255,0.28), rgba(49,104,255,0) 60%)',
              'radial-gradient(700px 420px at 85% 30%, rgba(0,196,204,0.22), rgba(0,196,204,0) 62%)',
              'radial-gradient(600px 360px at 30% 90%, rgba(120,119,198,0.18), rgba(120,119,198,0) 64%)',
              'radial-gradient(900px 540px at 75% 80%, rgba(0,122,255,0.16), rgba(0,122,255,0) 65%)'
            ].join(','),
            mixBlendMode: 'screen',
          }}
        />

        {/* Elegant diagonal sheen */}
        <div
          className="absolute inset-0 opacity-20 rotate-[-8deg]"
          style={{
            backgroundImage:
              'linear-gradient( to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0) 70% )',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          }}
        />

        {/* Subtle arcs */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] opacity-15"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.12) 0deg, rgba(255,255,255,0) 60deg, rgba(255,255,255,0.12) 120deg, rgba(255,255,255,0) 180deg, rgba(255,255,255,0.12) 240deg, rgba(255,255,255,0) 300deg, rgba(255,255,255,0.12) 360deg)',
            WebkitMaskImage: 'radial-gradient(circle at center, transparent 0, black 28%, black 55%, transparent 70%)',
            maskImage: 'radial-gradient(circle at center, transparent 0, black 28%, black 55%, transparent 70%)',
          }}
        />

        {/* Constellation speckles */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              'radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,0.35) 50%, transparent 51%)',
              'radial-gradient(1px 1px at 60% 10%, rgba(255,255,255,0.25) 50%, transparent 51%)',
              'radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.25) 50%, transparent 51%)',
              'radial-gradient(1px 1px at 35% 80%, rgba(255,255,255,0.2) 50%, transparent 51%)'
            ].join(', '),
            opacity: 0.25,
          }}
        />

        {/* Fine noise texture (encoded to avoid TSX string issues) */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: `url(${noiseDataUrl})` }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 700px at 50% 20%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.25) 100%)',
          }}
        />
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

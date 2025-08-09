import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';

interface FeaturedJobsSectionProps {
  isVisible: boolean;
}

// Simple hover card wrapper to match the reference design
const SimpleHoverCard: React.FC<{ children: React.ReactNode; className?: string }>=({ children, className }) => (
  <div
    className={`rounded-2xl transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl ${className ?? ''} group`}
  >
    {children}
  </div>
);

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
    { id:'1', title:'Senior Software Engineer', company:'TechFlow', location:'Stockholm', type:'Heltid', posted:'2 dagar sedan', companyLogo:'T' },
    { id:'2', title:'Marketing Manager',        company:'GrowthCo',  location:'Göteborg', type:'Heltid', posted:'1 dag sedan',    companyLogo:'G' },
    { id:'3', title:'UX Designer',              company:'DesignStudio',location:'Remote',   type:'Konsult',posted:'3 timmar sedan', companyLogo:'D' },
    { id:'4', title:'Data Analyst',             company:'DataInsights',location:'Malmö',    type:'Heltid', posted:'1 dag sedan',    companyLogo:'D' },
    { id:'5', title:'Project Manager',          company:'BuildCorp',   location:'Uppsala',  type:'Heltid', posted:'4 dagar sedan',  companyLogo:'B' },
    { id:'6', title:'DevOps Engineer',          company:'CloudTech',   location:'Stockholm',type:'Heltid', posted:'6 timmar sedan', companyLogo:'C' },
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
          <button onClick={() => navigate('/jobs')} className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg tracking-wide hover:bg-blue-500 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-black/30">Se Alla Jobb</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;

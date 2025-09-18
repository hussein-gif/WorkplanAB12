import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, ArrowRight, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Desktop-kort (oförändrat)
const SimpleHoverCard: React.FC<{ children: React.ReactNode; className?: string; }> = ({ children, className }) => (
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

const FeaturedJobs = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (sectionRef.current) obs.unobserve(sectionRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // ⬇️ ÄNDRING: töm jobblistan
  const jobs: {
    id: string; title: string; company: string; location: string; type: string; posted: string; companyLogo: string;
  }[] = [];

  // Mobil: visa endast 4
  const mobileJobs = jobs.slice(0, 4);

  return (
    <>
      <style>{`
        @keyframes float-slow { 0%,100% { transform: translate(0,0); } 50% { transform: translate(10px,6px); } }
        @keyframes float-slow-reverse { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-8px,-5px); } }
      `}</style>

      <section ref={sectionRef} id="jobs" className="relative pt-16 sm:pt-32 pb-24 overflow-hidden">
        {/* Bakgrund (samma som innan) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundColor: '#08132B' }} />
          <div
            className="absolute inset-0"
            style={{
              pointerEvents: 'none',
              background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,0,0,0.45) 100%)',
              mixBlendMode: 'multiply',
              opacity: 0.8,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
              `,
              backgroundSize: '140px 140px',
              transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px)`,
              mixBlendMode: 'overlay',
              opacity: 0.9,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header (lite tajtare på mobil) */}
          <div className="text-center mb-10 sm:mb-20 relative">
            <div
              className="absolute inset-x-0 top-0 mx-auto w-[400px] h-[180px] rounded-full blur-3xl opacity-25"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(125,211,252,0.35) 0%, transparent 60%)',
                transform: 'translateY(-30px)',
              }}
            />
            <h2
              className={`
                text-4xl sm:text-6xl text-white mb-4 sm:mb-6 tracking-tight leading-[0.95]
                transition-all duration-700 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 400 }}
            >
              Utvalda <span className="font-medium">Möjligheter</span>
            </h2>
            <p
              className={`
                text-[15px] sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light
                transition-all duration-1000 delay-300 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Hitta din nästa tjänst i vårt utbud av lediga jobb
            </p>
          </div>

          {/* ===== MOBIL: radad lista utan ”ansök senast”, med logo & company i meta-raden ===== */}
          <div className="sm:hidden">
            {mobileJobs.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-white/80 text-lg">Inga lediga jobb tillgängliga just nu.</h3>
              </div>
            ) : (
              <ul className="divide-y divide-white/10">
                {mobileJobs.map((job) => (
                  <li
                    key={job.id}
                    className="py-4 active:bg-white/5 transition-colors"
                    onClick={() => navigate(`/job/${job.id}`)}
                  >
                    {/* Titelrad med logga till vänster */}
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center font-semibold shrink-0">
                        {job.companyLogo}
                      </div>
                      <div className="min-w-0">
                        <h3
                          className="text-white text-base font-semibold leading-tight truncate"
                          style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                        >
                          {job.title}
                        </h3>
                      </div>
                    </div>

                    {/* Meta: company • location • type */}
                    <div
                      className="mt-2 flex flex-wrap items-center gap-3 text-[13px] text-white/75"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase size={14} /> {job.company}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} /> {job.location}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={14} /> {job.type}
                      </span>
                    </div>

                    {/* Publicerad (kvar) */}
                    <div className="mt-1 text-[12px] text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {job.posted}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <div
              className={`
                text-center mt-10
                transition-all duration-700 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
              `}
            >
              <button
                onClick={() => navigate('/jobs')}
                className="
                  group relative px-7 py-3.5
                  bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl
                  font-medium tracking-wide
                  hover:border-white/40 hover:bg-white/20
                  transition-all duration-300
                  shadow-lg hover:shadow-xl
                  hover:scale-105 hover:-translate-y-1
                  overflow-hidden
                "
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                <div className="relative flex items-center space-x-2">
                  <span className="font-medium">Se Alla Jobb</span>
                  <ArrowRight size={16} className="transition-transform duration-300" />
                </div>
              </button>
            </div>
          </div>

          {/* ===== DESKTOP/TABLET: original kortlayout (orörd) ===== */}
          <div className="hidden sm:block">
            {jobs.length === 0 ? (
              <div className="mb-16 text-center py-10">
                <h3 className="text-white/80 text-xl">Inga lediga jobb tillgängliga just nu.</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
                {jobs.map((job) => (
                  <SimpleHoverCard
                    key={job.id}
                    className="w-full max-w-sm bg-white/95 backdrop-blur-sm border border-white/20 flex flex-col cursor-pointer"
                  >
                    <div className="p-5 flex-1 flex flex-col" onClick={() => navigate(`/job/${job.id}`)}>
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                          {job.companyLogo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg mb-1 leading-tight font-bold" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', color: '#111827' }}>
                            {job.title}
                          </h3>
                          <div className="text-base" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 400, color: '#374151' }}>
                            {job.company}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, color: '#6B7280' }}>
                        <div className="flex items-center space-x-2"><MapPin size={14} /><span>{job.location}</span></div>
                        <span className="w-1 h-1 bg-gray-400 rounded-full" />
                        <div className="flex items-center space-x-2"><Clock size={14} /><span>{job.type}</span></div>
                      </div>
                    </div>
                    {/* Desktop-footern (oförändrad, med ansök senast) */}
                    <div className="relative z-10 p-5 pt-0 flex items-end justify-between" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                      <div className="text-sm text-gray-500">{job.posted}</div>
                      <div className="text-right text-sm text-gray-500">
                        <div>Ansök senast</div>
                        <div className="text-gray-700">
                          {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE')}
                        </div>
                      </div>
                    </div>
                  </SimpleHoverCard>
                ))}
              </div>
            )}

            <div
              className={`
                text-center
                transition-all duration-1000 delay-200 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
            >
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
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                <div className="relative flex items-center space-x-2">
                  <span className="font-medium">Se Alla Jobb</span>
                  <ArrowRight size={16} className="transition-transform duration-300" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedJobs;

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Simple hover card wrapper (behåller desktop‐hover)
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
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Lyssna på viewport för mobilbrytpunkt
    const mq = window.matchMedia('(max-width: 639px)');
    const setFromMQ = () => setIsMobile(mq.matches);
    setFromMQ();
    mq.addEventListener ? mq.addEventListener('change', setFromMQ) : mq.addListener(setFromMQ);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      mq.removeEventListener ? mq.removeEventListener('change', setFromMQ) : mq.removeListener(setFromMQ);
    };
  }, []);

  const jobs = [
    { id:'1', title:'Senior Software Engineer', company:'TechFlow',     location:'Stockholm', type:'Heltid',  posted:'2 dagar sedan',  companyLogo:'T' },
    { id:'2', title:'Marketing Manager',        company:'GrowthCo',      location:'Göteborg',  type:'Heltid',  posted:'1 dag sedan',    companyLogo:'G' },
    { id:'3', title:'UX Designer',              company:'DesignStudio',  location:'Remote',    type:'Konsult', posted:'3 timmar sedan', companyLogo:'D' },
    { id:'4', title:'Data Analyst',             company:'DataInsights',  location:'Malmö',     type:'Heltid',  posted:'1 dag sedan',    companyLogo:'D' },
    { id:'5', title:'Project Manager',          company:'BuildCorp',     location:'Uppsala',   type:'Heltid',  posted:'4 dagar sedan',  companyLogo:'B' },
    { id:'6', title:'DevOps Engineer',          company:'CloudTech',     location:'Stockholm', type:'Heltid',  posted:'6 timmar sedan', companyLogo:'C' },
  ];

  // Visa bara 4 kort på mobil
  const visibleJobs = isMobile ? jobs.slice(0, 4) : jobs;

  return (
    <>
      <style>{`
        @keyframes float-slow { 0%,100% { transform: translate(0,0); } 50% { transform: translate(10px,6px); } }
        @keyframes float-slow-reverse { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-8px,-5px); } }
        @keyframes pulse-light { 0%,100% { opacity: 0.08; } 50% { opacity: 0.16; } }
        @keyframes hueShift { 0% { filter: hue-rotate(0deg); } 50% { filter: hue-rotate(12deg); } 100% { filter: hue-rotate(0deg); } }
        .animate-float-slow { animation: float-slow 30s ease-in-out infinite; }
        .animate-float-slow-reverse { animation: float-slow-reverse 34s ease-in-out infinite; }
        .animate-hue { animation: hueShift 80s ease-in-out infinite; }
      `}</style>

      <section
        ref={sectionRef}
        id="jobs"
        className="
          relative
          pt-16 pb-24            /* tajtare topp på mobil */
          sm:py-32               /* desktop opåverkat */
          overflow-hidden
        "
      >
        {/* Bakgrund (oförändrad) */}
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
          <div
            className="absolute w-[1000px] h-[1000px] rounded-full blur-3xl opacity-28 animate-float-slow"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 75%)',
              left: `calc(-64px + ${(mousePosition.x - 50) * 0.25}px)`,
              top: `calc(-64px + ${(mousePosition.y - 50) * 0.18}px)`,
            }}
          />
          <div
            className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-22 animate-float-slow-reverse"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 75%)',
              right: `calc(25% + ${(mousePosition.x - 50) * -0.18}px)`,
              bottom: `calc(80px + ${(mousePosition.y - 50) * -0.12}px)`,
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-2xl opacity-16"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
              left: `12%`,
              top: `22%`,
              transform: `translate(${(mousePosition.x - 50) * 0.12}px, ${(mousePosition.y - 50) * 0.09}px)`,
              animation: 'float-slow 45s ease-in-out infinite',
            }}
          />
          <div
            className="absolute w-[420px] h-[420px] rounded-full blur-2xl opacity-14"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 75%)',
              right: `15%`,
              bottom: `15%`,
              transform: `translate(${(mousePosition.x - 50) * -0.1}px, ${(mousePosition.y - 50) * -0.07}px)`,
              animation: 'float-slow-reverse 40s ease-in-out infinite',
            }}
          />
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23f)' opacity='0.05'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              mixBlendMode: 'overlay',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 45% 40%, rgba(255,255,255,0.10) 0%, transparent 70%)',
              mixBlendMode: 'soft-light',
              pointerEvents: 'none',
            }}
          />
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: 'rgba(255,255,255,0.1)',
                animation: `pulse-light ${5 + Math.random() * 6}s ease-in-out ${Math.random() * 2}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header – tajtare margin på mobil */}
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

            <div
              className={`
                hidden sm:flex items-center justify-center space-x-4 mb-4
                transition-all duration-1000 delay-200 transform
                ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
              `}
            >
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="w-2 h-2 bg-white/20 rounded-full" />
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>

            <p
              className={`
                text-[15px] sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light
                transition-all duration-1000 delay-600 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Hitta din nästa tjänst i vårt utbud av lediga jobb
            </p>
          </div>

          {/* Jobb-kort – mobil smalare vertikalt */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 mb-16">
            {visibleJobs.map((job, idx) => (
              <SimpleHoverCard
                key={job.id}
                className="
                  w-full max-w-sm
                  bg-white/95 backdrop-blur-sm border border-white/20
                  flex flex-col cursor-pointer
                "
              >
                <div
                  className="p-4 sm:p-5 flex-1 flex flex-col"
                  onClick={() => navigate(`/job/${job.id}`)}
                  onMouseEnter={() => setActiveCard(idx)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Övre rad */}
                  <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                    <div
                      className="
                        w-12 h-12 sm:w-14 sm:h-14 rounded-xl
                        bg-gradient-to-br from-gray-600 to-gray-800
                        flex items-center justify-center
                        text-white font-bold text-base sm:text-lg shadow-lg flex-shrink-0
                      "
                    >
                      {job.companyLogo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-base sm:text-lg mb-0.5 sm:mb-1 leading-tight font-bold"
                        style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', color: '#111827' }}
                      >
                        {job.title}
                      </h3>
                      <div
                        className="text-sm sm:text-base"
                        style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 400, color: '#374151' }}
                      >
                        {job.company}
                      </div>
                    </div>
                  </div>

                  {/* Meta – kompakt */}
                  <div
                    className="flex items-center space-x-3 sm:space-x-4 text-[13px] sm:text-sm mb-3 sm:mb-4"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, color: '#6B7280' }}
                  >
                    <div className="flex items-center space-x-1.5">
                      <MapPin size={13} />
                      <span>{job.location}</span>
                    </div>
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    <div className="flex items-center space-x-1.5">
                      <Clock size={13} />
                      <span>{job.type}</span>
                    </div>
                  </div>
                </div>

                {/* Footer – EN RAD på mobil för mindre höjd */}
                <div
                  className="relative z-10 px-4 sm:px-5 pt-0 pb-4 sm:pb-5"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  <div className="flex items-center justify-between text-[13px] sm:text-sm">
                    <span className="text-gray-500">{job.posted}</span>
                    <span className="text-gray-500">
                      Ansök senast{' '}
                      <span className="text-gray-700">
                        {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE')}
                      </span>
                    </span>
                  </div>
                </div>
              </SimpleHoverCard>
            ))}
          </div>

          {/* CTA-knapp (oförändrad) */}
          <div
            className={`
              text-center
              transition-all duration-1000 delay-1200 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
          >
            <button
              onClick={() => navigate('/jobs')}
              className="
                group relative px-7 sm:px-8 py-3.5 sm:py-4
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

          {/* Bottom Accent (oförändrad) */}
          <div
            className={`
              text-center mt-14 sm:mt-16
              transition-all duration-1000 delay-1400 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
          >
            <div className="inline-flex items-center space-x-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="flex space-x-2">
                <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse" />
                <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse" style={{ animationDelay:'500ms' }} />
                <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse" style={{ animationDelay:'1000ms' }} />
              </div>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedJobs;

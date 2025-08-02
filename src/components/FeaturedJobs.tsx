import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const FeaturedJobs = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState<number | null>(null);
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
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const jobs = [
    { id:'1', title:'Senior Software Engineer', company:'TechFlow', location:'Stockholm', type:'Heltid', posted:'2 dagar sedan', companyLogo:'T' },
    { id:'2', title:'Marketing Manager',        company:'GrowthCo',  location:'Göteborg', type:'Heltid', posted:'1 dag sedan',    companyLogo:'G' },
    { id:'3', title:'UX Designer',             company:'DesignStudio',location:'Remote',   type:'Konsult',posted:'3 timmar sedan', companyLogo:'D' },
    { id:'4', title:'Data Analyst',            company:'DataInsights',location:'Malmö',    type:'Heltid', posted:'1 dag sedan',    companyLogo:'D' },
    { id:'5', title:'Project Manager',         company:'BuildCorp',   location:'Uppsala',  type:'Heltid', posted:'4 dagar sedan',  companyLogo:'B' },
    { id:'6', title:'DevOps Engineer',         company:'CloudTech',   location:'Stockholm',type:'Heltid', posted:'6 timmar sedan', companyLogo:'C' },
  ];

  return (
    <>
      <style>{`
        @keyframes float-slow {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(10px,6px); }
        }
        @keyframes float-slow-reverse {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(-8px,-5px); }
        }
        @keyframes pulse-light {
          0%,100% { opacity: 0.08; }
          50% { opacity: 0.16; }
        }
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        .animate-float-slow-reverse {
          animation: float-slow-reverse 34s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="jobs"
        className="relative py-32 overflow-hidden"
      >
        {/* Bakgrund: samma mörka ton + organiska soft-former + textur + liv */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Basgradient: exakt samma djupa mörkblå/svarta känsla som original */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #111827 0%, #0f172a 50%, #1f2937 100%)',
            }}
          />

          {/* Mjuka svävande former för djup (toner inom samma palett) */}
          <div
            className="absolute w-[900px] h-[900px] rounded-full blur-3xl opacity-20 -left-64 -top-64 animate-float-slow"
            style={{
              background: 'radial-gradient(circle, rgba(31,41,55,0.35) 0%, transparent 75%)',
            }}
          />
          <div
            className="absolute w-[700px] h-[700px] rounded-full blur-3xl opacity-16 right-1/4 bottom-20 animate-float-slow-reverse"
            style={{
              background: 'radial-gradient(circle, rgba(17,23,39,0.3) 0%, transparent 75%)',
            }}
          />

          {/* Subtil noise/textur-overlay utan att ändra nyans */}
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23f)' opacity='0.03'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              mixBlendMode: 'overlay',
            }}
          />

          {/* Små pulserande vita prickar */}
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
                animation: `pulse-light ${5 + Math.random() * 5}s ease-in-out ${Math.random() * 2}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <h2
              className={`
                text-5xl md:text-6xl text-white mb-6 tracking-tight leading-[0.9]
                transition-all duration-700 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
              style={{
                fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                fontWeight: 400,
              }}
            >
              Utvalda <span className="font-medium">Möjligheter</span>
            </h2>

            <div
              className={`
                flex items-center justify-center space-x-4 mb-4
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
                text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light
                transition-all duration-1000 delay-600 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
              }}
            >
              Hitta din nästa tjänst i vårt utbud av lediga jobb
            </p>
          </div>

          {/* Jobb-kort */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
            {jobs.map((job, idx) => (
              <SimpleHoverCard
                key={job.id}
                className="w-full max-w-sm bg-white/95 backdrop-blur-sm border border-white/20 flex flex-col cursor-pointer"
              >
                <div
                  className="p-5 flex-1 flex flex-col"
                  onClick={() => navigate(`/job/${job.id}`)}
                  onMouseEnter={() => setActiveCard(idx)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="
                      w-14 h-14 rounded-xl
                      bg-gradient-to-br from-gray-600 to-gray-800
                      flex items-center justify-center
                      text-white font-bold text-lg shadow-lg flex-shrink-0
                    ">
                      {job.companyLogo}
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* Jobbtitel */}
                      <h3
                        className="text-lg mb-1 leading-tight font-bold"
                        style={{
                          fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                          color: '#111827',
                        }}
                      >
                        {job.title}
                      </h3>
                      {/* Företagsnamn */}
                      <div
                        className="text-base"
                        style={{
                          fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                          fontWeight: 400,
                          color: '#374151',
                        }}
                      >
                        {job.company}
                      </div>
                    </div>
                  </div>

                  {/* Meta-info */}
                  <div
                    className="flex items-center space-x-4 text-sm mb-4"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      color: '#6B7280',
                    }}
                  >
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

                {/* Datum-footer */}
                <div
                  className="relative z-10 p-5 pt-0 flex items-end justify-between"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                  }}
                >
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

          {/* CTA-knapp */}
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
                group relative px-8 py-4
                bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl
                font-medium tracking-wide
                hover:border-white/40 hover:bg-white/20
                transition-all duration-300
                shadow-lg hover:shadow-xl
                hover:scale-105 hover:-translate-y-1
                overflow-hidden
              "
              style={{
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <div className="relative flex items-center space-x-2">
                <span className="font-medium">Se Alla Jobb</span>
                <ArrowRight size={16} className="transition-transform duration-300" />
              </div>
            </button>
          </div>

          {/* Bottom Accent */}
          <div
            className={`
              text-center mt-16
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

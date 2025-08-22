import React, { useState, useEffect, useRef } from 'react';
import { User, Briefcase, ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AudienceTiles = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const sectionRef = useRef<HTMLElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const safeTilt = isMobile ? [{ x: 0, y: 0 }, { x: 0, y: 0 }] : tilt;
  const safeMouse = isMobile ? { x: 50, y: 50 } : mousePosition;

  const audiences = [
    {
      id: 'candidates',
      icon: User,
      accentIcon: Target,
      title: 'För',
      subtitle: 'Kandidater',
      description:
        'Lås upp din potential med kurerade möjligheter som stämmer överens med dina ambitioner och värderingar.',
      features: ['Personlig Matchning', 'Karriäracceleration', 'Premium Nätverk'],
      gradient: 'from-blue-500 via-blue-600 to-indigo-700',
    },
    {
      id: 'clients',
      icon: Briefcase,
      accentIcon: Zap,
      title: 'För',
      subtitle: 'Företag',
      description:
        'Prioriterad matchning – Vi lägger extra fokus på att snabbt identifiera och kontakta rätt kandidater för era behov.',
      features: ['Snabb Sourcing', 'Kvalitetssäkring', 'Strategiskt Partnerskap'],
      gradient: 'from-teal-500 via-emerald-600 to-green-700',
    },
  ];

  const handleTilt = (e: React.MouseEvent, idx: number) => {
    if (isMobile) return;
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 12;
    const rotateX = -(py - 0.5) * 12;
    setTilt((prev) => {
      const copy = [...prev];
      copy[idx] = { x: rotateX, y: rotateY };
      return copy;
    });
  };

  const resetTilt = (idx: number) => {
    setTilt((prev) => {
      const copy = [...prev];
      copy[idx] = { x: 0, y: 0 };
      return copy;
    });
  };

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Rubrik */}
        <div className="text-center mb-20 relative">
          <h2
            className={`
              text-5xl md:text-6xl mb-6 tracking-tight leading-[0.9]
              transition-all duration-1000 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
            `}
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 400,
              color: 'white',
            }}
          >
            Välj Din Väg
          </h2>
          <p
            className={`
              text-xl max-w-2xl mx-auto leading-relaxed
              transition-all duration-1000 delay-400 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            Flexibel bemanning för kandidater och företag.
          </p>
        </div>

        {/* Kort */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {audiences.map((audience, index) => {
            // visa bara sista punkten på mobil
            const shownFeatures = isMobile
              ? [audience.features[audience.features.length - 1]]
              : audience.features;

            return (
              <div
                key={audience.id}
                className={`
                  relative transition-all duration-1000 transform
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
                `}
                style={{ transitionDelay: `${800 + index * 300}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => {
                  setActiveCard(null);
                  resetTilt(index);
                }}
                onMouseMove={(e) => handleTilt(e, index)}
                onClick={() =>
                  navigate(audience.id === 'candidates' ? '/for-candidates' : '/partner')
                }
              >
                <div
                  className={`
                    relative rounded-2xl sm:rounded-3xl overflow-hidden
                    bg-white/5 backdrop-blur-2xl
                    border border-white/15
                    transition-all duration-700 ease-out cursor-pointer
                    min-h-[420px] sm:h-[600px]
                  `}
                >
                  {/* Header */}
                  <div
                    className={`
                      relative h-36 sm:h-48 flex items-center justify-center overflow-hidden
                      bg-gradient-to-br ${audience.gradient}
                    `}
                  >
                    <div
                      className={`
                        relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/15 backdrop-blur-sm
                        flex items-center justify-center transition-all duration-500 shadow-lg
                      `}
                    >
                      <audience.icon size={isMobile ? 32 : 40} className="text-white" />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="relative p-6 sm:p-8 flex flex-col">
                    <h3
                      className="uppercase text-[#A0BFFF] tracking-[0.08em] text-sm sm:text-base"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      {audience.title}
                    </h3>
                    <h4
                      className="text-white font-medium text-2xl sm:text-3xl mt-1"
                      style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                    >
                      {audience.subtitle}
                    </h4>
                    <p
                      className="text-[#CBD5E1] text-[15px] leading-7 sm:text-base sm:leading-7 mb-4"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      {audience.description}
                    </p>

                    {/* Features – reducerad på mobil */}
                    <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                      {shownFeatures.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${audience.gradient} flex-shrink-0`}
                          />
                          <span
                            className="text-[#E2E8F0] text-[15px] sm:text-base"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="absolute left-6 right-6 bottom-6 sm:left-auto sm:right-6">
                    <button
                      className={`
                        group w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl
                        bg-gradient-to-r ${audience.gradient} text-white
                        shadow-lg hover:shadow-xl transition-all duration-300
                        hover:scale-105 active:scale-95 overflow-hidden font-medium
                        flex items-center gap-2
                      `}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(audience.id === 'candidates' ? '/for-candidates' : '/partner');
                      }}
                    >
                      <span>{audience.id === 'candidates' ? 'Utforska Jobb' : 'Bli Partner'}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AudienceTiles;

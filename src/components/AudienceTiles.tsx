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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
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

  // Mobil-only flag (desktop lämnas orörd)
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 639px)').matches;

  // Lås tilt/parallax på mobil
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

  const subtleStars = [
    { left: '12%', top: '18%', size: 2, delay: '0s', color: '#ffffff', opacity: 0.12 },
    { left: '80%', top: '25%', size: 1.5, delay: '1s', color: '#d1ddff', opacity: 0.08 },
    { left: '45%', top: '60%', size: 1.8, delay: '2s', color: '#8fcfff', opacity: 0.1 },
    { left: '30%', top: '40%', size: 1.2, delay: '0.5s', color: '#a0bfff', opacity: 0.07 },
    { left: '65%', top: '10%', size: 2.5, delay: '1.5s', color: '#c5e8ff', opacity: 0.09 },
  ];

  const handleTilt = (e: React.MouseEvent, idx: number) => {
    if (isMobile) return; // ingen tilt på mobil
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
    // ↓ Mindre padding på mobil
    <section ref={sectionRef} className="relative py-20 sm:py-32 overflow-hidden">
      <style>{`
        @keyframes float-slow { 0%,100% { transform: translate(0,0); } 50% { transform: translate(10px,6px); } }
        @keyframes float-slow-reverse { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-8px,-5px); } }
        @keyframes hueShift { 0% { filter: hue-rotate(0deg); } 50% { filter: hue-rotate(8deg); } 100% { filter: hue-rotate(0deg); } }
        @keyframes drift { from { transform: translate(0,0); } to { transform: translate(15px,10px); } }
        .animate-float-slow { animation: float-slow 32s ease-in-out infinite; }
        .animate-float-slow-reverse { animation: float-slow-reverse 36s ease-in-out infinite; }
        .animate-hue { animation: hueShift 70s ease-in-out infinite; }
      `}</style>

      {/* Bakgrund: #08132B + overlays (nedtonade på mobil) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: '#08132B' }} />

        <div
          className="absolute inset-0 opacity-0 sm:opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '140px 140px',
            transform: `translate(${(safeMouse.x - 50) * 0.06}px, ${(safeMouse.y - 50) * 0.06}px)`,
            mixBlendMode: 'overlay',
          }}
        />

        <div
          className="absolute inset-0 opacity-0 sm:opacity-100"
          style={{
            background:
              'radial-gradient(600px 280px at 20% 10%, rgba(255,255,255,0.06), transparent 60%)',
            animation: 'drift 60s linear infinite',
          }}
        />
        <div
          className="absolute inset-0 opacity-0 sm:opacity-100"
          style={{
            background:
              'radial-gradient(800px 360px at 85% 90%, rgba(255,255,255,0.05), transparent 70%)',
            animation: 'drift 80s linear infinite',
          }}
        />

        <div
          className="absolute -left-28 -top-28 w-[600px] h-[600px] rounded-full blur-3xl animate-float-slow opacity-0 sm:opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(11,39,77,0.35) 0%, transparent 70%)',
            transform: `translate(${(safeMouse.x - 50) * 0.02}px, ${(safeMouse.y - 50) * 0.015}px)`,
          }}
        />
        <div
          className="absolute right-1/4 bottom-24 w-[500px] h-[500px] rounded-full blur-3xl animate-float-slow-reverse opacity-0 sm:opacity-25"
          style={{
            background: 'radial-gradient(circle at 60% 50%, rgba(22,74,128,0.22) 0%, transparent 70%)',
            transform: `translate(${(safeMouse.x - 50) * -0.015}px, ${(safeMouse.y - 50) * -0.01}px)`,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)',
            pointerEvents: 'none',
          }}
        />

        {subtleStars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse opacity-0 sm:opacity-100"
            style={{
              width: `${s.size}px`,
              height: `${s.size}px`,
              left: s.left,
              top: s.top,
              backgroundColor: s.color,
              animationDuration: '6s',
              animationDelay: s.delay,
            }}
          />
        ))}

        <div
          className="absolute inset-0 opacity-0 sm:opacity-100"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Rubrik – mindre spacing på mobil */}
        <div className="text-center mb-12 sm:mb-20 relative">
          <div
            className="absolute inset-x-0 mx-auto top-0 w-[360px] h-[160px] rounded-full blur-3xl opacity-25"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.3) 0%, transparent 60%)',
              transform: 'translateY(-20px)',
            }}
          />
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

          <div
            className={`
              flex items-center justify-center space-x-4 mb-4
              transition-all duration-1000 delay-200 transform
              ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
            `}
          >
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="w-2 h-2 bg-white/25 rounded-full" />
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
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
          {audiences.map((audience, index) => (
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
                  shadow-[0_16px_40px_-6px_rgba(0,0,0,0.35)]
                `}
                style={{
                  boxShadow:
                    activeCard === index
                      ? '0 40px 90px -10px rgba(0,0,0,0.35)'
                      : '0 25px 60px -10px rgba(0,0,0,0.25)',
                  transform: isMobile
                    ? undefined
                    : `perspective(1000px) rotateX(${safeTilt[index].x}deg) rotateY(${safeTilt[index].y}deg) scale(${
                        activeCard === index ? 1.02 : 1
                      })`,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {/* Header gradient area – kompakt på mobil */}
                <div
                  className={`
                    relative h-36 sm:h-48 flex items-center justify-center overflow-hidden
                    bg-gradient-to-br ${audience.gradient}
                  `}
                >
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute top-8 right-8 w-20 h-20 border border-white/25 rounded-full opacity-0 sm:opacity-100"
                      style={{ transform: `rotate(${safeMouse.x * 0.1}deg)` }}
                    />
                    <div
                      className="absolute bottom-8 left-8 w-12 h-12 border border-white/30 rounded-full opacity-0 sm:opacity-100"
                      style={{ transform: `rotate(${-safeMouse.y * 0.1}deg)` }}
                    />
                    <Sparkles
                      size={12}
                      className="absolute top-12 left-12 text-white/45 animate-pulse opacity-0 sm:opacity-100"
                      style={{ animationDelay: `${index * 400}ms` }}
                    />
                    <Sparkles
                      size={8}
                      className="absolute bottom-12 right-12 text-white/30 animate-pulse opacity-0 sm:opacity-100"
                      style={{ animationDelay: `${index * 400 + 900}ms` }}
                    />
                  </div>

                  <div
                    className={`
                      relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/15 backdrop-blur-sm
                      flex items-center justify-center transition-all duration-500 shadow-lg
                    `}
                  >
                    <audience.icon size={isMobile ? 32 : 40} className="text-white" />
                  </div>

                  <div
                    className={`
                      absolute top-4 right-4 sm:top-6 sm:right-6 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 backdrop-blur-sm
                      flex items-center justify-center transition-all duration-500 delay-100
                    `}
                  >
                    <audience.accentIcon size={isMobile ? 14 : 16} className="text-white/80" />
                  </div>
                </div>

                {/* Body */}
                <div className="relative p-6 sm:p-8 flex flex-col">
                  <div style={{ marginBottom: '0.2rem' }}>
                    <h3
                      className="uppercase text-[#A0BFFF] tracking-[0.08em] text-sm sm:text-base m-0"
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
                  </div>

                  <p
                    className="text-[#CBD5E1] text-[15px] leading-7 sm:text-base sm:leading-7 max-w-[36ch] mb-4"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  >
                    {audience.description}
                  </p>

                  {/* Features – dolda helt på mobil */}
                  <div className="hidden sm:block space-y-3 mb-8 flex-1">
                    {audience.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${audience.gradient} flex-shrink-0`} />
                        <span
                          className="text-[#E2E8F0]"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA – fullbredd på mobil, dockad i botten */}
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
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    <span>{audience.id === 'candidates' ? 'Utforska Jobb' : 'Bli Partner'}</span>
                    <ArrowRight size={16} className="transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceTiles;

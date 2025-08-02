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
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 12; // max ~6deg each side
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
      <style>{`
        @keyframes float-slow {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(10px,6px); }
        }
        @keyframes float-slow-reverse {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(-8px,-5px); }
        }
        @keyframes hueShift {
          0% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(8deg); }
          100% { filter: hue-rotate(0deg); }
        }
        @keyframes drift {
          from { transform: translate(0,0); }
          to { transform: translate(15px,10px); }
        }
        .animate-float-slow {
          animation: float-slow 32s ease-in-out infinite;
        }
        .animate-float-slow-reverse {
          animation: float-slow-reverse 36s ease-in-out infinite;
        }
        .animate-hue {
          animation: hueShift 70s ease-in-out infinite;
        }
      `}</style>

      {/* Bakgrund med fler lager */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Basgradient + hue shift */}
        <div
          className="absolute inset-0 animate-hue"
          style={{
            background: 'linear-gradient(135deg, #0f1f44 0%, #1f2a63 50%, #0f1f44 100%)',
          }}
        />

        {/* Parallax grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
            `,
            backgroundSize: '150px 150px',
            transform: `translate(${(mousePosition.x - 50) * 0.08}px, ${(mousePosition.y - 50) * 0.08}px)`,
            mixBlendMode: 'overlay',
            opacity: 0.9,
          }}
        />

        {/* Driftande ljus-overlay för att bryta monotoni */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.02) 0%, transparent 60%)',
            mixBlendMode: 'soft-light',
            animation: 'drift 60s linear infinite',
          }}
        />

        {/* Flytande glows */}
        <div
          className="absolute -left-28 -top-28 w-[600px] h-[600px] rounded-full blur-3xl animate-float-slow"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.35) 0%, transparent 70%)',
            opacity: 0.3,
            transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.015}px)`,
          }}
        />
        <div
          className="absolute right-1/4 bottom-24 w-[500px] h-[500px] rounded-full blur-3xl animate-float-slow-reverse"
          style={{
            background: 'radial-gradient(circle at 60% 50%, rgba(16,185,129,0.25) 0%, transparent 70%)',
            opacity: 0.2,
            transform: `translate(${(mousePosition.x - 50) * -0.015}px, ${(mousePosition.y - 50) * -0.01}px)`,
          }}
        />

        {/* Subtil vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Stjärnor */}
        {subtleStars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${s.size}px`,
              height: `${s.size}px`,
              left: s.left,
              top: s.top,
              backgroundColor: s.color,
              opacity: s.opacity,
              animationDuration: '6s',
              animationDelay: s.delay,
            }}
          />
        ))}

        {/* Lätt textur / noise */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Rubrik */}
        <div className="text-center mb-20 relative">
          {/* Glow bakom rubrik */}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {audiences.map((audience, index) => (
            <div
              key={audience.id}
              className={`
                relative
                transition-all duration-1000 transform
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
                  relative h-[600px] rounded-3xl overflow-hidden
                  bg-white/5 backdrop-blur-2xl
                  border border-white/20
                  transition-all duration-700 ease-out
                  cursor-pointer
                `}
                style={{
                  boxShadow:
                    activeCard === index
                      ? '0 40px 90px -10px rgba(0,0,0,0.35)'
                      : '0 25px 60px -10px rgba(0,0,0,0.25)',
                  transform: `perspective(1000px) rotateX(${tilt[index].x}deg) rotateY(${tilt[index].y}deg) scale(${
                    activeCard === index ? 1.02 : 1
                  })`,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {/* Header gradient area */}
                <div
                  className={`
                    relative h-48 flex items-center justify-center overflow-hidden
                    bg-gradient-to-br ${audience.gradient}
                  `}
                >
                  {/* Dekorativa former i gradienten */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute top-8 right-8 w-20 h-20 border border-white/25 rounded-full"
                      style={{ transform: `rotate(${mousePosition.x * 0.1}deg)` }}
                    />
                    <div
                      className="absolute bottom-8 left-8 w-12 h-12 border border-white/30 rounded-full"
                      style={{ transform: `rotate(${-mousePosition.y * 0.1}deg)` }}
                    />
                    <Sparkles
                      size={12}
                      className="absolute top-12 left-12 text-white/45 animate-pulse"
                      style={{ animationDelay: `${index * 400}ms` }}
                    />
                    <Sparkles
                      size={8}
                      className="absolute bottom-12 right-12 text-white/30 animate-pulse"
                      style={{ animationDelay: `${index * 400 + 900}ms` }}
                    />
                  </div>

                  {/* Ikon-box */}
                  <div
                    className={`
                      relative z-10 w-24 h-24 rounded-2xl bg-white/15 backdrop-blur-sm
                      flex items-center justify-center
                      transition-all duration-500
                      shadow-lg
                    `}
                  >
                    <audience.icon size={40} className="text-white" />
                  </div>

                  {/* Accent-ikon */}
                  <div
                    className={`
                      absolute top-6 right-6 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm
                      flex items-center justify-center
                      transition-all duration-500 delay-100
                    `}
                  >
                    <audience.accentIcon size={16} className="text-white/80" />
                  </div>
                </div>

                {/* Body */}
                <div className="relative p-8 h-[calc(100%-12rem)] flex flex-col">
                  <div style={{ marginBottom: '0.2rem' }}>
                    <h3
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        fontSize: '1.125rem',
                        color: '#A0BFFF',
                        margin: 0,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                      }}
                    >
                      {audience.title}
                    </h3>
                    <h4
                      style={{
                        fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                        fontWeight: 500,
                        fontSize: '1.875rem',
                        color: 'white',
                        margin: '4px 0 0 0',
                      }}
                    >
                      {audience.subtitle}
                    </h4>
                  </div>

                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '1rem',
                      color: '#CBD5E1',
                      lineHeight: '1.75rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {audience.description}
                  </p>

                  <div className="space-y-3 mb-8 flex-1">
                    {audience.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center space-x-3"
                        style={{ transitionDelay: `${fIdx * 80}ms` }}
                      >
                        <div
                          className={`
                            w-2 h-2 rounded-full bg-gradient-to-r ${audience.gradient}
                            flex-shrink-0
                          `}
                        />
                        <span
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 400,
                            fontSize: '1rem',
                            color: '#E2E8F0',
                          }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: '52px' }} aria-hidden="true" />
                </div>

                {/* CTA */}
                <div className="absolute bottom-6 right-6">
                  <button
                    className={`
                      group relative px-8 py-4 rounded-2xl
                      bg-gradient-to-r ${audience.gradient} text-white
                      shadow-lg hover:shadow-xl
                      transition-all duration-300
                      hover:scale-105 active:scale-95
                      overflow-hidden font-medium flex items-center space-x-2
                    `}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(audience.id === 'candidates' ? '/for-candidates' : '/partner');
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    <div className="relative flex items-center space-x-2">
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                        }}
                      >
                        {audience.id === 'candidates' ? 'Utforska Jobb' : 'Bli Partner'}
                      </span>
                      <ArrowRight size={16} className="transition-transform duration-300" />
                    </div>
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

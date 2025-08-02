import React, { useState, useEffect, useRef } from 'react';
import { User, Briefcase, ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AudienceTiles = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState<number | null>(null);
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

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Bakgrund: mörkblå bas + liv */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Basgradient (mörk blå/navy) */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 25% 35%, #1f2a48 0%, #0f1f44 60%), linear-gradient(135deg, #0f1f44 0%, #1f2a63 100%)',
          }}
        />

        {/* Mjuk glow 1 (parallax) */}
        <div
          className="absolute -left-32 -top-32 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.4) 0%, transparent 70%)',
            opacity: 0.25,
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.02}px)`,
          }}
        />

        {/* Mjuk glow 2 (parallax) */}
        <div
          className="absolute right-1/4 bottom-20 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle at 60% 50%, rgba(16,185,129,0.35) 0%, transparent 70%)',
            opacity: 0.18,
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.01}px)`,
          }}
        />

        {/* Subtila orbs */}
        <div
          className="absolute w-[900px] h-[900px] rounded-full blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.4}%`,
            top: `${mousePosition.y * 0.25}%`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.08,
          }}
        />
        <div
          className="absolute w-[700px] h-[700px] rounded-full blur-3xl transition-all duration-1000 delay-300"
          style={{
            background: `radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.25}%`,
            bottom: `${mousePosition.y * 0.35}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Subtil grid-overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
            mixBlendMode: 'overlay',
          }}
        />

        {/* Lätt noise-overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.35' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' fill='rgba(255,255,255,0.008)'/></svg>")`,
          }}
        />

        {/* Vignette (mild) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.25) 100%)',
          }}
        />

        {/* Små pulserande prickar */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-16 left-10 w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#6366f1', opacity: 0.25, animationDuration: '6s' }}
          />
          <div
            className="absolute bottom-24 right-20 w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: '#10b981', opacity: 0.2, animationDuration: '7s', animationDelay: '1s' }}
          />
          <div
            className="absolute top-1/3 right-28 w-1 h-1 rounded-full animate-pulse"
            style={{ backgroundColor: '#a78bfa', opacity: 0.15, animationDuration: '8s', animationDelay: '2s' }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Sektionens rubrik */}
        <div className="text-center mb-20">
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
            <div className="w-2 h-2 bg-white/20 rounded-full" />
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
              color: 'rgba(255,255,255,0.7)',
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
              onMouseLeave={() => setActiveCard(null)}
              onClick={() =>
                navigate(audience.id === 'candidates' ? '/for-candidates' : '/partner')
              }
            >
              <div
                className={`
                  relative h-[600px] rounded-3xl overflow-hidden
                  bg-white/95 backdrop-blur-xl
                  border border-white/30
                  shadow-2xl shadow-black/20
                  transition-all duration-700 ease-out
                `}
              >
                <div
                  className={`
                    relative h-48 bg-gradient-to-br ${audience.gradient}
                    flex items-center justify-center overflow-hidden
                  `}
                >
                  <div className="absolute inset-0">
                    <div
                      className="absolute top-8 right-8 w-20 h-20 border border-white/20 rounded-full"
                      style={{ transform: `rotate(${mousePosition.x * 0.1}deg)` }}
                    />
                    <div
                      className="absolute bottom-8 left-8 w-12 h-12 border border-white/30 rounded-full"
                      style={{ transform: `rotate(${-mousePosition.y * 0.1}deg)` }}
                    />

                    <Sparkles
                      size={12}
                      className="absolute top-12 left-12 text-white/40 animate-pulse"
                      style={{ animationDelay: `${index * 500}ms` }}
                    />
                    <Sparkles
                      size={8}
                      className="absolute bottom-12 right-12 text-white/30 animate-pulse"
                      style={{ animationDelay: `${index * 500 + 1000}ms` }}
                    />
                  </div>

                  <div
                    className={`
                      relative z-10 w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm
                      flex items-center justify-center
                      transition-all duration-500
                    `}
                  >
                    <audience.icon size={40} className="text-white" />
                  </div>

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

                <div className="relative p-8 h-[calc(100%-12rem)] flex flex-col">
                  <div style={{ marginBottom: '0.15rem' }}>
                    <h3
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        fontSize: '1.125rem',
                        color: '#6b7280',
                        margin: 0,
                      }}
                    >
                      {audience.title}
                    </h3>
                    <h4
                      style={{
                        fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                        fontWeight: 500,
                        fontSize: '1.875rem',
                        color: '#111827',
                        margin: '2px 0 0 0',
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
                      color: '#4b5563',
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
                        style={{ transitionDelay: `${fIdx * 100}ms` }}
                      >
                        <div
                          className={`
                            w-1.5 h-1.5 rounded-full bg-gradient-to-r ${audience.gradient}
                            transition-all duration-500
                          `}
                        />
                        <span
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 400,
                            fontSize: '1rem',
                            color: '#374151',
                          }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: '52px' }} aria-hidden="true" />
                </div>

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

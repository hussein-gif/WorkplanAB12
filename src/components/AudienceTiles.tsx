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
      className="relative py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden"
    >
      {/* Bakgrundseffekter */}
      <div className="absolute inset-0">
        {/* Primär gradient-overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-gray-900/90 to-slate-800/95" />

        {/* Animerade orbs */}
        <div
          className="absolute w-[1000px] h-[1000px] rounded-full opacity-[0.08] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.5}%`,
            top: `${mousePosition.y * 0.3}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.06] blur-3xl transition-all duration-1000 delay-300"
          style={{
            background: `radial-gradient(circle, #10B981 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.3}%`,
            bottom: `${mousePosition.y * 0.4}%`,
            transform: 'translate(50%, 50%)',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl transition-all duration-1000 delay-600"
          style={{
            background: `radial-gradient(circle, #8B5CF6 0%, transparent 70%)`,
            left: `${50 + mousePosition.x * 0.2}%`,
            top: `${50 + mousePosition.y * 0.2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Flytande geometriska element */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          />
          <div
            className="absolute top-20 right-32 w-3 h-3 bg-blue-400/30 rounded-full animate-pulse"
            style={{ animationDuration: '3s' }}
          />
          <div
            className="absolute top-40 left-20 w-2 h-2 bg-emerald-400/40 rounded-full animate-pulse"
            style={{ animationDuration: '4s', animationDelay: '1s' }}
          />
          <div
            className="absolute bottom-32 right-20 w-2.5 h-2.5 bg-purple-400/25 rounded-full animate-pulse"
            style={{ animationDuration: '5s', animationDelay: '2s' }}
          />
          <div
            className="absolute bottom-40 left-32 w-1.5 h-1.5 bg-indigo-400/35 rounded-full animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '3s' }}
          />
          <div
            className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/5 rounded-full"
            style={{ transform: `rotate(${mousePosition.x * 0.1}deg)` }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white/5 rounded-full"
            style={{ transform: `rotate(${-mousePosition.y * 0.1}deg)` }}
          />
        </div>

        {/* Atmosfäriskt brus */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Sektionens rubrik */}
        <div className="text-center mb-20">
          <h2
            className={`
              text-5xl md:text-7xl mb-6 tracking-tight leading-[0.9]
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
              flex items-center justify-center space-x-4 mb-8
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
              fontWeight: 400,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            Oavsett om du är talang som söker nästa utmaning eller företag som behöver specialistkompetens,
            erbjuder vi flexibla bemanningslösningar anpassade efter dina behov.
          </p>
        </div>

        {/* Kort */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {audiences.map((audience, index) => (
            <div
              key={audience.id}
              className={`
                group relative
                transition-all duration-1000 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
              `}
              style={{ transitionDelay: `${800 + index * 300}ms` }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Huvudkort */}
              <div
                className={`
                  relative h-[600px] rounded-3xl overflow-hidden
                  bg-white/95 backdrop-blur-xl
                  border border-white/30
                  shadow-2xl shadow-black/20
                  transition-all duration-700 ease-out
                  ${activeCard === index
                    ? 'scale-105 shadow-3xl shadow-black/30 -translate-y-2'
                    : 'hover:scale-[1.02] hover:-translate-y-1'}
                `}
                onClick={() =>
                  navigate(audience.id === 'candidates' ? '/for-candidates' : '/partner')
                }
              >
                {/* Bakgrundsglow */}
                <div
                  className={`
                    absolute inset-0 rounded-3xl opacity-0 transition-all duration-700
                    ${activeCard === index ? `opacity-10 bg-gradient-to-br ${audience.gradient}` : ''}
                  `}
                />

                {/* Gradient-header */}
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
                      ${activeCard === index ? 'scale-110 rotate-3' : ''}
                    `}
                  >
                    <audience.icon size={40} className="text-white" />
                  </div>

                  <div
                    className={`
                      absolute top-6 right-6 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm
                      flex items-center justify-center
                      transition-all duration-500 delay-100
                      ${activeCard === index ? 'scale-125 rotate-12' : ''}
                    `}
                  >
                    <audience.accentIcon size={16} className="text-white/80" />
                  </div>
                </div>

                {/* Innehåll */}
                <div className="relative p-8 h-[calc(100%-12rem)] flex flex-col">
                  <div className="mb-6">
                    <h3
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        fontSize: '1.125rem',
                        color: '#6b7280',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {audience.title}
                    </h3>
                    <h4
                      style={{
                        fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                        fontWeight: 400,
                        fontSize: '1.875rem',
                        color: '#111827',
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
                      marginBottom: '2rem',
                    }}
                  >
                    {audience.description}
                  </p>

                  <div className="space-y-3 mb-8 flex-1">
                    {audience.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className={`flex items-center space-x-3 transition-all duration-500 ${
                          activeCard === index ? 'translate-x-2' : ''
                        }`}
                        style={{ transitionDelay: `${fIdx * 100}ms` }}
                      >
                        <div
                          className={`
                            w-1.5 h-1.5 rounded-full bg-gradient-to-r ${audience.gradient}
                            transition-all duration-500 ${
                              activeCard === index ? 'scale-150' : ''
                            }
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

                  <div className="flex items-center justify-end">
                    <button
                      className={`
                        relative px-8 py-4 rounded-2xl
                        bg-gradient-to-r ${audience.gradient} text-white
                        shadow-lg hover:shadow-xl
                        transition-all duration-300
                        hover:scale-105 active:scale-95
                        overflow-hidden font-medium
                      `}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      onClick={() =>
                        navigate(audience.id === 'candidates' ? '/for-candidates' : '/partner')
                      }
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

                {/* Subtil kantglöd */}
                <div
                  className={`
                    absolute inset-0 rounded-3xl border border-transparent
                    bg-gradient-to-r ${audience.gradient} opacity-0
                    transition-opacity duration-500
                    ${activeCard === index ? 'opacity-20' : ''}
                  `}
                  style={{
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    padding: '1px',
                  }}
                />
              </div>

              {/* Flytande skugga */}
              <div
                className={`
                  absolute inset-0 rounded-3xl bg-gradient-to-br ${audience.gradient}
                  opacity-0 blur-xl -z-10
                  transition-all duration-700
                  ${activeCard === index ? 'opacity-20 scale-110' : ''}
                `}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceTiles;


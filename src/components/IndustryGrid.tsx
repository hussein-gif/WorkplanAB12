import React, { useState, useEffect, useRef } from 'react';
import { Truck, CheckCircle, Clock, Shield } from 'lucide-react';

const WarehouseLogisticsSpecialists = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  const trustPillars = [
    {
      icon: Truck,
      title: 'Djup Branschkännedom',
      description: 'Vårt team förstår era unika behov inom lager och logistik.',
      highlight: 'Specialister på ert område',
      accent: 'teal' as const,
    },
    {
      icon: CheckCircle,
      title: 'Noggrann Screening',
      description: 'Vi genomför strukturerade kompetens- och bakgrundskontroller.',
      highlight: 'Trygg matchning',
      accent: 'lavender' as const,
    },
    {
      icon: Clock,
      title: 'Snabb Respons',
      description: 'Omedelbar återkoppling för att hålla er bemanning i rörelse.',
      highlight: 'Snabbt igångsättande',
      accent: 'teal' as const,
    },
    {
      icon: Shield,
      title: 'Säkerhet & Kvalitet',
      description: 'Certifierade medarbetare med fokus på trygghet och kvalitet i varje uppdrag.',
      highlight: 'Hög leveranskvalitet',
      accent: 'lavender' as const,
    },
  ] as const;

  type Pillar = typeof trustPillars[number];

  const accentConfig = {
    teal: {
      bar: 'linear-gradient(180deg, rgba(94,234,212,1), rgba(94,234,212,0.6))',
      underline: 'from-[#5eead4] to-[#5eead4]',
      soft: 'rgba(94,234,212,0.15)',
    },
    lavender: {
      bar: 'linear-gradient(180deg, rgba(196,181,253,1), rgba(196,181,253,0.6))',
      underline: 'from-[#c4b5fd] to-[#c4b5fd]',
      soft: 'rgba(196,181,253,0.15)',
    },
  } as const;

  const DarkCard = ({
    pillar,
    index,
  }: {
    pillar: Pillar;
    index: number;
  }) => {
    const [isHover, setIsHover] = useState(false);
    return (
      <div
        className="relative flex-1"
        style={{ perspective: 800, minHeight: 260 }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div
          className={`
            relative rounded-2xl overflow-hidden
            bg-[rgba(15,25,70,0.85)] border border-[rgba(255,255,255,0.07)]
            shadow-md transition-all duration-300
            ${isHover ? 'scale-[1.025] shadow-xl' : ''}
          `}
        >
          {/* Accent bar left */}
          <div
            className="absolute top-0 left-0 bottom-0 w-1 rounded-r"
            style={{ background: accentConfig[pillar.accent].bar }}
          />

          {/* Subtle decorative shapes */}
          <div
            className="absolute -top-5 -left-5 w-20 h-20 rounded-full opacity-20 blur-lg"
            style={{ background: accentConfig[pillar.accent].soft }}
            aria-hidden="true"
          />
          <div
            className="absolute top-6 right-6 w-12 h-12 rounded border border-[rgba(255,255,255,0.08)] opacity-25"
            aria-hidden="true"
            style={{
              transform: `translate(${mousePosition.x * 0.004}px, ${-mousePosition.y * 0.004}px)`,
            }}
          />

          <div className="relative p-6 flex flex-col h-full">
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[rgba(255,255,255,0.08)] ring-1 ring-[rgba(255,255,255,0.1)]">
                  <pillar.icon size={20} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold text-white relative mb-1"
                  style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                >
                  {pillar.title}
                  <div
                    className={`
                      absolute left-0 bottom-0 h-0.5 bg-gradient-to-r ${accentConfig[pillar.accent].underline}
                      transition-all duration-300
                      ${isHover ? 'w-full' : 'w-8'}
                    `}
                  />
                </h3>
              </div>
            </div>
            <p
              className="text-sm text-gray-300 flex-1 leading-relaxed mb-4"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              {pillar.description}
            </p>
            <div
              className="text-xs uppercase tracking-wider"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, color: '#9CA3AF' }}
            >
              {pillar.highlight}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f0f4f9 0%, #d9e2ec 70%)',
      }}
    >
      {/* Bakgrundseffekter: mild vignette + subtilt grid + very light noise + central soft blob */}
      <style>{`
        @keyframes slowPulse {
          0%,100% { opacity: 0.04; }
          50% { opacity: 0.07; }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none">
        {/* Ljus vignette för djup */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.65) 0%, transparent 65%)',
            mixBlendMode: 'overlay',
          }}
        />
        {/* Subtilt grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(0,0,0,0.02) 1px, transparent 1px),
              linear-gradient(225deg, rgba(0,0,0,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '180px 180px',
          }}
        />
        {/* Lätt noise via SVG */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.015'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        {/* Central, väldigt lätt accent-blob bakom korten */}
        <div
          className="absolute left-1/2 top-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)',
            animation: 'slowPulse 20s ease-in-out infinite',
          }}
        />

        {/* Små geometriska accenter */}
        <div
          className="absolute top-16 left-16 w-16 h-16 border border-[#cbd5e1] rounded-full"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.008}px)`,
            opacity: 0.35,
          }}
        />
        <div
          className="absolute bottom-20 right-16 w-20 h-20 border border-[#94a3b8] rounded-lg"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * 0.01}px)`,
            opacity: 0.3,
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-12 h-12 border border-[#a5b8d1] rounded-sm"
          style={{
            transform: `translate(${mousePosition.x * 0.008}px, ${-mousePosition.y * 0.008}px)`,
            opacity: 0.25,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1040px] mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`
              text-4xl md:text-5xl mb-4 tracking-tight
              font-semibold text-gray-900
              transition-all duration-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Vår Expertis Inom <span className="block font-normal">Logistikbemanning</span>
          </h2>
          <div
            className={`
              w-16 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-3
              transition-all duration-700
              ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
            `}
          />
          <p
            className={`
              text-lg max-w-2xl mx-auto leading-snug font-light
              text-gray-600
              transition-all duration-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Djup branschkunskap och noggrant urval för att matcha rätt kompetens med ert team.
          </p>
        </div>

        {/* Kortlayout 2x2 */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <DarkCard pillar={trustPillars[0]} index={0} />
            <DarkCard pillar={trustPillars[1]} index={1} />
          </div>
          <div className="flex gap-4">
            <DarkCard pillar={trustPillars[2]} index={2} />
            <DarkCard pillar={trustPillars[3]} index={3} />
          </div>
        </div>

        {/* Indikatorer */}
        <div
          className={`
            text-center mt-12
            transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="inline-flex items-center space-x-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-[#5eead4] rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-[#c4b5fd] rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
              <div className="w-2 h-2 bg-[#5eead4] rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
              <div className="w-2 h-2 bg-[#c4b5fd] rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
            </div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarehouseLogisticsSpecialists;

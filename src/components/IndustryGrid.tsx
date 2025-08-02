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
      accentGradient: 'linear-gradient(180deg, rgba(94,234,212,0.6), rgba(94,234,212,0.25))', // tealish
    },
    {
      icon: CheckCircle,
      title: 'Noggrann Screening',
      description: 'Vi genomför strukturerade kompetens- och bakgrundskontroller.',
      highlight: 'Trygg matchning',
      accentGradient: 'linear-gradient(180deg, rgba(196,181,253,0.6), rgba(196,181,253,0.25))', // lavender
    },
    {
      icon: Clock,
      title: 'Snabb Respons',
      description: 'Omedelbar återkoppling för att hålla er bemanning i rörelse.',
      highlight: 'Snabbt igångsättande',
      accentGradient: 'linear-gradient(180deg, rgba(94,234,212,0.6), rgba(94,234,212,0.25))', // växlar tillbaka till teal
    },
    {
      icon: Shield,
      title: 'Säkerhet & Kvalitet',
      description: 'Certifierade medarbetare med fokus på trygghet och kvalitet i varje uppdrag.',
      highlight: 'Hög leveranskvalitet',
      accentGradient: 'linear-gradient(180deg, rgba(196,181,253,0.6), rgba(196,181,253,0.25))', // lavender
    },
  ];

  const FancyCard = ({
    icon: Icon,
    title,
    description,
    highlight,
    accentGradient,
  }: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    title: string;
    description: string;
    highlight: string;
    accentGradient: string;
  }) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
    const [isHover, setIsHover] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 8; // mild tilt
      const rotateX = (0.5 - py) * 8;
      setTilt({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
      setTilt({ rotateX: 0, rotateY: 0 });
      setIsHover(false);
    };

    return (
      <div
        ref={(el) => (cardRef.current = el)}
        className="relative flex-1"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHover(true)}
        style={{ perspective: 800 }}
      >
        <div
          className={`
            relative rounded-2xl overflow-hidden
            bg-[rgba(15,25,70,0.85)] border border-[rgba(255,255,255,0.07)]
            shadow-lg transition-all duration-300
          `}
          style={{
            minHeight: 260,
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isHover ? 1.025 : 1})`,
            boxShadow: isHover
              ? '0 30px 60px -5px rgba(0,0,0,0.4)'
              : '0 15px 40px -5px rgba(0,0,0,0.25)',
            backdropFilter: 'saturate(180%) blur(12px)',
          }}
        >
          {/* Accent bar vänster */}
          <div
            className="absolute top-0 left-0 bottom-0 w-1 rounded-r"
            style={{ background: accentGradient }}
          />

          {/* Subtil dekor (ljus cirkel) */}
          <div
            className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-25 blur-xl"
            style={{ background: 'rgba(255,255,255,0.04)' }}
            aria-hidden="true"
          />
          <div
            className="absolute top-6 right-6 w-16 h-16 rounded-lg border border-[rgba(255,255,255,0.08)] opacity-30"
            style={{
              transform: `translate(${mousePosition.x * 0.004}px, ${-mousePosition.y * 0.004}px)`,
            }}
            aria-hidden="true"
          />

          <div className="relative p-6 flex flex-col h-full">
            <div className="flex items-start gap-4 mb-2">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[rgba(255,255,255,0.08)] ring-1 ring-[rgba(255,255,255,0.1)]">
                  <Icon size={20} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold text-white relative mb-1"
                  style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                >
                  {title}
                  <div
                    className={`
                      absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-[#5eead4] to-[#c4b5fd]
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
              {description}
            </p>
            <div
              className="text-xs uppercase tracking-wider"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, color: '#9CA3AF' }}
            >
              {highlight}
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
        background: 'linear-gradient(135deg, #0f1f44 0%, #1e3f8f 85%)',
      }}
    >
      {/* Bakgrundseffekter: vignette + subtil grid + former */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.05) 0%, transparent 70%)',
            mixBlendMode: 'overlay',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 60% 40%, rgba(0,0,0,0.2) 0%, transparent 80%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '150px 150px',
          }}
        />
        <div
          className="absolute top-12 left-12 w-16 h-16 border border-[rgba(255,255,255,0.08)] rounded-full"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.01}px)`,
            opacity: 0.35,
          }}
        />
        <div
          className="absolute bottom-16 right-16 w-20 h-20 border border-[rgba(255,255,255,0.06)] rounded-lg"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * 0.015}px)`,
            opacity: 0.3,
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-12 h-12 border border-[rgba(255,255,255,0.05)] rounded-sm"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
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
              font-semibold text-white
              transition-all duration-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Vår Expertis Inom <span className="block font-normal">Logistikbemanning</span>
          </h2>
          <div
            className={`
              w-16 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-3
              transition-all duration-700
              ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
            `}
          />
          <p
            className={`
              text-lg max-w-2xl mx-auto leading-snug font-light
              text-gray-200
              transition-all duration-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Djup branschkunskap och noggrant urval för att matcha rätt kompetens med ert team.
          </p>
        </div>

        {/* Kortlayout: 2x2 */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <FancyCard {...trustPillars[0]} />
            <FancyCard {...trustPillars[1]} />
          </div>
          <div className="flex gap-4">
            <FancyCard {...trustPillars[2]} />
            <FancyCard {...trustPillars[3]} />
          </div>
        </div>

        {/* Indikatorer längst ner */}
        <div
          className={`
            text-center mt-12
            transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="inline-flex items-center space-x-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-[#5eead4] rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-[#c4b5fd] rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
              <div className="w-2 h-2 bg-[#5eead4] rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
              <div className="w-2 h-2 bg-[#c4b5fd] rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
            </div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarehouseLogisticsSpecialists;

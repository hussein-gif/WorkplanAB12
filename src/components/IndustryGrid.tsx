import React, { useState, useEffect, useRef } from 'react';
import { Truck, CheckCircle, Clock, Shield } from 'lucide-react';

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

const WarehouseLogisticsSpecialists = () => {
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

  const trustPillars = [
    {
      icon: Truck,
      title: 'Djup Branschkännedom',
      description: 'Vårt team förstår era unika behov inom lager och logistik.',
      highlight: 'Specialister på ert område',
      accentGradient: 'linear-gradient(180deg, #3B82F6, #6366F1)',
    },
    {
      icon: CheckCircle,
      title: 'Noggrann Screening',
      description: 'Vi genomför strukturerade kompetens- och bakgrundskontroller.',
      highlight: 'Trygg matchning',
      accentGradient: 'linear-gradient(180deg, #10B981, #14B8A6)',
    },
    {
      icon: Clock,
      title: 'Snabb Respons',
      description: 'Omedelbar återkoppling för att hålla er bemanning i rörelse.',
      highlight: 'Snabbt igångsättande',
      accentGradient: 'linear-gradient(180deg, #F59E0B, #EF4444)',
    },
    {
      icon: Shield,
      title: 'Säkerhet & Kvalitet',
      description: 'Certifierade medarbetare med fokus på trygghet och kvalitet i varje uppdrag.',
      highlight: 'Hög leveranskvalitet',
      accentGradient: 'linear-gradient(180deg, #A855F7, #7C3AED)',
    },
  ];

  const renderCard = (pillar: typeof trustPillars[0], index: number, flexGrow: number) => (
    <div
      key={index}
      className={`
        relative flex
        transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
        group
      `}
      style={{ transitionDelay: `${300 + index * 150}ms`, flex: flexGrow }}
      onMouseEnter={() => setActiveCard(index)}
      onMouseLeave={() => setActiveCard(null)}
    >
      <div
        className={`
          relative flex-1 flex flex-col p-6 rounded-2xl overflow-hidden
          bg-white shadow-md ring-1 ring-gray-100
          transition-transform duration-300
          ${activeCard === index ? 'scale-[1.02] shadow-xl' : ''}
        `}
        style={{ minHeight: '260px' }}
      >
        {/* Accent bar vänster */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-r"
          style={{ background: pillar.accentGradient }}
        />

        {/* Titel & ikon */}
        <div className="flex items-start gap-4 mb-2">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white ring-1 ring-gray-200 shadow-sm">
              <pillar.icon size={20} className="text-gray-700" />
            </div>
          </div>
          <div className="flex-1">
            <h3
              className="text-lg font-semibold text-gray-900 relative"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
            >
              {pillar.title}
              <div
                className={`
                  absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500
                  transition-all duration-300
                  ${activeCard === index ? 'w-full' : 'w-8'}
                `}
              />
            </h3>
          </div>
        </div>

        {/* Beskrivning */}
        <p
          className="text-sm text-gray-600 flex-1 leading-relaxed mb-4"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
        >
          {pillar.description}
        </p>

        {/* Highlight */}
        <div
          className="text-xs uppercase tracking-wider text-gray-400 mt-2"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          {pillar.highlight}
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Bakgrund: ren, professionell, subtil djup */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Basgradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #f9fbfd 0%, #eef5fb 100%)',
          }}
        />
        {/* Subtil vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(0,0,0,0.04) 0%, transparent 70%)',
            mixBlendMode: 'multiply',
          }}
        />
        {/* Diskret grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '140px 140px',
          }}
        />
        {/* Små geometriska former med lätt parallax */}
        <div
          className="absolute top-12 left-12 w-16 h-16 border border-indigo-200 rounded-full"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.01}px)`,
            opacity: 0.4,
          }}
        />
        <div
          className="absolute bottom-16 right-16 w-20 h-20 border border-teal-200 rounded-lg"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * 0.02}px)`,
            opacity: 0.35,
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-12 h-12 border border-purple-200 rounded-sm"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * -0.01}px)`,
            opacity: 0.3,
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
              w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-3
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

        {/* Kortlayout: 2x2 med proportioner */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            {renderCard(trustPillars[0], 0, 1.2)}
            {renderCard(trustPillars[1], 1, 1.8)}
          </div>
          <div className="flex gap-4">
            {renderCard(trustPillars[2], 2, 1.8)}
            {renderCard(trustPillars[3], 3, 1.2)}
          </div>
        </div>

        {/* Bottom indicators */}
        <div
          className={`
            text-center mt-12
            transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="inline-flex items-center space-x-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
            </div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarehouseLogisticsSpecialists;

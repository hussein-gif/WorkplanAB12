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
    return (
      <div className="relative flex-1" style={{ perspective: 800 }}>
        {/* Gradient border wrapper */}
        <div
          className="rounded-3xl p-[2px] mb-0"
          style={{
            background: accentGradient,
          }}
        >
          <div
            className="relative rounded-2xl bg-white overflow-hidden shadow-[0_25px_60px_-10px_rgba(16,24,40,0.08)] transition-transform duration-300 group hover:scale-[1.025]"
            style={{ minHeight: 260 }}
          >
            {/* Subtil dekor bakom */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-30 blur-xl"
              style={{ background: 'rgba(99,102,241,0.15)' }}
              aria-hidden="true"
            />
            <div className="absolute top-6 right-6 w-16 h-16 rounded-lg border border-gray-200 opacity-40"
              style={{
                transform: `translate(${mousePosition.x * 0.005}px, ${-mousePosition.y * 0.005}px)`,
              }}
              aria-hidden="true"
            />

            <div className="relative p-6 flex flex-col h-full">
              <div className="flex items-start gap-4 mb-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-gray-100 to-white ring-1 ring-gray-200 shadow-sm">
                    <Icon size={20} className="text-indigo-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-lg font-semibold text-gray-900 relative mb-1"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    {title}
                    <div className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full w-8" />
                  </h3>
                  <div className="h-0.5 w-10 bg-gradient-to-r from-indigo-100 to-transparent rounded mt-1" />
                </div>
              </div>
              <p
                className="text-sm text-gray-600 flex-1 leading-relaxed mb-4"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {description}
              </p>
              <div
                className="text-xs uppercase tracking-wider text-gray-400"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {highlight}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Bakgrund: varm ljus gradient + vignette + subtil grid + små former */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #f9fbfd 0%, #eef5fb 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, rgba(0,0,0,0.04) 0%, transparent 70%)',
            mixBlendMode: 'multiply',
          }}
        />
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

        {/* Layout: 2x2 med proportioner */}
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

        {/* Bottom indikatorer */}
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

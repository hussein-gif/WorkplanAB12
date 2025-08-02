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

  // Unik kortkomponent med tilt och mikrointeraktion
  const UniqueCard = ({
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
      const rotateY = (px - 0.5) * 12; // max 12deg
      const rotateX = (0.5 - py) * 12;
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
        style={{ perspective: 1000 }}
      >
        <div
          className={`
            relative rounded-2xl overflow-hidden
            bg-white/80 backdrop-blur-md
            ring-1 ring-gray-200
            shadow-lg transition-all duration-400
          `}
          style={{
            minHeight: 260,
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isHover ? 1.03 : 1})`,
            boxShadow: isHover
              ? '0 25px 50px -10px rgba(0,0,0,0.25)'
              : '0 15px 35px -5px rgba(0,0,0,0.1)',
          }}
        >
          {/* Accent bar vänster */}
          <div
            className="absolute top-0 left-0 bottom-0 w-1"
            style={{ background: accentGradient }}
          />

          {/* Dekorativ subtil bakgrundspattern (svg dots) */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <svg
              width="100%"
              height="100%"
              style={{ opacity: 0.04 }}
              viewBox="0 0 200 200"
              preserveAspectRatio="xMidYMid slice"
              className="block"
            >
              <circle cx="160" cy="40" r="50" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
              <circle cx="40" cy="160" r="30" fill="none" stroke="rgba(0,0,0,0.02)" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative p-6 flex flex-col h-full">
            <div className="flex items-start gap-4 mb-2">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white ring-1 ring-gray-200 shadow-sm">
                  <Icon size={20} className="text-gray-700" />
                </div>
              </div>
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold text-gray-900 relative"
                  style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                >
                  {title}
                  <div
                    className={`
                      absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500
                      transition-all duration-300
                      ${isHover ? 'w-full' : 'w-8'}
                    `}
                  />
                </h3>
              </div>
            </div>
            <p
              className="text-sm text-gray-600 flex-1 leading-relaxed mb-4"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              {description}
            </p>
            <div
              className="text-xs uppercase tracking-wider text-gray-400 mt-2"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              {highlight}
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
            <UniqueCard {...trustPillars[0]} />
            <UniqueCard {...trustPillars[1]} />
          </div>
          <div className="flex gap-4">
            <UniqueCard {...trustPillars[2]} />
            <UniqueCard {...trustPillars[3]} />
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

import React, { useState, useEffect, useRef } from 'react';
import { Truck, CheckCircle, Clock, Shield } from 'lucide-react';

const IndustryGrid = () => {
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
      glowColor: 'rgba(59, 130, 246, 0.2)',
    },
    {
      icon: CheckCircle,
      title: 'Noggrann Screening',
      description: 'Vi genomför strukturerade kompetens- och bakgrundskontroller.',
      highlight: 'Trygg matchning',
      glowColor: 'rgba(59, 130, 246, 0.2)',
    },
    {
      icon: Clock,
      title: 'Snabb Respons',
      description: 'Omedelbar återkoppling för att hålla er bemanning i rörelse.',
      highlight: 'Snabbt igångsättande',
      glowColor: 'rgba(59, 130, 246, 0.2)',
    },
    {
      icon: Shield,
      title: 'Säkerhet & Kvalitet',
      description: 'Certifierade medarbetare med fokus på trygghet och kvalitet i varje uppdrag.',
      highlight: 'Hög leveranskvalitet',
      glowColor: 'rgba(59, 130, 246, 0.2)',
    },
  ];

  // ===== Desktop-kort (oförändrad look) =====
  const renderDesktopCard = (
    pillar: typeof trustPillars[0],
    index: number,
    flexGrow: number
  ) => (
    <div
      key={`d-${index}`}
      className={`
        relative flex
        transition-all duration-1000 transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
      `}
      style={{ transitionDelay: `${600 + index * 150}ms`, flex: flexGrow }}
      onMouseEnter={() => setActiveCard(index)}
      onMouseLeave={() => setActiveCard(null)}
    >
      <div
        className={`
          relative flex-1 flex flex-col p-6 rounded-2xl overflow-hidden
          bg-white/30 backdrop-blur-3xl border border-blue-50/40
          transition-all duration-500 ease-out
          min-h-[260px]
          ${activeCard === index ? 'scale-[1.01]' : ''}
        `}
        style={{
          boxShadow:
            activeCard === index
              ? '0 30px 70px -10px rgba(0,0,0,0.25)'
              : '0 15px 40px -10px rgba(0,0,0,0.15)',
          cursor: 'default',
        }}
      >
        {/* Glow när aktiv */}
        <div
          className={`
            absolute inset-0 rounded-2xl pointer-events-none
            transition-opacity duration-500
            ${activeCard === index ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            background: `radial-gradient(circle at 50% 50%, ${pillar.glowColor} 0%, transparent 70%)`,
          }}
        />

        {/* Ikonruta */}
        <div
          className="relative w-14 h-14 rounded-xl mb-4 flex items-center justify-center shadow-lg flex-shrink-0"
          style={{
            background: 'linear-gradient(180deg, #1A3D73 0%, #0B274D 70%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -10px 16px rgba(0,0,0,0.35), 0 10px 24px rgba(11,39,77,0.28)',
          }}
        >
          <span
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 40%)',
              mixBlendMode: 'overlay',
            }}
          />
          <pillar.icon size={24} className="text-white relative" />
        </div>

        {/* Innehåll */}
        <div className="relative z-10 flex-1 flex flex-col justify-between">
          <div>
            <h3
              className="text-lg tracking-tight leading-tight mb-1 font-medium"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', color: '#000' }}
            >
              {pillar.title}
            </h3>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, color: '#000' }}
            >
              {pillar.description}
            </p>
          </div>
          <div
            className="text-xs uppercase tracking-wider mt-2"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, color: '#6B7280' }}
          >
            {pillar.highlight}
          </div>
        </div>
      </div>
    </div>
  );

  // ===== Mobil-kort (ny, kompakt och mer professionell) =====
  const renderMobileCard = (pillar: typeof trustPillars[0], index: number) => (
    <div
      key={`m-${index}`}
      className={`
        relative transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
      `}
      style={{ transitionDelay: `${400 + index * 120}ms` }}
    >
      <div
        className="
          rounded-xl bg-white/20 backdrop-blur-md border border-blue-50/30
          shadow-md px-5 py-5
          min-h-[200px]
        "
        style={{ cursor: 'default' }}
      >
        <div className="relative z-10 flex items-start gap-3">
          {/* Ikon */}
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center shadow shrink-0"
            style={{
              background: 'linear-gradient(180deg, #1A3D73 0%, #0B274D 70%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <pillar.icon size={20} className="text-white" />
          </div>

          {/* Text */}
          <div className="flex-1">
            <h3
              className="text-[17px] font-semibold leading-tight mb-1"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', color: '#000' }}
            >
              {pillar.title}
            </h3>

            <p
              className="text-[14px] leading-6 text-gray-700 mb-3"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              {pillar.description}
            </p>

            <span
              className="inline-block text-[11px] uppercase tracking-wide bg-gray-900/5 text-gray-600 px-2 py-1 rounded"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              {pillar.highlight}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    // ↓ Mindre vertikal padding på mobil
    <section ref={sectionRef} className="relative py-20 sm:py-24 overflow-hidden">
      <style>{`
        @keyframes softPulse {
          0%,100% { opacity: 0.02; transform: scale(1) translate(0,0); }
          50% { opacity: 0.04; transform: scale(1.01) translate(2px, -2px); }
        }
        @keyframes floatY {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        @keyframes slowFloatLarge {
          0% { transform: translate(0,0) scale(1); }
          50% { transform: translate(8px, -8px) scale(1.02); }
          100% { transform: translate(0,0) scale(1); }
        }
      `}</style>

      {/* Bakgrund */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f5fa 55%, #ffffff 100%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 12px)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 45% 40%, rgba(255,255,255,0.5) 0%, transparent 65%)',
            mixBlendMode: 'overlay',
            animation: 'softPulse 25s ease-in-out infinite',
          }}
        />

        {/* Stora blobbar – dämpade på mobil */}
        <div
          className="absolute -left-32 top-10 w-[420px] h-[420px] rounded-full opacity-0 sm:opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(99,102,241,0.12) 0%, transparent 60%)',
            animation: 'slowFloatLarge 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute right-1/4 bottom-20 w-[360px] h-[360px] rounded-full opacity-0 sm:opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle at 60% 40%, rgba(125,211,252,0.1) 0%, transparent 60%)',
            animation: 'slowFloatLarge 30s ease-in-out infinite',
            animationDelay: '5s',
          }}
        />
        <div
          className="absolute left-1/3 bottom-10 w-[300px] h-[300px] rounded-full opacity-0 sm:opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(219,234,254,0.08) 0%, transparent 70%)',
            animation: 'slowFloatLarge 22s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />

        {/* Parallax-orbs/grids – dämpade på mobil */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-0 sm:opacity-[0.04] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #1e40af 0%, #3b82f6 30%, transparent 70%)`,
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-0 sm:opacity-[0.03] blur-3xl transition-all duration-1000 delay-500"
          style={{
            background: `radial-gradient(circle, #0f766e 0%, #14b8a6 30%, transparent 70%)`,
            right: `${mousePosition.x * 0.2}%`,
            bottom: `${mousePosition.y * 0.3}%`,
            transform: 'translate(50%, 50%)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-0 sm:opacity-[0.02] blur-3xl transition-all duration-1000 delay-1000"
          style={{
            background: `radial-gradient(circle, #7c3aed 0%, #a855f7 30%, transparent 70%)`,
            left: `${50 + mousePosition.x * 0.1}%`,
            top: `${30 + mousePosition.y * 0.1}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-0 sm:opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-0 sm:opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(59,130,246,0.035) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(99,102,241,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
            transform: `translate(${mousePosition.x * -0.005}px, ${mousePosition.y * -0.005}px)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1040px] mx-auto px-8">
        {/* Header – tajtare på mobil */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className={`
              text-4xl md:text-5xl mb-4 tracking-tight
              transition-all duration-1000 delay-200 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 400, color: '#000' }}
          >
            <span className="block">Vår Expertis Inom</span>
            <span className="block font-medium">Logistikbemanning</span>
          </h2>
          <div
            className={`
              w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-4
              transition-all duration-1000 delay-200 transform
              ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
            `}
          />
          <p
            className={`
              text-lg max-w-2xl mx-auto leading-snug font-light
              transition-all duration-1000 delay-400 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
            style={{ fontFamily: 'Inter, sans-serif', color: '#000', marginTop: '0.125rem' }}
          >
            Djup branschkunskap och noggrant urval för att matcha rätt kompetens med ert team.
          </p>
        </div>

        {/* ===== Mobil-layout: 1 kolumn ===== */}
        <div className="grid grid-cols-1 gap-4 sm:hidden">
          {trustPillars.map((p, i) => renderMobileCard(p, i))}
        </div>

        {/* ===== Desktop-layout: din originala två-rads-flex ===== */}
        <div className="hidden sm:flex flex-col gap-2 relative">
          <div
            className="absolute left-1/2 top-1/2 w-[520px] h-[520px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 sm:opacity-100"
            style={{
              filter: 'blur(80px)',
              background:
                'radial-gradient(circle at 50% 50%, rgba(125,211,252,0.2) 0%, rgba(59,130,246,0.15) 50%, transparent 85%)',
              mixBlendMode: 'screen',
            }}
          />
          <div className="flex gap-2">
            {renderDesktopCard(trustPillars[0], 0, 1.2)}
            {renderDesktopCard(trustPillars[1], 1, 1.8)}
          </div>
          <div className="flex gap-2">
            {renderDesktopCard(trustPillars[2], 2, 1.8)}
            {renderDesktopCard(trustPillars[3], 3, 1.2)}
          </div>
        </div>

        {/* Bottom dots – oförändrat */}
        <div
          className={`
            text-center mt-12
            transition-all duration-1000 delay-1200 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          <div className="inline-flex items-center space-x-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <div className="flex space-x-1.5">
              <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              <div className="w-1 h-1 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '900ms' }} />
            </div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryGrid;

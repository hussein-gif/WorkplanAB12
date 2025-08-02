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
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
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

  const renderCard = (pillar: typeof trustPillars[0], index: number, flexGrow: number) => (
    <div
      key={index}
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
          bg-white/5 backdrop-blur-xl ring-1 ring-white/20
          shadow-lg shadow-gray-900/10
          transition-all duration-500 ease-out
          min-h-[260px]
          ${activeCard === index ? 'shadow-xl scale-[1.01]' : ''}
        `}
      >
        {/* Extra subtil overlay för frosted djup */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.05)',
          }}
        />

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

        {/* Icon med enhetlig blå ton */}
        <div
          className={`
            relative w-14 h-14 rounded-xl mb-4
            bg-gradient-to-br from-[#1f3f8b] to-[#3b6de8]
            flex items-center justify-center
            shadow-lg flex-shrink-0
          `}
        >
          <pillar.icon size={24} className="text-white" />
        </div>

        {/* Innehåll */}
        <div className="relative z-10 flex-1 flex flex-col justify-between">
          <div>
            <h3
              className="text-lg tracking-tight leading-tight mb-1 font-medium"
              style={{
                fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                color: '#000',
              }}
            >
              {pillar.title}
            </h3>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                color: '#000',
              }}
            >
              {pillar.description}
            </p>
          </div>
          <div
            className="text-xs uppercase tracking-wider mt-2"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              color: '#6B7280',
            }}
          >
            {pillar.highlight}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
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

      <div className="absolute inset-0">
        {/* Basgradient i ljusa toner */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f5fa 55%, #ffffff 100%)',
          }}
        />

        {/* Subtil mönster-overlay (diagonal linjer) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 12px)',
          }}
        />

        {/* Ljuspunkt för djup */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 45% 40%, rgba(255,255,255,0.5) 0%, transparent 65%)',
            mixBlendMode: 'overlay',
            animation: 'softPulse 25s ease-in-out infinite',
          }}
        />

        {/* Mjuka flytande former för rörelse och liv */}
        <div
          className="absolute -left-32 top-10 w-[420px] h-[420px] rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(99,102,241,0.12) 0%, transparent 60%)',
            animation: 'slowFloatLarge 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute right-1/4 bottom-20 w-[360px] h-[360px] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle at 60% 40%, rgba(125,211,252,0.1) 0%, transparent 60%)',
            animation: 'slowFloatLarge 30s ease-in-out infinite',
            animationDelay: '5s',
          }}
        />
        <div
          className="absolute left-1/3 bottom-10 w-[300px] h-[300px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(219,234,254,0.08) 0%, transparent 70%)',
            animation: 'slowFloatLarge 22s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />

        {/* Original interactive orbs */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.04] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #1e40af 0%, #3b82f6 30%, transparent 70%)`,
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03] blur-3xl transition-all duration-1000 delay-500"
          style={{
            background: `radial-gradient(circle, #0f766e 0%, #14b8a6 30%, transparent 70%)`,
            right: `${mousePosition.x * 0.2}%`,
            bottom: `${mousePosition.y * 0.3}%`,
            transform: 'translate(50%, 50%)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.02] blur-3xl transition-all duration-1000 delay-1000"
          style={{
            background: `radial-gradient(circle, #7c3aed 0%, #a855f7 30%, transparent 70%)`,
            left: `${50 + mousePosition.x * 0.1}%`,
            top: `${30 + mousePosition.y * 0.1}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Grid overlays (diskret ljus) */}
        <div
          className="absolute inset-0 opacity-[0.02]"
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
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(59,130,246,0.035) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(99,102,241,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
            transform: `translate(${mousePosition.x * -0.005}px, ${mousePosition.y * -0.005}px)`,
          }}
        />

        {/* Små accenter */}
        <div
          className="absolute top-24 left-16 w-3 h-3 bg-blue-400/20 rounded-full"
          style={{
            animation: 'floatY 8s ease-in-out infinite',
            opacity: 0.45,
          }}
        />
        <div
          className="absolute bottom-28 right-24 w-2 h-2 bg-emerald-400/20 rounded-full"
          style={{
            animation: 'floatY 6s ease-in-out infinite',
            animationDelay: '1s',
            opacity: 0.35,
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400/20 rounded-full"
          style={{
            animation: 'floatY 10s ease-in-out infinite',
            animationDelay: '2s',
            opacity: 0.3,
          }}
        />

        {/* Dekorativa ramar/prickar */}
        <div className="absolute top-20 right-32 w-3 h-3 bg-blue-500/10 rounded-full animate-pulse shadow-lg" />
        <div
          className="absolute bottom-32 left-20 w-2 h-2 bg-emerald-500/15 rounded-full animate-pulse shadow-lg"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-purple-500/10 rounded-full animate-pulse shadow-lg"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-indigo-500/10 rounded-full animate-pulse shadow-lg"
          style={{ animationDelay: '3s' }}
        />

        <div
          className="absolute top-16 left-16 w-24 h-24 border border-blue-200/20 rounded-full"
          style={{ transform: `rotate(${mousePosition.x * 0.1}deg)` }}
        />
        <div
          className="absolute bottom-16 right-16 w-32 h-32 border border-emerald-200/15 rounded-full"
          style={{ transform: `rotate(${-mousePosition.y * 0.1}deg)` }}
        />
        <div
          className="absolute top-1/2 left-8 w-16 h-16 border border-purple-200/20 rounded-lg"
          style={{ transform: `rotate(${mousePosition.x * 0.05}deg)` }}
        />

        {/* Subtil noise */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.01,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1040px] mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`
              text-4xl md:text-5xl mb-4 tracking-tight
              transition-all duration-1000 delay-200 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 400,
              color: '#000',
            }}
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
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#000',
              marginTop: '0.125rem',
            }}
          >
            Djup branschkunskap och noggrant urval för att matcha rätt kompetens med ert team.
          </p>
        </div>

        {/* Layout med bubbla och kort */}
        <div className="flex flex-col gap-2 relative">
          {/* Gradient bubble över korten (ljus blå ton, mindre) */}
          <div
            className="absolute left-1/2 top-1/2 w-[520px] h-[520px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              filter: 'blur(80px)',
              background: 'radial-gradient(circle at 50% 50%, rgba(125,211,252,0.2) 0%, rgba(59,130,246,0.15) 50%, transparent 85%)',
              mixBlendMode: 'screen',
            }}
          />

          <div className="flex gap-2">
            {renderCard(trustPillars[0], 0, 1.2)}
            {renderCard(trustPillars[1], 1, 1.8)}
          </div>
          <div className="flex gap-2">
            {renderCard(trustPillars[2], 2, 1.8)}
            {renderCard(trustPillars[3], 3, 1.2)}
          </div>
        </div>

        {/* Bottom dots */}
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

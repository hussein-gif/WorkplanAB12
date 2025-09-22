import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Zap, Target, Handshake } from 'lucide-react';

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

type Pillar = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  number: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
};

type PillarCardProps = {
  pillar: Pillar;
  index: number;
  isActive: boolean;
  isVisible: boolean;
  pillarRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
};

const PillarCard = React.memo(function PillarCard({
  pillar,
  index,
  isActive,
  isVisible,
  pillarRefs,
}: PillarCardProps) {
  return (
    <div
      ref={(el) => (pillarRefs.current[index] = el)}
      className={`group relative transition-all duration-1000 transform will-change-transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${800 + index * 200}ms`, transform: 'translateZ(0)' }}
      data-active={isActive ? 'true' : 'false'}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
          index % 2 === 1 ? 'lg:grid-flow-col-dense lg:pl-16' : ''
        }`}
      >
        {/* Vänster: Text */}
        <div
          className={`lg:col-span-7 space-y-6 ${
            index % 2 === 1 ? 'lg:col-start-7' : ''
          }`}
        >
          <div className="flex items-center space-x-4">
            <span
              className="text-6xl font-normal text-gray-200 leading-none"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
            >
              {pillar.number}
            </span>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 will-change-transform group-hover:scale-110`}
              style={{
                backgroundColor: isActive ? '#1e3a8a' : '#f9f9f9',
                boxShadow: isActive ? '0 0 25px rgba(30,58,138,0.4)' : undefined,
                transform: 'translateZ(0)',
              }}
            >
              <pillar.icon
                size={20}
                className={`transition-colors duration-500 ${
                  isActive ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
          </div>

          <h3
            className="text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            {pillar.title}
          </h3>

          <p
            className="text-base sm:text-lg text-gray-600 leading-relaxed font-light max-w-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {pillar.description}
          </p>

          <div className="pt-4">
            <div
              className="text-xl sm:text-2xl font-normal text-gray-900 mb-1"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
            >
              {pillar.metric}
            </div>
            <div
              className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {pillar.metricLabel}
            </div>
          </div>
        </div>

        {/* Höger: Illustration – dold på mobil */}
        <div
          className={`lg:col-span-5 relative ${
            index % 2 === 1 ? 'lg:col-start-1' : ''
          } hidden sm:block`}
        >
          <div
            className={`aspect-square max-w-sm mx-auto relative transition-all duration-700 will-change-transform ${
              isActive ? 'scale-105' : ''
            }`}
            style={{ transform: 'translateZ(0)' }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: '1px solid rgba(107,114,128,0.08)',
                background: 'rgba(255,255,255,0.03)',
                boxShadow: isActive
                  ? '0 0 30px rgba(30,58,138,0.1)'
                  : '0 0 15px rgba(0,0,0,0.03)',
              }}
            />
            <div
              className="absolute inset-10 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.015)',
                backdropFilter: 'blur(3px)',
                ...(isActive ? { transform: 'scale(1.02)' } : {}),
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-20 h-20 rounded-full shadow-sm border border-gray-100 flex items-center justify-center transition-all duration-700 will-change-transform ${
                  isActive ? 'scale-125 shadow-lg' : ''
                }`}
                style={{ background: 'rgba(255,255,255,0.85)', transform: 'translateZ(0)' }}
              >
                <pillar.icon
                  size={32}
                  className={`transition-colors duration-500 ${
                    isActive ? 'text-[#1e3a8a]' : 'text-gray-400'
                  }`}
                />
              </div>
            </div>
            <div
              className={`absolute top-4 right-8 w-2 h-2 rounded-full transition-all duration-700 ${
                isActive ? 'scale-150 bg-[#1e3a8a]' : 'bg-gray-200'
              }`}
            />
            <div
              className={`absolute bottom-8 left-4 w-1.5 h-1.5 rounded-full transition-all duration-700 delay-100 ${
                isActive ? 'scale-150 bg-[#1e3a8a]' : 'bg-gray-300'
              }`}
            />
            <div
              className={`absolute top-1/3 left-2 w-1 h-1 rounded-full transition-all duration-700 delay-200 ${
                isActive ? 'scale-150 bg-[#1e3a8a]' : 'bg-gray-200'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Separator-linje */}
      {index < 2 && (
        <div className="mt-10 lg:mt-16 flex justify-center">
          <div
            className={`w-px h-10 lg:h-16 bg-gradient-to-b from-transparent via-gray-200 to-transparent transition-all duration-1000 ${
              isVisible ? 'scale-y-100' : 'scale-y-0'
            }`}
            style={{ transitionDelay: `${1200 + index * 200}ms` }}
          />
        </div>
      )}
    </div>
  );
});

const WhyChoose = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollIndex, setScrollIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const pillarRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafId = useRef<number | null>(null);

  const pillars = useMemo<Pillar[]>(
    () => [
      {
        icon: Zap,
        number: '01',
        title: 'Effektiv Process',
        description:
          'Vi optimerar varje steg i bemanningskedjan för att snabbt matcha rätt kandidater med era behov—utan onödiga fördröjningar.',
        metric: 'Snabb',
        metricLabel: 'Leverans',
      },
      {
        icon: Target,
        number: '02',
        title: 'Noggrant Urval',
        description:
          'Varje kandidat genomgår en skräddarsydd screening och intervjuprocess för att säkerställa rätt kompetens och kulturmatchning.',
        metric: 'Hög',
        metricLabel: 'Träffsäkerhet',
      },
      {
        icon: Handshake,
        number: '03',
        title: 'Äkta Partnerskap',
        description:
          'Vi finns vid er sida från första kontakt to avslutat uppdrag—med transparent kommunikation och regelbunden uppföljning.',
        metric: 'Personlig',
        metricLabel: 'Service',
      },
    ],
    []
  );

  // --- Återställd, beprövad progress-beräkning + rAF-throttle ---
  const updateScrollIndex = () => {
    const centerY = window.innerHeight / 2;
    let bestIdx: number | null = null;
    let smallestDist = Infinity;
    for (let i = 0; i < pillarRefs.current.length; i++) {
      const el = pillarRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const pillarCenter = rect.top + rect.height / 2;
      const dist = Math.abs(pillarCenter - centerY);
      if (dist < smallestDist) {
        smallestDist = dist;
        bestIdx = i;
      }
    }
    if (bestIdx !== null) setScrollIndex(bestIdx);
  };

  const handleScrollRaf = () => {
    rafId.current = null;
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const visibleTop = Math.max(0, -rect.top);
    const sectionHeight = rect.height;
    const windowHeight = window.innerHeight;

    // Samma formel som i din första fungerande version
    const nextProgress = clamp(
      visibleTop / (Math.max(1, sectionHeight - windowHeight + 200)),
      0,
      1
    );

    setScrollProgress(nextProgress);
    updateScrollIndex();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2, rootMargin: '100px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const onScroll = () => {
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(handleScrollRaf);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Viktigt: kör en första mätning direkt
    onScroll();

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const effectiveActive = scrollIndex;

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-28 overflow-hidden"
      // Viktigt: INGEN content-visibility här (den kunde stoppa uppdateringar)
    >
      {/* CSS-animationer */}
      <style>{`
        @keyframes blob {
          0% { transform: scale(1) translate(0,0); }
          33% { transform: scale(1.05) translate(8px, -5px); }
          66% { transform: scale(0.95) translate(-8px, 5px); }
          100% { transform: scale(1) translate(0,0); }
        }
        .animate-blob { animation: blob 20s infinite ease-in-out; will-change: transform; }
        @media (prefers-reduced-motion: reduce) {
          .animate-blob { animation: none; }
        }
      `}</style>

      {/* Bakgrund */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #fffdf7 80%)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 40%, rgba(0,0,0,0.06) 0%, transparent 80%)',
            mixBlendMode: 'multiply',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
        <div
          className="absolute -top-10 left-1/3 w-[450px] h-[450px] rounded-full blur-3xl opacity-10 animate-blob"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, #7C3AED 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-12 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 animate-blob"
          style={{
            background:
              'radial-gradient(circle at 60% 50%, #10B981 0%, transparent 70%)',
            animationDelay: '3s',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Progress-line (desktop) */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 z-0 hidden lg:flex flex-col items-center transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ top: '12rem', bottom: '18rem', willChange: 'transform' }}
        >
          <div className="relative w-px flex-1">
            <div
              className="absolute left-1/2 -translate-x-1/2 w-px rounded"
              style={{
                top: 0,
                bottom: 0,
                background:
                  'linear-gradient(to bottom, transparent 0%, rgba(107,114,128,0.75) 25%, rgba(107,114,128,0.75) 75%, transparent 100%)',
                filter: 'blur(0.6px)',
              }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
              style={{ top: 0, background: 'rgba(107,114,128,0.4)' }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
              style={{ bottom: 0, background: 'rgba(107,114,128,0.4)' }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-lg transition-all duration-200 ease-out will-change-transform"
              style={{
                backgroundColor: '#1e3a8a',
                top: `${scrollProgress * 100}%`,
                transform: 'translate(-50%, -50%) translateZ(0)',
              }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
              <div className="absolute -inset-1 border-2 border-blue-900/30 rounded-full" />
            </div>
          </div>
        </div>

        {/* Rubrik – professionell storlek + jämn boldness */}
        <div className="text-center mb-10 sm:mb-20">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 mb-3 tracking-tight leading-[1.15] sm:leading-[1.1] transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Vår Metod För Framgång
          </h2>
          <div
            className={`w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-3 transition-all duration-1000 delay-200 transform ${
              isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
          />
          <p
            className={`text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-light -mt-1 transition-all duration-1000 delay-400 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Tre pelare som garanterar att ni får rätt kompetens—snabbt, precist
            och med full transparens.
          </p>
        </div>

        {/* Kort */}
        <div className="space-y-10 lg:space-y-16">
          {pillars.map((pillar, index) => (
            <PillarCard
              key={pillar.number}
              pillar={pillar}
              index={index}
              isActive={effectiveActive === index}
              isVisible={isVisible}
              pillarRefs={pillarRefs}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;

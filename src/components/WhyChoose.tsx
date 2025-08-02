import React, { useState, useEffect, useRef } from 'react';
import { Zap, Target, Handshake } from 'lucide-react';

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

const WhyChoose = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [scrollIndex, setScrollIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pillarRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Determine which pillar is closest to viewport vertical center
  const updateScrollIndex = () => {
    if (!pillarRefs.current.length) return;
    const centerY = window.innerHeight / 2;
    let bestIdx: number | null = null;
    let smallestDist = Infinity;
    pillarRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pillarCenter = rect.top + rect.height / 2;
      const dist = Math.abs(pillarCenter - centerY);
      if (dist < smallestDist) {
        smallestDist = dist;
        bestIdx = idx;
      }
    });
    setScrollIndex(bestIdx);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const visibleTop = Math.max(0, -rect.top);
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      const progress = clamp(
        visibleTop / (sectionHeight - windowHeight + 200),
        0,
        1
      );
      setScrollProgress(progress);
      updateScrollIndex();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollIndex);
    handleScroll();
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollIndex);
    };
  }, []);

  const effectiveActive = hoverIndex !== null ? hoverIndex : scrollIndex;

  const pillars = [
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
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-white overflow-hidden"
    >
      {/* Bakgrundsgrid och dekor */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(#000 1px, transparent 1px),
              linear-gradient(90deg, #000 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute top-20 right-20 w-2 h-2 bg-gray-200 rounded-full opacity-40" />
        <div className="absolute top-40 left-16 w-1 h-1 bg-gray-300 rounded-full opacity-60" />
        <div className="absolute bottom-32 right-32 w-1.5 h-1.5 bg-gray-200 rounded-full opacity-50" />
        <div className="absolute bottom-20 left-20 w-0.5 h-0.5 bg-gray-400 rounded-full opacity-30" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Progress-line + boll */}
        <div
          className={`
            absolute left-1/2 transform -translate-x-1/2 z-0 hidden lg:flex flex-col items-center
            transition-all duration-1000 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{ top: '14rem', bottom: '20rem' }}
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
              style={{
                top: 0,
                background: 'rgba(107,114,128,0.4)',
              }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
              style={{
                bottom: 0,
                background: 'rgba(107,114,128,0.4)',
              }}
            />

            <div
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-lg transition-all duration-500 ease-out"
              style={{
                backgroundColor: '#1e3a8a',
                top: `${scrollProgress * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
              <div className="absolute -inset-1 border-2 border-blue-900/30 rounded-full" />
            </div>
          </div>
        </div>

        {/* Rubrik */}
        <div className="text-center mb-24">
          <h2
            className={`
              text-5xl md:text-6xl font-normal text-gray-900 mb-4 tracking-tight leading-[1.1]
              transition-all duration-1000 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Vår Metod För <span className="font-medium">Framgång</span>
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
              text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-light -mt-2
              transition-all duration-1000 delay-400 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Tre pelare som garanterar att ni får rätt kompetens—snabbt, precist
            och med full transparens.
          </p>
        </div>

        {/* Kort */}
        <div className="space-y-16">
          {pillars.map((pillar, index) => {
            const isActive = effectiveActive === index;
            return (
              <div
                key={index}
                ref={(el) => (pillarRefs.current[index] = el)}
                className={`
                  group relative
                  transition-all duration-1000 transform
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                `}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div
                  className={`
                    grid grid-cols-1 lg:grid-cols-12 gap-8 items-center
                    ${index % 2 === 1 ? 'lg:grid-flow-col-dense lg:pl-16' : ''}
                  `}
                >
                  {/* Vänster: Text */}
                  <div
                    className={`
                      lg:col-span-7 space-y-6
                      ${index % 2 === 1 ? 'lg:col-start-7' : ''}
                    `}
                  >
                    {/* Nummer + ikon */}
                    <div className="flex items-center space-x-4">
                      <span
                        className="text-6xl font-normal text-gray-200 leading-none"
                        style={{
                          fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                        }}
                      >
                        {pillar.number}
                      </span>
                      <div
                        className={`
                          w-12 h-12 rounded-full flex items-center justify-center
                          transition-all duration-500
                          ${isActive ? 'scale-110' : ''}
                        `}
                        style={{
                          backgroundColor: isActive
                            ? '#1e3a8a'
                            : '#f9f9f9',
                          boxShadow: isActive
                            ? '0 0 25px rgba(30,58,138,0.4)'
                            : undefined,
                        }}
                      >
                        <pillar.icon
                          size={20}
                          className={`
                            transition-colors duration-500
                            ${isActive ? 'text-white' : 'text-gray-600'}
                          `}
                        />
                      </div>
                    </div>

                    {/* Titel */}
                    <h3
                      className="text-3xl font-medium text-gray-900 tracking-tight"
                      style={{
                        fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                      }}
                    >
                      {pillar.title}
                    </h3>

                    {/* Beskrivning */}
                    <p
                      className="text-lg text-gray-600 leading-relaxed font-light max-w-lg"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {pillar.description}
                    </p>

                    {/* Metric */}
                    <div className="pt-4">
                      <div
                        className="text-2xl font-normal text-gray-900 mb-1"
                        style={{
                          fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                        }}
                      >
                        {pillar.metric}
                      </div>
                      <div
                        className="text-sm text-gray-400 uppercase tracking-wider"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {pillar.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Höger: Illustration */}
                  <div
                    className={`
                      lg:col-span-5 relative
                      ${index % 2 === 1 ? 'lg:col-start-1' : ''}
                    `}
                  >
                    <div
                      className={`
                        aspect-square max-w-sm mx-auto relative
                        transition-all duration-700
                        ${isActive ? 'scale-105' : ''}
                      `}
                    >
                      {/* Yttre cirkel */}
                      <div
                        className={`
                          absolute inset-0 rounded-full border border-gray-100
                          transition-all duration-700
                          ${isActive ? 'border-gray-300 scale-110' : ''}
                        `}
                      />
                      {/* Inre cirkel */}
                      <div
                        className={`
                          absolute inset-8 rounded-full bg-gray-50
                          transition-all duration-700
                          ${isActive ? 'bg-gray-100 scale-95' : ''}
                        `}
                      />

                      {/* Centralt ikon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`
                            w-20 h-20 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center
                            transition-all duration-700
                            ${isActive ? 'scale-125 shadow-lg' : ''}
                          `}
                        >
                          <pillar.icon
                            size={32}
                            className={`
                              transition-colors duration-500
                              ${isActive ? 'text-[#1e3a8a]' : 'text-gray-400'}
                            `}
                          />
                        </div>
                      </div>

                      {/* Små prickar */}
                      <div
                        className={`
                          absolute top-4 right-8 w-2 h-2 rounded-full
                          transition-all duration-700
                          ${isActive ? 'scale-150 bg-[#1e3a8a]' : 'bg-gray-200'}
                        `}
                      />
                      <div
                        className={`
                          absolute bottom-8 left-4 w-1.5 h-1.5 rounded-full
                          transition-all duration-700 delay-100
                          ${isActive ? 'scale-150 bg-[#1e3a8a]' : 'bg-gray-300'}
                        `}
                      />
                      <div
                        className={`
                          absolute top-1/3 left-2 w-1 h-1 rounded-full
                          transition-all duration-700 delay-200
                          ${isActive ? 'scale-150 bg-[#1e3a8a]' : 'bg-gray-200'}
                        `}
                      />
                    </div>
                  </div>
                </div>

                {/* Separator-linje */}
                {index < pillars.length - 1 && (
                  <div className="mt-16 flex justify-center">
                    <div
                      className={`
                        w-px h-16 bg-gradient-to-b from-transparent via-gray-200 to-transparent
                        transition-all duration-1000
                        ${isVisible ? 'scale-y-100' : 'scale-y-0'}
                      `}
                      style={{ transitionDelay: `${1200 + index * 200}ms` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;

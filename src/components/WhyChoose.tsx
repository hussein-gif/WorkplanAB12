import React, { useState, useEffect, useRef } from 'react';
import { Zap, Target, Handshake } from 'lucide-react';

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const WhyChoose = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [scrollIndex, setScrollIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const pillarRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafId = useRef<number | null>(null);

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
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const onScroll = () => {
      if (rafId.current != null) return;
      rafId.current = requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const visibleTop = Math.max(0, -rect.top);
          const sectionHeight = rect.height;
          const windowHeight = window.innerHeight;
          const progress = clamp(
            visibleTop / Math.max(1, sectionHeight - windowHeight),
            0,
            1
          );
          setScrollProgress(progress);
        }
        updateScrollIndex();
        rafId.current = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScrollIndex);
    onScroll();

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScrollIndex);
      if (rafId.current) cancelAnimationFrame(rafId.current);
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
    <section ref={sectionRef} className="relative py-20 sm:py-28 bg-white overflow-hidden">
      {/* Vertikal progress-linje + blå boll (desktop) */}
      <div
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 z-0 hidden lg:flex flex-col items-center transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ top: '12rem', bottom: '18rem' }}
        aria-hidden="true"
      >
        <div className="relative w-px flex-1">
          <div
            className="absolute left-1/2 -translate-x-1/2 w-px"
            style={{
              top: 0,
              bottom: 0,
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(107,114,128,0.55) 20%, rgba(107,114,128,0.55) 80%, transparent 100%)',
            }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
            style={{ top: 0, background: 'rgba(107,114,128,0.35)' }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
            style={{ bottom: 0, background: 'rgba(107,114,128,0.35)' }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-md transition-transform duration-150"
            style={{
              backgroundColor: '#1e3a8a',
              top: `${scrollProgress * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="absolute -inset-1 rounded-full border-2 border-[#1e3a8a]/30" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Rubrik */}
        <div className="text-center mb-12 sm:mb-20">
          <h2
            className={`text-4xl sm:text-5xl font-bold tracking-tight text-black transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Vår Metod För Framgång
          </h2>
          {/* Elegant linje under rubriken */}
          <div
            className={`w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          />
          <p
            className={`text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mt-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Tre pelare som garanterar att ni får rätt kompetens—snabbt, precist
            och med full transparens.
          </p>
        </div>

        {/* Kort – alternating layout som första versionen, men lättare */}
        <div className="space-y-10 lg:space-y-16">
          {pillars.map((pillar, index) => {
            const isActive = effectiveActive === index;
            return (
              <div
                key={index}
                ref={(el) => (pillarRefs.current[index] = el)}
                className={`group relative transition-all duration-600 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${200 + index * 120}ms` }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
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
                        className="text-5xl sm:text-6xl font-bold text-gray-200 leading-none"
                        style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                      >
                        {pillar.number}
                      </span>
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          isActive ? 'bg-[#1e3a8a]' : 'bg-[#f1f4ff]'
                        }`}
                      >
                        <pillar.icon
                          size={20}
                          className={`${isActive ? 'text-white' : 'text-[#1e3a8a]'} transition-colors duration-300`}
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
                      className="text-lg text-gray-600 leading-relaxed font-light max-w-lg"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {pillar.description}
                    </p>

                    <div className="pt-2">
                      <div
                        className="text-xl sm:text-2xl font-medium text-[#1e3a8a] mb-0.5"
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

                  {/* Höger: Illustration – lätt, utan tunga filter */}
                  <div
                    className={`lg:col-span-5 relative ${
                      index % 2 === 1 ? 'lg:col-start-1' : ''
                    } hidden sm:block`}
                  >
                    <div
                      className={`aspect-square max-w-sm mx-auto relative transition-transform duration-500 ${
                        isActive ? 'scale-[1.03]' : ''
                      }`}
                    >
                      <div
                        className="absolute inset-0 rounded-2xl border border-gray-100"
                        style={{ background: 'white' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`w-20 h-20 rounded-full border border-gray-100 shadow-sm flex items-center justify-center transition-all duration-500 ${
                            isActive ? 'shadow-md' : ''
                          }`}
                          style={{ background: 'rgba(247,249,255,0.9)' }}
                        >
                          <pillar.icon
                            size={30}
                            className={`${isActive ? 'text-[#1e3a8a]' : 'text-gray-400'} transition-colors duration-300`}
                          />
                        </div>
                      </div>
                      {/* Små accentpunkter – minimala och billiga */}
                      <div
                        className={`absolute top-4 right-6 w-2 h-2 rounded-full transition-colors duration-300 ${
                          isActive ? 'bg-[#1e3a8a]' : 'bg-gray-200'
                        }`}
                      />
                      <div
                        className={`absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                          isActive ? 'bg-[#1e3a8a]' : 'bg-gray-300'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Separator-linje */}
                {index < pillars.length - 1 && (
                  <div className="mt-10 lg:mt-14 flex justify-center">
                    <div className="w-px h-10 lg:h-16 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
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

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';

// Lazy-load ikoner för snabbare laddning
const Zap = lazy(() => import('lucide-react').then(mod => ({ default: mod.Zap })));
const Target = lazy(() => import('lucide-react').then(mod => ({ default: mod.Target })));
const Handshake = lazy(() => import('lucide-react').then(mod => ({ default: mod.Handshake })));

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const WhyChoose = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Visibility + scroll-progress (för den blå bollen)
  useEffect(() => {
    const onIntersect: IntersectionObserverCallback = ([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    };
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);

    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const visibleTop = Math.max(0, -rect.top);
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // progress 0 -> 1 genom sektionen
      const progress = clamp(
        visibleTop / Math.max(1, sectionHeight - windowHeight),
        0,
        1
      );
      setScrollProgress(progress);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

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
    <section ref={sectionRef} className="relative py-20 sm:py-28 bg-white">
      {/* Vertikal progress-linje + blå boll (endast desktop) */}
      <div
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 z-0 hidden lg:flex flex-col items-center transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ top: '12rem', bottom: '18rem' }}
        aria-hidden="true"
      >
        <div className="relative w-px flex-1">
          {/* själva linjen med diskret gradient */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-px rounded"
            style={{
              top: 0,
              bottom: 0,
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(107,114,128,0.6) 20%, rgba(107,114,128,0.6) 80%, transparent 100%)',
              filter: 'blur(0.4px)',
            }}
          />
          {/* ändpunkter */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
            style={{ top: 0, background: 'rgba(107,114,128,0.35)' }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
            style={{ bottom: 0, background: 'rgba(107,114,128,0.35)' }}
          />
          {/* blå boll som följer scroll */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-lg transition-transform duration-200 will-change-transform"
            style={{
              backgroundColor: '#1e3a8a',
              top: `${scrollProgress * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="absolute inset-0 bg-white/25 rounded-full" />
            <div className="absolute -inset-1 border-2 border-[#1e3a8a]/30 rounded-full" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Rubrik */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold tracking-tight text-black transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Vår Metod För Framgång
          </h2>

          {/* Elegant gradient-streck som innan */}
          <div
            className={`w-16 h-px mx-auto mb-4 bg-gradient-to-r from-transparent via-gray-300 to-transparent transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          />

          <p
            className={`mt-2 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Tre pelare som garanterar att ni får rätt kompetens—snabbt, precist
            och med full transparens.
          </p>
        </div>

        {/* Kort */}
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-500 p-8 flex flex-col items-start text-left ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${400 + index * 200}ms` }}
            >
              {/* Nummer + ikon */}
              <div className="flex items-center mb-6">
                <span
                  className="text-4xl font-bold text-gray-200 mr-4"
                  style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                >
                  {pillar.number}
                </span>
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#f0f4ff] group-hover:bg-[#1e3a8a] transition-colors duration-500">
                  <Suspense fallback={<div className="w-5 h-5 bg-gray-300 rounded-full" />}>
                    <pillar.icon
                      size={22}
                      className="text-[#1e3a8a] group-hover:text-white transition-colors duration-500"
                    />
                  </Suspense>
                </div>
              </div>

              {/* Titel */}
              <h3
                className="text-2xl font-semibold text-gray-900 mb-3"
                style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
              >
                {pillar.title}
              </h3>

              {/* Beskrivning */}
              <p
                className="text-gray-600 mb-6 leading-relaxed font-light"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {pillar.description}
              </p>

              {/* Metric */}
              <div className="mt-auto pt-4">
                <div
                  className="text-xl font-medium text-[#1e3a8a]"
                  style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;

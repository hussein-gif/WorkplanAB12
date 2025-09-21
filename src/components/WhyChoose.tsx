import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';

// Lazy-load ikoner för snabbare laddning
const Zap = lazy(() => import('lucide-react').then(mod => ({ default: mod.Zap })));
const Target = lazy(() => import('lucide-react').then(mod => ({ default: mod.Target })));
const Handshake = lazy(() => import('lucide-react').then(mod => ({ default: mod.Handshake })));

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const WhyChoose = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
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
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Rubrik */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Vår Metod För <span className="text-[#1e3a8a]">Framgång</span>
          </h2>
          <div
            className={`w-20 h-1 mx-auto bg-[#1e3a8a] rounded-full mt-4 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          />
          <p
            className={`mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
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

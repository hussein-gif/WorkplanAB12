import React, { useState, useEffect, useRef } from 'react';
import { Zap, Target, Handshake } from 'lucide-react';

const WhyChoose = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
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
    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const visibleTop = Math.max(0, -rect.top);
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, visibleTop / (sectionHeight - windowHeight + 200))
      );
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('scroll', handleScroll);
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
        'Vi finns vid er sida från första kontakt till avslutat uppdrag—med transparent kommunikation och regelbunden uppföljning.',
      metric: 'Personlig',
      metricLabel: 'Service',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-white overflow-hidden"
    >
      {/* Bakgrunds­grid och former */}
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
        <div className="absolute left-1/2 top-48 bottom-32 transform -translate-x-1/2 z-0 hidden lg:block">
          <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-200 to-transparent opacity-30" />
          <div
            className="absolute w-4 h-4 rounded-full shadow-lg transform -translate-x-1/2 transition-all duration-300 ease-out"
            style={{
              backgroundColor: '#1e3a8a',
              top: `${scrollProgress * 100}%`,
            }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
            <div className="absolute -inset-1 border-2 border-blue-900/30 rounded-full" />
          </div>
        </div>

        {/* Rubrik */}
        <div className="text-center mb-24">
          <h2
            className={`
              text-4xl md:text-6xl font-normal text-gray-900 mb-6 tracking-tight leading-[1.1]
              transition-all duration-1000 transform
              ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }
            `}
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Vår Metod för Framgång
          </h2>
          <div
            className={`
              w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8
              transition-all duration-1000 delay-200 transform
              ${
                isVisible
                  ? 'scale-x-100 opacity-100'
                  : 'scale-x-0 opacity-0'
              }
            `}
          />
          <p
            className={`
              text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-light
              transition-all duration-1000 delay-400 transform
              ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }
            `}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Tre pelare som garanterar att ni får rätt kompetens—snabbt, precist
            och med full transparens.
          </p>
        </div>

        {/* Kort */}
        <div className="space-y-16">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={`
                group relative
                transition-all duration-1000 transform
                ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }
              `}
              style={{ transitionDelay: `${800 + index * 200}ms` }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
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
                        ${
                          activeCard === index
                            ? 'bg-[#1e3a8a] scale-110'
                            : 'bg-gray-50 group-hover:bg-gray-100'
                        }
                      `}
                    >
                      <pillar.icon
                        size={20}
                        className={`
                          transition-colors duration-500
                          ${
                            activeCard === index
                              ? 'text-white'
                              : 'text-gray-600'
                          }
                        `}
                      />
                    </div>
                  </div>

                  {/* Titel */}
                  <h3
                    className="text-3xl font-normal text-gray-900 tracking-tight"
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
                      ${activeCard === index ? 'scale-105' : ''}
                    `}
                  >
                    {/* Yttre cirkel */}
                    <div
                      className={`
                        absolute inset-0 rounded-full border border-gray-100
                        transition-all duration-700
                        ${activeCard === index ? 'border-gray-300 scale-110' : ''}
                      `}
                    />
                    {/* Inre cirkel */}
                    <div
                      className={`
                        absolute inset-8 rounded-full bg-gray-50
                        transition-all duration-700
                        ${activeCard === index ? 'bg-gray-100 scale-95' : ''}
                      `}
                    />

                    {/* Centralt ikon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`
                          w-20 h-20 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center
                          transition-all duration-700
                          ${activeCard === index ? 'scale-125 shadow-lg' : ''}
                        `}
                      >
                        <pillar.icon
                          size={32}
                          className={`
                            transition-colors duration-500
                            ${
                              activeCard === index
                                ? 'text-[#1e3a8a]'
                                : 'text-gray-400'
                            }
                          `}
                        />
                      </div>
                    </div>

                    {/* Små prickar */}
                    <div
                      className={`
                        absolute top-4 right-8 w-2 h-2 rounded-full
                        transition-all duration-700
                        ${activeCard === index ? 'scale-150 bg-[#1e3a8a]' : 'bg-gray-200'}
                      `}
                    />
                    <div
                      className={`
                        absolute bottom-8 left-4 w-1.5 h-1.5 rounded-full
                        transition-all duration-700 delay-100
                        ${
                          activeCard === index
                            ? 'scale-150 bg-[#1e3a8a]'
                            : 'bg-gray-300'
                        }
                      `}
                    />
                    <div
                      className={`
                        absolute top-1/3 left-2 w-1 h-1 rounded-full
                        transition-all duration-700 delay-200
                        ${
                          activeCard === index
                            ? 'scale-150 bg-[#1e3a8a]'
                            : 'bg-gray-200'
                        }
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
                      ${
                        isVisible
                          ? 'scale-y-100'
                          : 'scale-y-0'
                      }
                    `}
                    style={{ transitionDelay: `${1200 + index * 200}ms` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;

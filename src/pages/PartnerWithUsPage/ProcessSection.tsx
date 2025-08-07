import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProcessSectionProps {
  isVisible: boolean;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ isVisible }) => {
  const steps = [
    {
      title: 'Behovsanalys',
      description:
        'Vi kartlägger mål, tidsram och kompetenskrav i ett kort uppstartssamtal.',
    },
    {
      title: 'Lösningsförslag',
      description:
        'Ni får ett transparent förslag på bemanningsupplägg, tidsplan och pris.',
    },
    {
      title: 'Sökning & urval',
      description:
        'Aktiv search, annonsering vid behov och strukturerade intervjuer/screening.',
    },
    {
      title: 'Presentation',
      description:
        'En shortlist med matchade kandidater, referenser och våra rekommendationer.',
    },
    {
      title: 'Start & uppföljning',
      description:
        'Smidig onboarding och regelbunden uppföljning för att säkerställa kvalitet.',
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 200; // kortare, mjukare scroll
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative py-24 px-8 overflow-hidden bg-white"
    >
      {/* SVG-bakgrund */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgBlob" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.15)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <pattern
              id="zigzag"
              patternUnits="userSpaceOnUse"
              width="10"
              height="10"
              patternTransform="rotate(45)"
            >
              <path
                d="M0 5 l5 -5 l5 5"
                stroke="rgba(16,185,129,0.05)"
                strokeWidth="2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#zigzag)" />
          <circle cx="25%" cy="20%" r="300" fill="url(#bgBlob)" />
          <circle cx="80%" cy="75%" r="350" fill="url(#bgBlob)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Titel */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-light text-gray-800 mb-6"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            <span style={{ fontWeight: 400 }}>Vår </span>
            <span style={{ fontWeight: 500 }}>Process</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            En tydlig 5-stegsprocess som ger er rätt kompetens – snabbt, tryggt
            och utan överraskningar.
          </p>
        </div>

        {/* Scroll + Pilar i en relativ wrapper */}
        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={updateScrollButtons}
            className="overflow-x-auto"
          >
            <div className="inline-block min-w-max flex items-start">
              {steps.map((step, idx) => {
                const isTightTitle = idx === 2 || idx === 4; // steg 3 & 5
                const isTightDesc = idx === 0 || idx === 3;  // steg 1 & 4

                return (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center w-64 flex-shrink-0 px-2">
                      <span
                        className="block text-9xl font-light"
                        style={{
                          fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                        }}
                      >
                        {`0${idx + 1}`}
                      </span>
                      <h3
                        className={`text-3xl md:text-4xl font-medium ${
                          isTightTitle ? 'mt-0' : 'mt-4'
                        }`}
                        style={{
                          fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          isTightDesc ? 'mt-0' : 'mt-2'
                        } text-center`}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 400,
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="mx-12 self-center h-px bg-gray-300/50 flex-grow" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

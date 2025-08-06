import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProcessSectionProps {
  isVisible: boolean;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ isVisible }) => {
  const steps = [
    { title: 'Behovsanalys', description: 'Vi kartlägger mål, tidsram och kompetenskrav i ett kort uppstartssamtal.' },
    { title: 'Lösningsförslag', description: 'Ni får ett transparent förslag på bemanningsupplägg, tidsplan och pris.' },
    { title: 'Sökning & urval', description: 'Aktiv search, annonsering vid behov och strukturerade intervjuer/screening.' },
    { title: 'Presentation', description: 'En shortlist med matchade kandidater, referenser och våra rekommendationer.' },
    { title: 'Start & uppföljning', description: 'Smidig onboarding och regelbunden uppföljning för att säkerställa kvalitet.' },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" className="relative py-24 px-8 overflow-hidden bg-white">
      {/* Dynamisk SVG-bakgrund – behålls precis som innan */}
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
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-light text-gray-800 mb-6"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            <span style={{ fontWeight: 400 }}>Vår </span>
            <span style={{ fontWeight: 500 }}>Process</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            En tydlig 5-stegsprocess som ger er rätt kompetens – snabbt, tryggt och utan överraskningar.
          </p>
        </div>

        {/* Pilar */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        {/* Scrollbar-hide kräver ev. plugin, annars visa standard-scrollbar */}
        <div ref={scrollRef} className="overflow-x-auto">
          <div className="inline-block min-w-max">
            {/* Sifferrad med linjer emellan */}
            <div className="flex items-center">
              {steps.map((_, idx) => (
                <React.Fragment key={idx}>
                  <div className="w-40 flex-shrink-0 text-center">
                    <span
                      className="block text-6xl font-light"
                      style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                    >
                      {`0${idx + 1}`}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="flex-grow border-t border-gray-300/50"></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Rubriker */}
            <div className="mt-6 flex">
              {steps.map((step, idx) => (
                <div key={idx} className="w-40 flex-shrink-0 text-center px-2">
                  <h3
                    className="text-xl font-medium"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    {step.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Beskrivningar */}
            <div className="mt-2 flex">
              {steps.map((step, idx) => (
                <div key={idx} className="w-40 flex-shrink-0 text-center px-2">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProcessSectionProps {
  isVisible: boolean;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ isVisible }) => {
  const steps = useMemo(
    () => [
      { title: 'Analys', description: 'Vi kartlägger mål, tidsram och kompetenskrav i ett kort uppstartssamtal.' },
      { title: 'Strategi', description: 'Ni får ett transparent förslag på bemanningsupplägg, tidsplan och pris.' },
      { title: 'Urval', description: 'Aktiv search, annonsering vid behov och strukturerade intervjuer/screening.' },
      { title: 'Upplägg', description: 'En shortlist med matchade kandidater, referenser och våra rekommendationer.' },
      { title: 'Uppstart', description: 'Smidig onboarding och regelbunden uppföljning för att säkerställa kvalitet.' },
    ],
    []
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // rAF-throttle scroll measurement
  const rafId = useRef<number | null>(null);
  const last = useRef({ left: false, right: false });

  const measureScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const left = scrollLeft > 0;
    const right = scrollLeft + clientWidth < scrollWidth - 1;

    if (left !== last.current.left) {
      last.current.left = left;
      setCanScrollLeft(left);
    }
    if (right !== last.current.right) {
      last.current.right = right;
      setCanScrollRight(right);
    }
  };

  const scheduleMeasure = () => {
    if (rafId.current == null) {
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        measureScroll();
      });
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 200;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    scheduleMeasure();
    const onResize = () => scheduleMeasure();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const maskImage = useMemo(() => {
    if (canScrollLeft && canScrollRight) {
      return 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)';
    }
    if (canScrollLeft) {
      return 'linear-gradient(to right, transparent, black 15%, black 100%)';
    }
    if (canScrollRight) {
      return 'linear-gradient(to right, black 0%, black 85%, transparent)';
    }
    return 'none';
  }, [canScrollLeft, canScrollRight]);

  return (
    <section
      className="relative py-12 px-8 overflow-hidden bg-white"
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '1px 900px',
      }}
    >
      <div id="how-it-works" className="absolute -top-20" />

      {/* SVG-background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgBlob" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.15)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <pattern id="zigzag" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
              <path d="M0 5 l5 -5 l5 5" stroke="rgba(16,185,129,0.05)" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#zigzag)" />
          <circle cx="25%" cy="20%" r="300" fill="url(#bgBlob)" />
          <circle cx="80%" cy="75%" r="300" fill="url(#bgBlob)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h2
            className="text-4xl md:text-5xl font-medium text-gray-800 mb-4"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Vår Process
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto font-light"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            En tydlig 5-stegsprocess som ger er rätt kompetens – snabbt, tryggt och utan överraskningar.
          </p>
        </div>

        {/* Scroll + Arrows */}
        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          )}

          {/* Steps container */}
          <div
            ref={scrollRef}
            onScroll={scheduleMeasure}
            className="overflow-x-auto"
            style={{
              WebkitMaskImage: maskImage,
              maskImage: maskImage,
              willChange: 'scroll-position',
              transform: 'translateZ(0)',
            }}
          >
            <div className="inline-flex items-start gap-6 px-4">
              {steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  {/* Number + Text */}
                  <div className="flex flex-col items-start w-64 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      {/* Vänster pil */}
                      <ChevronLeft className="w-5 h-5 text-gray-400" />
                      <span
                        className="text-9xl font-light"
                        style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                      >
                        {`0${idx + 1}`}
                      </span>
                      {/* Höger pil */}
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>

                    <h3
                      className="text-3xl md:text-4xl font-medium text-left mt-2"
                      style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed text-left mt-1"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Separator */}
                  {idx < steps.length - 1 && (
                    <div className="self-center flex-shrink-0 flex-1 h-1 bg-gray-300/50 transform -translate-y-4" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

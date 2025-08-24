import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WhyChooseUsSectionProps {
  isVisible: boolean;
}

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ isVisible }) => {
  const features = [
    {
      title: 'Djup branschkännedom',
      description:
        'Vårt team förstår er vardag inom lager och logistik och kan snabbt sätta oss in i era behov.',
      label: 'SPECIALISTER PÅ ERT OMRÅDE',
      backgroundImage: 'https://i.ibb.co/hJykWM0G/IMAGE-2025-08-07-19-36-02.jpg',
    },
    {
      title: 'Effektiv process',
      description:
        'Vi kickar igång direkt och håller er uppdaterade genom hela kedjan – utan onödiga väntetider.',
      label: 'SNABB ÅTERKOPPLING',
      backgroundImage: 'https://i.ibb.co/wrwTrGJ9/IMAGE-2025-08-07-19-42-10.jpg',
    },
    {
      title: 'Träffsäker matchning',
      description:
        'Strukturerad screening, referenser och kulturpassning säkerställer rätt person på rätt plats för just ert behov.',
      label: 'NOGGRANT URVAL',
      backgroundImage: 'https://i.ibb.co/Qjvp4Fvq/IMAGE-2025-08-07-19-41-36.jpg',
    },
    {
      title: 'En kontakt – hela vägen',
      description:
        'Du får en dedikerad konsult som ansvarar för dialog, rapportering och uppföljning.',
      label: 'PERSONLIG SERVICE',
      backgroundImage: 'https://i.ibb.co/KcgmytRM/IMAGE-2025-08-07-19-40-50.jpg',
    },
  ];

  // --- Slider helpers (mobil) ---
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = () => {
    const el = sliderRef.current;
    if (!el) return;
    const epsilon = 4; // litet spelrum
    setCanLeft(el.scrollLeft > epsilon);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - epsilon);
  };

  useEffect(() => {
    updateArrows();
    const el = sliderRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = sliderRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9); // ungefär ett kort
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  // --- Återanvändbart kort ---
  const Card = ({
    feature,
    index,
    strongOverlay = false,
    className = '',
    heightClass = 'h-[350px]',
  }: {
    feature: typeof features[number];
    index: number;
    strongOverlay?: boolean;
    className?: string;
    heightClass?: string;
  }) => (
    <div
      role="article"
      aria-label={feature.title}
      className={`
        relative w-full ${heightClass} rounded-xl overflow-hidden shadow-lg bg-white
        motion-safe:transition-all motion-reduce:transition-none duration-200 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        ${className}
      `}
      style={{
        transitionDelay: `${600 + index * 150}ms`,
        contentVisibility: 'auto',
        containIntrinsicSize: '300px 200px',
      } as React.CSSProperties}
    >
      <img
        src={feature.backgroundImage}
        alt={feature.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />

      <div className="absolute top-4 right-4 z-10">
        <div
          className="px-3 py-1 rounded-full bg-black/35 md:bg-black/40 text-white uppercase text-[10px] tracking-wide font-medium backdrop-blur-sm ring-1 ring-white/20"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {feature.label}
        </div>
      </div>

      <div
        className={`
          absolute inset-x-0 bottom-0 z-10 p-5
          ${strongOverlay ? 'bg-gradient-to-t from-black/80 to-transparent' : 'bg-gradient-to-t from-black/60 to-transparent'}
        `}
      >
        <h3
          className="text-white mb-2 leading-tight font-medium text-[18px] md:text-[20px]"
          style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
        >
          {feature.title}
        </h3>
        <p
          className="text-gray-300 md:text-gray-400 leading-relaxed font-light text-[13px] md:text-[14px] line-clamp-3"
          style={{ fontFamily: 'Inter, sans-serif', margin: 0 }}
        >
          {feature.description}
        </p>
      </div>
    </div>
  );

  return (
    <section className="py-16 px-6 md:py-24 md:px-8 relative overflow-hidden">
      {/* Ljus bakgrund + mönster */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)' }}
      />
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hexLight" width="60" height="52" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 15 L60 45 L30 60 L0 45 L0 15 Z" stroke="rgba(0,0,0,0.03)" strokeWidth="1" fill="none" />
          </pattern>
          <filter id="blurSmall"><feGaussianBlur stdDeviation="80" /></filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexLight)" />
        <circle cx="20%" cy="15%" r="200" fill="rgba(59,130,246,0.1)" filter="url(#blurSmall)" />
        <circle cx="80%" cy="85%" r="180" fill="rgba(16,185,129,0.1)" filter="url(#blurSmall)" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Rubrik */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800 mb-4 md:mb-6"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Workplan - Företagens Val
          </h2>
          <p
            className="max-w-2xl mx-auto text-gray-600 text-[15px] md:text-base leading-snug md:leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            Fyra löften som gör bemanning enkel, träffsäker och trygg – från första kontakt till avslutat uppdrag.
          </p>
        </div>

        {/* --- MOBIL: slider med pilar & snap --- */}
        <div className="md:hidden -mx-6 relative">
          {/* Själva sliden */}
          <div
            ref={sliderRef}
            className="
              flex gap-4 px-1 no-scrollbar
              overflow-x-auto snap-x snap-mandatory
              pb-2
            "
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            } as React.CSSProperties}
            onScroll={updateArrows}
          >
            <style>{`.no-scrollbar::-webkit-scrollbar{display:none;}`}</style>
            {features.map((f, i) => (
              <Card
                key={i}
                feature={f}
                index={i}
                strongOverlay
                heightClass="h-[300px]"
                className="min-w-[86%] snap-center mx-1 motion-reduce:transform-none"
              />
            ))}
          </div>

          {/* Vänster gradient + pil */}
          <div
            className={`absolute inset-y-0 left-0 w-14 pointer-events-none transition-opacity duration-200 ${canLeft ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={!canLeft}
          >
            <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white/70 to-transparent" />
            <button
              type="button"
              aria-label="Föregående kort"
              onClick={() => scrollByCard(-1)}
              className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/45 text-white backdrop-blur-md ring-1 ring-white/20 shadow-md pointer-events-auto transition ${canLeft ? 'opacity-100' : 'opacity-0'}`}
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          {/* Höger gradient + pil */}
          <div
            className={`absolute inset-y-0 right-0 w-14 pointer-events-none transition-opacity duration-200 ${canRight ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={!canRight}
          >
            <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-white/70 to-transparent" />
            <button
              type="button"
              aria-label="Nästa kort"
              onClick={() => scrollByCard(1)}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/45 text-white backdrop-blur-md ring-1 ring-white/20 shadow-md pointer-events-auto transition ${canRight ? 'opacity-100' : 'opacity-0'}`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* --- DESKTOP/TABLET: original grid, oförändrad --- */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <Card key={i} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

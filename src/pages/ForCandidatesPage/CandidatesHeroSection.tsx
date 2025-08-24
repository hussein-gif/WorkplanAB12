import React from 'react';

interface CandidatesHeroSectionProps {
  isVisible: boolean;
  handleBrowseRoles: () => void;
}

const CandidatesHeroSection: React.FC<CandidatesHeroSectionProps> = ({
  isVisible,
  handleBrowseRoles,
}) => {
  return (
    <section
      className="relative min-h-[calc(100svh+3px)] md:min-h-screen flex items-center justify-center overflow-hidden md:mb-0"
      // lite extra padding upptill på mobil för att inte krocka med notch/statusbar
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {/* Bakgrundsbild */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co/ZzdGcXm1/2e9d69c0-7749-414b-bc27-fefb6a4061e7.png"
          alt="Professionell arbetsmiljö"
          className="w-full h-full object-cover md:object-center"
          // flytta fokus lite uppåt på mobil så motivet syns tydligare
          style={{ objectPosition: 'center 35%' }}
        />

        {/* MOBIL overlay – ljusare & vertikal gradient */}
        <div className="absolute inset-0 md:hidden pointer-events-none">
          {/* mjuk vertikal: låt bakgrunden synas mer */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/15" />
          {/* svag vignette för premium-känsla utan att mörka ned för mycket */}
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_40%,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.00)_60%)]" />
        </div>

        {/* DESKTOP overlay – samma som tidigare */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/10" />
      </div>

      {/* Centralt innehåll */}
      <div className="relative z-10 w-full max-w-4xl px-6 sm:px-8 md:px-16 text-center mx-auto">
        {/* Rubrik */}
        <h1
          className={`
            text-[2.3rem] sm:text-6xl md:text-7xl text-white mb-4 sm:mb-5 md:mb-6
            leading-tight tracking-tight
            [text-wrap:balance]
            drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]
            transition-all duration-1000 transform
            ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'}
          `}
          style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 200 }}
        >
          <span className="block">Hitta Jobbet</span>
          {/* Mindre bold än tidigare men starkare än första raden */}
          <span className="block font-medium">Som Passar Dig</span>
        </h1>

        {/* Underrubrik */}
        <p
          className={`
            text-base sm:text-lg md:text-xl text-white/85 mb-5 sm:mb-6 md:mb-12
            leading-relaxed max-w-prose md:max-w-2xl mx-auto
            transition-all duration-1000 delay-200 transform
            ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
          `}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
        >
          Vi matchar dig med rätt jobb – snabbt och utan krångel.
        </p>

        {/* Knapp */}
        <button
          onClick={handleBrowseRoles}
          className={`
            group relative inline-flex items-center justify-center gap-2
            px-6 md:px-8 py-4 md:py-4
            rounded-2xl text-white text-base sm:text-lg font-medium tracking-wide
            transition-all duration-200
            w-full sm:w-[min(24rem,100%)] md:w-auto min-h-[48px]
            ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}
            md:hover:scale-[1.03] md:active:scale-[0.99]
          `}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          <span className="btn-hero-bg absolute inset-0 rounded-2xl" />
          <span className="relative z-10 inline-flex items-center gap-2">
            Visa lediga jobb
            <span
              className="hidden md:inline-block translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </span>
        </button>
      </div>

      {/* Sömlös övergång (endast mobil) */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black md:hidden pointer-events-none" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@200;400&family=Inter:wght@300;500&display=swap');

        .btn-hero-bg {
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.12)), #0B274D;
          box-shadow: 0 10px 24px rgba(11,39,77,0.32);
          border: 1px solid rgba(255,255,255,0.18);
          transition: all .2s ease;
        }
        button:hover > .btn-hero-bg { 
          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.14)), #123B7A; 
          box-shadow: 0 14px 32px rgba(18,59,122,0.38); 
        }
        button:active > .btn-hero-bg { 
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.24), 0 8px 22px rgba(11,39,77,0.26); 
        }
      `}</style>
    </section>
  );
};

export default CandidatesHeroSection;

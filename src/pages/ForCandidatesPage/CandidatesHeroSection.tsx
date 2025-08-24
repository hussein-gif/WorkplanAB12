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
    <section className="relative min-h-[100svh] md:min-h-screen flex items-center justify-start overflow-hidden">
      {/* Ny bakgrundsbild */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co/ZzdGcXm1/2e9d69c0-7749-414b-bc27-fefb6a4061e7.png"
          alt="Professionell arbetsmiljö"
          className="w-full h-full object-cover object-[center_right] md:object-center"
        />
        {/* Starkare overlay på mobil, original på desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/30 md:from-black/70 md:via-black/50 md:to-black/20" />
      </div>

      <div className="relative z-10 max-w-4xl w-full px-8 md:px-16 text-left">
        {/* Scrim ENDAST desktop, ingen bakgrund på mobil */}
        <div className="md:rounded-2xl md:bg-black/25 md:backdrop-blur-[2px] md:ring-1 md:ring-white/10 md:p-8">
          {/* Rubrik */}
          <h1
            className={`
              text-[2.5rem] sm:text-6xl md:text-7xl text-white mb-4 md:mb-6
              leading-[0.88] md:leading-[0.9]
              tracking-[-0.01em] md:tracking-tight
              [text-wrap:balance] max-w-[17ch] md:max-w-none
              drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]
              transition-all duration-1000 transform
              ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}
            `}
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 200 }}
          >
            <span className="block">Hitta Jobbet</span>
            <span className="block font-normal">Som Passar Dig</span>
          </h1>

          {/* Underrubrik */}
          <p
            className={`
              text-[1.05rem] sm:text-lg md:text-xl text-white/85 mb-5 md:mb-12
              leading-relaxed max-w-prose md:max-w-2xl
              [text-wrap:pretty]
              transition-all duration-1000 delay-200 transform
              ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'}
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
              px-6 md:px-8 py-3 md:py-4
              rounded-2xl text-white text-base md:text-lg font-medium tracking-wide
              transition-all duration-200
              w-full md:w-auto min-h-[48px]
              ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
            `}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            <span className="btn-hero-bg absolute inset-0 rounded-2xl" />
            <span className="relative z-10">Visa lediga jobb</span>
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@200;400&family=Inter:wght@300;500&display=swap');

        /* Mörkblå hero-knapp (samma som PartnerHeroSection) */
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

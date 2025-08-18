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
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Ny bakgrundsbild */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co/ZzdGcXm1/2e9d69c0-7749-414b-bc27-fefb6a4061e7.png"
          alt="Professionell arbetsmiljö"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
      </div>

      <div className="relative z-10 max-w-4xl px-8 md:px-16 text-left">
        {/* Rubrik */}
        <h1
          className={`
            text-6xl md:text-7xl text-white mb-6 tracking-tight leading-[0.9]
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
            text-xl text-white/80 mb-12 leading-relaxed max-w-2xl
            transition-all duration-1000 delay-200 transform
            ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'}
          `}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
        >
          Vi matchar dig med rätt jobb – snabbt och utan krångel.
        </p>

        {/* Knapp - mörkblå variant */}
        <button
          onClick={handleBrowseRoles}
          className={`
            group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white text-lg font-medium tracking-wide transition-all duration-200 min-w-[250px]
            ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
          `}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          <span className="btn-hero-bg absolute inset-0 rounded-2xl" />
          <span className="relative z-10">Visa lediga jobb</span>
        </button>
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

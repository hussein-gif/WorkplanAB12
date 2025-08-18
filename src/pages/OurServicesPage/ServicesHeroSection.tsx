import React from 'react';

interface ServicesHeroSectionProps {
  isVisible: boolean;
  mousePosition: { x: number; y: number };
}

const ServicesHeroSection: React.FC<ServicesHeroSectionProps> = ({
  isVisible,
  mousePosition,
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co/GmGLTKd/77947250096.png"
          alt="Warehouse operations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Main Headline */}
        <h1
          className={`
            text-white mb-6 tracking-tight leading-[0.9]
            text-5xl md:text-6xl
            transition-all duration-1000 delay-200 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
          `}
          style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 200 }}
        >
          <span style={{ fontWeight: 200 }} className="block">Specialiserad bemanning</span>
          <span style={{ fontWeight: 400 }} className="block">För Lager & Logistik</span>
        </h1>

        {/* Tagline */}
        <p
          className={`
            text-xl text-white/80 mb-12 leading-relaxed max-w-4xl mx-auto
            transition-all duration-1000 delay-400 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
        >
          Kvalificerad personal – snabbt matchad för skift, volym, krav. Ingen bindningstid.
        </p>

        {/* Primary CTA - konsekvent med övriga hero-knappar */}
        <button
          onClick={() => {
            const element = document.getElementById('how-it-works');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className={`
            group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white text-lg tracking-wide transition-all duration-200 min-w-[240px]
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          <span className="btn-hero-bg absolute inset-0 rounded-2xl" />
          <span className="relative z-10">Så jobbar vi</span>
        </button>
      </div>

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

export default ServicesHeroSection;

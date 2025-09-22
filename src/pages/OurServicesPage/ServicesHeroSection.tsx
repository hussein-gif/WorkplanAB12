import React from 'react';

interface ServicesHeroSectionProps {
  isVisible: boolean;
  mousePosition: { x: number; y: number };
}

const ServicesHeroSection: React.FC<ServicesHeroSectionProps> = React.memo(
  ({ isVisible }) => {
    return (
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co/GmGLTKd/77947250096.png"
            alt="Warehouse operations"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 100vw"
            srcSet="https://i.ibb.co/GmGLTKd/77947250096.png 1280w"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-black/90 md:from-black/80 md:via-black/60 md:to-black/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center pt-6 md:pt-0">
          {/* Main Headline */}
          <h1
            className={`
              text-white mb-5 md:mb-6 tracking-tight leading-tight md:leading-[0.9]
              drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]
              text-4xl md:text-6xl
              transition-all duration-700 md:duration-1000 delay-200 transform
              ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0 md:translate-y-6'
              }
            `}
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            <span style={{ fontWeight: 200 }} className="block">
              Lager & Logistik
            </span>
            <span style={{ fontWeight: 400 }} className="block">
              Vår Specialitet
            </span>
          </h1>

          {/* Tagline */}
          <p
            className={`
              text-base md:text-xl text-white/85 mb-8 md:mb-12 leading-relaxed
              max-w-[28ch] md:max-w-4xl mx-auto
              transition-all duration-700 md:duration-1000 delay-300 transform
              ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-3 opacity-0 md:translate-y-4'
              }
            `}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            Kvalificerad personal, när du behöver.
          </p>

          {/* Primary CTA */}
          <button
            onClick={() => {
              const element = document.getElementById('how-it-works');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`
              group relative inline-flex items-center justify-center gap-2
              w-full max-w-xs md:max-w-none md:w-auto
              px-6 md:px-8 py-4 rounded-2xl text-base md:text-lg text-white tracking-wide
              transition-all duration-150 md:duration-200 active:scale-[0.99]
              ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-3 opacity-0 md:translate-y-4'
              }
              ring-1 ring-white/15
            `}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            <span className="btn-hero-bg absolute inset-0 rounded-2xl" />
            <span className="relative z-10">Så jobbar vi</span>
          </button>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@200;300;400&family=Inter:wght@300;500&display=swap');

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

          @media (prefers-reduced-motion: reduce) {
            * { transition: none !important; }
          }
        `}</style>
      </section>
    );
  }
);

export default ServicesHeroSection;

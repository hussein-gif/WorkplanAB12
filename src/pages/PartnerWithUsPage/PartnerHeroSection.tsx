import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PartnerHeroSectionProps {
  isVisible: boolean;
  scrollToContact: () => void;
  scrollToProcess: () => void;
}

const PartnerHeroSection: React.FC<PartnerHeroSectionProps> = ({
  isVisible,
  scrollToContact,
  scrollToProcess,
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
          alt="Professionals collaborating"
          className="w-full h-full object-cover"
        />
        {/* Lite mörkare scrim för läsbarhet (mobil något starkare) */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-black/85 sm:from-black/70 sm:via-black/55 sm:to-black/85" />
        <div
          className="pointer-events-none absolute -top-24 -left-24 w-[40rem] h-[40rem] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(24,154,76,0.55), rgba(24,154,76,0) 60%)',
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-16 w-[36rem] h-[36rem] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(59,130,246,0.45), rgba(59,130,246,0) 60%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.6\"/></svg>')",
          }}
        />
      </div>

      {/* Content – vänsterkanten */}
      <div
        className="
          relative z-10 w-full max-w-none
          pl-4 pr-4
          pt-8
          sm:pl-6 sm:pr-6
          md:pl-10 md:pr-10
          lg:pl-14 xl:pl-16
          text-left
        "
      >
        {/* MOBIL: kortbakgrund för bättre läsbarhet. På desktop är detta transparent. */}
        <div
          className="
            rounded-2xl p-4 ring-1 ring-white/10 bg-black/25 backdrop-blur-[2px]
            sm:bg-transparent sm:backdrop-blur-0 sm:ring-0 sm:p-0
          "
        >
          {/* Rubrik – alltid två rader */}
          <h1
            className={`
              text-white mb-3 sm:mb-5
              tracking-[-0.01em] sm:tracking-tight
              leading-[1.08] sm:leading-[0.95]
              text-[32px] sm:text-6xl lg:text-7xl
              transition-all duration-1000 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
              text-shadow-soft sm:text-shadow-none
            `}
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 300,
              maxWidth: '20ch',
            }}
          >
            <span className="block font-extralight">Team Som</span>
            <span className="block font-normal whitespace-normal sm:whitespace-nowrap">
              Klarar Framtiden
            </span>
          </h1>

          {/* Underrubrik */}
          <p
            className={`
              text-[15px] sm:text-xl
              leading-[1.6] sm:leading-relaxed
              text-white/85 sm:text-gray-300
              mb-4 sm:mb-12
              transition-all duration-1000 delay-150 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              text-shadow-soft sm:text-shadow-none
              max-w-[34ch] sm:max-w-[36ch]
            `}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            Vi levererar rätt människor till varje steg i ert flöde.
          </p>

          {/* Knappar */}
          <div
            className={`
              flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center sm:justify-start items-center sm:items-start
              transition-all duration-1000 delay-300 transform mt-4 sm:mt-0
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
          >
            <button
              onClick={scrollToContact}
              className="
                group relative inline-flex items-center justify-center gap-2
                w-full sm:w-auto
                max-w-[280px]
                px-6 py-4 sm:px-8 sm:py-4
                rounded-2xl
                text-white text-[17px] sm:text-lg font-medium tracking-wide
                transition-all duration-200
                shadow-[0_10px_25px_rgba(11,39,77,0.35)]
                active:scale-[0.99]
              "
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="btn-hero-bg absolute inset-0 rounded-2xl" />
              <span className="relative z-10">Kontakta oss</span>
              <ArrowRight
                size={18}
                className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>

            <button
              onClick={scrollToProcess}
              className="
                relative inline-flex items-center justify-center
                w-full sm:w-auto
                max-w-[280px]
                px-6 py-4 sm:px-8 sm:py-4
                rounded-2xl
                text-white text-[17px] sm:text-lg font-medium tracking-wide
                border border-white/25 bg-white/10
                hover:bg-white/15 hover:border-white/40
                transition-all duration-200
                active:scale-[0.99]
              "
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Så jobbar vi
            </button>
          </div>
        </div>
      </div>

      {/* BETRODD AV */}
      <div
        className={`
          trusted absolute left-1/2 -translate-x-1/2
          bottom-[max(12px,env(safe-area-inset-bottom))] sm:bottom-0
          z-10 text-center transition-all duration-700
          ${isVisible ? 'opacity-80 sm:opacity-100' : 'opacity-0'}
        `}
      >
        <div
          className="text-[10px] sm:text-sm tracking-wide uppercase relative -translate-y-[2px] sm:-translate-y-[4px]"
          style={{ fontFamily: 'Inter, sans-serif', color: '#D1D5DB', fontWeight: 500 }}
        >
          BETRODD AV
        </div>
        <img
          src="https://i.ibb.co/W4J67ydJ/Namnl-s-design-1-removebg-preview.png"
          alt="Betrodd av logotyp"
          className="h-10 sm:h-16 lg:h-20 mt-1 sm:mt-3 mx-auto object-contain opacity-95"
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@200;400&family=Inter:wght@300;400;500;600&display=swap');

        .text-shadow-soft { text-shadow: 0 1px 2px rgba(0,0,0,.35); }

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

export default PartnerHeroSection;

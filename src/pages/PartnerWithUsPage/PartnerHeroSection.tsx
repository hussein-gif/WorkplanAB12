import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

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
  // Framer Motion variants (smidig, konsekvent timing)
  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
    },
  });

  return (
    <section className="group relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
          alt="Professionals collaborating"
          className="w-full h-full object-cover transform transition-transform duration-[1200ms] group-hover:scale-[1.03]"
        />
        {/* Lite mörkare scrim för läsbarhet */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/85 sm:from-black/70 sm:via-black/55 sm:to-black/85" />
        {/* Långsamt animerade färgblobs */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 w-[40rem] h-[40rem] rounded-full opacity-25 blur-3xl animate-blob"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(24,154,76,0.55), rgba(24,154,76,0) 60%)',
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-16 w-[36rem] h-[36rem] rounded-full opacity-20 blur-3xl animate-blob2"
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
          sm:pl-6 sm:pr-6     
          md:pl-10 md:pr-10
          lg:pl-24 xl:pl-32     /* mer luft på desktop */
          text-left
        "
      >
        {/* Subtil backdrop bakom text för extra kontrast på desktop */}
        <div className="inline-block rounded-2xl lg:rounded-3xl lg:bg-black/15 lg:backdrop-blur-[2px] lg:ring-1 lg:ring-white/10 lg:p-6 xl:p-8">
          {/* Rubrik – alltid två rader */}
          <motion.h1
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={fadeUp(0)}
            className={`
              text-white mb-4 sm:mb-5
              tracking-[-0.01em] sm:tracking-tight
              leading-[1.05] sm:leading-[0.95]
              text-[34px] sm:text-6xl lg:text-7xl
              transition-all duration-1000 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
              text-shadow-soft sm:text-shadow-none
            `}
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 300,
              maxWidth: '18ch',
            }}
          >
            <span className="block font-extralight lg:text-5xl">Team Som</span>
            <span className="block font-normal whitespace-nowrap lg:text-7xl">
              Klarar{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent font-semibold">
                Framtiden
              </span>
            </span>
          </motion.h1>

          {/* Underrubrik */}
          <motion.p
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={fadeUp(0.12)}
            className={`
              text-[15px] sm:text-xl
              leading-[1.55] sm:leading-relaxed
              text-white/85 sm:text-gray-300
              mb-6 sm:mb-12
              transition-all duration-1000 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              text-shadow-soft sm:text-shadow-none
              max-w-2xl
            `}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            Vi levererar rätt människor till varje steg i ert flöde.
          </motion.p>

          {/* Knappar */}
          <motion.div
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={fadeUp(0.22)}
            className={`
              flex flex-col sm:flex-row gap-3 sm:gap-6 justify-start items-start
              transition-all duration-1000 transform mt-4 sm:mt-0
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
          >
            <button
              onClick={scrollToContact}
              className="
                group relative inline-flex items-center justify-center gap-2
                w-full sm:w-auto
                px-6 py-3 sm:px-8 sm:py-4
                rounded-xl sm:rounded-2xl
                text-white text-[16px] sm:text-lg font-medium tracking-wide
                transition-all duration-200 will-change-transform
                hover:-translate-y-[1px] active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
              "
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="btn-hero-bg absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
                {/* glans-effekt */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/25 to-white/0 skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </span>
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
                px-6 py-3 sm:px-8 sm:py-4
                rounded-xl sm:rounded-2xl
                text-white text-[16px] sm:text-lg font-medium tracking-wide
                border border-white/30 bg-white/10
                hover:bg-white/15 hover:border-white/50
                transition-all duration-200 hover:-translate-y-[1px]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
              "
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Så jobbar vi
            </button>
          </motion.div>
        </div>
      </div>

      {/* BETRODD AV */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.7, delay: 0.28 }}
        className={`
          trusted absolute left-1/2 -translate-x-1/2
          bottom-2 sm:bottom-0
          z-10 text-center
          ${isVisible ? 'opacity-80 sm:opacity-100' : 'opacity-0'}
        `}
      >
        <div
          className="text-[11px] sm:text-sm tracking-wide uppercase relative -translate-y-[4px]"
          style={{ fontFamily: 'Inter, sans-serif', color: '#D1D5DB', fontWeight: 500 }}
        >
          BETRODD AV
        </div>
        <img
          src="https://i.ibb.co/W4J67ydJ/Namnl-s-design-1-removebg-preview.png"
          alt="Betrodd av logotyp"
          className="h-12 sm:h-16 lg:h-20 mt-1.5 sm:mt-3 mx-auto object-contain filter grayscale hover:grayscale-0 transition-[filter,opacity] duration-300 opacity-90"
        />
      </motion.div>

      {/* Scroll hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden lg:flex items-center gap-2 text-white/70 animate-bounce">
        <ChevronDown size={18} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@200;400&family=Inter:wght@300;400;500;600&display=swap');

        .text-shadow-soft { text-shadow: 0 1px 2px rgba(0,0,0,.35); }

        /* Primär knapp bakgrund + glow */
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

        /* Långsam blob-animation */
        @keyframes blob {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(12px, -8px, 0) scale(1.04); }
        }
        @keyframes blob2 {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(-10px, 10px, 0) scale(1.03); }
        }
        .animate-blob { animation: blob 12s ease-in-out infinite; }
        .animate-blob2 { animation: blob2 14s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default PartnerHeroSection;

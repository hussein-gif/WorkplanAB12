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
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-black/85" />
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
          pl-4 sm:pl-6 md:pl-10 lg:pl-14 xl:pl-16
          pr-4 sm:pr-6 md:pr-10
          text-left
        "
      >
        {/* Rubrik – rad 1 vikt 200, rad 2 vikt 400 */}
        <h1
          className={`text-white mb-5 tracking-tight leading-[0.95] transition-all duration-1000 transform
            text-5xl md:text-6xl lg:text-7xl
            ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}
          `}
          style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 200 }}
        >
          <span style={{ fontWeight: 200 }} className="block">Bygg Teamet</span>
          <span style={{ fontWeight: 400 }} className="block">Som Klarar Morgondagen</span>
        </h1>

        {/* Underrubrik */}
        <p
          className={`text-base md:text-xl text-gray-300 mb-10 md:mb-12 leading-relaxed max-w-3xl transition-all duration-1000 delay-150 transform
            ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'}
          `}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
        >
          Vi levererar rätt människor till varje steg i ert flöde – från orderplock till skiftledning.
        </p>

        {/* Knappar */}
        <div
          className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start items-start transition-all duration-1000 delay-300 transform
            ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
          `}
        >
          <button
            onClick={scrollToContact}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white text-lg font-medium tracking-wide transition-all duration-200 min-w-[240px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span className="btn-hero-bg absolute inset-0 rounded-xl" />
            <span className="relative z-10">Kontakta oss</span>
            <ArrowRight size={18} className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          <button
            onClick={scrollToProcess}
            className="relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-white text-lg font-medium tracking-wide border border-white/25 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-200 min-w-[200px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Så jobbar vi
          </button>
        </div>
      </div>

      {/* BETRODD AV */}
      <div
        className={`trusted absolute left-1/2 -translate-x-1/2 bottom-0 z-10 text-center transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="text-xs md:text-sm tracking-wide uppercase relative -translate-y-[4px]"
          style={{ fontFamily: 'Inter, sans-serif', color: '#D1D5DB', fontWeight: 500 }}
        >
          BETRODD AV
        </div>
        <img
          src="https://i.ibb.co/W4J67ydJ/Namnl-s-design-1-removebg-preview.png"
          alt="Betrodd av logotyp"
          className="h-14 md:h-16 lg:h-20 mt-2 md:mt-3 mx-auto object-contain"
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@200;400&family=Inter:wght@300;400;500;600&display=swap');

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

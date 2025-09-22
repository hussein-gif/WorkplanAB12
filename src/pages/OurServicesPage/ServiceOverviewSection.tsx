import React from 'react';
import { Users } from 'lucide-react';

interface ServiceOverviewSectionProps {
  isVisible: boolean;
}

const ServiceOverviewSection: React.FC<ServiceOverviewSectionProps> = React.memo(({ isVisible }) => {
  return (
    <section
      className="relative py-14 md:py-24 px-6 md:px-8 bg-[#08132B] overflow-hidden"
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '680px',
      }}
    >
      {/* --- NY BAKGRUNDSDESIGN (ingen prickmönster) --- */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" inert>
        {/* Hörn-glows */}
        <div
          className="absolute -top-24 -left-20 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(24,154,76,0.35), rgba(24,154,76,0) 60%)',
          }}
        />
        <div
          className="absolute -bottom-28 -right-20 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-25"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(59,130,246,0.28), rgba(59,130,246,0) 60%)',
          }}
        />

        {/* Subtilt rutnät */}
        <div
          className="absolute inset-0 opacity-[0.05] md:opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 80px 80px',
            backgroundPosition: '0 0, 0 0',
            maskImage:
              'radial-gradient(circle at center, black 40%, transparent 90%)',
            WebkitMaskImage:
              'radial-gradient(circle at center, black 40%, transparent 90%)',
          }}
        />

        {/* Diagonal ljusstrimma */}
        <div
          className="absolute -inset-x-20 top-1/4 h-72 rotate-[-12deg] opacity-10 md:opacity-20"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0))',
            filter: 'blur(18px)',
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)',
          }}
        />

        {/* Noise/texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] md:opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.7\"/></svg>')",
          }}
        />
      </div>

      {/* INNEHÅLL */}
      <div className="max-w-4xl mx-auto relative z-10">
        <div
          className={`
            group relative border border-white/20 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center shadow-lg backdrop-blur-lg bg-white/10
            md:hover:shadow-xl md:transition-all md:duration-500
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 md:translate-y-8 opacity-0'}
          `}
          style={{
            transitionDelay: '600ms',
            willChange: isVisible ? 'transform, opacity' : undefined,
          }}
        >
          {/* Hover Glow Overlay (endast md+) */}
          <div className="hidden md:block absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            {/* Ikonruta */}
            <div
              className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-6 md:mb-8 rounded-2xl flex items-center justify-center btn-min md:group-hover:scale-105 md:transition-transform md:duration-500"
              style={{ transform: 'translateZ(0)' }}
            >
              <Users size={22} className="text-white md:hidden" />
              <Users size={24} className="text-white hidden md:block" />
            </div>

            {/* Rubrik */}
            <h2
              className="text-[26px] md:text-3xl text-white tracking-tight mb-4 md:mb-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
            >
              Bemanning som håller er drift igång
            </h2>

            {/* Brödtext */}
            <p
              className="text-base md:text-lg text-white/80 leading-relaxed max-w-[32ch] md:max-w-2xl mx-auto"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Vi levererar förhandskvalificerad personal inom lager och logistik – från toppar och sjukfrånvaro till längre vikariat. Matchat efter skift, volym och krav, utan bindningstider.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Zen+Kaku+Gothic+Antique:wght@500&display=swap');

        .btn-min {
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.12)), #189A4C;
          border-radius: 0.75rem;
          box-shadow: 0 8px 20px rgba(24, 154, 76, 0.28);
        }
        .btn-min:active {
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.25), 0 6px 18px rgba(24, 154, 76, 0.24);
        }

        /* Mindre rörelse på mobil (desktop oförändrat) */
        @media (max-width: 767px) {
          .group { transition-duration: 300ms; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>
    </section>
  );
});

ServiceOverviewSection.displayName = 'ServiceOverviewSection';

export default ServiceOverviewSection;

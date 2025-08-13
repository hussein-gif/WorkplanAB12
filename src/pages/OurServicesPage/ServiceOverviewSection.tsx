import React from 'react';
import { Users } from 'lucide-react';

interface ServiceOverviewSectionProps {
  isVisible: boolean;
}

const ServiceOverviewSection: React.FC<ServiceOverviewSectionProps> = ({
  isVisible,
}) => {
  return (
    <section className="relative py-24 px-8 bg-[#08132B] overflow-hidden">
      {/* --- NY BAKGRUNDSDESIGN (ingen prickmönster) --- */}
      <div className="absolute inset-0 pointer-events-none">
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
          className="absolute inset-0 opacity-[0.08]"
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
          className="absolute -inset-x-20 top-1/4 h-72 rotate-[-12deg] opacity-20"
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
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
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
            group relative border border-white/20 rounded-3xl p-12 text-center shadow-lg backdrop-blur-lg bg-white/10
            hover:shadow-xl transition-all duration-500
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
          style={{ transitionDelay: '600ms' }}
        >
          {/* Hover Glow Overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            {/* Ikonruta */}
            <div className="w-16 h-16 mx-auto mb-8 rounded-2xl flex items-center justify-center btn-min group-hover:scale-105 transition-transform duration-500">
              <Users size={24} className="text-white" />
            </div>

            {/* Rubrik */}
            <h2
              className="text-3xl text-white mb-6"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
            >
              Bemanning som håller er drift igång
            </h2>

            {/* Brödtext */}
            <p
              className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto"
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
        .btn-min:hover {
          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.14)), #1FB259;
          box-shadow: 0 10px 28px rgba(24, 154, 76, 0.35);
        }
        .btn-min:active {
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.25), 0 6px 18px rgba(24, 154, 76, 0.24);
        }
        .btn-min:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(52, 211, 153, .35), 0 0 0 1px rgba(255,255,255,.2) inset;
        }
      `}</style>
    </section>
  );
};

export default ServiceOverviewSection;

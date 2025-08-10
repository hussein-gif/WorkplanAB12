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
      {/* Bakgrundsdesign */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgBlob-service" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(24,154,76,0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <pattern id="pattern-service" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
              <rect width="4" height="4" fill="rgba(255,255,255,0.05)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern-service)" />
          <circle cx="20%" cy="30%" r="300" fill="url(#bgBlob-service)" />
          <circle cx="80%" cy="70%" r="300" fill="url(#bgBlob-service)" />
        </svg>
      </div>

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
            {/* Ikonruta - Emerald stil */}
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

import React from 'react';
import { Clock, Truck, Award } from 'lucide-react';

interface WhyChooseSectionProps {
  isVisible: boolean;
}

const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ isVisible }) => {
  return (
    <section className="relative py-24 px-8 overflow-hidden bg-white">
      {/* SVG-bakgrund */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgBlob-why" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.15)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <pattern id="zigzag-why" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
              <path d="M0 5 l5 -5 l5 5" stroke="rgba(16,185,129,0.05)" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#zigzag-why)" />
          <circle cx="25%" cy="20%" r="300" fill="url(#bgBlob-why)" />
          <circle cx="80%" cy="75%" r="300" fill="url(#bgBlob-why)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl text-gray-900 mb-4 font-medium"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Varför välja TalentBridge?
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            Tre anledningar till att företag inom lager & logistik vänder sig till oss.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Clock,
              title: 'Flexibilitet & Snabb igångsättning',
              description:
                'Bemanning när behovet uppstår – skift, toppar eller vikariat. Inga bindningstider.',
            },
            {
              icon: Truck,
              title: 'Djup branschkännedom',
              description:
                'Vi kan lager & logistik – vi förstår rollerna, tempot och kompetenskraven.',
            },
            {
              icon: Award,
              title: 'Trygg & transparent process',
              description:
                'Strukturerad screening, tydliga villkor och en personlig kontakt genom hela uppdraget.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`
                text-center p-8 bg-white border border-gray-200 rounded-2xl shadow-sm transition-all
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
              `}
              style={{ transitionDelay: `${1200 + index * 150}ms` }}
            >
              {/* Emerald ruta som knappen */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center btn-min">
                <item.icon size={24} className="text-white" />
              </div>

              <h3
                className="text-xl text-gray-900 mb-3"
                style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
              >
                {item.title}
              </h3>
              <p
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {item.description}
              </p>
            </div>
          ))}
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

export default WhyChooseSection;

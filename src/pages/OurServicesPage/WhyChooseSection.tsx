import React from 'react';
import { Clock, Truck, Award } from 'lucide-react';

interface WhyChooseSectionProps {
  isVisible: boolean;
}

const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ isVisible }) => {
  return (
    <section className="relative py-16 md:py-24 px-6 md:px-8 overflow-hidden bg-white">
      {/* SVG-bakgrund: lugnare på mobil, full på md+ */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgBlob-why" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <pattern id="zigzag-why" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
              <path d="M0 5 l5 -5 l5 5" stroke="rgba(8,19,43,0.05)" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          {/* mönster: svagare på mobil */}
          <rect width="100%" height="100%" fill="url(#zigzag-why)" opacity="0.5" className="md:opacity-100" />
          {/* blobbar: en diskret på mobil, två på md+ */}
          <circle cx="25%" cy="20%" r="280" fill="url(#bgBlob-why)" className="opacity-70 md:opacity-100" />
          <circle cx="80%" cy="75%" r="300" fill="url(#bgBlob-why)" className="hidden md:block" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2
            className="text-[1.875rem] md:text-4xl leading-tight md:leading-snug text-gray-900 mb-3 md:mb-4 font-medium [text-wrap:balance]"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Varför välja Workplan?
          </h2>
          <p
            className="text-[1rem] md:text-lg text-gray-600 max-w-xl md:max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            Tre anledningar till att företag inom lager & logistik vänder sig till oss.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
                text-center p-6 md:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm
                transition-all md:hover:-translate-y-1
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
              style={{ transitionDelay: `${1200 + index * 150}ms` }}
            >
              {/* 3D blå badge */}
              <div className="icon-badge-3d w-14 h-14 md:w-16 md:h-16 mx-auto mb-5 md:mb-6 rounded-2xl flex items-center justify-center relative">
                <span className="absolute inset-0 rounded-2xl glow-ring pointer-events-none" />
                <item.icon size={26} strokeWidth={2} className="icon-3d md:!size-[28px]" />
              </div>

              <h3
                className="text-[1.125rem] md:text-xl text-gray-900 mb-2.5 md:mb-3 [text-wrap:balance]"
                style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
              >
                {item.title}
              </h3>
              <p
                className="text-[0.95rem] md:text-base text-gray-600 leading-relaxed"
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

        :root {
          --blue-deep: #0F2047;
          --blue-900: #132A55;
          --blue-800: #1B3C77;
          --blue-700: #2A5DA8;
          --blue-600: #3E7BDB;
          --blue-300: #BBD0FF;
          --blue-200: #D9E6FF;
        }

        .icon-badge-3d {
          position: relative;
          border-radius: 0.75rem;
          background:
            radial-gradient(120% 120% at 30% 20%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 40%),
            linear-gradient(180deg, var(--blue-800), var(--blue-900));
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.10),
            inset 0 -4px 10px rgba(0,0,0,0.25),
            0 10px 22px rgba(8,19,43,0.25);
          transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
        }
        .icon-badge-3d::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.10) 20%, rgba(255,255,255,0) 50%);
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .icon-badge-3d:hover { /* hover-effekt aktiveras bara på md via parent classes */
          background:
            radial-gradient(120% 120% at 30% 20%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 40%),
            linear-gradient(180deg, var(--blue-700), var(--blue-800));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.12),
            inset 0 -4px 10px rgba(0,0,0,0.22),
            0 14px 28px rgba(8,19,43,0.28);
          transform: translateY(-2px);
        }

        .glow-ring {
          background:
            radial-gradient(50% 50% at 50% 50%, rgba(217,230,255,0.55) 0%, rgba(217,230,255,0.12) 40%, transparent 70%);
          filter: blur(6px);
          opacity: 0.9;
          transition: opacity 220ms ease, filter 220ms ease;
        }

        .icon-3d {
          color: #FFFFFF;
          filter:
            drop-shadow(0 1px 0 rgba(255,255,255,0.45))
            drop-shadow(0 3px 6px rgba(8,19,43,0.35));
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseSection;

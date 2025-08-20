import React from 'react';
import { User, Building } from 'lucide-react';

interface ContactHeroSectionProps {
  isVisible: boolean;
  mousePosition: { x: number; y: number }; // behålls för kompatibilitet men används ej
  userType: 'candidate' | 'company' | null;
  setUserType: (type: 'candidate' | 'company' | null) => void;
}

const ContactHeroSection: React.FC<ContactHeroSectionProps> = ({
  isVisible,
  mousePosition, // unused
  userType,
  setUserType,
}) => {
  return (
    <section className="relative pt-32 pb-16 px-8 overflow-hidden">
      {/* ===== Ny bakgrund – mörkare & mer professionell så navbaren syns ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Bas: djup, elegant gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1200px 700px at 50% 25%, rgba(30,41,59,0.95), rgba(15,23,42,0.98)),
              linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)
            `,
          }}
        />

        {/* Subtila orbs (nedtonade) */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08] blur-3xl"
          style={{
            background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
            left: '15%',
            top: '28%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute w-[520px] h-[520px] rounded-full opacity-[0.06] blur-3xl"
          style={{
            background: 'radial-gradient(circle, #10B981 0%, transparent 70%)',
            right: '16%',
            bottom: '26%',
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Diskret grid för textur */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Vågmönster – mörkare & subtilt */}
        <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveGradDark1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.18)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="waveGradDark2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.14)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="waveGradDark3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168,85,247,0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          <path
            d="M0,150 C300,80 600,150 900,150 S1500,150 1800,150 L1800,250 C1500,320 1200,250 900,250 S300,320 0,250 Z"
            fill="url(#waveGradDark1)"
          />
          <path
            d="M0,300 C400,220 800,300 1200,300 S2000,300 2400,300 L2400,420 C2000,500 1600,420 1200,420 S400,500 0,420 Z"
            fill="url(#waveGradDark2)"
          />
          <path
            d="M0,500 C350,400 700,500 1050,500 S1750,500 2100,500 L2100,650 C1750,750 1400,650 1050,650 S350,750 0,650 Z"
            fill="url(#waveGradDark3)"
          />
        </svg>
      </div>

      {/* ===== Innehåll ===== */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Rubrik */}
        <h1
          style={{
            fontFamily:
              '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          }}
          className={`
            text-5xl md:text-6xl font-light text-white mb-16 tracking-tight
            transition-all duration-1000 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
          `}
        >
          Hur kan vi hjälpa dig?
        </h1>

        {/* Underrubrik */}
        <p
          style={{
            fontFamily:
              'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          }}
          className={`
            text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-6
            transition-all duration-1000 delay-200 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          Jag är:
        </p>

        {/* Knappar */}
        <div
          className={`
            flex flex-col sm:flex-row gap-4 justify-center items-center mb-20
            transition-all duration-1000 delay-400 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          <button
            onClick={() => setUserType('candidate')}
            style={{ fontFamily: 'Inter, sans-serif' }}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-2xl border-2 font-medium text-lg
              transition-all duration-300
              ${userType === 'candidate'
                ? 'border-blue-400 bg-blue-500/10 text-blue-200'
                : 'border-white/20 bg-white/5 text-white hover:border-blue-300/50 hover:bg-white/10'}
            `}
          >
            <User size={20} />
            <span>Kandidat</span>
          </button>

          <button
            onClick={() => setUserType('company')}
            style={{ fontFamily: 'Inter, sans-serif' }}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-2xl border-2 font-medium text-lg
              transition-all duration-300
              ${userType === 'company'
                ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
                : 'border-white/20 bg-white/5 text-white hover:border-emerald-300/50 hover:bg-white/10'}
            `}
          >
            <Building size={20} />
            <span>Företag</span>
          </button>
        </div>
      </div>

      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Zen+Kaku+Gothic+Antique:wght@200;300;400&display=swap');
      `}</style>
    </section>
  );
};

export default ContactHeroSection;

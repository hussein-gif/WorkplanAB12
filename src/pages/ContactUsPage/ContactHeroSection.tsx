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
  mousePosition, // unused on purpose to keep things static
  userType,
  setUserType,
}) => {
  return (
    <section className="relative pt-32 pb-16 px-8 overflow-hidden">
      {/* ===== Bakgrund (ALLT) – statisk och bakom innehållet ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dynamic Gradient Orbs – nu statiska */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.02] blur-3xl"
          style={{
            background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
            left: '15%',
            top: '25%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.015] blur-3xl"
          style={{
            background: 'radial-gradient(circle, #10B981 0%, transparent 70%)',
            right: '15%',
            bottom: '25%',
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Grid Pattern – statisk */}
        <div
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* ===== Avancerad bakgrundsdesign – statisk ===== */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Multi-Layer Gradient System */}
          <div
            className="absolute inset-0"
            style={{
              background: [
                'radial-gradient(1200px 800px at 15% 25%, rgba(59,130,246,0.08), rgba(59,130,246,0) 65%)',
                'radial-gradient(1000px 600px at 85% 20%, rgba(16,185,129,0.06), rgba(16,185,129,0) 70%)',
                'radial-gradient(800px 500px at 30% 80%, rgba(139,92,246,0.05), rgba(139,92,246,0) 75%)',
                'radial-gradient(1400px 900px at 70% 75%, rgba(37,99,235,0.04), rgba(37,99,235,0) 80%)',
                'radial-gradient(600px 400px at 50% 50%, rgba(52,211,153,0.03), rgba(52,211,153,0) 85%)',
              ].join(','),
              mixBlendMode: 'normal',
            }}
          />

          {/* Flowing Wave Patterns – statiska */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59,130,246,0.06)" />
                <stop offset="50%" stopColor="rgba(99,102,241,0.03)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(16,185,129,0.05)" />
                <stop offset="50%" stopColor="rgba(52,211,153,0.025)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="waveGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(168,85,247,0.04)" />
                <stop offset="50%" stopColor="rgba(147,51,234,0.02)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            <path
              d="M0,150 C300,80 600,150 900,150 S1500,150 1800,150 L1800,250 C1500,320 1200,250 900,250 S300,320 0,250 Z"
              fill="url(#waveGrad1)"
            />
            <path
              d="M0,300 C400,220 800,300 1200,300 S2000,300 2400,300 L2400,420 C2000,500 1600,420 1200,420 S400,500 0,420 Z"
              fill="url(#waveGrad2)"
            />
            <path
              d="M0,500 C350,400 700,500 1050,500 S1750,500 2100,500 L2100,650 C1750,750 1400,650 1050,650 S350,750 0,650 Z"
              fill="url(#waveGrad3)"
            />
          </svg>
        </div>
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
            text-5xl md:text-6xl font-light text-gray-900 mb-16 tracking-tight
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
            text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed mb-6
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
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-25'}
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
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-25'}
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

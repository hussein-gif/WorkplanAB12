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

          {/* Geometric Pattern Overlay – statisk */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: [
                'radial-gradient(circle at 20% 30%, rgba(59,130,246,0.15) 2px, transparent 2px)',
                'radial-gradient(circle at 80% 20%, rgba(16,185,129,0.12) 1.5px, transparent 1.5px)',
                'radial-gradient(circle at 60% 70%, rgba(168,85,247,0.10) 2.5px, transparent 2.5px)',
                'radial-gradient(circle at 30% 80%, rgba(37,99,235,0.08) 1px, transparent 1px)',
                'radial-gradient(circle at 70% 40%, rgba(52,211,153,0.06) 1.8px, transparent 1.8px)',
              ].join(', '),
              backgroundSize: '120px 120px, 180px 180px, 100px 100px, 160px 160px, 140px 140px',
              opacity: 0.4,
            }}
          />

          {/* Conic Gradient Spirals – statiska */}
          <div
            className="absolute left-1/4 top-1/4 w-[800px] h-[800px] opacity-[0.04]"
            style={{
              background:
                'conic-gradient(from 45deg at 50% 50%, rgba(59,130,246,0.15) 0deg, rgba(99,102,241,0.10) 60deg, transparent 120deg, rgba(168,85,247,0.08) 180deg, rgba(147,51,234,0.05) 240deg, transparent 300deg, rgba(59,130,246,0.15) 360deg)',
              borderRadius: '50%',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute right-1/4 bottom-1/4 w-[600px] h-[600px] opacity-[0.03]"
            style={{
              background:
                'conic-gradient(from 225deg at 50% 50%, rgba(16,185,129,0.12) 0deg, transparent 90deg, rgba(52,211,153,0.08) 180deg, rgba(34,197,94,0.05) 270deg, rgba(16,185,129,0.12) 360deg)',
              borderRadius: '50%',
              filter: 'blur(50px)',
            }}
          />

          {/* Diagonal Light Streams – statiska */}
          <div
            className="absolute -inset-x-32 top-1/4 h-96 rotate-12 opacity-15"
            style={{
              background:
                'linear-gradient(90deg, rgba(59,130,246,0) 0%, rgba(59,130,246,0.08) 20%, rgba(99,102,241,0.12) 50%, rgba(168,85,247,0.08) 80%, rgba(168,85,247,0) 100%)',
              filter: 'blur(20px)',
            }}
          />
          <div
            className="absolute -inset-x-32 bottom-1/4 h-64 -rotate-8 opacity-12"
            style={{
              background:
                'linear-gradient(90deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.06) 30%, rgba(52,211,153,0.10) 70%, rgba(16,185,129,0) 100%)',
              filter: 'blur(25px)',
            }}
          />

          {/* Floating Elements – statiska */}
          <div
            className="absolute top-16 right-24 w-32 h-32 rounded-full opacity-8"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.25) 0%, rgba(99,102,241,0.15) 40%, transparent 70%)',
              filter: 'blur(15px)',
              boxShadow: '0 20px 40px rgba(59,130,246,0.1)',
            }}
          />
          <div
            className="absolute bottom-20 left-16 w-24 h-24 rounded-full opacity-6"
            style={{
              background:
                'radial-gradient(circle at 60% 60%, rgba(16,185,129,0.20) 0%, rgba(52,211,153,0.12) 50%, transparent 75%)',
              filter: 'blur(12px)',
              boxShadow: '0 15px 30px rgba(16,185,129,0.08)',
            }}
          />
          <div
            className="absolute top-1/3 left-1/3 w-20 h-20 rounded-full opacity-5"
            style={{
              background:
                'radial-gradient(circle at 40% 40%, rgba(168,85,247,0.18) 0%, rgba(147,51,234,0.10) 60%, transparent 80%)',
              filter: 'blur(10px)',
              boxShadow: '0 12px 25px rgba(168,85,247,0.06)',
            }}
          />

          {/* Border Accents – statiska rotationer */}
          <div
            className="absolute top-20 left-20 w-40 h-40 border border-blue-200/25 rounded-full"
            style={{
              transform: 'rotate(0deg)',
              background:
                'radial-gradient(circle at center, transparent 60%, rgba(59,130,246,0.02) 100%)',
            }}
          />
          <div
            className="absolute bottom-24 right-32 w-28 h-28 border border-emerald-200/20 rounded-lg"
            style={{
              transform: 'rotate(0deg)',
              background:
                'radial-gradient(circle at center, transparent 50%, rgba(16,185,129,0.015) 100%)',
            }}
          />
          <div
            className="absolute top-1/2 right-16 w-36 h-36 border border-purple-200/15 rounded-full"
            style={{
              transform: 'rotate(0deg)',
              background:
                'radial-gradient(circle at center, transparent 70%, rgba(168,85,247,0.01) 100%)',
            }}
          />

          {/* Mesh Grid System – statisk */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px),
                linear-gradient(45deg, rgba(16,185,129,0.2) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(168,85,247,0.15) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px, 80px 80px, 120px 120px, 100px 100px',
            }}
          />

          {/* Particles – statiska (ingen animation) */}
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: [
                  'rgba(59,130,246,0.12)',
                  'rgba(16,185,129,0.10)',
                  'rgba(168,85,247,0.08)',
                  'rgba(37,99,235,0.06)',
                  'rgba(52,211,153,0.05)',
                ][Math.floor(Math.random() * 5)],
                animation: 'none',
              }}
            />
          ))}

          {/* Texture Overlay – statisk */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Center Highlight – statisk */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full opacity-[0.03]"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(59,130,246,0.1) 30%, rgba(16,185,129,0.05) 60%, transparent 100%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Accent Lines – statiska */}
          <div
            className="absolute top-0 left-1/4 w-px h-full opacity-[0.08]"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(59,130,246,0.3) 20%, rgba(59,130,246,0.3) 80%, transparent 100%)',
            }}
          />
          <div
            className="absolute top-0 right-1/3 w-px h-full opacity-[0.06]"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(16,185,129,0.25) 25%, rgba(16,185,129,0.25) 75%, transparent 100%)',
            }}
          />

          {/* Mouse-Following Orbs – nu statiska */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full opacity-[0.025] blur-2xl"
            style={{
              background: 'radial-gradient(circle, #3B82F6 0%, transparent 60%)',
              left: '40%',
              top: '60%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div
            className="absolute w-[300px] h-[300px] rounded-full opacity-[0.02] blur-2xl"
            style={{
              background: 'radial-gradient(circle, #10B981 0%, transparent 65%)',
              right: '35%',
              bottom: '30%',
              transform: 'translate(50%, 50%)',
            }}
          />

          {/* Vignette – statisk */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 1200px 800px at 50% 40%, transparent 50%, rgba(0,0,0,0.02) 100%)',
            }}
          />
        </div>
      </div>

      {/* ===== Innehåll (alltid överst) ===== */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Rubrik – Zen Kaku, medium */}
        <h1
          style={{
            fontFamily:
              '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          }}
          className={`
            text-5xl md:text-6xl font-medium text-gray-900 mb-6 tracking-tight
            transition-all duration-1000 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
          `}
        >
          Hur kan vi hjälpa dig?
        </h1>

        {/* Underrubrik – Inter, normal vikt */}
        <p
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          className={`
            text-xl text-gray-600 mb-12 max-w-2xl mx-auto
            transition-all duration-1000 delay-200 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
          `}
        >
          Vi är här för att svara på dina frågor och guida dig rätt – oavsett om du söker jobb eller vill anlita personal.
        </p>

        {/* Knappar */}
        <div
          className={`
            flex flex-wrap justify-center gap-6
            transition-all duration-1000 delay-300 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
          `}
        >
          {/* Kandidat */}
          <button
            onClick={() => setUserType('candidate')}
            className={`
              group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white text-lg font-medium tracking-wide transition-all duration-200 min-w-[220px]
            `}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            <span className="btn-hero-bg absolute inset-0 rounded-xl" />
            <User size={22} className="relative z-10" />
            <span className="relative z-10">Jag söker jobb</span>
          </button>

          {/* Företag */}
          <button
            onClick={() => setUserType('company')}
            className={`
              group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white text-lg font-medium tracking-wide transition-all duration-200 min-w-[220px]
            `}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            <span className="btn-hero-bg absolute inset-0 rounded-xl" />
            <Building size={22} className="relative z-10" />
            <span className="relative z-10">Jag representerar företag</span>
          </button>
        </div>
      </div>

      {/* Hero-knapp-stil */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@400;500&family=Inter:wght@400;500&display=swap');

        .btn-hero-bg {
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.10)), #0B274D;
          box-shadow: 0 10px 24px rgba(11,39,77,0.32);
          border: 1px solid rgba(255,255,255,0.15);
          transition: all .2s ease;
        }
        button:hover > .btn-hero-bg { 
          background: linear-gradient(180deg, rgba(255,255,255,0.07), rgba(0,0,0,0.12)), #123B7A; 
          box-shadow: 0 14px 32px rgba(18,59,122,0.38); 
        }
        button:active > .btn-hero-bg { 
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.24), 0 8px 22px rgba(11,39,77,0.26); 
        }
      `}</style>
    </section>
  );
};

export default ContactHeroSection;

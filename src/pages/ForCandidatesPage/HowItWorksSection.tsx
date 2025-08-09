import React from 'react';
import { Search, UserCheck, Briefcase, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  isVisible: boolean;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ isVisible }) => {
  const steps = [
    { icon: Search, title: 'Steg 1 – Sök & Välj', description: 'Utforska roller som matchar dina mål och intressen.', number: '01' },
    { icon: UserCheck, title: 'Steg 2 – Matchning & Intervjuer', description: 'Vi matchar din profil, genomför intervjuer och presenterar dig sedan för arbetsgivaren.', number: '02' },
    { icon: Briefcase, title: 'Steg 3 – Starta Ditt Nya Jobb', description: 'Acceptera erbjudandet och kickstarta nästa kapitel.', number: '03' },
  ];

  return (
    <section
      className="relative py-28 px-6 overflow-hidden text-black"
      aria-label="Så går det till"
      style={{
        background:
          `radial-gradient(1200px 600px at -10% -20%, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.00) 60%),
           radial-gradient(900px 700px at 115% 0%, rgba(16,185,129,0.16) 0%, rgba(16,185,129,0.00) 55%),
           radial-gradient(1000px 700px at 50% 120%, rgba(99,102,241,0.14) 0%, rgba(99,102,241,0.00) 65%),
           linear-gradient(180deg, #f1f7ff 0%, #eefaff 45%, #f0fff8 100%)`,
      }}
    >
      {/* =================== BAKGRUND =================== */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtil bas (svagt kallt ljus) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(90rem 60rem at 50% 10%, rgba(255,255,255,0.9), rgba(241,247,255,0.75) 40%, rgba(241,247,255,0.6) 60%, transparent 85%)',
          }}
        />

        {/* ABSTRACT SMOKE RIBBON (#08132B) */}
        <svg className="absolute inset-0" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <defs>
            {/* Fadar ut kanter och ändar */}
            <linearGradient id="fadeX" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="12%" stopColor="white" stopOpacity="1" />
              <stop offset="88%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="ribbonMask">
              <rect x="0" y="0" width="1440" height="900" fill="url(#fadeX)" />
            </mask>

            {/* Brus + displacement för organisk rök-känsla */}
            <filter id="ribbonNoise" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.0025" numOctaves="3" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="60" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="16" />
            </filter>
          </defs>

          {/* Yttre dimma (glow) */}
          <g mask="url(#ribbonMask)" style={{ mixBlendMode: 'multiply' }}>
            <path
              d="M -120 620 C 200 520, 520 520, 820 600 C 1060 660, 1260 720, 1560 620"
              fill="none"
              stroke="#08132B"
              strokeOpacity="0.20"
              strokeWidth="180"
              strokeLinecap="round"
              filter="url(#softGlow)"
            />

            {/* Huvudband */}
            <g filter="url(#ribbonNoise)">
              <path
                d="M -100 620 C 220 520, 540 520, 840 600 C 1080 660, 1280 720, 1580 620"
                fill="none"
                stroke="#08132B"
                strokeOpacity="0.45"
                strokeWidth="90"
                strokeLinecap="round"
              />
              {/* Inre highlight för bandkänsla */}
              <path
                d="M -100 620 C 220 520, 540 520, 840 600 C 1080 660, 1280 720, 1580 620"
                fill="none"
                stroke="#08132B"
                strokeOpacity="0.85"
                strokeWidth="26"
                strokeLinecap="round"
                filter="url(#softGlow)"
              />
            </g>

            {/* Andra bandet (offset för djup) */}
            <g filter="url(#ribbonNoise)" opacity="0.4">
              <path
                d="M -200 730 C 140 640, 460 620, 760 700 C 1000 760, 1200 820, 1500 720"
                fill="none"
                stroke="#08132B"
                strokeWidth="110"
                strokeLinecap="round"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* =================== CONNECTOR-LINJE mellan kort (diskret) =================== */}
      <svg className="pointer-events-none absolute left-1/2 top-[290px] z-0 h-[220px] w-[1400px] -translate-x-1/2 opacity-70" viewBox="0 0 1400 220" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(14,165,233,0.45)" />
            <stop offset="50%" stopColor="rgba(99,102,241,0.55)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.45)" />
          </linearGradient>
        </defs>
        <path d="M 20 120 C 320 20, 1080 200, 1380 120" stroke="url(#pathGradient)" strokeWidth="4" fill="none" strokeDasharray="10 14" style={{ animation: isVisible ? 'dashFlow 22s linear infinite' : 'none' }} />
      </svg>

      {/* =================== INNEHÅLL =================== */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Så Går Det Till</h2>
          <p className="mt-3 text-black/60 max-w-2xl mx-auto">En tydlig process från ansökan till anställning – enkelt och professionellt.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="group relative" style={{ perspective: '1000px' }}>
                {/* Gradient-ram */}
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-sky-400/60 via-indigo-500/60 to-emerald-400/60 opacity-80 blur-md transition-all duration-500 group-hover:opacity-100" />

                {/* Kort */}
                <div className="relative rounded-3xl bg-white/75 backdrop-blur-xl ring-1 ring-black/5 shadow-xl px-6 pt-8 pb-7 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
                  {/* Ikon */}
                  <div className="relative mx-auto -mt-14 mb-4 w-20 h-20">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-sky-500 via-indigo-600 to-fuchsia-600 opacity-80 ${isVisible ? 'animate-pulseSoft' : ''}`} />
                    <div className="absolute -inset-2 rounded-full bg-white/40 blur-2xl" />
                    <div className="relative grid place-items-center w-full h-full rounded-full bg-gradient-to-br from-sky-600 to-indigo-700 text-white shadow-lg ring-2 ring-white/30">
                      <Icon size={28} />
                    </div>
                  </div>

                  <div className="mx-auto mb-2 w-fit rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-black/70">{step.number}</div>

                  <h3 className="text-lg font-semibold text-black text-center mb-2">{step.title}</h3>
                  <p className="text-black/80 text-sm leading-relaxed text-center max-w-xs mx-auto">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => {
              const el = document.getElementById('featured-jobs');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-sky-600 via-indigo-600 to-fuchsia-600 shadow-lg shadow-indigo-200/40 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Bläddra bland jobben ovan
            <ArrowRight size={18} />
            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <span className="absolute left-[-50%] top-0 h-full w-1/3 bg-white/30 skew-x-[-20deg] animate-sheen" />
            </span>
          </button>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes dashFlow { to { stroke-dashoffset: -1000; } }
        @keyframes sheen { from { transform: translateX(-120%) skewX(-20deg);} to { transform: translateX(220%) skewX(-20deg);} }
        @keyframes pulseSoft { 0%, 100% { transform: scale(1); filter: blur(0px); opacity: .9;} 50% { transform: scale(1.06); filter: blur(2px); opacity: 1; } }
      `}</style>
    </section>
  );
};

export default HowItWorksSection;

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
      {/* =================== NY BAKGRUND: Layered waves + diagonal band + pattern =================== */}
      <div aria-hidden className="absolute inset-0 -z-20 pointer-events-none">
        

        {/* Diagonal "ribbon" genom sektionen */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-56 -rotate-3 rounded-[32px] transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'linear-gradient(90deg, rgba(2,132,199,0.10) 0%, rgba(99,102,241,0.12) 50%, rgba(16,185,129,0.10) 100%)',
            boxShadow: '0 20px 60px rgba(15, 23, 42, 0.08) inset, 0 1px 0 rgba(255,255,255,0.6) inset',
          }}
        />

        {/* Subtilt prickmönster (maskat så det bara syns i mitten) */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(rgba(15,23,42,0.08) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
            maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          }}
        />

        {/* TOP waves */}
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[160%] h-[240px]" viewBox="0 0 1440 240" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(14,165,233,0.18)" />
              <stop offset="50%" stopColor="rgba(99,102,241,0.20)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0.18)" />
            </linearGradient>
          </defs>
          <path d="M0,140 C180,90 360,170 540,130 C720,90 900,150 1080,120 C1260,90 1350,110 1440,100 L1440,0 L0,0 Z" fill="url(#waveTopGrad)" opacity="0.55" />
          <path d="M0,170 C200,120 380,190 560,150 C740,110 920,170 1100,140 C1280,110 1360,130 1440,120 L1440,0 L0,0 Z" fill="url(#waveTopGrad)" opacity="0.35" />
          <path d="M0,200 C220,150 400,210 580,170 C760,130 940,190 1120,160 C1300,130 1370,150 1440,140 L1440,0 L0,0 Z" fill="url(#waveTopGrad)" opacity="0.22" />
        </svg>

        {/* BOTTOM waves */}
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160%] h-[260px]" viewBox="0 0 1440 260" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveBottomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.18)" />
              <stop offset="50%" stopColor="rgba(14,165,233,0.20)" />
              <stop offset="100%" stopColor="rgba(99,102,241,0.18)" />
            </linearGradient>
          </defs>
          <path d="M0,120 C180,160 360,100 540,140 C720,180 900,120 1080,150 C1260,180 1350,160 1440,170 L1440,260 L0,260 Z" fill="url(#waveBottomGrad)" opacity="0.55" />
          <path d="M0,90 C200,130 380,70 560,110 C740,150 920,90 1100,120 C1280,150 1360,130 1440,140 L1440,260 L0,260 Z" fill="url(#waveBottomGrad)" opacity="0.32" />
          <path d="M0,60 C220,100 400,40 580,80 C760,120 940,60 1120,90 C1300,120 1370,100 1440,110 L1440,260 L0,260 Z" fill="url(#waveBottomGrad)" opacity="0.20" />
        </svg>

        {/* Grain/struktur för mer "taktkänsla" */}
        <svg className="absolute inset-0 mix-blend-multiply opacity-[0.06]" aria-hidden>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* =================== CONNECTOR-LINJE mellan kort (diskret) =================== */}
      <svg className="pointer-events-none absolute left-1/2 top-[290px] -z-10 h-[220px] w-[1400px] -translate-x-1/2 opacity-70" viewBox="0 0 1400 220" preserveAspectRatio="none" aria-hidden>
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
      <div className="relative max-w-6xl mx-auto">
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

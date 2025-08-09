import React from 'react';
import { Search, UserCheck, Briefcase, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  isVisible: boolean;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ isVisible }) => {
  const steps = [
    {
      icon: Search,
      title: 'Steg 1 – Sök & Välj',
      description: 'Utforska roller som matchar dina mål och intressen.',
      number: '01',
    },
    {
      icon: UserCheck,
      title: 'Steg 2 – Matchning & Intervjuer',
      description:
        'Vi matchar din profil, genomför intervjuer och presenterar dig sedan för arbetsgivaren.',
      number: '02',
    },
    {
      icon: Briefcase,
      title: 'Steg 3 – Starta Ditt Nya Jobb',
      description: 'Acceptera erbjudandet och kickstarta nästa kapitel.',
      number: '03',
    },
  ];

  return (
    <section
      className="relative py-28 px-6 overflow-hidden bg-white text-black"
      aria-label="Så går det till"
    >
      {/* ===== BG LAGER: Aurora + Conic orbs + rutnät ===== */}
      <div aria-hidden className="absolute inset-0 -z-20 pointer-events-none">
        {/* Mjuk basgradient med animerad skiftning */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'linear-gradient(120deg, #f9fbff 0%, #f5fbff 45%, #f6fff9 100%)',
          }}
        />

        {/* Conic aurora-orbs (roterar långsamt) */}
        <div
          className="absolute -top-64 -left-40 w-[60rem] h-[60rem] rounded-full blur-3xl opacity-70"
          style={{
            background:
              'conic-gradient(from 180deg at 50% 50%, rgba(14,165,233,0.35), rgba(99,102,241,0.35), rgba(16,185,129,0.30), rgba(14,165,233,0.35))',
            animation: 'rotateSlow 60s linear infinite',
          }}
        />
        <div
          className="absolute -bottom-72 -right-56 w-[70rem] h-[70rem] rounded-full blur-3xl opacity-60"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, rgba(16,185,129,0.25), rgba(14,165,233,0.35), rgba(99,102,241,0.35), rgba(16,185,129,0.25))',
            animation: 'rotateSlow 70s linear infinite reverse',
          }}
        />

        {/* Diskret rutnät maskat för att inte dominera */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            maskImage: 'radial-gradient(90rem 70rem at 50% 45%, black, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(90rem 70rem at 50% 45%, black, transparent 80%)',
          }}
        />
      </div>

      {/* ===== DEKOR: Kurvad kopplingslinje mellan stegen (SVG) ===== */}
      <svg
        className="pointer-events-none absolute left-1/2 top-[290px] -z-10 h-[260px] w-[1400px] -translate-x-1/2 opacity-80"
        viewBox="0 0 1400 260"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(14,165,233,0.45)" />
            <stop offset="50%" stopColor="rgba(99,102,241,0.55)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.45)" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Glow-bas */}
        <path
          d="M 20 140 C 320 40, 1080 240, 1380 140"
          stroke="url(#pathGradient)"
          strokeWidth="10"
          fill="none"
          opacity="0.25"
          filter="url(#glow)"
        />
        {/* Animerad dash ovanpå */}
        <path
          d="M 20 140 C 320 40, 1080 240, 1380 140"
          stroke="url(#pathGradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="8 12"
          style={{ animation: isVisible ? 'dashFlow 18s linear infinite' : 'none' }}
        />
      </svg>

      {/* ===== CONTENT ===== */}
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Så Går Det Till</h2>
          <p className="mt-3 text-black/60 max-w-2xl mx-auto">
            En tydlig process från ansökan till anställning – enkelt och professionellt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group relative"
                style={{ perspective: '1000px' }}
              >
                {/* Gradient-ram (skimmer på hover) */}
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-sky-400/60 via-indigo-500/60 to-emerald-400/60 opacity-80 blur-md transition-all duration-500 group-hover:opacity-100" />

                {/* Kort: glassmorphism */}
                <div className="relative rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-black/5 shadow-xl px-6 pt-8 pb-7 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl" style={{ transform: 'rotateX(0deg) rotateY(0deg)' }}>
                  {/* Ikon + pulserande ring */}
                  <div className="relative mx-auto -mt-14 mb-4 w-20 h-20">
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br from-sky-500 via-indigo-600 to-fuchsia-600 opacity-80 ${
                        isVisible ? 'animate-pulseSoft' : ''
                      }`}
                    />
                    <div className="absolute -inset-2 rounded-full bg-white/40 blur-2xl" />
                    <div className="relative grid place-items-center w-full h-full rounded-full bg-gradient-to-br from-sky-600 to-indigo-700 text-white shadow-lg ring-2 ring-white/30">
                      <Icon size={28} className="" />
                    </div>
                  </div>

                  {/* Liten nummer-tag */}
                  <div className="mx-auto mb-2 w-fit rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-black/70">
                    {step.number}
                  </div>

                  <h3 className="text-lg font-semibold text-black text-center mb-2">
                    {step.title}
                  </h3>
                  <p className="text-black/80 text-sm leading-relaxed text-center max-w-xs mx-auto">
                    {step.description}
                  </p>

                  {/* Shine-effekt vid hover */}
                  <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                    <span className="absolute -left-1/3 top-0 h-full w-1/3 translate-x-[-120%] skew-x-[-20deg] bg-white/25 opacity-0 group-hover:opacity-100 group-hover:animate-sheen" />
                  </span>
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

      {/* ===== EXTRA: mjuk bottenvignette så sektionen "dör ut" snyggt ===== */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(80rem 10rem at 50% 140%, rgba(2,6,23,0.15), transparent 70%)',
        }}
      />

      {/* Lokala keyframes för animationer */}
      <style>{`
        @keyframes rotateSlow { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        @keyframes dashFlow { to { stroke-dashoffset: -1000; } }
        @keyframes sheen { from { transform: translateX(-120%) skewX(-20deg);} to { transform: translateX(220%) skewX(-20deg);} }
        @keyframes pulseSoft { 0%, 100% { transform: scale(1); filter: blur(0px); opacity: .9;} 50% { transform: scale(1.06); filter: blur(2px); opacity: 1; } }
      `}</style>
    </section>
  );
};

export default HowItWorksSection;

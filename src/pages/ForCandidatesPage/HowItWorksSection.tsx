import React from 'react';
import { Search, UserCheck, Briefcase } from 'lucide-react';

interface HowItWorksSectionProps {
  isVisible: boolean;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ isVisible }) => {
  const steps = [
    {
      icon: Search,
      title: 'Steg 1 – Sök & Välj',
      description: 'Utforska roller som matchar dina mål och intressen.',
    },
    {
      icon: UserCheck,
      title: 'Steg 2 – Matchning & Intervjuer',
      description:
        'Vi matchar din profil, genomför intervjuer och presenterar dig sedan för arbetsgivaren.',
    },
    {
      icon: Briefcase,
      title: 'Steg 3 – Starta Ditt Nya Jobb',
      description: 'Acceptera erbjudandet och kickstarta nästa kapitel.',
    },
  ];

  return (
    <section
      className="relative py-24 px-8 overflow-hidden bg-white"
      aria-label="Så går det till"
    >
      {/* ===== Lager 1: Mjuk aurora-gradient (maskad för djup) ===== */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        {/* Basljus + aurora-toner */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(120deg, #f9fbff 0%, #f7fff9 35%, #f6fbff 100%)',
          }}
        />

        {/* Aurora-bubblor (blur för mjukhet) */}
        <div className="absolute -top-40 -right-32 w-[52rem] h-[52rem] rounded-full blur-3xl bg-gradient-to-br from-sky-300/35 via-indigo-300/25 to-emerald-300/25" />
        <div className="absolute -bottom-48 -left-40 w-[60rem] h-[60rem] rounded-full blur-3xl bg-gradient-to-tr from-emerald-300/25 via-cyan-300/20 to-indigo-300/20" />

        {/* Maskad highlight upptill för fokus mot innehållet */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(80rem 40rem at 50% 6%, rgba(255,255,255,0.9), rgba(255,255,255,0.4) 60%, transparent 70%)',
          }}
        />
      </div>

      {/* ===== Lager 2: Diskret rutnät (professionell tech-känsla) ===== */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(11,39,77,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,39,77,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(80rem 60rem at 50% 40%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(80rem 60rem at 50% 40%, black, transparent 80%)',
        }}
      />

      {/* ===== Lager 3: Diagonala gradient-linjer (visas när sektionen är i view) ===== */}
      <div
        aria-hidden
        className={`absolute -left-1/3 top-1/4 w-[140%] h-40 -rotate-3 pointer-events-none transition-opacity duration-700 motion-safe:duration-700 ${
          isVisible ? 'opacity-[0.12]' : 'opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(90deg, rgba(11,39,77,0) 0%, rgba(11,39,77,0.18) 25%, rgba(11,39,77,0.18) 75%, rgba(11,39,77,0) 100%)',
          filter: 'blur(8px)',
        }}
      />
      <div
        aria-hidden
        className={`absolute -right-1/3 bottom-1/4 w-[140%] h-40 rotate-3 pointer-events-none transition-opacity duration-700 motion-safe:duration-700 ${
          isVisible ? 'opacity-[0.10]' : 'opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(90deg, rgba(2,132,199,0) 0%, rgba(2,132,199,0.16) 25%, rgba(2,132,199,0.16) 75%, rgba(2,132,199,0) 100%)',
          filter: 'blur(10px)',
        }}
      />

      {/* ===== Lager 4: Subtil vignette längst ned för att rama in sektionen ===== */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(120rem 80rem at 50% 110%, rgba(8,19,43,0.10), transparent 60%)',
          opacity: 0.18,
        }}
      />

      {/* ===== Innehåll ===== */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-black tracking-tight">
            Så Går Det Till
          </h2>
          <p className="mt-3 text-black/60 max-w-2xl mx-auto">
            En tydlig process från ansökan till anställning – enkelt och professionellt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                {/* Ikon med subtil gradientring (professionell touch) */}
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/50 via-indigo-400/40 to-fuchsia-400/40 blur-xl" />
                  <div className="relative w-16 h-16 rounded-full bg-white shadow-sm ring-1 ring-black/5 grid place-items-center mx-auto">
                    <div className="absolute inset-[-2px] rounded-full bg-gradient-to-br from-blue-500 to-purple-600 -z-10" />
                    <Icon size={24} className="text-white relative z-10" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-black mb-3">{step.title}</h3>
                <p className="text-black text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Text Row */}
        <div className="text-center">
          <p className="text-lg text-black">
            Redo?{' '}
            <button
              onClick={() => {
                const el = document.getElementById('featured-jobs');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-bold text-black hover:opacity-70 transition-opacity underline"
            >
              Bläddra bland jobben ovan.
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

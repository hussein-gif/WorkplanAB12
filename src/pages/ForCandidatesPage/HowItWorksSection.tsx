import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  isVisible: boolean;
}

type PieceKind = 'arrow-right' | 'socket-left' | 'both';

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ isVisible }) => {
  const steps: Array<{
    number: string;
    title: string;
    description: string; // underrubrik
    kind: PieceKind;
  }> = [
    { number: '01', title: 'Sök & Välj', description: 'Utforska roller som matchar dina mål och intressen.', kind: 'arrow-right' },
    { number: '02', title: 'Matchning & Intervjuer', description: 'Vi matchar din profil, genomför intervjuer och presenterar dig sedan för arbetsgivaren.', kind: 'both' },
    { number: '03', title: 'Starta Ditt Nya Jobb', description: 'Acceptera erbjudandet och kickstarta nästa kapitel.', kind: 'socket-left' },
  ];

  return (
    <section
      className="py-14 md:py-20 px-5 md:px-6 bg-white pt-[calc(1.25rem+env(safe-area-inset-top))]"
      aria-label="Så går det till"
    >
      <div className="max-w-6xl mx-auto">
        {/* Rubrik */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="text-[1.875rem] md:text-4xl font-semibold tracking-tight text-gray-900 leading-tight [text-wrap:balance]"
            style={{ fontFamily: '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui' }}
          >
            Så Går Det Till
          </h2>
          <p
            className="mt-2 md:mt-3 text-[1rem] md:text-base text-gray-600 max-w-xl md:max-w-2xl mx-auto font-medium leading-relaxed"
            style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}
          >
            En tydlig process från ansökan till anställning – enkelt och professionellt.
          </p>
        </div>

        {/* Korten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {steps.map((s, i) => (
            <PosterCard key={i} {...s} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 md:mt-12">
          <button
            onClick={() => {
              const el = document.getElementById('featured-jobs');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium text-white shadow-[0_10px_30px_rgba(2,6,23,0.35)] ring-1 ring-white/10 hover:brightness-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
            style={{
              fontFamily:
                'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
              background:
                'linear-gradient(135deg, #0B1E3A 0%, #10325C 60%, #14427A 100%)',
            }}
          >
            Bläddra bland jobben ovan
            <ArrowRight size={18} />
            <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-60">
              <span
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `radial-gradient(220px 160px at 20% 30%, rgba(56,189,248,0.28), transparent 60%), radial-gradient(260px 200px at 80% 70%, rgba(37,99,235,0.22), transparent 60%)`,
                }}
              />
              <span className="absolute left-[-40%] top-0 h-full w-1/3 bg-white/20 skew-x-[-20deg] translate-x-[-120%] group-hover:translate-x-[220%] transition-transform duration-700 ease-in-out" />
            </span>
          </button>
        </div>
      </div>

      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Zen+Kaku+Gothic+Antique:wght@500;600;700;800&display=swap');
      `}</style>
    </section>
  );
};

/* ====== PosterCard ====== */

type CardProps = {
  number: string;
  title: string;
  description: string;
  kind: PieceKind;
  index?: number;
};

const PosterCard: React.FC<CardProps> = ({ number, title, description }) => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl md:rounded-3xl h-[260px] md:h-[420px] border backdrop-blur-xl touch-manipulation"
      style={{
        /* 👇 behåller originalfärger */
        background: 'linear-gradient(180deg, rgba(10,20,46,0.72) 0%, rgba(8,19,43,0.88) 100%)',
        borderColor: 'rgba(255,255,255,0.08)',
        boxShadow:
          '0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -40px 80px rgba(9,31,72,0.55)',
      }}
    >
      {/* Aurora (endast desktop) */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div
          className="hidden md:block absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              radial-gradient(700px 520px at 20% 25%, rgba(20,90,165,0.45), transparent 60%),
              radial-gradient(620px 460px at 80% 80%, rgba(23,121,186,0.35), transparent 55%),
              radial-gradient(900px 700px at 60% 20%, rgba(10,24,52,0.7), transparent 55%)
            `,
          }}
        />
        <div
          className="hidden md:block absolute -left-24 bottom-6 w-[420px] h-[280px] rounded-[160px] blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(32,137,220,0.35), rgba(16,85,165,0.28), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)',
          }}
        />
      </div>

      {/* Innehåll */}
      <div className="relative z-[1] h-full flex flex-col">
        <div className="px-6 pt-6 md:px-7 md:pt-7">
          <h3
            className="text-[1.35rem] md:text-3xl font-bold tracking-tight text-white leading-[1.1]"
            style={{ fontFamily: '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui' }}
          >
            {title}
          </h3>
          <p
            className="mt-2 md:mt-3 text-[0.95rem] md:text-sm text-slate-200/90 max-w-[92%] font-medium leading-relaxed"
            style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}
          >
            {description}
          </p>
          <div className="mt-4 md:mt-5 border-t border-white/15" />
        </div>

        {/* Stor siffra */}
        <div className="relative flex-1">
          <span
            aria-hidden
            className="pointer-events-none select-none absolute bottom-[-4px] left-5 md:left-6 text-white/95 leading-none font-extrabold tracking-tight"
            style={{
              fontFamily: '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui',
              fontSize: 'clamp(84px, 16vw, 120px)',
              WebkitTextStroke: '1px rgba(255,255,255,0.06)',
              textShadow:
                '0 10px 24px rgba(0,0,0,0.25), 0 2px 24px rgba(32,137,220,0.12)',
            }}
          >
            {number.replace(/^0/, '')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;

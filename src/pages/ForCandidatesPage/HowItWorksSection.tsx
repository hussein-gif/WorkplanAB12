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
    <section className="bg-white py-20 px-6" aria-label="Så går det till">
      <div className="max-w-6xl mx-auto">
        {/* Rubrik */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900"
            style={{ fontFamily: '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui' }}
          >
            Så Går Det Till
          </h2>
          <p
            className="mt-3 text-gray-600 max-w-2xl mx-auto font-medium"
            style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}
          >
            En tydlig process från ansökan till anställning – enkelt och professionellt.
          </p>
        </div>

        {/* Korten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <PosterCard key={i} {...s} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              const el = document.getElementById('featured-jobs');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative inline-flex items-center gap-2 px-7 py-3 rounded-2xl font-semibold text-white transition-all duration-300 focus:outline-none"
            style={{
              fontFamily: 'Inter, ui-sans-serif, system-ui',
              background: 'linear-gradient(145deg, #0A1A38, #14427A)',
              boxShadow:
                '0 8px 20px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.1)',
            }}
          >
            Bläddra bland jobben ovan
            <ArrowRight size={18} />
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

/* ====== PosterCard – mörk navy glass + aurora i blå toner ====== */

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
      className="relative overflow-hidden rounded-3xl h-[360px] md:h-[420px] border backdrop-blur-xl"
      style={{
        background: 'linear-gradient(180deg, rgba(10,20,46,0.75) 0%, rgba(8,19,43,0.88) 100%)',
        borderColor: 'rgba(255,255,255,0.08)',
        boxShadow:
          '0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -40px 80px rgba(9,31,72,0.55)',
      }}
    >
      {/* Aurora bakgrund */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              radial-gradient(700px 520px at 20% 25%, rgba(20,90,165,0.45), transparent 60%),
              radial-gradient(620px 460px at 80% 80%, rgba(23,121,186,0.35), transparent 55%)
            `,
          }}
        />
        <div
          className="absolute -left-24 bottom-6 w-[420px] h-[280px] rounded-[160px] blur-3xl"
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
        <div className="px-7 pt-7">
          <h3
            className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-[1.15]"
            style={{ fontFamily: '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui' }}
          >
            {title}
          </h3>
          <p
            className="mt-3 text-xs md:text-sm text-slate-200/85 max-w-[88%] font-medium"
            style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}
          >
            {description}
          </p>
          <div className="mt-5 border-t border-white/15" />
        </div>

        {/* Stor siffra */}
        <div className="relative flex-1">
          <span
            aria-hidden
            className="pointer-events-none select-none absolute bottom-[-10px] left-6 text-white/95 leading-none font-extrabold tracking-tight"
            style={{
              fontFamily: '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui',
              fontSize: 'clamp(120px, 18vw, 200px)',
              WebkitTextStroke: '1px rgba(255,255,255,0.06)',
              textShadow:
                '0 10px 30px rgba(0,0,0,0.35), 0 2px 30px rgba(32,137,220,0.15)',
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

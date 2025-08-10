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
    {
      number: '01',
      title: 'Sök & Välj',
      description: 'Utforska roller som matchar dina mål och intressen.',
      kind: 'arrow-right',
    },
    {
      number: '02',
      title: 'Matchning & Intervjuer',
      description:
        'Vi matchar din profil, genomför intervjuer och presenterar dig sedan för arbetsgivaren.',
      kind: 'both',
    },
    {
      number: '03',
      title: 'Starta Ditt Nya Jobb',
      description: 'Acceptera erbjudandet och kickstarta nästa kapitel.',
      kind: 'socket-left',
    },
  ];

  return (
    <section className="bg-white py-20 px-6" aria-label="Så går det till">
      <div className="max-w-6xl mx-auto">
        {/* Rubrik */}
        <div className="text-center mb-12">
          <h2 className=\"text-3xl md:text-4xl font-medium tracking-tight text-gray-900\" style={{ fontFamily: '\"Zen Kaku Gothic Antique\", ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial' }}>Så Går Det Till</h2>
          <p className=\"mt-3 text-gray-600 max-w-2xl mx-auto font-medium\" style={{ fontFamily: '\"Inter\", ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial' }}>
            En tydlig process från ansökan till anställning – enkelt och professionellt.
          </p>
        </div>

        {/* Korten – posterkänsla med kreativ bakgrund */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <PosterCard key={i} {...s} index={i} />
          ))}
        </div>

        {/* CTA (oförändrad) */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              const el = document.getElementById('featured-jobs');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-white bg-gray-900 hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Bläddra bland jobben ovan
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Små keyframes för subtil rörelse (väldigt mild) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Zen+Kaku+Gothic+Antique:wght@500;700;800&display=swap');
        @keyframes softMove { 0%,100%{ transform: translate3d(0,0,0) } 50%{ transform: translate3d(4px,-6px,0) } } 50%{ transform: translate3d(4px,-6px,0) } }
      `}</style>
    </section>
  );
};

/* ====== PosterCard – frostat glas + kreativ bakgrund (inspirerat av 1 & 4) ====== */

type CardProps = {
  number: string;
  title: string;
  description: string;
  kind: PieceKind; // kvar för kompatibilitet
  index?: number;
};

const PosterCard: React.FC<CardProps> = ({ number, title, description, index = 0 }) => {
  const variant: 'aurora' = 'aurora';

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.18)] h-[360px] md:h-[420px]">
      {/* Bakgrundskonst */}
      {variant === 'aurora' ? (
        <div className="absolute inset-0 -z-0">
          {/* Basglow – djup blå/cyan våg */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(700px 500px at 20% 25%, rgba(37,99,235,0.55), transparent 60%),\
                 radial-gradient(600px 420px at 80% 80%, rgba(56,189,248,0.45), transparent 55%),\
                 radial-gradient(900px 700px at 60% 20%, rgba(12,18,28,0.7), transparent 55%)',
            }}
          />
          {/* Böljande blob utan mask (kompatibel TSX) */}
          <div
            className="absolute -left-24 bottom-6 w-[420px] h-[280px] rounded-[160px] opacity-70 blur-3xl"
            style={{
              backgroundImage:
                'radial-gradient(closest-side, rgba(56,189,248,0.7), rgba(37,99,235,0.45), transparent 70%)',
            }}
          />
          {/* Svag vignett för kontrast */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)',
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 -z-0">
          {/* Kraftig blå glöd från vänster */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(900px 700px at -5% 50%, rgba(59,130,246,0.75), transparent 60%),\
                 radial-gradient(700px 500px at 15% 20%, rgba(147,197,253,0.35), transparent 55%)',
            }}
          />
          {/* Mjuk svart panel som rundar av glöden */}
          <div className="absolute inset-3 rounded-[26px] bg-gradient-to-b from-black/60 to-black/80" />
          {/* Lätt yttervignett */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)',
            }}
          />
        </div>
      )}

      {/* Innehåll */}
      <div className="relative z-[1] h-full flex flex-col">
        {/* Titel + underrubrik */}
        <div className="px-7 pt-7">
          <h3 className=\"text-2xl md:text-3xl font-bold tracking-tight text-white leading-[1.15]\" style={{ fontFamily: '\"Zen Kaku Gothic Antique\", ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial' }}>
            {title}
          </h3>
          <p className=\"mt-3 text-xs md:text-sm text-white/80 max-w-[88%] font-medium\" style={{ fontFamily: '\"Inter\", ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial' }}>
            {description}
          </p>
          <div className="mt-5 border-t border-white/15" />
        </div>

        {/* Stor siffra i botten */}
        <div className="relative flex-1">
          <span
            aria-hidden
            className=\"pointer-events-none select-none absolute bottom-[-10px] left-6 text-white/95 leading-none font-extrabold tracking-tight text-[140px] md:text-[200px]\" style={{ fontFamily: '\"Zen Kaku Gothic Antique\", ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial' }}
          >
            {number.replace(/^0/, '')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;

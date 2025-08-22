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
      className="py-20 px-6"
      aria-label="Så går det till"
      style={{
        // Djup marin bakgrund med subtilt diagonalt skimmer
        background:
          'linear-gradient(160deg, #08132B 0%, #0A1A38 55%, #0B2049 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Rubrik */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-tight text-white"
            style={{ fontFamily: '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
          >
            Så Går Det Till
          </h2>
          <p
            className="mt-3 text-slate-300 max-w-2xl mx-auto font-medium"
            style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
          >
            En tydlig process från ansökan till anställning – enkelt och professionellt.
          </p>
        </div>

        {/* Korten – polerad navy-glass med blå aurora som matchar temat */}
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
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium text-white shadow-[0_10px_30px_rgba(2,6,23,0.35)] ring-1 ring-white/10 hover:brightness-[1.07] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
            style={{
              fontFamily:
                'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
              // Knappens gradient i samma familj som bakgrunden, med diskret glöd
              background:
                'linear-gradient(135deg, #0B1E3A 0%, #10325C 60%, #14427A 100%)',
            }}
          >
            Bläddra bland jobben ovan
            <ArrowRight size={18} />
            {/* Soft highlight/shine som rör sig över knappen */}
            <span className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
              <span
                className="absolute left-[-40%] top-0 h-full w-1/3 bg-white/15 skew-x-[-20deg] translate-x-[-120%] group-hover:translate-x-[220%] transition-transform duration-700 ease-in-out"
              />
              <span
                className="absolute inset-0 rounded-2xl"
                style={{
                  boxShadow:
                    'inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 -20px 40px rgba(20,66,122,0.35)',
                }}
              />
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

/* ====== PosterCard – mörk navy glass + aurora i blå toner ====== */

type CardProps = {
  number: string;
  title: string;
  description: string;
  kind: PieceKind; // kvar för kompatibilitet
  index?: number;
};

const PosterCard: React.FC<CardProps> = ({ number, title, description }) => {
  return (
    <div
      className="relative overflow-hidden rounded-3xl h-[360px] md:h-[420px] border backdrop-blur-xl"
      style={{
        // Semi-transparent glas på marin bakgrund
        background: 'linear-gradient(180deg, rgba(10,20,46,0.72) 0%, rgba(8,19,43,0.78) 100%)',
        borderColor: 'rgba(255,255,255,0.08)',
        boxShadow:
          '0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -40px 80px rgba(9,31,72,0.55)',
      }}
    >
      {/* Bakgrund – Aurora-blend i nyanser av blå som passar #08132B */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              radial-gradient(700px 520px at 20% 25%, rgba(20,90,165,0.45), transparent 60%),
              radial-gradient(620px 460px at 80% 80%, rgba(23,121,186,0.35), transparent 55%),
              radial-gradient(900px 700px at 60% 20%, rgba(10,24,52,0.7), transparent 55%)
            `,
          }}
        />
        {/* Subtil kall glöd i hörn för djup */}
        <div
          className="absolute -left-24 bottom-6 w-[420px] h-[280px] rounded-[160px] blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(32,137,220,0.35), rgba(16,85,165,0.28), transparent 70%)',
          }}
        />
        {/* Vignette för fokus */}
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
            style={{ fontFamily: '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
          >
            {title}
          </h3>
          <p
            className="mt-3 text-xs md:text-sm text-slate-200/85 max-w-[88%] font-medium"
            style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}
          >
            {description}
          </p>
          <div
            className="mt-5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
          />
        </div>

        {/* Stor siffra i botten */}
        <div className="relative flex-1">
          <span
            aria-hidden
            className="pointer-events-none select-none absolute bottom-[-10px] left-6 text-white/95 leading-none font-extrabold tracking-tight"
            style={{
              fontFamily:
                '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
              fontSize: 'clamp(120px, 18vw, 200px)',
              // Liten glasreflektion i siffran
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

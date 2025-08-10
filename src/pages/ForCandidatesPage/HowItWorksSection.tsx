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
    description: string; // används som underrubrik
    kind: PieceKind;
  }> = [
    {
      number: '01',
      title: 'Steg 1 – Sök & Välj',
      description: 'Utforska roller som matchar dina mål och intressen.',
      kind: 'arrow-right',
    },
    {
      number: '02',
      title: 'Steg 2 – Matchning & Intervjuer',
      description:
        'Vi matchar din profil, genomför intervjuer och presenterar dig sedan för arbetsgivaren.',
      kind: 'both',
    },
    {
      number: '03',
      title: 'Steg 3 – Starta Ditt Nya Jobb',
      description: 'Acceptera erbjudandet och kickstarta nästa kapitel.',
      kind: 'socket-left',
    },
  ];

  return (
    <section className="bg-white py-20 px-6" aria-label="Så går det till">
      <div className="max-w-6xl mx-auto">
        {/* Rubrik */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">Så Går Det Till</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            En tydlig process från ansökan till anställning – enkelt och professionellt.
          </p>
        </div>

        {/* Korten – exakt layout enligt referensen (titel, underrubrik, stor siffra) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <PosterCard key={i} {...s} />
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
    </section>
  );
};

/* ====== PosterCard – svart frostad glas, stor siffra i botten ====== */

type CardProps = {
  number: string;
  title: string; // rubrik
  description: string; // underrubrik
  kind: PieceKind; // behålls för kompatibilitet
};

const PosterCard: React.FC<CardProps> = ({ number, title, description }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.18)] h-[360px] md:h-[420px]">
      {/* Inre innehåll */}
      <div className="h-full flex flex-col">
        {/* Top: rubrik + underrubrik */}
        <div className="px-7 pt-7">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-[1.15]">
            {title}
          </h3>
          <p className="mt-3 text-xs md:text-sm text-white/70 max-w-[90%]">
            {description}
          </p>
          <div className="mt-5 border-t border-white/10" />
        </div>

        {/* Bottom: stor siffra */}
        <div className="relative flex-1">
          <span
            aria-hidden
            className="pointer-events-none select-none absolute bottom-[-12px] left-6 text-white/95 leading-none font-extrabold tracking-tight text-[160px] md:text-[220px]"
          >
            {number.replace(/^0/, '')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;

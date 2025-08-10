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
    description: string;
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

        {/* Korten – enkel, vit, sobert */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <SimpleCard key={i} {...s} />
          ))}
        </div>

        {/* CTA */}
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

/* ====== Enkel kortkomponent ====== */

type CardProps = {
  number: string;
  title: string;
  description: string;
  kind: PieceKind;
};

const SimpleCard: React.FC<CardProps> = ({ number, title, description }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-7 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[11px] font-semibold text-gray-700">
          {number}
        </span>
        <h3 className="text-lg md:text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="mt-3 text-[15px] md:text-base leading-relaxed text-gray-600">{description}</p>
    </div>
  );
};

export default HowItWorksSection;

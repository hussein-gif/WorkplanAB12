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
      className="relative py-24 px-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)' }}
    >
      {/* Mesh (organiska färgfläckar) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(60rem 60rem at -10% 10%, rgba(11,39,77,0.06), transparent 60%),' +
            'radial-gradient(52rem 52rem at 110% 20%, rgba(2,132,199,0.07), transparent 60%),' +
            'radial-gradient(48rem 48rem at 20% 120%, rgba(17,94,89,0.05), transparent 60%)',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Diagonala beams */}
      <div
        aria-hidden
        className={`absolute -left-1/3 top-1/4 w-[140%] h-40 -rotate-3 pointer-events-none transition-opacity duration-700 ${
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
        className={`absolute -right-1/3 bottom-1/4 w-[140%] h-40 rotate-3 pointer-events-none transition-opacity duration-700 ${
          isVisible ? 'opacity-[0.10]' : 'opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(90deg, rgba(2,132,199,0) 0%, rgba(2,132,199,0.16) 25%, rgba(2,132,199,0.16) 75%, rgba(2,132,199,0) 100%)',
          filter: 'blur(10px)',
        }}
      />
      {/* Vignette för fokus i botten */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120rem 80rem at 50% 110%, rgba(8,19,43,0.10), transparent 60%)',
          opacity: 0.18,
        }}
      />

      {/* Content (svart text) */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-black">Så Går Det Till</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon size={24} className="text-white" />
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
              className="font-bold text-black hover:opacity-70 transition-colors underline"
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

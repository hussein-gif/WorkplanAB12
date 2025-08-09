import React from 'react';
import { Search, UserCheck, Briefcase } from 'lucide-react';

interface HowItWorksSectionProps {
  isVisible: boolean;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ isVisible }) => {
  const steps = [
    { icon: Search,     title: 'Steg 1 – Sök & Välj',              description: 'Utforska roller som matchar dina mål och intressen.' },
    { icon: UserCheck,  title: 'Steg 2 – Matchning & Intervjuer',  description: 'Vi matchar din profil, genomför intervjuer och presenterar dig sedan för arbetsgivaren.' },
    { icon: Briefcase,  title: 'Steg 3 – Starta Ditt Nya Jobb',    description: 'Acceptera erbjudandet och kickstarta nästa kapitel.' }
  ];

  return (
    <section className="relative py-24 px-8 bg-white overflow-hidden">
      {/* Background design (lågmäld men levande) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(8,19,43,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(8,19,43,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px, 24px 24px',
          backgroundPosition: '0 0, 0 0',
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-24 -right-24 w-[36rem] h-[36rem] rounded-full blur-3xl transition-opacity duration-700 ${
          isVisible ? 'opacity-60' : 'opacity-40'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(11,39,77,0.10), rgba(11,39,77,0) 60%)',
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -bottom-24 -left-24 w-[40rem] h-[40rem] rounded-full blur-3xl transition-opacity duration-700 ${
          isVisible ? 'opacity-60' : 'opacity-40'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(2,132,199,0.10), rgba(2,132,199,0) 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[120%] h-40 opacity-[0.12] -rotate-2"
        style={{
          background:
            'linear-gradient(90deg, rgba(8,19,43,0) 0%, rgba(8,19,43,0.08) 20%, rgba(8,19,43,0.08) 80%, rgba(8,19,43,0) 100%)',
        }}
      />

      {/* Content (oförändrat) */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-white">
            Så Går Det Till
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Text Row */}
        <div className="text-center">
          <p className="text-lg text-white/80">
            Redo?{' '}
            <button
              onClick={() => {
                const element = document.getElementById('featured-jobs');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-bold text-blue-400 hover:text-blue-300 transition-colors underline"
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

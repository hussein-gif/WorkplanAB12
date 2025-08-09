import React from 'react';
import { Search, UserCheck, Briefcase } from 'lucide-react';

interface HowItWorksSectionProps {
  isVisible: boolean;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  isVisible,
}) => {
  const steps = [
    {
      icon: Search,
      title: 'Steg 1 – Sök & Välj',
      description: 'Utforska roller som matchar dina mål och intressen.'
    },
    {
      icon: UserCheck,
      title: 'Steg 2 – Matchning & Intervjuer',
      description: 'Vi matchar din profil, genomför intervjuer och presenterar dig sedan för arbetsgivaren.'
    },
    {
      icon: Briefcase,
      title: 'Steg 3 – Starta Ditt Nya Jobb',
      description: 'Acceptera erbjudandet och kickstarta nästa kapitel.'
    }
  ];

  return (
    <section className="py-24 px-8">
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
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
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
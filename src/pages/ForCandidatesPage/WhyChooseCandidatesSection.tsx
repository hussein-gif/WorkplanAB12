import React from 'react';
import { Clock, Target, Users } from 'lucide-react';

interface WhyChooseCandidatesSectionProps {
  isVisible: boolean;
}

const WhyChooseCandidatesSection: React.FC<WhyChooseCandidatesSectionProps> = ({
  isVisible,
}) => {
  const benefits = [
    {
      icon: Clock,
      title: 'Rätt jobb – snabbt',
      description: 'Vi matchar dig med uppdrag som passar dina mål och ditt schema. Du får snabb återkoppling.',
      highlight: 'Snabb återkoppling',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Target,
      title: 'Tydliga villkor & trygg lön',
      description: 'Klara avtal, korrekt lön i tid och full transparens genom hela uppdraget.',
      highlight: 'Tryggt & transparent',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Users,
      title: 'Personlig kontakt hela vägen',
      description: 'En dedikerad kontaktperson stöttar dig från ansökan till avslutat uppdrag.',
      highlight: 'Personlig service',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section className="py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-6">
            Därför Väljer Kandidater Oss
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
            >
              <div className={`
                w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} 
                flex items-center justify-center mb-6 mx-auto
              `}>
                <benefit.icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                {benefit.title}
              </h3>
              <p className="text-white/70 leading-relaxed mb-4 text-center">
                {benefit.description}
              </p>
              <div className="text-xs font-medium text-white/50 uppercase tracking-wider text-center">
                {benefit.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseCandidatesSection;
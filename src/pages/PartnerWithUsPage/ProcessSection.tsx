import React from 'react';
import { Phone, Search, UserCheck, Briefcase, Handshake } from 'lucide-react';

interface ProcessSectionProps {
  isVisible: boolean;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ isVisible }) => {
  const steps = [
    { icon: Phone, title: 'Behovsanalys', description: 'Vi kartlägger mål, tidsram och kompetenskrav i ett kort uppstartssamtal.' },
    { icon: Search, title: 'Lösningsförslag', description: 'Ni får ett transparent förslag på bemanningsupplägg, tidsplan och pris.' },
    { icon: UserCheck, title: 'Sökning & urval', description: 'Aktiv search, annonsering vid behov och strukturerade intervjuer/screening.' },
    { icon: Briefcase, title: 'Kandidatpresentation', description: 'En shortlist med matchade kandidater, referenser och våra rekommendationer.' },
    { icon: Handshake, title: 'Start & uppföljning', description: 'Smidig onboarding och regelbunden uppföljning för att säkerställa kvalitet.' }
  ];

  return (
    <section id="how-it-works" className="relative py-24 px-8 overflow-hidden bg-white">
      {/* Background patterns remain unchanged */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}>
            <span style={{ fontWeight: 400 }}>Vår </span>
            <span style={{ fontWeight: 500 }}>Process</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            En tydlig 5-stegsprocess som ger er rätt kompetens – snabbt, tryggt och utan överraskningar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-lg shadow-lg transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{
                transitionDelay: `${index * 150}ms`,
                backgroundColor: 'rgba(30, 41, 59, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Card content modeled on Design #5 */}
              <div>
                {/* Numbered Title */}
                <h3 className="text-white text-xl font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {`0${index + 1}. ${step.title}`}
                </h3>
                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', marginBottom: '1rem' }}>
                  {step.description}
                </p>
              </div>
              {/* Icon at bottom-right */}
              <div className="self-end">
                <step.icon size={24} className="text-white/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

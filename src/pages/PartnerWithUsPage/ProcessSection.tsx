import React from 'react';
import { Phone, Search, UserCheck, Briefcase, Handshake } from 'lucide-react';

interface ProcessSectionProps {
  isVisible: boolean;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ isVisible }) => {
  return (
    <section id="how-it-works" className="py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl text-white mb-6"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 400,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            <span style={{ fontWeight: 400 }}>Vår </span>
            <span style={{ fontWeight: 500 }}>Process</span>
          </h2>
          <p
            className="text-base text-white/70 max-w-2xl mx-auto mt-2"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            En tydlig 5-stegsprocess som ger er rätt kompetens – snabbt, tryggt och utan överraskningar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            {
              icon: Phone,
              title: 'Behovsanalys',
              description: 'Vi kartlägger mål, tidsram och kompetenskrav i ett kort uppstartssamtal.',
            },
            {
              icon: Search,
              title: 'Lösningsförslag',
              description: 'Ni får ett transparent förslag på bemanningsupplägg, tidsplan och pris.',
            },
            {
              icon: UserCheck,
              title: 'Sökning & urval',
              description: 'Aktiv search, annonsering vid behov och strukturerade intervjuer/screening.',
            },
            {
              icon: Briefcase,
              title: 'Kandidatpresentation',
              description: 'En shortlist med matchade kandidater, referenser och våra rekommendationer.',
            },
            {
              icon: Handshake,
              title: 'Start & uppföljning',
              description: 'Smidig onboarding och regelbunden uppföljning för att säkerställa kvalitet.',
            },
          ].map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon size={24} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white font-medium text-xs">
                  {index + 1}
                </div>
              </div>
              <h3
                className="text-lg text-white mb-3 break-words max-w-full"
                style={{
                  fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-white/70 text-sm leading-relaxed break-words max-w-full"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

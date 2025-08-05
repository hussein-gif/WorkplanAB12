import React from 'react';
import { Phone, Search, UserCheck, Briefcase, Handshake } from 'lucide-react';

interface ProcessSectionProps {
  isVisible: boolean;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ isVisible }) => {
  const steps = [
    {
      icon: Phone,
      title: 'Behovsanalys',
      description: 'Vi kartlägger mål, tidsram och kompetenskrav i ett kort uppstartssamtal.'
    },
    {
      icon: Search,
      title: 'Lösningsförslag',
      description: 'Ni får ett transparent förslag på bemanningsupplägg, tidsplan och pris.'
    },
    {
      icon: UserCheck,
      title: 'Sökning & urval',
      description: 'Aktiv search, annonsering vid behov och strukturerade intervjuer/screening.'
    },
    {
      icon: Briefcase,
      title: 'Kandidatpresentation',
      description: 'En shortlist med matchade kandidater, referenser och våra rekommendationer.'
    },
    {
      icon: Handshake,
      title: 'Start & uppföljning',
      description: 'Smidig onboarding och regelbunden uppföljning för att säkerställa kvalitet.'
    }
  ];

  return (
    <section id="how-it-works" className="relative py-24 px-8 overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotsPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,0.05)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotsPattern)" />
        </svg>
      </div>
      {/* Section content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-light text-gray-800 mb-6"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            <span style={{ fontWeight: 400 }}>Vår </span>
            <span style={{ fontWeight: 500 }}>Process</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            En tydlig 5-stegsprocess som ger er rätt kompetens – snabbt, tryggt och utan överraskningar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg transition-transform duration-300 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Number Badge */}
              <div
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-semibold"
                style={{ boxShadow: '0 4px 12px rgba(42,140,255,0.4)' }}
              >
                {index + 1}
              </div>
              {/* Icon in Circle */}
              <div
                className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ boxShadow: '0 4px 8px rgba(42,140,255,0.2)' }}
              >
                <step.icon size={28} />
              </div>
              {/* Title */}
              <h3 className="text-lg font-medium text-gray-800 text-center mb-2">
                {step.title}
              </h3>
              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed text-center">
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
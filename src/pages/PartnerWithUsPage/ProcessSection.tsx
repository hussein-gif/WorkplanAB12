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
    <section
      id="how-it-works"
      className="relative py-24 px-8 bg-white overflow-hidden"
    >
      {/* Dynamic Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="blobGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.2)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <pattern id="stripePattern" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
              <line x1="0" y="0" x2="0" y2="8" stroke="rgba(16,185,129,0.05)" strokeWidth="4" />
            </pattern>
          </defs>
          {/* Large blue gradient blob */}
          <circle cx="20%" cy="30%" r="400" fill="url(#blobGrad)" />
          <circle cx="80%" cy="70%" r="300" fill="url(#blobGrad)" />
          {/* Diagonal stripes overlay */}
          <rect width="100%" height="100%" fill="url(#stripePattern)" />
        </svg>
      </div>

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

        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative p-8 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl transform transition-all duration-500 ease-out ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                clipPath: 'polygon(0 8%, 100% 0, 100% 92%, 0% 100%)'
              }}
            >
              {/* Decorative corner dot */}
              <div
                className="absolute top-0 left-0 w-4 h-4 bg-blue-500 rounded-full"
                style={{ transform: 'translate(-50%, -50%)' }}
              />
              {/* Number Badge */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold"
                style={{ boxShadow: '0 8px 24px rgba(42,140,255,0.4)' }}
              >
                {index + 1}
              </div>
              {/* Icon Circle */}
              <div
                className="w-16 h-16 bg-white flex items-center justify-center rounded-full mx-auto mb-4"
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              >
                <step.icon size={28} className="text-blue-600" />
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
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
      {/* Dynamic Artistic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgBlob" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.15)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <pattern id="zigzag" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
              <path d="M0 5 l5 -5 l5 5" stroke="rgba(16,185,129,0.05)" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#zigzag)" />
          <circle cx="25%" cy="20%" r="300" fill="url(#bgBlob)" />
          <circle cx="80%" cy="75%" r="350" fill="url(#bgBlob)" />
        </svg>
      </div>

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

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgba(42,140,255,0.15)] transform transition-all duration-500 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${index * 150}ms`, backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(235,245,255,0.8))', border: '1px solid rgba(59,130,246,0.2)' }}
            >
              {/* Decorative Abstract Shape */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-blue-200 to-teal-100 rounded-full mix-blend-multiply opacity-50" />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-tr from-purple-200 to-pink-100 rounded-full mix-blend-lighten opacity-60" />

              {/* Number Badge */}
              <div className="absolute -top-4 left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-lg font-semibold" style={{ boxShadow: '0 6px 16px rgba(42,140,255,0.5)' }}>
                {index + 1}
              </div>

              {/* Icon with dynamic background */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative" style={{ background: 'radial-gradient(circle at center, rgba(16,185,129,0.2), transparent 70%)' }}>
                <step.icon size={28} className="text-blue-600" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium text-gray-800 text-center mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
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
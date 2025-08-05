import React, { useState, useEffect } from 'react';
import { Phone, Search, UserCheck, Briefcase, Handshake } from 'lucide-react';

interface ProcessSectionProps {
  isVisible: boolean;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ isVisible }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="how-it-works" className="relative py-24 px-8 overflow-hidden">
      {/* Elegant Background System */}
      <div className="absolute inset-0">
        {/* Sophisticated gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 40%, #cbd5e1 100%)',
          }}
        />

        {/* Interactive floating elements */}
        <div 
          className="absolute w-[650px] h-[650px] rounded-full opacity-[0.025] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #8b5cf6 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.2}%`,
            top: `${mousePosition.y * 0.15}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.02] blur-3xl transition-all duration-1000 delay-600"
          style={{
            background: `radial-gradient(circle, #06b6d4 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.18}%`,
            bottom: `${mousePosition.y * 0.22}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.008]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(0,0,0,0.02) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(0,0,0,0.015) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 30px 30px',
          }}
        />

        {/* Minimal accent elements */}
        <div className="absolute top-16 right-20 w-1.5 h-1.5 bg-purple-200/30 rounded-full" />
        <div className="absolute bottom-24 left-16 w-1 h-1 bg-cyan-200/25 rounded-full" />
        <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-slate-300/30 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="relative z-10">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-light text-slate-800 mb-6"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            <span style={{ fontWeight: 400 }}>Vår </span>
            <span style={{ fontWeight: 500 }}>Process</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            En tydlig 5-stegsprocess som ger er rätt kompetens – snabbt, tryggt och utan överraskningar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
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
              <h3 className="text-lg font-semibold text-slate-800 mb-3 break-words max-w-full">
                {step.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed break-words max-w-full">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
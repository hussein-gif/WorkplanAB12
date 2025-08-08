import React from 'react';
import { Clock, Target, Users } from 'lucide-react';

interface WhyChooseCandidatesSectionProps {
  isVisible: boolean;
}

const WhyChooseCandidatesSection: React.FC<WhyChooseCandidatesSectionProps> = ({
  isVisible,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

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
    <section className="relative py-24 px-8 overflow-hidden bg-white">
      {/* Creative Light Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
          }}
        />

        {/* Animated geometric patterns */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexPattern" width="60" height="52" patternUnits="userSpaceOnUse">
              <path
                d="M30 0 L60 15 L60 45 L30 60 L0 45 L0 15 Z"
                stroke="rgba(59,130,246,0.08)"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
            <filter id="blurLight">
              <feGaussianBlur stdDeviation="80" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
          <circle cx="20%" cy="20%" r="200" fill="rgba(59,130,246,0.12)" filter="url(#blurLight)" />
          <circle cx="80%" cy="80%" r="180" fill="rgba(16,185,129,0.1)" filter="url(#blurLight)" />
        </svg>

        {/* Interactive floating elements */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-3xl transition-all duration-1000"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
            left: `${mousePosition.x * 0.2}%`,
            top: `${mousePosition.y * 0.15}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-15 blur-3xl transition-all duration-1000 delay-300"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)',
            right: `${mousePosition.x * 0.15}%`,
            bottom: `${mousePosition.y * 0.2}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative elements */}
        <div className="absolute top-20 right-32 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" />
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-emerald-400/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
            Därför Väljer Kandidater Oss
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`
                w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} 
                flex items-center justify-center mb-6 mx-auto
              `}>
                <benefit.icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-center">
                {benefit.description}
              </p>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                {benefit.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { useState, useEffect } from 'react';

export default WhyChooseCandidatesSection;
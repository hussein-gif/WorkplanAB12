import React from 'react';
import { Search, UserCheck, Briefcase } from 'lucide-react';

interface HowItWorksSectionProps {
  isVisible: boolean;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
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
    <section className="relative py-24 px-8 overflow-hidden bg-white">
      {/* Creative White Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 40%, #f3f4f6 100%)',
          }}
        />

        {/* Sophisticated geometric patterns */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circlePattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="2" fill="rgba(59,130,246,0.1)" />
              <circle cx="20" cy="20" r="1" fill="rgba(16,185,129,0.08)" />
              <circle cx="60" cy="20" r="1" fill="rgba(139,92,246,0.06)" />
            </pattern>
            <filter id="blurWhite">
              <feGaussianBlur stdDeviation="60" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#circlePattern)" />
          <ellipse cx="30%" cy="30%" rx="300" ry="200" fill="rgba(59,130,246,0.08)" filter="url(#blurWhite)" />
          <ellipse cx="70%" cy="70%" rx="250" ry="180" fill="rgba(16,185,129,0.06)" filter="url(#blurWhite)" />
        </svg>

        {/* Interactive floating elements */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl transition-all duration-1000"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
            left: `${mousePosition.x * 0.25}%`,
            top: `${mousePosition.y * 0.18}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-12 blur-3xl transition-all duration-1000 delay-400"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
            right: `${mousePosition.x * 0.2}%`,
            bottom: `${mousePosition.y * 0.22}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Diagonal line pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(59,130,246,0.1) 0px, rgba(59,130,246,0.1) 1px, transparent 1px, transparent 20px),
              repeating-linear-gradient(-45deg, rgba(16,185,129,0.08) 0px, rgba(16,185,129,0.08) 1px, transparent 1px, transparent 25px)
            `,
          }}
        />

        {/* Decorative elements */}
        <div className="absolute top-24 right-28 w-3 h-3 bg-blue-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-28 left-24 w-2 h-2 bg-emerald-400/15 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-purple-400/12 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
            Så Går Det Till
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Text Row */}
        <div className="text-center">
          <p className="text-lg text-gray-700">
            Redo?{' '}
            <button
              onClick={() => {
                const element = document.getElementById('featured-jobs');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors underline"
            >
              Bläddra bland jobben ovan.
            </button>
          </p>
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
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Text Row */}
        <div className="text-center">
          <p className="text-lg text-gray-700">
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

import { useState, useEffect } from 'react';

export default HowItWorksSection;
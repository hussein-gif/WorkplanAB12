import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';

interface CandidatesFAQSectionProps {
  isVisible: boolean;
  openFAQ: number;
  toggleFAQ: (index: number) => void;
}

const CandidatesFAQSection: React.FC<CandidatesFAQSectionProps> = ({
  isVisible,
  openFAQ,
  toggleFAQ,
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

  const navigate = useNavigate();

  const faqs = [
    {
      question: 'Kostar det något att söka via er?',
      answer: 'Nej, det är helt kostnadsfritt för dig som kandidat.'
    },
    {
      question: 'Måste jag skapa ett konto?',
      answer: 'Nej. Skicka bara in din ansökan – vi tar kontakt om nästa steg.'
    },
    {
      question: 'Vad händer efter att jag skickat in min ansökan?',
      answer: 'Vi går igenom din profil, matchar mot aktuella uppdrag och hör av oss om det finns en passande roll.'
    },
    {
      question: 'Hur snabbt får jag återkoppling?',
      answer: 'Vi återkommer så snart vi kan. Om du inte hört något – hör gärna av dig!'
    },
    {
      question: 'Kan jag söka flera jobb samtidigt?',
      answer: 'Absolut. Ansök till allt som känns relevant, vi hjälper dig prioritera.'
    },
    {
      question: 'Hur hanterar ni mina personuppgifter?',
      answer: 'Vi följer GDPR och behandlar allt konfidentiellt. Läs mer i vår integritetspolicy.'
    }
  ];

  return (
    <section className="relative py-24 px-8 overflow-hidden" style={{ backgroundColor: '#08132B' }}>
      {/* Creative Dark Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Complex geometric patterns */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="trianglePattern" width="100" height="87" patternUnits="userSpaceOnUse">
              <path
                d="M50 0 L100 87 L0 87 Z"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M25 43.5 L75 43.5"
                stroke="rgba(59,130,246,0.06)"
                strokeWidth="0.5"
              />
            </pattern>
            <filter id="blurFAQ">
              <feGaussianBlur stdDeviation="120" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#trianglePattern)" />
          <circle cx="20%" cy="30%" r="300" fill="rgba(99,102,241,0.18)" filter="url(#blurFAQ)" />
          <circle cx="80%" cy="70%" r="250" fill="rgba(16,185,129,0.15)" filter="url(#blurFAQ)" />
        </svg>

        {/* Interactive floating elements */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full opacity-25 blur-3xl transition-all duration-1000"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)',
            left: `${mousePosition.x * 0.35}%`,
            top: `${mousePosition.y * 0.25}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl transition-all duration-1000 delay-600"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
            right: `${mousePosition.x * 0.25}%`,
            bottom: `${mousePosition.y * 0.3}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Sophisticated grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='150' height='150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating accent elements */}
        <div className="absolute top-16 right-24 w-3 h-3 bg-blue-400/25 rounded-full animate-pulse" />
        <div className="absolute bottom-24 left-16 w-2 h-2 bg-emerald-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-purple-400/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">
            Vanliga Frågor & Svar
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 mb-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                aria-expanded={openFAQ === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                {openFAQ === index ? (
                  <Minus size={20} className="text-white/60 flex-shrink-0" />
                ) : (
                  <Plus size={20} className="text-white/60 flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-8 pb-6"
                >
                  <p className="text-white/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-white/80 text-lg">
            Hittar du inte svaret?{' '}
            <button
              onClick={() => navigate('/contact')}
              className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Kontakta oss här.
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

import { useState, useEffect } from 'react';

export default CandidatesFAQSection;
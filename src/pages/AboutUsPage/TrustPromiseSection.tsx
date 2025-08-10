import React from 'react';
import { CheckCircle } from 'lucide-react';

const TrustPromiseSection: React.FC = () => {
  return (
    <section id="trust-promise" className="relative py-24 px-8 overflow-hidden" style={{ backgroundColor: '#08132B' }}>
      {/* Continuation of the Beautiful Background Design */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Extended Gradient Orbs for Seamless Flow */}
        <div
          className="absolute w-[1000px] h-[1000px] rounded-full opacity-[0.10] blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(147,51,234,0.2) 40%, rgba(126,34,206,0.1) 70%, transparent 85%)`,
            left: '-250px',
            top: '-300px',
          }}
        />
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.08] blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(99,102,241,0.18) 45%, rgba(79,70,229,0.08) 75%, transparent 90%)`,
            right: '-150px',
            bottom: '-200px',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(52,211,153,0.15) 50%, rgba(34,197,94,0.08) 80%, transparent 95%)`,
            left: '50%',
            top: '30%',
          }}
        />

        {/* Continuing SVG Pattern System */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Complementary Gradient Definitions */}
            <radialGradient id="trustGrad1" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="rgba(168,85,247,0.12)" />
              <stop offset="50%" stopColor="rgba(147,51,234,0.06)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="trustGrad2" cx="60%" cy="70%" r="60%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.1)" />
              <stop offset="60%" stopColor="rgba(99,102,241,0.04)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="trustFlow1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168,85,247,0.06)" />
              <stop offset="40%" stopColor="rgba(147,51,234,0.04)" />
              <stop offset="80%" stopColor="rgba(126,34,206,0.02)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="trustFlow2" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.05)" />
              <stop offset="60%" stopColor="rgba(52,211,153,0.03)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* Extended Pattern Definitions */}
            <pattern id="trustMesh" width="100" height="87" patternUnits="userSpaceOnUse">
              <path d="M50 0 L100 25 L100 62 L50 87 L0 62 L0 25 Z" stroke="rgba(255,255,255,0.035)" strokeWidth="1" fill="none" />
              <circle cx="50" cy="43.5" r="1.8" fill="rgba(168,85,247,0.12)" />
              <circle cx="25" cy="21.75" r="1.2" fill="rgba(59,130,246,0.1)" />
              <circle cx="75" cy="65.25" r="1" fill="rgba(16,185,129,0.08)" />
            </pattern>
            <pattern id="trustDots" width="90" height="90" patternUnits="userSpaceOnUse">
              <circle cx="22.5" cy="22.5" r="1.3" fill="rgba(168,85,247,0.15)" />
              <circle cx="67.5" cy="45" r="0.9" fill="rgba(59,130,246,0.12)" />
              <circle cx="45" cy="78.75" r="1.1" fill="rgba(16,185,129,0.1)" />
              <circle cx="78.75" cy="18" r="0.8" fill="rgba(147,51,234,0.08)" />
            </pattern>
          </defs>

          {/* Flowing Continuation Shapes */}
          <path
            d="M0,100 Q200,20 400,100 Q600,180 800,100 Q1000,20 1200,100 L1200,250 Q1000,330 800,250 Q600,170 400,250 Q200,330 0,250 Z"
            fill="url(#trustFlow1)"
          />
          <path
            d="M0,300 Q250,220 500,300 Q750,380 1000,300 Q1125,260 1200,300 L1200,450 Q1125,490 1000,450 Q750,370 500,450 Q250,530 0,450 Z"
            fill="url(#trustFlow2)"
          />
          <path
            d="M0,500 Q300,400 600,500 Q900,600 1200,500 L1200,650 Q900,750 600,650 Q300,550 0,650 Z"
            fill="url(#trustGrad1)"
          />

          {/* Extended Pattern Overlays */}
          <rect width="100%" height="100%" fill="url(#trustMesh)" opacity="0.5" />
          <rect width="100%" height="100%" fill="url(#trustDots)" opacity="0.3" />
        </svg>

        {/* Complementary Conic Gradients */}
        <div
          className="absolute left-1/3 top-1/5 w-[700px] h-[700px] opacity-[0.05]"
          style={{
            background: `conic-gradient(from 135deg at 50% 50%, 
              rgba(168,85,247,0.18) 0deg, 
              rgba(147,51,234,0.12) 72deg,
              transparent 144deg, 
              rgba(126,34,206,0.08) 216deg,
              transparent 288deg, 
              rgba(168,85,247,0.18) 360deg)`,
            borderRadius: '50%',
            filter: 'blur(55px)',
          }}
        />
        <div
          className="absolute right-1/3 bottom-1/5 w-[500px] h-[500px] opacity-[0.04]"
          style={{
            background: `conic-gradient(from 315deg at 50% 50%, 
              rgba(59,130,246,0.15) 0deg, 
              transparent 108deg,
              rgba(99,102,241,0.1) 216deg, 
              rgba(79,70,229,0.06) 324deg,
              rgba(59,130,246,0.15) 360deg)`,
            borderRadius: '50%',
            filter: 'blur(45px)',
          }}
        />

        {/* Extended Particle System */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              'radial-gradient(1.8px 1.8px at 20% 25%, rgba(168,85,247,0.35), transparent)',
              'radial-gradient(1.3px 1.3px at 40% 50%, rgba(59,130,246,0.3), transparent)',
              'radial-gradient(1.1px 1.1px at 70% 30%, rgba(16,185,129,0.25), transparent)',
              'radial-gradient(2.2px 2.2px at 85% 75%, rgba(147,51,234,0.2), transparent)',
              'radial-gradient(1.6px 1.6px at 30% 85%, rgba(99,102,241,0.25), transparent)',
              'radial-gradient(1px 1px at 95% 35%, rgba(52,211,153,0.2), transparent)',
              'radial-gradient(1.9px 1.9px at 50% 65%, rgba(126,34,206,0.15), transparent)',
              'radial-gradient(1.4px 1.4px at 75% 90%, rgba(79,70,229,0.18), transparent)'
            ].join(', '),
            backgroundSize: '380px 380px, 330px 330px, 280px 280px, 430px 430px, 360px 360px, 300px 300px, 400px 400px, 260px 260px',
            opacity: 0.5,
          }}
        />

        {/* Additional Geometric Accents */}
        <div className="absolute top-16 right-20 w-3.5 h-3.5 bg-purple-400/25 rounded-full" />
        <div className="absolute top-40 left-32 w-2.5 h-2.5 bg-blue-400/20 rounded-full" />
        <div className="absolute bottom-32 right-1/3 w-4 h-4 bg-emerald-400/15 rounded-full" />
        <div className="absolute bottom-16 left-1/4 w-3 h-3 bg-indigo-400/20 rounded-full" />
        <div className="absolute top-1/3 right-12 w-2 h-2 bg-purple-500/25 rounded-full" />
        <div className="absolute bottom-1/2 left-16 w-2.5 h-2.5 bg-teal-400/18 rounded-full" />

        {/* Final Vignette Layer */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 1000px 600px at 50% 50%, transparent 45%, rgba(8,19,43,0.12) 85%, rgba(8,19,43,0.25) 100%)
            `,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Vårt löfte till dig
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Därför väljer företag oss som bemanningspartner.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <CheckCircle size={20} className="text-green-400" />
              </div>
              <span className="text-white/80 text-lg font-medium leading-relaxed">
                Dedikerad kontaktperson från första dagen.
              </span>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <CheckCircle size={20} className="text-green-400" />
              </div>
              <span className="text-white/80 text-lg font-medium leading-relaxed">
                Transparent prissättning – inga bindningstider eller dolda avgifter.
              </span>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <CheckCircle size={20} className="text-green-400" />
              </div>
              <span className="text-white/80 text-lg font-medium leading-relaxed">
                Snabb återkoppling genom hela processen.
              </span>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <CheckCircle size={20} className="text-green-400" />
              </div>
              <span className="text-white/80 text-lg font-medium leading-relaxed">
                Fokus på lager & logistik – vi kan just din miljö.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustPromiseSection;
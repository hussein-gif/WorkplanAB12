import React from 'react';
import { Truck } from 'lucide-react';

interface IndustriesSectionProps {
  isVisible: boolean;
}

const IndustriesSection: React.FC<IndustriesSectionProps> = ({ isVisible }) => {
  return (
    <section className="relative py-24 px-8 overflow-hidden bg-gray-900">
      {/* Futuristic Tech Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Grid pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0 L0 0 0 40" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </pattern>
            {/* Glow gradient for nodes */}
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            {/* Link gradient */}
            <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Grid overlay */}
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Random glowing nodes */}
          {[...Array(12)].map((_, i) => (
            <circle
              key={i}
              cx={`${Math.random() * 100}%"`}
              cy={`${Math.random() * 100}%"`}
              r="6"
              fill="url(#nodeGlow)"
            />
          ))}

          {/* Connecting lines */}
          {[...Array(8)].map((_, i) => {
            const x1 = Math.random() * 1200;
            const y1 = Math.random() * 800;
            const x2 = Math.random() * 1200;
            const y2 = Math.random() * 800;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#linkGrad)"
                strokeWidth="2"
                strokeOpacity="0.4"
              />
            );
          })}

          {/* Subtle moving wave layer */}
          <path
            d="M0,90 C400,120 800,60 1200,100 L1200,0 L0,0 Z"
            fill="rgba(16,185,129,0.2)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl text-white mb-6"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              lineHeight: 1.1,
            }}
          >
            <span style={{ fontWeight: 400 }}>Specialister på </span>
            <span style={{ fontWeight: 500 }}>Lager &amp; Logistik</span>
          </h2>
          <p
            className="text-lg text-white/70 max-w-2xl mx-auto"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
            }}
          >
            Vi bemannar hela logistikkedjan – från inleverans till distribution. Rätt kompetens, när du behöver den.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center transition-transform duration-500 ease-out"
            style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none' }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <Truck size={28} className="text-white" />
            </div>
            <h3
              className="text-2xl font-medium text-white mb-4 break-words max-w-full"
              style={{
                fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                fontWeight: 500,
              }}
            >
              Lager &amp; Logistik
            </h3>
            <p
              className="text-white/80 leading-relaxed mb-4 break-words max-w-full"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
              }}
            >
              Orderplock, truckförare, lageradministration, skiftledare m.fl. Vi täcker bemanningsbehoven över hela flödet.
            </p>
            <div
              className="text-xs font-medium text-white/50 uppercase tracking-wider"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Snabb bemanning &amp; personlig kontakt
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/70 text-lg">
            Behöver du kompetens utanför detta?{' '}
            <a
              href="#kontakt-form"
              className="text-blue-400 font-semibold hover:underline hover:text-blue-300 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('kontakt-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Kontakta oss
            </a>{' '}
            så hjälper vi dig.
          </p>
        </div>
      </div>

      {/* Wave Transition to Next Section */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0" style={{ transform: 'translateY(1px)' }}>
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default IndustriesSection;
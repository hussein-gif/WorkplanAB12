import React from 'react';
import { Truck } from 'lucide-react';

interface IndustriesSectionProps {
  isVisible: boolean;
}

const IndustriesSection: React.FC<IndustriesSectionProps> = ({ isVisible }) => {
  return (
    <section className="relative py-24 px-8 overflow-hidden bg-gray-900">
      {/* Futuristic Dark Background with Neon Waveforms */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Gradient blobs for depth */}
            <radialGradient id="blob1" cx="20%" cy="30%" r="40%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="blob2" cx="80%" cy="70%" r="50%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Neon gradient for waves */}
            <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#34D399" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.8" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow" width="200%" height="200%" x="-50%" y="-50%">
              <feGaussianBlur stdDeviation="30" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Subtle blobs */}
          <circle cx="20%" cy="30%" r="300" fill="url(#blob1)" />
          <circle cx="80%" cy="70%" r="400" fill="url(#blob2)" />

          {/* Layered neon waves */}
          <path
            d="M0,80 C300,20 800,120 1200,60"
            stroke="url(#neonGrad)"
            strokeWidth="12"
            fill="none"
            filter="url(#glow)"
          />
          <path
            d="M0,100 C300,60 800,140 1200,80"
            stroke="url(#neonGrad)"
            strokeWidth="8"
            fill="none"
            filter="url(#glow)"
          />
          <path
            d="M0,120 C300,100 800,160 1200,100"
            stroke="url(#neonGrad)"
            strokeWidth="4"
            fill="none"
            filter="url(#glow)"
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

        {/* Additional Contact Line */}
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

      {/* Fade-in animation keyframes */}
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
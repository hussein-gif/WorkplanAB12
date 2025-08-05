import React from 'react';
import { Truck } from 'lucide-react';

interface IndustriesSectionProps {
  isVisible: boolean;
}

const IndustriesSection: React.FC<IndustriesSectionProps> = ({ isVisible }) => {
  return (
    <section className="relative py-24 px-8 overflow-hidden bg-gray-900">
      {/* Dynamic Dark Background with Subtle Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="darkBlob" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(30,41,59,0.6)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            </defs>
            <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
              <circle cx="2" cy="2" r="2" fill="rgba(255,255,255,0.03)" />
            </pattern>
          </defs>
          {/* Soft gradient blobs */}
          <circle cx="15%" cy="25%" r="300" fill="url(#darkBlob)" />
          <circle cx="85%" cy="75%" r="350" fill="url(#darkBlob)" />
          {/* Dot pattern overlay */}
          <rect width="100%" height="100%" fill="url(#dots)" />
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

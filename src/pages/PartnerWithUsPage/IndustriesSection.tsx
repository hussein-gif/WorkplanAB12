import React from 'react';
import { Truck } from 'lucide-react';

interface IndustriesSectionProps {
  isVisible: boolean;
}

const IndustriesSection: React.FC<IndustriesSectionProps> = ({ isVisible }) => {
  return (
    <section className="industries-section">
      <div className="content max-w-6xl mx-auto py-24 px-8">
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
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
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
                document.getElementById('kontakt-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Kontakta oss
            </a>{' '}
            så hjälper vi dig.
          </p>
        </div>
      </div>

      {/* Wave transition to next section */}
      <div className="wave"></div>

      {/* Component-scoped CSS */}
      <style>{`
        .industries-section {
          position: relative;
          overflow: hidden;
          background-color: #0a0f1f;
        }
        .industries-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 30%, rgba(16,185,129,0.4) 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(59,130,246,0.3) 0%, transparent 60%),
            linear-gradient(135deg, rgba(10,15,25,0.6) 0%, rgba(0,0,0,0.9) 100%);
          mix-blend-mode: overlay;
          z-index: 1;
        }
        .industries-section .content {
          position: relative;
          z-index: 2;
        }
        .industries-section .wave {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 120px;
          background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'><path d='M0,0 C300,80 900,0 1200,80 L1200,120 L0,120 Z' fill='%23ffffff'/></svg>") no-repeat bottom/cover;
          z-index: 2;
        }
      `}</style>
    </section>
  );
};

export default IndustriesSection;
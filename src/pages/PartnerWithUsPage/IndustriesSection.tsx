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
          <div className="card p-8 text-center">
            <div className="icon-bg mb-6 mx-auto">
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

      {/* Simple animated background */}
      <style>{`
        .industries-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0a0f1f, #1a2238);
        }
        .industries-section::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.03) 0,
            rgba(255,255,255,0.03) 1px,
            transparent 1px,
            transparent 10px
          );
          animation: movePattern 20s linear infinite;
          z-index: 0;
        }
        .industries-section .content {
          position: relative;
          z-index: 1;
        }
        .card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 1rem;
        }
        .icon-bg {
          width: 4rem; height: 4rem;
          background: linear-gradient(135deg, #10B981, #34D399);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @keyframes movePattern {
          from { transform: translate(0,0); }
          to { transform: translate(50%,50%); }
        }
      `}</style>
    </section>
  );
};

export default IndustriesSection;

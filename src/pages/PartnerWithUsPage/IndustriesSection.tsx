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
              fontWeight: 500,
            }}
          >
            Specialister på Lager &amp; Logistik
          </h2>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="card p-8 text-center flex flex-col justify-between h-full">
            <div className="icon-bg mb-6 mx-auto">
              <Truck size={28} className="text-white" />
            </div>
            <div>
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
                className="text-white/80 leading-relaxed break-words max-w-full"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                }}
              >
                Orderplock, truckförare, lageradministration, skiftledare m.fl. Vi täcker bemanningsbehoven över hela flödet.
              </p>
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

      <style>{`
        .industries-section {
          position: relative;
          overflow: hidden;
          background-color: #08132b;
        }
        .industries-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><g fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='2'><path d='M0 200 Q200 100 400 200 T800 200' /><path d='M0 300 Q200 200 400 300 T800 300' /><path d='M0 400 Q200 300 400 400 T800 400' /></g></svg>");
          background-size: cover;
          opacity: 0.4;
          z-index: 0;
        }
        .industries-section .content {
          position: relative;
          z-index: 1;
        }
        .card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
        }
        .icon-bg {
          width: 4rem;
          height: 4rem;
          background: #2E8B57;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </section>
  );
};

export default IndustriesSection;

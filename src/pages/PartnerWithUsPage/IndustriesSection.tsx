import React from 'react';
import { Truck } from 'lucide-react';

interface IndustriesSectionProps {
  isVisible: boolean;
}

const IndustriesSection: React.FC<IndustriesSectionProps> = ({ isVisible }) => {
  return (
    <section className="industries-section">
      <div className="content max-w-6xl mx-auto py-16 px-8 relative z-10">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl text-white mb-6 font-medium"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              lineHeight: 1.1,
            }}
          >
            Specialister på Lager &amp; Logistik
          </h2>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="card p-8 text-center flex flex-col justify-between h-full">
            <div className="icon-bg icon-3d mb-6 mx-auto">
              <Truck size={28} className="text-white" />
            </div>
            <div>
              <h3
                className="text-2xl font-medium text-white mb-4"
                style={{
                  fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                }}
              >
                Lager &amp; Logistik
              </h3>
              <p
                className="text-white/80 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Orderplock, truckförare, lageradministration, skiftledare m.fl. Vi täcker bemanningsbehoven över hela flödet.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center py-4">
          <p
            className="text-white/70 text-lg font-light"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Behöver du kompetens utanför detta?{' '}
            <a
              href="#kontakt-form"
              className="text-blue-400 font-medium hover:underline hover:text-blue-300 transition-colors"
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
        .industries-section .content { position: relative; z-index: 1; }

        .card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1rem;
        }

        /* Icon container */
        .icon-bg {
          width: 4rem;
          height: 4rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 3D, professionell stil med samma gröna som knappen (#189A4C / hover #1FB259) */
        .icon-3d {
          position: relative;
          background: linear-gradient(180deg, #1FB259 0%, #189A4C 55%, #147C43 100%);
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow:
            0 10px 22px rgba(20, 124, 67, 0.35),
            0 2px 6px rgba(0,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.16),
            inset 0 -1px 0 rgba(0,0,0,0.25);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .icon-3d:hover {
          transform: translateY(-1px);
          box-shadow:
            0 14px 28px rgba(20, 124, 67, 0.42),
            0 4px 10px rgba(0,0,0,0.28),
            inset 0 1px 0 rgba(255,255,255,0.18),
            inset 0 -1px 0 rgba(0,0,0,0.28);
        }
        .icon-3d::before {
          content: '';
          position: absolute;
          inset: 1px;
          border-radius: inherit;
          background:
            radial-gradient(ellipse at 50% 18%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.08) 28%, rgba(255,255,255,0) 40%),
            linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0));
          pointer-events: none;
        }
        .icon-3d::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 32%);
          mix-blend-mode: soft-light;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};

export default IndustriesSection;

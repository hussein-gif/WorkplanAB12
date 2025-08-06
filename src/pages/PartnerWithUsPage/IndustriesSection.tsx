import React from 'react';
import { Truck } from 'lucide-react';

interface IndustriesSectionProps {
  isVisible: boolean;
}

const IndustriesSection: React.FC<IndustriesSectionProps> = ({ isVisible }) => {
  return (
    <section
      className="relative overflow-hidden bg-[#08132b]"
      style={{
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="content max-w-6xl mx-auto py-16 px-8 relative z-10">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl text-white mb-6 font-medium"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              lineHeight: 1.1,
            }}
          >
            Specialister på Lager &amp; Logistik
          </h2>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="card p-8 text-center flex flex-col justify-between h-full bg-white/15 backdrop-blur-lg border border-white/20 rounded-xl">
            <div className="icon-bg mb-6 mx-auto bg-[#2E8B57] rounded-md flex items-center justify-center" style={{ width: '4rem', height: '4rem' }}>
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
              <p className="text-white/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Orderplock, truckförare, lageradministration, skiftledare m.fl. Vi täcker bemanningsbehoven över hela flödet.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center py-4">
          <p className="text-white/70 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
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
    </section>
  );
};

export default IndustriesSection;

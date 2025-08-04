import React from 'react';
import { Truck } from 'lucide-react';

interface IndustriesSectionProps {
  isVisible: boolean;
}

const IndustriesSection: React.FC<IndustriesSectionProps> = ({ isVisible }) => {
  return (
    <section className="py-24 px-8 bg-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '400' }}>
            Specialister på Lager & Logistik
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Vi bemannar hela logistikkedjan – från inleverans till distribution. Rätt kompetens, när du behöver den.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <Truck size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4 break-words max-w-full">
              Lager & Logistik
            </h3>
            <p className="text-white/80 leading-relaxed mb-4 break-words max-w-full">
              Orderplock, truckförare, lageradministration, skiftledare m.fl. Vi täcker bemanningsbehoven över hela flödet.
            </p>
            <div className="text-xs font-medium text-white/50 uppercase tracking-wider">
              Snabb bemanning & personlig kontakt
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
            </a>
            {' '}så hjälper vi dig.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
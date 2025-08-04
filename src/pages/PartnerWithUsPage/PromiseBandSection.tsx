import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PromiseBandSectionProps {
  isVisible: boolean;
}

const PromiseBandSection: React.FC<PromiseBandSectionProps> = ({ isVisible }) => {
  return (
    <section aria-labelledby="vart-lofte" className="py-8 px-8 bg-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3
            id="vart-lofte"
            className="text-3xl md:text-4xl text-white mb-8"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            Vårt löfte
          </h3>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 text-center">
          <li className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <span className="text-white/80 font-medium break-words max-w-full">
              Snabb återkoppling – svar inom 24 timmar
            </span>
          </li>
          <li className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <span className="text-white/80 font-medium break-words max-w-full">
              Transparent prissättning – inga dolda avgifter
            </span>
          </li>
          <li className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <span className="text-white/80 font-medium break-words max-w-full">
              Personlig kontaktperson – samma rådgivare genom hela uppdraget
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PromiseBandSection;

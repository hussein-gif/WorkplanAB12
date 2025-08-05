import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PromiseBandSectionProps {
  isVisible: boolean;
}

const PromiseBandSection: React.FC<PromiseBandSectionProps> = ({ isVisible }) => {
  return (
    <section
      aria-labelledby="vart-lofte"
      className="py-8 px-4 bg-white rounded-xl shadow-lg"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h3
          id="vart-lofte"
          className="text-2xl md:text-3xl text-white font-light mb-6"
          style={{
            fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
            lineHeight: 1.2,
          }}
        >
          Vårt Löfte
        </h3>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            'Snabb återkoppling – svar inom 24 timmar',
            'Transparent prissättning – inga dolda avgifter',
            'Personlig kontaktperson – samma rådgivare genom hela uppdraget',
          ].map((text, idx) => (
            <li key={idx} className="flex flex-col items-center space-y-2">
              <CheckCircle size={20} className="text-white mb-1" />
              <p className="text-white text-sm md:text-base">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PromiseBandSection;

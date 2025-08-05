import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PromiseBandSectionProps {
  isVisible: boolean;
}

const PromiseBandSection: React.FC<PromiseBandSectionProps> = ({ isVisible }) => {
  return (
    <section
      aria-labelledby="vart-lofte"
      className="py-16 px-6 bg-gray-50"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h3
            id="vart-lofte"
            className="text-3xl md:text-4xl text-gray-900 font-light"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              lineHeight: 1.2,
            }}
          >
            Vårt Löfte
          </h3>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            'Snabb återkoppling – svar inom 24 timmar',
            'Transparent prissättning – inga dolda avgifter',
            'Personlig kontaktperson – samma rådgivare genom hela uppdraget',
          ].map((text, idx) => (
            <li
              key={idx}
              className="flex flex-col items-center text-center bg-white shadow-sm rounded-lg p-8 hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-green-500" />
              </div>
              <p className="text-gray-700 font-medium">
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

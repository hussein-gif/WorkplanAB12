import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PromiseBandSectionProps {
  isVisible: boolean;
}

const PromiseBandSection: React.FC<PromiseBandSectionProps> = ({ isVisible }) => {
  return (
    <section
      aria-labelledby="vart-lofte"
      className="relative overflow-hidden py-8 px-8 bg-white"
    >
      {/* Decorative SVG background pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 800 600"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="2" className="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#dots)" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3
            id="vart-lofte"
            className="text-3xl md:text-4xl text-gray-800 mb-8"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            Vårt Löfte
          </h3>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 text-center">
          {[
            'Snabb återkoppling – svar inom 24 timmar',
            'Transparent prissättning – inga dolda avgifter',
            'Personlig kontaktperson – samma rådgivare genom hela uppdraget',
          ].map((text, idx) => (
            <li key={idx} className="flex flex-col items-center space-y-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle size={20} className="text-green-400" />
              </div>
              <span className="text-gray-700 font-medium break-words max-w-full">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PromiseBandSection;

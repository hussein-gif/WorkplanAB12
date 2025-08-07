import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PromiseBandSectionProps {
  isVisible: boolean;
}

const PromiseBandSection: React.FC<PromiseBandSectionProps> = ({ isVisible }) => {
  return (
    <section
      aria-labelledby="vart-lofte"
      className="relative py-8 px-4 bg-white rounded-xl shadow-lg overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Shine overlays for glossy effect */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-white/50 via-white/10 to-transparent transform -skew-x-12 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-white/40 to-transparent transform skew-y-12 opacity-30 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center font-medium">
        <h3
          id="vart-lofte"
          className="text-2xl md:text-3xl text-black font-medium mb-6"
        >
          Vårt Löfte
        </h3>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Snabb återkoppling', subtitle: 'svar inom 24 timmar' },
            { title: 'Transparent prissättning', subtitle: 'inga dolda avgifter' },
            { title: 'Personlig kontaktperson', subtitle: 'samma rådgivare genom hela uppdraget' },
          ].map(({ title, subtitle }, idx) => (
            <li key={idx} className="flex flex-col items-center space-y-2">
              <CheckCircle size={20} className="text-[#4CAF50] mb-1" />
              <p className="text-black text-sm md:text-base font-medium">
                {title}
              </p>
              <p className="text-gray-500 text-sm md:text-base font-light">
                {subtitle}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PromiseBandSection;

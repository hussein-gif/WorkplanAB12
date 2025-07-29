import React from 'react';
import { ArrowDown } from 'lucide-react';

interface PartnerHeroSectionProps {
  isVisible: boolean;
  scrollToContact: () => void;
  scrollToProcess: () => void;
}

const PartnerHeroSection: React.FC<PartnerHeroSectionProps> = ({
  isVisible,
  scrollToContact,
  scrollToProcess
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
          alt="Professionals collaborating"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Main Heading (only one line) */}
        <h1
          className={`
            text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight leading-[0.95]
            transition-all duration-1000 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
          style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
        >
          Fyll kompetensgapet
        </h1>

        {/* Updated Subheading */}
        <p
          className={`
            text-lg md:text-xl text-white/85 mb-12 font-light leading-relaxed max-w-4xl mx-auto
            transition-all duration-1000 delay-200 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
        >
          Skräddarsytt, snabbt och säkert.
        </p>

        {/* CTA Buttons (rundare) */}
        <div className={`
          flex flex-col sm:flex-row gap-6 justify-center items-center
          transition-all duration-1000 delay-400 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <button 
            onClick={scrollToContact}
            className="
              group px-8 py-4 
              bg-blue-600 text-white
              rounded-full
              font-semibold text-lg tracking-wide
              hover:bg-blue-700 hover:scale-105
              transition-all duration-300
              shadow-lg hover:shadow-xl
              min-w-[250px]
            "
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Kontakta oss
          </button>
          
          <button 
            onClick={scrollToProcess}
            className="
              px-8 py-4
              bg-transparent text-white border-2 border-white/30
              rounded-full
              font-semibold text-lg tracking-wide
              hover:border-white/60 hover:bg-white/10
              transition-all duration-300
              min-w-[200px]
            "
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Så jobbar vi
          </button>
        </div>
      </div>
    </section>
  );
};

export default PartnerHeroSection;

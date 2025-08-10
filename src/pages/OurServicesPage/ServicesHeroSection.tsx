import React from 'react';

interface ServicesHeroSectionProps {
  isVisible: boolean;
  mousePosition: { x: number; y: number };
}

const ServicesHeroSection: React.FC<ServicesHeroSectionProps> = ({
  isVisible,
  mousePosition,
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co/W41Lp1F4/image.png"
          alt="Warehouse operations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Main Headline */}
        <h1 className={`
          text-5xl md:text-6xl font-light text-white mb-6 tracking-tight leading-[0.9]
          transition-all duration-1000 delay-200 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
        `}>
          Specialiserad bemanning för Lager & Logistik
        </h1>

        {/* Tagline */}
        <p className={`
          text-xl text-white/80 mb-12 font-light leading-relaxed max-w-4xl mx-auto
          transition-all duration-1000 delay-400 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          Snabb tillgång till kvalificerad personal, matchad efter skift, volym och krav – utan bindningstider.
        </p>

        {/* Primary CTA */}
        <button
          onClick={() => {
            const element = document.getElementById('how-it-works');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className={`
            px-8 py-4 
            bg-blue-600 text-white rounded-xl
            font-semibold text-lg tracking-wide
            hover:bg-blue-700 hover:scale-105
            transition-all duration-300
            shadow-lg hover:shadow-xl
            transition-all duration-1000 delay-600 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          Så jobbar vi
        </button>
      </div>
    </section>
  );
};

export default ServicesHeroSection;

import React from 'react';

interface CandidatesHeroSectionProps {
  isVisible: boolean;
  handleBrowseRoles: () => void;
}

const CandidatesHeroSection: React.FC<CandidatesHeroSectionProps> = ({
  isVisible,
  handleBrowseRoles,
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg"
          alt="Professional team meeting and collaboration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        <h1 className={`
          text-6xl md:text-7xl font-extralight text-white mb-6 tracking-tight leading-[0.9]
          transition-all duration-1000 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}>
          <span className="block font-light">Hitta Jobbet</span>
          <span className="block font-normal">Som Passar Dig</span>
        </h1>

        <p className={`
          text-2xl text-white/80 mb-12 font-light leading-relaxed
          transition-all duration-1000 delay-200 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          Vi matchar dig med rätt jobb – snabbt och utan krångel.
        </p>

        <button
          onClick={handleBrowseRoles}
          className={`
            px-8 py-4 
            bg-blue-600 text-white rounded-xl
            font-semibold text-lg tracking-wide
            hover:bg-blue-700 hover:scale-105
            transition-all duration-300
            shadow-lg hover:shadow-xl
            min-w-[250px]
            transition-all duration-1000 delay-400 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          Visa lediga jobb
        </button>
      </div>
    </section>
  );
};

export default CandidatesHeroSection;
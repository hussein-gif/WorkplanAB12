import React from 'react';
import { ArrowDown } from 'lucide-react';

interface AboutHeroSectionProps {
  isVisible: boolean;
  scrollToStory: () => void;
}

const AboutHeroSection: React.FC<AboutHeroSectionProps> = ({
  isVisible,
  scrollToStory,
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-8 text-center">
        {/* Main Heading */}
        <h1 className={`
          text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight leading-tight
          transition-all duration-1000 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}>
          Om Workplan
        </h1>

        {/* Subheading */}
        <p className={`
          text-xl md:text-2xl text-white/80 mb-8 font-light leading-relaxed max-w-4xl mx-auto
          transition-all duration-1000 delay-200 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          Specialiserad bemanning inom lager & logistik – snabb leverans, personlig service och full transparens.
        </p>

        {/* Primary CTA */}
        <button
          onClick={scrollToStory}
          className={`
            group px-8 py-4 mb-8
            bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl
            font-semibold text-lg tracking-wide
            hover:border-white/40 hover:bg-white/20
            transition-all duration-300
            min-w-[180px]
            transition-all duration-1000 delay-400 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          <div className="flex items-center justify-center space-x-2">
            <span>Läs vår resa</span>
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
          </div>
        </button>

        {/* Trust Chips */}
        <div className={`
          flex flex-wrap items-center justify-center gap-4 text-sm text-white/70
          transition-all duration-1000 delay-600 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <span>Grundat 2025</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <span>Fokus: Lager & Logistik</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <span>Baserade i Örebro</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
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
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '1000px',
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="https://i.ibb.co/DPq2LRqB/image-Photo-Grid.png"
          alt="About Workplan background"
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
        {/* Mörk overlay för läsbarhet */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"
          aria-hidden="true"
        />
      </div>

      {/* Centralt innehåll */}
      <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
        {/* Main Heading */}
        <h1
          style={{
            fontFamily:
              '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            willChange: 'transform, opacity',
          }}
          className={`
          text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 tracking-tight leading-tight
          transition-all duration-1000 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}
        >
          Om Workplan
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontFamily:
              'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            willChange: 'transform, opacity',
          }}
          className={`
          text-sm md:text-base text-white/80 mb-8 font-light leading-relaxed max-w-4xl mx-auto
          transition-all duration-1000 delay-200 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}
        >
          Specialiserad bemanning inom lager & logistik.
        </p>

        {/* Primary CTA */}
        <button
          onClick={scrollToStory}
          style={{
            fontFamily:
              'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            willChange: 'transform, opacity',
          }}
          className={`
            group px-8 py-4 mb-8
            bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl
            font-medium text-lg tracking-wide
            hover:border-white/40 hover:bg-white/20
            transition-all duration-300
            min-w-[180px]
            transition-all duration-1000 delay-400 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          <div className="flex items-center justify-center space-x-2">
            <span>Läs vår resa</span>
            <ArrowDown
              size={16}
              className="group-hover:translate-y-1 transition-transform duration-300"
              aria-hidden="true"
            />
          </div>
        </button>
      </div>

      {/* Trust Chips */}
      <div className="absolute inset-x-0 bottom-6 px-6 z-10">
        <div
          style={{
            fontFamily:
              'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            willChange: 'transform, opacity',
          }}
          className={`
            flex flex-wrap items-center justify-center gap-4 text-sm text-white/70
            transition-all duration-1000 delay-600 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" aria-hidden="true" />
            <span>Grundat 2025</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" aria-hidden="true" />
            <span>Fokus: Lager & Logistik</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" aria-hidden="true" />
            <span>Baserade i Örebro</span>
          </div>
        </div>
      </div>

      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Zen+Kaku+Gothic+Antique:wght@500&display=swap');
      `}</style>
    </section>
  );
};

export default AboutHeroSection;

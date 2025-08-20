import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Bakgrund */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg"
          alt="Professional background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Innehåll */}
      <div className="relative z-10 flex-1 flex items-center py-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Text */}
            <div className="lg:col-span-7 space-y-8">
              <h1
                className={`
                  text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight
                  transition-all duration-1000
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
              >
                Bemanna ditt <span className="text-blue-400">Drömteam</span>
              </h1>

              <p
                className={`
                  text-lg md:text-xl text-white/80 max-w-2xl
                  transition-all duration-1000 delay-200
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                `}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Vi levererar skräddarsydda bemanningslösningar – snabbt, flexibelt och med rätt kompetens.
              </p>

              {/* Knappar */}
              <div
                className={`
                  flex flex-col sm:flex-row gap-4
                  transition-all duration-1000 delay-400
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                `}
              >
                <button
                  onClick={() => navigate('/jobs')}
                  className="
                    px-6 py-3 min-w-[160px]
                    bg-white text-[#08132B] rounded-xl
                    font-medium text-base
                    shadow-md
                    hover:bg-blue-600 hover:text-white
                    transition-colors duration-300
                  "
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Lediga tjänster
                </button>
                <button
                  onClick={() => navigate('/partner')}
                  className="
                    px-6 py-3 min-w-[160px]
                    bg-transparent text-white border border-white/40 rounded-xl
                    font-medium text-base
                    hover:border-white hover:bg-white/10
                    transition-colors duration-300
                  "
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Bli partner
                </button>
              </div>
            </div>

            {/* Tom yta / Bild */}
            <div className="lg:col-span-5" />
          </div>
        </div>
      </div>

      {/* USP-lista */}
      <div
        className={`
          absolute bottom-8 inset-x-0 z-10
          transition-all duration-1000 delay-600
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}
      >
        <div
          className="flex items-center justify-center space-x-6 text-center text-white/70 text-xs tracking-wide"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <span>FLEXIBILITET</span>
          <span className="text-white/40">|</span>
          <span>PERSONLIG SERVICE</span>
          <span className="text-white/40">|</span>
          <span>SNABB LEVERANS</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // ⬇️ NYTT: upptäck mobilstorlek för att justera skalan (zoom ut på mobil)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    // ⬇️ ÄNDRAT: lite kortare på mobil, oförändrat (screen) på ≥ sm
    <section className="relative min-h-[88vh] sm:min-h-screen flex flex-col overflow-hidden">
      {/* Dynamic Background with Parallax */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{
            // ⬇️ ÄNDRAT: zooma ut på mobil (0.95) och behåll 1.05 på större skärmar
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) scale(${isMobile ? 0.95 : 1.05})`,
          }}
        >
          <img
            src="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg"
            alt="Professional garden landscape"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Animated Geometric Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-96 h-96 rounded-full bg-white/5 blur-3xl animate-pulse"
            style={{
              top: '10%',
              right: '15%',
              animationDuration: '4s',
              transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
            }}
          />
          <div
            className="absolute w-64 h-64 rounded-full bg-blue-500/10 blur-2xl animate-pulse"
            style={{
              bottom: '20%',
              left: '10%',
              animationDuration: '6s',
              animationDelay: '2s',
              transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            }}
          />
        </div>
      </div>

      {/* Content – alltid vänsterankrad */}
      <div className="relative z-10 flex-1 flex items-center py-16">
        <div className="w-full px-6 sm:px-8">
          <div className="max-w-3xl text-left">
            <div className="space-y-3">
              <h1
                className={`
                  text-4xl sm:text-5xl lg:text-6xl xl:text-7xl
                  font-light text-white leading-tight tracking-tight
                  transition-all duration-1200 delay-200 transform
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
                `}
              >
                <span
                  className="block text-white"
                  style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 300 }}
                >
                  Bemanna Ditt
                </span>
                <span className="block text-white">
                  <span
                    className="font-medium"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
                  >
                    Drömteam
                  </span>
                  <div className="relative inline-block">
                    <img
                      src="https://i.ibb.co/6c1JcWdr/image.png"
                      alt=""
                      className="absolute top-0 left-0 w-full h-3 object-contain"
                      style={{ transform: 'translateY(8px)' }}
                    />
                  </div>
                </span>
              </h1>

              <div
                className={`
                  w-24 h-px bg-gradient-to-r from-white/60 to-transparent
                  transition-all duration-1000 delay-600 transform
                  ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
                `}
              />

              <p
                className={`
                  text-sm md:text-base text-white/80 italic leading-relaxed
                  transition-all duration-1000 delay-800 transform
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontStyle: 'italic' }}
              >
                Skräddarsydda bemanningslösningar –
                <span className="block mt-1 text-white/60">
                  snabbt, flexibelt och med rätt kompetens.
                </span>
              </p>
            </div>

            {/* Action Buttons – snabbare in-animation */}
            <div
              className={`
                flex flex-col sm:flex-row gap-4 pt-6
                transition-all duration-500 delay-200 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
              style={{ willChange: 'transform, opacity' }}
            >
              {/* VITA KNAPPEN */}
              <button
                onClick={() => navigate('/jobs')}
                className="
                  group relative px-5 py-2.5 min-w-[150px]
                  bg-white text-gray-900 rounded-xl
                  font-semibold text-base tracking-wide
                  transition-all duration-300
                  hover:-translate-y-0.5 active:translate-y-0
                  overflow-hidden select-none
                  shadow-[0_4px_6px_rgba(0,0,0,0.15),0_8px_20px_rgba(0,0,0,0.12)]
                  hover:shadow-[0_6px_10px_rgba(0,0,0,0.2),0_12px_24px_rgba(0,0,0,0.18)]
                  active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
                  border border-white/60
                "
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/90 to-transparent" />
                <span className="pointer-events-none absolute inset-x-2 top-1 h-px bg-gradient-to-r from-white/70 via-white to-white/70" />
                <span className="pointer-events-none absolute -inset-y-8 -left-24 w-24 h-24 rotate-12 bg-white/60 blur-md opacity-0 transform transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-x-[220%]" />
                <span className="relative z-10">Lediga Tjänster</span>
              </button>

              <button
                onClick={() => navigate('/partner')}
                className="
                  group relative px-5 py-2.5 min-w-[150px]
                  bg-transparent text-white border-2 border-white/30 rounded-xl
                  font-semibold text-base tracking-wide
                  hover:border-white/60 hover:bg-white/10
                  transition-all duration-300
                  backdrop-blur-sm
                  hover:scale-105 hover:-translate-y-0.5
                  overflow-hidden
                "
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="relative z-10">Bli Partner</span>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Badges längst ner – ⬇️ DÖLJ PÅ MOBIL, visa på ≥ sm */}
      <div
        className={`
          absolute bottom-8 inset-x-0 z-10
          transition-all duration-1000 delay-1200 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          hidden sm:block
        `}
      >
        <div
          className="flex items-center justify-center space-x-6 text-center text-white/70"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '12px',
            letterSpacing: '0.08em',
          }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-blue-400/60 rounded-full" />
            <span className="uppercase">FLEXIBILITET</span>
          </div>
          <span className="text-white/40">|</span>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-emerald-400/60 rounded-full" />
            <span className="uppercase">PERSONLIG SERVICE</span>
          </div>
          <span className="text-white/40">|</span>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-purple-400/60 rounded-full" />
            <span className="uppercase">SNABB LEVERANS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

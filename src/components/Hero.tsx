import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 639px)').matches;

  // ↓ Lite lugnare parallax på desktop
  const parallaxX = isMobile ? 0.0 : 0.012;
  const parallaxY = isMobile ? 0.0 : 0.012;

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Dynamic Background with Parallax */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * parallaxX}px, ${
              mousePosition.y * parallaxY
            }px) scale(1.05)`,
          }}
        >
          {/* Mobil: nuvarande bild (oförändrad) */}
          <img
            src="https://i.ibb.co/LdnVsvf2/IMAGE-2025-08-22-23-02-16.jpg"
            alt="Professional staffing and teamwork"
            className="w-full h-full object-cover block sm:hidden"
            loading="lazy"
          />

          {/* Desktop: ny bild + performance-attribut */}
          <img
            src="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg"
            alt="Professional staffing and teamwork"
            className="w-full h-full object-cover hidden sm:block"
            fetchPriority="high"
            sizes="(min-width: 640px) 100vw, 100vw"
            srcSet="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg 1600w"
          />
        </div>

        {/* Overlays */}
        {/* Starkare vänster→höger scrim på desktop för bättre kontrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70 sm:bg-none" />
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black/80 via-black/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:from-black/50" />

        {/* Animated Geometric Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute w-96 h-96 rounded-full bg-white/5 blur-3xl animate-pulse ${
              isMobile ? 'opacity-40' : 'opacity-100'
            }`}
            style={{
              top: '10%',
              right: '15%',
              animationDuration: '4s',
              transform: `translate(${mousePosition.x * 0.05}px, ${
                mousePosition.y * 0.05
              }px)`,
            }}
          />
          <div
            className={`absolute w-64 h-64 rounded-full bg-blue-500/10 blur-2xl animate-pulse ${
              isMobile ? 'opacity-40' : 'opacity-100'
            }`}
            style={{
              bottom: '20%',
              left: '10%',
              animationDuration: '6s',
              animationDelay: '2s',
              transform: `translate(${mousePosition.x * -0.03}px, ${
                mousePosition.y * -0.03
              }px)`,
            }}
          />
          <div
            className={`absolute inset-0 ${
              isMobile ? 'opacity-[0.02]' : 'opacity-[0.03]'
            }`}
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              transform: `translate(${mousePosition.x * 0.01}px, ${
                mousePosition.y * 0.01
              }px)`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center py-12 sm:py-16">
        <div className="w-full px-5 sm:px-8">
          {/* Flytta blocket aningen upp på desktop */}
          <div className="max-w-[40ch] sm:max-w-3xl text-left md:-mt-8">
            {/* Titel + underrubrik */}
            <div
              className={`
                space-y-3 transition-all duration-700
                mt-8 sm:mt-0
              `}
            >
              <h1
                className={`
                  text-[34px] leading-[1.15] tracking-tight
                  sm:text-5xl lg:text-6xl xl:text-7xl
                  font-light text-white
                  transition-all duration-1200 delay-200 transform
                  drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
                `}
              >
                <span
                  className="block text-white tracking-tight"
                  style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 300 }}
                >
                  Bemanna Ditt
                </span>
                <span className="block text-white tracking-tight leading-[0.95]">
                  <span
                    className="font-semibold"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 600 }}
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

              {/* Längre underline, desktop lite längre */}
              <div
                className={`
                  w-28 sm:w-32 h-px bg-gradient-to-r from-white/70 to-transparent
                  transition-all duration-1000 delay-600 transform
                  ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
                `}
              />

              <p
                className={`
                  text-[15px] sm:text-base text-white/85 sm:text-white/80
                  not-italic leading-relaxed
                  max-w-[42ch] sm:max-w-none
                  transition-all duration-1000 delay-800 transform
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                Skräddarsydda bemanningslösningar –
                <span className="block mt-1 text-white/70">
                  snabbt, flexibelt och med rätt kompetens.
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div
              className={`
                flex flex-col sm:flex-row gap-3 sm:gap-4 pt-5 sm:pt-6
                transition-all duration-500 delay-200 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                mt-8 sm:mt-0
              `}
              style={{ willChange: 'transform, opacity' }}
            >
              <button
                aria-label="Se alla lediga tjänster"
                onClick={() => navigate('/jobs')}
                className="
                  group relative w-full sm:w-auto h-12 sm:h-auto px-5 py-2.5
                  bg-white text-gray-900 rounded-xl
                  font-semibold text-[16px] sm:text-base tracking-wide
                  transition-all duration-300
                  hover:-translate-y-0.5 active:translate-y-0
                  overflow-hidden select-none
                  shadow-[0_4px_10px_rgba(0,0,0,0.18)]
                  hover:shadow-[0_6px_14px_rgba(0,0,0,0.22)]
                  active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)]
                  border border-white/60
                  md:ring-1 md:ring-white/20 md:hover:ring-white/40
                "
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/90 to-transparent" />
                <span className="pointer-events-none absolute inset-x-2 top-1 h-px bg-gradient-to-r from-white/70 via-white to-white/70" />
                <span className="relative z-10">Lediga Tjänster</span>
              </button>

              <button
                aria-label="Läs mer och bli partner"
                onClick={() => navigate('/partner')}
                className="
                  group relative w-full sm:w-auto h-12 sm:h-auto px-5 py-2.5
                  bg-white/10 text-white border border-white/35 sm:border-2 sm:border-white/30 rounded-xl
                  font-semibold text-[16px] sm:text-base tracking-wide
                  hover:border-white/60 hover:bg-white/15
                  transition-all duration-300
                  backdrop-blur-sm
                  hover:-translate-y-0.5
                  overflow-hidden
                "
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="relative z-10">Bli Partner</span>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Sekundär länk – desktop-only, liten orientering */}
            <div className="hidden md:block mt-3">
              <button
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white transition-colors text-sm inline-flex items-center gap-1"
                aria-label="Se hur vi jobbar"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Se hur vi jobbar
                <span className="inline-block translate-x-0 group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Diskret scroll-hint – desktop only */}
      <div className="hidden md:flex absolute left-8 bottom-8 items-center gap-2 text-white/70 text-xs tracking-widest">
        <span className="inline-block w-2 h-2 rounded-full bg-white/60 animate-pulse" />
        SCROLLA
      </div>

      {/* Badges längst ner – döljs på mobil (oförändrat) */}
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

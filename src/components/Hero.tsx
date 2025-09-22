import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  // Visibility / motion prefs
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Mouse/parallax (debounced via rAF)
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const lastPos = useRef({ x: 0, y: 0 });

  const [showStickyCTA] = useState(false);
  const ctaContainerRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches,
    []
  );

  const parallaxX = prefersReduced ? 0 : (isMobile ? 0 : 0.012);
  const parallaxY = prefersReduced ? 0 : (isMobile ? 0 : 0.012);

  useEffect(() => {
    setIsVisible(true);

    const onMove = (e: MouseEvent) => {
      lastPos.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(() => {
          setMouse(lastPos.current);
          rafId.current = null;
        });
      }
    };

    if (!prefersReduced) {
      window.addEventListener('mousemove', onMove);
    }

    if (typeof document !== 'undefined' && !prefersReduced) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.type = 'video/mp4';

      link.href = isMobile
        ? 'https://res.cloudinary.com/dsm0pbs0s/video/upload/v1758578798/hero-720p_qhqevv.mp4'
        : 'https://res.cloudinary.com/dsm0pbs0s/video/upload/q_auto,f_auto/hero-1080p_gzycpu.mp4';

      document.head.appendChild(link);
    }

    return () => {
      if (!prefersReduced) window.removeEventListener('mousemove', onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMobile, prefersReduced]);

  useEffect(() => {
    if (!ctaContainerRef.current || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(() => {}, { root: null, threshold: 0 });
    obs.observe(ctaContainerRef.current);
    return () => obs.disconnect();
  }, []);

  const track = (event: string, meta?: Record<string, unknown>) => {
    console.log('[analytics]', event, meta ?? {});
  };

  return (
    <section
      role="banner"
      className="relative min-h-screen flex flex-col overflow-hidden overflow-x-hidden"
      style={{ contentVisibility: 'auto' }}
    >
      {/* === Bakgrund === */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 transition-transform duration-1000 ease-out will-change-transform"
          style={{
            transform: `translate(${mouse.x * parallaxX}px, ${mouse.y * parallaxY}px) scale(1.05)`,
          }}
        >
          {/* Mobil */}
          {prefersReduced ? (
            <picture className="block sm:hidden w-full h-full">
              <img
                src="https://i.ibb.co/LdnVsvf2/IMAGE-2025-08-22-23-02-16.jpg"
                alt="Professional staffing and teamwork"
                className="w-full h-full object-cover object-[center_65%]"
                loading="lazy"
                decoding="async"
              />
            </picture>
          ) : (
            <div className="block sm:hidden w-full h-full">
              <video
                className="w-full h-full object-cover object-[center_65%]"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source
                  src="https://res.cloudinary.com/dsm0pbs0s/video/upload/v1758578798/hero-720p_qhqevv.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          )}

          {/* Desktop */}
          {prefersReduced ? (
            <picture className="hidden sm:block w-full h-full">
              <img
                src="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg"
                alt="Professional staffing and teamwork"
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
            </picture>
          ) : (
            <div className="hidden sm:block w-full h-full">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src="https://res.cloudinary.com/dsm0pbs0s/video/upload/q_auto,f_auto/hero-1080p_gzycpu.mp4" type="video/mp4" />
              </video>
            </div>
          )}
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/10 sm:bg-none" />
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black/80 via-black/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:from-black/50" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:hidden pointer-events-none" />
      </div>

      {/* === Innehåll === */}
      <div className="relative z-10 flex-1 flex items-center py-12 sm:py-16">
        <div
          className="w-full sm:px-8"
          style={{
            paddingLeft: 'max(env(safe-area-inset-left), 2.25rem)',
            paddingRight: 'max(env(safe-area-inset-right), 1.25rem)',
          }}
        >
          <div className="max-w-[40ch] sm:max-w-3xl text-center sm:text-left md:-mt-8">
            <div
              className={`
                space-y-3 transition-all duration-700
                mt-4 sm:mt-0
              `}
            >
              <h1
                className={`
                  text-[clamp(32px,8vw,40px)] leading-[1.08] tracking-tight
                  sm:text-5xl lg:text-6xl xl:text-7xl sm:leading-[0.95]
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
                </span>
              </h1>

              <div
                className={`
                  w-28 sm:w-32 h-px bg-gradient-to-r from-white/70 to-transparent mx-auto sm:mx-0
                  transition-all duration-1000 delay-600 transform
                  ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
                `}
              />

              <p
                className={`
                  text-[17px] sm:text-base text-white/85 sm:text-white/80
                  not-italic leading-relaxed
                  max-w-[42ch] sm:max-w-none
                  transition-all duration-1000 delay-800 transform
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                  line-clamp-2 sm:line-clamp-none
                  mx-auto sm:mx-0
                `}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                Skräddarsydda bemanningslösningar –
                <span className="block mt-1 text-white/70">
                  snabbt, flexibelt och med rätt kompetens.
                </span>
              </p>
            </div>

            {/* Knappar */}
            <div
              ref={ctaContainerRef}
              className={`
                flex flex-col sm:flex-row gap-3 sm:gap-4 pt-5 sm:pt-6
                transition-all duration-500 delay-200 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                mt-8 sm:mt-0
                items-center sm:items-start justify-center sm:justify-start
              `}
            >
              <button
                aria-label="Se alla lediga tjänster"
                onClick={() => {
                  track('cta_click', { id: 'jobs_primary', placement: 'hero' });
                  navigate('/jobs');
                }}
                className="group relative w-auto min-w-[14rem] max-w-[16rem] sm:w-auto min-h-[52px] px-5 py-2.5
                  bg-white text-gray-900 rounded-xl
                  font-semibold text-[16px] sm:text-base tracking-wide
                  transition-all duration-200 sm:duration-300
                  hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]
                  overflow-hidden select-none
                  shadow-[0_4px_10px_rgba(0,0,0,0.18)]
                  hover:shadow-[0_6px_14px_rgba(0,0,0,0.22)]
                  active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)]
                  border border-white/60
                  md:ring-1 md:ring-white/20 md:hover:ring-white/40
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="relative z-10">Lediga Tjänster</span>
              </button>

              <button
                aria-label="Läs mer och bli partner"
                onClick={() => {
                  track('cta_click', { id: 'partner_secondary', placement: 'hero' });
                  navigate('/partner');
                }}
                className="group relative w-auto min-w-[14rem] max-w-[16rem] sm:w-auto min-h-[52px] px-5 py-2.5
                  bg-white/10 text-white border border-white/50 sm:border-2 sm:border-white/30 rounded-xl
                  font-semibold text-[16px] sm:text-base tracking-wide
                  hover:border-white/70 hover:bg-white/15
                  transition-all duration-200 sm:duration-300
                  backdrop-blur-sm
                  hover:-translate-y-0.5 active:scale-[0.99]
                  overflow-hidden
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="relative z-10">Bli Partner</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

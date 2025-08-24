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

  // Sticky CTA (mobil) – syns när knappraden inte längre är i bild
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const ctaContainerRef = useRef<HTMLDivElement | null>(null);

  // Device helpers
  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches,
    []
  );

  // Parallax multipliers
  const parallaxX = prefersReduced ? 0 : (isMobile ? 0 : 0.012);
  const parallaxY = prefersReduced ? 0 : (isMobile ? 0 : 0.012);

  useEffect(() => {
    setIsVisible(true);

    // rAF mouse parallax
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

    // Preload desktop LCP-bild (lägg i <head>)
    if (typeof document !== 'undefined' && !isMobile) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      // AVIF preload (bäst), annars JPEG
      link.href = 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg';
      document.head.appendChild(link);
    }

    return () => {
      if (!prefersReduced) window.removeEventListener('mousemove', onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMobile, prefersReduced]);

  // Sticky CTA observer (mobil)
  useEffect(() => {
    if (!ctaContainerRef.current || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setShowStickyCTA(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );
    obs.observe(ctaContainerRef.current);
    return () => obs.disconnect();
  }, []);

  // Analytics helpers
  const track = (event: string, meta?: Record<string, unknown>) => {
    // Byt till din analytics (GA4, PostHog, etc.)
    // eslint-disable-next-line no-console
    console.log('[analytics]', event, meta ?? {});
  };

  return (
    <section
      role="banner"
      className="relative min-h-screen flex flex-col overflow-hidden overflow-x-hidden"
      style={{ contentVisibility: 'auto' }}
    >
      {/* === Bakgrund med parallax === */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 transition-transform duration-1000 ease-out will-change-transform"
          style={{
            transform: `translate(${mouse.x * parallaxX}px, ${mouse.y * parallaxY}px) scale(1.05)`,
          }}
        >
          {/* <picture> med AVIF/WebP/JPEG och separata källor för mobil/desktop */}
          {/* Mobil */}
          <picture className="block sm:hidden w-full h-full">
            <source
              type="image/avif"
              srcSet="
                https://i.ibb.co/LdnVsvf2/IMAGE-2025-08-22-23-02-16.jpg 1000w
              "
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet="
                https://i.ibb.co/LdnVsvf2/IMAGE-2025-08-22-23-02-16.jpg 1000w
              "
              sizes="100vw"
            />
            <img
              src="https://i.ibb.co/LdnVsvf2/IMAGE-2025-08-22-23-02-16.jpg"
              alt="Professional staffing and teamwork"
              className="w-full h-full object-cover object-[center_65%]"
              loading="lazy"
              decoding="async"
            />
          </picture>

          {/* Desktop */}
          <picture className="hidden sm:block w-full h-full">
            <source
              type="image/avif"
              srcSet="
                https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg 1280w,
                https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg 1920w,
                https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg 2560w
              "
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet="
                https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg 1280w,
                https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg 1920w,
                https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg 2560w
              "
              sizes="100vw"
            />
            <img
              src="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg"
              alt="Professional staffing and teamwork"
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
          </picture>
        </div>

        {/* Overlays */}
        {/* Mobil: starkare vänster→höger scrim för läsbarhet */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/10 sm:bg-none" />
        {/* Desktop: vänster→höger scrim (från din senaste version) */}
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black/80 via-black/55 to-transparent" />
        {/* Topp-scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:from-black/50" />
        {/* Mobil: vignette i botten så knappar står på mörkare yta */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:hidden pointer-events-none" />

        {/* Geometriska element – tonas ned om prefers-reduced-motion */}
        {!prefersReduced && (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`absolute w-96 h-96 rounded-full bg-white/5 blur-3xl animate-pulse ${
                isMobile ? 'opacity-40' : 'opacity-100'
              }`}
              style={{
                top: '10%',
                right: '15%',
                animationDuration: '4s',
                transform: `translate(${mouse.x * 0.05}px, ${mouse.y * 0.05}px)`,
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
                transform: `translate(${mouse.x * -0.03}px, ${mouse.y * -0.03}px)`,
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
                transform: `translate(${mouse.x * 0.01}px, ${mouse.y * 0.01}px)`,
              }}
            />
          </div>
        )}
      </div>

      {/* === Innehåll === */}
      <div className="relative z-10 flex-1 flex items-center py-12 sm:py-16">
        {/* Safe-area vänster/höger på mobil */}
        <div
          className="w-full sm:px-8"
          style={{
            paddingLeft: 'max(env(safe-area-inset-left), 1.25rem)',
            paddingRight: 'max(env(safe-area-inset-right), 1.25rem)',
          }}
        >
          {/* Lätt uppdraget block på desktop */}
          <div className="max-w-[40ch] sm:max-w-3xl text-left md:-mt-8">
            {/* Titel + underrubrik */}
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

              {/* Underline */}
              <div
                className={`
                  w-28 sm:w-32 h-px bg-gradient-to-r from-white/70 to-transparent
                  transition-all duration-1000 delay-600 transform
                  ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
                `}
              />

              {/* Ingress – clampad på mobil */}
              <p
                className={`
                  text-[17px] sm:text-base text-white/85 sm:text-white/80
                  not-italic leading-relaxed
                  max-w-[42ch] sm:max-w-none
                  transition-all duration-1000 delay-800 transform
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                  line-clamp-2 sm:line-clamp-none
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
              `}
              style={{ willChange: 'transform, opacity' }}
            >
              <button
                aria-label="Se alla lediga tjänster"
                onClick={() => {
                  track('cta_click', { id: 'jobs_primary', placement: 'hero' });
                  navigate('/jobs');
                }}
                className="
                  group relative w-full sm:w-auto min-h-[52px] sm:min-h-0 px-5 py-2.5
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
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                "
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/90 to-transparent" />
                <span className="pointer-events-none absolute inset-x-2 top-1 h-px bg-gradient-to-r from-white/70 via-white to-white/70" />
                <span className="relative z-10">Lediga Tjänster</span>
                {/* Shimmer */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-200 sm:duration-500" />
              </button>

              <button
                aria-label="Läs mer och bli partner"
                onClick={() => {
                  track('cta_click', { id: 'partner_secondary', placement: 'hero' });
                  navigate('/partner');
                }}
                className="
                  group relative w-full sm:w-auto min-h-[52px] sm:min-h-0 px-5 py-2.5
                  bg-white/10 text-white border border-white/50 sm:border-2 sm:border-white/30 rounded-xl
                  font-semibold text-[16px] sm:text-base tracking-wide
                  hover:border-white/70 hover:bg-white/15
                  transition-all duration-200 sm:duration-300
                  backdrop-blur-sm
                  hover:-translate-y-0.5 active:scale-[0.99]
                  overflow-hidden
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                "
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="relative z-10">Bli Partner</span>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:duration-300" />
              </button>
            </div>

            {/* Mikro-social proof under primär CTA (mobil) */}
            <div className="mt-1 text-xs text-white/70 sm:hidden">
              Svar inom 24h • +240 tillsättningar i år
            </div>

            {/* Sekundär länk – desktop (oförändrad) */}
            <div className="hidden md:block mt-3">
              <button
                onClick={() => {
                  track('cta_click', { id: 'see_how', placement: 'hero' });
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

      {/* Sticky mini-CTA – visas på mobil när knapparna gått ur bild */}
      {showStickyCTA && (
        <div className="sm:hidden fixed inset-x-0 bottom-0 z-20 px-[max(env(safe-area-inset-left),1rem)] pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2">
          <div className="rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 p-2 shadow-2xl">
            <button
              aria-label="Se alla lediga tjänster"
              onClick={() => {
                track('cta_click', { id: 'jobs_primary_sticky', placement: 'hero_sticky' });
                navigate('/jobs');
              }}
              className="w-full h-12 rounded-xl bg-white text-gray-900 font-semibold tracking-wide active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Visa lediga jobb
            </button>
          </div>
        </div>
      )}

      {/* Scroll-hint – desktop (oförändrad) */}
      <div className="hidden md:flex absolute left-8 bottom-8 items-center gap-2 text-white/70 text-xs tracking-widest">
        <span className="inline-block w-2 h-2 rounded-full bg-white/60 animate-pulse" />
        SCROLLA
      </div>

      {/* Badges – desktop (oförändrat) */}
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

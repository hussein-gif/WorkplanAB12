import React from 'react';
import { useNavigate } from 'react-router-dom';

const CallToActionSection: React.FC = React.memo(() => {
  const navigate = useNavigate();

  return (
    <section
      className="relative py-12 md:py-24 px-8 overflow-hidden rounded-3xl"
      style={{
        backgroundColor: '#08132B',
        contentVisibility: 'auto',
        containIntrinsicSize: '720px',
      }}
      aria-label="Call To Action"
    >
      {/* Kreativ bakgrund – aurora, grid, konstellationer, glow & vignette */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" inert>
        {/* Aurora-mesh toningar */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(900px 520px at 12% 22%, rgba(49,104,255,0.22), rgba(49,104,255,0) 60%)',
              'radial-gradient(760px 460px at 88% 28%, rgba(0,196,204,0.18), rgba(0,196,204,0) 62%)',
              'radial-gradient(680px 420px at 26% 78%, rgba(120,119,198,0.15), rgba(120,119,198,0) 64%)',
              'radial-gradient(980px 560px at 74% 80%, rgba(0,122,255,0.12), rgba(0,122,255,0) 65%)',
            ].join(','),
            mixBlendMode: 'screen',
          }}
        />

        {/* Diagonal “sheen” för premium-känsla */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            transform: 'rotate(-8deg)',
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0) 70%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          }}
        />

        {/* Subtilt gridmönster */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '44px 44px',
            opacity: 0.7,
          }}
        />

        {/* Koncentriska bågar (conic glints) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] opacity-15"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.10) 0deg, rgba(255,255,255,0) 50deg, rgba(255,255,255,0.10) 100deg, rgba(255,255,255,0) 150deg, rgba(255,255,255,0.10) 210deg, rgba(255,255,255,0) 260deg, rgba(255,255,255,0.10) 320deg, rgba(255,255,255,0) 360deg)',
            WebkitMaskImage:
              'radial-gradient(circle at center, transparent 0, black 28%, black 55%, transparent 70%)',
            maskImage:
              'radial-gradient(circle at center, transparent 0, black 28%, black 55%, transparent 70%)',
          }}
        />

        {/* Diskreta “stjärnor”/prickar */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              'radial-gradient(1px 1px at 18% 26%, rgba(255,255,255,0.35) 50%, transparent 51%)',
              'radial-gradient(1px 1px at 62% 12%, rgba(255,255,255,0.25) 50%, transparent 51%)',
              'radial-gradient(1px 1px at 82% 72%, rgba(255,255,255,0.25) 50%, transparent 51%)',
              'radial-gradient(1px 1px at 36% 82%, rgba(255,255,255,0.2) 50%, transparent 51%)',
            ].join(', '),
            opacity: 0.25,
          }}
        />

        {/* Ultra-fin noise för textur */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.55\"/></svg>')",
          }}
        />

        {/* Vignette som drar fokus inåt */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 700px at 50% 20%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.25) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl text-white mb-12 leading-tight font-medium"
          style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
        >
          Redo att stärka ert team?
        </h2>

        <button
          onClick={() => {
            const element = document.getElementById('kontakt-form');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigate('/contact');
            }
          }}
          className="
            group relative px-10 py-4 
            rounded-2xl
            text-white text-lg tracking-wide
            transition-all duration-300
            shadow-lg hover:shadow-xl
            hover:scale-105
            overflow-hidden
            min-w-[200px]
            border border-white/15
            bg-white/5 hover:bg-white/10
          "
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        >
          {/* Inre gradientglow */}
          <span
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.12))',
            }}
          />
          {/* Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
          <span className="relative z-10">Kontakta oss</span>
        </button>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </section>
  );
});

CallToActionSection.displayName = 'CallToActionSection';

export default CallToActionSection;

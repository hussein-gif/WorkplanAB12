import React from 'react';
import { useNavigate } from 'react-router-dom';

const CallToActionSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      className="
        relative py-24 px-8 overflow-hidden rounded-3xl
      "
      style={{ backgroundColor: '#08132B' }}
    >
      {/* Bakgrundsdesign */}
      <div className="absolute inset-0 pointer-events-none">
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
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.55\"/></svg>')",
          }}
        />
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
          className="group inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl text-white text-lg tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden min-w-[200px] btn-min"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          Kontakta oss
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Zen+Kaku+Gothic+Antique:wght@500&display=swap');
        
        .btn-min {
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.12)), #189A4C;
          border-radius: 0.75rem;
          box-shadow: 0 8px 20px rgba(24, 154, 76, 0.28);
        }
        .btn-min:hover {
          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.14)), #1FB259;
          box-shadow: 0 10px 28px rgba(24, 154, 76, 0.35);
        }
        .btn-min:active {
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.25), 0 6px 18px rgba(24, 154, 76, 0.24);
        }
        .btn-min:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(52, 211, 153, .35), 0 0 0 1px rgba(255,255,255,.2) inset;
        }
      `}</style>
    </section>
  );
};

export default CallToActionSection;

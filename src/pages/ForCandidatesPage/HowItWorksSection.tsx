import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  isVisible: boolean;
}

type PieceKind = 'arrow-right' | 'socket-left' | 'both';

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ isVisible }) => {
  const steps: Array<{
    number: string;
    title: string;
    description: string;
    kind: PieceKind;
  }> = [
    {
      number: '01',
      title: 'Steg 1 – Sök & Välj',
      description: 'Utforska roller som matchar dina mål och intressen.',
      kind: 'arrow-right',
    },
    {
      number: '02',
      title: 'Steg 2 – Matchning & Intervjuer',
      description:
        'Vi matchar din profil, genomför intervjuer och presenterar dig sedan för arbetsgivaren.',
      kind: 'both',
    },
    {
      number: '03',
      title: 'Steg 3 – Starta Ditt Nya Jobb',
      description: 'Acceptera erbjudandet och kickstarta nästa kapitel.',
      kind: 'socket-left',
    },
  ];

  return (
    <section className="relative py-28 px-6 overflow-hidden" aria-label="Så går det till">
      {/* =================== DIN BAKGRUND (oförändrad, samma dubbla lager) =================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-0" style={{background:`
          radial-gradient(ellipse 1200px 800px at 15% 20%, rgba(59,130,246,0.08) 0%, transparent 45%),
          radial-gradient(ellipse 1000px 600px at 85% 10%, rgba(139,92,246,0.06) 0%, transparent 50%),
          radial-gradient(ellipse 800px 1200px at 70% 80%, rgba(236,72,153,0.05) 0%, transparent 40%),
          radial-gradient(ellipse 600px 400px at 30% 70%, rgba(16,185,129,0.07) 0%, transparent 55%),
          radial-gradient(ellipse 900px 500px at 90% 60%, rgba(245,158,11,0.04) 0%, transparent 45%)
        `,animation:'smokeFlow 25s ease-in-out infinite'}}/>
        <div className="absolute inset-0" style={{background:`
          conic-gradient(from 45deg at 20% 30%, transparent 0deg, rgba(59,130,246,0.03) 60deg, transparent 120deg, rgba(139,92,246,0.04) 180deg, transparent 240deg, rgba(236,72,153,0.03) 300deg, transparent 360deg),
          conic-gradient(from 180deg at 80% 70%, transparent 0deg, rgba(16,185,129,0.04) 90deg, transparent 180deg, rgba(245,158,11,0.03) 270deg, transparent 360deg)
        `,animation:'smokeRotate 35s linear infinite'}}/>
        <div className="absolute inset-0" style={{backgroundImage:`
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cpath d='M0,300 Q250,200 500,300 T1000,300 L1000,400 Q750,500 500,400 T0,400 Z' fill='rgba(59,130,246,0.02)'/%3E%3Cpath d='M0,600 Q250,500 500,600 T1000,600 L1000,700 Q750,800 500,700 T0,700 Z' fill='rgba(139,92,246,0.015)'/%3E%3C/svg%3E")
        `,backgroundSize:'100% 100%',animation:'waveFlow 20s ease-in-out infinite'}}/>
        <div className="absolute inset-0" style={{backgroundImage:`
          radial-gradient(2px 2px at 20% 30%, rgba(59,130,246,0.4), transparent),
          radial-gradient(2px 2px at 40% 70%, rgba(139,92,246,0.3), transparent),
          radial-gradient(1px 1px at 90% 40%, rgba(236,72,153,0.4), transparent),
          radial-gradient(1px 1px at 60% 20%, rgba(16,185,129,0.3), transparent),
          radial-gradient(2px 2px at 80% 80%, rgba(245,158,11,0.3), transparent),
          radial-gradient(1px 1px at 10% 60%, rgba(59,130,246,0.2), transparent)
        `,backgroundSize:'300px 300px, 400px 400px, 200px 200px, 350px 350px, 250px 250px, 180px 180px',
          animation:'particleFloat 30s linear infinite'}}/>
        <div className="absolute inset-0" style={{backgroundImage:`
          linear-gradient(90deg, rgba(59,130,246,0.01) 1px, transparent 1px),
          linear-gradient(rgba(139,92,246,0.01) 1px, transparent 1px)
        `,backgroundSize:'60px 60px',animation:'meshShift 40s ease-in-out infinite'}}/>
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-20 blur-2xl" style={{background:'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',animation:'blobFloat1 18s ease-in-out infinite'}}/>
        <div className="absolute top-1/3 right-20 w-24 h-40 rounded-full opacity-15 blur-xl" style={{background:'radial-gradient(ellipse, rgba(139,92,246,0.4) 0%, transparent 60%)',animation:'blobFloat2 22s ease-in-out infinite'}}/>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 rounded-full opacity-25 blur-2xl" style={{background:'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 80%)',animation:'blobFloat3 16s ease-in-out infinite'}}/>
        <div className="absolute bottom-1/3 right-1/3 w-20 h-36 rounded-full opacity-20 blur-xl" style={{background:'radial-gradient(ellipse, rgba(16,185,129,0.35) 0%, transparent 65%)',animation:'blobFloat4 20s ease-in-out infinite'}}/>
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at center, transparent 40%, rgba(255,255,255,0.1) 100%)'}}/>
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{background:`
          radial-gradient(ellipse 1200px 800px at 15% 20%, rgba(59,130,246,0.08) 0%, transparent 45%),
          radial-gradient(ellipse 1000px 600px at 85% 10%, rgba(139,92,246,0.06) 0%, transparent 50%),
          radial-gradient(ellipse 800px 1200px at 70% 80%, rgba(236,72,153,0.05) 0%, transparent 40%),
          radial-gradient(ellipse 600px 400px at 30% 70%, rgba(16,185,129,0.07) 0%, transparent 55%),
          radial-gradient(ellipse 900px 500px at 90% 60%, rgba(245,158,11,0.04) 0%, transparent 45%)
        `,animation:'smokeFlow 25s ease-in-out infinite'}}/>
        <div className="absolute inset-0" style={{background:`
          conic-gradient(from 45deg at 20% 30%, transparent 0deg, rgba(59,130,246,0.03) 60deg, transparent 120deg, rgba(139,92,246,0.04) 180deg, transparent 240deg, rgba(236,72,153,0.03) 300deg, transparent 360deg),
          conic-gradient(from 180deg at 80% 70%, transparent 0deg, rgba(16,185,129,0.04) 90deg, transparent 180deg, rgba(245,158,11,0.03) 270deg, transparent 360deg)
        `,animation:'smokeRotate 35s linear infinite'}}/>
        <div className="absolute inset-0" style={{backgroundImage:`
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cpath d='M0,300 Q250,200 500,300 T1000,300 L1000,400 Q750,500 500,400 T0,400 Z' fill='rgba(59,130,246,0.02)'/%3E%3Cpath d='M0,600 Q250,500 500,600 T1000,600 L1000,700 Q750,800 500,700 T0,700 Z' fill='rgba(139,92,246,0.015)'/%3E%3C/svg%3E")
        `,backgroundSize:'100% 100%',animation:'waveFlow 20s ease-in-out infinite'}}/>
        <div className="absolute inset-0" style={{backgroundImage:`
          radial-gradient(2px 2px at 20% 30%, rgba(59,130,246,0.4), transparent),
          radial-gradient(2px 2px at 40% 70%, rgba(139,92,246,0.3), transparent),
          radial-gradient(1px 1px at 90% 40%, rgba(236,72,153,0.4), transparent),
          radial-gradient(1px 1px at 60% 20%, rgba(16,185,129,0.3), transparent),
          radial-gradient(2px 2px at 80% 80%, rgba(245,158,11,0.3), transparent),
          radial-gradient(1px 1px at 10% 60%, rgba(59,130,246,0.2), transparent)
        `,backgroundSize:'300px 300px, 400px 400px, 200px 200px, 350px 350px, 250px 250px, 180px 180px',
          animation:'particleFloat 30s linear infinite'}}/>
        <div className="absolute inset-0" style={{backgroundImage:`
          linear-gradient(90deg, rgba(59,130,246,0.01) 1px, transparent 1px),
          linear-gradient(rgba(139,92,246,0.01) 1px, transparent 1px)
        `,backgroundSize:'60px 60px',animation:'meshShift 40s ease-in-out infinite'}}/>
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-20 blur-2xl" style={{background:'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',animation:'blobFloat1 18s ease-in-out infinite'}}/>
        <div className="absolute top-1/3 right-20 w-24 h-40 rounded-full opacity-15 blur-xl" style={{background:'radial-gradient(ellipse, rgba(139,92,246,0.4) 0%, transparent 60%)',animation:'blobFloat2 22s ease-in-out infinite'}}/>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 rounded-full opacity-25 blur-2xl" style={{background:'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 80%)',animation:'blobFloat3 16s ease-in-out infinite'}}/>
        <div className="absolute bottom-1/3 right-1/3 w-20 h-36 rounded-full opacity-20 blur-xl" style={{background:'radial-gradient(ellipse, rgba(16,185,129,0.35) 0%, transparent 65%)',animation:'blobFloat4 20s ease-in-out infinite'}}/>
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at center, transparent 40%, rgba(255,255,255,0.1) 100%)'}}/>
      </div>

      {/* ==== SVG CLIP-PATHS (normaliserade till 0..1 så de skalar perfekt) ==== */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* r = .08, chevron bredd = .07, chevron halvhöjd s = .12 */}
          <clipPath id="clip-arrow-right" clipPathUnits="objectBoundingBox">
            <path d="M .08,0 H .92 A .08,.08 0 0 1 1,.08 V .38 L 1.07,.5 1,.62 V .92 A .08,.08 0 0 1 .92,1 H .08 A .08,.08 0 0 1 0,.92 V .08 A .08,.08 0 0 1 .08,0 Z" />
          </clipPath>
          <clipPath id="clip-socket-left" clipPathUnits="objectBoundingBox">
            <path d="M .08,0 H .92 A .08,.08 0 0 1 1,.08 V .92 A .08,.08 0 0 1 .92,1 H .08 A .08,.08 0 0 1 0,.92 V .62 L -.07,.5 0,.38 V .08 A .08,.08 0 0 1 .08,0 Z" />
          </clipPath>
          <clipPath id="clip-both" clipPathUnits="objectBoundingBox">
            <path d="M .08,0 H .92 A .08,.08 0 0 1 1,.08 V .38 L 1.07,.5 1,.62 V .92 A .08,.08 0 0 1 .92,1 H .08 A .08,.08 0 0 1 0,.92 V .62 L -.07,.5 0,.38 V .08 A .08,.08 0 0 1 .08,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* =================== INNEHÅLL =================== */}
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-black">Så Går Det Till</h2>
          <p className="mt-3 text-black/60 max-w-2xl mx-auto">
            En tydlig process från ansökan till anställning – enkelt och professionellt.
          </p>
        </div>

        {/* EN RAD – horisontell scroll på mobil */}
        <div className="relative flex flex-nowrap items-stretch gap-14 overflow-x-auto md:overflow-visible pb-4">
          {steps.map((s, i) => (
            <PuzzleCard key={i} {...s} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            onClick={() => {
              const el = document.getElementById('featured-jobs');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-sky-600 via-indigo-600 to-fuchsia-600 shadow-lg shadow-indigo-200/40 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Bläddra bland jobben ovan
            <ArrowRight size={18} />
            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <span className="absolute left-[-50%] top-0 h-full w-1/3 bg-white/30 skew-x-[-20deg] animate-sheen" />
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes sheen { from { transform: translateX(-120%) skewX(-20deg);} to { transform: translateX(220%) skewX(-20deg);} }
        @keyframes smokeFlow { 0%, 100% { transform: translateX(0) translateY(0) scale(1); } 25% { transform: translateX(20px) translateY(-15px) scale(1.05); } 50% { transform: translateX(-10px) translateY(10px) scale(0.95); } 75% { transform: translateX(15px) translateY(-5px) scale(1.02); } }
        @keyframes smokeRotate { 0% { transform: rotate(0deg) scale(1); } 25% { transform: rotate(90deg) scale(1.1); } 50% { transform: rotate(180deg) scale(0.9); } 75% { transform: rotate(270deg) scale(1.05); } 100% { transform: rotate(360deg) scale(1); } }
        @keyframes waveFlow { 0%, 100% { transform: translateX(0) scaleY(1); } 33% { transform: translateX(-30px) scaleY(1.1); } 66% { transform: translateX(20px) scaleY(0.9); } }
        @keyframes particleFloat { 0%, 100% { transform: translateY(0) translateX(0); } 25% { transform: translateY(-20px) translateX(10px); } 50% { transform: translateY(15px) translateX(-15px); } 75% { transform: translateY(-10px) translateX(5px); } }
        @keyframes meshShift { 0%, 100% { transform: translateX(0) translateY(0); } 50% { transform: translateX(30px) translateY(-20px); } }
        @keyframes blobFloat1 { 0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); } 25% { transform: translate(30px, -20px) scale(1.2) rotate(90deg); } 50% { transform: translate(-20px, 40px) scale(0.8) rotate(180deg); } 75% { transform: translate(25px, -10px) scale(1.1) rotate(270deg); } }
        @keyframes blobFloat2 { 0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); } 33% { transform: translate(-25px, 30px) scale(1.3) rotate(120deg); } 66% { transform: translate(40px, -25px) scale(0.7) rotate(240deg); } }
        @keyframes blobFloat3 { 0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); } 20% { transform: translate(20px, -30px) scale(1.4) rotate(72deg); } 40% { transform: translate(-30px, 20px) scale(0.6) rotate(144deg); } 60% { transform: translate(35px, 10px) scale(1.2) rotate(216deg); } 80% { transform: translate(-15px, -25px) scale(0.9) rotate(288deg); } }
        @keyframes blobFloat4 { 0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); } 30% { transform: translate(-40px, -20px) scale(1.1) rotate(108deg); } 60% { transform: translate(20px, 35px) scale(0.8) rotate(216deg); } }
      `}</style>
    </section>
  );
};

/* ====== KORT med clipPath-form ====== */
type CardProps = {
  number: string;
  title: string;
  description: string;
  kind: PieceKind;
};

const PuzzleCard: React.FC<CardProps> = ({ number, title, description, kind }) => {
  const clipId =
    kind === 'arrow-right' ? 'clip-arrow-right' :
    kind === 'socket-left' ? 'clip-socket-left' : 'clip-both';

  // Z-index så att spetsen från kort 1 kan “gå in i” urtaget på kort 2
  const z =
    kind === 'arrow-right' ? 'z-30' :
    kind === 'both' ? 'z-20' :
    'z-10';

  return (
    <div className={`relative shrink-0 w-[300px] md:w-[340px] ${z}`} style={{overflow:'visible'}}>
      {/* Frosted layer som klipps exakt efter formen */}
      <div
        className="relative h-[300px] md:h-[340px] px-7 py-8 text-black"
        style={{
          WebkitClipPath: `url(#${clipId})`,
          clipPath: `url(#${clipId})`,
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow:
            '0 20px 60px rgba(31,41,55,0.14), inset 0 1px 0 rgba(255,255,255,0.45)',
        }}
      >
        {/* Inre kant för “glas”-känsla som följer formen */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            WebkitClipPath: `url(#${clipId})`,
            clipPath: `url(#${clipId})`,
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.10), inset 0 0 0 2px rgba(255,255,255,0.10)',
            borderRadius: '24px',
          }}
        />

        {/* Innehåll */}
        <div className="relative z-10 flex h-full flex-col">
          <div className="text-4xl md:text-5xl font-extrabold tracking-tight">{number}</div>
          <h3 className="mt-5 text-xl md:text-2xl font-semibold leading-snug">{title}</h3>
          <p className="mt-3 text-sm md:text-base leading-relaxed text-black/80">{description}</p>
          <div className="mt-auto pt-6">
            <div
              className="h-[2px] w-24"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(0,0,0,0.7) 0 8px, transparent 8px 14px)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;

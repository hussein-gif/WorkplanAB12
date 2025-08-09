import React from 'react';
import { Search, UserCheck, Briefcase, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  isVisible: boolean;
}

type PieceKind = 'arrow-right' | 'socket-left' | 'both';

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ isVisible }) => {
  const steps = [
    {
      icon: Search,
      title: 'Steg 1 – Sök & Välj',
      description: 'Utforska roller som matchar dina mål och intressen.',
      number: '01',
      kind: 'arrow-right' as PieceKind,
    },
    {
      icon: UserCheck,
      title: 'Steg 2 – Matchning & Intervjuer',
      description:
        'Vi matchar din profil, genomför intervjuer och presenterar dig sedan för arbetsgivaren.',
      number: '02',
      kind: 'both' as PieceKind, // urtag vänster + spets höger
    },
    {
      icon: Briefcase,
      title: 'Steg 3 – Starta Ditt Nya Jobb',
      description: 'Acceptera erbjudandet och kickstarta nästa kapitel.',
      number: '03',
      kind: 'socket-left' as PieceKind,
    },
  ];

  return (
    <section className="relative py-28 px-6 overflow-hidden text-black" aria-label="Så går det till">
      {/* ======= bakgrund (din kreativa “smoke”) – oförändrad men lätt nedtonad ======= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 1200px 800px at 15% 20%, rgba(59,130,246,0.08) 0%, transparent 45%),
              radial-gradient(ellipse 1000px 600px at 85% 10%, rgba(139,92,246,0.06) 0%, transparent 50%),
              radial-gradient(ellipse 800px 1200px at 70% 80%, rgba(236,72,153,0.05) 0%, transparent 40%),
              radial-gradient(ellipse 600px 400px at 30% 70%, rgba(16,185,129,0.07) 0%, transparent 55%),
              radial-gradient(ellipse 900px 500px at 90% 60%, rgba(245,158,11,0.04) 0%, transparent 45%)
            `,
            animation: 'smokeFlow 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              conic-gradient(from 45deg at 20% 30%, transparent 0deg, rgba(59,130,246,0.03) 60deg, transparent 120deg, rgba(139,92,246,0.04) 180deg, transparent 240deg, rgba(236,72,153,0.03) 300deg, transparent 360deg),
              conic-gradient(from 180deg at 80% 70%, transparent 0deg, rgba(16,185,129,0.04) 90deg, transparent 180deg, rgba(245,158,11,0.03) 270deg, transparent 360deg)
            `,
            animation: 'smokeRotate 35s linear infinite',
          }}
        />
      </div>

      {/* ======= INNEHÅLL ======= */}
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Så Går Det Till</h2>
          <p className="mt-3 text-black/60 max-w-2xl mx-auto">
            En tydlig process från ansökan till anställning – enkelt och professionellt.
          </p>
        </div>

        {/* EN RAD – ingen wrap. På mobil kan man swipea horisontellt */}
        <div className="relative flex flex-nowrap items-stretch gap-8 overflow-x-auto md:overflow-visible pb-4">
          {/* perspektiv för 3D */}
          <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1200px' }} />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const kind = step.kind;

            return (
              <div
                key={idx}
                className="relative shrink-0 w-[320px] md:w-[360px]"
                style={{ perspective: '1200px' }}
              >
                {/* glöd/ram */}
                <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-sky-400/50 via-indigo-500/50 to-fuchsia-500/50 blur-md opacity-80 group-hover:opacity-100 pointer-events-none" />

                {/* KORT (frosted + 3D) */}
                <div
                  className={[
                    'group relative h-full rounded-[28px] ring-1 ring-black/5',
                    'bg-white/15 backdrop-blur-2xl',
                    'shadow-[0_20px_60px_rgba(31,41,55,0.12),inset_0_1px_0_rgba(255,255,255,0.35)]',
                    'px-6 pt-10 pb-8',
                    'transition-transform duration-500',
                    'hover:-translate-y-1',
                  ].join(' ')}
                  style={{
                    transformStyle: 'preserve-3d',
                    // subtil 3D tilt
                    transform: 'rotateX(3deg) rotateY(-3deg)',
                  }}
                >
                  {/* ======= PUSSEL-FORMER ======= */}
                  {/* Spets åt höger */}
                  {(kind === 'arrow-right' || kind === 'both') && (
                    <div
                      className="absolute top-1/2 -right-6 -translate-y-1/2 w-10 h-10"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div
                        className="absolute inset-0 rounded-lg ring-1 ring-black/5 shadow-lg"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))',
                          backdropFilter: 'blur(14px)',
                          WebkitBackdropFilter: 'blur(14px)',
                          // chevron / spets
                          clipPath:
                            'polygon(0% 0%, 60% 0%, 100% 50%, 60% 100%, 0% 100%, 40% 50%)',
                        }}
                      />
                    </div>
                  )}

                  {/* Urtag på vänster */}
                  {(kind === 'socket-left' || kind === 'both') && (
                    <div
                      className="absolute top-1/2 -left-6 -translate-y-1/2 w-10 h-10 pointer-events-none"
                      aria-hidden
                    >
                      {/* Vi “stansar ut” ett hål via mask så bakgrunden syns igenom */}
                      <div
                        className="absolute inset-0"
                        style={{
                          WebkitMaskImage:
                            'radial-gradient(18px 18px at 65% 50%, transparent 65%, black 66%)',
                          maskImage:
                            'radial-gradient(18px 18px at 65% 50%, transparent 65%, black 66%)',
                          background: 'transparent',
                          boxShadow:
                            'inset 0 0 0 1px rgba(0,0,0,0.06), 0 0 0 9999px rgba(255,255,255,0.0)',
                        }}
                      />
                      {/* kant/frost runt urtaget för att matcha frosted glaset */}
                      <div
                        className="absolute inset-0 rounded-lg"
                        style={{
                          clipPath:
                            'polygon(40% 0%, 100% 0%, 100% 100%, 40% 100%, 0% 50%)',
                          background:
                            'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))',
                          opacity: 0.35,
                          filter: 'blur(1px)',
                        }}
                      />
                    </div>
                  )}

                  {/* Ikon-badge */}
                  <div className="relative mx-auto -mt-16 mb-5 w-20 h-20">
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br from-sky-500 via-indigo-600 to-fuchsia-600 opacity-80 ${
                        isVisible ? 'animate-pulseSoft' : ''
                      }`}
                    />
                    <div className="absolute -inset-2 rounded-full bg-white/40 blur-2xl" />
                    <div className="relative grid place-items-center w-full h-full rounded-full bg-gradient-to-br from-sky-600 to-indigo-700 text-white shadow-lg ring-2 ring-white/30">
                      <Icon size={28} />
                    </div>
                  </div>

                  {/* Nummer-pill */}
                  <div className="mx-auto mb-2 w-fit rounded-full border border-black/10 bg-white/60 backdrop-blur px-3 py-1 text-xs font-medium text-black/70">
                    {step.number}
                  </div>

                  {/* Rubrik + text – exakt samma texter */}
                  <h3 className="text-lg font-semibold text-black text-center mb-2">{step.title}</h3>
                  <p className="text-black/80 text-sm leading-relaxed text-center max-w-xs mx-auto">
                    {step.description}
                  </p>

                  {/* subtil inre glans för frosted-känslan */}
                  <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA – oförändrad */}
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

      {/* Keyframes – återanvänder dina + mjuk pulsering */}
      <style>{`
        @keyframes sheen {
          from { transform: translateX(-120%) skewX(-20deg);}
          to { transform: translateX(220%) skewX(-20deg);}
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); filter: blur(0px); opacity: .9;}
          50% { transform: scale(1.06); filter: blur(2px); opacity: 1; }
        }
        @keyframes smokeFlow {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          25% { transform: translateX(20px) translateY(-15px) scale(1.05); }
          50% { transform: translateX(-10px) translateY(10px) scale(0.95); }
          75% { transform: translateX(15px) translateY(-5px) scale(1.02); }
        }
        @keyframes smokeRotate {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.1); }
          50% { transform: rotate(180deg) scale(0.9); }
          75% { transform: rotate(270deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
      `}</style>
    </section>
  );
};

export default HowItWorksSection;

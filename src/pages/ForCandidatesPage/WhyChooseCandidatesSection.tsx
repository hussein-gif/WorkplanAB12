import React from 'react';
import { Clock, Target, Users } from 'lucide-react';

interface WhyChooseCandidatesSectionProps {
  isVisible: boolean;
}

const WhyChooseCandidatesSection: React.FC<WhyChooseCandidatesSectionProps> = ({
  isVisible,
}) => {
  const benefits = [
    {
      icon: Clock,
      title: 'Rätt jobb – snabbt',
      description:
        'Vi matchar dig med uppdrag som passar dina mål och ditt schema. Du får snabb återkoppling.',
      highlight: 'Snabb återkoppling',
      color: 'from-blue-500 to-blue-600',
      variant: 'blue',
    },
    {
      icon: Target,
      title: 'Tydliga villkor & trygg lön',
      description:
        'Klara avtal, korrekt lön i tid och full transparens genom hela uppdraget.',
      highlight: 'Tryggt & transparent',
      color: 'from-emerald-500 to-emerald-600',
      variant: 'emerald',
    },
    {
      icon: Users,
      title: 'Personlig kontakt hela vägen',
      description:
        'En dedikerad kontaktperson stöttar dig från ansökan till avslutat uppdrag.',
      highlight: 'Personlig service',
      color: 'from-purple-500 to-purple-600',
      variant: 'purple',
    },
  ] as const;

  return (
    <section className="relative py-14 md:py-24 px-6 md:px-8 bg-white overflow-hidden -mt-[2px] md:mt-0 scroll-mt-24">
      {/* Background design layers */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.015] md:opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(8,19,43,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(8,19,43,0.1) 1px, transparent 1px)',
          backgroundSize: '22px 22px, 22px 22px',
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full blur-3xl transition-opacity duration-700 ${
          isVisible ? 'opacity-50' : 'opacity-30'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(11,39,77,0.10), rgba(11,39,77,0) 60%)',
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -bottom-24 -left-24 w-[32rem] h-[32rem] rounded-full blur-3xl transition-opacity duration-700 ${
          isVisible ? 'opacity-50' : 'opacity-30'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(2,132,199,0.08), rgba(2,132,199,0) 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[120%] h-32 opacity-10 -rotate-2"
        style={{
          background:
            'linear-gradient(90deg, rgba(8,19,43,0) 0%, rgba(8,19,43,0.06) 20%, rgba(8,19,43,0.06) 80%, rgba(8,19,43,0) 100%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2
            className="text-[26px] md:text-4xl font-semibold text-black tracking-tight"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 600,
            }}
          >
            Därför Väljer Kandidater Oss
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`wc-card is-${benefit.variant} group relative rounded-xl md:rounded-2xl p-6 md:p-8 bg-white pb-8 md:pb-16`}
              >
                <div className="card-pattern absolute inset-0 pointer-events-none rounded-xl md:rounded-2xl" />
                <span className="card-accent" />
                <span className="card-sheen" />

                <div
                  className={`icon-3d relative w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 md:mb-6 mx-auto`}
                >
                  <Icon size={24} className="text-white md:hidden" />
                  <Icon size={28} className="text-white hidden md:block" />
                  <span className="icon-ring" />
                </div>

                {/* Rubrik */}
                <h3
                  className="text-[19px] md:text-xl text-gray-900 tracking-tight mb-2.5 md:mb-3 text-center"
                  style={{
                    fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  {benefit.title}
                </h3>

                {/* Brödtext */}
                <p
                  className="text-gray-600 text-[15px] md:text-base leading-7 md:leading-7 mb-4 md:mb-5 text-center max-w-[32ch] mx-auto"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                  }}
                >
                  {benefit.description}
                </p>

                {/* Highlight – inline på mobil, absolut på desktop */}
                <div className="text-center">
                  <span
                    className="md:hidden inline-flex px-3 py-1 rounded-full text-[11px] font-medium"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      backgroundColor: 'rgba(0,0,0,0.04)',
                      color:
                        benefit.variant === 'blue'
                          ? 'rgb(59,130,246)'
                          : benefit.variant === 'emerald'
                          ? 'rgb(16,185,129)'
                          : 'rgb(168,85,247)',
                    }}
                  >
                    {benefit.highlight}
                  </span>
                </div>

                {/* Desktop-badge (absolut placerad) */}
                <div
                  className="hidden md:block absolute bottom-5 left-1/2 -translate-x-1/2 text-[12px] tracking-wide text-center inline-block px-4 py-1 rounded-full"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    color:
                      benefit.variant === 'blue'
                        ? 'rgb(59,130,246)'
                        : benefit.variant === 'emerald'
                        ? 'rgb(16,185,129)'
                        : 'rgb(168,85,247)',
                  }}
                >
                  {benefit.highlight}
                </div>

                <span className="hidden md:block card-bottom-bar" />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@500;600&family=Inter:wght@300;500;600&display=swap');

        /* Premium card base */
        .wc-card { 
          position: relative; border: 1px solid transparent; border-radius: 1rem;
          background:
            linear-gradient(#ffffff, #ffffff) padding-box,
            var(--border, linear-gradient(135deg, rgba(8,19,43,0.14), rgba(8,19,43,0.06))) border-box;
          box-shadow: 0 8px 24px rgba(8,19,43,0.06);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .wc-card:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(8,19,43,0.10); }

        /* Variant accents */
        .wc-card.is-blue { --border: linear-gradient(135deg, rgba(59,130,246,0.35), rgba(59,130,246,0.12)); --accent: rgba(59,130,246,0.35); }
        .wc-card.is-emerald { --border: linear-gradient(135deg, rgba(16,185,129,0.35), rgba(16,185,129,0.12)); --accent: rgba(16,185,129,0.35); }
        .wc-card.is-purple { --border: linear-gradient(135deg, rgba(168,85,247,0.35), rgba(168,85,247,0.12)); --accent: rgba(168,85,247,0.35); }

        /* Gentle texture */
        .card-pattern { 
          background-image: linear-gradient(rgba(8,19,43,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(8,19,43,0.02) 1px, transparent 1px);
          background-size: 18px 18px, 18px 18px; opacity: .22; border-radius: 1rem; 
        }

        /* Shimmer */
        .card-sheen { position:absolute; inset:0; border-radius: inherit; background: linear-gradient(120deg, transparent, rgba(255,255,255,.35), transparent); transform: translateX(-120%); opacity:0; pointer-events:none; }
        .wc-card:hover .card-sheen { opacity:.35; animation: sheen 1.15s ease; }
        @keyframes sheen { 0% { transform: translateX(-120%);} 100% { transform: translateX(120%);} }

        /* Corner accent & bottom bar */
        .card-accent { position:absolute; inset:-1px; border-radius:inherit; background: radial-gradient(110px 110px at 18% -20%, var(--accent, rgba(8,19,43,.12)), transparent 60%); opacity:.6; pointer-events:none; }
        .card-bottom-bar { position:absolute; left:20px; right:20px; bottom:14px; height:2px; border-radius:2px; background: linear-gradient(90deg, transparent, var(--accent, rgba(8,19,43,.18)), transparent); opacity:.5; transition: opacity .25s ease, transform .25s ease; }
        .wc-card:hover .card-bottom-bar { opacity:.85; transform: translateY(-2px); }

        /* Icon 3D & ring */
        .icon-3d { box-shadow: 0 10px 18px rgba(8,19,43,.08), inset 0 1px 0 rgba(255,255,255,.45); transition: transform .22s ease; }
        .wc-card:hover .icon-3d { transform: translateY(-1px); }
        .icon-3d::after { content: ''; position: absolute; inset: 1px; border-radius: inherit; background: radial-gradient(ellipse at 50% 22%, rgba(255,255,255,.6), transparent 55%); pointer-events: none; }
        .icon-ring { position:absolute; inset:-8px; border-radius:inherit; background: radial-gradient(90px 90px at 50% 50%, rgba(255,255,255,.5), rgba(255,255,255,0) 60%); mix-blend-mode: overlay; pointer-events:none; }
      `}</style>
    </section>
  );
};

export default WhyChooseCandidatesSection;

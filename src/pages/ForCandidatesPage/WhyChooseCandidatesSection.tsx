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
    <section className="relative py-24 px-8 bg-white overflow-hidden">
      {/* Background design layers */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(8,19,43,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(8,19,43,0.04) 1px, transparent 1px)',
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
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-semibold text-black"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 600,
            }}
          >
            Därför Väljer Kandidater Oss
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`wc-card is-${benefit.variant} group relative rounded-2xl p-8 bg-white`}
              >
                <div className="card-pattern absolute inset-0 pointer-events-none rounded-2xl" />
                <span className="card-accent" />
                <span className="card-sheen" />

                <div
                  className={`icon-3d relative w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 mx-auto`}
                >
                  <Icon size={28} className="text-white" />
                  <span className="icon-ring" />
                </div>

                <h3
                  className="text-xl font-semibold text-gray-900 mb-3 text-center"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {benefit.title}
                </h3>
                <p
                  className="text-gray-600 leading-relaxed mb-5 text-center"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {benefit.description}
                </p>
                <div
                  className="text-[11px] font-medium uppercase tracking-wider text-gray-800 text-center inline-block px-3 py-1 rounded-full bg-gray-100"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {benefit.highlight}
                </div>

                <span className="card-bottom-bar" />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@600&family=Inter:wght@400;500;600&display=swap');

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

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
      {/* Background design layers (balanced JSX) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(8,19,43,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(8,19,43,0.04) 1px, transparent 1px)',
          backgroundSize: '22px 22px, 22px 22px',
          backgroundPosition: '0 0, 0 0',
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full blur-3xl transition-opacity duration-700 ${
          isVisible ? 'opacity-50' : 'opacity-30'
        }`}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(11,39,77,0.10), rgba(11,39,77,0) 60%)',
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -bottom-24 -left-24 w-[32rem] h-[32rem] rounded-full blur-3xl transition-opacity duration-700 ${
          isVisible ? 'opacity-50' : 'opacity-30'
        }`}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(2,132,199,0.08), rgba(2,132,199,0) 60%)',
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
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
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
                className="group relative bg-white border border-gray-200 rounded-2xl p-8 shadow-[0_8px_24px_rgba(8,19,43,0.06)] hover:shadow-[0_14px_32px_rgba(8,19,43,0.08)] transition-shadow"
              >
                <div className="card-pattern absolute inset-0 pointer-events-none" />
                <div className={`icon-3d relative w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 mx-auto`}>
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-5 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {benefit.description}
                </p>
                <div className="card-chip text-[11px] font-medium uppercase tracking-wider text-gray-800 text-center inline-block px-3 py-1 rounded-full bg-gray-100">
                  {benefit.highlight}
                </div>
              </div>
            );
          })}
        </div>
      </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        /* Subtle inner pattern (same for all cards) */
        .card-pattern { 
          background-image: linear-gradient(rgba(8,19,43,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(8,19,43,0.02) 1px, transparent 1px);
          background-size: 18px 18px, 18px 18px; 
          opacity: .28; border-radius: 1rem; 
        }

        /* Icon container 3D feel */
        .icon-3d { 
          box-shadow: 0 10px 18px rgba(8,19,43,.08), inset 0 1px 0 rgba(255,255,255,.45);
        }
        .icon-3d::after {
          content: ''; position: absolute; inset: 1px; border-radius: inherit;
          background: radial-gradient(ellipse at 50% 22%, rgba(255,255,255,.6), transparent 55%);
          pointer-events: none;
        }

        /* Highlight chip refinement */
        .card-chip { box-shadow: 0 2px 6px rgba(8,19,43,0.06); }
      `}</style>
    </section>
  );
};

export default WhyChooseCandidatesSection;

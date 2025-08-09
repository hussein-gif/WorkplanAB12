import React from 'react';
import { Search, UserCheck, Briefcase, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  isVisible: boolean;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ isVisible }) => {
  const steps = [
    { icon: Search, title: 'Steg 1 – Sök & Välj', description: 'Utforska roller som matchar dina mål och intressen.', number: '01' },
    { icon: UserCheck, title: 'Steg 2 – Matchning & Intervjuer', description: 'Vi matchar din profil, genomför intervjuer och presenterar dig sedan för arbetsgivaren.', number: '02' },
    { icon: Briefcase, title: 'Steg 3 – Starta Ditt Nya Jobb', description: 'Acceptera erbjudandet och kickstarta nästa kapitel.', number: '03' },
  ];

  return (
    <section
      className="relative py-28 px-6 overflow-hidden text-black"
      aria-label="Så går det till"
      style={{
        backgroundColor: '#ffffff',
        // Subtil, professionell bakgrund: mjuka färgfläckar + diskret grid som påminner om din nuvarande stil.
        backgroundImage: `
          radial-gradient(1000px 600px at 110% -10%, rgba(56,189,248,0.12) 0%, rgba(56,189,248,0) 60%),
          radial-gradient(800px 500px at -10% 110%, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0) 60%),
          radial-gradient(600px 400px at 50% -20%, rgba(236,72,153,0.08) 0%, rgba(236,72,153,0) 60%),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23000' opacity='0.06'/%3E%3C/svg%3E")
        `,
        backgroundBlendMode: 'screen, screen, screen, normal',
        backgroundSize: 'cover, cover, cover, 16px 16px',
        backgroundPosition: 'center',
      }}
    >
      {/* =================== INNEHÅLL =================== */}
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Så Går Det Till</h2>
          <p className="mt-3 text-black/60 max-w-2xl mx-auto">
            En tydlig process från ansökan till anställning – enkelt och professionellt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="group relative" style={{ perspective: '1000px' }}>
                {/* Gradient-ram */}
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-sky-400/60 via-indigo-500/60 to-emerald-400/60 opacity-80 blur-md transition-all duration-500 group-hover:opacity-100" />

                {/* Kort */}
                <div className="relative rounded-3xl bg-white/75 backdrop-blur-xl ring-1 ring-black/5 shadow-xl px-6 pt-8 pb-7 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
                  {/* Ikon */}
                  <div className="relative mx-auto -mt-14 mb-4 w-20 h-20">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-sky-500 via-indigo-600 to-fuchsia-600 opacity-80 ${isVisible ? 'animate-pulseSoft' : ''}`} />
                    <div className="absolute -inset-2 rounded-full bg-white/40 blur-2xl" />
                    <div className="relative grid place-items-center w-full h-full rounded-full bg-gradient-to-br from-sky-600 to-indigo-700 text-white shadow-lg ring-2 ring-white/30">
                      <Icon size={28} />
                    </div>
                  </div>

                  <div className="mx-auto mb-2 w-fit rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-black/70">
                    {step.number}
                  </div>

                  <h3 className="text-lg font-semibold text-black text-center mb-2">{step.title}</h3>
                  <p className="text-black/80 text-sm leading-relaxed text-center max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
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

      {/* Keyframes */}
      <style>{`
        @keyframes sheen {
          from { transform: translateX(-120%) skewX(-20deg);}
          to { transform: translateX(220%) skewX(-20deg);}
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); filter: blur(0px); opacity: .9;}
          50% { transform: scale(1.06); filter: blur(2px); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorksSection;

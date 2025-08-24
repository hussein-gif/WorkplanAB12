import React from 'react';

interface CandidatesHeroSectionProps {
  isVisible: boolean;
  handleBrowseRoles: () => void;
}

const CandidatesHeroSection: React.FC<CandidatesHeroSectionProps> = ({
  isVisible,
  handleBrowseRoles,
}) => {
  return (
    <section className="relative min-h-[calc(100svh+3px)] md:min-h-screen flex items-center justify-start overflow-hidden md:mb-0">
      {/* Ny bakgrundsbild */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co/ZzdGcXm1/2e9d69c0-7749-414b-bc27-fefb6a4061e7.png"
          alt="Professionell arbetsmiljö"
          className="w-full h-full object-cover object-[center_right] md:object-center"
        />
        {/* Starkare overlay på mobil, svagare på desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/30 md:from-black/60 md:via-black/40 md:to-black/10" />
      </div>

      {/* Inre wrapper: behåller mobil-stacken men blir två kolumner på md+ */}
      <div className="relative z-10 w-full px-8 md:px-24 lg:px-28 text-left max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 md:items-center gap-8 lg:gap-12">
          {/* Vänster kolumn: rubrik, underrubrik, CTA */}
          <div className="max-w-4xl">
            {/* Rubrik */}
            <h1
              className={`
                text-[2.5rem] sm:text-6xl md:text-7xl text-white mb-5 md:mb-6
                leading-[0.88] md:leading-tight
                tracking-[-0.01em] md:tracking-tight
                [text-wrap:balance] max-w-[17ch] md:max-w-none
                drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]
                transition-all duration-1000 transform
                ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}
              `}
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 200 }}
            >
              <span className="block">Hitta Jobbet</span>
              {/* starkare vikt på desktop för tydligare hierarki */}
              <span className="block font-normal md:font-semibold">Som Passar Dig</span>
            </h1>

            {/* Underrubrik */}
            <p
              className={`
                text-[1.05rem] sm:text-lg md:text-xl text-white/85 mb-6 md:mb-8
                leading-relaxed max-w-prose md:max-w-2xl
                [text-wrap:pretty]
                transition-all duration-1000 delay-200 transform
                ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'}
              `}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Vi matchar dig med rätt jobb – snabbt och utan krångel.
            </p>

            {/* Knapp */}
            <button
              onClick={handleBrowseRoles}
              className={`
                group relative inline-flex items-center justify-center gap-2
                px-6 md:px-8 py-3 md:py-4
                rounded-2xl text-white text-base md:text-lg font-medium tracking-wide
                transition-all duration-200
                w-full md:w-auto min-h-[48px]
                ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                md:hover:scale-[1.03] md:active:scale-[0.99]
              `}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              <span className="btn-hero-bg absolute inset-0 rounded-2xl" />
              <span className="relative z-10 inline-flex items-center gap-2">
                Visa lediga jobb
                {/* liten pil för bättre affordance på desktop */}
                <span
                  className="hidden md:inline-block translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
            </button>

            {/* Trust/USP-rad under knappen – endast desktop */}
            <p
              className="hidden md:block mt-4 text-white/70 text-sm"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Över 200 företag • 5 000+ jobb • Personlig support
            </p>
          </div>

          {/* Höger kolumn: USP-lista (endast på desktop) */}
          <div
            className={`
              hidden md:block transition-all duration-1000 delay-300
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
          >
            <div className="backdrop-blur-sm/0 bg-white/0 rounded-2xl">
              <ul className="space-y-4">
                {[
                  { title: 'Snabb matchning', desc: 'Få relevanta roller direkt baserat på din profil.' },
                  { title: 'Flexibla upplägg', desc: 'Heltid, deltid eller extra – du väljer.' },
                  { title: 'Personlig hjälp', desc: 'Vi guidar dig genom ansökan till start.' },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/7.5 transition-colors border border-white/10"
                  >
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/15 border border-white/20">
                      <span className="text-white/90 text-sm">✓</span>
                    </span>
                    <div>
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-white/75 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sömlös övergång: täcker ev. subpixellinje (endast mobil) */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black md:hidden pointer-events-none" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@200;400&family=Inter:wght@300;500&display=swap');

        .btn-hero-bg {
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.12)), #0B274D;
          box-shadow: 0 10px 24px rgba(11,39,77,0.32);
          border: 1px solid rgba(255,255,255,0.18);
          transition: all .2s ease;
        }
        button:hover > .btn-hero-bg { 
          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.14)), #123B7A; 
          box-shadow: 0 14px 32px rgba(18,59,122,0.38); 
        }
        button:active > .btn-hero-bg { 
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.24), 0 8px 22px rgba(11,39,77,0.26); 
        }
      `}</style>
    </section>
  );
};

export default CandidatesHeroSection;

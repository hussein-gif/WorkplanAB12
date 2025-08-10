import React from 'react';

const OurStorySection: React.FC = () => {
  return (
    <section id="our-story" className="relative py-24 px-8 overflow-hidden bg-white">
      {/* Ny bakgrundsdesign */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ljus radial gradient */}
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-100/20 rounded-full blur-3xl" />
        
        {/* Extra radial glow i mitten */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-white via-blue-50/30 to-white rounded-full blur-2xl opacity-60" />

        {/* Diskreta prickar */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[4px] h-[4px] rounded-full bg-blue-200/40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Vågform längst ner */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32 text-blue-50"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
          fill="currentColor"
        >
          <path d="M0,96L48,80C96,64,192,32,288,42.7C384,53,480,107,576,128C672,149,768,139,864,144C960,149,1056,171,1152,192C1248,213,1344,235,1392,245.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Rubrik */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-medium text-black mb-4"
            style={{ fontFamily: "'Zen Kaku Gothic Antique', sans-serif" }}
          >
            Vår resa hittills
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto font-light"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            På några månader har vi byggt upp en smart, transparent bemanningspartner för lager &amp; logistik.
          </p>
        </div>

        {/* Roadmap */}
        <div className="relative">
          <div className="relative w-screen left-1/2 -translate-x-1/2 h-56">
            {/* Linje */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-blue-600" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-blue-500/40 blur-[2px]" />

            {/* Punkt Q2 */}
            <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '25%' }}>
              <div className="relative z-10 flex items-center justify-center">
                <span className="absolute w-6 h-6 rounded-full bg-blue-500/20 blur-sm" />
                <span className="absolute w-4 h-4 rounded-full border-2 border-white" />
                <span className="relative w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.55)]" />
              </div>
              <div className="absolute -top-36 left-1/2 -translate-x-1/2">
                <div className="relative w-[220px] rounded-xl border border-gray-200 bg-white shadow-lg p-4 text-center">
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-b border-r border-gray-200" />
                  <div className="text-blue-600 font-semibold text-sm mb-1">2025 Q2</div>
                  <div className="text-gray-900 font-semibold">Starten</div>
                  <p className="mt-1 text-xs leading-snug text-gray-600">
                    Workplan grundas med fokus på att förenkla bemanning inom lager &amp; logistik.
                  </p>
                </div>
              </div>
            </div>

            {/* Punkt Q3 */}
            <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '75%' }}>
              <div className="relative z-10 flex items-center justify-center">
                <span className="absolute w-6 h-6 rounded-full bg-blue-500/20 blur-sm" />
                <span className="absolute w-4 h-4 rounded-full border-2 border-white" />
                <span className="relative w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.55)]" />
              </div>
              <div className="absolute top-12 left-1/2 -translate-x-1/2">
                <div className="relative w-[240px] rounded-xl border border-gray-200 bg-white shadow-lg p-4 text-center">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-t border-l border-gray-200" />
                  <div className="text-blue-600 font-semibold text-sm mb-1">2025 Q3</div>
                  <div className="text-gray-900 font-semibold">Första uppdrag &amp; partnerskap</div>
                  <p className="mt-1 text-xs leading-snug text-gray-600">
                    De första bemanningarna levereras och långsiktiga kundrelationer etableras.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;

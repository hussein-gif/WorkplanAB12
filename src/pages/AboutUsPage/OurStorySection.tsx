import React from 'react';

const OurStorySection: React.FC = () => {
  const milestones = [
    {
      id: 'q2',
      pos: '25%',
      quarter: '2025 Q2',
      title: 'Starten',
      text:
        'Workplan grundas med fokus på att förenkla bemanning inom lager & logistik.',
      side: 'top' as const,
    },
    {
      id: 'q3',
      pos: '75%',
      quarter: '2025 Q3',
      title: 'Första uppdrag & partnerskap',
      text:
        'De första bemanningarna levereras och kundrelationer etableras.',
      side: 'bottom' as const,
    },
  ];

  return (
    <section id="our-story" className="relative py-24 px-8 overflow-hidden">
      {/* Bakgrund */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-white" />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08] blur-3xl"
          style={{
            background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)`,
            left: '-200px',
            top: '-100px',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06] blur-3xl"
          style={{
            background: `radial-gradient(circle, #10B981 0%, transparent 70%)`,
            right: '-150px',
            bottom: '-100px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Titel */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-wide">
            Vår resa hittills
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            På några månader har vi byggt upp en smart, transparent bemanningspartner för lager &amp; logistik.
          </p>
        </div>

        {/* Linje & punkter */}
        <div className="relative mt-10">
          <div className="relative w-screen left-1/2 -translate-x-1/2 h-40">
            {/* Linje */}
            <div className="absolute inset-x-0 top-1/2 h-[2px] bg-blue-600/90 shadow-[0_0_18px_rgba(37,99,235,0.35)]" />

            {/* Punkter & kort */}
            {milestones.map((m) => {
              const isTop = m.side === 'top';
              return (
                <div
                  key={m.id}
                  className="absolute"
                  style={{ left: m.pos, transform: 'translateX(-50%)' }}
                >
                  {/* Ny punkt på linjen */}
                  <div className="absolute top-1/2 -translate-y-1/2 flex justify-center z-20">
                    <span className="block w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-[0_0_12px_rgba(37,99,235,0.55)]" />
                  </div>

                  {/* Kort */}
                  <div
                    className={`absolute ${isTop ? '-top-24' : 'top-10'} left-1/2 -translate-x-1/2 w-[200px]`}
                  >
                    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg text-center">
                      <div className="text-blue-600 font-bold text-sm mb-1">{m.quarter}</div>
                      <h3 className="text-base font-semibold text-black mb-2">{m.title}</h3>
                      <p className="text-gray-700 text-xs leading-snug">{m.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;

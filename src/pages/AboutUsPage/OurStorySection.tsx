import React from 'react';

const OurStorySection: React.FC = () => {
  // Justera/utöka milstolpar här
  const milestones = [
    { id: 1, label: 'Pre-launch', date: 'Q2 2025', side: 'top', pos: '6%' },
    { id: 2, label: 'Starten', date: 'Q2 2025', side: 'bottom', pos: '20%' },
    { id: 3, label: 'Första uppdrag', date: 'Q3 2025', side: 'top', pos: '36%' },
    { id: 4, label: 'Partnerskap', date: 'Q3 2025', side: 'bottom', pos: '52%' },
    { id: 5, label: 'Expansion', date: 'Q4 2025', side: 'top', pos: '70%' },
    { id: 6, label: 'Plattformsrelease', date: 'Q1 2026', side: 'bottom', pos: '86%' },
  ];

  return (
    <section id="our-story" className="relative py-24 px-8 overflow-hidden">
      {/* Incredibly Creative Professional Background Design (oförändrad) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Clean White Base */}
        <div className="absolute inset-0 bg-white" />
        
        {/* Subtle Gradient Orbs */}
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
        
        {/* Simple Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Subtle Center Highlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(59,130,246,0.04) 0%, transparent 70%)',
          }}
        />
        
        {/* Simple Decorative Dots */}
        <div>
          <div className="absolute top-20 right-20 w-2 h-2 bg-blue-400/20 rounded-full" />
          <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-emerald-400/25 rounded-full" />
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-purple-400/20 rounded-full" />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Titel & intro */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-wide">
            Vår resa hittills
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            På några månader har vi byggt upp en smart, transparent bemanningspartner för lager &amp; logistik.
          </p>
        </div>

        {/* ROADMAP rubrik (likt bilden) */}
        <div className="text-center mb-10">
          <div
            className="uppercase tracking-[0.3em] text-gray-800 text-2xl md:text-3xl"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            ROADMAP
          </div>
        </div>

        {/* Timeline container */}
        <div className="relative mx-auto max-w-5xl px-2 sm:px-6">
          {/* Baslinje (blå) */}
          <div className="relative h-20 sm:h-24 md:h-28">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-blue-600/80 shadow-[0_0_18px_rgba(37,99,235,0.35)]" />

            {/* Milestones */}
            {milestones.map((m) => {
              const isTop = m.side === 'top';
              return (
                <div
                  key={m.id}
                  className="absolute"
                  style={{ left: m.pos, transform: 'translateX(-50%)' }}
                >
                  {/* Punkt + glow */}
                  <div className="relative">
                    {/* Glow ring */}
                    <span className="absolute -inset-3 rounded-full bg-blue-500/15 blur-md" aria-hidden />
                    {/* Punkt */}
                    <span className="block w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-[0_0_12px_rgba(37,99,235,0.55)]" />
                  </div>

                  {/* Etiketter */}
                  <div className={`absolute ${isTop ? 'bottom-7' : 'top-7'} left-1/2 -translate-x-1/2 text-center whitespace-nowrap`}>
                    <div className="text-sm font-semibold text-gray-900">{m.label}</div>
                    <div className="text-xs text-gray-500">{m.date}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Diskreta diagonala hjälp-linjer (svaga) – ger samma “techy” känsla som i bilden */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06] hidden sm:block"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #1f2937 1px, transparent 1px), linear-gradient(45deg, #1f2937 1px, transparent 1px)',
              backgroundSize: '36px 36px',
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;

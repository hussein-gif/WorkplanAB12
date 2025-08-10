import React from 'react';

const OurStorySection: React.FC = () => {
  return (
    <section id="our-story" className="relative py-24 px-8 overflow-hidden bg-white">
      {/* Subtil bakgrund */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-blue-50" />
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-blue-200/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-200/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Rubrik */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-black mb-4">Vår resa hittills</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            På några månader har vi byggt upp en smart, transparent bemanningspartner för lager &amp; logistik.
          </p>
        </div>

        {/* Roadmap */}
        <div className="relative">
          {/* Fullbredd-linje (från kant till kant på viewporten) */}
          <div className="relative w-screen left-1/2 -translate-x-1/2 h-56">
            {/* Solid linje */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-blue-600" />
            {/* Subtil glow */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-blue-500/40 blur-[2px]" />

            {/* === Punkt Q2 (vänster) === */}
            <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '25%' }}>
              {/* Punkt på linjen */}
              <div className="relative z-10 flex items-center justify-center">
                <span className="absolute w-6 h-6 rounded-full bg-blue-500/20 blur-sm" />
                <span className="absolute w-4 h-4 rounded-full border-2 border-white" />
                <span className="relative w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.55)]" />
              </div>

              {/* Kortet – FLYTTAT UPP */}
              <div className="absolute -top-36 left-1/2 -translate-x-1/2">
                <div className="relative w-[220px] rounded-xl border border-gray-200 bg-white shadow-lg p-4 text-center">
                  {/* liten pil mot punkten */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-b border-r border-gray-200" />
                  <div className="text-blue-600 font-semibold text-sm mb-1">2025 Q2</div>
                  <div className="text-gray-900 font-semibold">Starten</div>
                  <p className="mt-1 text-xs leading-snug text-gray-600">
                    Workplan grundas med fokus på att förenkla bemanning inom lager &amp; logistik.
                  </p>
                </div>
              </div>
            </div>

            {/* === Punkt Q3 (höger) === */}
            <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '75%' }}>
              {/* Punkt på linjen */}
              <div className="relative z-10 flex items-center justify-center">
                <span className="absolute w-6 h-6 rounded-full bg-blue-500/20 blur-sm" />
                <span className="absolute w-4 h-4 rounded-full border-2 border-white" />
                <span className="relative w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.55)]" />
              </div>

              {/* Kortet – FLYTTAT NER */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2">
                <div className="relative w-[240px] rounded-xl border border-gray-200 bg-white shadow-lg p-4 text-center">
                  {/* liten pil mot punkten (uppåtpil) */}
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
          {/* /Roadmap container */}
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;

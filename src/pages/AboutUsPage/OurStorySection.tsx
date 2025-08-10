import React from 'react';

const OurStorySection: React.FC = () => {
  return (
    <section id="our-story" className="relative py-24 px-8 overflow-hidden bg-white">
      {/* Bakgrundselement */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtil bakgrundsgradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 20% 40%, rgba(59,130,246,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 60%, rgba(16,185,129,0.06) 0%, transparent 60%)'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6">Vår resa hittills</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            På några månader har vi byggt upp en smart, transparent bemanningspartner för lager & logistik.
          </p>
        </div>

        {/* Roadmap container */}
        <div className="relative w-full">
          {/* Våglinje */}
          <svg
            className="absolute top-1/2 left-0 w-full h-24"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C250,0 750,100 1000,50"
              stroke="#2563EB"
              strokeWidth="3"
              fill="transparent"
            />
          </svg>

          {/* Q2 punkt */}
          <div className="absolute left-[20%] top-1/2 transform -translate-y-1/2">
            <div className="relative">
              <div className="w-5 h-5 bg-blue-500 rounded-full shadow-[0_0_20px_#3B82F6]" />
              <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-xl shadow-lg w-48 text-center">
                <div className="text-blue-600 font-bold text-sm mb-1">2025 Q2</div>
                <div className="font-semibold text-black">Starten</div>
                <p className="text-xs text-gray-600 mt-1">
                  Workplan grundas med fokus på att förenkla bemanning inom lager & logistik.
                </p>
              </div>
            </div>
          </div>

          {/* Q3 punkt */}
          <div className="absolute left-[70%] top-1/2 transform -translate-y-1/2">
            <div className="relative">
              <div className="w-5 h-5 bg-blue-500 rounded-full shadow-[0_0_20px_#3B82F6]" />
              <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-xl shadow-lg w-48 text-center">
                <div className="text-blue-600 font-bold text-sm mb-1">2025 Q3</div>
                <div className="font-semibold text-black">Första uppdrag & partnerskap</div>
                <p className="text-xs text-gray-600 mt-1">
                  De första bemanningarna levereras och långsiktiga kundrelationer etableras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;

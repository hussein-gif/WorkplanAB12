import React from 'react';

const OurStorySection: React.FC = () => {
  return (
    <section id="our-story" className="relative py-24 px-8 overflow-hidden bg-white">
      {/* Bakgrundseffekter */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradients */}
        <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-3xl" />

        {/* Subtilt prickmönster */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPattern" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#dbeafe" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>

        {/* Wave längst ner */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32 text-blue-50"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
          fill="currentColor"
        >
          <path d="M0,256L80,240C160,224,320,192,480,186.7C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-medium text-black mb-4"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Vår resa hittills
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto font-light"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            På några månader har vi byggt upp en smart, transparent bemanningspartner för lager & logistik.
          </p>
        </div>

        {/* Roadmap line */}
        <div className="relative flex items-center justify-between w-full h-1 bg-blue-500 mb-16">
          {/* Punkt Q2 */}
          <div className="absolute left-1/4 -translate-x-1/2">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg" />
            <div className="mt-6 max-w-xs bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-md relative">
              <div className="text-blue-600 font-bold text-sm mb-1">2025 Q2</div>
              <h3 className="text-lg font-semibold text-black mb-2">Starten</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Workplan grundas med fokus på att förenkla bemanning inom lager & logistik. Vi sätter våra processer,
                transparent prissättning och börjar bygga ett kvalitativt kandidatnätverk.
              </p>
            </div>
          </div>

          {/* Punkt Q3 */}
          <div className="absolute left-3/4 -translate-x-1/2">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg" />
            <div className="mt-6 max-w-xs bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-md relative">
              <div className="text-blue-600 font-bold text-sm mb-1">2025 Q3</div>
              <h3 className="text-lg font-semibold text-black mb-2">Första uppdrag & partnerskap</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                De första bemanningarna levereras och långsiktiga kundrelationer etableras. Vi finjusterar
                matchningsmodellen och växer vårt nätverk av tillgängliga specialister.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;

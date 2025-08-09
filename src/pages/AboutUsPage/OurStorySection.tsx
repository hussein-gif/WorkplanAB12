import React from 'react';

const OurStorySection: React.FC = () => {
  return (
    <section id="our-story" className="py-24 px-8 bg-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Vår resa hittills</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            På några månader har vi byggt upp en smart, transparent bemanningspartner för lager & logistik.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="text-blue-400 font-bold text-lg mb-2">2025 Q2</div>
            <h3 className="text-xl font-semibold text-white mb-3">Starten</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Workplan grundas med fokus på att förenkla bemanning inom lager & logistik. Vi sätter våra processer, transparent prissättning och börjar bygga ett kvalitativt kandidatnätverk.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="text-blue-400 font-bold text-lg mb-2">2025 Q3</div>
            <h3 className="text-xl font-semibold text-white mb-3">Första uppdrag & partnerskap</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              De första bemanningarna levereras och långsiktiga kundrelationer etableras. Vi finjusterar matchningsmodellen och växer vårt nätverk av tillgängliga specialister.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
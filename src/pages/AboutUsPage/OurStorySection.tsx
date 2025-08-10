import React from 'react';

const OurStorySection: React.FC = () => {
  return (
    <section id="our-story" className="relative py-24 px-8 overflow-hidden">
      {/* Incredibly Creative Professional Background Design */}
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
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Subtle Center Highlight */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.04) 0%, transparent 70%)',
          }}
        />
        
        {/* Simple Decorative Dots */}
        <div>
          {/* Simple Decorative Elements */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-blue-400/20 rounded-full" />
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-emerald-400/25 rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-purple-400/20 rounded-full" />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6">Vår resa hittills</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            På några månader har vi byggt upp en smart, transparent bemanningspartner för lager & logistik.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg">
            <div className="text-blue-600 font-bold text-lg mb-2">2025 Q2</div>
            <h3 className="text-xl font-semibold text-black mb-3">Starten</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Workplan grundas med fokus på att förenkla bemanning inom lager & logistik. Vi sätter våra processer, transparent prissättning och börjar bygga ett kvalitativt kandidatnätverk.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg">
            <div className="text-blue-600 font-bold text-lg mb-2">2025 Q3</div>
            <h3 className="text-xl font-semibold text-black mb-3">Första uppdrag & partnerskap</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              De första bemanningarna levereras och långsiktiga kundrelationer etableras. Vi finjusterar matchningsmodellen och växer vårt nätverk av tillgängliga specialister.
            </p>
          </div>
        </div>
      </div>
        </div>
    </section>
  );
};

export default OurStorySection;
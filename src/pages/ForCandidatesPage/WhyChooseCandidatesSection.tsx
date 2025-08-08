import React from 'react';
import { Clock, Target, Users } from 'lucide-react';

interface WhyChooseCandidatesSectionProps {
  isVisible: boolean;
}

const WhyChooseCandidatesSection: React.FC<WhyChooseCandidatesSectionProps> = ({
  isVisible,
}) => {
  const benefits = [
    {
      icon: Clock,
      title: 'Rätt jobb – snabbt',
      description:
        'Vi matchar dig med uppdrag som passar dina mål och ditt schema. Du får snabb återkoppling.',
      highlight: 'Snabb återkoppling',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Target,
      title: 'Tydliga villkor & trygg lön',
      description:
        'Klara avtal, korrekt lön i tid och full transparens genom hela uppdraget.',
      highlight: 'Tryggt & transparent',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: Users,
      title: 'Personlig kontakt hela vägen',
      description:
        'En dedikerad kontaktperson stöttar dig från ansökan till avslutat uppdrag.',
      highlight: 'Personlig service',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section className="relative py-24 px-8 bg-white overflow-hidden">
      {/* Subtle design background */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-20 -right-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-60 transition-all duration-700 ${
          isVisible ? 'opacity-60' : 'opacity-40'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(8,19,43,0.08), rgba(8,19,43,0) 60%)',
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -bottom-24 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-60 transition-all duration-700 ${
          isVisible ? 'opacity-60' : 'opacity-40'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(2,132,199,0.08), rgba(2,132,199,0) 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 64 64\\' fill=\\'none\\'><defs><pattern id=\\'d\\' width=\\'32\\' height=\\'32\\' patternUnits=\\'userSpaceOnUse\\'><circle cx=\\'1\\' cy=\\'1\\' r=\\'.8\\' fill=\\'%2308132B\\' opacity=\\'0.35\\'/>
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-28 w-[34rem] h-[34rem] rounded-full blur-2xl opacity-60" style={{ background: 'conic-gradient(from 210deg at 50% 50%, rgba(8,19,43,0.10), rgba(2,132,199,0.06), rgba(8,19,43,0.10))' }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(8,19,43,0.05) 0px, rgba(8,19,43,0.05) 1px, transparent 1px, transparent 14px)', WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,.95), transparent 70%)', maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,.95), transparent 70%)' }} />
      <div aria-hidden className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[120%] h-[120px] opacity-10 rotate-[-2deg]" style={{ background: 'linear-gradient(90deg, rgba(8,19,43,0) 0%, rgba(8,19,43,0.06) 20%, rgba(8,19,43,0.06) 80%, rgba(8,19,43,0) 100%)' }} /></pattern></defs><rect width=\\'100%\\' height=\\'100%\\' fill=\\'url(%23d)\\'/></svg>')",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-semibold text-black mb-4"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Därför Väljer Kandidater Oss
          </h2></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-200 rounded-2xl p-8 shadow-[0_8px_24px_rgba(8,19,43,0.06)] hover:shadow-[0_14px_32px_rgba(8,19,43,0.08)] transition-shadow"
            >
              {/* subtle gradient ring on hover */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(135deg, rgba(8,19,43,0.08), rgba(8,19,43,0.02))'}}/>

              <div
                className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 mx-auto shadow-[0_8px_16px_rgba(8,19,43,0.08)]`}
              >
                <benefit.icon size={28} className="text-white" />
              </div>
              <h3
                className="text-xl font-semibold text-gray-900 mb-3 text-center"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {benefit.title}
              </h3>
              <p
                className="text-gray-600 leading-relaxed mb-5 text-center"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {benefit.description}
              </p>
              <div
                className="text-[11px] font-medium uppercase tracking-wider text-gray-700/70 text-center inline-block px-3 py-1 rounded-full bg-gray-100"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {benefit.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
      `}</style>
    </section>
  );
};

export default WhyChooseCandidatesSection;

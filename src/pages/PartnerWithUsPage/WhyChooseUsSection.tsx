import React from 'react';

interface WhyChooseUsSectionProps {
  isVisible: boolean;
}

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ isVisible }) => {
  const features = [
    {
      title: 'Djup branschkännedom',
      description:
        'Vårt team förstår er vardag inom lager och logistik och kan snabbt sätta oss in i era behov.',
      label: 'SPECIALISTER PÅ ERT OMRÅDE',
      backgroundImage: 'https://i.ibb.co/hJykWM0G/IMAGE-2025-08-07-19-36-02.jpg',
    },
    {
      title: 'Effektiv process',
      description:
        'Vi kickar igång direkt och håller er uppdaterade genom hela kedjan – utan onödiga väntetider.',
      label: 'SNABB ÅTERKOPPLING',
      backgroundImage: 'https://i.ibb.co/wrwTrGJ9/IMAGE-2025-08-07-19-42-10.jpg',
    },
    {
      title: 'Träffsäker matchning',
      description:
        'Strukturerad screening, referenser och kulturpassning säkerställer rätt person på rätt plats för just ert behov.',
      label: 'NOGGRANT URVAL',
      backgroundImage: 'https://i.ibb.co/Qjvp4Fvq/IMAGE-2025-08-07-19-41-36.jpg',
    },
    {
      title: 'En kontakt – hela vägen',
      description:
        'Du får en dedikerad konsult som ansvarar för dialog, rapportering och uppföljning.',
      label: 'PERSONLIG SERVICE',
      backgroundImage: 'https://i.ibb.co/KcgmytRM/IMAGE-2025-08-07-19-40-50.jpg',
    },
  ];

  return (
    <section className="py-24 px-8 relative overflow-hidden">
      {/* Light Gradient Background */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f7f9fc 100%)' }}
      />
      {/* Hexagon pattern + blobs */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexLight" width="60" height="52" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 15 L60 45 L30 60 L0 45 L0 15 Z"
                  stroke="rgba(0,0,0,0.03)" strokeWidth="1" fill="none" />
          </pattern>
          <filter id="blurSmall"><feGaussianBlur stdDeviation="80" /></filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexLight)" />
        <circle cx="20%" cy="15%" r="200" fill="rgba(59,130,246,0.1)" filter="url(#blurSmall)" />
        <circle cx="80%" cy="85%" r="180" fill="rgba(16,185,129,0.1)" filter="url(#blurSmall)" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-light text-gray-800 mb-6"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 400 }}
          >
            Workplan - Företagens Val
          </h2>
          <p
            className="max-w-2xl mx-auto text-gray-600"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '1rem',
              marginTop: '0.25rem',
              lineHeight: 1.4,
            }}
          >
            Fyra löften som gör bemanning enkel, träffsäker och trygg – från första kontakt till avslutat uppdrag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                group relative w-full h-[350px] rounded-xl overflow-hidden shadow-lg
                transition-all duration-200 ease-out cursor-pointer bg-white
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
              `}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${feature.backgroundImage})` }}
              />

              {/* Label top-right, extra small */}
              <div className="absolute top-4 right-4 z-10">
                <div
                  className="text-[10px] font-light uppercase tracking-wider px-3 py-1 rounded-full
                             bg-gray-100 border border-gray-200 transition-all duration-200"
                  style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(55,65,81,0.8)' }}
                >
                  {feature.label}
                </div>
              </div>

              {/* Title & description at bottom */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 bg-gradient-to-t from-black/60 to-transparent">
                <h3
                  className="text-white mb-2 leading-tight font-medium"
                  style={{
                    fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                    fontSize: '20px',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className={`
                    text-gray-600 leading-relaxed font-light
                    ${index === 2 ? 'line-clamp-3 overflow-hidden' : ''}
                  `}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    margin: 0,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

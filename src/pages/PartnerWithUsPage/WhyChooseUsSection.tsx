import React from 'react';
import { Truck, Clock, Shield, Users } from 'lucide-react';

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
      backgroundImage: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg',
    },
    {
      title: 'Effektiv process',
      description:
        'Vi kickar igång direkt och håller er uppdaterade genom hela kedjan – utan onödiga väntetider.',
      label: 'SNABB ÅTERKOPPLING',
      backgroundImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    },
    {
      title: 'Träffsäker matchning',
      description:
        'Strukturerad screening, referenser och kulturpassning säkerställer rätt person på rätt plats.',
      label: 'NOGGRANT URVAL',
      backgroundImage: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg',
    },
    {
      title: 'En kontakt – hela vägen',
      description:
        'Du får en dedikerad konsult som ansvarar för dialog, rapportering och uppföljning.',
      label: 'PERSONLIG SERVICE',
      backgroundImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    },
  ];

  return (
    <section
      className="py-24 px-8"
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.95) 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`
              text-4xl md:text-5xl text-gray-900 mb-6
              transition-all duration-300
            `}
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 400,
            }}
          >
            Workplan - Företagens Val
          </h2>
          <p
            className="max-w-2xl mx-auto"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '1rem',
              color: 'rgba(55, 65, 81, 0.8)',
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
                transition-all duration-200 ease-out cursor-pointer
                hover:scale-[1.03] hover:shadow-2xl
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
              `}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${feature.backgroundImage})` }}
              />

              {/* Light overlay */}
              <div className="absolute inset-0 bg-white/50 group-hover:bg-white/30 transition-all duration-200" />

              {/* Content */}
              <div className="relative z-10 h-full p-5 flex flex-col justify-between">
                <div>
                  <h3
                    className="text-gray-900 mb-3 leading-tight"
                    style={{
                      fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                      fontSize: '20px',
                      fontWeight: 500,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-gray-700 leading-relaxed"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      margin: 0,
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
                <div className="flex justify-start">
                  <div
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      color: 'rgba(55,65,81,0.7)',
                    }}
                  >
                    {feature.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

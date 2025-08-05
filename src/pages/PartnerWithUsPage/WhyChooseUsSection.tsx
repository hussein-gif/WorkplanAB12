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
    <section className="py-24 px-8 relative overflow-hidden">
      {/* Light professional background with subtle motif */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%)',
        }}
      />
      {/* Subtle geometric pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(0,0,0,0.02) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Soft floating blobs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-2xl animate-float-slow" />
      <div className="absolute bottom-[-4rem] right-1/4 w-72 h-72 bg-green-100 rounded-full opacity-15 blur-2xl animate-float-slow-reverse" />

      <style>{`
        @keyframes float-slow {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(8px,-8px); }
        }
        @keyframes float-slow-reverse {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(-8px,8px); }
        }
        .animate-float-slow {
          animation: float-slow 25s ease-in-out infinite;
        }
        .animate-float-slow-reverse {
          animation: float-slow-reverse 30s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`
              text-3xl sm:text-4xl font-light text-gray-900 mb-6
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
              color: 'rgba(0,0,0,0.7)',
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
              {/* White overlay */}
              <div className="absolute inset-0 bg-white/30 group-hover:bg-white/20 transition-all duration-200" />
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
                    className="text-gray-800 leading-relaxed"
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

                {/* Bottom Label */}
                <div className="flex justify-start">
                  <div
                    className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100/50 group-hover:bg-gray-100/70 transition-all duration-200"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      color: '#1f2937',
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

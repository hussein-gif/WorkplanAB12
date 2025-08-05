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
      {/* Light Animated Background */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 75%)',
        }}
      />
      {/* Subtle Geometric Pattern Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5 animate-pulse-slow"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="triangle" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M20 0 L40 20 L20 40 L0 20 Z"
              stroke="rgba(59,130,246,0.1)"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
          <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.2)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.2)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#triangle)" />
        <line
          x1="0" y1="0"
          x2="200%" y2="200%"
          stroke="url(#gradientLine)"
          strokeWidth="1.5"
          className="animate-slide"
        />
      </svg>
      <style>{`
        @keyframes slide {
          0% { transform: translate(-50%, -50%); }
          100% { transform: translate(50%, 50%); }
        }
        .animate-slide {
          animation: slide 25s linear infinite;
        }
        @keyframes pulseSlow {
          0%,100% { opacity: 0.05; }
          50% { opacity: 0.08; }
        }
        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
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
              {/* Light Overlay */}
              <div className="absolute inset-0 bg-white/30 group-hover:bg-white/10 transition-all duration-200" />
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
                    className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100/80 backdrop-blur-sm border border-gray-200/50 group-hover:bg-gray-200/90 transition-all duration-200"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      color: 'rgba(0,0,0,0.8)',
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
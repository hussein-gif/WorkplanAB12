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
      className="py-24 px-8 relative overflow-hidden"
    >
      {/* Light Professional Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 35%, #f1f5f9 70%, #ffffff 100%)',
        }}
      />

      {/* Subtle Abstract Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large soft circles */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute -bottom-24 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
            animation: 'float 30s ease-in-out infinite',
            animationDelay: '10s',
          }}
        />

        {/* Wavy lines */}
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-20"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,200 Q300,150 600,200 T1200,200"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M0,400 Q400,350 800,400 T1200,400"
            stroke="url(#gradient2)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M0,600 Q200,550 400,600 T800,600 Q1000,550 1200,600"
            stroke="url(#gradient3)"
            strokeWidth="1"
            fill="none"
            opacity="0.2"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.4)" />
              <stop offset="50%" stopColor="rgba(16,185,129,0.3)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0.2)" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.3)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0.2)" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139,92,246,0.2)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0.15)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Subtle geometric patterns */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59,130,246,0.1) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(16,185,129,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 80px 80px',
            backgroundPosition: '0 0, 30px 30px',
          }}
        />

        {/* Floating accent dots */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-300/30 rounded-full animate-pulse" />
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-emerald-300/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-purple-300/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-2.5 h-2.5 bg-blue-200/20 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10px, -10px) scale(1.02); }
          66% { transform: translate(-5px, 5px) scale(0.98); }
        }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`
              text-3xl sm:text-4xl text-gray-900 mb-4
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
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
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
                group relative w-full h-[350px] rounded-2xl overflow-hidden shadow-lg
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
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-200" />
              {/* Content */}
              <div className="relative z-10 h-full p-5 flex flex-col justify-between">
                <div>
                  <h3
                    className="text-white mb-3 leading-tight"
                    style={{
                      fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                      fontSize: '20px',
                      fontWeight: 500,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-white leading-relaxed"
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
                      color: 'rgba(255,255,255,0.7)',
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

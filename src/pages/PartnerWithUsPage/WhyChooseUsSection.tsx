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
      {/* Enhanced Professional Background System */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(16,185,129,0.02) 0%, transparent 50%),
            linear-gradient(135deg, #ffffff 0%, #f8fafc 40%, #f1f5f9 100%)
          `,
        }}
      />

      {/* Sophisticated Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large Geometric Shapes */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-[0.04] blur-3xl animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/3 right-[-10rem] w-80 h-80 rounded-full opacity-[0.03] blur-3xl animate-float-reverse"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-[-8rem] left-1/4 w-72 h-72 rounded-full opacity-[0.025] blur-3xl animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          }}
        />
        
        {/* Geometric Accent Elements */}
        <div
          className="absolute top-20 right-20 w-24 h-24 rounded-2xl opacity-[0.02] animate-float-reverse"
          style={{
            background: 'linear-gradient(45deg, rgba(59,130,246,0.1) 0%, rgba(16,185,129,0.1) 100%)',
            transform: 'rotate(15deg)',
          }}
        />
        <div
          className="absolute bottom-32 left-16 w-16 h-16 rounded-full opacity-[0.03] animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Structured Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(59,130,246,0.015) 1px, transparent 0)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Subtle Diagonal Lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 49%, rgba(59,130,246,0.008) 50%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, rgba(16,185,129,0.006) 50%, transparent 51%)
          `,
          backgroundSize: '120px 120px',
        }}
      />

      {/* Enhanced CSS Animations */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-float, .animate-float-reverse, .animate-float-slow {
            animation: none;
          }
        }
        @keyframes float {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(8px,-6px) scale(1.01); }
          66% { transform: translate(-6px,10px) scale(0.99); }
        }
        @keyframes float-reverse {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(-10px,8px) scale(0.98); }
          66% { transform: translate(12px,-4px) scale(1.02); }
        }
        @keyframes float-slow {
          0%,100% { transform: translate(0,0) rotate(0deg); }
          25% { transform: translate(5px,-8px) rotate(2deg); }
          50% { transform: translate(-8px,-2px) rotate(-1deg); }
          75% { transform: translate(3px,6px) rotate(1deg); }
        }
        .animate-float { animation: float 25s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 30s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 35s ease-in-out infinite; }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <h2
            className={`
              text-3xl sm:text-4xl font-bold text-gray-900 mb-4
              transition-all duration-500 hover:text-gray-800
            `}
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
            }}
          >
            Workplan - Företagens Val
          </h2>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              lineHeight: 1.6,
              letterSpacing: '0.01em',
            }}
          >
            Fyra löften som gör bemanning enkel, träffsäker och trygg – från första kontakt till avslutat uppdrag.
          </p>
        </div>

        {/* Enhanced Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                group relative w-full h-[350px] rounded-2xl overflow-hidden 
                transition-all duration-300 ease-out cursor-pointer
                hover:scale-[1.02] hover:-translate-y-2
                border border-gray-100/50
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
              `}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
            >
                boxShadow: `
                  0 4px 20px rgba(0,0,0,0.08),
                  0 1px 3px rgba(0,0,0,0.05)
                `,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 20px 40px rgba(0,0,0,0.12),
                  0 8px 16px rgba(0,0,0,0.08),
                  0 0 0 1px rgba(59,130,246,0.1)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 4px 20px rgba(0,0,0,0.08),
                  0 1px 3px rgba(0,0,0,0.05)
                `;
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${feature.backgroundImage})` }}
              />
              {/* Enhanced Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/20 group-hover:from-black/40 group-hover:via-black/25 group-hover:to-black/15 transition-all duration-300" />
              
              {/* Content with Enhanced Typography */}
              <div className="relative z-10 h-full p-5 flex flex-col justify-between">
                <div>
                  <h3
                    className="text-white mb-3 leading-tight group-hover:text-white/95 transition-colors duration-300"
                    style={{
                      fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                      fontSize: '20px',
                      fontWeight: 500,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
                
                {/* Enhanced Label */}
                <div className="flex justify-start">
                  <div
                    className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/15 transition-all duration-300"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.8)',
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

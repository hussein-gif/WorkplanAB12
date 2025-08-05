import React, { useState, useEffect } from 'react';
import { Truck, Clock, Shield, Users } from 'lucide-react';

interface WhyChooseUsSectionProps {
  isVisible: boolean;
}

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ isVisible }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      title: 'Djup branschkännedom',
      description: 'Vårt team förstår er vardag inom lager och logistik och kan snabbt sätta oss in i era behov.',
      label: 'SPECIALISTER PÅ ERT OMRÅDE',
      backgroundImage: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg'
    },
    {
      title: 'Effektiv process',
      description: 'Vi kickar igång direkt och håller er uppdaterade genom hela kedjan – utan onödiga väntetider.',
      label: 'SNABB ÅTERKOPPLING',
      backgroundImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
    },
    {
      title: 'Träffsäker matchning',
      description: 'Strukturerad screening, referenser och kulturpassning säkerställer rätt person på rätt plats.',
      label: 'NOGGRANT URVAL',
      backgroundImage: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg'
    },
    {
      title: 'En kontakt – hela vägen',
      description: 'Du får en dedikerad konsult som ansvarar för dialog, rapportering och uppföljning.',
      label: 'PERSONLIG SERVICE',
      backgroundImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'
    }
  ];

  return (
    <section className="relative py-24 px-8 overflow-hidden">
      {/* Professional Background System */}
      <div className="absolute inset-0">
        {/* Clean gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
          }}
        />

        {/* Subtle interactive orbs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.2}%`,
            top: `${mousePosition.y * 0.15}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.02] blur-3xl transition-all duration-1000 delay-500"
          style={{
            background: `radial-gradient(circle, #10B981 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.15}%`,
            bottom: `${mousePosition.y * 0.2}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Minimal grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Subtle accent dots */}
        <div className="absolute top-20 right-32 w-1.5 h-1.5 bg-blue-200/40 rounded-full" />
        <div className="absolute bottom-32 left-20 w-1 h-1 bg-emerald-200/30 rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-0.5 h-0.5 bg-slate-300/40 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`
              text-4xl md:text-5xl text-white mb-6
              transition-all duration-300
            `}
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 400,
              color: '#1e293b'
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
              color: '#64748b',
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
                bg-white/80 backdrop-blur-sm border border-slate-200/50
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
              `}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${feature.backgroundImage})` }}
              />
              
              {/* Light Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-200" />
              
              {/* Content Container */}
              <div className="relative z-10 h-full p-5 flex flex-col justify-between">
                {/* Top Content */}
                <div>
                  <h3 
                    className="text-white mb-3 leading-tight drop-shadow-sm"
                    style={{
                      fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                      fontSize: '20px',
                      fontWeight: 500
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-white/95 leading-relaxed drop-shadow-sm"
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
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

import React, { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';

interface IndustriesSectionProps {
  isVisible: boolean;
}

const IndustriesSection: React.FC<IndustriesSectionProps> = ({ isVisible }) => {
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

  return (
    <section className="relative py-24 px-8 overflow-hidden">
      {/* Clean Professional Background */}
      <div className="absolute inset-0">
        {/* Refined gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 50%, #f3f4f6 100%)',
          }}
        />

        {/* Subtle interactive elements */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.02] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #10b981 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.22}%`,
            top: `${mousePosition.y * 0.18}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[450px] h-[450px] rounded-full opacity-[0.015] blur-3xl transition-all duration-1000 delay-800"
          style={{
            background: `radial-gradient(circle, #3b82f6 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.18}%`,
            bottom: `${mousePosition.y * 0.25}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Minimal geometric pattern */}
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `
              linear-gradient(30deg, rgba(0,0,0,0.015) 1px, transparent 1px),
              linear-gradient(150deg, rgba(0,0,0,0.01) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 60px 60px',
          }}
        />

        {/* Subtle accent dots */}
        <div className="absolute top-20 right-28 w-1.5 h-1.5 bg-emerald-200/40 rounded-full" />
        <div className="absolute bottom-32 left-24 w-1 h-1 bg-blue-200/30 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-gray-300/40 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="relative z-10">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl text-slate-800 mb-6"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              lineHeight: 1.1,
            }}
          >
            <span style={{ fontWeight: 400 }}>Specialister på </span>
            <span style={{ fontWeight: 500 }}>Lager &amp; Logistik</span>
          </h2>
          <p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
            }}
          >
            Vi bemannar hela logistikkedjan – från inleverans till distribution. Rätt kompetens, när du behöver den.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <Truck size={28} className="text-white" />
            </div>
            <h3
              className="text-2xl font-medium text-slate-800 mb-4 break-words max-w-full"
              style={{
                fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              }}
            >
              Lager &amp; Logistik
            </h3>
            <p
              className="text-slate-600 leading-relaxed mb-4 break-words max-w-full"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
              }}
            >
              Orderplock, truckförare, lageradministration, skiftledare m.fl. Vi täcker bemanningsbehoven över hela flödet.
            </p>
            <div
              className="text-xs font-medium text-slate-500 uppercase tracking-wider"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Snabb bemanning & personlig kontakt
            </div>
          </div>
        </div>

        {/* Additional Contact Line */}
        <div className="text-center">
          <p className="text-slate-600 text-lg">
            Behöver du kompetens utanför detta?{' '}
            <a
              href="#kontakt-form"
              className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('kontakt-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Kontakta oss
            </a>{' '}
            så hjälper vi dig.
          </p>
        </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;

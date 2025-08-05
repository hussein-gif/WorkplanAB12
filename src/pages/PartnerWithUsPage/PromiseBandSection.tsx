import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface PromiseBandSectionProps {
  isVisible: boolean;
}

const PromiseBandSection: React.FC<PromiseBandSectionProps> = ({ isVisible }) => {
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
    <section aria-labelledby="vart-lofte" className="relative py-8 px-8 overflow-hidden">
      {/* Subtle Professional Background */}
      <div className="absolute inset-0">
        {/* Light gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          }}
        />

        {/* Minimal floating elements */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.015] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #22c55e 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.15}%`,
            top: `${mousePosition.y * 0.1}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[350px] h-[350px] rounded-full opacity-[0.01] blur-3xl transition-all duration-1000 delay-400"
          style={{
            background: `radial-gradient(circle, #3b82f6 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.12}%`,
            bottom: `${mousePosition.y * 0.15}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Subtle texture */}
        <div 
          className="absolute inset-0 opacity-[0.005]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, rgba(0,0,0,0.01) 0px, rgba(0,0,0,0.01) 1px, transparent 1px, transparent 40px)
            `,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="relative z-10">
        <div className="text-center mb-8">
          <h3
            id="vart-lofte"
            className="text-3xl md:text-4xl text-slate-800 mb-8"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            Vårt Löfte
          </h3>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 text-center">
          <li className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle size={20} className="text-green-400" />
            </div>
              Snabb återkoppling – svar inom 24 timmar
            </span>
          </li>
          <li className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle size={20} className="text-green-400" />
            </div>
              Transparent prissättning – inga dolda avgifter
            </span>
          </li>
          <li className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle size={20} className="text-green-400" />
            </div>
              Personlig kontaktperson – samma rådgivare genom hela uppdraget
            </span>
          </li>
        </ul>
        </div>
      </div>
    </section>
  );
};

export default PromiseBandSection;

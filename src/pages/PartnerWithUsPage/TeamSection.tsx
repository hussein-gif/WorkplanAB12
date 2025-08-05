import React, { useState, useEffect } from 'react';

interface TeamSectionProps {
  isVisible: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ isVisible }) => {
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
      {/* Professional Team Background */}
      <div className="absolute inset-0">
        {/* Clean gradient foundation */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 60%, #f1f5f9 100%)',
          }}
        />

        {/* Subtle interactive orbs */}
        <div 
          className="absolute w-[550px] h-[550px] rounded-full opacity-[0.02] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #6366f1 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.2}%`,
            top: `${mousePosition.y * 0.15}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[450px] h-[450px] rounded-full opacity-[0.015] blur-3xl transition-all duration-1000 delay-600"
          style={{
            background: `radial-gradient(circle, #8b5cf6 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.18}%`,
            bottom: `${mousePosition.y * 0.2}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Minimal pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.008]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(0,0,0,0.015) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(0,0,0,0.01) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 40px 40px',
          }}
        />

        {/* Decorative accents */}
        <div className="absolute top-20 right-24 w-1.5 h-1.5 bg-indigo-200/30 rounded-full" />
        <div className="absolute bottom-28 left-20 w-1 h-1 bg-purple-200/25 rounded-full" />
        <div className="absolute top-2/3 right-1/3 w-0.5 h-0.5 bg-slate-300/30 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="relative z-10">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-normal text-slate-800 mb-4"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 400 }}
          >
            Teamet bakom Workplan
          </h2>
          <p
            className="text-base text-slate-600 max-w-2xl mx-auto leading-normal font-light"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Två dedikerade kontaktpersoner som tar ansvar från första behovsanalys till uppföljning – utan mellanhänder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="text-center bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 shadow-lg">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              JA
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2 break-words max-w-full">
              Jawad Abbas
            </h3>
            <p className="text-blue-400 font-medium break-words max-w-full">
              Medgrundare & Affärsansvarig
            </p>
          </div>
          
          <div className="text-center bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 shadow-lg">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              AM
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2 break-words max-w-full">
              Arvin Mahmoudi
            </h3>
            <p className="text-blue-400 font-medium break-words max-w-full">
              Medgrundare & Leveranschef
            </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

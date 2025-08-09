import React from 'react';
import { Shield, Star, Handshake } from 'lucide-react';

const MissionValuesSection: React.FC = () => {
  return (
    <section className="relative py-24 px-8 overflow-hidden" style={{ backgroundColor: '#08132B' }}>
      {/* Creative Abstract Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Gradient Orbs */}
        <div 
          className="absolute w-[1000px] h-[1000px] rounded-full opacity-[0.15] blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(99,102,241,0.2) 40%, transparent 70%)`,
            left: '10%',
            top: '20%',
            animation: 'float-orb-1 25s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.12] blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(52,211,153,0.15) 50%, transparent 70%)`,
            right: '15%',
            bottom: '25%',
            animation: 'float-orb-2 30s ease-in-out infinite reverse',
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08] blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(147,51,234,0.1) 60%, transparent 70%)`,
            left: '60%',
            top: '10%',
            animation: 'float-orb-3 35s ease-in-out infinite',
          }}
        />

        {/* Flowing Wave Patterns */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.1)" />
              <stop offset="50%" stopColor="rgba(99,102,241,0.05)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.08)" />
              <stop offset="50%" stopColor="rgba(52,211,153,0.04)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          {/* Animated Wave Paths */}
          <path 
            d="M0,200 Q200,100 400,200 T800,200 L800,300 Q600,400 400,300 T0,300 Z" 
            fill="url(#waveGradient1)"
          />
          <path 
            d="M0,400 Q300,300 600,400 T1200,400 L1200,500 Q900,600 600,500 T0,500 Z" 
            fill="url(#waveGradient2)"
          />
        </svg>

        {/* Geometric Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 1.5px, transparent 1.5px)
            `,
            backgroundSize: '100px 100px, 150px 150px, 80px 80px',
          }}
        />

        {/* Conic Gradient Spirals */}
        <div 
          className="absolute left-1/4 top-1/3 w-[600px] h-[600px] opacity-[0.06]"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, 
              rgba(59,130,246,0.2) 0deg, 
              transparent 60deg, 
              rgba(99,102,241,0.15) 120deg, 
              transparent 180deg, 
              rgba(168,85,247,0.1) 240deg, 
              transparent 300deg, 
              rgba(59,130,246,0.2) 360deg)`,
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />
        <div 
          className="absolute right-1/4 bottom-1/3 w-[500px] h-[500px] opacity-[0.04]"
          style={{
            background: `conic-gradient(from 180deg at 50% 50%, 
              rgba(16,185,129,0.15) 0deg, 
              transparent 90deg, 
              rgba(52,211,153,0.1) 180deg, 
              transparent 270deg, 
              rgba(16,185,129,0.15) 360deg)`,
            borderRadius: '50%',
            filter: 'blur(50px)',
          }}
        />

        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: `rgba(${Math.random() > 0.5 ? '59,130,246' : Math.random() > 0.5 ? '16,185,129' : '168,85,247'},${Math.random() * 0.3 + 0.1})`,
            }}
          />
        ))}

        {/* Mesh Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 80px 80px',
            animation: 'mesh-shift 50s ease-in-out infinite',
          }}
        />

        {/* Vignette Effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 40%, rgba(8,19,43,0.3) 100%)`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Mission */}
          <div>
            <h2 className="text-4xl font-light text-white mb-6">Vårt Uppdrag</h2>
            <p className="text-xl text-white/80 leading-relaxed font-light">
              Vi gör bemanning enkelt för både företag och människor. Vi säkrar rätt kompetens snabbt för lager & logistik – samtidigt som vi hjälper kandidater att hitta trygga, utvecklande jobb utan onödigt krångel. Med tydliga processer, personlig service och fokus på kvalitet skapar vi långsiktigt värde för alla inblandade.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-4xl font-light text-white mb-6">Våra Värderingar</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Transparens</h3>
                  <p className="text-white/70">öppna processer, tydlig prissättning och ärlig kommunikation.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Star size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Kvalitet i varje matchning</h3>
                  <p className="text-white/70">strukturerad screening, referenskontroll och noggranna leveranser.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Handshake size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Partnerskap på riktigt</h3>
                  <p className="text-white/70">en dedikerad kontaktperson och uppföljning hela vägen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced CSS Animations */}
      <style>{`
        @keyframes float-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 40px) scale(0.9); }
          75% { transform: translate(25px, -10px) scale(1.05); }
        }
        
        @keyframes float-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(-40px, 30px) scale(1.2) rotate(120deg); }
          66% { transform: translate(35px, -25px) scale(0.8) rotate(240deg); }
        }
        
        @keyframes float-orb-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          20% { transform: translate(20px, -30px) scale(1.3); }
          40% { transform: translate(-30px, 20px) scale(0.7); }
          60% { transform: translate(35px, 10px) scale(1.1); }
          80% { transform: translate(-15px, -25px) scale(0.9); }
        }
        
        @keyframes wave-flow-1 {
          0%, 100% { transform: translateX(0) scaleY(1); }
          25% { transform: translateX(-50px) scaleY(1.2); }
          50% { transform: translateX(30px) scaleY(0.8); }
          75% { transform: translateX(-20px) scaleY(1.1); }
        }
        
        @keyframes wave-flow-2 {
          0%, 100% { transform: translateX(0) scaleX(1); }
          33% { transform: translateX(40px) scaleX(1.1); }
          66% { transform: translateX(-30px) scaleX(0.9); }
        }
        
        @keyframes spiral-rotate {
          from { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          to { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes pattern-drift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -15px); }
          50% { transform: translate(-15px, 25px); }
          75% { transform: translate(25px, -10px); }
        }
        
        @keyframes particle-float-1 {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-20px) translateX(10px) rotate(90deg); }
          50% { transform: translateY(15px) translateX(-15px) rotate(180deg); }
          75% { transform: translateY(-10px) translateX(5px) rotate(270deg); }
        }
        
        @keyframes particle-float-2 {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); }
          33% { transform: translateY(-25px) translateX(20px) scale(1.2); }
          66% { transform: translateY(20px) translateX(-10px) scale(0.8); }
        }
        
        @keyframes particle-float-3 {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-30px) translateX(15px) rotate(180deg) scale(1.3); }
        }
        
        @keyframes mesh-shift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(15px, -10px) rotate(1deg); }
          50% { transform: translate(-10px, 20px) rotate(-1deg); }
          75% { transform: translate(20px, -5px) rotate(0.5deg); }
        }
      `}</style>
    </section>
  );
};

export default MissionValuesSection;
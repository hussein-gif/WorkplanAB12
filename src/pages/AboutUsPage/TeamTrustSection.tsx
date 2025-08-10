import React, { useMemo } from 'react';
import { CheckCircle } from 'lucide-react';

const TeamTrustSection: React.FC = () => {
  // Generate particles once and reuse the same array for performance
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      color: Math.random() > 0.5
        ? `rgba(59,130,246,${Math.random() * 0.3 + 0.1})`
        : Math.random() > 0.5
        ? `rgba(16,185,129,${Math.random() * 0.3 + 0.1})`
        : `rgba(168,85,247,${Math.random() * 0.3 + 0.1})`
    }));
  }, []);

  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: '#08132B' }}>
      {/* Incredibly Creative Unified Background Design */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Multi-Layered Gradient Orbs */}
        <div
          className="absolute w-[1200px] h-[1200px] rounded-full opacity-[0.12] blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(99,102,241,0.25) 35%, rgba(168,85,247,0.15) 65%, transparent 80%)`,
            left: '-300px',
            top: '-200px',
          }}
        />
        <div
          className="absolute w-[900px] h-[900px] rounded-full opacity-[0.10] blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(52,211,153,0.2) 40%, rgba(34,197,94,0.1) 70%, transparent 85%)`,
            right: '-200px',
            top: '20%',
          }}
        />
        <div
          className="absolute w-[700px] h-[700px] rounded-full opacity-[0.08] blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(147,51,234,0.18) 45%, rgba(126,34,206,0.08) 75%, transparent 90%)`,
            left: '40%',
            bottom: '-150px',
          }}
        />
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.09] blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(99,102,241,0.32) 0%, rgba(79,70,229,0.2) 40%, rgba(67,56,202,0.12) 70%, transparent 85%)`,
            right: '10%',
            bottom: '10%',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(52,211,153,0.28) 0%, rgba(34,197,94,0.16) 50%, rgba(22,163,74,0.08) 80%, transparent 90%)`,
            left: '20%',
            top: '60%',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06] blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(147,51,234,0.25) 0%, rgba(126,34,206,0.15) 55%, rgba(107,33,168,0.08) 85%, transparent 95%)`,
            right: '30%',
            top: '40%',
          }}
        />

        {/* Sophisticated SVG Pattern System */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Advanced Gradient Definitions */}
            <radialGradient id="complexGrad1" cx="30%" cy="20%" r="60%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.15)" />
              <stop offset="40%" stopColor="rgba(99,102,241,0.08)" />
              <stop offset="80%" stopColor="rgba(168,85,247,0.04)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="complexGrad2" cx="70%" cy="80%" r="50%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.12)" />
              <stop offset="50%" stopColor="rgba(52,211,153,0.06)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="complexGrad3" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="rgba(168,85,247,0.1)" />
              <stop offset="60%" stopColor="rgba(147,51,234,0.05)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.08)" />
              <stop offset="30%" stopColor="rgba(99,102,241,0.05)" />
              <stop offset="70%" stopColor="rgba(168,85,247,0.03)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="flowGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.06)" />
              <stop offset="50%" stopColor="rgba(52,211,153,0.04)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="flowGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168,85,247,0.07)" />
              <stop offset="40%" stopColor="rgba(147,51,234,0.04)" />
              <stop offset="80%" stopColor="rgba(126,34,206,0.02)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Complex Flowing Shapes */}
          <path
            d="M0,200 Q150,120 300,200 Q450,280 600,200 Q750,120 900,200 Q1050,280 1200,200 L1200,350 Q1050,430 900,350 Q750,270 600,350 Q450,430 300,350 Q150,270 0,350 Z"
            fill="url(#flowGrad1)"
          />
          <path
            d="M0,400 Q200,320 400,400 Q600,480 800,400 Q1000,320 1200,400 L1200,550 Q1000,630 800,550 Q600,470 400,550 Q200,630 0,550 Z"
            fill="url(#flowGrad2)"
          />
          <path
            d="M0,600 Q300,500 600,600 Q900,700 1200,600 L1200,750 Q900,850 600,750 Q300,650 0,750 Z"
            fill="url(#flowGrad3)"
          />
          <path
            d="M0,100 Q250,50 500,100 Q750,150 1000,100 Q1100,80 1200,100 L1200,250 Q1100,270 1000,250 Q750,200 500,250 Q250,300 0,250 Z"
            fill="url(#complexGrad1)"
          />
        </svg>

        {/* Advanced Conic Gradient Spirals */}
        <div
          className="absolute left-1/4 top-1/4 w-[800px] h-[800px] opacity-[0.06]"
          style={{
            background: `conic-gradient(from 45deg at 50% 50%, 
              rgba(59,130,246,0.2) 0deg, 
              rgba(99,102,241,0.15) 60deg,
              transparent 120deg, 
              rgba(168,85,247,0.12) 180deg,
              rgba(147,51,234,0.08) 240deg,
              transparent 300deg, 
              rgba(59,130,246,0.2) 360deg)`,
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 w-[600px] h-[600px] opacity-[0.05]"
          style={{
            background: `conic-gradient(from 225deg at 50% 50%, 
              rgba(16,185,129,0.18) 0deg, 
              transparent 90deg,
              rgba(52,211,153,0.12) 180deg, 
              rgba(34,197,94,0.08) 270deg,
              rgba(16,185,129,0.18) 360deg)`,
            borderRadius: '50%',
            filter: 'blur(50px)',
          }}
        />
        <div
          className="absolute left-1/3 top-1/3 w-[700px] h-[700px] opacity-[0.04]"
          style={{
            background: `conic-gradient(from 135deg at 50% 50%, 
              rgba(168,85,247,0.16) 0deg, 
              rgba(147,51,234,0.12) 72deg,
              transparent 144deg, 
              rgba(126,34,206,0.08) 216deg,
              transparent 288deg, 
              rgba(168,85,247,0.16) 360deg)`,
            borderRadius: '50%',
            filter: 'blur(55px)',
          }}
        />
        <div
          className="absolute right-1/3 top-2/3 w-[500px] h-[500px] opacity-[0.04]"
          style={{
            background: `conic-gradient(from 315deg at 50% 50%, 
              rgba(99,102,241,0.15) 0deg, 
              transparent 108deg,
              rgba(79,70,229,0.1) 216deg, 
              rgba(67,56,202,0.06) 324deg,
              rgba(99,102,241,0.15) 360deg)`,
            borderRadius: '50%',
            filter: 'blur(45px)',
          }}
        />

        {/* Sophisticated Particle System */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: `${p.top}%`,
              left: `${p.left}%`,
              backgroundColor: p.color,
            }}
          />
        ))}

        {/* Sophisticated Vignette System */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 1200px 800px at 50% 20%, transparent 40%, rgba(8,19,43,0.15) 80%, rgba(8,19,43,0.3) 100%),
              radial-gradient(ellipse 1000px 600px at 50% 80%, transparent 50%, rgba(8,19,43,0.1) 90%)
            `,
          }}
        />

        {/* Ultra-fine Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Team Section */}
      <section className="relative py-24 px-8">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-light text-white mb-6"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
            >
              Vårt Dedikerade Team
            </h2>
            <p
              className="text-xl text-white/70 max-w-2xl mx-auto"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Erfarna rekryterare som levererar kvalitet, snabbt och transparent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <img
                  src="https://i.ibb.co/WNwzR4vM/Black-and-White-Modern-Linkedln-Profile-Picture-4.png"
                  alt="Jawad Abbas"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h3
                className="text-xl font-medium text-white mb-2"
                style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
              >
                Jawad Abbas
              </h3>
              <p className="text-blue-400 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                Medgrundare & Affärsansvarig
              </p>
            </div>
            
            <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <img
                  src="https://i.ibb.co/cpq3pkZ/Black-and-White-Modern-Linkedln-Profile-Picture-3.png"
                  alt="Arvin Mahmoudi"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h3
                className="text-xl font-medium text-white mb-2"
                style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
              >
                Arvin Mahmoudi
              </h3>
              <p className="text-blue-400 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                Medgrundare & Leveranschef
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Promise Section */}
      <section id="trust-promise" className="relative py-24 px-8">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-light text-white mb-6"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
            >
              Vårt löfte till dig
            </h2>
            <p
              className="text-xl text-white/70 max-w-2xl mx-auto"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Därför väljer företag oss som bemanningspartner.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <CheckCircle size={20} className="text-green-400" />
                </div>
                <span className="text-white/80 text-lg font-medium leading-relaxed">
                  Dedikerad kontaktperson från första dagen.
                </span>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <CheckCircle size={20} className="text-green-400" />
                </div>
                <span className="text-white/80 text-lg font-medium leading-relaxed">
                  Transparent prissättning – inga dolda kostnader.
                </span>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <CheckCircle size={20} className="text-green-400" />
                </div>
                <span className="text-white/80 text-lg font-medium leading-relaxed">
                  Noggrann matchning av kandidater för bästa resultat.
                </span>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <CheckCircle size={20} className="text-green-400" />
                </div>
                <span className="text-white/80 text-lg font-medium leading-relaxed">
                  Snabba leveranser utan att tumma på kvaliteten.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamTrustSection;

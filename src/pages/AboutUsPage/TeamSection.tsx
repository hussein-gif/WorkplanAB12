import React from 'react';

const TeamSection: React.FC = () => {
  return (
    <section className="relative py-24 px-8 overflow-hidden" style={{ backgroundColor: '#08132B' }}>
      {/* Incredibly Creative Background Design */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Multi-layered Gradient Orbs with Complex Positioning */}
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

            {/* Intricate Pattern Definitions */}
            <pattern id="hexagonalMesh" width="120" height="104" patternUnits="userSpaceOnUse">
              <path d="M60 0 L120 30 L120 74 L60 104 L0 74 L0 30 Z" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
              <circle cx="60" cy="52" r="2" fill="rgba(59,130,246,0.15)" />
              <circle cx="30" cy="26" r="1.5" fill="rgba(16,185,129,0.12)" />
              <circle cx="90" cy="78" r="1" fill="rgba(168,85,247,0.1)" />
            </pattern>
            <pattern id="organicDots" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="rgba(59,130,246,0.2)" />
              <circle cx="60" cy="40" r="1" fill="rgba(16,185,129,0.18)" />
              <circle cx="40" cy="70" r="0.8" fill="rgba(168,85,247,0.15)" />
              <circle cx="70" cy="15" r="1.2" fill="rgba(99,102,241,0.12)" />
            </pattern>
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
            fill="url(#complexGrad1)"
          />

          {/* Pattern Overlays */}
          <rect width="100%" height="100%" fill="url(#hexagonalMesh)" opacity="0.6" />
          <rect width="100%" height="100%" fill="url(#organicDots)" opacity="0.4" />
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

        {/* Sophisticated Particle System */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              'radial-gradient(2px 2px at 15% 20%, rgba(59,130,246,0.4), transparent)',
              'radial-gradient(1.5px 1.5px at 35% 45%, rgba(16,185,129,0.35), transparent)',
              'radial-gradient(1px 1px at 65% 25%, rgba(168,85,247,0.3), transparent)',
              'radial-gradient(2.5px 2.5px at 80% 70%, rgba(99,102,241,0.25), transparent)',
              'radial-gradient(1.8px 1.8px at 25% 80%, rgba(52,211,153,0.3), transparent)',
              'radial-gradient(1.2px 1.2px at 90% 30%, rgba(147,51,234,0.2), transparent)',
              'radial-gradient(2px 2px at 45% 60%, rgba(34,197,94,0.25), transparent)',
              'radial-gradient(1px 1px at 70% 85%, rgba(126,34,206,0.2), transparent)'
            ].join(', '),
            backgroundSize: '400px 400px, 350px 350px, 300px 300px, 450px 450px, 380px 380px, 320px 320px, 420px 420px, 280px 280px',
            opacity: 0.6,
          }}
        />

        {/* Layered Mesh Gradients */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(30deg, rgba(59,130,246,0.1) 1px, transparent 1px),
              linear-gradient(120deg, rgba(16,185,129,0.08) 1px, transparent 1px),
              linear-gradient(60deg, rgba(168,85,247,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 100px 100px, 60px 60px',
          }}
        />

        {/* Premium Geometric Accents */}
        <div className="absolute top-20 left-16 w-4 h-4 bg-blue-400/20 rounded-full" />
        <div className="absolute top-32 right-24 w-3 h-3 bg-emerald-400/25 rounded-full" />
        <div className="absolute bottom-40 left-1/3 w-3.5 h-3.5 bg-purple-400/20 rounded-full" />
        <div className="absolute bottom-24 right-1/4 w-2.5 h-2.5 bg-blue-500/30 rounded-full" />
        <div className="absolute top-1/2 left-20 w-2 h-2 bg-emerald-500/25 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-purple-500/20 rounded-full" />
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-indigo-400/15 rounded-full" />
        <div className="absolute top-2/3 right-16 w-2.5 h-2.5 bg-teal-400/20 rounded-full" />

        {/* Elegant Border Frames */}
        <div
          className="absolute top-12 left-12 w-32 h-32 border border-white/10 rounded-full"
          style={{ transform: 'rotate(15deg)' }}
        />
        <div
          className="absolute bottom-16 right-20 w-24 h-24 border border-white/08 rounded-lg"
          style={{ transform: 'rotate(-20deg)' }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-20 h-20 border border-white/06 rounded-full"
          style={{ transform: 'rotate(45deg)' }}
        />

        {/* Multi-layered Radial Highlights */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(800px 500px at 20% 25%, rgba(59,130,246,0.04) 0%, transparent 65%),
              radial-gradient(600px 400px at 80% 30%, rgba(16,185,129,0.035) 0%, transparent 70%),
              radial-gradient(700px 450px at 40% 80%, rgba(168,85,247,0.03) 0%, transparent 75%),
              radial-gradient(500px 350px at 70% 60%, rgba(99,102,241,0.025) 0%, transparent 80%)
            `,
          }}
        />

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

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Vårt Dedikerade Team</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Erfarna rekryterare som levererar kvalitet, snabbt och transparent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              JA
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 break-words max-w-full">
              Jawad Abbas
            </h3>
            <p className="text-blue-400 font-medium break-words max-w-full">
              Medgrundare & Affärsansvarig
            </p>
          </div>
          
          <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              AM
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 break-words max-w-full">
              Arvin Mahmoudi
            </h3>
            <p className="text-blue-400 font-medium break-words max-w-full">
              Medgrundare & Leveranschef
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
  return (
    <section className="py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Vårt Dedikerade Team</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Erfarna rekryterare som levererar kvalitet, snabbt och transparent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              JA
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 break-words max-w-full">
              Jawad Abbas
            </h3>
            <p className="text-blue-400 font-medium break-words max-w-full">
              Medgrundare & Affärsansvarig
            </p>
          </div>
          
          <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              AM
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 break-words max-w-full">
              Arvin Mahmoudi
            </h3>
            <p className="text-blue-400 font-medium break-words max-w-full">
              Medgrundare & Leveranschef
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
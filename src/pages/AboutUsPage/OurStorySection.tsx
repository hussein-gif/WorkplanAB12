import React from 'react';

const OurStorySection: React.FC = () => {
  return (
    <section id="our-story" className="relative py-24 px-8 overflow-hidden">
      {/* Beautiful Static White Background with Creative Design */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base White Background */}
        <div className="absolute inset-0 bg-white" />
        
        {/* Layered Gradient Orbs - Static Positions */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.08] blur-3xl"
          style={{
            background: `radial-gradient(circle, #3B82F6 0%, #6366F1 30%, transparent 70%)`,
            left: '-200px',
            top: '-100px',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl"
          style={{
            background: `radial-gradient(circle, #10B981 0%, #34D399 40%, transparent 70%)`,
            right: '-150px',
            bottom: '-80px',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl"
          style={{
            background: `radial-gradient(circle, #A855F7 0%, #C084FC 50%, transparent 70%)`,
            left: '60%',
            top: '20%',
          }}
        />
        
        {/* Elegant SVG Pattern Overlay */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="elegantDots" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1.5" fill="rgba(59,130,246,0.15)" />
              <circle cx="20" cy="20" r="1" fill="rgba(16,185,129,0.12)" />
              <circle cx="60" cy="60" r="0.8" fill="rgba(168,85,247,0.1)" />
            </pattern>
            <pattern id="subtleLines" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 60 Q30 40 60 60 T120 60" stroke="rgba(59,130,246,0.08)" strokeWidth="1" fill="none" />
              <path d="M60 0 Q80 30 60 60 T60 120" stroke="rgba(16,185,129,0.06)" strokeWidth="1" fill="none" />
            </pattern>
            <linearGradient id="meshGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.04)" />
              <stop offset="50%" stopColor="rgba(99,102,241,0.02)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="meshGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.03)" />
              <stop offset="50%" stopColor="rgba(52,211,153,0.015)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          {/* Elegant flowing shapes */}
          <path
            d="M0,150 Q200,100 400,150 T800,150 L800,250 Q600,300 400,250 T0,250 Z"
            fill="url(#meshGradient1)"
          />
          <path
            d="M0,350 Q300,280 600,350 T1200,350 L1200,450 Q900,520 600,450 T0,450 Z"
            fill="url(#meshGradient2)"
          />
          
          {/* Pattern overlays */}
          <rect width="100%" height="100%" fill="url(#elegantDots)" opacity="0.6" />
          <rect width="100%" height="100%" fill="url(#subtleLines)" opacity="0.4" />
        </svg>
        
        {/* Geometric Accent Elements - Static */}
        <div
          className="absolute w-32 h-32 rounded-full opacity-[0.06]"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, 
              rgba(59,130,246,0.2) 0deg, 
              transparent 60deg, 
              rgba(99,102,241,0.15) 120deg, 
              transparent 180deg, 
              rgba(168,85,247,0.1) 240deg, 
              transparent 300deg, 
              rgba(59,130,246,0.2) 360deg)`,
            left: '15%',
            top: '25%',
            filter: 'blur(20px)',
          }}
        />
        <div
          className="absolute w-24 h-24 rounded-full opacity-[0.05]"
          style={{
            background: `conic-gradient(from 180deg at 50% 50%, 
              rgba(16,185,129,0.15) 0deg, 
              transparent 90deg, 
              rgba(52,211,153,0.1) 180deg, 
              transparent 270deg, 
              rgba(16,185,129,0.15) 360deg)`,
            right: '20%',
            bottom: '30%',
            filter: 'blur(15px)',
          }}
        />
        
        {/* Floating Decorative Elements - Static */}
        <div className="absolute top-16 left-20 w-3 h-3 bg-blue-400/20 rounded-full" />
        <div className="absolute top-32 right-32 w-2 h-2 bg-emerald-400/25 rounded-full" />
        <div className="absolute bottom-24 left-1/3 w-2.5 h-2.5 bg-purple-400/20 rounded-full" />
        <div className="absolute bottom-40 right-1/4 w-1.5 h-1.5 bg-blue-500/30 rounded-full" />
        <div className="absolute top-1/2 left-16 w-2 h-2 bg-emerald-500/20 rounded-full" />
        <div className="absolute top-20 right-1/3 w-1 h-1 bg-purple-500/25 rounded-full" />
        
        {/* Subtle Mesh Grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16,185,129,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Radial Highlight Areas */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(600px 400px at 25% 30%, rgba(59,130,246,0.03) 0%, transparent 60%),
              radial-gradient(500px 350px at 75% 70%, rgba(16,185,129,0.025) 0%, transparent 65%),
              radial-gradient(400px 300px at 50% 50%, rgba(168,85,247,0.02) 0%, transparent 70%)
            `,
          }}
        />
        
        {/* Soft Vignette for Focus */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 60%, rgba(255,255,255,0.3) 100%)`,
          }}
        />
        
        {/* Noise Texture for Premium Feel */}
        <div
          className="absolute inset-0 opacity-[0.008]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6">Vår resa hittills</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            På några månader har vi byggt upp en smart, transparent bemanningspartner för lager & logistik.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg">
            <div className="text-blue-600 font-bold text-lg mb-2">2025 Q2</div>
            <h3 className="text-xl font-semibold text-black mb-3">Starten</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Workplan grundas med fokus på att förenkla bemanning inom lager & logistik. Vi sätter våra processer, transparent prissättning och börjar bygga ett kvalitativt kandidatnätverk.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg">
            <div className="text-blue-600 font-bold text-lg mb-2">2025 Q3</div>
            <h3 className="text-xl font-semibold text-black mb-3">Första uppdrag & partnerskap</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              De första bemanningarna levereras och långsiktiga kundrelationer etableras. Vi finjusterar matchningsmodellen och växer vårt nätverk av tillgängliga specialister.
            </p>
          </div>
        </div>
      </div>
        </div>
    </section>
  );
};

export default OurStorySection;
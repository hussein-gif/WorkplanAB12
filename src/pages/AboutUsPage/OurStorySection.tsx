import React from 'react';

const OurStorySection: React.FC = () => {
  return (
    <section id="our-story" className="relative py-24 px-8 overflow-hidden">
      {/* Incredibly Creative Professional Background Design */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Premium White Base with Subtle Warmth */}
        <div className="absolute inset-0 bg-white" />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 25%, #f8fafc 50%, #ffffff 75%, #fefeff 100%)',
          }}
        />
        
        {/* Bold Visible Gradient Orbs with Strong Presence */}
        <div
          className="absolute w-[900px] h-[900px] rounded-full opacity-[0.25] blur-3xl"
          style={{
            background: `radial-gradient(circle, #3B82F6 0%, #6366F1 25%, #8B5CF6 45%, transparent 75%)`,
            left: '-300px',
            top: '-150px',
          }}
        />
        <div
          className="absolute w-[750px] h-[750px] rounded-full opacity-[0.20] blur-3xl"
          style={{
            background: `radial-gradient(circle, #10B981 0%, #34D399 30%, #06B6D4 55%, transparent 80%)`,
            right: '-200px',
            bottom: '-120px',
          }}
        />
        <div
          className="absolute w-[650px] h-[650px] rounded-full opacity-[0.18] blur-3xl"
          style={{
            background: `radial-gradient(circle, #A855F7 0%, #C084FC 35%, #F59E0B 60%, transparent 85%)`,
            left: '55%',
            top: '15%',
          }}
        />
        <div
          className="absolute w-[550px] h-[550px] rounded-full opacity-[0.15] blur-3xl"
          style={{
            background: `radial-gradient(circle, #EF4444 0%, #F97316 40%, #FBBF24 70%, transparent 90%)`,
            left: '20%',
            bottom: '10%',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.12] blur-3xl"
          style={{
            background: `radial-gradient(circle, #8B5CF6 0%, #EC4899 35%, #F43F5E 65%, transparent 85%)`,
            right: '25%',
            top: '40%',
          }}
        />
        
        {/* Advanced SVG Pattern System with Strong Visibility */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Enhanced Pattern Definitions */}
            <pattern id="premiumDots" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="3" fill="rgba(59,130,246,0.35)" />
              <circle cx="25" cy="25" r="2" fill="rgba(16,185,129,0.30)" />
              <circle cx="75" cy="75" r="1.5" fill="rgba(168,85,247,0.25)" />
              <circle cx="75" cy="25" r="1.8" fill="rgba(239,68,68,0.28)" />
              <circle cx="25" cy="75" r="2.2" fill="rgba(139,92,246,0.32)" />
            </pattern>
            
            <pattern id="organicLines" width="150" height="150" patternUnits="userSpaceOnUse">
              <path d="M0 75 Q37.5 50 75 75 T150 75" stroke="rgba(59,130,246,0.20)" strokeWidth="2" fill="none" />
              <path d="M75 0 Q100 37.5 75 75 T75 150" stroke="rgba(16,185,129,0.18)" strokeWidth="1.5" fill="none" />
              <path d="M0 37.5 Q75 25 150 37.5" stroke="rgba(168,85,247,0.15)" strokeWidth="1.8" fill="none" />
              <path d="M37.5 0 Q62.5 75 37.5 150" stroke="rgba(239,68,68,0.16)" strokeWidth="1.2" fill="none" />
            </pattern>
            
            <pattern id="hexagonMesh" width="120" height="104" patternUnits="userSpaceOnUse">
              <path d="M60 0 L120 30 L120 74 L60 104 L0 74 L0 30 Z" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" fill="rgba(59,130,246,0.05)" />
              <path d="M30 15 L90 15 L105 45 L90 75 L30 75 L15 45 Z" stroke="rgba(16,185,129,0.20)" strokeWidth="1" fill="rgba(16,185,129,0.03)" />
            </pattern>
            
            <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.12)" />
              <stop offset="30%" stopColor="rgba(99,102,241,0.08)" />
              <stop offset="60%" stopColor="rgba(168,85,247,0.06)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            
            <linearGradient id="flowGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.10)" />
              <stop offset="40%" stopColor="rgba(52,211,153,0.07)" />
              <stop offset="80%" stopColor="rgba(34,197,94,0.04)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            
            <linearGradient id="flowGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168,85,247,0.09)" />
              <stop offset="35%" stopColor="rgba(147,51,234,0.06)" />
              <stop offset="70%" stopColor="rgba(126,34,206,0.04)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="40%" stopColor="rgba(59,130,246,0.06)" />
              <stop offset="80%" stopColor="rgba(16,185,129,0.04)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          
          {/* Complex Flowing Organic Shapes */}
          <path
            d="M0,180 Q200,120 400,180 Q600,240 800,180 Q1000,120 1200,180 L1200,320 Q1000,380 800,320 Q600,260 400,320 Q200,380 0,320 Z"
            fill="url(#flowGradient1)"
          />
          <path
            d="M0,420 Q250,340 500,420 Q750,500 1000,420 Q1100,380 1200,420 L1200,580 Q1100,620 1000,580 Q750,500 500,580 Q250,660 0,580 Z"
            fill="url(#flowGradient2)"
          />
          <path
            d="M0,650 Q300,570 600,650 Q900,730 1200,650 L1200,800 Q900,880 600,800 Q300,720 0,800 Z"
            fill="url(#flowGradient3)"
          />
          <path
            d="M0,100 Q400,50 800,100 Q1000,125 1200,100 L1200,220 Q1000,245 800,220 Q400,170 0,220 Z"
            fill="url(#centerGlow)"
          />
          
          {/* Enhanced Pattern Overlays */}
          <rect width="100%" height="100%" fill="url(#premiumDots)" opacity="0.8" />
          <rect width="100%" height="100%" fill="url(#organicLines)" opacity="0.7" />
          <rect width="100%" height="100%" fill="url(#hexagonMesh)" opacity="0.6" />
        </svg>
        
        {/* Bold Conic Gradient Spirals */}
        <div
          className="absolute left-1/5 top-1/4 w-[600px] h-[600px] opacity-[0.15]"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, 
              rgba(59,130,246,0.4) 0deg, 
              rgba(99,102,241,0.3) 60deg,
              transparent 120deg, 
              rgba(168,85,247,0.25) 180deg,
              rgba(147,51,234,0.2) 240deg,
        {/* Vibrant Geometric Accent Elements */}
        <div className="absolute top-16 left-20 w-6 h-6 bg-blue-400/40 rounded-full shadow-lg" />
        <div className="absolute top-32 right-32 w-4 h-4 bg-emerald-400/45 rounded-full shadow-lg" />
        <div className="absolute bottom-40 left-1/3 w-5 h-5 bg-purple-400/35 rounded-full shadow-lg" />
        <div className="absolute bottom-24 right-1/4 w-3.5 h-3.5 bg-red-400/40 rounded-full shadow-lg" />
        <div className="absolute top-1/2 left-20 w-4.5 h-4.5 bg-emerald-500/35 rounded-full shadow-lg" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-500/40 rounded-full shadow-lg" />
        <div className="absolute bottom-1/3 left-2/3 w-5.5 h-5.5 bg-indigo-400/30 rounded-full shadow-lg" />
        <div className="absolute top-2/3 right-16 w-4 h-4 bg-teal-400/35 rounded-full shadow-lg" />
        <div className="absolute top-20 left-1/2 w-3.5 h-3.5 bg-cyan-400/38 rounded-full shadow-lg" />
        <div className="absolute bottom-20 left-16 w-6 h-6 bg-violet-400/42 rounded-full shadow-lg" />
        <div className="absolute top-40 right-1/2 w-3.8 h-3.8 bg-rose-400/35 rounded-full shadow-lg" />
        <div className="absolute bottom-32 right-32 w-5.2 h-5.2 bg-amber-400/40 rounded-full shadow-lg" />
        
        {/* Enhanced Border Frames with Stronger Visibility */}
        <div
          className="absolute top-12 left-12 w-40 h-40 border-2 border-blue-300/30 rounded-full shadow-lg"
          style={{ transform: 'rotate(15deg)' }}
        />
        <div
          className="absolute bottom-16 right-20 w-32 h-32 border-2 border-emerald-300/25 rounded-lg shadow-lg"
          style={{ transform: 'rotate(-20deg)' }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-28 h-28 border-2 border-purple-300/30 rounded-full shadow-lg"
          style={{ transform: 'rotate(45deg)' }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-36 h-36 border-2 border-red-300/25 rounded-lg shadow-lg"
          style={{ transform: 'rotate(30deg)' }}
        />
        <div
          className="absolute top-2/3 right-1/4 w-24 h-24 border-2 border-indigo-300/28 rounded-full shadow-lg"
          style={{ transform: 'rotate(-45deg)' }}
        />
        
        {/* Advanced Mesh Grid System */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16,185,129,0.12) 1px, transparent 1px),
              linear-gradient(45deg, rgba(168,85,247,0.10) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(239,68,68,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 100px 100px, 60px 60px, 90px 90px',
          }}
        />
        
        {/* Sophisticated Layered Highlights */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(800px 500px at 25% 30%, rgba(59,130,246,0.08) 0%, transparent 65%),
              radial-gradient(600px 400px at 75% 70%, rgba(16,185,129,0.07) 0%, transparent 70%),
              radial-gradient(500px 350px at 50% 50%, rgba(168,85,247,0.06) 0%, transparent 75%),
              radial-gradient(700px 450px at 80% 20%, rgba(239,68,68,0.05) 0%, transparent 68%),
              radial-gradient(550px 380px at 20% 80%, rgba(139,92,246,0.06) 0%, transparent 72%)
            `,
          }}
        />
        
        {/* Premium Particle System */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              'radial-gradient(3px 3px at 18% 22%, rgba(59,130,246,0.6), transparent)',
              'radial-gradient(2.5px 2.5px at 38% 48%, rgba(16,185,129,0.55), transparent)',
              'radial-gradient(2px 2px at 68% 28%, rgba(168,85,247,0.5), transparent)',
              'radial-gradient(3.5px 3.5px at 82% 72%, rgba(99,102,241,0.45), transparent)',
              'radial-gradient(2.8px 2.8px at 28% 82%, rgba(52,211,153,0.5), transparent)',
              'radial-gradient(2.2px 2.2px at 92% 32%, rgba(147,51,234,0.4), transparent)',
              'radial-gradient(3.2px 3.2px at 48% 62%, rgba(34,197,94,0.45), transparent)',
              'radial-gradient(2px 2px at 72% 88%, rgba(126,34,206,0.4), transparent)',
              'radial-gradient(2.6px 2.6px at 58% 18%, rgba(79,70,229,0.42), transparent)',
              'radial-gradient(2.3px 2.3px at 88% 52%, rgba(67,56,202,0.38), transparent)',
              'radial-gradient(3.8px 3.8px at 32% 38%, rgba(22,163,74,0.4), transparent)',
              'radial-gradient(2.7px 2.7px at 78% 78%, rgba(107,33,168,0.35), transparent)',
              'radial-gradient(2.4px 2.4px at 22% 68%, rgba(37,99,235,0.45), transparent)',
              'radial-gradient(3.1px 3.1px at 98% 82%, rgba(5,150,105,0.4), transparent)',
              'radial-gradient(2.1px 2.1px at 62% 92%, rgba(239,68,68,0.35), transparent)',
              'radial-gradient(3.3px 3.3px at 42% 12%, rgba(91,33,182,0.38), transparent)'
            ].join(', '),
            backgroundSize: '300px 300px, 250px 250px, 200px 200px, 350px 350px, 280px 280px, 220px 220px, 320px 320px, 180px 180px, 260px 260px, 230px 230px, 290px 290px, 210px 210px, 270px 270px, 240px 240px, 190px 190px, 310px 310px',
            opacity: 0.8,
          }}
        />
        
        {/* Sophisticated Layered Mesh */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(30deg, rgba(59,130,246,0.2) 1px, transparent 1px),
              linear-gradient(120deg, rgba(16,185,129,0.18) 1px, transparent 1px),
              linear-gradient(60deg, rgba(168,85,247,0.15) 1px, transparent 1px),
              linear-gradient(150deg, rgba(99,102,241,0.12) 1px, transparent 1px),
              linear-gradient(0deg, rgba(239,68,68,0.10) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249,115,22,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 80px 80px, 45px 45px, 70px 70px, 55px 55px, 65px 65px',
          }}
        />
        
        {/* Enhanced Radial Highlight System */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(700px 450px at 25% 30%, rgba(59,130,246,0.10) 0%, transparent 65%),
              radial-gradient(600px 400px at 75% 70%, rgba(16,185,129,0.08) 0%, transparent 70%),
              radial-gradient(500px 350px at 50% 50%, rgba(168,85,247,0.07) 0%, transparent 75%),
              radial-gradient(650px 420px at 80% 20%, rgba(239,68,68,0.06) 0%, transparent 68%),
              radial-gradient(550px 380px at 20% 80%, rgba(139,92,246,0.07) 0%, transparent 72%),
              radial-gradient(600px 390px at 60% 40%, rgba(52,211,153,0.06) 0%, transparent 70%)
            `,
          }}
        />
        
        {/* Professional Vignette System */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 1200px 800px at 50% 50%, transparent 50%, rgba(0,0,0,0.02) 85%, rgba(0,0,0,0.05) 100%),
              linear-gradient(135deg, rgba(59,130,246,0.02) 0%, transparent 30%, rgba(16,185,129,0.02) 70%, transparent 100%)
            `,
          }}
        />
        
        {/* Premium Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Elegant Accent Stripes */}
        <div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-300/20 to-transparent"
        />
        <div
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-emerald-300/15 to-transparent"
        />
        <div
          className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-purple-300/18 to-transparent"
        />
        
        {/* Sophisticated Corner Accents */}
        <div
          className="absolute top-0 left-0 w-32 h-32"
          style={{
            background: `conic-gradient(from 0deg at 0% 0%, rgba(59,130,246,0.15) 0deg, transparent 90deg, transparent 360deg)`,
          }}
        />
        <div
          className="absolute top-0 right-0 w-32 h-32"
          style={{
            background: `conic-gradient(from 90deg at 100% 0%, rgba(16,185,129,0.12) 0deg, transparent 90deg, transparent 360deg)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-32 h-32"
          style={{
            background: `conic-gradient(from 270deg at 0% 100%, rgba(168,85,247,0.10) 0deg, transparent 90deg, transparent 360deg)`,
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-32 h-32"
          style={{
            background: `conic-gradient(from 180deg at 100% 100%, rgba(239,68,68,0.08) 0deg, transparent 90deg, transparent 360deg)`,
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
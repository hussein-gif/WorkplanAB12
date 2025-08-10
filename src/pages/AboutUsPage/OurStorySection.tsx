import React from 'react';

const OurStorySection: React.FC = () => {
  return (
    <section id="our-story" className="relative py-24 px-8 overflow-hidden bg-white">
      {/* Stunning Creative Professional Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Premium Gradient Orbs System */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100" />
        <div className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full opacity-35 blur-3xl bg-gradient-to-tl from-emerald-100 via-teal-50 to-cyan-100" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-25 blur-3xl bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100" />
        <div className="absolute bottom-1/3 left-1/5 w-[350px] h-[350px] rounded-full opacity-30 blur-3xl bg-gradient-to-tr from-orange-100 via-amber-50 to-yellow-100" />
        
        {/* Sophisticated SVG Pattern Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Premium Dot Pattern */}
            <pattern id="elegantDots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="rgba(59,130,246,0.15)" />
              <circle cx="15" cy="15" r="1.5" fill="rgba(16,185,129,0.12)" />
              <circle cx="45" cy="45" r="1" fill="rgba(168,85,247,0.10)" />
            </pattern>
            
            {/* Flowing Lines Pattern */}
            <pattern id="flowingLines" x="0" y="0" width="120" height="80" patternUnits="userSpaceOnUse">
              <path d="M0,40 Q30,20 60,40 T120,40" stroke="rgba(59,130,246,0.08)" strokeWidth="1.5" fill="none" />
              <path d="M0,20 Q40,0 80,20 T120,20" stroke="rgba(16,185,129,0.06)" strokeWidth="1" fill="none" />
              <path d="M0,60 Q20,40 40,60 T120,60" stroke="rgba(168,85,247,0.05)" strokeWidth="1" fill="none" />
            </pattern>
            
            {/* Geometric Mesh */}
            <pattern id="geometricMesh" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <polygon points="50,10 90,35 90,65 50,90 10,65 10,35" stroke="rgba(59,130,246,0.06)" strokeWidth="0.8" fill="none" />
              <circle cx="50" cy="50" r="3" fill="rgba(16,185,129,0.08)" />
            </pattern>
            
            {/* Radial Gradients for Depth */}
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="40%" stopColor="rgba(239,246,255,0.6)" />
              <stop offset="80%" stopColor="rgba(219,234,254,0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            
            <radialGradient id="accentGlow1" cx="20%" cy="30%" r="40%">
              <stop offset="0%" stopColor="rgba(147,197,253,0.15)" />
              <stop offset="60%" stopColor="rgba(191,219,254,0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            
            <radialGradient id="accentGlow2" cx="80%" cy="70%" r="35%">
              <stop offset="0%" stopColor="rgba(167,243,208,0.12)" />
              <stop offset="50%" stopColor="rgba(209,250,229,0.06)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          
          {/* Apply Patterns */}
          <rect width="100%" height="100%" fill="url(#elegantDots)" />
          <rect width="100%" height="100%" fill="url(#flowingLines)" opacity="0.7" />
          <rect width="100%" height="100%" fill="url(#geometricMesh)" opacity="0.4" />
          
          {/* Gradient Overlays */}
          <rect width="100%" height="100%" fill="url(#centerGlow)" />
          <rect width="100%" height="100%" fill="url(#accentGlow1)" />
          <rect width="100%" height="100%" fill="url(#accentGlow2)" />
          
          {/* Elegant Accent Lines */}
          <path d="M0,200 Q400,150 800,200 T1600,200" stroke="rgba(59,130,246,0.12)" strokeWidth="2" fill="none" />
          <path d="M0,400 Q300,350 600,400 T1200,400" stroke="rgba(16,185,129,0.10)" strokeWidth="1.5" fill="none" />
          <path d="M200,0 Q400,100 600,0 T1000,0" stroke="rgba(168,85,247,0.08)" strokeWidth="1" fill="none" />
        </svg>
        
        {/* Premium Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 opacity-40 shadow-lg animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-32 right-32 w-3 h-3 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-300 opacity-35 shadow-md animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-40 w-5 h-5 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 opacity-30 shadow-lg animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-2 h-2 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 opacity-45 shadow-sm animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
        
        {/* Sophisticated Border Accents */}
        <div className="absolute top-16 left-16 w-16 h-16 border border-blue-200/30 rounded-full opacity-60" />
        <div className="absolute bottom-24 right-24 w-20 h-20 border border-emerald-200/25 rounded-lg opacity-50 rotate-12" />
        <div className="absolute top-1/3 right-1/4 w-12 h-12 border border-purple-200/35 rounded-full opacity-40" />
        
        {/* Elegant Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Premium Center Highlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-gradient-to-b from-white via-blue-50/20 to-white opacity-70 blur-3xl" />

        {/* Elegant Wave Form at Bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32 text-blue-50/60"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
          fill="currentColor"
        >
          <path d="M0,96L48,80C96,64,192,32,288,42.7C384,53,480,107,576,128C672,149,768,139,864,144C960,149,1056,171,1152,192C1248,213,1344,235,1392,245.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" opacity="0.8" />
        </svg>
        
        {/* Subtle Vignette for Focus */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/15" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Rubrik */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-medium text-black mb-4"
            style={{ fontFamily: "'Zen Kaku Gothic Antique', sans-serif" }}
          >
            Vår resa hittills
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto font-light"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            På några månader har vi byggt upp en smart, transparent bemanningspartner för lager &amp; logistik.
          </p>
        </div>

        {/* Roadmap */}
        <div className="relative">
          <div className="relative w-screen left-1/2 -translate-x-1/2 h-56">
            {/* Linje */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-blue-600" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-blue-500/40 blur-[2px]" />

            {/* Punkt Q2 */}
            <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '25%' }}>
              <div className="relative z-10 flex items-center justify-center">
                <span className="absolute w-6 h-6 rounded-full bg-blue-500/20 blur-sm" />
                <span className="absolute w-4 h-4 rounded-full border-2 border-white" />
                <span className="relative w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.55)]" />
              </div>
              <div className="absolute -top-36 left-1/2 -translate-x-1/2">
                <div className="relative w-[220px] rounded-xl border border-gray-200 bg-white shadow-lg p-4 text-center">
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-b border-r border-gray-200" />
                  <div className="text-blue-600 font-semibold text-sm mb-1">2025 Q2</div>
                  <div className="text-gray-900 font-semibold">Starten</div>
                  <p className="mt-1 text-xs leading-snug text-gray-600">
                    Workplan grundas med fokus på att förenkla bemanning inom lager &amp; logistik.
                  </p>
                </div>
              </div>
            </div>

            {/* Punkt Q3 */}
            <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '75%' }}>
              <div className="relative z-10 flex items-center justify-center">
                <span className="absolute w-6 h-6 rounded-full bg-blue-500/20 blur-sm" />
                <span className="absolute w-4 h-4 rounded-full border-2 border-white" />
                <span className="relative w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.55)]" />
              </div>
              <div className="absolute top-12 left-1/2 -translate-x-1/2">
                <div className="relative w-[240px] rounded-xl border border-gray-200 bg-white shadow-lg p-4 text-center">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-t border-l border-gray-200" />
                  <div className="text-blue-600 font-semibold text-sm mb-1">2025 Q3</div>
                  <div className="text-gray-900 font-semibold">Första uppdrag &amp; partnerskap</div>
                  <p className="mt-1 text-xs leading-snug text-gray-600">
                    De första bemanningarna levereras och långsiktiga kundrelationer etableras.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Users, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConversionBanner = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
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
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background System */}
      <div className="absolute inset-0">
        {/* Main Background Image with Parallax */}
        <div 
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) scale(1.05)`,
          }}
        >
          <img
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
            alt="Professional business meeting"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Sophisticated Overlay System */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Dynamic Gradient Orbs */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.08] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl transition-all duration-1000 delay-500"
          style={{
            background: `radial-gradient(circle, #10B981 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.2}%`,
            bottom: `${mousePosition.y * 0.3}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Elegant Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />

        {/* Floating Accent Elements */}
        <div className="absolute top-20 right-32 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-emerald-400/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-8">
        <div className="text-center flex flex-col items-center space-y-4">
          {/* Main Heading */}
          <h2
            className={`
              text-5xl md:text-6xl font-normal text-white tracking-tight leading-[0.9]
              transition-all duration-1000 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
            `}
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 400, textTransform: 'capitalize' }}
          >
            Vill Du Veta Mer?
          </h2>

          {/* Elegant Separator */}
          <div className={`
            flex items-center justify-center space-x-4
            transition-all duration-1000 delay-200 transform
            ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
          `}>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="w-2 h-2 bg-white/20 rounded-full" />
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>

          {/* Subtitle */}
          <p className={`
            text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto
            transition-all duration-1000 delay-400 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}
          >
            Oavsett om du är kandidat eller arbetsgivare har vi rätt lösning för dig.
          </p>
          
          {/* Enhanced Button Container */}
          <div className={`
            flex flex-col sm:flex-row gap-6 justify-center items-center
            transition-all duration-1000 delay-600 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            {/* Contact Us Button */}
            <button
              onClick={() => navigate('/contact')}
              className="
                group relative px-8 py-4 
                bg-white/95 text-gray-900 rounded-2xl
                font-semibold text-lg tracking-wide
                hover:bg-white hover:scale-105
                transition-all duration-300
                shadow-2xl hover:shadow-white/20
                hover:-translate-y-1
                overflow-hidden
                min-w-[200px]
              "
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              
              <div className="relative flex items-center justify-center space-x-3">
                <Users size={18} className="text-[#22A055]" />
                <span className="text-[#22A055]">Kontakta Oss</span>
                <ArrowRight size={16} className="text-[#22A055] group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
            
            {/* Read More Button */}
            <button
              onClick={() => navigate('/services')}
              className="
                group relative px-8 py-4
                bg-transparent text-white border-2 border-white/30 rounded-2xl
                font-semibold text-lg tracking-wide
                hover:border-white/60 hover:bg-white/10 hover:scale-105
                transition-all duration-300
                backdrop-blur-sm
                hover:-translate-y-1
                overflow-hidden
                min-w-[200px]
              "
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              
              <div className="relative flex items-center justify-center space-x-3">
                <Building2 size={18} className="text-white/80" />
                <span>Läs Mer</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Accent */}
      <div className={`
        absolute bottom-8 left-1/2 transform -translate-x-1/2
        transition-all duration-1000 delay-800 transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}>
        <div className="inline-flex items-center space-x-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="flex space-x-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '500ms' }} />
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1000ms' }} />
          </div>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default ConversionBanner;

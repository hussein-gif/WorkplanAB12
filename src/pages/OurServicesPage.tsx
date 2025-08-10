import React, { useState, useEffect } from 'react';
import ServicesHeroSection from './OurServicesPage/ServicesHeroSection';
import ServiceOverviewSection from './OurServicesPage/ServiceOverviewSection';
import ProcessSection from './OurServicesPage/ProcessSection';
import WhyChooseSection from './OurServicesPage/WhyChooseSection';
import CallToActionSection from './OurServicesPage/CallToActionSection';
import FAQSection from './OurServicesPage/FAQSection';

const OurServicesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    <div className="min-h-screen bg-white">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient Orbs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.02] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.015] blur-3xl transition-all duration-1000 delay-500"
          style={{
            background: `radial-gradient(circle, #10B981 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.2}%`,
            bottom: `${mousePosition.y * 0.3}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10">
        <ServicesHeroSection 
          isVisible={isVisible}
          mousePosition={mousePosition}
        />
        
        <ServiceOverviewSection isVisible={isVisible} />
        
        <ProcessSection isVisible={isVisible} />
        
        <WhyChooseSection isVisible={isVisible} />
        
        <CallToActionSection />
        
        <FAQSection />
      </div>
    </div>
  );
};

export default OurServicesPage;
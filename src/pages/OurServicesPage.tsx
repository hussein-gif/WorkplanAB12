import React, { useState, useEffect, useRef } from 'react';
import ServicesHeroSection from './OurServicesPage/ServicesHeroSection';
import ServiceOverviewSection from './OurServicesPage/ServiceOverviewSection';
import ProcessSection from './OurServicesPage/ProcessSection';
import WhyChooseSection from './OurServicesPage/WhyChooseSection';
import CallToActionSection from './OurServicesPage/CallToActionSection';
import FAQSection from './OurServicesPage/FAQSection';
import SEO from '../components/SEO'; // ⬅️ SEO-import

const OurServicesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // rAF-throttle + "update only if changed enough" för att minska re-renders
  const frameRef = useRef<number | null>(null);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth) * 100;
        const ny = (e.clientY / window.innerHeight) * 100;

        // uppdatera bara om förändringen är märkbar (~0.5%)
        const lx = lastPosRef.current.x;
        const ly = lastPosRef.current.y;
        if (Math.abs(nx - lx) > 0.5 || Math.abs(ny - ly) > 0.5) {
          lastPosRef.current = { x: nx, y: ny };
          setMousePosition({ x: nx, y: ny });
        }

        frameRef.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      <SEO
        title="Bemanningstjänster & rekrytering för lager & logistik | Workplan"
        description="Upptäck Workplans tjänster för bemanning och rekrytering inom lager och logistik. Strukturerad process, hög kvalitet och snabb leverans – rätt personal i rätt tid."
        canonical="https://www.work-plan.se/tjanster"
      />

      {/* ✅ Förhindrar horisontell scroll på denna sida och förbättrar rendering */}
      <div
        className="relative min-h-screen bg-white overflow-x-hidden"
        style={{
          contentVisibility: 'auto',
          containIntrinsicSize: '1200px',
        }}
      >
        {/* Subtle Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Dynamic Gradient Orbs */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-[0.02] blur-3xl transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)`,
              left: `${mousePosition.x * 0.3}%`,
              top: `${mousePosition.y * 0.2}%`,
              transform: 'translate(-50%, -50%)',
              willChange: 'transform',
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-[0.015] blur-3xl transition-all duration-1000 delay-500"
            style={{
              background: `radial-gradient(circle, #10B981 0%, transparent 70%)`,
              right: `${mousePosition.x * 0.2}%`,
              bottom: `${mousePosition.y * 0.3}%`,
              transform: 'translate(50%, 50%)',
              willChange: 'transform',
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
    </>
  );
};

export default OurServicesPage;

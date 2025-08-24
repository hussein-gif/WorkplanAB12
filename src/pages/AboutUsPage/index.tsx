import React, { useState, useEffect } from 'react';
import AboutHeroSection from './AboutHeroSection';
import MissionValuesSection from './MissionValuesSection';
import OurStorySection from './OurStorySection';
import TeamTrustSection from './TeamTrustSection';
import SEO from '../../components/SEO'; // ⬅️ FIXAD SÖKVÄG

const AboutUsPage = () => {
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

  const scrollToStory = () => {
    const element = document.getElementById('our-story');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO
        title="Om oss | Workplan"
        description="Lär känna Workplan – vi hjälper företag och kandidater inom lager och logistik med smart bemanning och rekrytering. Läs om vår mission, värderingar och hur vi bygger team som klarar framtiden."
        canonical="https://www.workplan.se/om-oss"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        {/* Sophisticated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-slate-900/90 to-gray-800/95" />

          {/* Dynamic Gradient Orbs */}
          <div
            className="absolute w-[800px] h-[800px] rounded-full opacity-[0.06] blur-3xl transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)`,
              left: `${mousePosition.x * 0.3}%`,
              top: `${mousePosition.y * 0.2}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl transition-all duration-1000 delay-500"
            style={{
              background: `radial-gradient(circle, #10B981 0%, transparent 70%)`,
              right: `${mousePosition.x * 0.2}%`,
              bottom: `${mousePosition.y * 0.3}%`,
              transform: 'translate(50%, 50%)',
            }}
          />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10">
          <AboutHeroSection isVisible={isVisible} scrollToStory={scrollToStory} />
          <MissionValuesSection />
          <OurStorySection />
          <TeamTrustSection />
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;

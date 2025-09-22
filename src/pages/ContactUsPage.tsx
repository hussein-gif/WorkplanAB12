import React, { useState, useEffect, useRef } from 'react';
import ContactHeroSection from './ContactUsPage/ContactHeroSection';
import CandidateFormContainer from './ContactUsPage/CandidateFormContainer';
import CompanyFormContainer from './ContactUsPage/CompanyFormContainer';
import AlternativeContactSection from './ContactUsPage/AlternativeContactSection';
import SEO from '../components/SEO';

const ContactUsPage = () => {
  const [userType, setUserType] = useState<'candidate' | 'company' | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // För throttling av musrörelser
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (frameRef.current) return; // throttle
      frameRef.current = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
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
        title="Kontakta Workplan – bemanning & rekrytering inom lager & logistik"
        description="Kontakta Workplan för frågor om bemanning, rekrytering eller samarbeten inom lager och logistik. Vi återkopplar snabbt och hjälper dig med rätt lösning."
        canonical="https://www.work-plan.se/kontakt"
      />

      <div
        className="min-h-screen bg-white"
        style={{
          contentVisibility: 'auto',
          containIntrinsicSize: '1200px',
        }}
      >
        <div className="relative z-10">
          <ContactHeroSection
            isVisible={isVisible}
            mousePosition={mousePosition}
            userType={userType}
            setUserType={setUserType}
          />

          {/* Kandidatformulär */}
          {userType === 'candidate' && (
            <CandidateFormContainer onClose={() => setUserType(null)} />
          )}

          {/* Företagsformulär */}
          {userType === 'company' && (
            <CompanyFormContainer onClose={() => setUserType(null)} />
          )}

          <AlternativeContactSection />
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;

import React, { useState, useEffect } from 'react';
import ContactHeroSection from './ContactUsPage/ContactHeroSection';
// ✅ Kandidat använder containern
import CandidateFormContainer from './ContactUsPage/CandidateFormContainer';
// ✅ Företag använder containern (bytt från Section)
import CompanyFormContainer from './ContactUsPage/CompanyFormContainer';
import AlternativeContactSection from './ContactUsPage/AlternativeContactSection';
import SEO from '../components/SEO'; // ✅ FIXAD SÖKVÄG

const ContactUsPage = () => {
  const [userType, setUserType] = useState<'candidate' | 'company' | null>(null);
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
    <>
      <SEO
        title="Kontakta Workplan – bemanning & rekrytering inom lager & logistik"
        description="Kontakta Workplan för frågor om bemanning, rekrytering eller samarbeten inom lager och logistik. Vi återkopplar snabbt och hjälper dig med rätt lösning."
        canonical="https://www.work-plan.se/kontakt"
      />

      <div className="min-h-screen bg-white">
        <div className="relative z-10">
          <ContactHeroSection
            isVisible={isVisible}
            mousePosition={mousePosition}
            userType={userType}
            setUserType={setUserType}
          />

          {/* ✅ Kandidatformulär */}
          {userType === 'candidate' && (
            <CandidateFormContainer onClose={() => setUserType(null)} />
          )}

          {/* ✅ Företagsformulär */}
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

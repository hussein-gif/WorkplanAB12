import React, { useState, useEffect } from 'react';
import ContactHeroSection from './ContactUsPage/ContactHeroSection';
// ⬇️ BYTT: Vi använder containern istället för presentational-komponenten
import CandidateFormContainer from './ContactUsPage/CandidateFormContainer';
import CompanyFormSection from './ContactUsPage/CompanyFormSection';
import AlternativeContactSection from './ContactUsPage/AlternativeContactSection';
import SEO from '../components/SEO'; // ✅ FIXAD SÖKVÄG

const ContactUsPage = () => {
  const [userType, setUserType] = useState<'candidate' | 'company' | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // ⬇️ Behåller endast company-formens state/handlers
  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    nameTitle: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    gdprAccept: false
  });

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

  // ⬇️ Kandidat-submit/-change tas bort – sköts av CandidateFormContainer
  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Company form submitted:', companyForm);
    // TODO: Lägg in din Supabase insert för företag här om du vill spara även detta
  };

  const handleCompanyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setCompanyForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

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

          {/* ⬇️ NYTT: använd containern – den sparar till Supabase */}
          {userType === 'candidate' && (
            <CandidateFormContainer onClose={() => setUserType(null)} />
          )}

          {userType === 'company' && (
            <CompanyFormSection
              companyForm={companyForm}
              handleCompanySubmit={handleCompanySubmit}
              handleCompanyChange={handleCompanyChange}
              onClose={() => setUserType(null)}
            />
          )}

          <AlternativeContactSection />
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;

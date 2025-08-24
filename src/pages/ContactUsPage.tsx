import React, { useState, useEffect } from 'react';
import ContactHeroSection from './ContactUsPage/ContactHeroSection';
import CandidateFormSection from './ContactUsPage/CandidateFormSection';
import CompanyFormSection from './ContactUsPage/CompanyFormSection';
import AlternativeContactSection from './ContactUsPage/AlternativeContactSection';
import SEO from '../components/SEO'; // ✅ FIXAD SÖKVÄG

const ContactUsPage = () => {
  const [userType, setUserType] = useState<'candidate' | 'company' | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [candidateForm, setCandidateForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    gdprConsent: false
  });
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

  const handleCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Candidate form submitted:', candidateForm);
    // Handle form submission
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Company form submitted:', companyForm);
    // Handle form submission
  };

  const handleCandidateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setCandidateForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCompanyForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <SEO
        title="Kontakta Workplan – bemanning & rekrytering inom lager & logistik"
        description="Kontakta Workplan för frågor om bemanning, rekrytering eller samarbeten inom lager och logistik. Vi återkopplar snabbt och hjälper dig med rätt lösning."
        canonical="https://www.workplan.se/kontakt"
      />

      <div className="min-h-screen bg-white">
        <div className="relative z-10">
          <ContactHeroSection 
            isVisible={isVisible}
            mousePosition={mousePosition}
            userType={userType}
            setUserType={setUserType}
          />

          {userType === 'candidate' && (
            <CandidateFormSection 
              candidateForm={candidateForm}
              handleCandidateSubmit={handleCandidateSubmit}
              handleCandidateChange={handleCandidateChange}
              onClose={() => setUserType(null)}
            />
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

import React, { useState, useEffect } from 'react';
import PartnerHeroSection from './PartnerHeroSection';
import WhyChooseUsSection from './WhyChooseUsSection';
import ServicesSection from './ServicesSection';
import ProcessSection from './ProcessSection';
import IndustriesSection from './IndustriesSection';
import PromiseBandSection from './PromiseBandSection';
import TeamSection from './TeamSection';
// ⬇️ Byt till containern
import ContactFormContainer from './ContactFormContainer';
import SEO from '../../components/SEO'; // ⬅️ Import SEO

const PartnerWithUsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    fornamn: '',
    efternamn: '',
    foretag: '',
    titel: '',
    epost: '',
    telefon: '',
    typAvBehov: '',
    antalPersoner: '',
    onskadStart: '',
    plats: '',
    meddelande: '',
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleServiceSelect = (serviceType: string) => {
    setFormData(prev => ({
      ...prev,
      typAvBehov: serviceType
    }));
  };

  const scrollToContact = () => {
    const element = document.getElementById('kontakt-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProcess = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO
        title="Bemanning & rekrytering inom lager & logistik | Workplan"
        description="Workplan hjälper företag med bemanning och rekrytering inom lager och logistik. Vi levererar rätt personal vid rätt tidpunkt – flexibelt, pålitligt och professionellt."
        canonical="https://www.work-plan.se/foretag"
      />

      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 overflow-x-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-slate-900/90 to-gray-800/95" />
          
          {/* Dynamic Gradient Orbs */}
          <div 
            className="absolute w-[800px] h-[800px] rounded-full opacity-[0.06] blur-3xl transition-all duration-1000 pointer-events-none"
            style={{
              background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)`,
              left: `${mousePosition.x * 0.3}%`,
              top: `${mousePosition.y * 0.2}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div 
            className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl transition-all duration-1000 delay-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle, #10B981 0%, transparent 70%)`,
              right: `${mousePosition.x * 0.2}%`,
              bottom: `${mousePosition.y * 0.3}%`,
              transform: 'translate(50%, 50%)',
            }}
          />

          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
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
          <PartnerHeroSection 
            isVisible={isVisible}
            scrollToContact={scrollToContact}
            scrollToProcess={scrollToProcess}
          />
          
          <WhyChooseUsSection isVisible={isVisible} />
          
          <ServicesSection isVisible={isVisible} onServiceSelect={handleServiceSelect} />
          
          <ProcessSection isVisible={isVisible} />
          
          <IndustriesSection isVisible={isVisible} />
          
          <PromiseBandSection isVisible={isVisible} />
          
          <TeamSection isVisible={isVisible} />
          
          {/* ⬇️ Byt till containern (ingen prop behövs) */}
          <ContactFormContainer />
        </div>
      </div>
    </>
  );
};

export default PartnerWithUsPage;

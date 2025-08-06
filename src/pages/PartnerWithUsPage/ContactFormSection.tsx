import React from 'react';
import { Send, Building, User, Mail, Phone, MessageSquare } from 'lucide-react';

interface ContactFormSectionProps {
  formData: {
    fornamn: string;
    efternamn: string;
    foretag: string;
    titel: string;
    epost: string;
    telefon: string;
    typAvBehov: string;
    antalPersoner: string;
    onskadStart: string;
    plats: string;
    meddelande: string;
    gdprAccept: boolean;
  };
  handleFormSubmit: (e: React.FormEvent) => void;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  formData,
  handleFormSubmit,
  handleInputChange,
}) => {
  // Defensive handling for undefined formData
  const safeFormData = formData || {
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
    gdprAccept: false,
  };

  return (
    <section id="kontakt-form" className="contact-form-section relative">
      {/* Wave continuation up top */}
      <div
        className="absolute top-0 left-0 w-full h-20 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
            fill="#08132B"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-24 px-8">
        <h2
          className="text-4xl sm:text-5xl text-white font-medium text-center mb-8"
          style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
        >
          Börja Bemanna
        </h2>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-lg">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* … alla formulärfält oförändrade … */}
          </form>
        </div>
      </div>

      <style>{`
        .contact-form-section {
          position: relative;
          overflow: hidden;
          /* Subtil gradient: mörk upptill, mycket lätt ljus ton längst ner */
          background: linear-gradient(
            180deg,
            #08132B 0%,
            #08132B 85%,
            #E8EFF4 100%
          );
        }
      `}</style>
    </section>
  );
};

export default ContactFormSection;

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
  return (
    <section id="kontakt-form" className="contact-form-section relative">
      {/* Wave continuation from previous section */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ opacity: 0.4 }}>
        <div className="absolute inset-0 bg-white/0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" className="w-full h-full">
            <g fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2">
              <path d="M0 200 Q200 100 400 200 T800 200" />
              <path d="M0 300 Q200 200 400 300 T800 300" />
              <path d="M0 400 Q200 300 400 400 T800 400" />
            </g>
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-24 px-8">
        <div className="text-center mb-12">
          <h2
            className="text-4xl sm:text-5xl text-white mb-2"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 400,
            }}
          >
            Börja Bemanna
          </h2>
          <p
            className="text-base text-white/60 mb-8"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
            }}
          >
            Berätta om ert behov så återkommer vi med ett skräddarsytt förslag.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-lg">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* form fields... */}
          </form>
        </div>
      </div>

      <style>{`
        .contact-form-section {
          position: relative;
          overflow: hidden;
          background-color: #08132B;
        }
        .contact-form-section > div.absolute {
          z-index: 0;
        }
        .contact-form-section .content, .contact-form-section form, .contact-form-section .relative.z-10 {
          position: relative;
          z-index: 10;
        }
      `}</style>
    </section>
  );
};

export default ContactFormSection;

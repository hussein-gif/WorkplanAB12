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
    <section id="kontakt-form" className="contact-form-section">
      <div className="max-w-4xl mx-auto py-24 px-8">
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
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Förnamn *
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                    size={18}
                  />
                  <input
                    type="text"
                    name="fornamn"
                    value={formData.fornamn}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                    placeholder="Ditt förnamn"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Efternamn *
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                    size={18}
                  />
                  <input
                    type="text"
                    name="efternamn"
                    value={formData.efternamn}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                    placeholder="Ditt efternamn"
                  />
                </div>
              </div>
            </div>

            {/* Company and Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Företag *
                </label>
                <div className="relative">
                  <Building
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                    size={18}
                  />
                  <input
                    type="text"
                    name="foretag"
                    value={formData.foretag}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                    placeholder="Ert företagsnamn"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Titel/Roll
                </label>
                <input
                  type="text"
                  name="titel"
                  value={formData.titel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                  placeholder="Din titel"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  E-post *
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                    size={18}
                  />
                  <input
                    type="email"
                    name="epost"
                    value={formData.epost}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                    placeholder="din@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Telefon
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                    size={18}
                  />
                  <input
                    type="tel"
                    name="telefon"
                    value={formData.telefon}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                    placeholder="+46 XX XXX XX XX"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Typ av behov *
                </label>
                <select
                  name="typAvBehov"
                  value={formData.typAvBehov}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Välj typ</option>
                  <option value="tillsvidare">Tillsvidareanställning</option>
                  <option value="vikariat">Vikariat</option>
                  <option value="timanstallning">Timanställning</option>
                  <option value="projekt">Projektanställning</option>
                  <option value="konsult">Konsultuppdrag</option>
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Antal personer
                </label>
                <input
                  type="text"
                  name="antalPersoner"
                  value={formData.antalPersoner}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                  placeholder="t.ex. 2-3 personer"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Önskad start
                </label>
                <input
                  type="text"
                  name="onskadStart"
                  value={formData.onskadStart}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                  placeholder="t.ex. Omgående, Mars 2025"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Plats/Ort
              </label>
              <input
                type="text"
                name="plats"
                value={formData.plats}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                placeholder="Var ska arbetet utföras?"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Meddelande *
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-white/40" size={18} />
                <textarea
                  name="meddelande"
                  value={formData.meddelande}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Beskriv ert bemanningsbehov, vilka roller ni söker, specifika krav eller önskemål..."
                />
              </div>
            </div>

            {/* GDPR Consent */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="gdprAccept"
                checked={formData.gdprAccept}
                onChange={handleInputChange}
                required
                className="w-4 h-4 text-blue-600 border-white/30 rounded focus:ring-blue-500 bg-white/10 mt-1"
              />
              <label className="text-white/70 text-sm leading-relaxed">
                Jag godkänner att Workplan lagrar och behandlar mina uppgifter för att kunna återkomma med information om bemanningslösningar. Läs mer i vår </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-blue-600 text-white rounded-xl font-semibold text-lg tracking-wide hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <Send size={20} />
              <span>Skicka förfrågan</span>
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .contact-form-section {
          position: relative;
          background-color: #08132B;
          background-image: radial-gradient(circle at bottom center, rgba(255,255,255,0.1), transparent 70%);
        }
      `}</style>
    </section>
  );
};

export default ContactFormSection;

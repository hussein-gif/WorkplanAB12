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
        <div className="text-center mb-12">
          <h2
            className="text-4xl sm:text-5xl text-white font-medium mb-2"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
            }}
          >
            Börja Bemanna
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-lg">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Förnamn */}
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

              {/* Efternamn */}
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

            {/* Company & Role */}
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

            {/* Location & Message */}
            <div className="space-y-6">
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
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Meddelande *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-white/40" size={18} />
                  <textarea
                    name="meddelande"
                    value={formData.med...
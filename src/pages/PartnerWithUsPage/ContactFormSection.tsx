import React from 'react';
import { Send } from 'lucide-react';

interface ContactFormSectionProps {
  formData: any;
  handleFormSubmit: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  formData,
  handleFormSubmit,
  handleInputChange
}) => {
  return (
    <section id="kontakt-form" className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '400' }}>
            Berätta om ert bemanningsbehov
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Fyll i formuläret – vi återkommer inom 24 timmar.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label htmlFor="fornamn" className="block text-white/80 text-sm font-medium mb-2">
                Förnamn *
              </label>
              <input
                type="text"
                id="fornamn"
                name="fornamn"
                value={formData.fornamn || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-300"
                placeholder="Ditt förnamn"
              />
            </div>
            <div>
              <label htmlFor="efternamn" className="block text-white/80 text-sm font-medium mb-2">
                Efternamn *
              </label>
              <input
                type="text"
                id="efternamn"
                name="efternamn"
                value={formData.efternamn || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-300"
                placeholder="Ditt efternamn"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label htmlFor="foretag" className="block text-white/80 text-sm font-medium mb-2">
                Företag *
              </label>
              <input
                type="text"
                id="foretag"
                name="foretag"
                value={formData.foretag || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-300"
                placeholder="Företagsnamn"
              />
            </div>
            <div>
              <label htmlFor="titel" className="block text-white/80 text-sm font-medium mb-2">
                Titel/roll
              </label>
              <input
                type="text"
                id="titel"
                name="titel"
                value={formData.titel || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-300"
                placeholder="Din roll på företaget"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label htmlFor="epost" className="block text-white/80 text-sm font-medium mb-2">
                E‑post *
              </label>
              <input
                type="email"
                id="epost"
                name="epost"
                value={formData.epost || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-300"
                placeholder="din@email.com"
              />
            </div>
            <div>
              <label htmlFor="telefon" className="block text-white/80 text-sm font-medium mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                id="telefon"
                name="telefon"
                value={formData.telefon || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-300"
                placeholder="+46 XX XXX XX XX"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label htmlFor="typAvBehov" className="block text-white/80 text-sm font-medium mb-2">
                Typ av behov *
              </label>
              <select
                id="typAvBehov"
                name="typAvBehov"
                value={formData.typAvBehov || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:bg-white/15 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="" className="bg-gray-800">Välj typ av bemanning</option>
                <option value="tillsvidare" className="bg-gray-800">Tillsvidare</option>
                <option value="timanstallda" className="bg-gray-800">Timanställda & vikarier</option>
                <option value="sasongsvikariat" className="bg-gray-800">Säsongsvikariat</option>
                <option value="provanstallning" className="bg-gray-800">Provanställning</option>
              </select>
            </div>
            <div>
              <label htmlFor="antalPersoner" className="block text-white/80 text-sm font-medium mb-2">
                Antal personer / kompetenser
              </label>
              <input
                type="text"
                id="antalPersoner"
                name="antalPersoner"
                value={formData.antalPersoner || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-300"
                placeholder="T.ex. 3 truckförare, 2 orderplock"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label htmlFor="onskadStart" className="block text-white/80 text-sm font-medium mb-2">
                Önskad start / tidsram
              </label>
              <input
                type="text"
                id="onskadStart"
                name="onskadStart"
                value={formData.onskadStart || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-300"
                placeholder="T.ex. ASAP, inom 2 veckor, mars 2025"
              />
            </div>
            <div>
              <label htmlFor="plats" className="block text-white/80 text-sm font-medium mb-2">
                Plats (ort/remote)
              </label>
              <input
                type="text"
                id="plats"
                name="plats"
                value={formData.plats || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-300"
                placeholder="T.ex. Stockholm, Göteborg, Remote"
              />
            </div>
          </div>

          <div>
            <label htmlFor="meddelande" className="block text-white/80 text-sm font-medium mb-2">
              Meddelande *
            </label>
            <textarea
              id="meddelande"
              name="meddelande"
              value={formData.meddelande || ''}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-300 resize-none"
              placeholder="Beskriv ert behov kort: uppgifter, arbetstider, krav …"
            />
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="gdprAccept"
              name="gdprAccept"
              checked={formData.gdprAccept || false}
              onChange={handleInputChange}
              required
              className="w-4 h-4 mt-1 text-blue-600 border-white/20 rounded focus:ring-blue-500 focus:ring-2 bg-white/10"
            />
            <label htmlFor="gdprAccept" className="text-white/70 text-sm leading-relaxed">
              Jag godkänner att mina uppgifter lagras enligt integritetspolicyn. *
            </label>
          </div>

          <button
            type="submit"
            className="
              w-full py-4 px-6
              bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl
              font-semibold text-lg tracking-wide
              hover:from-blue-700 hover:to-purple-700
              transition-all duration-300
              shadow-lg hover:shadow-xl
              hover:scale-[1.02]
              flex items-center justify-center space-x-2
            "
          >
            <Send size={20} />
            <span>Skicka förfrågan</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactFormSection;
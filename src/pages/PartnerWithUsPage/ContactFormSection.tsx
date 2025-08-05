import React, { useState, useEffect } from 'react';
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
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
    <section id="kontakt-form" className="relative py-24 px-8 overflow-hidden">
      {/* Professional Form Background */}
      <div className="absolute inset-0">
        {/* Sophisticated gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #e5e7eb 100%)',
          }}
        />

        {/* Interactive floating elements */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full opacity-[0.02] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #3b82f6 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.25}%`,
            top: `${mousePosition.y * 0.2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[550px] h-[550px] rounded-full opacity-[0.015] blur-3xl transition-all duration-1000 delay-700"
          style={{
            background: `radial-gradient(circle, #10b981 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.2}%`,
            bottom: `${mousePosition.y * 0.25}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Refined pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(0,0,0,0.01) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(0,0,0,0.008) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 70px 70px',
          }}
        />

        {/* Subtle accent elements */}
        <div className="absolute top-24 right-32 w-2 h-2 bg-blue-200/30 rounded-full" />
        <div className="absolute bottom-32 left-24 w-1.5 h-1.5 bg-emerald-200/25 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-gray-300/30 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-normal text-slate-800 mb-4">
            Berätta Om Ert Bemanningsbehov
          </h2>
          <p className="text-slate-600">
            Fyll i formuläret – vi återkommer inom 24 timmar.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label htmlFor="fornamn" className="block text-slate-700 text-sm font-medium mb-2">
                Förnamn *
              </label>
              <input
                type="text"
                id="fornamn"
                name="fornamn"
                value={formData.fornamn || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/80 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                placeholder="Ditt förnamn"
              />
            </div>
            <div>
              <label htmlFor="efternamn" className="block text-slate-700 text-sm font-medium mb-2">
                Efternamn *
              </label>
              <input
                type="text"
                id="efternamn"
                name="efternamn"
                value={formData.efternamn || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/80 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                placeholder="Ditt efternamn"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label htmlFor="foretag" className="block text-slate-700 text-sm font-medium mb-2">
                Företag *
              </label>
              <input
                type="text"
                id="foretag"
                name="foretag"
                value={formData.foretag || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/80 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                placeholder="Företagsnamn"
              />
            </div>
            <div>
              <label htmlFor="titel" className="block text-slate-700 text-sm font-medium mb-2">
                Titel/roll
              </label>
              <input
                type="text"
                id="titel"
                name="titel"
                value={formData.titel || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/80 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                placeholder="Din roll på företaget"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label htmlFor="epost" className="block text-slate-700 text-sm font-medium mb-2">
                E-post *
              </label>
              <input
                type="email"
                id="epost"
                name="epost"
                value={formData.epost || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/80 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                placeholder="din@email.com"
              />
            </div>
            <div>
              <label htmlFor="telefon" className="block text-slate-700 text-sm font-medium mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                id="telefon"
                name="telefon"
                value={formData.telefon || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/80 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                placeholder="+46 XX XXX XX XX"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label htmlFor="typAvBehov" className="block text-slate-700 text-sm font-medium mb-2">
                Typ av behov *
              </label>
              <select
                id="typAvBehov"
                name="typAvBehov"
                value={formData.typAvBehov || ''}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/80 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="" className="bg-white">Välj typ av bemanning</option>
                <option value="tillsvidare" className="bg-white">Tillsvidare</option>
                <option value="timanstallda" className="bg-white">Timanställda & vikarier</option>
                <option value="sasongsvikariat" className="bg-white">Säsongsvikariat</option>
                <option value="provanstallning" className="bg-white">Provanställning</option>
              </select>
            </div>
            <div>
              <label htmlFor="antalPersoner" className="block text-slate-700 text-sm font-medium mb-2">
                Antal personer / kompetenser
              </label>
              <input
                type="text"
                id="antalPersoner"
                name="antalPersoner"
                value={formData.antalPersoner || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/80 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                placeholder="T.ex. 3 truckförare, 2 orderplock"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label htmlFor="onskadStart" className="block text-slate-700 text-sm font-medium mb-2">
                Önskad start / tidsram
              </label>
              <input
                type="text"
                id="onskadStart"
                name="onskadStart"
                value={formData.onskadStart || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/80 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                placeholder="T.ex. ASAP, inom 2 veckor, mars 2025"
              />
            </div>
            <div>
              <label htmlFor="plats" className="block text-slate-700 text-sm font-medium mb-2">
                Plats (ort/remote)
              </label>
              <input
                type="text"
                id="plats"
                name="plats"
                value={formData.plats || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/80 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                placeholder="T.ex. Stockholm, Göteborg, Remote"
              />
            </div>
          </div>

          <div>
            <label htmlFor="meddelande" className="block text-slate-700 text-sm font-medium mb-2">
              Meddelande *
            </label>
            <textarea
              id="meddelande"
              name="meddelande"
              value={formData.meddelande || ''}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-white/80 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 resize-none"
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
              className="w-4 h-4 mt-1 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2 bg-white"
            />
            <label htmlFor="gdprAccept" className="text-slate-600 text-sm leading-relaxed">
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
      </div>
    </section>
  );
};

export default ContactFormSection;
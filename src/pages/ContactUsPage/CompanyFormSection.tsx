import React from "react";
import { Send, X } from "lucide-react";

interface CompanyFormSectionProps {
  companyForm: {
    companyName: string;
    nameTitle: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    gdprAccept: boolean;
  };
  handleCompanySubmit: (e: React.FormEvent) => void;
  handleCompanyChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onClose: () => void; // 👈 nytt för att stänga modalen
}

const CompanyFormSection: React.FC<CompanyFormSectionProps> = ({
  companyForm,
  handleCompanySubmit,
  handleCompanyChange,
  onClose,
}) => {
  return (
    // Bakgrunds-overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Själva rutan */}
      <div
        className="
          relative w-full max-w-3xl 
          bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl
          animate-fadeIn
        "
      >
        {/* Stäng-knapp (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-gray-900 mb-2">
            Har ni en fråga? Hör av er!
          </h2>
          <p className="text-gray-600">
            Fyll i formuläret så återkommer vi så snart vi kan.
          </p>
        </div>

        <form onSubmit={handleCompanySubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Företagsnamn *
              </label>
              <input
                type="text"
                name="companyName"
                value={companyForm.companyName}
                onChange={handleCompanyChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                placeholder="Ert företagsnamn"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Ditt namn & titel *
              </label>
              <input
                type="text"
                name="nameTitle"
                value={companyForm.nameTitle}
                onChange={handleCompanyChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                placeholder="Anna Andersson, HR-chef"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                E-post *
              </label>
              <input
                type="email"
                name="email"
                value={companyForm.email}
                onChange={handleCompanyChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                placeholder="din@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                value={companyForm.phone}
                onChange={handleCompanyChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                placeholder="+46 XX XXX XX XX"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Ämne *
            </label>
            <select
              name="subject"
              value={companyForm.subject || ""}
              onChange={handleCompanyChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="">Välj ämne</option>
              <option value="pris-villkor">Pris & villkor</option>
              <option value="tillgangliga-konsulter">
                Tillgängliga konsulter
              </option>
              <option value="processen">Hur processen fungerar</option>
              <option value="avtal-juridik">Avtal & juridik</option>
              <option value="annat">Annat</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Meddelande *
            </label>
            <textarea
              name="message"
              value={companyForm.message}
              onChange={handleCompanyChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 resize-none"
              placeholder="Ställ din fråga eller beskriv kort vad du vill veta …"
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="gdprAccept"
              checked={companyForm.gdprAccept || false}
              onChange={handleCompanyChange}
              required
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label className="text-gray-700 text-sm">
              Jag godkänner att Workplan lagrar mina uppgifter enligt{" "}
              <a
                href="/privacy"
                className="text-emerald-600 hover:text-emerald-700 underline focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 rounded"
                target="_blank"
                rel="noopener noreferrer"
              >
                GDPR
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            className="
              w-full py-4 px-6
              bg-emerald-600 text-white rounded-xl
              font-semibold text-lg tracking-wide
              hover:bg-emerald-700
              transition-all duration-300
              shadow-lg hover:shadow-xl
              hover:scale-[1.02]
              flex items-center justify-center space-x-2
            "
          >
            <Send size={20} />
            <span>Skicka meddelande</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyFormSection;

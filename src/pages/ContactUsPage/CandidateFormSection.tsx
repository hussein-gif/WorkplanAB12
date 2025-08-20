import React, { useEffect, useRef } from 'react';
import { Send, X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface CandidateFormSectionProps {
  userType: 'candidate' | 'company' | null;
  candidateForm: {
    name: string;
    email: string;
    phone: string;
    message: string;
    gdprConsent: boolean;
  };
  handleCandidateSubmit: (e: React.FormEvent) => void;
  handleCandidateChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClose: () => void;
}

const CandidateFormSection: React.FC<CandidateFormSectionProps> = ({
  candidateForm,
  handleCandidateSubmit,
  handleCandidateChange,
  onClose,
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  // scroll lock
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Overlay: mörk + väldigt mild blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-0" />

      {/* Modal container – storlek & scroll hanteras här */}
      <section
        className="
          relative z-10 w-[min(90vw,44rem)]
          mx-4
          bg-white border border-gray-200 rounded-3xl shadow-2xl
          max-h-[85vh] overflow-y-auto
          transition-all duration-200
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header så stäng-knappen/titeln alltid syns */}
        <div
          className="
            sticky top-0 z-10
            bg-white/95 backdrop-blur supports-[backdrop-filter]:backdrop-blur
            border-b border-gray-100
            px-6 md:px-8 pt-5 pb-4
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              absolute top-3 right-3 p-2 rounded-full
              hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
              transition
            "
            aria-label="Stäng formuläret"
          >
            <X size={20} />
          </button>

          <div className="text-center pr-10"> {/* pr-10 så texten inte krockar med X-knappen */}
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-1 font-['Zen_Kaku_Gothic_Antique']">
              Har du en fråga? Hör av dig!
            </h2>
            <p className="text-gray-600 font-['Inter']">
              Fyll i formuläret så återkommer vi så snart vi kan.
            </p>
          </div>
        </div>

        {/* Body – rullar inom modalen vid behov */}
        <div className="px-6 md:px-8 py-6">
          <form onSubmit={handleCandidateSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2 font-['Zen_Kaku_Gothic_Antique']">
                  Namn *
                </label>
                <input
                  ref={firstFieldRef}
                  type="text"
                  name="name"
                  value={candidateForm.name}
                  onChange={handleCandidateChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                  placeholder="Ditt namn"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2 font-['Zen_Kaku_Gothic_Antique']">
                  E-post *
                </label>
                <input
                  type="email"
                  name="email"
                  value={candidateForm.email}
                  onChange={handleCandidateChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                  placeholder="din@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2 font-['Zen_Kaku_Gothic_Antique']">
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                value={candidateForm.phone}
                onChange={handleCandidateChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                placeholder="+46 XX XXX XX XX"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2 font-['Zen_Kaku_Gothic_Antique']">
                Meddelande *
              </label>
              <textarea
                name="message"
                value={candidateForm.message}
                onChange={handleCandidateChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 resize-none"
                placeholder="Beskriv gärna din fråga eller ditt behov …"
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="gdprConsent"
                checked={candidateForm.gdprConsent}
                onChange={handleCandidateChange}
                required
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-gray-700 text-sm font-['Inter']">
                Jag godkänner att Workplan lagrar mina uppgifter enligt{' '}
                <a
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
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
                bg-blue-600 text-white rounded-2xl
                font-semibold text-lg tracking-wide
                hover:bg-blue-700
                transition-all duration-300
                shadow-lg hover:shadow-xl
                hover:scale-[1.02]
                flex items-center justify-center space-x-2
                font-['Inter']
              "
            >
              <Send size={20} />
              <span>Skicka meddelande</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );

  return createPortal(modal, document.body);
};

export default CandidateFormSection;

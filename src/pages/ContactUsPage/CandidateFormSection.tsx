"use client";
import React, { useEffect, useRef } from "react";
import { Send } from "lucide-react";

interface CandidateFormSectionProps {
  userType: "candidate" | "company" | null;
  candidateForm: {
    name: string;
    email: string;
    phone: string;
    message: string;
    gdprConsent: boolean;
  };
  handleCandidateSubmit: (e: React.FormEvent) => void;
  handleCandidateChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClose?: () => void;
  loading?: boolean; // NY
}

const CandidateFormSection: React.FC<CandidateFormSectionProps> = ({
  candidateForm,
  handleCandidateSubmit,
  handleCandidateChange,
  loading = false,
}) => {
  // Smooth scroll till sektionen när den mountas
  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Fokus på första fältet
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-14 sm:py-16 px-4 sm:px-6 bg-white overflow-hidden"
      aria-labelledby="candidate-form-heading"
    >
      {/* Elegant vit bakgrund – subtila radialer + lätt grid */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full opacity-[0.08] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, #93C5FD, transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-16 w-[32rem] h-[32rem] rounded-full opacity-[0.06] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, #A7F3D0, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* Kortet */}
      <div className="relative w-[min(95vw,44rem)] mx-auto bg-white border border-gray-200 rounded-3xl shadow-2xl transition-all duration-200">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:backdrop-blur border-b border-gray-100 px-6 md:px-8 pt-5 pb-4">
          <div className="text-center">
            <h2
              id="candidate-form-heading"
              className="text-2xl md:text-3xl font-medium text-gray-900 mb-1 font-['Zen_Kaku_Gothic_Antique']"
            >
              Har du en fråga? Hör av dig!
            </h2>
            <p className="text-gray-600 font-['Inter']">
              Fyll i formuläret så återkommer vi så snart vi kan.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 md:px-8 py-6">
          <form onSubmit={handleCandidateSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2 font-['Zen_Kaku_Gothic_Antique']">
                  För & Efternamn *
                </label>
                <input
                  ref={firstFieldRef}
                  type="text"
                  name="name"
                  value={candidateForm.name}
                  onChange={handleCandidateChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                  placeholder="Anna Andersson"
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
                Jag godkänner att Workplan lagrar mina uppgifter enligt{" "}
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

            {/* Knapp */}
            <button
              type="submit"
              disabled={loading}
              className={`relative w-full py-4 px-6 text-white rounded-2xl font-semibold text-lg tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] overflow-hidden font-['Inter'] focus:outline-none focus:ring-4 focus:ring-blue-500/25 group ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.12)), linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #0B69E3 100%)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full"
                style={{ transition: "transform 700ms ease" }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Send size={20} />
                <span>{loading ? "Skickar…" : "Skicka meddelande"}</span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CandidateFormSection;

import React, { useEffect, useRef, useState } from "react";
import { Send, ChevronDown } from "lucide-react";

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
}

const SUBJECT_OPTIONS = [
  { value: "", label: "Välj ämne" },
  { value: "pris-villkor", label: "Pris & villkor" },
  { value: "tillgangliga-konsulter", label: "Tillgängliga konsulter" },
  { value: "processen", label: "Hur processen fungerar" },
  { value: "avtal-juridik", label: "Avtal & juridik" },
  { value: "annat", label: "Annat" },
];

const CompanyFormSection: React.FC<CompanyFormSectionProps> = ({
  companyForm,
  handleCompanySubmit,
  handleCompanyChange,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Smooth scroll till sektionen
  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const onDropdownKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const selectSubject = (value: string) => {
    setOpen(false);
    const synthetic = {
      target: { name: "subject", value },
    } as unknown as React.ChangeEvent<HTMLSelectElement>;
    handleCompanyChange(synthetic);
  };

  const currentLabel =
    SUBJECT_OPTIONS.find((o) => o.value === (companyForm.subject || ""))?.label ||
    "Välj ämne";

  return (
    <section
      ref={sectionRef}
      className="relative py-14 sm:py-16 px-4 sm:px-6 bg-white overflow-hidden"
      aria-labelledby="company-form-heading"
    >
      {/* Elegant vit bakgrund */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full opacity-[0.08] blur-3xl"
          style={{
            background: "radial-gradient(ellipse at center, #6EE7B7, transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-16 w-[32rem] h-[32rem] rounded-full opacity-[0.06] blur-3xl"
          style={{
            background: "radial-gradient(ellipse at center, #93C5FD, transparent 60%)",
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
      <div
        className="
          relative w-[min(95vw,46rem)] mx-auto
          bg-white border border-gray-200 rounded-3xl shadow-2xl
          transition-all duration-200
        "
      >
        {/* Header */}
        <div
          className="
            sticky top-0 z-10
            bg-white/95 backdrop-blur supports-[backdrop-filter]:backdrop-blur
            border-b border-gray-100
            px-6 md:px-8 pt-5 pb-4
          "
        >
          <div className="text-center">
            <h2
              id="company-form-heading"
              className="text-2xl md:text-3xl font-medium text-gray-900 mb-1 font-['Zen_Kaku_Gothic_Antique']"
            >
              Har ni en fråga? Hör av er!
            </h2>
            <p className="text-gray-600 font-['Inter']">
              Fyll i formuläret så återkommer vi så snart vi kan.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 md:px-8 py-6">
          <form onSubmit={handleCompanySubmit} className="space-y-6">
            {/* ... alla inputs ... */}

            {/* Mer levande knapp */}
            <button
              type="submit"
              className="
                relative w-full py-4 px-6
                text-white rounded-2xl
                font-semibold text-lg tracking-wide
                transition-all duration-300
                shadow-lg hover:shadow-xl
                hover:scale-[1.02]
                overflow-hidden
                font-['Inter']
                focus:outline-none focus:ring-4 focus:ring-emerald-500/25
                group
              "
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.12)), linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <span
                className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-r from-transparent via-white/25 to-transparent
                  -translate-x-full group-hover:translate-x-full
                "
                style={{ transition: "transform 700ms ease" }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Send size={20} />
                <span>Skicka meddelande</span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CompanyFormSection;

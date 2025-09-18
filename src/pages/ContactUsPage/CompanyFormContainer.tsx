"use client";
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

  // Smooth scroll till sektionen när den mountas
  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Stäng dropdown vid klick utanför
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
      {/* Elegant vit bakgrund – subtila radialer + lätt grid */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2 font-['Zen_Kaku_Gothic_Antique']">
                  Företagsnamn *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={companyForm.companyName}
                  onChange={handleCompanyChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                  placeholder="Ert företagsnamn"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2 font-['Zen_Kaku_Gothic_Antique']">
                  Ditt namn & titel *
                </label>
                <input
                  type="text"
                  name="nameTitle"
                  value={companyForm.nameTitle}
                  onChange={handleCompanyChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                  placeholder="Anna Andersson, HR-chef"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2 font-['Zen_Kaku_Gothic_Antique']">
                  E-post *
                </label>
                <input
                  type="email"
                  name="email"
                  value={companyForm.email}
                  onChange={handleCompanyChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                  placeholder="din@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2 font-['Zen_Kaku_Gothic_Antique']">
                  Telefon
                </label>
                <div className="flex items-center border border-gray-300 rounded-2xl focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all duration-200 px-4 py-3">
                  <span className="text-gray-700 mr-2 select-none">+46</span>
                  <span className="text-gray-300">|</span>
                  <input
                    type="tel"
                    name="phone"
                    value={companyForm.phone}
                    onChange={handleCompanyChange}
                    className="flex-1 ml-2 focus:outline-none"
                    placeholder="7XXXXXXXX"
                    pattern="7[0-9]{8}" // ser till att numret börjar med 7 och är 9 siffror totalt
                    required={false}
                  />
                </div>
              </div>
            </div>

            {/* Dropdown */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2 font-['Zen_Kaku_Gothic_Antique']">
                Ämne *
              </label>
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                  onKeyDown={onDropdownKeyDown}
                  className="
                    w-full px-4 py-3 border border-gray-300 rounded-2xl
                    focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10
                    transition-all duration-200 text-left
                    flex items-center justify-between bg-white
                  "
                >
                  <span
                    className={
                      companyForm.subject ? "text-gray-900" : "text-gray-400"
                    }
                  >
                    {currentLabel}
                  </span>
                  <ChevronDown
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                    size={18}
                  />
                </button>

                {open && (
                  <ul
                    role="listbox"
                    tabIndex={-1}
                    className="
                      absolute z-50 mt-2 w-full max-h-60 overflow-auto
                      bg-white border border-gray-200 rounded-2xl shadow-lg
                      focus:outline-none
                    "
                  >
                    {SUBJECT_OPTIONS.filter((opt) => opt.value !== "").map(
                      (opt) => (
                        <li
                          role="option"
                          aria-selected={companyForm.subject === opt.value}
                          key={opt.value}
                          onClick={() => selectSubject(opt.value)}
                          className={`
                            px-4 py-2.5 cursor-pointer transition
                            hover:bg-gray-50
                            ${
                              companyForm.subject === opt.value ? "bg-gray-50" : ""
                            }
                          `}
                        >
                          {opt.label}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2 font-['Zen_Kaku_Gothic_Antique']">
                Meddelande *
              </label>
              <textarea
                name="message"
                value={companyForm.message}
                onChange={handleCompanyChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 resize-none"
                placeholder="Ställ din fråga eller beskriv kort vad du vill veta …"
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="gdprAccept"
                checked={!!companyForm.gdprAccept}
                onChange={(e) => {
                  const checked = (e.target as HTMLInputElement).checked;
                  handleCompanyChange({
                    ...e,
                    target: {
                      ...(e.target as HTMLInputElement),
                      name: "gdprAccept",
                      value: checked as unknown as string,
                    },
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
                required
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label className="text-gray-700 text-sm font-['Inter']">
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

            {/* Knapp */}
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

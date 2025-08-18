import React, { useEffect, useRef, useState } from "react";
import { Send, X, ChevronDown } from "lucide-react";

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
  onClose: () => void;
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
  onClose,
}) => {
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
    // ⬇️ Blur + svart overlay tillbaka här
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="
          relative w-full max-w-3xl 
          bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl
          animate-fadeIn
        "
        onClick={(e) => e.stopPropagation()}
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

        <div className="text-center mb-8">
          <h2 className="text-3xl font-medium text-gray-900 mb-2 font-['Zen_Kaku_Gothic_Antique']">
            Har ni en fråga? Hör av er!
          </h2>
          <p className="text-gray-600 font-['Inter']">
            Fyll i formuläret så återkommer vi så snart vi kan.
          </p>
        </div>

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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                placeholder="din@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2 font-['Zen_Kaku_Gothic_Antique']">
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
                  w-full px-4 py-3 border border-gray-300 rounded-xl
                  focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10
                  transition-all duration-200 text-left
                  flex items-center justify-between
                  bg-white
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
                  className={`transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                  size={18}
                />
              </button>

              {open && (
                <ul
                  role="listbox"
                  tabIndex={-1}
                  className="
                    absolute z-50 mt-2 w-full max-h-60 overflow-auto
                    bg-white border border-gray-200 rounded-xl shadow-lg
                    focus:outline-none
                    animate-in fade-in-0 zoom-in-95
                  "
                >
                  {SUBJECT_OPTIONS.map((opt) => (
                    <li
                      role="option"
                      aria-selected={companyForm.subject === opt.value}
                      key={opt.value}
                      onClick={() => selectSubject(opt.value)}
                      className={`
                        px-4 py-2.5 cursor-pointer transition
                        hover:bg-gray-50
                        ${
                          companyForm.subject === opt.value
                            ? "bg-gray-50"
                            : ""
                        }
                      `}
                    >
                      {opt.label}
                    </li>
                  ))}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 resize-none"
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
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
              font-['Inter']
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

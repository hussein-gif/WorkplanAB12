import React, { useEffect, useRef, useState, memo, useCallback } from 'react';
import { Send, Building, User, Mail, Phone, MessageSquare, ChevronDown, Check } from 'lucide-react';

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

/* ---------- Smooth, professionell custom dropdown ---------- */
interface Option {
  value: string;
  label: string;
}

/** Hoista options så de inte skapas om vid varje render */
const TYP_OPTIONS: Option[] = [
  { value: '', label: 'Välj typ' },
  { value: 'tillsvidare', label: 'Tillsvidareanställning' },
  { value: 'vikariat_tim', label: 'Vikariat / Timanställd' },
  { value: 'säsongvikariat', label: 'Säsongvikariat' },
  { value: 'provanställning', label: 'Provanställning' },
];

const SmoothSelectBase: React.FC<{
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  required?: boolean;
  placeholder?: string;
}> = ({ name, value, onChange, options, required, placeholder = 'Välj' }) => {
  const [open, setOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside, { passive: true } as any);
    return () => document.removeEventListener('mousedown', onClickOutside as any);
  }, []);

  useEffect(() => {
    if (open) {
      const idx = Math.max(0, options.findIndex((o) => o.value === value));
      setHoverIndex(idx);
    }
  }, [open, options, value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (open) {
      if (e.key === 'Escape') {
        setOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHoverIndex((i) => Math.min(i + 1, options.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHoverIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const opt = options[hoverIndex];
        if (opt) {
          onChange(opt.value);
          setOpen(false);
        }
      }
    }
  };

  const handleItemEnter = useCallback((idx: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setHoverIndex(idx));
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <button
        type="button"
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300 flex items-center justify-between"
      >
        <span className={selected ? 'text-white' : 'text-white/50'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`ml-2 transition-transform ${open ? 'rotate-180' : ''} text-white/60`}
        />
      </button>

      <div
        ref={menuRef}
        className={`absolute left-0 right-0 mt-2 origin-top rounded-xl backdrop-blur-md border border-white/20 bg-[#0b1a3a]/90 shadow-2xl transition-all duration-200 ease-out z-20 ${
          open
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
        }`}
        role="listbox"
        tabIndex={-1}
        style={{ willChange: 'transform, opacity' }}
      >
        <ul className="py-1 max-h-56 overflow-auto">
          {options.map((opt, idx) => {
            const isActive = idx === hoverIndex;
            const isSelected = opt.value === value;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => handleItemEnter(idx)}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors select-none ${
                    isSelected
                      ? 'bg-white/10 text-white'
                      : isActive
                      ? 'bg-white/5 text-white'
                      : 'text-white/90'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check size={16} className="opacity-80" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Hidden input to preserve form semantics/validation */}
      <input type="hidden" name={name} value={value} required={required} />
    </div>
  );
};

const SmoothSelect = memo(SmoothSelectBase);

const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  formData,
  handleFormSubmit,
  handleInputChange,
}) => {
  const safeFormData = formData || {
    fornamn: '',
    efternamn: '',
    foretag: '',
    titel: '',
    epost: '',
    telefon: '',
    typAvBehov: '',
    antalPersoner: '',
    onskadStart: '',
    plats: '',
    meddelande: '',
    gdprAccept: false,
  };

  /** Minimera nya funktionsobjekt vid värdeändring i selecten */
  const onTypChange = useCallback(
    (val: string) => {
      const event = {
        target: { name: 'typAvBehov', value: val },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;
      handleInputChange(event);
    },
    [handleInputChange]
  );

  return (
    <section
      id="kontakt-form"
      className="contact-form-section relative"
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '1px 1200px',
      }}
    >
      {/* Wave uppe (dekorativ) */}
      <div
        className="absolute top-0 left-0 w-full h-20 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z" fill="#08132B" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-24 px-8" style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}>
        <h2
          className="text-4xl sm:text-5xl text-white font-medium text-center mb-8"
          style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
        >
          Börja Bemanna
        </h2>

        <div
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-lg"
          style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 680px' }}
        >
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Förnamn *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} aria-hidden="true" />
                  <input
                    type="text"
                    name="fornamn"
                    value={safeFormData.fornamn}
                    onChange={handleInputChange}
                    required
                    autoComplete="given-name"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                    placeholder="Ditt förnamn"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Efternamn *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} aria-hidden="true" />
                  <input
                    type="text"
                    name="efternamn"
                    value={safeFormData.efternamn}
                    onChange={handleInputChange}
                    required
                    autoComplete="family-name"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                    placeholder="Ditt efternamn"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Företag *</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} aria-hidden="true" />
                  <input
                    type="text"
                    name="foretag"
                    value={safeFormData.foretag}
                    onChange={handleInputChange}
                    required
                    autoComplete="organization"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                    placeholder="Ert företagsnamn"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Titel/Roll</label>
                <input
                  type="text"
                  name="titel"
                  value={safeFormData.titel}
                  onChange={handleInputChange}
                  autoComplete="organization-title"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                  placeholder="Din titel"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">E-post *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} aria-hidden="true" />
                  <input
                    type="email"
                    name="epost"
                    value={safeFormData.epost}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                    placeholder="din@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Telefon</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} aria-hidden="true" />
                  <input
                    type="tel"
                    name="telefon"
                    value={safeFormData.telefon}
                    onChange={handleInputChange}
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="^[0-9+()\\s-]*$"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                    placeholder="+46 XX XXX XX XX"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Typ av behov *</label>
                <SmoothSelect
                  name="typAvBehov"
                  value={safeFormData.typAvBehov}
                  required
                  placeholder="Välj typ"
                  options={TYP_OPTIONS}
                  onChange={onTypChange}
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Antal personer</label>
                <input
                  type="text"
                  name="antalPersoner"
                  value={safeFormData.antalPersoner}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                  placeholder="t.ex. 2-3 personer"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Önskad start</label>
                <input
                  type="text"
                  name="onskadStart"
                  value={safeFormData.onskadStart}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                  placeholder="t.ex. Omgående, Mars 2025"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Plats/Ort</label>
                <input
                  type="text"
                  name="plats"
                  value={safeFormData.plats}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                  placeholder="Var ska arbetet utföras?"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Meddelande *</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-white/40" size={18} aria-hidden="true" />
                  <textarea
                    name="meddelande"
                    value={safeFormData.meddelande}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Beskriv ert bemanningsbehov..."
                  />
                </div>
              </div>
            </div>

            {/* ----- Åtgärder + GDPR ----- */}
            <div className="pt-2 md:pt-4 space-y-4">
              {/* MOBIL */}
              <div className="block md:hidden">
                <label className="flex items-start gap-3 mb-3">
                  <input
                    type="checkbox"
                    name="gdprAccept"
                    checked={safeFormData.gdprAccept}
                    onChange={handleInputChange}
                    required
                    className="mt-0.5 w-4 h-4 text-blue-600 border-white/30 rounded focus:ring-blue-500 bg-white/10"
                  />
                  <span className="text-white/70 text-xs leading-relaxed">
                    Jag godkänner att Workplan lagrar och behandlar mina uppgifter för att
                    kunna återkomma med information om bemanningslösningar.
                  </span>
                </label>
                <button
                  type="submit"
                  className="btn-min group inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-xl text-white text-base tracking-wide transition-all duration-200"
                >
                  <Send size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  <span
                    style={{
                      fontFamily:
                        'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
                      fontWeight: 500,
                    }}
                  >
                    Skicka
                  </span>
                </button>
              </div>

              {/* DESKTOP */}
              <div className="hidden md:flex md:items-center md:justify-between md:gap-6">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="gdprAccept"
                    checked={safeFormData.gdprAccept}
                    onChange={handleInputChange}
                    required
                    className="mt-0.5 w-4 h-4 text-blue-600 border-white/30 rounded focus:ring-blue-500 bg-white/10"
                  />
                  <span className="text-white/70 text-sm leading-relaxed">
                    Jag godkänner att Workplan lagrar och behandlar mina uppgifter för att
                    kunna återkomma med information om bemanningslösningar.
                  </span>
                </label>

                <button
                  type="submit"
                  className="btn-min group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white text-base tracking-wide transition-all duration-200"
                >
                  <Send size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  <span
                    style={{
                      fontFamily:
                        'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
                      fontWeight: 500,
                    }}
                  >
                    Skicka
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        .contact-form-section {
          position: relative;
          overflow: hidden;
          background-color: #08132B;
        }

        /* Glow-gradient i botten (ellipse at bottom center) */
        .contact-form-section::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 120%;
          height: 220px;
          background: radial-gradient(
            ellipse at bottom center,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0) 75%
          );
          pointer-events: none;
          z-index: 0;
        }

        :root { --btn-radius: 1rem; }

        /* Minimal pro button */
        .btn-min {
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.12)), #189A4C;
          border-radius: 0.75rem;
          box-shadow: 0 8px 20px rgba(24, 154, 76, 0.28);
        }
        .btn-min:hover {
          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.14)), #1FB259;
          box-shadow: 0 10px 28px rgba(24, 154, 76, 0.35);
        }
        .btn-min:active {
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.25), 0 6px 18px rgba(24, 154, 76, 0.24);
        }
        .btn-min:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(52, 211, 153, .35), 0 0 0 1px rgba(255,255,255,.2) inset;
        }
      `}</style>
    </section>
  );
};

export default ContactFormSection;

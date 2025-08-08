import React, { useEffect, useRef, useState } from 'react';
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

// --- Smooth, professionell custom dropdown ---
interface Option {
  value: string;
  label: string;
}

const SmoothSelect: React.FC<{
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
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    if (open) {
      const idx = Math.max(
        0,
        options.findIndex((o) => o.value === value)
      );
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
                  onMouseEnter={() => setHoverIndex(idx)}
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

const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  formData,
  handleFormSubmit,
  handleInputChange,
}) => {
  // Defensive handling för undefined formData
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

  const typOptions: Option[] = [
    { value: '', label: 'Välj typ' },
    { value: 'tillsvidare', label: 'Tillsvidareanställning' },
    { value: 'vikariat_tim', label: 'Vikariat / Timanställd' },
    { value: 'säsongvikariat', label: 'Säsongvikariat' },
    { value: 'provanställning', label: 'Provanställning' },
  ];

  return (
    <section id="kontakt-form" className="contact-form-section relative">
      {/* Wave uppe */}
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
        <h2
          className="text-4xl sm:text-5xl text-white font-medium text-center mb-8"
          style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
        >
          Börja Bemanna
        </h2>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-lg">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    value={safeFormData.fornamn}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                    placeholder="Ditt förnamn"
                  />
                </div>
              </div>
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
                    value={safeFormData.efternamn}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                    placeholder="Ditt efternamn"
                  />
                </div>
              </div>
            </div>

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
                    value={safeFormData.foretag}
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
                  value={safeFormData.titel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                  placeholder="Din titel"
                />
              </div>
            </div>

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
                    value={safeFormData.epost}
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
                    value={safeFormData.telefon}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                    placeholder="+46 XX XXX XX XX"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Typ av behov *
                </label>
                {/* --- Replaced native <select> with SmoothSelect --- */}
                <SmoothSelect
                  name="typAvBehov"
                  value={safeFormData.typAvBehov}
                  required
                  placeholder="Välj typ"
                  options={typOptions}
                  onChange={(val) => {
                    const event = {
                      target: { name: 'typAvBehov', value: val },
                    } as unknown as React.ChangeEvent<HTMLSelectElement>;
                    handleInputChange(event);
                  }}
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Antal personer
                </label>
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
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Önskad start
                </label>
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
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Plats/Ort
                </label>
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
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Meddelande *
                </label>
                <div className="relative">
                  <MessageSquare
                    className="absolute left-4 top-4 text-white/40"
                    size={18}
                  />
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

            <div className="flex items-center justify-between pt-4">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="gdprAccept"
                  checked={safeFormData.gdprAccept}
                  onChange={handleInputChange}
                  required
                  className="w-4 h-4 text-blue-600 border-white/30 rounded focus:ring-blue-500 bg-white/10 mt-1"
                />
                <span
                  className="text-white/70 text-sm leading-relaxed"
                  style={{ maxWidth: '80%' }}
                >
                  Jag godkänner att Workplan lagrar och behandlar mina uppgifter för att kunna återkomma med information om bemanningslösningar.
                </span>
              </label>
              <button
                type="submit"
                className="btn-min group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-base tracking-wide transition-all duration-200"
              >
                <Send size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                <span
                  style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif', fontWeight: 500 }}
                >
                  Skicka
                </span>
              </button>
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

        /* Glow-gradient i botten, nu vänd 180° (ellipse at bottom center) */
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
        
        /* Inter för knapptypsnitt */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        /* Subtila effekter för den nya knappen */
        :root { --btn-radius: 1rem; }
        .btn-pro:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(59,130,246,.35), 0 0 0 1px rgba(255,255,255,.2) inset; }

        /* Shimmer / sheen vid hover */
        @keyframes btnShine {
          0% { transform: translateX(-130%); }
          100% { transform: translateX(130%); }
        }
        .btn-sheen { position:absolute; inset: 1px; border-radius: var(--btn-radius); background: linear-gradient(110deg, transparent, rgba(255,255,255,0.16), transparent); transform: translateX(-130%); }
        .btn-pro:hover .btn-sheen { animation: btnShine 1.1s ease-out; }
        
        /* Minimal pro button – enkel, ren design */
        .btn-min {
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.12)), #167E9B; /* teal base */
          border-radius: 0.75rem; /* matchar rounded-xl */
          box-shadow: 0 8px 20px rgba(22, 126, 155, 0.30);
        }
        .btn-min:hover {
          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.14)), #1F95AD; /* hover teal */
          box-shadow: 0 10px 28px rgba(22, 126, 155, 0.36);
        }
        .btn-min:active {
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.25), 0 6px 18px rgba(22, 126, 155, 0.26);
        }
        .btn-min:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(34, 197, 244, .35), 0 0 0 1px rgba(255,255,255,.2) inset; /* cyan-ish focus som passar temat */
        }
      `}</style>
    </section>
  );
};

export default ContactFormSection;

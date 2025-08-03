import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { Search, MapPin, Building, Clock, X, ChevronDown } from 'lucide-react';

interface JobsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  selectedOmfattning: string;
  setSelectedOmfattning: (omfattning: string) => void;
  locations: string[];
  industries: string[];
  omfattningar: string[];
  clearFilters: () => void;
}

interface DropdownSelectProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  placeholder?: string;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label,
  value,
  onChange,
  options,
  icon: Icon,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [maxHeight, setMaxHeight] = useState(280);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [panelPos, setPanelPos] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleEsc);
    window.addEventListener('resize', () => setOpen(false));
    return () => {
      window.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('resize', () => setOpen(false));
    };
  }, []);

  useLayoutEffect(() => {
    if (!open || !buttonRef.current) {
      setPanelPos(null);
      return;
    }
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const shouldOpenUp = spaceBelow < 200 && spaceAbove > spaceBelow;
    setOpenUpward(shouldOpenUp);
    const computedMax = shouldOpenUp
      ? Math.min(280, spaceAbove - 10)
      : Math.min(280, spaceBelow - 10);
    setMaxHeight(computedMax);
    setPanelPos({
      left: rect.left,
      width: rect.width,
      top: shouldOpenUp ? undefined : rect.bottom + 6,
      bottom: shouldOpenUp ? window.innerHeight - rect.top + 6 : undefined,
    });
  }, [open]);

  const panel = open && panelPos
    ? ReactDOM.createPortal(
        <div
          role="listbox"
          aria-label={label}
          className="bg-[#1f2a48] border border-white/20 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 overflow-auto text-sm"
          style={{
            position: 'fixed',
            left: panelPos.left,
            width: panelPos.width,
            top: panelPos.top,
            bottom: panelPos.bottom,
            maxHeight: `${maxHeight}px`,
            zIndex: 10000,
            transformOrigin: openUpward ? 'bottom' : 'top',
            transition: 'opacity .15s ease, transform .15s ease',
          } as React.CSSProperties}
        >
          {options.length > 0 ? (
            options.map((opt) => (
              <div
                key={opt}
                role="option"
                aria-selected={value === opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`
                  px-4 py-2 flex items-center justify-between cursor-pointer truncate
                  ${value === opt ? 'bg-white/10 font-medium' : 'hover:bg-white/10'}
                  text-white
                `}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span>{opt}</span>
                {value === opt && (
                  <span className="text-indigo-300" aria-hidden="true">
                    ✓
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
              Inga alternativ
            </div>
          )}
        </div>,
        document.body
      )
    : null;

  return (
    <div className="relative" ref={(el) => (wrapperRef.current = el)}>
      <label
        className="block text-white/80 text-sm mb-2"
        style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 400 }}
      >
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          ref={(el) => (buttonRef.current = el)}
          className="w-full flex items-center justify-between pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm cursor-pointer appearance-none focus:bg-white/15 focus:border-white/40 transition-all duration-200 relative"
        >
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon size={16} className="text-white/40" />
          </div>
          <span
            className="truncate text-left"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: value ? 500 : 400 }}
          >
            {value || placeholder || `Alla ${label.toLowerCase()}`}
          </span>
          <div className="ml-2 flex items-center">
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'} text-white/60`}
            />
          </div>
        </button>
        {panel}
      </div>
    </div>
  );
};

const JobsFilters: React.FC<JobsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedLocation,
  setSelectedLocation,
  selectedIndustry,
  setSelectedIndustry,
  selectedOmfattning,
  setSelectedOmfattning,
  locations,
  industries,
  omfattningar,
  clearFilters,
}) => {
  const anyFilterActive =
    !!selectedLocation || !!selectedIndustry || !!selectedOmfattning || !!searchTerm;

  return (
    <div className="px-8 mb-12">
      <div className="max-w-7xl mx-auto">
        {/* Filterpanel med dropdowns + valda filter inline */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            <div className="lg:col-span-2">
              <DropdownSelect
                label="Plats"
                value={selectedLocation}
                onChange={setSelectedLocation}
                options={locations}
                icon={MapPin}
                placeholder="Alla platser"
              />
            </div>
            <div className="lg:col-span-2">
              <DropdownSelect
                label="Bransch"
                value={selectedIndustry}
                onChange={setSelectedIndustry}
                options={industries}
                icon={Building}
                placeholder="Alla branscher"
              />
            </div>
            <div className="lg:col-span-2">
              <DropdownSelect
                label="Omfattning"
                value={selectedOmfattning}
                onChange={setSelectedOmfattning}
                options={omfattningar}
                icon={Clock}
                placeholder="Alla omfattningar"
              />
            </div>
            <div className="lg:col-span-5">
              <label
                className="block text-white/80 text-sm mb-2"
                style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 400 }}
              >
                Sök
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  type="text"
                  placeholder="Sök efter tjänster, företag, färdigheter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>
            <div className="lg:col-span-1 flex items-center" />
          </div>

          {anyFilterActive && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span
                className="text-white/70 text-sm font-medium"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Valda filter:
              </span>

              {selectedLocation && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm">
                  <span>{selectedLocation}</span>
                  <button
                    aria-label="Rensa plats"
                    onClick={() => setSelectedLocation('')}
                    className="p-1 rounded-full hover:bg-white/10"
                  >
                    <X size={12} className="text-white/70" />
                  </button>
                </div>
              )}
              {selectedIndustry && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-200 rounded-full text-sm">
                  <span>{selectedIndustry}</span>
                  <button
                    aria-label="Rensa bransch"
                    onClick={() => setSelectedIndustry('')}
                    className="p-1 rounded-full hover:bg-white/10"
                  >
                    <X size={12} className="text-white/70" />
                  </button>
                </div>
              )}
              {selectedOmfattning && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm">
                  <span>{selectedOmfattning}</span>
                  <button
                    aria-label="Rensa omfattning"
                    onClick={() => setSelectedOmfattning('')}
                    className="p-1 rounded-full hover:bg-white/10"
                  >
                    <X size={12} className="text-white/70" />
                  </button>
                </div>
              )}
              {searchTerm && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-700/40 text-white/80 rounded-full text-sm">
                  <span>Sök: {searchTerm}</span>
                  <button
                    aria-label="Rensa sök"
                    onClick={() => setSearchTerm('')}
                    className="p-1 rounded-full hover:bg-white/10"
                  >
                    <X size={12} className="text-white/70" />
                  </button>
                </div>
              )}

              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 text-white rounded-full px-3 py-1 transition"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                <X size={14} />
                <span>Rensa alla</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsFilters;

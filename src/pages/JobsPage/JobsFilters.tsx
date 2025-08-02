import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [panelStyle, setPanelStyle] = useState<Partial<CSSStyleDeclaration>>({});

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
    return () => {
      window.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  useLayoutEffect(() => {
    if (!open || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - 8;
    const spaceAbove = rect.top - 8;
    const maxPanelHeight = 280;
    const openUpward = spaceBelow < 200 && spaceAbove > spaceBelow;
    const computedMaxHeight = openUpward
      ? Math.min(maxPanelHeight, spaceAbove)
      : Math.min(maxPanelHeight, spaceBelow);
    const style: any = {
      left: rect.left + 'px',
      width: rect.width + 'px',
      maxHeight: `${computedMaxHeight}px`,
      position: 'fixed',
      zIndex: 9999,
      overflow: 'auto',
      transition: 'transform 0.2s ease, opacity 0.2s ease',
      transformOrigin: openUpward ? 'bottom' : 'top',
    };
    if (openUpward) {
      style.bottom = `${window.innerHeight - rect.top + 4}px`;
    } else {
      style.top = `${rect.bottom + 4}px`;
    }
    setPanelStyle(style);
  }, [open]);

  return (
    <div className="relative" ref={(el) => (wrapperRef.current = el)}>
      <label
        className="block text-white/80 text-sm mb-2"
        style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '400' }}
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
          className={`
            w-full flex items-center justify-between
            pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl
            text-white text-sm appearance-none cursor-pointer
            focus:bg-white/15 focus:border-white/40 transition-all duration-300
            relative
          `}
        >
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon size={16} className="text-white/40" />
          </div>
          <span
            className="truncate text-left"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: value ? 500 : 400,
            }}
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

        {/* Panel via portal */}
        {open && (
          <div
            role="listbox"
            aria-label={label}
            className="bg-[#1f2a48] border border-white/20 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5"
            style={{
              ...panelStyle,
              display: 'block',
              backgroundClip: 'padding-box',
            } as any}
          >
            {options.map((opt) => (
              <div
                key={opt}
                role="option"
                aria-selected={value === opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`
                  px-4 py-2 flex items-center justify-between text-sm cursor-pointer
                  ${value === opt ? 'bg-white/10 font-medium' : 'hover:bg-white/10'}
                  text-white truncate
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
            ))}
            {options.length === 0 && (
              <div className="px-4 py-2 text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                Inga alternativ
              </div>
            )}
          </div>
        )}
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
  clearFilters
}) => {
  return (
    <div className="px-8 mb-12">
      <div className="max-w-7xl mx-auto">
        {/* Inline Search and Filters */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            {/* Location Filter */}
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

            {/* Industry Filter */}
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

            {/* Omfattning Filter */}
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

            {/* Search Bar */}
            <div className="lg:col-span-5">
              <label className="block text-white/80 text-sm mb-2" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '400' }}>
                Sök
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  type="text"
                  placeholder="Sök efter tjänster, företag, färdigheter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="lg:col-span-1 flex items-center">
              {/* Placeholder space if needed; moved clear into active filters area */}
            </div>
          </div>

          {/* Active Filters Indicator */}
          {(selectedLocation || selectedIndustry || selectedOmfattning || searchTerm) && (
            <div className="mt-4">
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Aktiva filter:</span>
                {selectedLocation && (
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>
                    {selectedLocation}
                  </span>
                )}
                {selectedIndustry && (
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>
                    {selectedIndustry}
                  </span>
                )}
                {selectedOmfattning && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>
                    {selectedOmfattning}
                  </span>
                )}
                
                {/* Clear All Button positioned right after filter tags */}
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-1 px-3 py-1 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 group text-sm ml-2"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}
                  title="Rensa alla filter"
                >
                  <X size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                  <span>Rensa alla</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsFilters;

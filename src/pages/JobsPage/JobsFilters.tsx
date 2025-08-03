import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Search, MapPin, Building, Clock, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // om du använder navigation

// Typdefinition för ett jobb
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  omfattning: string;
  industry: string;
  posted: string;
  companyLogo: string;
}

// Dropdown-komponent
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
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [panelPos, setPanelPos] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    width: number;
  } | null>(null);

  // stäng om man klickar utanför eller trycker escape
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

  // beräkna position för panelen (flip om det saknas plats)
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
            zIndex: 5000, // högre än jobbkort
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
          onClick={() => setOpen(o => !o)}
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

// Filters-komponenten
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

          {/* valda filter inline */}
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

// Enkel lista som visar filtrerade jobb
const JobsList: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
  if (jobs.length === 0) {
    return <div className="px-8 py-12 text-center text-white/80">Inga jobb matchar filtren.</div>;
  }
  return (
    <div className="px-8 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white/95 rounded-2xl p-5 flex flex-col shadow-lg border border-white/20"
        >
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-bold text-lg">
              {job.companyLogo}
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="text-lg mb-1 font-medium"
                style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
              >
                {job.title}
              </h3>
              <div style={{ fontFamily: 'Inter, sans-serif' }}>{job.company}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-gray-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-gray-500" />
              <span>{job.omfattning}</span>
            </div>
            <div className="flex items-center gap-1">
              <Building size={14} className="text-gray-500" />
              <span>{job.industry}</span>
            </div>
          </div>
          <div className="mt-auto flex justify-between text-sm text-gray-600">
            <div>{job.posted}</div>
            <div>Apply by {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE')}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Huvudsida som binder ihop allt
const JobsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedOmfattning, setSelectedOmfattning] = useState('');

  const allJobs: Job[] = useMemo(
    () => [
      {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'TechFlow',
        location: 'Stockholm',
        omfattning: 'Heltid',
        industry: 'Tech',
        posted: '2 dagar sedan',
        companyLogo: 'T',
      },
      {
        id: '2',
        title: 'Marketing Manager',
        company: 'GrowthCo',
        location: 'Göteborg',
        omfattning: 'Heltid',
        industry: 'Marketing',
        posted: '1 dag sedan',
        companyLogo: 'G',
      },
      {
        id: '3',
        title: 'UX Designer',
        company: 'DesignStudio',
        location: 'Remote',
        omfattning: 'Konsult',
        industry: 'Design',
        posted: '3 timmar sedan',
        companyLogo: 'D',
      },
    ],
    []
  );

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedIndustry('');
    setSelectedOmfattning('');
  };

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      if (selectedLocation && job.location !== selectedLocation) return false;
      if (selectedIndustry && job.industry !== selectedIndustry) return false;
      if (selectedOmfattning && job.omfattning !== selectedOmfattning) return false;
      if (searchTerm) {
        const lc = searchTerm.toLowerCase();
        if (!job.title.toLowerCase().includes(lc) && !job.company.toLowerCase().includes(lc)) {
          return false;
        }
      }
      return true;
    });
  }, [selectedLocation, selectedIndustry, selectedOmfattning, searchTerm, allJobs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white">
      <div className="pt-16">
        <JobsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          selectedOmfattning={selectedOmfattning}
          setSelectedOmfattning={setSelectedOmfattning}
          locations={['Stockholm', 'Göteborg', 'Remote']}
          industries={['Tech', 'Design', 'Marketing']}
          omfattningar={['Heltid', 'Deltid', 'Konsult']}
          clearFilters={clearFilters}
        />
        <div className="px-8 mb-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-medium mb-2">Hitta Din Nästa Roll</h2>
            <p className="text-white/70">{filteredJobs.length} aktiva tjänster</p>
          </div>
        </div>
        <JobsList jobs={filteredJobs} />
      </div>
    </div>
  );
};

export default JobsPage;

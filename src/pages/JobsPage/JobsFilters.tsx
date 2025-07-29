import React from 'react';
import { Search, MapPin, Building, Clock, X } from 'lucide-react';

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
  clearFilters
}) => {
  const hasActiveFilters = selectedLocation || selectedIndustry || selectedOmfattning || searchTerm;

  return (
    <div className="px-8 mb-12">
      <div className="max-w-7xl mx-auto">
        {/* Inline Search and Filters */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            {/* Location Filter */}
            <div className="lg:col-span-2">
              <label className="block text-white/80 text-sm mb-2" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '400' }}>
                Plats
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm appearance-none cursor-pointer focus:bg-white/15 focus:border-white/40 transition-all duration-300"
                >
                  <option value="">Alla platser</option>
                  {locations.map(location => (
                    <option key={location} value={location} className="bg-gray-800">
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Industry Filter */}
            <div className="lg:col-span-2">
              <label className="block text-white/80 text-sm mb-2" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '400' }}>
                Bransch
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm appearance-none cursor-pointer focus:bg-white/15 focus:border-white/40 transition-all duration-300"
                >
                  <option value="">Alla branscher</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry} className="bg-gray-800">
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Omfattning Filter */}
            <div className="lg:col-span-2">
              <label className="block text-white/80 text-sm mb-2" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '400' }}>
                Omfattning
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                <select
                  value={selectedOmfattning}
                  onChange={(e) => setSelectedOmfattning(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm appearance-none cursor-pointer focus:bg-white/15 focus:border-white/40 transition-all duration-300"
                >
                  <option value="">Alla omfattningar</option>
                  {omfattningar.map(omfattning => (
                    <option key={omfattning} value={omfattning} className="bg-gray-800">
                      {omfattning}
                    </option>
                  ))}
                </select>
              </div>
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
                />
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="lg:col-span-1">
              {/* Empty space where clear button was */}
            </div>
          </div>

          {/* Active Filters Indicator */}
          {(selectedLocation || selectedIndustry || selectedOmfattning) && (
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
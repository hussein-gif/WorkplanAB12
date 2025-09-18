import React from 'react';
import { Search, MapPin, Building, X, Sparkles } from 'lucide-react';

interface JobSearchPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const JobSearchPanel: React.FC<JobSearchPanelProps> = ({ isVisible, onClose }) => {
  const handleJobSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job search submitted');
  };

  return (
    <div
      className={`
        fixed inset-0 z-50
        flex items-center justify-center p-4
        transition-all duration-700
        ${isVisible 
          ? 'opacity-100 pointer-events-auto backdrop-blur-md' 
          : 'opacity-0 pointer-events-none'}
      `}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`
          relative w-full max-w-lg
          bg-white/95 backdrop-blur-xl
          border border-white/20 rounded-3xl
          shadow-2xl
          transition-all duration-700 transform
          ${isVisible 
            ? 'translate-y-0 scale-100 opacity-100' 
            : 'translate-y-8 scale-95 opacity-0'}
        `}
      >
        {/* Header */}
        <div className="relative p-8 pb-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="
              absolute top-6 right-6 p-2
              text-gray-400 hover:text-gray-600
              hover:bg-gray-100 rounded-full
              transition-all duration-200
            "
          >
            <X size={20} />
          </button>

          {/* Title */}
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <h3
              className="text-2xl text-gray-900"
              style={{
                fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                fontWeight: 400,
              }}
            >
              Utvalda Möjligheter
            </h3>
          </div>
          
          <p
            className="text-gray-600"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
            }}
          >
            Discover opportunities that match your ambitions
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleJobSearch} className="px-8 pb-8 space-y-6">
          {/* Location Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="relative group">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Where do you want to work?"
                className="
                  w-full pl-12 pr-4 py-4
                  bg-gray-50 border border-gray-200 rounded-xl
                  focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                  transition-all duration-200
                  placeholder-gray-400
                  text-gray-900
                "
              />
            </div>
          </div>

          {/* Category Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Industry
            </label>
            <div className="relative group">
              <Building
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />
              <select className="
                w-full pl-12 pr-4 py-4
                bg-gray-50 border border-gray-200 rounded-xl
                focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                transition-all duration-200
                text-gray-900
                appearance-none cursor-pointer
              ">
                <option>All Industries</option>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Marketing</option>
                <option>Engineering</option>
                <option>Design</option>
              </select>
            </div>
          </div>

          {/* Search Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Keywords
            </label>
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Job title, skills, company..."
                className="
                  w-full pl-12 pr-4 py-4
                  bg-gray-50 border border-gray-200 rounded-xl
                  focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                  transition-all duration-200
                  placeholder-gray-400
                  text-gray-900
                "
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="
              w-full py-4 px-6
              bg-gradient-to-r from-blue-600 to-purple-600
              text-white font-semibold rounded-xl
              hover:from-blue-700 hover:to-purple-700
              focus:ring-4 focus:ring-blue-500/20
              transition-all duration-200
              shadow-lg hover:shadow-xl
              hover:scale-[1.02]
              active:scale-[0.98]
            "
          >
            Search Opportunities
          </button>
        </form>

        {/* Footer (uppdaterad enligt önskemål) */}
        <div className="px-8 pb-8 pt-4 border-t border-gray-100">
          <p className="text-center text-sm text-gray-600">
            Inga lediga jobb tillgängliga just nu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobSearchPanel;

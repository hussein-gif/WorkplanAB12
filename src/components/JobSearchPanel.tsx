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

        {/* Innehåll – visar endast meddelande (inga jobb) */}
        <div className="px-8 pb-8">
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search size={20} className="text-gray-400" />
            </div>
            <h4 className="text-gray-800 text-base text-center">
              Inga lediga jobb tillgängliga just nu.
            </h4>
          </div>
        </div>

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

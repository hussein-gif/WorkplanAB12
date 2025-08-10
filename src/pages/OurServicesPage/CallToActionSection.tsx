import React from 'react';
import { useNavigate } from 'react-router-dom';

const CallToActionSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-8 bg-gradient-to-r from-gray-900 to-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-light text-white mb-12 leading-tight">
          Redo att stärka ert team?
        </h2>
        
        <button
          onClick={() => {
            const element = document.getElementById('kontakt-form');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigate('/contact');
            }
          }}
          className="
            group relative px-10 py-4 
            bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl
            font-semibold text-lg tracking-wide
            hover:from-blue-700 hover:to-purple-700
            transition-all duration-300
            shadow-lg hover:shadow-xl
            hover:scale-105
            overflow-hidden
            min-w-[200px]
          "
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          
          <span className="relative z-10">Kontakta oss</span>
        </button>
      </div>
    </section>
  );
};

export default CallToActionSection;
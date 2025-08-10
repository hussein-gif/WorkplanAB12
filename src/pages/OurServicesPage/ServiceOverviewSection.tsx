import React from 'react';
import { Users } from 'lucide-react';

interface ServiceOverviewSectionProps {
  isVisible: boolean;
}

const ServiceOverviewSection: React.FC<ServiceOverviewSectionProps> = ({
  isVisible,
}) => {
  return (
    <section className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <div className={`
          group bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-lg
          hover:shadow-xl transition-all duration-500
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}
        style={{ transitionDelay: '600ms' }}
        >
          {/* Hover Gradient Background */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-105 transition-transform duration-500 opacity-80">
              <Users size={24} className="text-white" />
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Bemanning som håller er drift igång
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Vi levererar förhandskvalificerad personal inom lager och logistik – från toppar och sjukfrånvaro till längre vikariat. Matchat efter skift, volym och krav, utan bindningstider.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOverviewSection;
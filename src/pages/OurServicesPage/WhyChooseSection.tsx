import React from 'react';
import { Clock, Truck, Award } from 'lucide-react';

interface WhyChooseSectionProps {
  isVisible: boolean;
}

const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ isVisible }) => {
  return (
    <section className="py-24 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
           Varför välja TalentBridge?
          </h2>
         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
           Tre anledningar till att företag inom lager & logistik vänder sig till oss.
         </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           {
             icon: Clock,
             title: 'Flexibilitet & Snabb igångsättning',
             description: 'Bemanning när behovet uppstår – skift, toppar eller vikariat. Inga bindningstider.',
             highlight: 'Snabb igångsättning'
           },
           {
             icon: Truck,
             title: 'Djup branschkännedom',
             description: 'Vi kan lager & logistik – vi förstår rollerna, tempot och kompetenskraven.',
             highlight: 'Specialister inom ert område'
           },
           {
             icon: Award,
             title: 'Trygg & transparent process',
             description: 'Strukturerad screening, tydliga villkor och en personlig kontakt genom hela uppdraget.',
             highlight: 'Personlig service'
           }
         ].map((item, index) => (
            <div
              key={index}
              className={`
               text-center p-8 bg-white border border-gray-200 rounded-2xl shadow-sm
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
              `}
              style={{ transitionDelay: `${1200 + index * 150}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <item.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
             <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-4">
               {item.highlight}
             </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
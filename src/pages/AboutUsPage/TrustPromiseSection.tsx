import React from 'react';
import { CheckCircle } from 'lucide-react';

const TrustPromiseSection: React.FC = () => {
  return (
    <section id="trust-promise" className="py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Vårt löfte till dig
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Därför väljer företag oss som bemanningspartner.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <CheckCircle size={20} className="text-green-400" />
              </div>
              <span className="text-white/80 text-lg font-medium leading-relaxed">
                Dedikerad kontaktperson från första dagen.
              </span>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <CheckCircle size={20} className="text-green-400" />
              </div>
              <span className="text-white/80 text-lg font-medium leading-relaxed">
                Transparent prissättning – inga bindningstider eller dolda avgifter.
              </span>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <CheckCircle size={20} className="text-green-400" />
              </div>
              <span className="text-white/80 text-lg font-medium leading-relaxed">
                Snabb återkoppling genom hela processen.
              </span>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <CheckCircle size={20} className="text-green-400" />
              </div>
              <span className="text-white/80 text-lg font-medium leading-relaxed">
                Fokus på lager & logistik – vi kan just din miljö.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustPromiseSection;
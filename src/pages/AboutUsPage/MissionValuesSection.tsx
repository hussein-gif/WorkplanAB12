import React from 'react';
import { Shield, Star, Handshake } from 'lucide-react';

const MissionValuesSection: React.FC = () => {
  return (
    <section className="py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Mission */}
          <div>
            <h2 className="text-4xl font-light text-white mb-6">Vårt Uppdrag</h2>
            <p className="text-xl text-white/80 leading-relaxed font-light">
              Vi gör bemanning enkelt för både företag och människor. Vi säkrar rätt kompetens snabbt för lager & logistik – samtidigt som vi hjälper kandidater att hitta trygga, utvecklande jobb utan onödigt krångel. Med tydliga processer, personlig service och fokus på kvalitet skapar vi långsiktigt värde för alla inblandade.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-4xl font-light text-white mb-6">Våra Värderingar</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Transparens</h3>
                  <p className="text-white/70">öppna processer, tydlig prissättning och ärlig kommunikation.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Star size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Kvalitet i varje matchning</h3>
                  <p className="text-white/70">strukturerad screening, referenskontroll och noggranna leveranser.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Handshake size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Partnerskap på riktigt</h3>
                  <p className="text-white/70">en dedikerad kontaktperson och uppföljning hela vägen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionValuesSection;
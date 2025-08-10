import React, { useMemo } from 'react';
import { Shield, Star, Handshake } from 'lucide-react';

const MissionValuesSection: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      color:
        Math.random() > 0.5
          ? `rgba(59,130,246,${Math.random() * 0.3 + 0.1})`
          : Math.random() > 0.5
          ? `rgba(16,185,129,${Math.random() * 0.3 + 0.1})`
          : `rgba(168,85,247,${Math.random() * 0.3 + 0.1})`,
    }));
  }, []);

  return (
    <section className="relative py-24 px-8 overflow-hidden" style={{ backgroundColor: '#08132B' }}>
      {/* Creative Abstract Background (STATIC) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* ... (bakgrunden oförändrad) ... */}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Mission */}
          <div>
            <h2
              className="text-4xl font-medium text-white mb-6"
              style={{
                fontFamily:
                  '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
              }}
            >
              Vårt Uppdrag
            </h2>

            {/* Delat i två stycken */}
            <p
              className="text-xl text-white/80 leading-relaxed font-light"
              style={{
                fontFamily:
                  'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
              }}
            >
              Vi gör bemanning enkelt för både företag och människor. Vi säkrar rätt
              kompetens snabbt för lager & logistik – samtidigt som vi hjälper kandidater
              att hitta trygga, utvecklande jobb utan onödigt krångel.
            </p>
            <p
              className="mt-4 text-xl text-white/80 leading-relaxed font-light"
              style={{
                fontFamily:
                  'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
              }}
            >
              Med tydliga processer, personlig service och fokus på kvalitet skapar vi
              långsiktigt värde för alla inblandade.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2
              className="text-4xl font-medium text-white mb-6"
              style={{
                fontFamily:
                  '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
              }}
            >
              Våra Värderingar
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-white" />
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold text-white mb-2"
                    style={{
                      fontFamily:
                        '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                    }}
                  >
                    Transparens
                  </h3>
                  <p
                    className="text-white/70 font-light"
                    style={{
                      fontFamily:
                        'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                    }}
                  >
                    Öppna processer, tydlig prissättning och ärlig kommunikation.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Star size={20} className="text-white" />
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold text-white mb-2"
                    style={{
                      fontFamily:
                        '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                    }}
                  >
                    Kvalitet i varje matchning
                  </h3>
                  <p
                    className="text-white/70 font-light"
                    style={{
                      fontFamily:
                        'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                    }}
                  >
                    Strukturerad screening, referenskontroll och noggranna leveranser.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Handshake size={20} className="text-white" />
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold text-white mb-2"
                    style={{
                      fontFamily:
                        '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                    }}
                  >
                    Partnerskap på riktigt
                  </h3>
                  <p
                    className="text-white/70 font-light"
                    style={{
                      fontFamily:
                        'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                    }}
                  >
                    En dedikerad kontaktperson och uppföljning hela vägen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400&family=Zen+Kaku+Gothic+Antique:wght@500&display=swap');
      `}</style>
    </section>
  );
};

export default MissionValuesSection;

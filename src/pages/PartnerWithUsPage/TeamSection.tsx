import React from 'react';

interface TeamSectionProps {
  isVisible: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ isVisible }) => {
  return (
    <section className="py-24 px-8 bg-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-normal text-white mb-4"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 400 }}
          >
            Teamet bakom Workplan
          </h2>
          <p
            className="text-lg text-white/70 max-w-2xl mx-auto leading-normal font-light"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Två dedikerade kontaktpersoner som tar ansvar från första behovsanalys till uppföljning – utan mellanhänder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              JA
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 break-words max-w-full">
              Jawad Abbas
            </h3>
            <p className="text-blue-400 font-medium break-words max-w-full">
              Medgrundare & Affärsansvarig
            </p>
          </div>

          <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              AM
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 break-words max-w-full">
              Arvin Mahmoudi
            </h3>
            <p className="text-blue-400 font-medium break-words max-w-full">
              Medgrundare & Leveranschef
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

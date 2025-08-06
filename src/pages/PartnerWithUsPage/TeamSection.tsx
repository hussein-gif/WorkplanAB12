import React from 'react';

interface TeamSectionProps {
  isVisible: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ isVisible }) => {
  return (
    <section className="team-section">
      <div className="content max-w-6xl mx-auto py-24 px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-normal text-white mb-4"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 400 }}
          >
            Teamet Bakom Workplan
          </h2>
          <p
            className="text-base text-white/70 max-w-2xl mx-auto leading-normal font-light"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Två dedikerade kontaktpersoner som tar ansvar från första behovsanalys till uppföljning – utan mellanhänder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="card p-8 text-center">
            <div className="avatar bg-gradient-to-br from-blue-500 to-purple-600 mb-4 mx-auto">
              <span className="text-white font-bold text-2xl">JA</span>
            </div>
            <h3
              className="text-xl font-medium text-white mb-2"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
            >
              Jawad Abbas
            </h3>
            <p className="text-blue-400 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Medgrundare & Affärsansvarig
            </p>
          </div>
          <div className="card p-8 text-center">
            <div className="avatar bg-gradient-to-br from-blue-500 to-purple-600 mb-4 mx-auto">
              <span className="text-white font-bold text-2xl">AM</span>
            </div>
            <h3
              className="text-xl font-medium text-white mb-2"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
            >
              Arvin Mahmoudi
            </h3>
            <p className="text-blue-400 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Medgrundare & Leveranschef
            </p>
          </div>
        </div>
      </div>

      {/* Reuse background styling from IndustriesSection */}
      <style>{`
        .team-section {
          position: relative;
          overflow: hidden;
          background-color: #08132b;
        }
        .team-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><g fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='2'><path d='M0 200 Q200 100 400 200 T800 200' /><path d='M0 300 Q200 200 400 300 T800 300' /></g></svg>");
          background-size: cover;
          opacity: 0.4;
          z-index: 0;
        }
        .team-section .content {
          position: relative;
          z-index: 1;
        }
        .card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1rem;
        }
        .avatar {
          width: 6rem;
          height: 6rem;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </section>
  );
};

export default TeamSection;

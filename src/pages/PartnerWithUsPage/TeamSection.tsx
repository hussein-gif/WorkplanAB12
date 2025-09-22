import React, { memo } from 'react';

interface TeamSectionProps {
  isVisible: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ isVisible }) => {
  return (
    <section
      className="team-section"
      style={{
        // Rendera först när sektionen behövs + reservera plats för stabil layout
        contentVisibility: 'auto',
        containIntrinsicSize: '1px 720px',
      }}
      aria-label="Teamet Bakom Workplan"
    >
      <div className="content max-w-6xl mx-auto py-12 md:py-24 px-6 sm:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-3 md:mb-4"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Teamet Bakom Workplan
          </h2>
          <p
            className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-normal font-light"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Två dedikerade kontaktpersoner som tar ansvar från första behovsanalys till uppföljning – utan mellanhänder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          <div
            className="card p-6 md:p-8 text-center"
            style={{
              // Förbättra rendering när korten kommer in i bild
              contentVisibility: 'auto',
              containIntrinsicSize: '1px 260px',
              willChange: 'opacity, transform',
            }}
          >
            <div className="avatar bg-gradient-to-br from-blue-500 to-purple-600 mb-4 mx-auto">
              <img
                src="https://i.ibb.co/WNwzR4vM/Black-and-White-Modern-Linkedln-Profile-Picture-4.png"
                alt="Jawad Abbas"
                className="w-full h-full rounded-full object-cover"
                /* 👉 Ladda tidigare och med hög prioritet */
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={96}
                height={96}
              />
            </div>
            <h3
              className="text-lg sm:text-xl font-medium text-white mb-1 sm:mb-2"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
            >
              Jawad Abbas
            </h3>
            <p className="text-blue-400 font-medium text-sm sm:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
              Medgrundare & Affärsansvarig
            </p>
          </div>

          <div
            className="card p-6 md:p-8 text-center"
            style={{
              contentVisibility: 'auto',
              containIntrinsicSize: '1px 260px',
              willChange: 'opacity, transform',
            }}
          >
            <div className="avatar bg-gradient-to-br from-blue-500 to-purple-600 mb-4 mx-auto">
              <img
                src="https://i.ibb.co/cpq3pkZ/Black-and-White-Modern-Linkedln-Profile-Picture-3.png"
                alt="Arvin Mahmoudi"
                className="w-full h-full rounded-full object-cover"
                /* 👉 Ladda tidigare och med hög prioritet */
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={96}
                height={96}
              />
            </div>
            <h3
              className="text-lg sm:text-xl font-medium text-white mb-1 sm:mb-2"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
            >
              Arvin Mahmoudi
            </h3>
            <p className="text-blue-400 font-medium text-sm sm:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
              Medgrundare & Ordförande
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
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600' aria-hidden='true'><g fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='2'><path d='M0 200 Q200 100 400 200 T800 200' /><path d='M0 300 Q200 200 400 300 T800 300' /></g></svg>");
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
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
};

export default memo(TeamSection);

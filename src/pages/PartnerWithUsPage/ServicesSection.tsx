import React from 'react';

interface ServicesSectionProps {
  isVisible: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ isVisible }) => {
  const services = [
    {
      title: 'Tillsvidareanställning',
      body: 'Rätt kompetens från start – vi säkerställer att kandidaten matchar kravprofil och roll.',
      highlight: 'Långsiktig lösning'
    },
    {
      title: 'Timanställda & Vikarier',
      body: 'Snabb tillsättning vid sjukfrånvaro, arbetstoppar eller korta projekt.',
      highlight: 'Skalbar bemanning'
    },
    {
      title: 'Säsongsvikariat',
      body: 'Trygg bemanning under intensiva perioder – planerad och kostnadseffektiv.',
      highlight: 'Förutsägbar täckning'
    },
    {
      title: 'Provanställning',
      body: 'Testa kompetensen i skarpt läge innan ni tar anställningsbeslut.',
      highlight: 'Riskminimering'
    }
  ];

  return (
    <section
      className="py-24 px-8 relative"
      style={{
        background: 'linear-gradient(135deg, #0d1b2a 0%, #1a2a47 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            style={{
              color: '#FFFFFF',
              fontFamily: 'Zen Kaku Gothic Antique, serif',
              lineHeight: 1.2,
              fontSize: '3rem'
            }}
          >
            <span style={{ fontWeight: 400 }}>Våra </span>
            <span style={{ fontWeight: 500 }}>Bemanningstjänster</span>
          </h2>
          <p
            className="mt-4"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '40rem',
              margin: '0.5rem auto 0',
              lineHeight: 1.4,
            }}
          >
            Flexibla bemanningslösningar skräddarsydda för dina affärsbehov.
          </p>
        </div>

        {/* Frosted-Glass Cards with Static Blue Glow on Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="relative p-6 cursor-default transition-all duration-300 ease-out hover:scale-[1.02]"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '16px',
                boxShadow: `
                  0 8px 24px rgba(0, 0, 0, 0.2),
                  0 0 12px rgba(42, 140, 255, 0.5)
                `
              }}
              onMouseEnter={e =>
                Object.assign(e.currentTarget.style, {
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  boxShadow: `
                    0 12px 32px rgba(0, 0, 0, 0.25),
                    0 0 16px rgba(42, 140, 255, 0.7)
                  `
                })
              }
              onMouseLeave={e =>
                Object.assign(e.currentTarget.style, {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  boxShadow: `
                    0 8px 24px rgba(0, 0, 0, 0.2),
                    0 0 12px rgba(42, 140, 255, 0.5)
                  `
                })
              }
            >
              {/* Card Title */}
              <h3
                style={{
                  fontFamily: 'Zen Kaku Gothic Antique, serif',
                  fontWeight: 500,
                  fontSize: '1.5rem',
                  color: '#FFFFFF',
                  marginBottom: '1rem'
                }}
              >
                {service.title}
              </h3>

              {/* Card Body */}
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.6,
                  marginBottom: '3rem'
                }}
              >
                {service.body}
              </p>

              {/* Highlight Pill pinned to bottom with static blue glow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1.5rem',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  backgroundColor: 'rgba(42,140,255,0.2)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  color: '#FFFFFF',
                  boxShadow: '0 0 12px rgba(42,140,255,0.7)'
                }}
              >
                {service.highlight}
              </div>

              {/* Right-pointing arrow in a circle with static blue glow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1.5rem',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(42,140,255,0.2)',
                  borderRadius: '50%',
                  boxShadow: '0 0 12px rgba(42,140,255,0.7)'
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 2 L9 6 L3 10"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Prompt */}
        <div className="text-center">
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.7)'
            }}
          >
            Osäker på vilket upplägg som passar?{' '}
            <a
              href="#kontakt-form"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                color: '#3DA9FC'
              }}
              onClick={e => {
                e.preventDefault();
                document
                  .getElementById('kontakt-form')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Kontakta oss
            </a>{' '}
            så guidar vi dig.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
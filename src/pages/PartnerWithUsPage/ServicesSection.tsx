import React from 'react';

interface ServicesSectionProps {
  isVisible: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ isVisible }) => {
  const services = [
    {
      title: 'Tillsvidareanställning',
      body: 'Rätt kompetens från start – vi säkerställer att kandidaten matchar kravprofil och roll.',
      highlight: 'Långsiktig lösning',
    },
    {
      title: 'Timanställda & Vikarier',
      body: 'Snabb tillsättning vid sjukfrånvaro, arbetstoppar eller korta projekt.',
      highlight: 'Skalbar bemanning',
    },
    {
      title: 'Säsongsvikariat',
      body: 'Trygg bemanning under intensiva perioder – planerad och kostnadseffektiv.',
      highlight: 'Förutsägbar täckning',
    },
    {
      title: 'Provanställning',
      body: 'Testa kompetensen i skarpt läge innan ni tar anställningsbeslut.',
      highlight: 'Riskminimering',
    },
  ];

  return (
    <section
      className="py-24 px-8 relative overflow-hidden"
      style={{ backgroundColor: '#08132B' }}
    >
      {/* Subtle hex-pattern + colored blobs */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ...same as before... */}
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl font-medium text-white mb-6"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', lineHeight: 1.2 }}
          >
            Våra Bemanningstjänster
          </h2>
        </div>

        {/* Frosted-glass cards with stronger blur */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="relative p-6 transition-all duration-300 ease-out hover:scale-[1.02]"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',       // Slightly more transparent
                backdropFilter: 'blur(24px)',                       // Increased blur
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '16px',
                boxShadow: `
                  0 8px 24px rgba(0, 0, 0, 0.2),
                  0 0 12px rgba(42, 140, 255, 0.5)
                `,
                cursor: 'default'
              }}
              onMouseEnter={e =>
                Object.assign(e.currentTarget.style, {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  boxShadow: `
                    0 12px 32px rgba(0, 0, 0, 0.25),
                    0 0 16px rgba(42, 140, 255, 0.7)
                  `
                })
              }
              onMouseLeave={e =>
                Object.assign(e.currentTarget.style, {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: `
                    0 8px 24px rgba(0, 0, 0, 0.2),
                    0 0 12px rgba(42, 140, 255, 0.5)
                  `
                })
              }
            >
              <h3
                style={{
                  fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
                  fontWeight: 500,
                  fontSize: '1.5rem',
                  color: '#FFFFFF',
                  marginBottom: '1rem'
                }}
              >
                {service.title}
              </h3>

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

        {/* Contact Prompt unchanged */}
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

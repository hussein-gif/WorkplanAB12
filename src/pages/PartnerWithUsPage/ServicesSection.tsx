import React from 'react';

import React, { useState, useEffect } from 'react';

interface ServicesSectionProps {
  isVisible: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ isVisible }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      className="py-24 px-8 relative overflow-hidden"
    >
      {/* Clean Professional Background */}
      <div className="absolute inset-0">
        {/* Soft gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 60%, #f1f5f9 100%)',
          }}
        />

        {/* Subtle floating elements */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full opacity-[0.02] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #6366f1 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.25}%`,
            top: `${mousePosition.y * 0.2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[550px] h-[550px] rounded-full opacity-[0.015] blur-3xl transition-all duration-1000 delay-700"
          style={{
            background: `radial-gradient(circle, #0ea5e9 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.2}%`,
            bottom: `${mousePosition.y * 0.25}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Geometric accent lines */}
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 60px)
            `,
          }}
        />

        {/* Minimal decorative elements */}
        <div className="absolute top-24 right-24 w-2 h-2 bg-indigo-200/30 rounded-full" />
        <div className="absolute bottom-28 left-28 w-1.5 h-1.5 bg-sky-200/25 rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-slate-300/20 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            style={{
              color: '#1e293b',
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
              fontSize: '1rem', // mindre och mer professionellt
              color: '#64748b',
              maxWidth: '40rem',
              margin: '0.5rem auto 0',
              lineHeight: 1.4,
            }}
          >
            Flexibla bemanningslösningar skräddarsydda för dina affärsbehov.
          </p>
        </div>

        {/* Frosted-Glass Cards with Neon-Blue Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="relative p-6 cursor-default transition-all duration-300 ease-out hover:scale-[1.02]"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '16px',
                boxShadow: `
                  0 8px 24px rgba(0, 0, 0, 0.08),
                  0 4px 12px rgba(59, 130, 246, 0.1)
                `
              }}
              onMouseEnter={e =>
                Object.assign(e.currentTarget.style, {
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: `
                    0 12px 32px rgba(0, 0, 0, 0.12),
                    0 4px 16px rgba(59, 130, 246, 0.15)
                  `
                })
              }
              onMouseLeave={e =>
                Object.assign(e.currentTarget.style, {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  boxShadow: `
                    0 8px 24px rgba(0, 0, 0, 0.08),
                    0 4px 12px rgba(59, 130, 246, 0.1)
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
                  color: '#1e293b',
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
                  color: '#475569',
                  lineHeight: 1.6,
                  marginBottom: '3rem' // reserve space for pill and arrow
                }}
              >
                {service.body}
              </p>

              {/* Highlight Pill pinned to bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1.5rem',
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  color: '#3b82f6'
                }}
              >
                {service.highlight}
              </div>

              {/* Right-pointing arrow in a circle */}
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
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '50%'
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
                    stroke="#3b82f6"
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
              color: '#64748b'
            }}
          >
            Osäker på vilket upplägg som passar?{' '}
            <a
              href="#kontakt-form"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                color: '#3b82f6'
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
      </div>
    </section>
  );
};

export default ServicesSection;

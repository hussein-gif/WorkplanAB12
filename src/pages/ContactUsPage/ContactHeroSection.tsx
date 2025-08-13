import React from 'react';
import { User, Building } from 'lucide-react';

interface ContactHeroSectionProps {
  isVisible: boolean;
  mousePosition: { x: number; y: number };
  userType: 'candidate' | 'company' | null;
  setUserType: (type: 'candidate' | 'company' | null) => void;
}

const ContactHeroSection: React.FC<ContactHeroSectionProps> = ({
  isVisible,
  mousePosition,
  userType,
  setUserType,
}) => {
  return (
    <section className="relative pt-32 pb-16 px-8 overflow-hidden">
      {/* Bakgrundsdesign */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic Gradient Orbs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.02] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.015] blur-3xl transition-all duration-1000 delay-500"
          style={{
            background: `radial-gradient(circle, #10B981 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.2}%`,
            bottom: `${mousePosition.y * 0.3}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Innehåll */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Rubrik */}
        <h1
          style={{
            fontFamily:
              '"Zen Kaku Gothic Antique", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          }}
          className={`
            text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight
            transition-all duration-1000 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
          `}
        >
          Hur kan vi hjälpa dig?
        </h1>

        {/* Underrubrik */}
        <p
          style={{
            fontFamily:
              'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          }}
          className={`
            text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed mb-8
            transition-all duration-1000 delay-200 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          Välj om du är kandidat eller företag så visar vi rätt formulär.
        </p>

        {/* Knappgrupp */}
        <div
          className={`
            flex flex-col sm:flex-row gap-4 justify-center items-center mb-6
            transition-all duration-1000 delay-400 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          <button
            onClick={() => setUserType('candidate')}
            style={{
              fontFamily:
                'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            }}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-xl border-2 font-medium text-lg
              transition-all duration-300
              ${userType === 'candidate'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-25'
              }
            `}
          >
            <User size={20} />
            <span>Jag är kandidat</span>
          </button>

          <button
            onClick={() => setUserType('company')}
            style={{
              fontFamily:
                'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            }}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-xl border-2 font-medium text-lg
              transition-all duration-300
              ${userType === 'company'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-25'
              }
            `}
          >
            <Building size={20} />
            <span>Jag representerar ett företag</span>
          </button>
        </div>

        {/* Text under knapparna */}
        <p
          style={{
            fontFamily:
              'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          }}
          className={`
            text-sm text-gray-500 mb-12
            transition-all duration-1000 delay-600 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          Vi hanterar dina uppgifter konfidentiellt.
        </p>
      </div>

      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Zen+Kaku+Gothic+Antique:wght@200;400&display=swap');
      `}</style>
    </section>
  );
};

export default ContactHeroSection;

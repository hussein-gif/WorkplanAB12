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
    <>
      {/* Elegant Light Background */}
      <div className="absolute inset-0 bg-white">
        {/* Soft corner blobs */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(59,130,246,0.25), rgba(59,130,246,0) 70%)',
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(16,185,129,0.25), rgba(16,185,129,0) 70%)',
          }}
        />

        {/* Subtle diagonal gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(59,130,246,0.04) 0%, rgba(255,255,255,0) 40%, rgba(16,185,129,0.04) 100%)',
          }}
        />

        {/* Faint grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Noise/texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"1\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.7\"/></svg>')",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h1
            className={`
              text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight
              transition-all duration-1000 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
            `}
          >
            Hur kan vi hjälpa dig?
          </h1>

          {/* Support Line */}
          <p
            className={`
              text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed mb-8
              transition-all duration-1000 delay-200 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
          >
            Välj om du är kandidat eller företag så visar vi rätt formulär.
          </p>

          {/* User Type Toggle */}
          <div
            className={`
              flex flex-col sm:flex-row gap-4 justify-center items-center mb-6
              transition-all duration-1000 delay-400 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
          >
            <button
              onClick={() => setUserType('candidate')}
              className={`
                group relative px-8 py-4 rounded-2xl font-semibold text-lg
                border-2 transition-all duration-300
                min-w-[200px]
                ${userType === 'candidate'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }
              `}
            >
              <div className="flex items-center justify-center space-x-3">
                <User size={20} />
                <span>Jag är kandidat</span>
              </div>
            </button>

            <button
              onClick={() => setUserType('company')}
              className={`
                group relative px-8 py-4 rounded-2xl font-semibold text-lg
                border-2 transition-all duration-300
                min-w-[200px]
                ${userType === 'company'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                }
              `}
            >
              <div className="flex items-center justify-center space-x-3">
                <Building size={20} />
                <span>Företagskund</span>
              </div>
            </button>
          </div>

          {/* Reassurance Line */}
          <p
            className={`
              text-sm text-gray-500 mb-12
              transition-all duration-1000 delay-600 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
          >
            Vi hanterar dina uppgifter konfidentiellt.
          </p>
        </div>
      </section>
    </>
  );
};

export default ContactHeroSection;

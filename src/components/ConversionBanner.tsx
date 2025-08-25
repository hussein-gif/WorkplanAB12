import React, { useState, useEffect } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ConversionBannerProps = {
  city?: string;                 // t.ex. "Örebro"
  primaryService?: string;       // t.ex. "bemanning"
  secondaryService?: string;     // t.ex. "rekrytering"
  segment?: string;              // t.ex. "lager och logistik"
  headingTag?: 'h1' | 'h2';      // välj h1 om detta är sidans huvudrubrik
};

const ConversionBanner: React.FC<ConversionBannerProps> = ({
  city = 'Örebro',
  primaryService = 'bemanning',
  secondaryService = 'rekrytering',
  segment = 'lager och logistik',
  headingTag: HeadingTag = 'h1',
}) => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const keywordHeading = `${primaryService} & ${secondaryService} i ${city} – ${segment}`;

  return (
    <section
      className="relative h-[60vh] flex items-center justify-center overflow-hidden"
      lang="sv"
      role="region"
      aria-labelledby="conversion-banner-title"
    >
      {/* Dynamic Background System */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Main Background Image with Parallax */}
        <div
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) scale(1.05)`,
          }}
        >
          <img
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
            alt="Teammöte på kontor – professionell företagsmiljö"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Sophisticated Overlay System */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Dynamic Gradient Orbs */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.08] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.2}%`,
            transform: 'translate(-50%, -50%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl transition-all duration-1000 delay-500"
          style={{
            background: `radial-gradient(circle, #10B981 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.2}%`,
            bottom: `${mousePosition.y * 0.3}%`,
            transform: 'translate(50%, 50%)',
          }}
          aria-hidden="true"
        />

        {/* Elegant Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
          aria-hidden="true"
        />

        {/* Floating Accent Elements */}
        <div className="absolute top-20 right-32 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse" aria-hidden="true" />
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-emerald-400/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }} aria-hidden="true" />
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} aria-hidden="true" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center flex flex-col items-center">
          {/* Heading + Separator + Subtitle */}
          <div
            className={`
              flex flex-col items-center space-y-3 md:space-y-6 -mt-2 md:-mt-8
              transition-all duration-1000 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
            `}
          >
            <HeadingTag
              id="conversion-banner-title"
              className="text-3xl md:text-6xl font-normal text-white tracking-tight leading-[1]"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 400 }}
            >
              {keywordHeading}
            </HeadingTag>

            <div className="flex items-center justify-center space-x-3 md:space-x-4" aria-hidden="true">
              <div className="w-6 md:w-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="w-2 h-2 bg-white/20 rounded-full" />
              <div className="w-6 md:w-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>

            <p
              className="text-sm md:text-xl text-white/80 font-light leading-relaxed max-w-[90%] md:max-w-2xl mx-auto"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}
            >
              Vi hjälper företag i {city} med {primaryService} och {secondaryService} inom {segment}. 
              Snabb leverans av rätt kompetens, transparent prissättning och personlig service. 
              Är du kandidat? Hitta nästa steg i karriären hos arbetsgivare som satsar på {segment}.
            </p>
          </div>

          {/* Enhanced Link Container */}
          <nav
            className={`
              flex flex-row flex-wrap gap-3 md:gap-6 justify-center items-center mt-6 md:mt-10
              transition-all duration-1000 delay-600 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
            aria-label="Primära åtgärder"
          >
            {/* Contact Link (SEO: beskrivande ankartext) */}
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
              className="
                group relative px-4 py-2 md:px-8 md:py-4
                bg-white/95 text-gray-900 rounded-xl md:rounded-2xl
                font-semibold text-sm md:text-lg tracking-wide
                hover:bg-white hover:scale-105
                transition-all duration-300
                shadow-2xl hover:shadow-white/20
                hover:-translate-y-1
                overflow-hidden
                w-[48%] md:w-auto
                min-w-[140px] md:min-w-[200px]
                focus:outline-none focus:ring-2 focus:ring-white/80
              "
              aria-label={`Kontakta oss om ${primaryService} och ${secondaryService} i ${city}`}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}
            >
              <span className="sr-only">Internlänk: </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <div className="relative flex items-center justify-center space-x-2 md:space-x-3">
                <span className="text-[#1f2a63] whitespace-nowrap">Kontakta oss för {primaryService}</span>
                <ArrowRight className="w-4 h-4 md:w-4 md:h-4 text-[#1f2a63] group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
              </div>
            </a>

            {/* Services Link (SEO: beskrivande ankartext) */}
            <a
              href="/services"
              onClick={(e) => { e.preventDefault(); navigate('/services'); }}
              className="
                group relative px-4 py-2 md:px-8 md:py-4
                bg-transparent text-white border-2 border-white/30 rounded-xl md:rounded-2xl
                font-semibold text-sm md:text-lg tracking-wide
                hover:border-white/60 hover:bg-white/10 hover:scale-105
                transition-all duration-300
                backdrop-blur-sm
                hover:-translate-y-1
                overflow-hidden
                w-[48%] md:w-auto
                min-w-[120px] md:min-w-[200px]
                focus:outline-none focus:ring-2 focus:ring-white/80
              "
              aria-label={`Läs mer om våra tjänster för ${secondaryService} i ${city}`}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <div className="relative flex items-center justify-center space-x-2 md:space-x-3">
                <Building2 className="w-4 h-4 md:w-[18px] md:h-[18px] text-white/80" aria-hidden="true" />
                <span>Våra tjänster inom {secondaryService}</span>
                <ArrowRight className="w-4 h-4 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
              </div>
            </a>
          </nav>
        </div>
      </div>

      {/* Decorative Bottom Accent */}
      <div
        className={`
          absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2
          transition-all duration-1000 delay-800 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}
        aria-hidden="true"
      >
        <div className="inline-flex items-center space-x-3 md:space-x-4">
          <div className="w-10 md:w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="flex space-x-1.5 md:space-x-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '500ms' }} />
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1000ms' }} />
          </div>
          <div className="w-10 md:w-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default ConversionBanner;

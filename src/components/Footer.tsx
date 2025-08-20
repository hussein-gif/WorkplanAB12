import React, { useState, useEffect } from 'react';
import { Linkedin, Facebook, Instagram, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<string | null>(null);

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

  const jobLinks = [
    { label: 'För jobbsökande', href: '/for-candidates' },
    { label: 'Alla jobb', href: '/jobs' },
    { label: 'Kontakta oss', href: '/contact' }
  ];

  const employerLinks = [
    { label: 'För företag', href: '/for-companies' },
    { label: 'Om oss', href: '/about' },
    { label: 'Kontakta oss', href: '/contact' }
  ];

  const aboutLinks = [
    { label: 'Om oss', href: '/about' },
    { label: 'Kontakta oss', href: '/contact' },
    { label: 'Läs mer', href: '/read-more' }
  ];

  const legalLinks = [
    { label: 'Integritetspolicy', href: '#privacy' },
    { label: 'Användarvillkor', href: '#terms' },
    { label: 'Cookie Policy', href: '#cookies' },
    { label: 'GDPR Efterlevnad', href: '#gdpr' }
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-600' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-700' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: '#08132B' }}>
      {/* Elegant bakgrund */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-24 w-[40rem] h-[40rem] rounded-full opacity-[0.08] blur-3xl"
          style={{ background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.25), transparent 60%)' }}
        />
        <div
          className="absolute -bottom-32 -right-16 w-[36rem] h-[36rem] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.22), transparent 60%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '56px 56px',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Brand & Social */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.ibb.co/HfmhhtVt/Workplan-White-LG.png"
                    alt="Workplan logotyp"
                    className="h-10 md:h-12 lg:h-14 w-auto object-contain"
                    draggable={false}
                  />
                  <h3
                    className="text-white text-2xl md:text-3xl tracking-tight"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
                  >
                    Workplan
                  </h3>
                </div>

                {/* Social ikoner */}
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className={`
                        group relative w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm
                        flex items-center justify-center
                        border border-white/20 ${social.color}
                        transition-all duration-300 hover:scale-110 hover:border-white/40
                        overflow-hidden
                      `}
                    >
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <social.icon size={16} className="relative z-10 text-white/80 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Hitta ett jobb */}
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span>Hitta ett jobb</span>
                </h4>
                <nav className="space-y-3">
                  {jobLinks.map((link, index) => (
                    <a
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(link.href);
                      }}
                      className="block text-white/70 hover:text-white font-light transition-all duration-300 hover:translate-x-2 relative group cursor-pointer"
                      onMouseEnter={() => setIsHovered(`job-${index}`)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <div
                        className={`
                          absolute left-0 top-1/2 -translate-y-1/2 w-0 h-4 bg-blue-500 rounded-r-full
                          transition-all duration-300
                          ${isHovered === `job-${index}` ? 'w-1' : ''}
                        `}
                      />
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* För arbetsgivare */}
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span>För arbetsgivare</span>
                </h4>
                <nav className="space-y-3">
                  {employerLinks.map((link, index) => (
                    <a
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(link.href);
                      }}
                      className="block text-white/70 hover:text-white font-light transition-all duration-300 hover:translate-x-2 relative group cursor-pointer"
                      onMouseEnter={() => setIsHovered(`employer-${index}`)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <div
                        className={`
                          absolute left-0 top-1/2 -translate-y-1/2 w-0 h-4 bg-emerald-500 rounded-r-full
                          transition-all duration-300
                          ${isHovered === `employer-${index}` ? 'w-1' : ''}
                        `}
                      />
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Om oss */}
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  <span>Om oss</span>
                </h4>
                <nav className="space-y-3">
                  {aboutLinks.map((link, index) => (
                    <a
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(link.href);
                      }}
                      className="block text-white/70 hover:text-white font-light transition-all duration-300 hover:translate-x-2 relative group cursor-pointer"
                      onMouseEnter={() => setIsHovered(`about-${index}`)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <div
                        className={`
                          absolute left-0 top-1/2 -translate-y-1/2 w-0 h-4 bg-purple-500 rounded-r-full
                          transition-all duration-300
                          ${isHovered === `about-${index}` ? 'w-1' : ''}
                        `}
                      />
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 py-8 mt-2 relative">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <p className="text-white/70 font-light">
                © 2025 Workplan AB. Alla rättigheter förbehållna.
              </p>

              {/* Legal links tillbaka här */}
              <div className="flex flex-wrap items-center gap-6">
                {legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm font-light transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Till toppen-knapp */}
              <button
                onClick={scrollToTop}
                aria-label="Till toppen"
                className="group inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <ArrowUp size={18} className="text-white group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Decorative Bottom Accent */}
          <div className="pb-8">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="flex gap-2">
                <div className="w-1 h-1 bg-blue-400 rounded-full" />
                <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                <div className="w-1 h-1 bg-purple-400 rounded-full" />
              </div>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

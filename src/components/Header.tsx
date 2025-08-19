import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Endast de menyposter du vill ha, med “För företag” -> “Företag”
  const navigationItems = [
    { label: 'Jobb', href: '/jobs' },
    { label: 'Företag', href: '/partner' },
    { label: 'Om Oss', href: '/about' },
    { label: 'Kontakt', href: '/contact' },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Själva headern är alltid fixed, men ytan/baren visas bara vid scroll */}
      <header className="fixed top-0 left-0 right-0 z-[1000] pointer-events-none">
        {/* Header-surface som blir en ljusblå rundad rektangel vid scroll */}
        <div
          className={`
            transition-all duration-300 ease-out
            ${isScrolled
              ? 'mx-3 sm:mx-4 md:mx-6 mt-3 sm:mt-4 bg-blue-100/90 backdrop-blur-md border border-blue-200/60 shadow-lg rounded-2xl'
              : 'bg-transparent'
            }
          `}
        >
          <div
            className={`
              max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
              ${isScrolled ? 'h-16' : 'h-20'}
              flex items-center justify-between
              pointer-events-auto
            `}
          >
            {/* Logo */}
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleNavigation('/')}
            >
              <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 
                ${isScrolled ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700' : 'bg-gradient-to-br from-white/20 via-white/15 to-white/10'}
              `}>
                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles size={8} className={`absolute top-1 right-1 ${isScrolled ? 'text-white/60' : 'text-white/70'} animate-pulse`} />
                  <Sparkles size={6} className={`absolute bottom-1 left-1 ${isScrolled ? 'text-white/40' : 'text-white/60'} animate-pulse`} style={{ animationDelay: '300ms' }} />
                </div>
                <img
                  src="https://i.ibb.co/Rkq4d57H/Workplan-ABlogo1.png"
                  alt="Workplan Logo"
                  className="relative z-10 w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1
                  className={`text-2xl font-light tracking-tight transition-colors duration-300
                    ${isScrolled ? 'text-blue-900' : 'text-white'}
                  `}
                  style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                >
                  Workplan
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`
                    relative px-3 py-2 text-sm font-medium transition-all duration-300
                    hover:scale-105
                    ${location.pathname === item.href
                      ? (isScrolled ? 'text-blue-700' : 'text-white')
                      : (isScrolled ? 'text-blue-900/80 hover:text-blue-700' : 'text-white/80 hover:text-white')
                    }
                  `}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.label}
                  {location.pathname === item.href && (
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full
                        ${isScrolled ? 'bg-blue-700' : 'bg-white'}
                      `}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* CTA-knappen är borttagen enligt önskemål */}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                lg:hidden p-2 rounded-lg transition-colors duration-300
                ${isScrolled
                  ? 'text-blue-900 hover:bg-blue-200/50'
                  : 'text-white hover:bg-white/10'
                }
              `}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          {/* Dim + blur bakom */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Själva menykortet – matchar scrolled-stil med rundade hörn */}
          <div className="fixed top-4 left-3 right-3 bg-blue-100/95 backdrop-blur-md border border-blue-200/60 shadow-xl rounded-2xl overflow-hidden">
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src="https://i.ibb.co/Rkq4d57H/Workplan-ABlogo1.png"
                  alt="Workplan Logo"
                  className="w-8 h-8 object-contain"
                />
                <span
                  className="text-lg font-medium text-blue-900"
                  style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                >
                  Workplan
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-blue-900 hover:bg-blue-200/50 transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="px-4 pb-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`
                    block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors duration-300
                    ${location.pathname === item.href
                      ? 'text-blue-800 bg-blue-200/70'
                      : 'text-blue-900 hover:text-blue-800 hover:bg-blue-200/50'
                    }
                  `}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

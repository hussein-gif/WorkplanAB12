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

  const navigationItems = [
    { label: 'Hem', href: '/' },
    { label: 'Jobb', href: '/jobs' },
    { label: 'För Kandidater', href: '/for-candidates' },
    { label: 'För Företag', href: '/partner' },
    { label: 'Våra Tjänster', href: '/services' },
    { label: 'Om Oss', href: '/about' },
    { label: 'Kontakt', href: '/contact' }
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20' 
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleNavigation('/')}
            >
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles size={8} className="absolute top-1 right-1 text-white/60 animate-pulse" />
                  <Sparkles size={6} className="absolute bottom-1 left-1 text-white/40 animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
                <img
                  src="https://i.ibb.co/Rkq4d57H/Workplan-ABlogo1.png"
                  alt="Workplan Logo"
                  className="relative z-10 w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 
                  className={`text-2xl font-light tracking-tight transition-colors duration-300 ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
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
                      ? isScrolled 
                        ? 'text-blue-600' 
                        : 'text-white'
                      : isScrolled 
                        ? 'text-gray-700 hover:text-blue-600' 
                        : 'text-white/80 hover:text-white'
                    }
                  `}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.label}
                  {location.pathname === item.href && (
                    <div className={`
                      absolute bottom-0 left-0 right-0 h-0.5 rounded-full
                      ${isScrolled ? 'bg-blue-600' : 'bg-white'}
                    `} />
                  )}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => handleNavigation('/contact')}
                className={`
                  px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                  hover:scale-105 hover:shadow-lg
                  ${isScrolled
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm'
                  }
                `}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Kom igång
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                lg:hidden p-2 rounded-lg transition-colors duration-300
                ${isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
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
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-20 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200/20 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`
                      block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300
                      ${location.pathname === item.href
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }
                    `}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavigation('/contact')}
                  className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Kom igång
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
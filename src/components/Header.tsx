import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrolledTextColor = '#08132B';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] pointer-events-none">
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
            {/* Logo – större, tydligare och utan ruta */}
            <button
              onClick={() => handleNavigation('/')}
              className="flex items-center focus:outline-none"
              aria-label="Gå till startsidan"
            >
              <img
                src={
                  isScrolled
                    ? 'https://i.ibb.co/twSFVXyn/Workplan-Blue-LG.png'
                    : 'https://i.ibb.co/HfmhhtVt/Workplan-White-LG.png'
                }
                alt="Workplan"
                className={`
                  transition-all duration-300 px-1
                  ${isScrolled ? 'h-12' : 'h-14'}
                `}
                style={{ width: 'auto' }}
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`
                      relative px-3 py-2 text-sm font-medium transition-all duration-300
                      hover:scale-105
                      ${isScrolled
                        ? ''
                        : (isActive ? 'text-white' : 'text-white/80 hover:text-white')}
                    `}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: isScrolled
                        ? (isActive ? scrolledTextColor : scrolledTextColor)
                        : undefined,
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ backgroundColor: isScrolled ? scrolledTextColor : '#ffffff' }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                lg:hidden p-2 rounded-lg transition-colors duration-300
                ${isScrolled
                  ? 'hover:bg-blue-200/50'
                  : 'text-white hover:bg-white/10'}
              `}
              style={{ color: isScrolled ? scrolledTextColor : undefined }}
              aria-label="Öppna meny"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-4 left-3 right-3 bg-blue-100/95 backdrop-blur-md border border-blue-200/60 shadow-xl rounded-2xl overflow-hidden">
            <div className="px-4 py-4 flex items-center justify-between">
              {/* Mobil logga – blå variant, större */}
              <img
                src="https://i.ibb.co/twSFVXyn/Workplan-Blue-LG.png"
                alt="Workplan"
                className="h-12 w-auto px-1"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg transition-colors"
                style={{ color: scrolledTextColor }}
                aria-label="Stäng meny"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="px-4 pb-4 space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`
                      block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors duration-300
                      ${isActive ? 'bg-blue-200/70' : 'hover:bg-blue-200/50'}
                    `}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: scrolledTextColor,
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

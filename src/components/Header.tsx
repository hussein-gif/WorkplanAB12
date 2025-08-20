import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] pointer-events-none">
        {/* Wrappern styr endast bakgrundens form när man skrollar */}
        <div
          className={`
            transition-all duration-300 ease-out
            ${isScrolled ? 'mt-3 sm:mt-4 flex justify-center' : ''}
          `}
        >
          {/* 
            När INTE skrollad: original container (fullbredd). 
            När skrollad: en chip som wrappar PRECIS kring logga + länkar (ingen luft utanför).
          */}
          <div
            className={`
              pointer-events-auto
              ${isScrolled
                ? [
                    'inline-block', // => bakgrunden blir bara så bred som innehållet
                    'bg-white/90 backdrop-blur-md border border-gray-200/60 shadow-lg rounded-2xl',
                  ].join(' ')
                : [
                    'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
                    'w-full',
                  ].join(' ')
              }
            `}
          >
            {/* Inre rad – behåller positioner, men minskar höjd marginellt vid scroll */}
            <div
              className={`
                flex items-center justify-between
                ${isScrolled ? 'h-[72px] px-6' : 'h-20'}
                transition-all duration-300
              `}
            >
              {/* Logo (oförändrad position visuellt; minimal storleksminskning vid scroll) */}
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleNavigation('/')}
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
                    ${isScrolled ? 'h-14' : 'h-16'}
                  `}
                  style={{ width: 'auto' }}
                />
              </div>

              {/* Desktop Navigation – stort mellanrum mellan logga & länkar bevaras med gap i själva chipet */}
              <nav className={`hidden lg:flex items-center space-x-8 ${isScrolled ? '' : ''}`}>
                {navigationItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`
                      relative px-3 py-2 text-sm font-medium transition-all duration-300
                      hover:scale-105
                      ${location.pathname === item.href
                        ? (isScrolled ? 'text-[#08132B]' : 'text-white')
                        : (isScrolled ? 'text-[#08132B]/80 hover:text-[#08132B]' : 'text-white/80 hover:text-white')
                      }
                    `}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.label}
                    {location.pathname === item.href && (
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full
                          ${isScrolled ? 'bg-[#08132B]' : 'bg-white'}
                        `}
                      />
                    )}
                  </button>
                ))}
              </nav>

              {/* Mobile Menu Button (oförändrat) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`
                  lg:hidden p-2 rounded-lg transition-colors duration-300
                  ${isScrolled
                    ? 'text-[#08132B] hover:bg-gray-200/50'
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu (oförändrat) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          {/* Dim + blur bakom */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-4 left-3 right-3 bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-xl rounded-2xl overflow-hidden">
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src="https://i.ibb.co/twSFVXyn/Workplan-Blue-LG.png"
                  alt="Workplan"
                  className="h-14 w-auto px-1"
                />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-[#08132B] hover:bg-gray-200/50 transition-colors"
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
                      ? 'text-[#08132B] bg-gray-200/70'
                      : 'text-[#08132B]/90 hover:text-[#08132B] hover:bg-gray-200/50'
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

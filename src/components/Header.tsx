import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
        <div
          className={`
            transition-all duration-300 ease-out w-fit mx-auto
            ${isScrolled
              ? 'mt-3 bg-white/90 backdrop-blur-md border border-gray-200/60 shadow-lg rounded-2xl px-6 py-2'
              : 'bg-transparent px-8 py-4'
            }
          `}
        >
          <div
            className={`
              flex items-center justify-between space-x-12
              transition-all duration-300
              pointer-events-auto
            `}
          >
            {/* Logo */}
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
                  transition-all duration-300
                  ${isScrolled ? 'h-12' : 'h-14'}
                `}
                style={{ width: 'auto' }}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`
                    relative px-2 py-1 text-sm font-medium transition-all duration-300
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

            {/* Mobile Menu Button */}
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
      </header>
    </>
  );
};

export default Header;

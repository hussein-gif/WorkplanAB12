import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const handleNavigation = (path: string) => {
    if (path.startsWith('#') && location.pathname === '/') {
      const element = document.querySelector(path);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else if (path.startsWith('#')) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(path);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`
          max-w-7xl mx-auto flex items-center justify-between
          transition-all duration-200 ease-out
          ${isScrolled
            ? 'bg-white/80 backdrop-blur-2xl [-webkit-backdrop-filter:blur(20px)] border border-white/20 rounded-2xl shadow-2xl shadow-black/5 py-3 px-8 mx-6 mt-4'
            : 'py-8 px-6'}
        `}
      >
        {/* Glow */}
        {isScrolled && (
          <div
            className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
            }}
          />
        )}

        {/* Logo & Brand */}
        <div
          className="relative flex items-center space-x-4 group cursor-pointer"
          onClick={() => handleNavigation('/')}
        >
          <img
            src={isScrolled 
              ? "https://i.ibb.co/xKXkmwQJ/Workplan-ABlogo2.png" 
              : "https://i.ibb.co/Rkq4d57H/Workplan-ABlogo1.png"
            }
            alt="Workplan Logo"
            className={`
              w-12 h-12 object-contain
              transition-all duration-200 ease-out group-hover:scale-110
            `}
          />

          <div className="relative">
            <h1
              className={`
                font-bold text-xl tracking-tight
                transition-all duration-200 ease-out
                ${isScrolled ? 'text-gray-900' : 'text-white'}
              `}
            >
              Workplan
            </h1>
            <div
              className={`
                absolute -bottom-1 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-500
                transition-all duration-200 ease-out group-hover:w-full w-0
              `}
            />
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {[
            { href: '/jobs', label: 'Jobb' },
            { href: '/partner', label: 'Företag' },
            { href: '/about', label: 'Om Oss' },
            { href: '/contact', label: 'Kontakt' },
          ].map(({ href, label }, i) => (
            <button
              key={label}
              onClick={() => handleNavigation(href)}
              className={`
                relative px-4 py-2 rounded-lg font-medium text-sm tracking-wide
                transition-all duration-200 ease-out group overflow-hidden
                ${isScrolled
                  ? 'text-gray-700 hover:text-gray-900'
                  : 'text-white/90 hover:text-white'}
              `}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div
                className={`
                  absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100
                  transition-all duration-200 ease-out scale-95 group-hover:scale-100
                  ${isScrolled ? 'bg-gray-100' : 'bg-white/10 backdrop-blur-sm'}
                `}
              />
              <span className="relative z-10">{label}</span>
              <div
                className={`
                  absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 rounded-full
                  group-hover:w-6 transition-all duration-200 ease-out
                  ${isScrolled ? 'bg-blue-500' : 'bg-white'}
                `}
              />
            </button>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className={`
            lg:hidden relative p-3 rounded-xl
            transition-all duration-200 ease-out group
            ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10 backdrop-blur-sm'}
          `}
        >
          <div
            className={`
              absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
              transition-all duration-200 ease-out
              ${isScrolled ? 'bg-gray-100' : 'bg-white/10'}
            `}
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '400' }}
          />
          <div className="relative z-10">
            {isMenuOpen ? (
              <X
                size={20}
                className={`
                  transition-all duration-200 ease-out
                  ${isScrolled ? 'text-gray-800' : 'text-white'}
                `}
              />
            ) : (
              <Menu
                size={20}
                className={`
                  transition-all duration-200 ease-out
                  ${isScrolled ? 'text-gray-800' : 'text-white'}
                `}
              />
            )}
          </div>
        </button>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={`
          lg:hidden fixed inset-0 z-40
          transition-all duration-200 ease-out
          ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          ${isScrolled ? 'top-[5.5rem]' : 'top-[7rem]'}
        `}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={toggleMenu} />
        <div
          className={`
            relative bg-white/95 backdrop-blur-2xl border-t border-white/20
            shadow-2xl shadow-black/10
            transition-all duration-200 ease-out transform
            ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}
          `}
        >
          <nav className="flex flex-col p-6 space-y-2">
            {[
              { href: '/jobs', label: 'Jobb' },
              { href: '/partner', label: 'Kunder' },
              { href: '/about', label: 'Om Oss' },
              { href: '/contact', label: 'Kontakt' },
            ].map(({ href, label }, i) => (
              <button
                key={label}
                onClick={() => handleNavigation(href)}
                className={`
                  relative px-4 py-3 rounded-xl text-lg font-medium text-left
                  text-gray-800 hover:text-gray-900
                  transition-all duration-200 ease-out group
                  hover:bg-gray-50 hover:scale-[1.02]
                `}
                style={{ 
                  fontFamily: 'Inter, sans-serif', 
                  fontWeight: '500',
                  transitionDelay: isMenuOpen ? `${i * 50}ms` : '0ms' 
                }}
              >
                <span className="relative z-10">{label}</span>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-6 bg-blue-500 rounded-r-full group-hover:w-1 transition-all duration-200" />
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

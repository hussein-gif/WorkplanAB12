import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Kolla om vi är på JobDetailPage
  const isJobDetailPage = location.pathname.startsWith('/jobdetail');
  const isForceDark = isJobDetailPage || document.documentElement.classList.contains('force-nav-dark');

  return (
    <nav
      className={`
        fixed w-full top-0 left-0 z-50 transition-all duration-500 ease-in-out
        ${isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-md py-2 rounded-2xl mx-4 mt-2' 
            : 'bg-transparent shadow-none py-6'}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 px-6">
        {/* Logga */}
        <img
          src={isScrolled || isForceDark ? "/logo-dark.png" : "/logo-light.png"}
          alt="Logo"
          className="h-10 transition-all duration-500"
        />

        {/* Länkar */}
        <div className="flex space-x-10 font-medium">
          {['Jobb', 'Företag', 'Om Oss', 'Kontakt'].map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase().replace(' ', '')}`}
              className={`
                transition-colors duration-500
                ${isScrolled || isForceDark ? 'text-[#08132B]' : 'text-white'}
              `}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React, { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300`}
    >
      <div
        className={`flex items-center justify-between mx-auto px-6 py-4 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-md rounded-2xl mt-2 max-w-5xl"
            : "bg-transparent max-w-[95%]"
        }`}
      >
        {/* LOGO */}
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className={`transition-all duration-300 ${
              isScrolled ? "h-10" : "h-12"
            }`}
          />
        </div>

        {/* SPACER: håller alltid samma avstånd */}
        <div className="flex-1" />

        {/* NAV LINKS */}
        <nav className="flex space-x-8 text-gray-800 font-medium">
          <a href="#jobs" className="hover:text-blue-600 transition">
            Jobb
          </a>
          <a href="#companies" className="hover:text-blue-600 transition">
            Företag
          </a>
          <a href="#about" className="hover:text-blue-600 transition">
            Om Oss
          </a>
          <a href="#contact" className="hover:text-blue-600 transition">
            Kontakt
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

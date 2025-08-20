import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs för att mäta "topplägets" gap mellan logga och länkar
  const logoRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const [measuredGap, setMeasuredGap] = useState<number | null>(null);

  // Scroll-state
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mät gapet mellan logga och länkar när vi är i toppläget (inte scrolled)
  useEffect(() => {
    const measure = () => {
      if (isScrolled) return; // mät bara i toppläget
      const l = logoRef.current?.getBoundingClientRect();
      const n = navRef.current?.getBoundingClientRect();
      if (l && n) {
        const gap = Math.max(0, n.left - l.right);
        setMeasuredGap(gap);
      }
    };
    // Mät vid mount och på resize
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isScrolled]);

  const navigationItems = [
    { label: "Jobb", href: "/jobs" },
    { label: "Företag", href: "/partner" },
    { label: "Om Oss", href: "/about" },
    { label: "Kontakt", href: "/contact" },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] pointer-events-none">
        {/* Centrerar omslutande rutan när vi scrollat */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            isScrolled ? "mt-3 sm:mt-4 flex justify-center" : ""
          }`}
          style={{ transitionProperty: "all, max-width, margin, padding" }}
        >
          {/* 
            Inte scrolled: fullbredd (din original)
            Scrolled: inline-block (chip) som wrappar EXAKT logga + spacer + länkar
          */}
          <div
            className={`pointer-events-auto transition-all duration-500 ease-in-out ${
              isScrolled
                ? "inline-block bg-white/90 backdrop-blur-md border border-gray-200/60 shadow-lg rounded-2xl"
                : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
            }`}
            style={{ transitionProperty: "all, max-width, margin, padding" }}
          >
            <div
              className={`flex items-center transition-all duration-500 ease-in-out ${
                isScrolled ? "h-[72px] px-6" : "h-20"
              }`}
              style={{ transitionProperty: "all, max-width, margin, padding" }}
            >
              {/* Logo */}
              <div
                ref={logoRef}
                className="flex items-center cursor-pointer"
                onClick={() => handleNavigation("/")}
              >
                <img
                  src={
                    isScrolled
                      ? "https://i.ibb.co/twSFVXyn/Workplan-Blue-LG.png"
                      : "https://i.ibb.co/HfmhhtVt/Workplan-White-LG.png"
                  }
                  alt="Workplan"
                  className={`transition-all duration-500 ease-in-out px-1 ${
                    isScrolled ? "h-14" : "h-16"
                  }`}
                  style={{
                    width: "auto",
                    transitionProperty: "all, max-width, margin, padding",
                  }}
                />
              </div>

              {/* SPACER – håller EXAKT samma gap som i toppläget */}
              {isScrolled ? (
                <div
                  style={{
                    width:
                      measuredGap !== null
                        ? `${measuredGap}px`
                        : "clamp(12rem, 24vw, 32rem)", // fallback om sidan laddas mitt i
                    transition: "width 500ms ease-in-out",
                  }}
                />
              ) : (
                <div className="flex-1" />
              )}

              {/* Desktop Navigation */}
              <nav
                ref={navRef}
                className="hidden lg:flex items-center space-x-8"
              >
                {navigationItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`
                      relative px-3 py-2 text-sm font-medium transition-all duration-300
                      hover:scale-105
                      ${
                        location.pathname === item.href
                          ? isScrolled
                            ? "text-[#08132B]"
                            : "text-white"
                          : isScrolled
                          ? "text-[#08132B]/80 hover:text-[#08132B]"
                          : "text-white/80 hover:text-white"
                      }
                    `}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.label}
                    {location.pathname === item.href && (
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                          isScrolled ? "bg-[#08132B]" : "bg-white"
                        }`}
                      />
                    )}
                  </button>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                  isScrolled
                    ? "text-[#08132B] hover:bg-gray-200/50"
                    : "text-white hover:bg-white/10"
                }`}
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
              {[
                { label: "Jobb", href: "/jobs" },
                { label: "Företag", href: "/partner" },
                { label: "Om Oss", href: "/about" },
                { label: "Kontakt", href: "/contact" },
              ].map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    navigate(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors duration-300
                    ${
                      location.pathname === item.href
                        ? "text-[#08132B] bg-gray-200/70"
                        : "text-[#08132B]/90 hover:text-[#08132B] hover:bg-gray-200/50"
                    }
                  `}
                  style={{ fontFamily: "Inter, sans-serif" }}
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

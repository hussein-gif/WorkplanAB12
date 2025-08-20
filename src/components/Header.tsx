import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Smooth scroll state med hysteres ---
  const [isScrolled, setIsScrolled] = useState(false);
  const scrolledRef = useRef(isScrolled);
  useEffect(() => {
    scrolledRef.current = isScrolled;
  }, [isScrolled]);

  useEffect(() => {
    // Smooth hysteresis with reduced thresholds
    const ENTER_THRESHOLD = 20; // px
    const EXIT_THRESHOLD = 8;   // px
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const cur = scrolledRef.current;
          if (!cur && y > ENTER_THRESHOLD) {
            setIsScrolled(true);
          } else if (cur && y < EXIT_THRESHOLD) {
            setIsScrolled(false);
          }
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // init
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Refs för att mäta “topp-gapet” (logga -> nav)
  const logoRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const [measuredGap, setMeasuredGap] = useState<number | null>(null);

  // Mät gap i topp-läget (vi rör inte denna logik)
  useEffect(() => {
    const measureGap = () => {
      if (isScrolled) return; // mät endast i topp-läget
      const l = logoRef.current?.getBoundingClientRect();
      const n = navRef.current?.getBoundingClientRect();
      if (l && n) {
        const gap = Math.max(0, n.left - l.right);
        setMeasuredGap(gap);
      }
    };
    measureGap();
    window.addEventListener("resize", measureGap);
    return () => window.removeEventListener("resize", measureGap);
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
        {/* Smooth wrapper with minimal top margin */}
        <div 
          className={`transition-all duration-300 ease-out ${
            isScrolled ? "mt-4 flex justify-center" : ""
          }`}
        >
          {/* Full width when not scrolled; centered chip when scrolled */}
          <div
            className={`pointer-events-auto transition-all duration-300 ease-out ${
              isScrolled
                ? "inline-block rounded-xl"
                : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
            }`}
          >
            {/* Background layer with smooth fade */}
            <div
              className={`${
                isScrolled
                  ? "bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl"
                  : "bg-transparent border border-transparent shadow-none"
              } rounded-xl transition-all duration-300 ease-out`}
            >
              {/* Inner row with smooth height transition */}
              <div
                className={`flex items-center ${
                  isScrolled ? "h-16 px-6" : "h-20"
                } transition-all duration-300 ease-out`}
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
                    className={`${
                      isScrolled ? "h-10" : "h-16"
                    } px-1 transition-all duration-300 ease-out`}
                    style={{ width: "auto" }}
                  />
                </div>

                {/* Spacer with smooth transition */}
                {isScrolled ? (
                  <div
                    style={{
                      width:
                        measuredGap !== null
                          ? `${measuredGap * 0.8}px`
                          : "clamp(8rem, 20vw, 24rem)",
                      transition: "width 300ms ease-out",
                    }}
                  />
                ) : (
                  <div className="flex-1" />
                )}

                {/* Desktop Navigation */}
                <nav ref={navRef} className="hidden lg:flex items-center space-x-8">
                  {navigationItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href)}
                      className={`
                        relative px-3 py-2 text-sm font-medium transition-all duration-200 ease-out
                        hover:scale-105 active:scale-95
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
                  className={`lg:hidden p-2 rounded-lg ${
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
        </div>
      </header>

      {/* Mobile Menu with smooth transitions */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-200 ease-out"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-4 left-3 right-3 bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-xl rounded-xl overflow-hidden transition-all duration-200 ease-out">
            <div className="px-4 py-4 flex items-center justify-between transition-all duration-200 ease-out">
              <div className="flex items-center">
                <img
                  src="https://i.ibb.co/twSFVXyn/Workplan-Blue-LG.png"
                  alt="Workplan"
                  className="h-10 w-auto px-1 transition-all duration-200 ease-out"
                />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-[#08132B] hover:bg-gray-200/50 transition-all duration-200 ease-out"
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
                    block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ease-out
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

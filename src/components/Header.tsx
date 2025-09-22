import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- Mobilmeny ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Scroll state med hysteres (stabil, glitchfri) ---
  const [isScrolled, setIsScrolled] = useState(false);
  const scrolledRef = useRef(isScrolled);
  useEffect(() => { scrolledRef.current = isScrolled; }, [isScrolled]);

  useEffect(() => {
    const ENTER_THRESHOLD = 28; // px
    const EXIT_THRESHOLD = 12;  // px
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const cur = scrolledRef.current;
          if (!cur && y > ENTER_THRESHOLD) setIsScrolled(true);
          else if (cur && y < EXIT_THRESHOLD) setIsScrolled(false);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- Force mörka färger via <html class="force-nav-dark"> ---
  const [forceDarkColors, setForceDarkColors] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setForceDarkColors(el.classList.contains("force-nav-dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const isDarkTheme = forceDarkColors || isScrolled;

  // --- Mät gap mellan logga och nav i toppläget (behålls, men används inte när vi scrollat) ---
  const logoRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const [measuredGap, setMeasuredGap] = useState<number | null>(null);
  const gapRef = useRef<number | null>(null);

  useEffect(() => {
    let rafId: number | null = null;
    const measureGap = () => {
      if (isScrolled) return;
      const l = logoRef.current?.getBoundingClientRect();
      const n = navRef.current?.getBoundingClientRect();
      if (l && n) {
        const next = Math.max(0, n.left - l.right);
        if (gapRef.current !== next) {
          gapRef.current = next;
          setMeasuredGap(next);
        }
      }
    };
    const onResize = () => {
      if (rafId == null) {
        rafId = requestAnimationFrame(() => {
          rafId = null;
          measureGap();
        });
      }
    };
    measureGap();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isScrolled]);

  const navigationItems = useMemo(
    () => [
      { label: "Jobb", href: "/jobs" },
      { label: "Företag", href: "/partner" },
      { label: "Om Oss", href: "/about" },
      { label: "Kontakt", href: "/contact" },
    ],
    []
  );

  const handleNavigation = useCallback(
    (href: string) => {
      navigate(href);
      setIsMobileMenuOpen(false);
    },
    [navigate]
  );

  return (
    <>
      {/* NYTT: dölj hela headern på mobil när mobilmenyn är öppen */}
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] pointer-events-none ${isMobileMenuOpen ? "hidden lg:block" : ""}`}
      >
        {/* Wrapper – liten top-marg när scrolled */}
        <div className={`${isScrolled ? "mt-3 sm:mt-4" : ""} transition-all duration-300 ease-in-out`}>
          {/* Container – ALLTID samma bredd, centrerad */}
          <div
            className={`pointer-events-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full transition-all duration-300 ease-in-out`}
            style={{ willChange: "opacity, transform" }}
          >
            {/* Bakgrund/ruta – visas endast när scrolled, men behåller samma container-bredd */}
            <div
              className={`${isScrolled
                  ? "bg-white/90 backdrop-blur-md border border-gray-200/60 shadow-lg"
                  : "bg-transparent border border-transparent shadow-none"
                } rounded-2xl transition-all duration-300 ease-in-out transform-gpu`}
            >
              {/* Inre rad – liten höjdtransition */}
              <div
                className={`flex items-center ${isScrolled ? "h-[72px] px-6" : "h-20"} transition-all duration-300 ease-in-out`}
                style={{ willChange: "height" }}
              >
                {/* Logo */}
                <div
                  ref={logoRef}
                  className="flex items-center cursor-pointer"
                  onClick={() => handleNavigation("/")}
                >
                  <img
                    src={isDarkTheme
                      ? "https://i.ibb.co/twSFVXyn/Workplan-Blue-LG.png"
                      : "https://i.ibb.co/HfmhhtVt/Workplan-White-LG.png"}
                    alt="Workplan"
                    className={`${isScrolled ? "h-14" : "h-16"} px-1 transition-all duration-300 ease-in-out`}
                    style={{ width: "auto", willChange: "height" }}
                    decoding="async"
                    width={224}  /* hint för layout; påverkar inte den responsiva höjden */
                    height={56}
                    draggable={false}
                  />
                </div>

                {/* SPACER – alltid flex-1 så nav ligger kvar till höger även i chip-läge */}
                <div className="flex-1 transition-all duration-300 ease-in-out" />

                {/* Desktop Navigation */}
                <nav ref={navRef} className="hidden lg:flex items-center space-x-8">
                  {navigationItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href)}
                      className={`
                        relative px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:scale-105
                        ${location.pathname === item.href
                          ? isDarkTheme ? "text-[#08132B]" : "text-white"
                          : isDarkTheme ? "text-[#08132B]/80 hover:text-[#08132B]" : "text-white/80 hover:text-white"
                        }
                      `}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {item.label}
                      {location.pathname === item.href && (
                        <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${isDarkTheme ? "bg-[#08132B]" : "bg-white"} transition-all duration-300 ease-in-out`} />
                      )}
                    </button>
                  ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen((v) => !v)}
                  className={`lg:hidden p-2 rounded-lg transition-all duration-300 ease-in-out ${
                    isDarkTheme ? "text-[#08132B] hover:bg-gray-200/50" : "text-white hover:bg-white/10"
                  }`}
                  aria-expanded={isMobileMenuOpen}
                  aria-label="Meny"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
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
          <div className="fixed top-4 left-3 right-3 bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 ease-in-out transform-gpu">
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src="https://i.ibb.co/twSFVXyn/Workplan-Blue-LG.png"
                  alt="Workplan"
                  className="h-14 w-auto px-1"
                  decoding="async"
                  width={224}
                  height={56}
                  draggable={false}
                />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-[#08132B] hover:bg-gray-200/50 transition-all duration-300 ease-in-out"
                aria-label="Stäng meny"
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
                    block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ease-in-out
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
});

export default Header;

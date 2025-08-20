import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [forceDark, setForceDark] = useState(false);
  const [measuredGap, setMeasuredGap] = useState<number | null>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // force-dark state via <html>.classList
  useEffect(() => {
    const el = document.documentElement;
    const update = () =>
      setForceDark(el.classList.contains("force-nav-dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // measure gap between logo and links
  useEffect(() => {
    if (logoRef.current && linksRef.current) {
      const logoRect = logoRef.current.getBoundingClientRect();
      const linksRect = linksRef.current.getBoundingClientRect();
      const gap = linksRect.left - logoRect.right;
      setMeasuredGap(gap);
    }
  }, []);

  const effectiveScrolled = forceDark ? true : isScrolled;

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div
        className={`${
          effectiveScrolled ? "mt-3 sm:mt-4 flex justify-center" : ""
        }`}
      >
        <div
          className={`pointer-events-auto ${
            effectiveScrolled
              ? "inline-block rounded-2xl"
              : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
          }`}
        >
          <div
            className={`${
              effectiveScrolled
                ? "bg-white/90 backdrop-blur-md border border-gray-200/60 shadow-lg"
                : "bg-transparent border border-transparent shadow-none"
            } rounded-2xl transition-[opacity,background-color,backdrop-filter,box-shadow,border-color] duration-300 ease-in-out`}
          >
            <div
              className={`flex items-center ${
                effectiveScrolled ? "h-[72px] px-6" : "h-20"
              } transition-[height] duration-300 ease-in-out`}
            >
              <img
                ref={logoRef}
                src={
                  effectiveScrolled
                    ? "https://i.ibb.co/twSFVXyn/Workplan-Blue-LG.png"
                    : "https://i.ibb.co/HfmhhtVt/Workplan-White-LG.png"
                }
                alt="Logo"
                className={`${
                  effectiveScrolled ? "h-14" : "h-16"
                } px-1 transition-[height] duration-300 ease-in-out`}
              />

              {effectiveScrolled ? (
                <div
                  style={{
                    width:
                      measuredGap != null
                        ? `${measuredGap * 0.9}px`
                        : "clamp(12rem, 24vw, 32rem)",
                    transition: "width 300ms ease-in-out",
                  }}
                />
              ) : (
                <div className="flex-1" />
              )}

              <div
                ref={linksRef}
                className="flex space-x-8 text-[15px] font-medium"
              >
                <Link
                  to="/jobs"
                  className={`transition-colors duration-300 ${
                    effectiveScrolled
                      ? "text-gray-800 hover:text-gray-600"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  Jobb
                </Link>
                <Link
                  to="/companies"
                  className={`transition-colors duration-300 ${
                    effectiveScrolled
                      ? "text-gray-800 hover:text-gray-600"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  Företag
                </Link>
                <Link
                  to="/about"
                  className={`transition-colors duration-300 ${
                    effectiveScrolled
                      ? "text-gray-800 hover:text-gray-600"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  Om Oss
                </Link>
                <Link
                  to="/contact"
                  className={`transition-colors duration-300 ${
                    effectiveScrolled
                      ? "text-gray-800 hover:text-gray-600"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  Kontakt
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Linkedin, Instagram, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Parallax-optimering via CSS-variabler
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const root = footerRef.current;
    if (!root) return;
    const mx = (e.clientX / window.innerWidth - 0.5) * 100;
    const my = (e.clientY / window.innerHeight - 0.5) * 100;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      root.style.setProperty("--mx", String(mx));
      root.style.setProperty("--my", String(my));
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const jobLinks = [
    { label: "För jobbsökande", href: "/for-candidates" },
    { label: "Alla jobb", href: "/jobs" },
  ];
  const employerLinks = [
    { label: "För företag", href: "/partner" },
    { label: "Läs mer", href: "/services" }, // ersatt Om oss → Läs mer
  ];
  const aboutLinks = [
    { label: "Om oss", href: "/about" },
    // borttagit Läs mer här
    { label: "Kontakta oss", href: "/contact" },
  ];
  const legalLinks = [
    { label: "Integritetspolicy", href: "/privacy" },
    { label: "Användarvillkor", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ];
  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/workplan-ab/",
      label: "LinkedIn",
      color: "hover:bg-blue-600",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/workplan_ab/",
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#08132B",
        contentVisibility: "auto",
        containIntrinsicSize: "1px 800px",
        ["--mx" as any]: 0,
        ["--my" as any]: 0,
      }}
      onPointerMove={onPointerMove}
    >
      {/* Bakgrund */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-24 w-[40rem] h-[40rem] rounded-full opacity-[0.08] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(59,130,246,0.25), transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-16 w-[36rem] h-[36rem] rounded-full opacity-[0.06] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(16,185,129,0.22), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            transform:
              "translate(calc(var(--mx) * 0.01px), calc(var(--my) * 0.01px))",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Brand & Social */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.ibb.co/HfmhhtVt/Workplan-White-LG.png"
                    alt="Workplan logotyp"
                    className="h-10 md:h-12 lg:h-14 w-auto object-contain"
                    draggable={false}
                    loading="lazy"
                  />
                  <h3
                    className="text-white text-2xl md:text-3xl tracking-tight"
                    style={{
                      fontFamily: "Zen Kaku Gothic Antique, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Workplan
                  </h3>
                </div>

                {/* Social + mobil-pil */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          group relative w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm
                          flex items-center justify-center
                          border border-white/20 ${social.color}
                          transition-all duration-300 hover:scale-110 hover:border-white/40
                          overflow-hidden
                        `}
                      >
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <social.icon
                          size={16}
                          className="relative z-10 text-white/80 group-hover:text-white transition-colors"
                        />
                      </a>
                    ))}
                  </div>

                  {/* Mobil: pil */}
                  <button
                    onClick={scrollToTop}
                    aria-label="Till toppen"
                    className="ml-auto sm:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/40 transition-all duration-300"
                  >
                    <ArrowUp size={18} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {/* Hitta ett jobb */}
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span>Hitta ett jobb</span>
                </h4>
                <nav className="space-y-3">
                  {jobLinks.map((link, index) => (
                    <a
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(link.href);
                      }}
                      className="block text-white/70 hover:text-white font-light transition-all duration-300 hover:translate-x-2 relative group cursor-pointer"
                      onMouseEnter={() => setIsHovered(`job-${index}`)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <div
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-0 h-4 bg-blue-500 rounded-r-full transition-all duration-300 ${
                          isHovered === `job-${index}` ? "w-1" : ""
                        }`}
                      />
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* För arbetsgivare */}
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span>För arbetsgivare</span>
                </h4>
                <nav className="space-y-3">
                  {employerLinks.map((link, index) => (
                    <a
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(link.href);
                      }}
                      className="block text-white/70 hover:text-white font-light transition-all duration-300 hover:translate-x-2 relative group cursor-pointer"
                      onMouseEnter={() => setIsHovered(`employer-${index}`)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <div
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-0 h-4 bg-emerald-500 rounded-r-full transition-all duration-300 ${
                          isHovered === `employer-${index}` ? "w-1" : ""
                        }`}
                      />
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Om oss */}
              <div className="space-y-6 col-span-2 sm:col-span-1">
                <h4 className="text-lg font-medium text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  <span>Om oss</span>
                </h4>
                <nav className="space-y-3">
                  {aboutLinks.map((link, index) => (
                    <a
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(link.href);
                      }}
                      className="block text-white/70 hover:text-white font-light transition-all duration-300 hover:translate-x-2 relative group cursor-pointer"
                      onMouseEnter={() => setIsHovered(`about-${index}`)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <div
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-0 h-4 bg-purple-500 rounded-r-full transition-all duration-300 ${
                          isHovered === `about-${index}` ? "w-1" : ""
                        }`}
                      />
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 py-8 mt-2 relative">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Juridiska länkar */}
              <div className="flex flex-wrap items-center gap-6 order-1">
                {legalLinks.map((link, index) => (
                  <a
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.href.startsWith("/")) navigate(link.href);
                      else window.location.href = link.href;
                    }}
                    className="text-white/70 hover:text-white text-sm font-light transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <p className="text-white/70 font-light order-2 lg:order-none">
                © 2025 Workplan AB. Alla rättigheter förbehållna.
              </p>

              {/* Desktop: pil */}
              <button
                onClick={scrollToTop}
                aria-label="Till toppen"
                className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/40 transition-all duration-300"
              >
                <ArrowUp size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* Dekorativ bottenaccent */}
          <div className="pb-8">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="flex gap-2">
                <div className="w-1 h-1 bg-blue-400 rounded-full" />
                <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                <div className="w-1 h-1 bg-purple-400 rounded-full" />
              </div>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

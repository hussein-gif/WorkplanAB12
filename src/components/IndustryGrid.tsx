import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import { Truck, CheckCircle, Clock, Shield } from "lucide-react";

/* =========================
   KONSTANTER – utanför komponenten
   ========================= */
const TRUST_PILLARS = [
  {
    icon: Truck,
    title: "Djup Branschkännedom",
    description: "Vårt team förstår era unika behov inom lager och logistik.",
    highlight: "Specialister på ert område",
    glowColor: "rgba(59, 130, 246, 0.2)",
  },
  {
    icon: CheckCircle,
    title: "Noggrann Screening",
    description: "Vi genomför strukturerade kompetens- och bakgrundskontroller.",
    highlight: "Trygg matchning",
    glowColor: "rgba(59, 130, 246, 0.2)",
  },
  {
    icon: Clock,
    title: "Snabb Respons",
    description: "Omedelbar återkoppling för att hålla er bemanning i rörelse.",
    highlight: "Snabbt igångsättande",
    glowColor: "rgba(59, 130, 246, 0.2)",
  },
  {
    icon: Shield,
    title: "Säkerhet & Kvalitet",
    description:
      "Certifierade medarbetare med fokus på trygghet och kvalitet i varje uppdrag.",
    highlight: "Hög leveranskvalitet",
    glowColor: "rgba(59, 130, 246, 0.2)",
  },
] as const;

/* =========================
   DELKOMPONENTER – memo
   ========================= */
type Pillar = (typeof TRUST_PILLARS)[number];

const DesktopCard = memo(function DesktopCard({
  pillar,
  index,
  flexGrow,
}: {
  pillar: Pillar;
  index: number;
  flexGrow: number;
}) {
  return (
    <div
      className={`relative flex transition-all duration-1000 transform
        translate-y-8 opacity-0 data-[show=true]:translate-y-0 data-[show=true]:opacity-100`}
      style={{ transitionDelay: `${600 + index * 150}ms`, flex: flexGrow }}
      data-show="false"
    >
      <div
        className={`
          group relative flex-1 flex flex-col p-6 rounded-2xl overflow-hidden
          bg-white/30 backdrop-blur-2xl border border-blue-50/40
          transition-all duration-300 ease-out min-h-[260px]
          hover:scale-[1.01]
          shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)]
          hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.25)]
        `}
        style={{ cursor: "default" }}
      >
        {/* Glow (CSS hover, ingen state) */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${pillar.glowColor} 0%, transparent 70%)`,
          }}
        />

        {/* Ikonruta */}
        <div
          className="relative w-14 h-14 rounded-xl mb-4 flex items-center justify-center shadow-lg flex-shrink-0"
          style={{
            background: "linear-gradient(180deg, #1A3D73 0%, #0B274D 70%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -10px 16px rgba(0,0,0,0.35), 0 10px 24px rgba(11,39,77,0.28)",
          }}
        >
          <span
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 40%)",
              mixBlendMode: "overlay",
            }}
          />
          <pillar.icon size={24} className="text-white relative" />
        </div>

        {/* Innehåll */}
        <div className="relative z-10 flex-1 flex flex-col justify-between">
          <div>
            <h3
              className="text-lg tracking-tight leading-tight mb-1 font-medium"
              style={{ fontFamily: "Zen Kaku Gothic Antique, sans-serif", color: "#000" }}
            >
              {pillar.title}
            </h3>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 300, color: "#000" }}
            >
              {pillar.description}
            </p>
          </div>
          <div
            className="text-xs uppercase tracking-wider mt-2"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, color: "#6B7280" }}
          >
            {pillar.highlight}
          </div>
        </div>
      </div>
    </div>
  );
});

const MobileCard = memo(function MobileCard({ pillar, index }: { pillar: Pillar; index: number }) {
  return (
    <div
      className="relative transition-all duration-300 opacity-0 translate-y-2 data-[show=true]:opacity-100 data-[show=true]:translate-y-0"
      style={{ transitionDelay: `${350 + index * 100}ms` }}
      data-show="false"
    >
      <div
        className="rounded-xl bg-white/85 backdrop-blur-sm border border-black/5 shadow-sm px-4 py-5"
        style={{ cursor: "default" }}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <h3
              className="text-[17px] font-semibold leading-snug truncate mb-1"
              style={{ fontFamily: "Zen Kaku Gothic Antique, sans-serif", color: "#0B1424" }}
              title={pillar.title}
            >
              {pillar.title}
            </h3>
          </div>
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow"
            style={{
              background: "linear-gradient(180deg, #1A3D73 0%, #0B274D 70%)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <pillar.icon size={18} className="text-white" />
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent my-3" />

        <p
          className="text-[14px] leading-6 text-gray-700"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
        >
          {pillar.description}
        </p>
      </div>
    </div>
  );
});

/* =========================
   HUVUDKOMPONENT
   ========================= */
const IndustryGrid = () => {
  const [isVisible, setIsVisible] = useState(false); // endast för introscener
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // IO för att (1) trigga intro, (2) pausa bakgrundsanimationer off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const onScreen = entry.isIntersecting;
        if (onScreen) setIsVisible(true);
        el.toggleAttribute("data-animate", onScreen); // styr CSS
        // applicera show på barn som har data-show
        el.querySelectorAll<HTMLElement>("[data-show]").forEach((n) => n.setAttribute("data-show", String(onScreen)));
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Parallax utan React-state: uppdatera CSS-variabler via rAF
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const root = sectionRef.current;
    if (!root) return;
    const r = root.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const mx = (px - 0.5) * 100; // -50..50
    const my = (py - 0.5) * 100;

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

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 overflow-hidden"
      onPointerMove={onPointerMove}
      data-animate="false"
      style={
        {
          ["--mx" as any]: 0,
          ["--my" as any]: 0,
        } as React.CSSProperties
      }
    >
      <style>{`
        @keyframes softPulse {
          0%,100% { opacity: 0.02; transform: scale(1) translate(0,0); }
          50% { opacity: 0.04; transform: scale(1.01) translate(2px, -2px); }
        }
        @keyframes slowFloatLarge {
          0% { transform: translate(0,0) scale(1); }
          50% { transform: translate(8px, -8px) scale(1.02); }
          100% { transform: translate(0,0) scale(1); }
        }
        /* Pausa allt när off-screen */
        [data-animate="false"] .anim { animation-play-state: paused !important; }
        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .anim { animation: none !important; }
        }
      `}</style>

      {/* Bakgrund */}
      <div className="absolute inset-0">
        {/* Basgradient */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #ffffff 0%, #f0f5fa 55%, #ffffff 100%)" }}
        />

        {/* Diagonalt mönster */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 12px)",
          }}
        />

        {/* Ljuspunkt + puls */}
        <div
          className="absolute inset-0 pointer-events-none anim"
          style={{
            background:
              "radial-gradient(circle at 45% 40%, rgba(255,255,255,0.5) 0%, transparent 65%)",
            mixBlendMode: "overlay",
            animation: "softPulse 25s ease-in-out infinite",
          }}
        />

        {/* Blobbar (desktop synliga) */}
        <div
          className="absolute -left-32 top-10 w-[420px] h-[420px] rounded-full opacity-0 sm:opacity-30 blur-3xl anim"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.12) 0%, transparent 60%)",
            animation: "slowFloatLarge 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-1/4 bottom-20 w-[360px] h-[360px] rounded-full opacity-0 sm:opacity-25 blur-3xl anim"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, rgba(125,211,252,0.1) 0%, transparent 60%)",
            animation: "slowFloatLarge 30s ease-in-out infinite",
            animationDelay: "5s",
          }}
        />
        <div
          className="absolute left-1/3 bottom-10 w-[300px] h-[300px] rounded-full opacity-0 sm:opacity-20 blur-3xl anim"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(219,234,254,0.08) 0%, transparent 70%)",
            animation: "slowFloatLarge 22s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />

        {/* Parallax-orbs (via CSS-variabler, inga re-renders) */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-0 sm:opacity-[0.04] blur-3xl transition-transform duration-300"
          style={{
            background: `radial-gradient(circle, #1e40af 0%, #3b82f6 30%, transparent 70%)`,
            left: "calc(50% + (var(--mx) * 0.6%))",
            top: "calc(40% + (var(--my) * 0.4%))",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-0 sm:opacity-[0.03] blur-3xl transition-transform duration-300"
          style={{
            background: `radial-gradient(circle, #0f766e 0%, #14b8a6 30%, transparent 70%)`,
            right: "calc(10% + (var(--mx) * 0.4%))",
            bottom: "calc(10% + (var(--my) * 0.6%))",
            transform: "translate(50%, 50%)",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-0 sm:opacity-[0.02] blur-3xl transition-transform duration-300"
          style={{
            background: `radial-gradient(circle, #7c3aed 0%, #a855f7 30%, transparent 70%)`,
            left: "calc(50% + (var(--mx) * 0.2%))",
            top: "calc(30% + (var(--my) * 0.2%))",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Grid-parallax (svag) */}
        <div
          className="absolute inset-0 opacity-0 sm:opacity-[0.02] transition-transform duration-300"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            transform:
              "translate(calc(var(--mx) * 0.1px), calc(var(--my) * 0.1px))",
          }}
        />
        <div
          className="absolute inset-0 opacity-0 sm:opacity-[0.015] transition-transform duration-300"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(59,130,246,0.035) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(99,102,241,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
            transform:
              "translate(calc(var(--mx) * -0.05px), calc(var(--my) * -0.05px))",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1040px] mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className={`text-4xl md:text-5xl mb-4 tracking-tight
              transition-all duration-1000 delay-200 transform
              ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            style={{ fontFamily: "Zen Kaku Gothic Antique, sans-serif", fontWeight: 400, color: "#000" }}
          >
            <span className="block font-medium">Vår Expertis Inom</span>
            <span className="block font-medium">Logistikbemanning</span>
          </h2>
          <div
            className={`w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-4
              transition-all duration-1000 delay-200 transform
              ${isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
          />
          <p
            className={`text-lg max-w-2xl mx-auto leading-snug font-light
              transition-all duration-1000 delay-400 transform
              ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            style={{ fontFamily: "Inter, sans-serif", color: "#000", marginTop: "0.125rem" }}
          >
            Djup branschkunskap och noggrant urval för att matcha rätt kompetens med ert team.
          </p>
        </div>

        {/* Mobil */}
        <div className="grid grid-cols-1 gap-4 sm:hidden">
          {TRUST_PILLARS.map((p, i) => (
            <MobileCard key={i} pillar={p} index={i} />
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden sm:flex flex-col gap-2 relative">
          <div
            className="absolute left-1/2 top-1/2 w-[520px] h-[520px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 sm:opacity-100"
            style={{
              filter: "blur(80px)",
              background:
                "radial-gradient(circle at 50% 50%, rgba(125,211,252,0.2) 0%, rgba(59,130,246,0.15) 50%, transparent 85%)",
              mixBlendMode: "screen",
            }}
          />
          <div className="flex gap-2">
            <DesktopCard pillar={TRUST_PILLARS[0]} index={0} flexGrow={1.2} />
            <DesktopCard pillar={TRUST_PILLARS[1]} index={1} flexGrow={1.8} />
          </div>
          <div className="flex gap-2">
            <DesktopCard pillar={TRUST_PILLARS[2]} index={2} flexGrow={1.8} />
            <DesktopCard pillar={TRUST_PILLARS[3]} index={3} flexGrow={1.2} />
          </div>
        </div>

        {/* Dots */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-1200 transform
            ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <div className="inline-flex items-center space-x-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <div className="flex space-x-1.5">
              <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
              <div className="w-1 h-1 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: "600ms" }} />
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "900ms" }} />
            </div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryGrid;

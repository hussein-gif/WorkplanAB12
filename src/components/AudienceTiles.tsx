import React, { useEffect, useMemo, useRef, useState, memo, useCallback } from "react";
import { User, Briefcase, ArrowRight, Sparkles, Target, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

/** ---------- KONSTANTER (flyttade utanför) ---------- */
const AUDIENCES = [
  {
    id: "candidates",
    icon: User,
    accentIcon: Target,
    title: "För",
    subtitle: "Kandidater",
    description:
      "Lås upp din potential med kurerade möjligheter som stämmer överens med dina ambitioner och värderingar.",
    features: ["Personlig Matchning", "Karriäracceleration", "Premium Nätverk"],
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
  },
  {
    id: "clients",
    icon: Briefcase,
    accentIcon: Zap,
    title: "För",
    subtitle: "Företag",
    description:
      "Prioriterad matchning – Vi lägger extra fokus på att snabbt identifiera och kontakta rätt kandidater för era behov.",
    features: ["Snabb Sourcing", "Kvalitetssäkring", "Strategiskt Partnerskap"],
    gradient: "from-teal-500 via-emerald-600 to-green-700",
  },
] as const;

const STARS = [
  { left: "12%", top: "18%", size: 2, delay: "0s", color: "#ffffff", opacity: 0.12 },
  { left: "80%", top: "25%", size: 1.5, delay: "1s", color: "#d1ddff", opacity: 0.08 },
  { left: "45%", top: "60%", size: 1.8, delay: "2s", color: "#8fcfff", opacity: 0.1 },
  { left: "30%", top: "40%", size: 1.2, delay: "0.5s", color: "#a0bfff", opacity: 0.07 },
  { left: "65%", top: "10%", size: 2.5, delay: "1.5s", color: "#c5e8ff", opacity: 0.09 },
] as const;

/** ---------- HJÄLP ---------- */
type Vec2 = { x: number; y: number };

/** ---------- CARD (memo) ---------- */
const AudienceCard = memo(function AudienceCard({
  audience,
  index,
  isVisible,
  isMobile,
  onNavigate,
}: {
  audience: typeof AUDIENCES[number];
  index: number;
  isVisible: boolean;
  isMobile: boolean;
  onNavigate: () => void;
}) {
  // Vi tiltar BARA en dekorations-layer, inte hela kortet
  const tiltLayerRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(false);
  const targetRot = useRef<Vec2>({ x: 0, y: 0 });
  const rot = useRef<Vec2>({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  const animate = useCallback(() => {
    const el = tiltLayerRef.current;
    if (!el) return;
    const lerp = 0.12;
    rot.current.x += (targetRot.current.x - rot.current.x) * lerp;
    rot.current.y += (targetRot.current.y - rot.current.y) * lerp;
    // mild rotation – påverkar bara dekor; text ligger i separat icke-transformerad container
    el.style.transform = isMobile
      ? ""
      : `perspective(1000px) rotateX(${rot.current.x}deg) rotateY(${rot.current.y}deg)`;
    if (
      Math.abs(rot.current.x - targetRot.current.x) > 0.01 ||
      Math.abs(rot.current.y - targetRot.current.y) > 0.01
    ) {
      rafId.current = requestAnimationFrame(animate);
    } else {
      rafId.current = null;
    }
  }, [isMobile]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isMobile || !activeRef.current) return;
      const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      targetRot.current = { x: -(py - 0.5) * 10, y: (px - 0.5) * 10 };
      if (!rafId.current) rafId.current = requestAnimationFrame(animate);
    },
    [animate, isMobile]
  );

  const onEnter = useCallback(() => {
    activeRef.current = true;
  }, []);
  const onLeave = useCallback(() => {
    activeRef.current = false;
    targetRot.current = { x: 0, y: 0 };
    if (!rafId.current) rafId.current = requestAnimationFrame(animate);
  }, [animate]);

  return (
    <div
      className={`relative transition-all duration-1000 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${800 + index * 300}ms` }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onPointerMove={onPointerMove}
    >
      {/* YTTERKORT – INGEN transform här => texten förblir knivskarp */}
      <div
        className={`
          relative rounded-2xl sm:rounded-3xl overflow-hidden
          bg-white/5 backdrop-blur-2xl
          border border-white/15
          transition-[box-shadow] duration-300 ease-out cursor-pointer
          min-h-[420px] sm:h-[600px]
          shadow-[0_16px_40px_-6px_rgba(0,0,0,0.35)]
        `}
        onClick={onNavigate}
      >
        {/* TILT-LAYER – ligger ovanför och innehåller enbart dekor som får roteras */}
        <div
          ref={tiltLayerRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          aria-hidden="true"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Header + highlights som tidigare */}
          <div
            className={`absolute left-0 right-0 top-0 h-36 sm:h-48 overflow-hidden bg-gradient-to-br ${audience.gradient}`}
            style={{ transform: "translateZ(1px)" }}
          >
            <Sparkles size={12} className="absolute top-8 left-8 text-white/45" />
            <Sparkles size={8} className="absolute bottom-8 right-12 text-white/30" />
            {/* Accent cirklar */}
            <div className="absolute top-8 right-8 w-20 h-20 border border-white/25 rounded-full opacity-70" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border border-white/30 rounded-full opacity-70" />
          </div>
        </div>

        {/* HEADER-INNEHÅLL – statiskt (ingen transform) */}
        <div className={`relative h-36 sm:h-48 flex items-center justify-center overflow-hidden bg-gradient-to-br ${audience.gradient}`}>
          <div
            className={`
              relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/15 backdrop-blur-sm
              flex items-center justify-center transition-all duration-500 shadow-lg
            `}
          >
            <audience.icon size={isMobile ? 32 : 40} className="text-white" />
          </div>

          <div
            className={`
              absolute top-4 right-4 sm:top-6 sm:right-6 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 backdrop-blur-sm
              flex items-center justify-center transition-all duration-500 delay-100
            `}
          >
            <audience.accentIcon size={isMobile ? 14 : 16} className="text-white/80" />
          </div>
        </div>

        {/* BODY – text är 100% skarp */}
        <div className="relative p-6 sm:p-8 flex flex-col" style={{ WebkitFontSmoothing: "antialiased" }}>
          <div style={{ marginBottom: "0.2rem" }}>
            <h3 className="uppercase text-[#A0BFFF] tracking-[0.08em] text-sm sm:text-base m-0" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
              {audience.title}
            </h3>
            <h4 className="text-white font-medium text-2xl sm:text-3xl mt-1" style={{ fontFamily: "Zen Kaku Gothic Antique, sans-serif" }}>
              {audience.subtitle}
            </h4>
          </div>

          <p className="text-[#CBD5E1] text-[15px] leading-7 sm:text-base sm:leading-7 max-w-[36ch] mb-4" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
            {audience.description}
          </p>

          <div className="hidden sm:block space-y-3 mb-8 flex-1">
            {audience.features.map((feature) => (
              <div key={feature} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${audience.gradient} flex-shrink-0`} />
                <span className="text-[#E2E8F0]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="absolute left-6 right-6 bottom-6 sm:left-auto sm:right-6">
          <button
            className={`
              group w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl
              bg-gradient-to-r ${audience.gradient} text-white
              shadow-lg hover:shadow-xl transition-transform duration-200
              hover:scale-105 active:scale-95 overflow-hidden font-medium
              flex items-center gap-2 relative
            `}
            style={{ fontFamily: "Inter, sans-serif" }}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate();
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            <span className="relative z-10">{audience.id === "candidates" ? "Utforska Jobb" : "Bli Partner"}</span>
            <ArrowRight size={16} className="relative z-10 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
});

/** ---------- HUVUD-KOMP ---------- */
const AudienceTiles = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 639px)").matches;
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef as any} className="relative py-20 sm:py-32 overflow-hidden">
      <style>{`
        @keyframes float-slow { 0%,100% { transform: translate(0,0); } 50% { transform: translate(8px,5px); } }
        .animate-float-slow { animation: float-slow 28s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-float-slow { animation: none !important; }
        }
      `}</style>

      {/* Bakgrund (oförändrad look, men håller “brus” enkelt) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: "#08132B" }} />
        <div
          className="absolute -left-28 -top-28 w-[600px] h-[600px] rounded-full blur-3xl animate-float-slow opacity-30"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(11,39,77,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-1/4 bottom-24 w-[500px] h-[500px] rounded-full blur-3xl animate-float-slow opacity-25"
          style={{
            background: "radial-gradient(circle at 60% 50%, rgba(22,74,128,0.22) 0%, transparent 70%)",
          }}
        />
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${s.size}px`,
              height: `${s.size}px`,
              left: s.left,
              top: s.top,
              backgroundColor: s.color,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Rubrik */}
        <div className="text-center mb-12 sm:mb-20 relative">
          <div
            className="absolute inset-x-0 mx-auto top-0 w-[360px] h-[160px] rounded-full blur-3xl opacity-25"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.3) 0%, transparent 60%)",
              transform: "translateY(-20px)",
            }}
          />
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl mb-6 tracking-tight leading-[1.05] sm:leading-[0.9]
              transition-all duration-700 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ fontFamily: "Zen Kaku Gothic Antique, sans-serif", fontWeight: 400, color: "white" }}
          >
            Välj Din Väg
          </h2>

          <div
            className={`flex items-center justify-center space-x-4 mb-4
              transition-all duration-700 delay-150 transform ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
          >
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="w-2 h-2 bg-white/25 rounded-full" />
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>

          <p
            className={`text-base sm:text-xl max-w-2xl mx-auto leading-relaxed
              transition-all duration-700 delay-200 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.75)" }}
          >
            Flexibel bemanning för kandidater och företag.
          </p>
        </div>

        {/* Kort */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {AUDIENCES.map((audience, index) => (
            <AudienceCard
              key={audience.id}
              audience={audience}
              index={index}
              isVisible={isVisible}
              isMobile={isMobile}
              onNavigate={() => navigate(audience.id === "candidates" ? "/for-candidates" : "/partner")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceTiles;

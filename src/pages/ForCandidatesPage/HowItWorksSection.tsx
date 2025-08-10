import React from "react";
import { ArrowRight, Search, Handshake, Briefcase } from "lucide-react";

interface HowItWorksSectionProps {
  isVisible: boolean;
}

type PieceKind = "arrow-right" | "socket-left" | "both";

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ isVisible }) => {
  const steps: Array<{
    number: string;
    title: string;
    description: string;
    kind: PieceKind;
    icon: React.ReactNode;
  }> = [
    {
      number: "01",
      title: "Steg 1 – Sök & Välj",
      description: "Utforska roller som matchar dina mål och intressen.",
      kind: "arrow-right",
      icon: <Search size={22} />,
    },
    {
      number: "02",
      title: "Steg 2 – Matchning & Intervjuer",
      description:
        "Vi matchar din profil, genomför intervjuer och presenterar dig för arbetsgivaren.",
      kind: "both",
      icon: <Handshake size={22} />,
    },
    {
      number: "03",
      title: "Steg 3 – Starta Ditt Nya Jobb",
      description: "Acceptera erbjudandet och kickstarta nästa kapitel.",
      kind: "socket-left",
      icon: <Briefcase size={22} />,
    },
  ];

  return (
    <section className="relative py-28 px-6 overflow-hidden" aria-label="Så går det till">
      {/* Bakgrund – renare men premium */}
      <div className="absolute inset-0 -z-10">
        {/* mjuk färgdimma */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background:
              "radial-gradient(1200px 600px at 15% 25%, rgba(59,130,246,0.10), transparent 60%),\n               radial-gradient(1000px 700px at 80% 20%, rgba(139,92,246,0.10), transparent 55%),\n               radial-gradient(900px 900px at 70% 80%, rgba(236,72,153,0.08), transparent 50%)",
          }}
        />
        {/* diskret rutnät */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(0deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Innehåll */}
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-black">Så Går Det Till</h2>
          <p className="mt-3 text-black/60 max-w-2xl mx-auto">
            En tydlig process från ansökan till anställning – enkelt och professionellt.
          </p>
        </div>

        {/* Cards – en rad, elegant och responsivt */}
        <div className="relative flex flex-nowrap items-stretch gap-8 md:gap-10 overflow-x-auto md:overflow-visible pb-4">
          {steps.map((s, i) => (
            <FancyCard key={i} {...s} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              const el = document.getElementById("featured-jobs");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-sky-600 via-indigo-600 to-fuchsia-600 shadow-lg shadow-indigo-200/40 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Bläddra bland jobben ovan
            <ArrowRight size={18} />
            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <span className="absolute left-[-50%] top-0 h-full w-1/3 bg-white/30 skew-x-[-20deg] animate-[sheen_1.2s_ease-in-out]"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes sheen { from { transform: translateX(-120%) skewX(-20deg);} to { transform: translateX(220%) skewX(-20deg);} }
        @keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes borderGlow { 0%,100%{opacity:0.45} 50%{opacity:1} }
      `}</style>
    </section>
  );
};

/* ====== Ny, proffsig kortkomponent ====== */

type CardProps = {
  number: string;
  title: string;
  description: string;
  kind: PieceKind;
  icon: React.ReactNode;
  index?: number;
};

const FancyCard: React.FC<CardProps> = ({ number, title, description, kind, icon, index = 0 }) => {
  // kantaccent baserat på "kind" (högerpil / vänsterurtag)
  const edgeAccent = {
    right: kind === "arrow-right" || kind === "both",
    left: kind === "socket-left" || kind === "both",
  };

  return (
    <div className="relative shrink-0 w-[300px] md:w-[340px]">
      {/* Glödande bakgrundsaura */}
      <div
        className="absolute -inset-2 rounded-[28px] blur-xl -z-10"
        style={{
          background:
            "radial-gradient(120px 90px at 15% 20%, rgba(59,130,246,0.25), transparent 60%),\n             radial-gradient(140px 110px at 85% 80%, rgba(236,72,153,0.18), transparent 65%)",
        }}
      />

      {/* Ytterram med gradient-border */}
      <div className="p-[1.25px] rounded-[24px] bg-gradient-to-br from-sky-500/50 via-indigo-500/50 to-fuchsia-500/50">
        {/* Inner card */}
        <div
          className="relative h-[280px] md:h-[320px] rounded-[22px] bg-white/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(2,6,23,0.08)] ring-1 ring-black/5 overflow-hidden group"
        >
          {/* Discret noise + grid for premium texture */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\" viewBox=\"0 0 140 140\"><g fill=\"none\" stroke=\"%23000\" stroke-opacity=\"0.35\" stroke-width=\"0.6\"><path d=\"M0 70h140M70 0v140\"/></g></svg>')",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Gradient corner highlights */}
          <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full blur-2xl opacity-30 bg-sky-500/40" />
          <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full blur-2xl opacity-30 bg-fuchsia-500/40" />

          {/* Edge accents */}
          {edgeAccent.left && (
            <div
              className="absolute left-0 top-0 h-full w-[9px]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(139,92,246,0.0), rgba(139,92,246,0.45), rgba(139,92,246,0.0))",
                boxShadow: "inset -1px 0 0 rgba(0,0,0,0.06)",
              }}
            />
          )}
          {edgeAccent.right && (
            <div
              className="absolute right-0 top-0 h-full w-[14px]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(59,130,246,0.0), rgba(59,130,246,0.55), rgba(236,72,153,0.5), rgba(59,130,246,0.0))",
                clipPath: "polygon(0% 0%, 100% 50%, 0% 100%, 0% 0%)",
                boxShadow: "inset 1px 0 0 rgba(0,0,0,0.05)",
              }}
            />
          )}

          {/* Header rad */}
          <div className="relative flex items-center gap-3 px-6 pt-6">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-sky-500/40 to-fuchsia-500/40 animate-[borderGlow_2.8s_ease-in-out_infinite]" />
              <div className="relative w-11 h-11 rounded-full bg-white/90 ring-1 ring-black/5 grid place-items-center shadow-sm">
                <span className="text-[11px] font-bold tracking-wider text-black/70">{number}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-black/70">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500/15 via-indigo-500/15 to-fuchsia-500/15 ring-1 ring-black/5 grid place-items-center">
                {icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold leading-snug text-black">
                {title}
              </h3>
            </div>
          </div>

          {/* Brödtext */}
          <p className="px-6 mt-4 text-[15px] md:text-base leading-relaxed text-black/70">
            {description}
          </p>

          {/* Footer: progress strip + microdots */}
          <div className="absolute left-6 right-6 bottom-6">
            <div className="h-[3px] rounded-full bg-gradient-to-r from-sky-600/70 via-indigo-600/70 to-fuchsia-600/70" />
            <div className="mt-3 flex items-center gap-2">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full bg-black/15 ${i === (index % 6) ? "scale-110 bg-black/30" : ""}`}
                />
              ))}
            </div>
          </div>

          {/* Hover lift */}
          <div className="absolute inset-0 rounded-[22px] pointer-events-none transition-transform duration-300 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;

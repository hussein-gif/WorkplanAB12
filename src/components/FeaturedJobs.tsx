import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { MapPin, Clock, ArrowRight, Briefcase, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

// Desktop-kort, memoisering för att undvika re-renders
const SimpleHoverCard = memo(function SimpleHoverCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        rounded-2xl transition-all duration-300 ease-out
        hover:scale-105 hover:-translate-y-2 hover:shadow-2xl
        ${className ?? ""}
        group
      `}
    >
      {children}
    </div>
  );
});

// --- Helpers (identiska med JobsList) ---
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const isUrl = (v?: string | null) => !!v && /^https?:\/\//i.test(v || "");

const getOmfattning = (job: any) =>
  job.omfattning ?? job.employment_type ?? "";

const getJobImageUrl = (job: any): string | undefined => {
  if (isUrl(job.company_logo)) return job.company_logo as string;
  if (isUrl(job.companyLogo)) return job.companyLogo as string;
  if (isUrl(job.logo_url)) return job.logo_url as string;
  if (isUrl(job.logoUrl)) return job.logoUrl as string;
  if (isUrl(job.image_url)) return job.image_url as string;
  if (isUrl(job.imageUrl)) return job.imageUrl as string;
  if (isUrl(job.image)) return job.image as string;
  const maybeUrl: string | undefined =
    typeof job.companyLogo === "string" ? job.companyLogo : undefined;
  if (isUrl(maybeUrl)) return maybeUrl;
  return undefined;
};

const getPostedLabel = (job: any): string => {
  const candidates = [
    job.posted_at,
    job.published_at,
    job.created_at,
    job.createdAt,
    job.inserted_at,
    job.updated_at,
    job.posted,
  ].filter(Boolean);

  let postedDate: Date | null = null;
  for (const c of candidates) {
    const d = new Date(c);
    if (!isNaN(d.getTime())) {
      postedDate = d;
      break;
    }
  }

  if (postedDate) {
    const now = new Date();
    let diffMs = now.getTime() - postedDate.getTime();
    if (diffMs < 0) diffMs = 0;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diffMs < 30 * 1000) return "nyss";
    if (diffMs < minute) return "mindre än 1 minut sedan";
    if (diffMs < day) {
      const hrs = Math.floor(diffMs / hour);
      if (diffMs < hour) {
        const mins = Math.floor(diffMs / minute);
        return `${mins} minut${mins === 1 ? "" : "er"} sedan`;
      }
      return `${hrs} timme${hrs === 1 ? "" : "r"} sedan`;
    }
    const days = Math.floor(diffMs / day);
    if (days <= 30) return `${days} dag${days === 1 ? "" : "ar"} sedan`;
    try {
      return postedDate.toLocaleDateString("sv-SE");
    } catch {
      return "";
    }
  }

  if (typeof job.posted === "string" && job.posted.trim()) {
    return job.posted.replace(/^[\s]*[-\u2212]\s*/, "");
    }
  return "";
};
// ---------------------------------------

const FeaturedJobs = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // ✅ Hämta publicerade jobb (max 3)
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("published", true)
        .order("posted_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Featured jobs error:", error);
        setJobs([]);
        return;
      }
      setJobs(data ?? []);
    })();
  }, []);

  // Observer för intro + pausa animationer när offscreen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        const onScreen = e.isIntersecting;
        if (onScreen) setIsVisible(true);
        el.toggleAttribute("data-animate", onScreen);
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Effektiv parallax med rAF + CSS-variabler
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const root = sectionRef.current;
    if (!root) return;
    const r = root.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const mx = (px - 0.5) * 100;
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

  // samma navigering som JobsList
  const goToJob = (job: any) => {
    const idOrSlug = job.slug ?? (job.id != null ? String(job.id) : slugify(job.title ?? ""));
    navigate(`/jobb/${encodeURIComponent(idOrSlug)}`);
  };

  const mobileJobs = jobs.slice(0, 3);

  return (
    <>
      <style>{`
        @keyframes float-slow { 0%,100% { transform: translate(0,0); } 50% { transform: translate(10px,6px); } }
        @keyframes float-slow-reverse { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-8px,-5px); } }

        /* Pausa animationer off-screen */
        [data-animate="false"] .anim { animation-play-state: paused !important; }
        @media (prefers-reduced-motion: reduce) {
          .anim { animation: none !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="jobs"
        className="relative pt-16 sm:pt-32 pb-24 overflow-hidden"
        onPointerMove={onPointerMove}
        data-animate="false"
        style={
          {
            ["--mx" as any]: 0,
            ["--my" as any]: 0,
            contentVisibility: "auto",
            containIntrinsicSize: "1px 900px",
          } as React.CSSProperties
        }
      >
        {/* Bakgrund */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundColor: "#08132B" }} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,0,0,0.45) 100%)",
              mixBlendMode: "multiply",
              opacity: 0.8,
            }}
          />
          <div
            className="absolute inset-0 transition-transform duration-300"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
              `,
              backgroundSize: "140px 140px",
              transform:
                "translate(calc(var(--mx) * 0.1px), calc(var(--my) * 0.1px))",
              mixBlendMode: "overlay",
              opacity: 0.9,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-20 relative">
            <div
              className="absolute inset-x-0 top-0 mx-auto w-[400px] h-[180px] rounded-full blur-3xl opacity-25 anim"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(125,211,252,0.35) 0%, transparent 60%)",
                transform: "translateY(-30px)",
                animation: "float-slow 32s ease-in-out infinite",
              }}
            />
            <h2
              className={`
                text-3xl sm:text-5xl text-white mb-4 sm:mb-6 tracking-tight leading-[1.1]
                transition-all duration-700 transform
                ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
              `}
              style={{ fontFamily: "Zen Kaku Gothic Antique, sans-serif", fontWeight: 500 }}
            >
              Utforska Våra Lediga Jobb
            </h2>
            <p
              className={`
                text-[15px] sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light
                transition-all duration-1000 delay-300 transform
                ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
              `}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Hitta din nästa tjänst i vårt utbud av lediga jobb
            </p>
          </div>

          {/* MOBIL – identisk layout som i JobsList */}
          <div className="sm:hidden">
            {mobileJobs.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-white/80 text-lg">
                  Inga lediga jobb tillgängliga just nu.
                </h3>
              </div>
            ) : (
              <ul className="divide-y divide-white/10">
                {mobileJobs.map((job) => (
                  <li
                    key={job.slug ?? job.id ?? job.title}
                    className="py-4 active:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => goToJob(job)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Samma bildrender som JobsList (ingen mörk bakgrund) */}
                      {getJobImageUrl(job) ? (
                        <img
                          src={getJobImageUrl(job)}
                          alt={job.title}
                          loading="lazy"
                          className="w-9 h-9 rounded-lg object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center font-semibold shrink-0">
                          {(job.company ?? "•").charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3
                          className="text-white text-base font-semibold leading-tight truncate"
                          style={{ fontFamily: "Zen Kaku Gothic Antique, sans-serif" }}
                        >
                          {job.title}
                        </h3>
                      </div>
                    </div>

                    <div
                      className="mt-2 flex flex-wrap items-center gap-3 text-[13px] text-white/75"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase size={14} /> {job.company}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} /> {job.location}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={14} /> {getOmfattning(job)}
                      </span>
                    </div>

                    <div
                      className="mt-1 text-[12px] text-white/60"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {getPostedLabel(job)}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <div
              className={`
                text-center mt-10
                transition-all duration-700 transform
                ${isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
              `}
            >
              <button
                onClick={() => navigate("/jobs")}
                className="
                  group relative px-7 py-3.5
                  bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl
                  font-medium tracking-wide
                  hover:border-white/40 hover:bg-white/20
                  transition-all duration-300
                  shadow-lg hover:shadow-xl
                  hover:scale-105 hover:-translate-y-1
                  overflow-hidden
                "
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                <div className="relative flex items-center space-x-2">
                  <span className="font-medium">Se Alla Jobb</span>
                  <ArrowRight size={16} className="transition-transform duration-300" />
                </div>
              </button>
            </div>
          </div>

          {/* DESKTOP – identiska kort som i JobsList, och centrerar vid 1 kort */}
          <div className="hidden sm:block">
            {jobs.length === 0 ? (
              <div className="mb-16 text-center py-10">
                <h3 className="text-white/80 text-xl">
                  Inga lediga jobb tillgängliga just nu.
                </h3>
              </div>
            ) : jobs.length === 1 ? (
              // Centrera ett enda kort
              <div className="mb-16 flex justify-center">
                {(() => {
                  const job = jobs[0];
                  return (
                    <SimpleHoverCard className="w-full max-w-sm bg-white/95 backdrop-blur-sm border border-white/20 flex flex-col cursor-pointer">
                      <div className="p-5 flex-1 flex flex-col" onClick={() => goToJob(job)}>
                        <div className="flex items-start space-x-4 mb-4">
                          {/* EXAKT som JobsList: rendera <img> direkt */}
                          {getJobImageUrl(job) ? (
                            <img
                              src={getJobImageUrl(job)}
                              alt={job.title}
                              loading="lazy"
                              className="w-14 h-14 rounded-xl object-cover shadow-lg flex-shrink-0"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                              {(job.company ?? "•").charAt(0)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3
                              className="text-lg text-gray-900 mb-2 leading-tight font-medium"
                              style={{ fontFamily: "Zen Kaku Gothic Antique, sans-serif" }}
                            >
                              {job.title}
                            </h3>
                            <div
                              className="text-base text-gray-700"
                              style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                            >
                              {job.company}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-2">
                            <MapPin size={14} className="text-gray-400" />
                            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                              {job.location}
                            </span>
                          </div>
                          <span className="w-1 h-1 bg-gray-400 rounded-full" />
                          <div className="flex items-center space-x-2">
                            <Clock size={14} className="text-gray-400" />
                            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                              {getOmfattning(job)}
                            </span>
                          </div>
                          <span className="w-1 h-1 bg-gray-400 rounded-full" />
                          <div className="flex items-center space-x-2">
                            <Building size={14} className="text-gray-400" />
                            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                              {job.industry ?? ""}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 pt-0 flex items-end justify-between" onClick={() => goToJob(job)}>
                        <div
                          className="text-sm text-gray-500"
                          style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                        >
                          {getPostedLabel(job)}
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                            Ansök senast
                          </div>
                          <div
                            className="text-gray-700"
                            style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                          >
                            {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("sv-SE")}
                          </div>
                        </div>
                      </div>
                    </SimpleHoverCard>
                  );
                })()}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16 justify-center">
                {jobs.map((job) => (
                  <SimpleHoverCard
                    key={job.slug ?? job.id ?? job.title}
                    className="w-full max-w-sm bg-white/95 backdrop-blur-sm border border-white/20 flex flex-col cursor-pointer"
                  >
                    <div className="p-5 flex-1 flex flex-col" onClick={() => goToJob(job)}>
                      <div className="flex items-start space-x-4 mb-4">
                        {getJobImageUrl(job) ? (
                          <img
                            src={getJobImageUrl(job)}
                            alt={job.title}
                            loading="lazy"
                            className="w-14 h-14 rounded-xl object-cover shadow-lg flex-shrink-0"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                            {(job.company ?? "•").charAt(0)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3
                            className="text-lg text-gray-900 mb-2 leading-tight font-medium"
                            style={{ fontFamily: "Zen Kaku Gothic Antique, sans-serif" }}
                          >
                            {job.title}
                          </h3>
                          <div
                            className="text-base text-gray-700"
                            style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                          >
                            {job.company}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} className="text-gray-400" />
                          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                            {job.location}
                          </span>
                        </div>
                        <span className="w-1 h-1 bg-gray-400 rounded-full" />
                        <div className="flex items-center space-x-2">
                          <Clock size={14} className="text-gray-400" />
                          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                            {getOmfattning(job)}
                          </span>
                        </div>
                        <span className="w-1 h-1 bg-gray-400 rounded-full" />
                        <div className="flex items-center space-x-2">
                          <Building size={14} className="text-gray-400" />
                          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                            {job.industry ?? ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-end justify-between" onClick={() => goToJob(job)}>
                      <div
                        className="text-sm text-gray-500"
                        style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                      >
                        {getPostedLabel(job)}
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                          Ansök senast
                        </div>
                        <div
                          className="text-gray-700"
                          style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                        >
                          {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("sv-SE")}
                        </div>
                      </div>
                    </div>
                  </SimpleHoverCard>
                ))}
              </div>
            )}

            {/* CTA */}
            <div
              className={`
                text-center
                transition-all duration-1000 delay-200 transform
                ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
              `}
            >
              <button
                onClick={() => navigate("/jobs")}
                className="
                  group relative px-8 py-4
                  bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl
                  font-medium tracking-wide
                  hover:border-white/40 hover:bg-white/20
                  transition-all duration-300
                  shadow-lg hover:shadow-xl
                  hover:scale-105 hover:-translate-y-1
                  overflow-hidden
                "
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                <div className="relative flex items-center space-x-2">
                  <span className="font-medium">Se Alla Jobb</span>
                  <ArrowRight size={16} className="transition-transform duration-300" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedJobs;

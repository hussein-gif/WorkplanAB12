import React, { useEffect, useRef, useState, Suspense } from 'react';
import SEO from '../components/SEO'; // ⬅️ SEO-import

// Lazy load ikoner
const CookieIcon = React.lazy(() =>
  import('lucide-react').then(mod => ({ default: mod.Cookie }))
);
const CalendarIcon = React.lazy(() =>
  import('lucide-react').then(mod => ({ default: mod.Calendar }))
);

const sections = [
  { id: "vad-ar-cookies", title: "Vad är cookies?" },
  { id: "varfor-anvander-vi", title: "Varför använder vi cookies?" },
  { id: "typer-av-cookies", title: "Typer av cookies vi använder" },
  { id: "nodvandiga-cookies", title: "Nödvändiga cookies" },
  { id: "funktionella-cookies", title: "Funktionella cookies" },
  { id: "analys-cookies", title: "Analys- och prestandacookies" },
  { id: "marknads-cookies", title: "Marknadsföringscookies" },
  { id: "tredjepartscookies", title: "Tredjepartscookies" },
  { id: "hantera-cookies", title: "Hantera & återkalla samtycke" },
  { id: "lagringstider", title: "Lagringstider & radering" },
  { id: "forandringar", title: "Förändringar i denna policy" },
];

const NAV_OFFSET_PX = 120;

const CookiePolicyPage: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeIdRef = useRef<string>(activeId);
  activeIdRef.current = activeId;

  // Force mörk navbar
  useEffect(() => {
    const el = document.documentElement;
    el.classList.add('force-nav-dark');
    return () => el.classList.remove('force-nav-dark');
  }, []);

  // Scroll-spy
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const getSections = () =>
      Array.from(el.querySelectorAll("section[data-cp-section]")) as HTMLElement[];

    const onScroll = () => {
      const secs = getSections();
      if (!secs.length) return;
      const scrollY = window.scrollY + NAV_OFFSET_PX + 1;
      let currentId = secs[0].id;
      for (const sec of secs) {
        if (sec.offsetTop <= scrollY) currentId = sec.id;
        else break;
      }
      if (currentId !== activeIdRef.current) setActiveId(currentId);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", onScroll as any);
    };
  }, []);

  const handleClick = (id: string) => {
    const node = document.getElementById(id);
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  const updatedAt = "20 augusti 2025";

  return (
    <>
      <SEO
        title="Cookiepolicy | Workplan"
        description="Läs hur Workplan använder cookies och liknande tekniker. Vi förklarar typer av cookies, rättslig grund, lagringstider och hur du kan ändra eller återkalla ditt samtycke."
        canonical="https://www.work-plan.se/cookiepolicy"
      />

      <div
        className="min-h-screen"
        style={{
          backgroundColor: "#F7FAFF",
          contentVisibility: "auto",
          containIntrinsicSize: "1px 1400px",
        }}
      >
        {/* Hero */}
        <header className="pt-28 pb-10 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#08132B] to-[#0B274D] rounded-2xl flex items-center justify-center shadow-lg">
                <Suspense fallback={<div className="w-7 h-7 bg-gray-200 rounded" />}>
                  <CookieIcon className="h-7 w-7 text-white" />
                </Suspense>
              </div>
            </div>
            <h1
              className="text-4xl md:text-5xl font-medium text-[#08132B] tracking-tight"
              style={{ fontFamily: "Zen Kaku Gothic Antique, sans-serif" }}
            >
              Cookie Policy
            </h1>
            <p
              className="text-gray-700 mt-4"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 300 }}
            >
              Hur Workplan AB använder cookies och liknande tekniker på vår webbplats
              för att leverera tjänster, förbättra upplevelsen och – om du samtycker –
              mäta och marknadsföra.
            </p>
            <p
              className="text-gray-600 mt-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Denna policy kompletterar vår Integritetspolicy och beskriver cookies,
              rättslig grund (t.ex. samtycke), mottagare, lagringstider, samt hur du
              ändrar eller återkallar dina val.
            </p>
          </div>
        </header>

        {/* Innehåll */}
        <main className="px-6 pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* TOC */}
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-24">
                <div
                  className="text-xs text-gray-500 mb-2 flex items-center gap-1.5"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <Suspense fallback={<div className="w-3.5 h-3.5 bg-gray-200 rounded" />}>
                    <CalendarIcon className="h-3.5 w-3.5" />
                  </Suspense>
                  Senast uppdaterad: {updatedAt}
                </div>
                <nav
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 md:p-4 max-w-xs"
                  aria-label="Innehåll"
                >
                  <ul className="space-y-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                    {sections.map((s, idx) => (
                      <li key={s.id}>
                        <button
                          onClick={() => handleClick(s.id)}
                          className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition ${
                            activeId === s.id
                              ? "bg-[#08132B] text-white font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {`${idx + 1}. ${s.title}`}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div
                ref={containerRef}
                className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-10 space-y-12"
                style={{ contentVisibility: "auto", containIntrinsicSize: "1px 1200px" }}
              >
                {/* Sektionerna */}
                <CPSection id="vad-ar-cookies" title="1. Vad är cookies?">
                  <p>
                    Cookies är små textfiler som lagras i din webbläsare när du besöker en webbplats.
                    ...
                  </p>
                </CPSection>
                {/* (Alla andra CPSection följer här, oförändrade från din kod) */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CookiePolicyPage;

/* ======================= Hjälpkomponent ======================= */
const CPSection: React.FC<{ id: string; title: string; children: React.ReactNode }> = React.memo(
  ({ id, title, children }) => (
    <section id={id} data-cp-section className="scroll-mt-28">
      <h2
        className="text-2xl md:text-3xl font-medium text-[#08132B] mb-4"
        style={{ fontFamily: "Zen Kaku Gothic Antique, sans-serif" }}
      >
        {title}
      </h2>
      <div
        className="space-y-4 text-gray-700 leading-relaxed"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {children}
      </div>
    </section>
  )
);

import React, { useEffect, useMemo, useState } from "react";
import {
  Shield,
  Lock,
  Calendar,
  CheckCircle2,
  Circle,
} from "lucide-react";

/**
 * PrivacyPolicyPage – Workplan AB
 * 
 * Design justerad enligt Academic Work:
 * - Rubrik + inledning centrerad i toppen
 * - Inledning borttagen från sidomenyn
 * - "Senast uppdaterad" flyttad till ovanför vänstermenyn
 */

const sections = [
  { id: "omfattas", title: "Vem omfattas av policyn?" },
  { id: "uppgifter", title: "Vilka uppgifter samlar vi in?" },
  { id: "kallor", title: "Varifrån får vi uppgifterna?" },
  { id: "andamal", title: "Ändamål och rättslig grund (översikt)" },
  { id: "profilering", title: "Profilering och automatiserade beslut" },
  { id: "mottagare", title: "Mottagare av personuppgifter" },
  { id: "overforingar", title: "Överföring till länder utanför EU/EES" },
  { id: "lagring", title: "Lagringstider (gallring)" },
  { id: "sakerhet", title: "Säkerhet" },
  { id: "rattigheter", title: "Dina rättigheter" },
  { id: "cookies", title: "Cookies och liknande tekniker" },
  { id: "dpia", title: "Dataskyddsbedömningar (DPIA)" },
  { id: "forandringar", title: "Förändringar i denna policy" },
  { id: "kontakt", title: "Kontakt" },
];

const useScrollSpy = (ids) => {
  const [activeId, setActiveId] = useState(ids?.[0] ?? "");
  const [visited, setVisited] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id") || "";
            setActiveId(id);
            setVisited((prev) => new Set(prev).add(id));
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60% 0px",
        threshold: [0.4],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  const progress = useMemo(() => {
    const index = ids.indexOf(activeId);
    return Math.max(0, (index / (ids.length - 1)) * 100);
  }, [activeId, ids]);

  return { activeId, visited, progress };
};

const NavItem = ({ href, title, active, done, onClick }) => (
  <a
    href={`#${href}`}
    onClick={onClick}
    className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
      active
        ? "bg-[#08132B] text-white"
        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
    }`}
  >
    <span className="flex h-5 w-5 items-center justify-center">
      {done ? (
        <CheckCircle2 className={active ? "h-4 w-4" : "h-4 w-4 text-blue-600"} />
      ) : (
        <Circle className={active ? "h-4 w-4" : "h-4 w-4 text-gray-400"} />
      )}
    </span>
    <span className="leading-tight">{title}</span>
  </a>
);

const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-28">
    <h2 className="text-2xl md:text-3xl font-medium text-[#08132B] mb-4">
      {title}
    </h2>
    <div className="prose prose-slate max-w-none">{children}</div>
    <hr className="my-10 border-gray-200" />
  </section>
);

const PrivacyPolicyPage = () => {
  const ids = sections.map((s) => s.id);
  const { activeId, visited, progress } = useScrollSpy(ids);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const updatedAt = "20 augusti 2025";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#08132B] to-[#0B274D] shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1
            className={`text-4xl md:text-5xl font-medium text-[#08132B] tracking-tight transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            Integritetspolicy
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Hur Workplan AB samlar in, använder och skyddar personuppgifter i
            vår bemanningsverksamhet inom lager och logistik.
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_minmax(0,1fr)]">
          {/* Left Sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-24">
              {/* Updated at */}
              <div className="mb-4 text-sm text-gray-500 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Senast uppdaterad: {updatedAt}
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
                <div className="mb-3">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-1.5 rounded-full bg-blue-600 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <nav className="max-h-[70vh] overflow-y-auto pr-1">
                  {sections.map((s) => (
                    <NavItem
                      key={s.id}
                      href={s.id}
                      title={s.title}
                      active={activeId === s.id}
                      done={visited.has(s.id)}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(s.id);
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                    />
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div>
            <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
              {/* --- Sections --- */}
              <Section id="omfattas" title="Vem omfattas av policyn?">
                <p>
                  Denna policy omfattar jobbsökande, kandidater, anställda,
                  konsulter, kund- och leverantörskontakter samt besökare på vår
                  webbplats.
                </p>
              </Section>

              <Section id="uppgifter" title="Vilka uppgifter samlar vi in?">
                <p>
                  Vi samlar in identitets- och kontaktuppgifter, meriter, arbetslivserfarenhet, 
                  tester, intervjudata, samt information från webb & cookies. 
                  För anställda omfattas även löne- och anställningsdata, säkerhet & arbetsmiljö, 
                  samt IT- och accessuppgifter.
                </p>
              </Section>

              <Section id="kallor" title="Varifrån får vi uppgifterna?">
                <p>
                  Uppgifter hämtas från dig själv, referenser, offentliga källor, 
                  kunder vid uppdrag samt systemleverantörer.
                </p>
              </Section>

              {/* ...resten av sektionerna samma som innan... */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;

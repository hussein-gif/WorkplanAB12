import React, { useEffect, useRef, useState } from 'react';
import { Cookie, Calendar } from 'lucide-react';

/**
 * CookiePolicyPage – Workplan AB (Bemanning inom Lager & Logistik)
 * Matchad design med Användarvillkor och Integritetspolicy
 * - Rubrik + inledning centrerad i hero
 * - "Senast uppdaterad" ovanför vänster TOC
 * - Aktiv TOC-punkt: bg #08132B + vit text
 */

const sections = [
  { id: "vad-ar-cookies", title: "Vad är cookies?" },
  { id: "varfor-anvander-vi", title: "Varför använder vi cookies?" },
  { id: "typer-av-cookies", title: "Typer av cookies vi använder" },
  { id: "nodvandiga-cookies", title: "Nödvändiga cookies" },
  { id: "funktionella-cookies", title: "Funktionella cookies" },
  { id: "analys-cookies", title: "Analys- och prestandacookies" },
  { id: "marknads-cookies", title: "Marknadsföringscookies" },
  { id: "tredjepartscookies", title: "Tredjepartscookies" },
  { id: "hantera-cookies", title: "Hantera dina cookie-inställningar" },
  { id: "lagringstider", title: "Lagringstider" },
  { id: "forandringar", title: "Förändringar i denna policy" },
];

const NAV_OFFSET_PX = 120;

const CookiePolicyPage: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeIdRef = useRef<string>(activeId);
  activeIdRef.current = activeId;

  // Robust scroll-spy
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
    <div className="min-h-screen" style={{ backgroundColor: "#F7FAFF" }}>
      {/* Hero – centrerad rubrik + inledning */}
      <header className="pt-28 pb-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-[#08132B] to-[#0B274D] rounded-2xl flex items-center justify-center shadow-lg">
              <Cookie className="h-7 w-7 text-white" />
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
            för att förbättra din upplevelse och leverera relevanta tjänster.
          </p>
          <p
            className="text-gray-600 mt-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Denna policy kompletterar vår integritetspolicy och förklarar i detalj
            hur vi använder cookies inom vår bemanningsverksamhet.
          </p>
        </div>
      </header>

      {/* Innehåll med sidomeny */}
      <main className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Vänster TOC */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24">
              <div
                className="text-xs text-gray-500 mb-2 flex items-center gap-1.5"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <Calendar className="h-3.5 w-3.5" /> Senast uppdaterad: {updatedAt}
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

          {/* Höger innehåll */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div
              ref={containerRef}
              className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-10 space-y-12"
            >
              {/* 1 */}
              <CPSection id="vad-ar-cookies" title="1. Vad är cookies?">
                <p>
                  Cookies är små textfiler som lagras på din enhet (dator, telefon, surfplatta) när du besöker en webbplats. 
                  De hjälper webbplatsen att komma ihåg information om ditt besök, som dina inställningar och aktiviteter.
                </p>
                <p>
                  Förutom cookies använder vi även liknande tekniker som:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Pixlar/web beacons:</strong> Små bilder som hjälper oss förstå hur du interagerar med vårt innehåll</li>
                  <li><strong>Lokal lagring:</strong> Tekniker som lagrar data direkt i din webbläsare</li>
                  <li><strong>Sessionslagring:</strong> Tillfällig lagring som försvinner när du stänger webbläsaren</li>
                </ul>
              </CPSection>

              {/* 2 */}
              <CPSection id="varfor-anvander-vi" title="2. Varför använder vi cookies?">
                <p>
                  Vi använder cookies för att:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Säkerställa grundläggande funktionalitet</strong> på webbplatsen</li>
                  <li><strong>Komma ihåg dina inställningar</strong> och preferenser</li>
                  <li><strong>Förbättra prestanda</strong> och användarupplevelse</li>
                  <li><strong>Analysera trafik</strong> och användningsmönster för att utveckla våra tjänster</li>
                  <li><strong>Visa relevanta annonser</strong> och marknadsföringsmeddelanden</li>
                  <li><strong>Integrera med sociala medier</strong> och tredjepartstjänster</li>
                </ul>
              </CPSection>

              {/* 3 */}
              <CPSection id="typer-av-cookies" title="3. Typer av cookies vi använder">
                <p>
                  Vi kategoriserar cookies baserat på deras funktion och hur länge de lagras:
                </p>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">Baserat på funktion:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Nödvändiga</h4>
                    <p className="text-sm text-blue-800">Krävs för grundläggande webbplatsfunktioner</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Funktionella</h4>
                    <p className="text-sm text-green-800">Förbättrar användarupplevelsen</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Analys</h4>
                    <p className="text-sm text-purple-800">Hjälper oss förstå hur webbplatsen används</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2">Marknadsföring</h4>
                    <p className="text-sm text-orange-800">Visar relevanta annonser och innehåll</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-3">Baserat på varaktighet:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Sessionscookies:</strong> Försvinner när du stänger webbläsaren</li>
                  <li><strong>Permanenta cookies:</strong> Stannar kvar tills de upphör eller du tar bort dem</li>
                </ul>
              </CPSection>

              {/* 4 */}
              <CPSection id="nodvandiga-cookies" title="4. Nödvändiga cookies">
                <p>
                  Dessa cookies är absolut nödvändiga för att webbplatsen ska fungera och kan inte stängas av. 
                  De sätts vanligtvis endast som svar på åtgärder du vidtar.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="p-3">Cookie-namn</th>
                        <th className="p-3">Syfte</th>
                        <th className="p-3">Varaktighet</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-3 font-mono text-sm">wp_session</td>
                        <td className="p-3">Håller din session aktiv under besöket</td>
                        <td className="p-3">Session</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-sm">wp_csrf</td>
                        <td className="p-3">Skyddar mot säkerhetsattacker</td>
                        <td className="p-3">Session</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-sm">wp_consent</td>
                        <td className="p-3">Sparar dina cookie-inställningar</td>
                        <td className="p-3">1 år</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CPSection>

              {/* 5 */}
              <CPSection id="funktionella-cookies" title="5. Funktionella cookies">
                <p>
                  Dessa cookies gör det möjligt för webbplatsen att tillhandahålla förbättrad funktionalitet 
                  och personalisering. De kan sättas av oss eller av tredjepartsleverantörer.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="p-3">Cookie-namn</th>
                        <th className="p-3">Syfte</th>
                        <th className="p-3">Varaktighet</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-3 font-mono text-sm">wp_language</td>
                        <td className="p-3">Kommer ihåg ditt språkval</td>
                        <td className="p-3">30 dagar</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-sm">wp_theme</td>
                        <td className="p-3">Sparar dina visningsinställningar</td>
                        <td className="p-3">90 dagar</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-sm">wp_search_filters</td>
                        <td className="p-3">Kommer ihåg dina sökfilter</td>
                        <td className="p-3">7 dagar</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CPSection>

              {/* 6 */}
              <CPSection id="analys-cookies" title="6. Analys- och prestandacookies">
                <p>
                  Dessa cookies hjälper oss att förstå hur besökare interagerar med webbplatsen genom 
                  att samla in och rapportera information anonymt.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="p-3">Leverantör</th>
                        <th className="p-3">Cookie-namn</th>
                        <th className="p-3">Syfte</th>
                        <th className="p-3">Varaktighet</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-3">Google Analytics</td>
                        <td className="p-3 font-mono text-sm">_ga, _ga_*</td>
                        <td className="p-3">Spårar besökare och sessioner</td>
                        <td className="p-3">2 år</td>
                      </tr>
                      <tr>
                        <td className="p-3">Google Analytics</td>
                        <td className="p-3 font-mono text-sm">_gid</td>
                        <td className="p-3">Skiljer användare åt</td>
                        <td className="p-3">24 timmar</td>
                      </tr>
                      <tr>
                        <td className="p-3">Hotjar</td>
                        <td className="p-3 font-mono text-sm">_hjid, _hjSession*</td>
                        <td className="p-3">Användarupplevelse och heatmaps</td>
                        <td className="p-3">1 år / 30 min</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CPSection>

              {/* 7 */}
              <CPSection id="marknads-cookies" title="7. Marknadsföringscookies">
                <p>
                  Dessa cookies används för att spåra besökare över webbplatser för att visa annonser 
                  som är relevanta och engagerande för den enskilda användaren.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="p-3">Leverantör</th>
                        <th className="p-3">Cookie-namn</th>
                        <th className="p-3">Syfte</th>
                        <th className="p-3">Varaktighet</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-3">Google Ads</td>
                        <td className="p-3 font-mono text-sm">_gcl_au</td>
                        <td className="p-3">Konverteringsspårning</td>
                        <td className="p-3">90 dagar</td>
                      </tr>
                      <tr>
                        <td className="p-3">Facebook</td>
                        <td className="p-3 font-mono text-sm">_fbp, _fbc</td>
                        <td className="p-3">Annonsmätning och optimering</td>
                        <td className="p-3">90 dagar</td>
                      </tr>
                      <tr>
                        <td className="p-3">LinkedIn</td>
                        <td className="p-3 font-mono text-sm">li_sugr, AnalyticsSyncHistory</td>
                        <td className="p-3">B2B-marknadsföring och insights</td>
                        <td className="p-3">30 dagar</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CPSection>

              {/* 8 */}
              <CPSection id="tredjepartscookies" title="8. Tredjepartscookies">
                <p>
                  Vissa cookies sätts av tredjepartstjänster som visas på våra sidor. Vi har begränsad 
                  kontroll över dessa cookies eftersom de hanteras av externa leverantörer.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Google Services</h4>
                    <p className="text-sm text-blue-800">
                      Google Analytics, Google Ads, Google Maps - för analys, annonser och kartfunktioner.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Sociala Medier</h4>
                    <p className="text-sm text-purple-800">
                      LinkedIn, Facebook - för delningsfunktioner och marknadsföringsinsikter.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Supportverktyg</h4>
                    <p className="text-sm text-green-800">
                      Chatbot, supportwidgets - för kundservice och användarstöd.
                    </p>
                  </div>
                </div>
              </CPSection>

              {/* 9 */}
              <CPSection id="hantera-cookies" title="9. Hantera dina cookie-inställningar">
                <p>
                  Du har full kontroll över vilka cookies som används på vår webbplats:
                </p>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">Via vår cookie-banner</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Klicka på "Cookie-inställningar" i bannern som visas vid första besöket</li>
                  <li>Välj vilka kategorier av cookies du vill tillåta</li>
                  <li>Spara dina inställningar - de kommer ihågs för framtida besök</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3">Via din webbläsare</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Chrome:</strong> Inställningar → Sekretess och säkerhet → Cookies och andra webbplatsdata</li>
                  <li><strong>Firefox:</strong> Inställningar → Sekretess och säkerhet → Cookies och webbplatsdata</li>
                  <li><strong>Safari:</strong> Inställningar → Sekretess → Hantera webbplatsdata</li>
                  <li><strong>Edge:</strong> Inställningar → Cookies och webbplatsbehörigheter</li>
                </ul>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Observera:</strong> Om du blockerar eller tar bort cookies kan vissa delar av 
                    webbplatsen sluta fungera korrekt.
                  </p>
                </div>
              </CPSection>

              {/* 10 */}
              <CPSection id="lagringstider" title="10. Lagringstider">
                <p>
                  Olika cookies lagras under olika tidsperioder:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="p-3">Typ</th>
                        <th className="p-3">Typisk lagringstid</th>
                        <th className="p-3">Exempel</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-3">Sessionscookies</td>
                        <td className="p-3">Tills webbläsaren stängs</td>
                        <td className="p-3">Inloggningsstatus, kundvagn</td>
                      </tr>
                      <tr>
                        <td className="p-3">Funktionella cookies</td>
                        <td className="p-3">7-90 dagar</td>
                        <td className="p-3">Språkinställningar, preferenser</td>
                      </tr>
                      <tr>
                        <td className="p-3">Analyscookies</td>
                        <td className="p-3">1-24 månader</td>
                        <td className="p-3">Google Analytics, besöksstatistik</td>
                      </tr>
                      <tr>
                        <td className="p-3">Marknadsföringscookies</td>
                        <td className="p-3">30-90 dagar</td>
                        <td className="p-3">Annonsspårning, remarketing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CPSection>

              {/* 11 */}
              <CPSection id="forandringar" title="11. Förändringar i denna policy">
                <p>
                  Vi kan uppdatera denna cookie policy när vi implementerar nya tekniker eller ändrar 
                  våra rutiner. Den senaste versionen finns alltid tillgänglig på vår webbplats.
                </p>
                <p className="mt-4">
                  Vid väsentliga ändringar som påverkar din integritet kommer vi att informera dig via:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Uppdaterad cookie-banner på webbplatsen</li>
                  <li>E-postmeddelande till registrerade användare</li>
                  <li>Tydlig information på startsidan</li>
                </ul>
                
                <div className="mt-6 p-6 bg-[#08132B]/5 border border-[#08132B]/20 rounded-xl">
                  <h4 className="font-semibold text-[#08132B] mb-3 flex items-center gap-2">
                    <Cookie size={20} />
                    Kontakta oss om cookies
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Har du frågor om vår användning av cookies eller vill utöva dina rättigheter?
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>E-post:</strong> privacy@work-plan.se</p>
                    <p><strong>Telefon:</strong> +46 8 123 456 78</p>
                    <p><strong>Post:</strong> Workplan AB, Attn: Dataskydd, [Adress], [Postnummer] [Ort]</p>
                  </div>
                </div>
              </CPSection>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CookiePolicyPage;

/* ======================= Hjälpkomponent ======================= */

const CPSection: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({
  id,
  title,
  children,
}) => (
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
);
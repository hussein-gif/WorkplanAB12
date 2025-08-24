import React, { useEffect, useRef, useState } from 'react';
import { Cookie, Calendar } from 'lucide-react';
import SEO from '../components/SEO'; // ⬅️ SEO-import

/**
 * CookiePolicyPage – Workplan AB (Bemanning inom Lager & Logistik)
 * Matchad design med Användarvillkor och Integritetspolicy
 * - Rubrik + inledning centrerad i hero
 * - "Senast uppdaterad" ovanför vänster TOC
 * - Aktiv TOC-punkt: bg #08132B + vit text
 * - Innehållet utökat för att uppfylla GDPR/ePrivacy (samtycke, rättslig grund, återkallelse, m.m.)
 * - NYTT: Sätter <html class="force-nav-dark"> så att Header visar mörk logga/länkar även i toppläget
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

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // Force mörk navbar på denna sida (samma mekanik som JobDetailPage)
  useEffect(() => {
    const el = document.documentElement;
    el.classList.add('force-nav-dark');
    return () => el.classList.remove('force-nav-dark');
  }, []);
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

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
    <>
      <SEO
        title="Cookiepolicy | Workplan"
        description="Läs hur Workplan använder cookies och liknande tekniker. Vi förklarar typer av cookies, rättslig grund, lagringstider och hur du kan ändra eller återkalla ditt samtycke."
        canonical="https://www.workplan.se/cookiepolicy"
      />

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
                    Cookies är små textfiler som lagras i din webbläsare när du besöker en webbplats.
                    De kan vara våra egna (<em>förstaparts-cookies</em>) eller komma från andra aktörer
                    (<em>tredjeparts-cookies</em>). Liknande tekniker kan också användas, t.ex. pixlar,
                    lokal lagring och sessionslagring. I denna policy använder vi begreppet
                    <em> cookies</em> för alla dessa.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li><strong>Förstaparts-cookies:</strong> sätts av vår egen domän.</li>
                    <li><strong>Tredjeparts-cookies:</strong> sätts av annan aktör (t.ex. analytics- eller annonsleverantör).</li>
                    <li><strong>Sessionscookies:</strong> raderas när du stänger webbläsaren.</li>
                    <li><strong>Permanenta cookies:</strong> ligger kvar tills de löper ut eller raderas av dig.</li>
                  </ul>
                </CPSection>

                {/* 2 */}
                <CPSection id="varfor-anvander-vi" title="2. Varför använder vi cookies?">
                  <p>Vi använder cookies för att:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Leverera nödvändig funktionalitet</strong> (inloggning, säkerhet, lastbalansering, formulär, språkval).</li>
                    <li><strong>Förbättra användarupplevelsen</strong> (komma ihåg val/preferenser, layout och filter).</li>
                    <li><strong>Mäta och förbättra</strong> våra tjänster (aggregatstatistik, felsökning, prestanda).</li>
                    <li><strong>Marknadsföra</strong> våra tjänster och visa relevant kommunikation (endast om du samtycker).</li>
                  </ul>
                  <p className="mt-4">
                    Rättslig grund: <strong>Nödvändiga cookies</strong> används för att uppfylla
                    vårt berättigade intresse av att tillhandahålla en fungerande webbplats.
                    <strong> Analys- och marknadsföringscookies</strong> används endast med
                    <strong> ditt samtycke</strong>, som du när som helst kan återkalla.
                  </p>
                </CPSection>

                {/* 3 */}
                <CPSection id="typer-av-cookies" title="3. Typer av cookies vi använder">
                  <p>Vi använder följande kategorier:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-1">Nödvändiga</h4>
                      <p className="text-sm text-blue-800">Krävs för drift, säkerhet och tillgänglighet.</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-1">Funktionella</h4>
                      <p className="text-sm text-green-800">Kommer ihåg inställningar och förbättrar upplevelsen.</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-1">Analys/Prestanda</h4>
                      <p className="text-sm text-purple-800">Statistik, felsökning och optimering (kräver samtycke).</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-900 mb-1">Marknadsföring</h4>
                      <p className="text-sm text-orange-800">Annonsering och mätning (kräver samtycke).</p>
                    </div>
                  </div>
                </CPSection>

                {/* 4 */}
                <CPSection id="nodvandiga-cookies" title="4. Nödvändiga cookies">
                  <p>
                    Dessa cookies är tekniskt nödvändiga för att webbplatsen ska fungera och kan
                    inte stängas av via vår banner. De används för t.ex. belastningsutjämning,
                    säkerhet (CSRF-skydd), sessionshantering och cookie-minnesval.
                  </p>
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-gray-50 text-gray-700">
                        <tr>
                          <th className="p-3">Cookie-namn (exempel)</th>
                          <th className="p-3">Syfte</th>
                          <th className="p-3">Varaktighet</th>
                          <th className="p-3">Personuppgifter</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="p-3 font-mono text-sm">wp_session</td>
                          <td className="p-3">Håller din session aktiv</td>
                          <td className="p-3">Session</td>
                          <td className="p-3">Minimalt (session-ID)</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-sm">wp_csrf</td>
                          <td className="p-3">Skydd mot CSRF-attacker</td>
                          <td className="p-3">Session</td>
                          <td className="p-3">Nej</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-sm">wp_consent</td>
                          <td className="p-3">Sparar dina cookie-val</td>
                          <td className="p-3">1 år</td>
                          <td className="p-3">Nej (endast val/flagga)</td>
                        </tr>
                        {/* lägg till ev. Cloudflare/hosting-cookies här */}
                      </tbody>
                    </table>
                  </div>
                </CPSection>

                {/* 5 */}
                <CPSection id="funktionella-cookies" title="5. Funktionella cookies">
                  <p>
                    Används för att komma ihåg val du gör (t.ex. språk, vyer, filter) och för
                    att anpassa upplevelsen. Om dessa stängs av kan vissa bekvämligheter saknas.
                  </p>
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-gray-50 text-gray-700">
                        <tr>
                          <th className="p-3">Cookie-namn (exempel)</th>
                          <th className="p-3">Syfte</th>
                          <th className="p-3">Varaktighet</th>
                          <th className="p-3">Rättslig grund</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="p-3 font-mono text-sm">wp_language</td>
                          <td className="p-3">Kommer ihåg språk</td>
                          <td className="p-3">30 dagar</td>
                          <td className="p-3">Samtycke eller berättigat intresse*</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-sm">wp_theme</td>
                          <td className="p-3">Kommer ihåg tema/visning</td>
                          <td className="p-3">90 dagar</td>
                          <td className="p-3">Samtycke</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-sm">wp_search_filters</td>
                          <td className="p-3">Kommer ihåg filter</td>
                          <td className="p-3">7 dagar</td>
                          <td className="p-3">Samtycke</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    *Språkval betraktas ibland som nödvändigt för att fullgöra användarens uttryckliga begäran.
                  </p>
                </CPSection>

                {/* 6 */}
                <CPSection id="analys-cookies" title="6. Analys- och prestandacookies">
                  <p>
                    Används för att förstå hur besökare använder webbplatsen (t.ex. sidvisningar,
                    händelser, enhet/region). Vi använder endast dessa när du samtycker i vår cookie-banner.
                    Vi strävar efter integritetsvänliga inställningar (t.ex. IP-maskering där det är möjligt).
                  </p>
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-gray-50 text-gray-700">
                        <tr>
                          <th className="p-3">Leverantör</th>
                          <th className="p-3">Cookie-namn (exempel)</th>
                          <th className="p-3">Syfte</th>
                          <th className="p-3">Varaktighet</th>
                          <th className="p-3">Rättslig grund</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="p-3">Google Analytics</td>
                          <td className="p-3 font-mono text-sm">_ga, _ga_*</td>
                          <td className="p-3">Besökare/sessioner, händelser</td>
                          <td className="p-3">2 år</td>
                          <td className="p-3">Samtycke</td>
                        </tr>
                        <tr>
                          <td className="p-3">Google Analytics</td>
                          <td className="p-3 font-mono text-sm">_gid</td>
                          <td className="p-3">Skiljer användare åt</td>
                          <td className="p-3">24 timmar</td>
                          <td className="p-3">Samtycke</td>
                        </tr>
                        <tr>
                          <td className="p-3">Hotjar</td>
                          <td className="p-3 font-mono text-sm">_hjid, _hjSession*</td>
                          <td className="p-3">UX-insikter/heatmaps</td>
                          <td className="p-3">1 år / 30 min</td>
                          <td className="p-3">Samtycke</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CPSection>

                {/* 7 */}
                <CPSection id="marknads-cookies" title="7. Marknadsföringscookies">
                  <p>
                    Används för att visa relevanta annonser och mäta kampanjer. Sätts endast om du
                    samtycker. Uppgifter kan kombineras med data från andra webbplatser för att bygga
                    intresseprofiler.
                  </p>
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-gray-50 text-gray-700">
                        <tr>
                          <th className="p-3">Leverantör</th>
                          <th className="p-3">Cookie-namn (exempel)</th>
                          <th className="p-3">Syfte</th>
                          <th className="p-3">Varaktighet</th>
                          <th className="p-3">Rättslig grund</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="p-3">Google Ads</td>
                          <td className="p-3 font-mono text-sm">_gcl_au</td>
                          <td className="p-3">Konverteringsspårning</td>
                          <td className="p-3">90 dagar</td>
                          <td className="p-3">Samtycke</td>
                        </tr>
                        <tr>
                          <td className="p-3">Facebook</td>
                          <td className="p-3 font-mono text-sm">_fbp, _fbc</td>
                          <td className="p-3">Annonsmätning/remarketing</td>
                          <td className="p-3">90 dagar</td>
                          <td className="p-3">Samtycke</td>
                        </tr>
                        <tr>
                          <td className="p-3">LinkedIn</td>
                          <td className="p-3 font-mono text-sm">li_sugr, AnalyticsSyncHistory</td>
                          <td className="p-3">B2B-insikter/annonsering</td>
                          <td className="p-3">30 dagar</td>
                          <td className="p-3">Samtycke</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    Obs: Marknadsföringscookies kan innebära överföring av personuppgifter till leverantörer
                    utanför EU/EES. Se även vår Integritetspolicy om internationella överföringar.
                  </p>
                </CPSection>

                {/* 8 */}
                <CPSection id="tredjepartscookies" title="8. Tredjepartscookies">
                  <p>
                    Vissa av våra sidor visar innehåll/tjänster från tredje part (t.ex. kartor,
                    inbäddade videor, analys- och annonsnätverk). Dessa aktörer kan sätta cookies
                    när du besöker vår webbplats. Vi kontrollerar inte hur de används och hänvisar
                    till respektive leverantörs egna policydokument.
                  </p>
                  <div className="space-y-4 mt-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-1">Exempel på tredjepart</h4>
                      <ul className="list-disc pl-6 text-blue-900/90 text-sm space-y-1">
                        <li>Google (Analytics, Ads, reCAPTCHA, Maps)</li>
                        <li>Meta (Facebook/Instagram för marknadsföring)</li>
                        <li>LinkedIn (insikter/annonsering)</li>
                        <li>Hotjar (UX-insikter)</li>
                      </ul>
                    </div>
                    <p className="text-sm text-gray-700">
                      När tredjelandsöverföring sker använder vi skydd som standardavtalsklausuler
                      och vid behov kompletterande åtgärder. Läs mer i vår Integritetspolicy.
                    </p>
                  </div>
                </CPSection>

                {/* 9 */}
                <CPSection id="hantera-cookies" title="9. Hantera & återkalla samtycke">
                  <p>
                    Du styr själv vilka icke nödvändiga cookies som får användas. Vid första besöket
                    visar vi en <strong>cookie-banner</strong> där du kan ge eller neka samtycke per
                    kategori. Dina val sparas i en nödvändig cookie (<span className="font-mono">wp_consent</span>).
                  </p>

                  <h3 className="text-lg font-semibold mt-6 mb-2">Ändra eller återkalla samtycke</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Öppna <em>Cookie-inställningar</em> via länken i sidfoten eller bannern.</li>
                    <li>Stäng av de kategorier du inte vill tillåta och spara.</li>
                    <li>Vi använder aldrig förvalda kryss för icke nödvändiga cookies.</li>
                  </ul>

                  <h3 className="text-lg font-semibold mt-6 mb-2">Webbläsarinställningar</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Du kan blockera, radera eller begränsa cookies i webbläsaren.</li>
                    <li>Inställningar gäller per enhet och per webbläsare (gör om på mobil/surfplatta).</li>
                  </ul>

                  <h3 className="text-lg font-semibold mt-6 mb-2">Signalhantering</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Vi strävar efter att respektera <strong>Global Privacy Control (GPC)</strong> där det är tekniskt möjligt.</li>
                    <li><em>Do Not Track</em> stöds inte konsekvent av alla leverantörer, men du kan alltid neka via vår banner.</li>
                  </ul>

                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Observera: Om du blockerar cookies kan vissa funktioner sluta fungera (t.ex. inloggning, formulär).
                    </p>
                  </div>
                </CPSection>

                {/* 10 */}
                <CPSection id="lagringstider" title="10. Lagringstider & radering">
                  <p>
                    Cookies lagras under olika lång tid beroende på syfte. Generellt gäller:
                  </p>
                  <div className="overflow-x-auto mt-4">
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
                          <td className="p-3">Inloggningsstatus, CSRF</td>
                        </tr>
                        <tr>
                          <td className="p-3">Funktionella</td>
                          <td className="p-3">7–90 dagar</td>
                          <td className="p-3">Språk, tema, filter</td>
                        </tr>
                        <tr>
                          <td className="p-3">Analys</td>
                          <td className="p-3">1–24 månader</td>
                          <td className="p-3">Besöksstatistik</td>
                        </tr>
                        <tr>
                          <td className="p-3">Marknadsföring</td>
                          <td className="p-3">30–90 dagar</td>
                          <td className="p-3">Konverterings-/annonsmätning</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4">
                    Du kan radera cookies när som helst via din webbläsare. Vi uppdaterar våra listor
                    löpande så att de speglar aktuella leverantörer och lagringstider.
                  </p>
                </CPSection>

                {/* 11 */}
                <CPSection id="forandringar" title="11. Förändringar i denna policy">
                  <p>
                    Vi kan uppdatera denna policy när vi ändrar leverantörer, tekniker eller arbetssätt.
                    Senaste versionen finns alltid på denna sida. Vid väsentliga ändringar informerar vi
                    via cookie-bannern och/eller andra kanaler.
                  </p>

                  <div className="mt-6 p-6 bg-[#08132B]/5 border border-[#08132B]/20 rounded-xl">
                    <h4 className="font-semibold text-[#08132B] mb-2 flex items-center gap-2">
                      <Cookie size={20} />
                      Frågor om cookies
                    </h4>
                    <p className="text-gray-700">
                      Kontakta oss om du har frågor om denna policy eller vår hantering av cookies:
                    </p>
                    <div className="mt-2 text-sm">
                      <p><strong>E-post:</strong> info@work-plan.se</p>
                    </div>
                  </div>
                </CPSection>
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

import React, { useEffect, useRef, useState } from "react";
import { Shield, Calendar } from "lucide-react";

/**
 * PrivacyPolicyPage – Workplan AB (Bemanning inom Lager & Logistik)
 * Matchad design med Användarvillkor-sidan
 * ÄNDRAT: borttagna sektioner 13 (Barn), 16 (Kontakt), 17 (Bilaga A), 18 (Bilaga B)
 * ÄNDRAT: borttagen blå callout-ruta längst ner
 * ÄNDRAT: sammanslagna rubriker -> "Profilering, automatiserade beslut & DPIA" och "Mottagare & överföringar"
 */

const sections = [
  { id: "inledning", title: "Inledning" },
  { id: "omfattas", title: "Vem omfattas av policyn?" },
  { id: "uppgifter", title: "Vilka uppgifter samlar vi in?" },
  { id: "kallor", title: "Varifrån får vi uppgifterna?" },
  { id: "andamal", title: "Ändamål och rättslig grund (översikt)" },
  { id: "profilering-dpia", title: "Profilering, automatiserade beslut & DPIA" },
  { id: "mottagare-overforingar", title: "Mottagare & överföringar" },
  { id: "lagring", title: "Lagringstider (gallring)" },
  { id: "sakerhet", title: "Säkerhet" },
  { id: "rattigheter", title: "Dina rättigheter" },
  { id: "cookies", title: "Cookies och liknande tekniker" },
  { id: "forandringar", title: "Förändringar i denna policy" },
];

const NAV_OFFSET_PX = 120; // samma offset som TOS

const PrivacyPolicyPage = () => {
  const [activeId, setActiveId] = useState(sections[0].id);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  // Robust scroll-spy (utan IntersectionObserver):
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const getSections = () => Array.from(el.querySelectorAll('section[data-pp-section]')) as HTMLElement[];

    const onScroll = () => {
      const secs = getSections();
      if (!secs.length) return;
      const scrollY = window.scrollY + NAV_OFFSET_PX + 1;
      let currentId = secs[0].id;
      for (const sec of secs) {
        if (sec.offsetTop <= scrollY) currentId = sec.id; else break;
      }
      if (currentId !== activeIdRef.current) setActiveId(currentId);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll as any);
      window.removeEventListener('resize', onScroll as any);
    };
  }, []);

  const handleClick = (id: string) => {
    const node = document.getElementById(id);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  // Date label (Swedish short text)
  const updatedAt = "20 augusti 2025"; // uppdatera vid behov

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7FAFF' }}>
      {/* Hero */}
      <header className="pt-28 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#08132B] to-[#0B274D] rounded-2xl flex items-center justify-center shadow-lg self-baseline">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1
                className="text-4xl md:text-5xl font-medium text-[#08132B] tracking-tight"
                style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
              >
                Integritetspolicy
              </h1>
              <p className="text-gray-600 mt-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                Hur Workplan AB samlar in, använder och skyddar personuppgifter i vår bemanningsverksamhet inom lager och logistik.
              </p>
              <p className="text-sm text-gray-500 mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> Senast uppdaterad: {updatedAt}</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Innehåll */}
      <main className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Vänster TOC */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <nav className="sticky top-24 bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-6 max-h-[80vh] overflow-auto" aria-label="Innehåll">
              <ul className="space-y-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                {sections.map((s, idx) => (
                  <li key={s.id}>
                    <button
                      onClick={() => handleClick(s.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        activeId === s.id ? 'bg-[#08132B] text-white font-medium' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {`${idx + 1}. ${s.title}`}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Höger innehåll */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div ref={containerRef} className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-10 space-y-12">
              {/* Sektioner */}
              <PPSection id="inledning" title="1. Inledning">
                <p>
                  Workplan AB ("vi", "oss", "vår") respekterar din integritet och är engagerade i att skydda dina personuppgifter. Den här policyn beskriver hur vi behandlar personuppgifter i vår bemanningsverksamhet inom lager och logistik, inklusive rekrytering, uthyrning av konsulter, schemaläggning, tidrapportering, löneadministration och kundrelationer.
                </p>
                <p className="mt-4">
                  Policyn kompletterar information i avtal, kandidat‑/medarbetarportaler och vår cookiepolicy. Vi behandlar uppgifter i enlighet med EU:s dataskyddsförordning (GDPR) och annan tillämplig lagstiftning.
                </p>
              </PPSection>

              <PPSection id="omfattas" title="2. Vem omfattas av policyn?">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Jobbsökande/kandidater</strong> (inkl. spontansökande och profiler i kandidatdatabas)</li>
                  <li><strong>Anställda och konsulter</strong> (inhyrd/ambulerande personal)</li>
                  <li><strong>Kontaktpersoner hos kunder och potentiella kunder</strong></li>
                  <li><strong>Leverantörer och deras kontaktpersoner</strong></li>
                  <li><strong>Besökare på vår webbplats</strong> och sociala kanaler</li>
                </ul>
              </PPSection>

              <PPSection id="uppgifter" title="3. Vilka uppgifter samlar vi in?">
                <h3 className="text-lg font-semibold">Kandidater/jobbsökande</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Identitet & kontakt:</strong> namn, personnummer* (endast vid behov), adress, telefon, e‑post.</li>
                  <li><strong>Meriter:</strong> CV, personligt brev, utbildning, certifikat (t.ex. truckkort), språk.</li>
                  <li><strong>Arbetsliv & referenser:</strong> arbetsgivare, referenser (kontaktuppgifter/utlåtanden).</li>
                  <li><strong>Tester & urvalsdata:</strong> resultat från arbetspsykologiska tester, kompetenskartläggningar och matchning.</li>
                  <li><strong>Administrativt:</strong> intervjunateckningar, korrespondens, ansökningsdatum, rekryteringssteg.</li>
                  <li><strong>Webb & cookies:</strong> IP‑adress, enhets‑ och användningsdata (se avsnittet om cookies).</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">*Personnummer behandlas endast när det är nödvändigt för säker identifiering eller när lag kräver det.</p>

                <h3 className="mt-6 text-lg font-semibold">Anställda/konsulter</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Anställningsdata:</strong> avtal, befattning, schema, pass/skift, tidrapporter, frånvaro, semester.</li>
                  <li><strong>Löne‑ & ersättningsdata:</strong> kontouppgifter, skatteuppgifter, utlägg, traktamenten.</li>
                  <li><strong>Kompetens & utbildning:</strong> intyg, behörigheter (t.ex. truckkort), HLR/brandskydd, interna utbildningar.</li>
                  <li><strong>Säkerhet & arbetsmiljö:</strong> tillbud/incidentrapporter, skyddsronder, nödvändig skyddsutrustning.</li>
                  <li><strong>IT & access:</strong> arbetsmail, användarkonton, loggar i schema-/tid‑system.</li>
                  <li><strong>Eventuell positionering:</strong> platsdata från stämplings‑ eller leveransappar när uppdrag kräver det (se Säkerhet & DPIA).</li>
                </ul>

                <h3 className="mt-6 text-lg font-semibold">Kunder & leverantörer (kontaktpersoner)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Business‑namn, titel, e‑post/telefon, avtal/kommunikationshistorik.</li>
                </ul>

                <h3 className="mt-6 text-lg font-semibold">Känsliga uppgifter</h3>
                <p>
                  Vi behandlar i normalfallet inte känsliga uppgifter (t.ex. hälsa, facklig tillhörighet). Om sådan behandling krävs – t.ex. styrkt arbetsförmåga vid rehabilitering – sker det endast när det är nödvändigt, lagligt och med lämpliga skyddsåtgärder. Uppgifter om lagöverträdelser behandlas endast om det uttryckligen tillåts/krävs enligt lag. Där det är möjligt tillämpar vi principen <em>"se men inte spara kopia"</em>.
                </p>
              </PPSection>

              <PPSection id="kallor" title="4. Varifrån får vi uppgifterna?">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Direkt från dig (ansökan, intervjuer, formulär, e‑post, telefon, chatt).</li>
                  <li>Från referenser som du lämnat.</li>
                  <li>Från offentliga källor/professionella nätverk (t.ex. LinkedIn) och jobbsajter där du själv publicerat uppgifter.</li>
                  <li>Från kunder när du hyrs ut till uppdrag (t.ex. godkända tidrapporter, säkerhetsgenomgångar).</li>
                  <li>Från systemleverantörer (schema, tid, testverktyg) som agerar personuppgiftsbiträden.</li>
                </ul>
              </PPSection>

              <PPSection id="andamal" title="5. Ändamål och rättslig grund (översikt)">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="p-3">Ändamål</th>
                        <th className="p-3">Exempel</th>
                        <th className="p-3">Rättslig grund</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-3">Rekrytering och matchning</td>
                        <td className="p-3">Ansökningar, intervjuer, tester, referenser</td>
                        <td className="p-3">Avtal/åtgärder före avtal, berättigat intresse; ibland samtycke (kandidatbank)</td>
                      </tr>
                      <tr>
                        <td className="p-3">Uthyrning & uppdrag</td>
                        <td className="p-3">Planera skift, bemanna, onboarding hos kund</td>
                        <td className="p-3">Avtal, berättigat intresse</td>
                      </tr>
                      <tr>
                        <td className="p-3">Lön & administration</td>
                        <td className="p-3">Löneutbetalning, skatter, utlägg</td>
                        <td className="p-3">Rättslig förpliktelse, avtal</td>
                      </tr>
                      <tr>
                        <td className="p-3">Arbetsmiljö & säkerhet</td>
                        <td className="p-3">Tillbud/incidenter, obligatoriska utbildningar</td>
                        <td className="p-3">Rättslig förpliktelse, viktigt allmänt intresse; ibland samtycke</td>
                      </tr>
                      <tr>
                        <td className="p-3">Kvalitet & regelefterlevnad</td>
                        <td className="p-3">Revision, bokföring, tvister</td>
                        <td className="p-3">Rättslig förpliktelse, berättigat intresse</td>
                      </tr>
                      <tr>
                        <td className="p-3">IT‑drift & säkerhet</td>
                        <td className="p-3">Loggar, åtkomstkontroll, felsökning</td>
                        <td className="p-3">Berättigat intresse</td>
                      </tr>
                      <tr>
                        <td className="p-3">Marknad & sälj B2B</td>
                        <td className="p-3">Utskick till kundkontakter</td>
                        <td className="p-3">Berättigat intresse (avregistrering möjlig)</td>
                      </tr>
                      <tr>
                        <td className="p-3">Webb & cookies</td>
                        <td className="p-3">Analys, preferenser, marknadsföring</td>
                        <td className="p-3">Samtycke (icke nödvändiga cookies)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-gray-700">När vi lutar oss mot <strong>berättigat intresse</strong> gör vi en intresseavvägning. Du kan invända mot sådan behandling (se Dina rättigheter).</p>
              </PPSection>

              <PPSection id="profilering-dpia" title="6. Profilering, automatiserade beslut & DPIA">
                <p>Vi kan använda matchnings‑ och planeringsverktyg som <strong>profilerar</strong> kompetens, erfarenhet och tillgänglighet för att föreslå uppdrag. Vi fattar inte beslut som enbart grundas på automatiserad behandling med rättsliga följder för dig utan mänsklig inblandning, om inte lag tillåter och vi informerar särskilt.</p>
                <p className="mt-4">Inför eller vid ändring av behandlingar som kan medföra <strong>hög risk</strong> – t.ex. omfattande spårning/positionering, avancerad profilering eller behandling av känsliga uppgifter – genomför vi konsekvensbedömningar (DPIA) och vidtar riskreducerande åtgärder.</p>
              </PPSection>

              <PPSection id="mottagare-overforingar" title="7. Mottagare & överföringar">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Kunder/uppdragsgivare:</strong> nödvändiga kontakt‑ och merituppgifter inför/under uppdrag.</li>
                  <li><strong>Koncernbolag</strong> (om tillämpligt) för intern administration och delade system.</li>
                  <li><strong>Personuppgiftsbiträden:</strong> IT‑ och molnleverantörer (lön, schema/tid, testverktyg, e‑signering, e‑post), växeltjänster, säkerhet/ID‑system.</li>
                  <li><strong>Myndigheter:</strong> t.ex. Skatteverket, Försäkringskassan, Arbetsmiljöverket – när lag kräver.</li>
                  <li><strong>Övriga:</strong> bank (löner), företagshälsovård, utbildnings‑ och certifieringspartners.</li>
                </ul>
                <p className="mt-4">Om överföring sker till tredjeland (utanför EU/EES) använder vi <strong>adekvansbeslut</strong> eller <strong>standardavtalsklausuler (SCC)</strong> och vid behov ytterligare skydd. Kopia av tillämpliga skydd kan tillhandahållas på begäran.</p>
              </PPSection>

              <PPSection id="lagring" title="8. Lagringstider (gallring)">
                <p>Vi sparar inte uppgifter längre än nödvändigt för ändamålen eller så länge lag kräver. Exempel:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="p-3">Kategori</th>
                        <th className="p-3">Exempel på lagringstid</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-3">Rekrytering (icke anställd)</td>
                        <td className="p-3">Normalt upp till <strong>2 år</strong> efter avslutad process. Kandidatbank längre tid endast med samtycke.</td>
                      </tr>
                      <tr>
                        <td className="p-3">Anställnings‑ och uppdragsdata</td>
                        <td className="p-3">Under anställning/uppdrag + preskriptionstid.</td>
                      </tr>
                      <tr>
                        <td className="p-3">Bokföringsunderlag (lön, utlägg, fakturor)</td>
                        <td className="p-3"><strong>7 år</strong> enligt bokföringsregler.</td>
                      </tr>
                      <tr>
                        <td className="p-3">Arbetsmiljödokumentation</td>
                        <td className="p-3">Enligt arbetsmiljö‑ och preskriptionsregler.</td>
                      </tr>
                      <tr>
                        <td className="p-3">IT‑loggar & säkerhet</td>
                        <td className="p-3">Kortast möjliga tid (ofta 6–24 mån) beroende på syfte.</td>
                      </tr>
                      <tr>
                        <td className="p-3">Marknadsföring B2B</td>
                        <td className="p-3">Tills du invänder/avregistrerar eller uppgifterna blir inaktuella.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-gray-700">Faktiska tider specificeras i våra interna gallringsrutiner. När lagringstiden löper ut raderas eller anonymiseras uppgifterna på ett säkert sätt.</p>
              </PPSection>

              <PPSection id="sakerhet" title="9. Säkerhet">
                <p>Vi vidtar lämpliga <strong>tekniska och organisatoriska åtgärder</strong> för att skydda personuppgifter, t.ex.: åtkomststyrning (need‑to‑know), kryptering i vila/transport, flerfaktorsautentisering, loggning/övervakning, säkerhetskopior, leverantörsgranskningar, utbildning av personal, test av incidentrutiner samt <em>privacy by design/default</em>.</p>
              </PPSection>

              <PPSection id="rattigheter" title="10. Dina rättigheter">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Rätt till <strong>information</strong> och <strong>tillgång</strong> (registerutdrag)</li>
                  <li>Rätt till <strong>rättelse</strong> av felaktiga uppgifter</li>
                  <li>Rätt till <strong>radering</strong> i vissa fall</li>
                  <li>Rätt till <strong>begränsning</strong> av behandling</li>
                  <li>Rätt att <strong>invända</strong> mot behandling som bygger på berättigat intresse, inklusive direktmarknadsföring</li>
                  <li>Rätt till <strong>dataportabilitet</strong> för uppgifter som behandlas med stöd av samtycke eller avtal</li>
                  <li>Rätt att när som helst <strong>återkalla samtycke</strong> (utan att påverka lagligheten före återkallelsen)</li>
                </ul>
                <p className="mt-4">Du kan utöva rättigheterna genom att kontakta oss (se kontaktuppgifter på webbplatsen). Om du är missnöjd har du rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY): <a className="text-blue-700 underline" href="https://www.imy.se" target="_blank" rel="noreferrer">www.imy.se</a>.</p>
              </PPSection>

              <PPSection id="cookies" title="11. Cookies och liknande tekniker">
                <p>Vi använder cookies/pixlar på vår webbplats för funktion, analys och marknadsföring. <strong>Icke nödvändiga</strong> cookies används endast med ditt <strong>samtycke</strong>. Du kan när som helst ändra dina cookie‑inställningar via vår cookie‑banner. Se vår separata <strong>Cookiepolicy</strong> för detaljer om kategorier, leverantörer, lagringstider och hur du återkallar samtycke.</p>
              </PPSection>

              <PPSection id="forandringar" title="12. Förändringar i denna policy">
                <p>Vi kan uppdatera policyn. Den senaste versionen finns alltid på vår webbplats. Vid väsentliga ändringar informerar vi berörda personer (t.ex. via e‑post eller i våra system).</p>
              </PPSection>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;

/* ======================= Hjälpkomponenter ======================= */

const PPSection: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section id={id} data-pp-section className="scroll-mt-28">
    <h2
      className="text-2xl md:text-3xl font-medium text-[#08132B] mb-4"
      style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
    >
      {title}
    </h2>
    <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
      {children}
    </div>
  </section>
);
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Shield,
  Lock,
  Calendar,
  CheckCircle2,
  Circle,
} from "lucide-react";

/**
 * PrivacyPolicyPage – Workplan AB (Bemanning inom Lager & Logistik)
 *
 * • Layout inspirerad av Academic Work: vänster sidonavigering (scrollspy) + innehåll till höger
 * • All text uppdaterad enligt den detaljerade policy du bad om
 * • Tailwind CSS för styling
 */

const sections = [
  { id: "inledning", title: "Inledning" },
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
  { id: "barn", title: "Barns personuppgifter" },
  { id: "dpia", title: "Dataskyddsbedömningar (DPIA)" },
  { id: "forandringar", title: "Förändringar i denna policy" },
  { id: "kontakt", title: "Kontakt" },
  { id: "bilaga-a", title: "Bilaga A – Mottagarkategorier (exempel)" },
  { id: "bilaga-b", title: "Bilaga B – Gallringsplan (exempel)" },
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
        // Trigger when 40% of the section is visible
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
        ? "bg-blue-50 text-blue-900"
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
    <div className="prose prose-slate max-w-none">
      {children}
    </div>
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

  // Date label (Swedish short text)
  const updatedAt = "20 augusti 2025"; // uppdatera vid behov

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Hero */}
      <header className="border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#08132B] to-[#0B274D] shadow-lg">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1
                className={`text-4xl md:text-5xl font-medium text-[#08132B] tracking-tight transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                Integritetspolicy
              </h1>
              <p className="mt-2 text-gray-600">
                Hur Workplan AB samlar in, använder och skyddar personuppgifter i vår
                bemanningsverksamhet inom lager och logistik.
              </p>
              <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-500">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Senast uppdaterad: {updatedAt}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Lock className="h-4 w-4" /> GDPR‑kompatibel
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_minmax(0,1fr)]">
          {/* Left Sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-24">
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
              {/* Inledning */}
              <Section id="inledning" title="Inledning">
                <p>
                  Workplan AB ("vi", "oss", "vår") respekterar din integritet och är
                  engagerade i att skydda dina personuppgifter. Den här policyn beskriver
                  hur vi behandlar personuppgifter i vår bemanningsverksamhet inom lager
                  och logistik, inklusive rekrytering, uthyrning av konsulter,
                  schemaläggning, tidrapportering, löneadministration och kundrelationer.
                </p>
                <p className="mt-4">
                  Policyn kompletterar information i avtal, kandidat‑/medarbetarportaler och
                  vår cookiepolicy. Vi behandlar uppgifter i enlighet med EU:s
                  dataskyddsförordning (GDPR) och annan tillämplig lagstiftning.
                </p>
              </Section>

              {/* Vem omfattas */}
              <Section id="omfattas" title="Vem omfattas av policyn?">
                <ul>
                  <li>
                    <strong>Jobbsökande/kandidater</strong> (inkl. spontansökande och profiler i
                    kandidatdatabas)
                  </li>
                  <li>
                    <strong>Anställda och konsulter</strong> (inhyrd/ambulerande personal)
                  </li>
                  <li>
                    <strong>Kontaktpersoner hos kunder och potentiella kunder</strong>
                  </li>
                  <li>
                    <strong>Leverantörer och deras kontaktpersoner</strong>
                  </li>
                  <li>
                    <strong>Besökare på vår webbplats</strong> och sociala kanaler
                  </li>
                </ul>
              </Section>

              {/* Vilka uppgifter */}
              <Section id="uppgifter" title="Vilka uppgifter samlar vi in?">
                <h3 className="text-lg font-semibold">Kandidater/jobbsökande</h3>
                <ul>
                  <li>
                    <strong>Identitet & kontakt:</strong> namn, personnummer* (endast vid behov),
                    adress, telefon, e‑post.
                  </li>
                  <li>
                    <strong>Meriter:</strong> CV, personligt brev, utbildning, certifikat (t.ex.
                    truckkort), språk.
                  </li>
                  <li>
                    <strong>Arbetsliv & referenser:</strong> arbetsgivare, referenser
                    (kontaktuppgifter/utlåtanden).
                  </li>
                  <li>
                    <strong>Tester & urvalsdata:</strong> resultat från arbetspsykologiska tester,
                    kompetenskartläggningar och matchning.
                  </li>
                  <li>
                    <strong>Administrativt:</strong> intervjunateckningar, korrespondens,
                    ansökningsdatum, rekryteringssteg.
                  </li>
                  <li>
                    <strong>Webb & cookies:</strong> IP‑adress, enhets‑ och användningsdata (se
                    avsnittet om cookies).
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">
                  *Personnummer behandlas endast när det är nödvändigt för säker identifiering
                  eller när lag kräver det.
                </p>

                <h3 className="mt-6 text-lg font-semibold">Anställda/konsulter</h3>
                <ul>
                  <li>
                    <strong>Anställningsdata:</strong> avtal, befattning, schema, pass/skift,
                    tidrapporter, frånvaro, semester.
                  </li>
                  <li>
                    <strong>Löne‑ & ersättningsdata:</strong> kontouppgifter, skatteuppgifter,
                    utlägg, traktamenten.
                  </li>
                  <li>
                    <strong>Kompetens & utbildning:</strong> intyg, behörigheter (t.ex. truckkort),
                    HLR/brandskydd, interna utbildningar.
                  </li>
                  <li>
                    <strong>Säkerhet & arbetsmiljö:</strong> tillbud/incidentrapporter,
                    skyddsronder, nödvändig skyddsutrustning.
                  </li>
                  <li>
                    <strong>IT & access:</strong> arbetsmail, användarkonton, loggar i
                    schema-/tid‑system.
                  </li>
                  <li>
                    <strong>Eventuell positionering:</strong> platsdata från stämplings‑ eller
                    leveransappar när uppdrag kräver det (se Säkerhet & DPIA).
                  </li>
                </ul>

                <h3 className="mt-6 text-lg font-semibold">Kunder & leverantörer (kontaktpersoner)</h3>
                <ul>
                  <li>Business‑namn, titel, e‑post/telefon, avtal/kommunikationshistorik.</li>
                </ul>

                <h3 className="mt-6 text-lg font-semibold">Känsliga uppgifter</h3>
                <p>
                  Vi behandlar i normalfallet inte känsliga uppgifter (t.ex. hälsa, facklig
                  tillhörighet). Om sådan behandling krävs – t.ex. styrkt arbetsförmåga vid
                  rehabilitering – sker det endast när det är nödvändigt, lagligt och med
                  lämpliga skyddsåtgärder. Uppgifter om lagöverträdelser behandlas endast om
                  det uttryckligen tillåts/krävs enligt lag. Där det är möjligt tillämpar vi
                  principen <em>"se men inte spara kopia"</em>.
                </p>
              </Section>

              {/* Källor */}
              <Section id="kallor" title="Varifrån får vi uppgifterna?">
                <ul>
                  <li>Direkt från dig (ansökan, intervjuer, formulär, e‑post, telefon, chatt).</li>
                  <li>Från referenser som du lämnat.</li>
                  <li>
                    Från offentliga källor/professionella nätverk (t.ex. LinkedIn) och jobbsajter
                    där du själv publicerat uppgifter.
                  </li>
                  <li>
                    Från kunder när du hyrs ut till uppdrag (t.ex. godkända tidrapporter,
                    säkerhetsgenomgångar).
                  </li>
                  <li>
                    Från systemleverantörer (schema, tid, testverktyg) som agerar
                    personuppgiftsbiträden.
                  </li>
                </ul>
              </Section>

              {/* Ändamål & rättslig grund */}
              <Section id="andamal" title="Ändamål och rättslig grund (översikt)">
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
                <p className="mt-4 text-gray-700">
                  När vi lutar oss mot <strong>berättigat intresse</strong> gör vi en
                  intresseavvägning. Du kan invända mot sådan behandling (se Dina rättigheter).
                </p>
              </Section>

              {/* Profilering */}
              <Section id="profilering" title="Profilering och automatiserade beslut">
                <p>
                  Vi kan använda matchnings‑ och planeringsverktyg som <strong>profilerar</strong>
                  kompetens, erfarenhet och tillgänglighet för att föreslå uppdrag. Vi fattar
                  inte beslut som enbart grundas på automatiserad behandling med rättsliga
                  följder för dig utan mänsklig inblandning, om inte lag tillåter och vi
                  informerar särskilt.
                </p>
              </Section>

              {/* Mottagare */}
              <Section id="mottagare" title="Mottagare av personuppgifter">
                <ul>
                  <li>
                    <strong>Kunder/uppdragsgivare:</strong> nödvändiga kontakt‑ och merituppgifter
                    inför/under uppdrag.
                  </li>
                  <li>
                    <strong>Koncernbolag</strong> (om tillämpligt) för intern administration och
                    delade system.
                  </li>
                  <li>
                    <strong>Personuppgiftsbiträden:</strong> IT‑ och molnleverantörer (lön,
                    schema/tid, testverktyg, e‑signering, e‑post), växeltjänster,
                    säkerhet/ID‑system. Biträden får endast behandla enligt våra instruktioner
                    och avtal.
                  </li>
                  <li>
                    <strong>Myndigheter:</strong> t.ex. Skatteverket, Försäkringskassan,
                    Arbetsmiljöverket – när lag kräver.
                  </li>
                  <li>
                    <strong>Övriga:</strong> bank (löner), företagshälsovård, utbildnings‑ och
                    certifieringspartners.
                  </li>
                </ul>
                <p className="mt-4">
                  <strong>Gemensamt personuppgiftsansvar</strong> kan uppstå med vissa kunder för
                  specifika processer (t.ex. arbetsmiljö på uppdragsplatsen). I sådana fall
                  dokumenteras ett arrangemang som tydligt fördelar roller och ansvar och
                  essensen görs tillgänglig på begäran.
                </p>
              </Section>

              {/* Överföringar */}
              <Section id="overforingar" title="Överföring till länder utanför EU/EES">
                <p>
                  Vi strävar efter EU/EES‑behandling. Om överföring till tredjeland sker (t.ex.
                  global molntjänst) använder vi <strong>adekvansbeslut</strong> eller
                  <strong> standardavtalsklausuler (SCC)</strong> och vid behov ytterligare
                  tekniska/organisatoriska skydd. Du kan begära en kopia av tillämpliga
                  skyddsåtgärder via kontaktuppgifterna nedan.
                </p>
              </Section>

              {/* Lagring */}
              <Section id="lagring" title="Lagringstider (gallring)">
                <p>
                  Vi sparar inte uppgifter längre än nödvändigt för ändamålen eller så länge lag
                  kräver. Exempel:
                </p>
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
                        <td className="p-3">
                          Normalt upp till <strong>2 år</strong> efter avslutad process. Kandidatbank
                          längre tid endast med samtycke.
                        </td>
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
                        <td className="p-3">
                          Tills du invänder/avregistrerar eller uppgifterna blir inaktuella.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-gray-700">
                  Faktiska tider specificeras i våra interna gallringsrutiner. När lagringstiden
                  löper ut raderas eller anonymiseras uppgifterna på ett säkert sätt.
                </p>
              </Section>

              {/* Säkerhet */}
              <Section id="sakerhet" title="Säkerhet">
                <p>
                  Vi vidtar lämpliga <strong>tekniska och organisatoriska åtgärder</strong> för att
                  skydda personuppgifter, t.ex.: åtkomststyrning (need‑to‑know), kryptering i
                  vila/transport, flerfaktorsautentisering, loggning/övervakning,
                  säkerhetskopior, leverantörsgranskningar, utbildning av personal, test av
                  incidentrutiner samt <em>privacy by design/default</em>.
                </p>
              </Section>

              {/* Rättigheter */}
              <Section id="rattigheter" title="Dina rättigheter">
                <ul>
                  <li>
                    Rätt till <strong>information</strong> och <strong>tillgång</strong>
                    (registerutdrag)
                  </li>
                  <li>Rätt till <strong>rättelse</strong> av felaktiga uppgifter</li>
                  <li>Rätt till <strong>radering</strong> i vissa fall</li>
                  <li>Rätt till <strong>begränsning</strong> av behandling</li>
                  <li>
                    Rätt att <strong>invända</strong> mot behandling som bygger på berättigat
                    intresse, inklusive direktmarknadsföring
                  </li>
                  <li>
                    Rätt till <strong>dataportabilitet</strong> för uppgifter som behandlas med stöd
                    av samtycke eller avtal
                  </li>
                  <li>
                    Rätt att när som helst <strong>återkalla samtycke</strong> (utan att påverka
                    lagligheten före återkallelsen)
                  </li>
                </ul>
                <p className="mt-4">
                  Du kan utöva rättigheterna genom att kontakta oss (se Kontakt). Om du är
                  missnöjd har du rätt att lämna klagomål till Integritetsskyddsmyndigheten
                  (IMY): <a className="text-blue-700 underline" href="https://www.imy.se" target="_blank" rel="noreferrer">www.imy.se</a>.
                </p>
              </Section>

              {/* Cookies */}
              <Section id="cookies" title="Cookies och liknande tekniker">
                <p>
                  Vi använder cookies/pixlar på vår webbplats för funktion, analys och
                  marknadsföring. <strong>Icke nödvändiga</strong> cookies används endast med ditt
                  <strong> samtycke</strong>. Du kan när som helst ändra dina cookie‑inställningar via
                  vår cookie‑banner. Se vår separata <strong>Cookiepolicy</strong> för detaljer om
                  kategorier, leverantörer, lagringstider och hur du återkallar samtycke.
                </p>
              </Section>

              {/* Barn */}
              <Section id="barn" title="Barns personuppgifter">
                <p>
                  Våra tjänster riktar sig inte till barn. Vi samlar inte medvetet in barns
                  personuppgifter.
                </p>
              </Section>

              {/* DPIA */}
              <Section id="dpia" title="Dataskyddsbedömningar (DPIA)">
                <p>
                  Inför eller vid ändring av behandlingar som kan medföra <strong>hög risk</strong>
                  – t.ex. omfattande spårning/positionering, avancerad profilering eller
                  behandling av känsliga uppgifter – genomför vi konsekvensbedömningar och
                  vidtar riskreducerande åtgärder.
                </p>
              </Section>

              {/* Förändringar */}
              <Section id="forandringar" title="Förändringar i denna policy">
                <p>
                  Vi kan uppdatera policyn. Den senaste versionen finns alltid på vår webbplats.
                  Vid väsentliga ändringar informerar vi berörda personer (t.ex. via e‑post eller
                  i våra system).
                </p>
              </Section>

              {/* Kontakt */}
              <Section id="kontakt" title="Kontakt">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <p><strong>Personuppgiftsansvarig:</strong> Workplan AB</p>
                  <p><strong>Organisationsnummer:</strong> [Organisationsnummer]</p>
                  <p><strong>Adress:</strong> [Gatuadress, Postnr Stad], Sverige</p>
                  <p><strong>E‑post:</strong> privacy@work-plan.se</p>
                  <p><strong>Telefon:</strong> +46 8 123 456 78</p>
                  <p><strong>Dataskyddsombud (om tillämpligt):</strong> [Namn, kontakt]</p>
                </div>
              </Section>

              {/* Bilaga A */}
              <Section id="bilaga-a" title="Bilaga A – Exempel på mottagarkategorier (anpassa)">
                <ul>
                  <li>Lönesystem: [Leverantör]</li>
                  <li>Tid & schema: [Leverantör/App]</li>
                  <li>Rekryteringssystem/test: [Leverantör]</li>
                  <li>E‑signering: [Leverantör]</li>
                  <li>Cloud/hosting/e‑post: [Leverantör]</li>
                  <li>Företagshälsovård: [Leverantör]</li>
                  <li>Utbildning/certifikat: [Leverantör]</li>
                </ul>
              </Section>

              {/* Bilaga B */}
              <Section id="bilaga-b" title="Bilaga B – Exempel på gallringsplan (anpassa)">
                <ul>
                  <li>Rekrytering, ej anställd: radera efter 24 månader (om inte tvist pågår)</li>
                  <li>Kandidatbank (samtycke): omprövas minst var 24:e månad</li>
                  <li>Lön & bokföring: bevara 7 år</li>
                  <li>Tidloggar: 24 månader (om inte krav på längre bevarande)</li>
                  <li>IT‑loggar: 6–12 månader</li>
                  <li>Arbetsmiljö/tillbud: enligt intern rutin och lagkrav</li>
                </ul>
              </Section>

              {/* Footer callout */}
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#08132B] mb-1">
                      Ditt förtroende är viktigt för oss
                    </h3>
                    <p className="text-gray-700">
                      Vi arbetar kontinuerligt för att säkerställa att dina personuppgifter
                      behandlas säkert och transparent. Tveka inte att kontakta oss vid frågor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;

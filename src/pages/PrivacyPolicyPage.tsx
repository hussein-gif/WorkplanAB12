import React, { useEffect, useMemo, useState } from "react";
import {
  Shield,
  Lock,
  Calendar,
  CheckCircle2,
  Circle,
} from "lucide-react";

/**
 * PrivacyPolicyPage – Workplan AB (Bemanning inom Lager & Logistik)
 * Design och layout matchar "Användarvillkor"-sidan
 */

const sections = [
  { id: "inledning", title: "Inledning" },
  { id: "omfattas", title: "Vem omfattas av policyn?" },
  { id: "uppgifter", title: "Vilka uppgifter samlar vi in?" },
  { id: "kallor", title: "Varifrån får vi uppgifterna?" },
  { id: "andamal", title: "Ändamål och rättslig grund" },
  { id: "profilering-dpia", title: "Profilering, automatiserade beslut & DPIA" },
  { id: "mottagare", title: "Mottagare & överföringar" },
  { id: "lagring", title: "Lagringstider (gallring)" },
  { id: "sakerhet", title: "Säkerhet" },
  { id: "rattigheter", title: "Dina rättigheter" },
  { id: "cookies", title: "Cookies och liknande tekniker" },
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
      {/* Header */}
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
                  <Lock className="h-4 w-4" /> GDPR-kompatibel
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
                  Policyn kompletterar information i avtal, kandidat-/medarbetarportaler och
                  vår cookiepolicy. Vi behandlar uppgifter i enlighet med EU:s
                  dataskyddsförordning (GDPR) och annan tillämplig lagstiftning.
                </p>
                <p className="mt-4 text-gray-600">
                  Denna policy kan komma att uppdateras. Den senaste versionen finns alltid på vår webbplats. 
                  Vid större ändringar informerar vi berörda personer.
                </p>
              </Section>

              {/* Vem omfattas */}
              <Section id="omfattas" title="Vem omfattas av policyn?">
                <ul>
                  <li><strong>Jobbsökande/kandidater</strong></li>
                  <li><strong>Anställda och konsulter</strong></li>
                  <li><strong>Kunders kontaktpersoner</strong></li>
                  <li><strong>Leverantörer</strong></li>
                  <li><strong>Besökare på webbplats</strong></li>
                </ul>
              </Section>

              {/* Vilka uppgifter */}
              <Section id="uppgifter" title="Vilka uppgifter samlar vi in?">
                <p>Vi samlar in olika typer av uppgifter beroende på din relation till oss:</p>
                <h3 className="mt-4 text-lg font-semibold">Kandidater/jobbsökande</h3>
                <ul>
                  <li>Identitet & kontakt: namn, adress, telefon, e-post, personnummer vid behov</li>
                  <li>Meriter: CV, utbildning, certifikat, språk</li>
                  <li>Arbetsliv & referenser</li>
                  <li>Tester & urvalsdata</li>
                  <li>Administrativt: intervjuer, anteckningar, rekryteringssteg</li>
                  <li>Webb & cookies: IP-adress, användningsdata</li>
                </ul>
                <h3 className="mt-6 text-lg font-semibold">Anställda/konsulter</h3>
                <ul>
                  <li>Anställningsdata: schema, tidrapporter, frånvaro</li>
                  <li>Löne- & ersättningsdata</li>
                  <li>Kompetenser & utbildning</li>
                  <li>Säkerhet & arbetsmiljö</li>
                  <li>IT & access</li>
                  <li>Eventuell positionering vid behov</li>
                </ul>
                <h3 className="mt-6 text-lg font-semibold">Kunder & leverantörer</h3>
                <ul>
                  <li>Kontaktuppgifter, avtal, kommunikationshistorik</li>
                </ul>
              </Section>

              {/* Källor */}
              <Section id="kallor" title="Varifrån får vi uppgifterna?">
                <ul>
                  <li>Direkt från dig (ansökan, e-post, telefon)</li>
                  <li>Från referenser</li>
                  <li>Från offentliga källor (LinkedIn, jobbsajter)</li>
                  <li>Från kunder (t.ex. godkända tidrapporter)</li>
                  <li>Från systemleverantörer som agerar biträden</li>
                </ul>
              </Section>

              {/* Ändamål */}
              <Section id="andamal" title="Ändamål och rättslig grund">
                <p>Vi behandlar personuppgifter för olika ändamål:</p>
                <ul>
                  <li>Rekrytering och matchning</li>
                  <li>Uthyrning & uppdrag</li>
                  <li>Lön & administration</li>
                  <li>Arbetsmiljö & säkerhet</li>
                  <li>Kvalitet & regelefterlevnad</li>
                  <li>IT-drift & säkerhet</li>
                  <li>Marknad & sälj B2B</li>
                  <li>Webb & cookies</li>
                </ul>
              </Section>

              {/* Profilering & DPIA */}
              <Section id="profilering-dpia" title="Profilering, automatiserade beslut & DPIA">
                <p>
                  Vi kan använda system som profilerar kompetens, erfarenhet och tillgänglighet 
                  för att föreslå uppdrag. Beslut fattas dock inte enbart automatiserat utan 
                  mänsklig inblandning.
                </p>
                <p className="mt-4">
                  När behandlingar kan medföra hög risk (t.ex. omfattande spårning eller känsliga uppgifter) 
                  gör vi alltid en dataskyddsbedömning (DPIA) och vidtar riskreducerande åtgärder.
                </p>
              </Section>

              {/* Mottagare & överföringar */}
              <Section id="mottagare" title="Mottagare & överföringar">
                <p>Uppgifter kan delas med:</p>
                <ul>
                  <li>Kunder/uppdragsgivare</li>
                  <li>Koncernbolag</li>
                  <li>Personuppgiftsbiträden (IT, lön, e-post, säkerhetssystem)</li>
                  <li>Myndigheter (Skatteverket, Försäkringskassan, Arbetsmiljöverket)</li>
                  <li>Övriga: bank, företagshälsovård, utbildningspartners</li>
                </ul>
                <p className="mt-4">
                  Om överföring sker till länder utanför EU/EES används adekvansbeslut eller 
                  standardavtalsklausuler (SCC) och vid behov extra skyddsåtgärder.
                </p>
              </Section>

              {/* Lagring */}
              <Section id="lagring" title="Lagringstider (gallring)">
                <p>Exempel på lagringstider:</p>
                <ul>
                  <li>Rekrytering (icke anställd): upp till 2 år</li>
                  <li>Anställningsdata: under uppdrag + preskriptionstid</li>
                  <li>Bokföringsunderlag: 7 år</li>
                  <li>Arbetsmiljödokumentation: enligt lag</li>
                  <li>IT-loggar: 6–24 månader</li>
                  <li>Marknadsföring B2B: tills avregistrering</li>
                </ul>
              </Section>

              {/* Säkerhet */}
              <Section id="sakerhet" title="Säkerhet">
                <p>
                  Vi skyddar personuppgifter med tekniska och organisatoriska åtgärder som 
                  åtkomststyrning, kryptering, flerfaktorsautentisering, loggning, 
                  leverantörsgranskning och utbildning av personal.
                </p>
              </Section>

              {/* Rättigheter */}
              <Section id="rattigheter" title="Dina rättigheter">
                <ul>
                  <li>Rätt till information och registerutdrag</li>
                  <li>Rätt till rättelse</li>
                  <li>Rätt till radering</li>
                  <li>Rätt till begränsning</li>
                  <li>Rätt att invända mot behandling</li>
                  <li>Rätt till dataportabilitet</li>
                  <li>Rätt att återkalla samtycke</li>
                </ul>
                <p className="mt-4">
                  Du kan utöva rättigheterna genom att kontakta oss. 
                  Om du är missnöjd kan du vända dig till Integritetsskyddsmyndigheten (IMY):{" "}
                  <a
                    className="text-blue-700 underline"
                    href="https://www.imy.se"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.imy.se
                  </a>
                  .
                </p>
              </Section>

              {/* Cookies */}
              <Section id="cookies" title="Cookies och liknande tekniker">
                <p>
                  Vi använder cookies/pixlar för funktion, analys och marknadsföring. 
                  Icke nödvändiga cookies används endast med ditt samtycke. 
                  Se vår cookiepolicy för mer detaljer.
                </p>
              </Section>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;

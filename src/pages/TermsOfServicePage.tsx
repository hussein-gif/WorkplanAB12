import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, FileText, Shield } from 'lucide-react';

/**
 * TermsOfServicePage – Komprimerad, mer professionell struktur (v2.1)
 * - Kortare och sammanslagna rubriker (inspirerat av branschpraxis)
 * - Tydliga kärnpunkter för användarvillkor; ingen betalningssektion
 * - + Detaljerade standardklausuler: Ansvarsbegränsning, Force majeure, Ogiltighet/Tolkning
 * - Behåller layout, typsnitt (Zen Kaku + Inter) och sticky TOC
 */

const sections = [
  { id: 'allmant', label: '1. Allmänt & tillämpning' },
  { id: 'tjanster-anvandning', label: '2. Tjänster & användning' },
  { id: 'konto-ansvar', label: '3. Konto, roller & ansvar' },
  { id: 'integritet-cookies', label: '4. Integritet & cookies' },
  { id: 'immaterial-sakerhet', label: '5. Immaterialrätt & säkerhet' },
  { id: 'sekretess-bakgrund', label: '6. Sekretess & bakgrundskontroller' },
  { id: 'tillit-tek-komp', label: '7. Länkar, kompatibilitet & tillgänglighet' },
  { id: 'ansvarsbegransning', label: '8. Ansvarsbegränsning & friskrivningar' },
  { id: 'force-majeure', label: '9. Force majeure' },
  { id: 'tolkning-ogiltighet', label: '10. Tolkning, ogiltighet & meddelanden' },
  { id: 'andringar-upphor', label: '11. Ändringar, upphörande & överlåtelse' },
  { id: 'lag-tvist', label: '12. Tillämplig lag & tvist' },
  { id: 'kontakt', label: '13. Kontakt' },
];

const TermsOfServicePage: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const observer = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { root: null, rootMargin: '0px 0px -70% 0px', threshold: [0.25, 0.5, 0.75, 1] }
    );
  }, []);

  useEffect(() => {
    if (!observer) return;
    const el = containerRef.current;
    if (!el) return;
    const targets = Array.from(el.querySelectorAll('section[data-tos-section]'));
    targets.forEach((t) => observer.observe(t));
    return () => targets.forEach((t) => observer.unobserve(t));
  }, [observer]);

  const handleClick = (id: string) => {
    const node = document.getElementById(id);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7FAFF' }}>
      {/* Hero */}
      <header className="pt-20 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#08132B] to-[#0B274D] rounded-2xl flex items-center justify-center shadow-lg">
              <FileText size={26} className="text-white" />
            </div>
            <div>
              <h1
                className="text-4xl md:text-5xl font-medium text-[#08132B] tracking-tight"
                style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
              >
                Användarvillkor
              </h1>
              <p className="text-gray-600 mt-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                Villkor för användning av Workplan AB:s tjänster och webbplats
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500 mt-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="flex items-center gap-2"><Calendar size={16} /> Senast uppdaterad: 20 augusti 2025</span>
                <span className="flex items-center gap-2"><Shield size={16} /> Version 2.1</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Innehåll med sidomeny */}
      <main className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Vänster TOC */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <nav className="sticky top-24 bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-6 max-h-[80vh] overflow-auto" aria-label="Innehåll">
              <ul className="space-y-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                {sections.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => handleClick(s.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        activeId === s.id
                          ? 'bg-blue-50 text-[#0B274D] font-medium ring-1 ring-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Höger innehåll */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div ref={containerRef} className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-10 space-y-12">
              <Section id="allmant" title="1. Allmänt & tillämpning">
                <p>
                  Dessa villkor ("Villkoren") gäller när du använder Workplan AB:s ("Workplan", "vi") webbplats och tjänster. Genom att använda
                  plattformen accepterar du Villkoren. Om du inte accepterar dem ska du avstå från att använda tjänsterna.
                </p>
                <p>
                  Villkoren riktar sig till företagskunder som hyr in personal och kandidater som söker uppdrag/anställning inom lager och logistik.
                </p>
              </Section>

              <Section id="tjanster-anvandning" title="2. Tjänster & användning">
                <p>
                  Vi tillhandahåller bemanning och rekrytering. Omfattning och specifika kommersiella villkor regleras i separata avtal mellan Workplan
                  och berörd kund. Tjänsterna får inte användas för olagliga eller diskriminerande ändamål och får inte missbrukas (t.ex. säkerhetsintrång,
                  sabotage, massutskick/spam, kringgående av åtkomstkontroller eller brott mot gällande lagstiftning).
                </p>
              </Section>

              <Section id="konto-ansvar" title="3. Konto, roller & ansvar">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Vissa funktioner kräver konto. Du ansvarar för riktiga uppgifter och för att skydda dina inloggningsuppgifter.</li>
                  <li>Kunder ansvarar för arbetsmiljö, introduktion och säkerhet på sin arbetsplats. Kandidater ska följa instruktioner och säkerhetsregler.</li>
                  <li>Vi kan begränsa eller avsluta åtkomst vid missbruk, säkerhetsrisk eller brott mot Villkoren.</li>
                </ul>
              </Section>

              <Section id="integritet-cookies" title="4. Integritet & cookies">
                <p>
                  Personuppgifter behandlas enligt gällande dataskyddslagstiftning och vår Integritetspolicy, som beskriver ändamål, lagringstider och
                  rättigheter. Webbplatsen använder cookies för nödvändiga funktioner och statistik enligt vår Cookiepolicy.
                </p>
              </Section>

              <Section id="immaterial-sakerhet" title="5. Immaterialrätt & säkerhet">
                <p>
                  Allt innehåll på webbplatsen tillhör Workplan eller licensgivare och skyddas av immaterialrätt. Otillåten kopiering, bearbetning eller
                  spridning är förbjuden. Vi vidtar rimliga tekniska och organisatoriska säkerhetsåtgärder men kan inte garantera fullständig
                  avbrottsfrihet, felfrihet eller skydd mot intrång; användaren ska vidta egna skyddsåtgärder.
                </p>
              </Section>

              <Section id="sekretess-bakgrund" title="6. Sekretess & bakgrundskontroller">
                <p>
                  Parterna ska skydda konfidentiell information som erhålls inom ramen för samarbetet. Kundspecifik information, prissättning,
                  kandidatuppgifter och affärshemligheter får inte röjas utan skriftligt medgivande, såvida inte skyldighet att röja följer av lag eller
                  myndighetsbeslut. Bakgrundskontroller kan förekomma där uppdrag kräver det och sker i enlighet med lag och vår Integritetspolicy.
                </p>
              </Section>

              <Section id="tillit-tek-komp" title="7. Länkar, kompatibilitet & tillgänglighet">
                <p>
                  Webbplatsen kan innehålla länkar eller integrationer till tredjepartstjänster som vi inte ansvarar för avseende innehåll, policyer eller
                  tillgänglighet. Vi strävar efter bred teknisk kompatibilitet och förbättrad tillgänglighet (t.ex. i linje med relevanta riktlinjer) men kan
                  inte garantera full funktionalitet i alla webbläsare, enheter eller versioner. Rapportera gärna hinder till oss.
                </p>
              </Section>

              <Section id="ansvarsbegransning" title="8. Ansvarsbegränsning & friskrivningar">
                <p>
                  I den utsträckning som tillåts enligt tvingande lag ansvarar Workplan inte för indirekta skador, följdskador eller särskilda skador,
                  såsom utebliven vinst, produktionsbortfall, dataförlust, goodwill-förlust eller tredje mans anspråk, som uppstår till följd av eller i
                  samband med användning av webbplatsen eller tjänsterna.
                </p>
                <p>
                  Workplan lämnar inga garantier (uttryckliga eller underförstådda) avseende tillgänglighet, prestanda, felfrihet eller att tjänsterna
                  uppfyller användarens specifika behov. Tjänster och information tillhandahålls i befintligt skick ("as is") med de begränsningar som följer
                  av lag och dessa Villkor.
                </p>
                <p>
                  Workplans sammanlagda ansvar för skador som står i samband med tjänsterna är, där lag så medger, begränsat till ett belopp motsvarande den
                  ersättning som betalats till Workplan för den tjänst som kravet hänför sig till under de tolv (12) månader som närmast föregått den händelse
                  som gav upphov till ansvaret. Ansvarsbegränsningen gäller inte vid uppsåt eller grov vårdslöshet eller där tvingande lag föreskriver annat.
                </p>
              </Section>

              <Section id="force-majeure" title="9. Force majeure">
                <p>
                  Part är befriad från påföljd för underlåtenhet att fullgöra förpliktelse enligt dessa Villkor om fullgörandet väsentligen försvåras, hindras
                  eller försenas av omständighet utanför partens rimliga kontroll och som parten inte skäligen kunde ha räknat med vid Villkorens accept eller
                  undvikit eller övervunnit följderna av ("Force majeure").
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Exempel på Force majeure: naturkatastrof, brand, översvämning, epidemi/pandemi, krig, terrorism, sabotage, upplopp, strejk eller annan arbetskonflikt, större driftstörningar i el- eller nätinfrastruktur, myndighetsbeslut eller nya lagkrav.</li>
                  <li>Den drabbade parten ska utan oskäligt dröjsmål meddela den andra parten om Force majeure-situationen och vidta skäliga åtgärder för att begränsa dess effekter.</li>
                  <li>När hindret upphör ska förpliktelsen fullgöras. Om hindret varar längre än nittio (90) dagar i följd har vardera parten rätt att säga upp berörd del av tjänsten utan skadeståndsskyldighet.</li>
                </ul>
              </Section>

              <Section id="tolkning-ogiltighet" title="10. Tolkning, ogiltighet & meddelanden">
                <p>
                  Om någon bestämmelse i Villkoren skulle befinnas ogiltig eller inte kunna göras gällande ska detta inte påverka giltigheten av övriga
                  bestämmelser; sådan bestämmelse ska i stället tillämpas i den utsträckning som medges av gällande lag, och i övrigt ersättas av en giltig
                  bestämmelse som ligger så nära parternas ursprungliga avsikt som möjligt ("severability"). Vid motstridighet mellan språkversioner har den
                  svenska versionen företräde.
                </p>
                <p>
                  Meddelanden enligt Villkoren kan lämnas via e‑post eller inom plattformen till de kontaktuppgifter som användaren eller kunden angivit och
                  anses ha kommit mottagaren till handa när de skickats, om inte annat följer av tvingande lag. Parterna ska hålla sina kontaktuppgifter
                  uppdaterade.
                </p>
              </Section>

              <Section id="andringar-upphor" title="11. Ändringar, upphörande & överlåtelse">
                <p>
                  Vi kan uppdatera Villkoren; väsentliga ändringar meddelas via webbplatsen. Vi får överlåta rättigheter och skyldigheter i samband med
                  affärstransaktion (t.ex. fusion, förvärv eller verksamhetsöverlåtelse). Du kan avsluta ditt konto genom att kontakta oss; upphörande enligt
                  separata kundavtal gäller för kommersiella tjänster.
                </p>
              </Section>

              <Section id="lag-tvist" title="12. Tillämplig lag & tvist">
                <p>
                  Svensk materiell rätt gäller med undantag för dess lagvalsregler. Tvister som inte löses genom förhandling prövas av allmän domstol i
                  Sverige med tingsrätten på Workplans hemort som första instans, i den mån tvingande lag inte föreskriver annat.
                </p>
              </Section>

              <Section id="kontakt" title="13. Kontakt">
                <DefinitionList
                  items={[
                    ['Företag', 'Workplan AB'],
                    ['Organisationsnummer', '[Ange org.nr]'],
                    ['Adress', '[Företagsadress], Sverige'],
                    ['E‑post', 'info@work-plan.se'],
                    ['Webbplats', 'work-plan.se'],
                  ]}
                />
                <InfoBox>
                  Uppdatera kontakt- och bolagsuppgifter innan publicering. Kommersiella villkor (inkl. prissättning/fakturering) regleras endast i separata avtal och ingår inte i dessa användarvillkor.
                </InfoBox>
              </Section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfServicePage;

/* ======================= Hjälpkomponenter ======================= */

const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section id={id} data-tos-section className="scroll-mt-28">
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

const DefinitionList: React.FC<{ items: [string, string][] }> = ({ items }) => (
  <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
    {items.map(([k, v], idx) => (
      <div key={idx} className="border border-gray-200 rounded-xl p-3 bg-gray-50">
        <dt className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>{k}</dt>
        <dd className="text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>{v}</dd>
      </div>
    ))}
  </dl>
);

const InfoBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-900" style={{ fontFamily: 'Inter, sans-serif' }}>
    {children}
  </div>
);

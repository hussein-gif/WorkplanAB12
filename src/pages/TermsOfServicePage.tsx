import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, FileText, Shield, CheckCircle2 } from 'lucide-react';

/**
 * TermsOfServicePage
 * - Bakgrundsfärg #F7FAFF (hela sidan)
 * - Vänster sidomeny (TOC) som följer med vid scroll och markerar aktiv rubrik
 * - Höger kolumn med fullständiga villkor för bemanningsföretag inom lager/logistik
 * - Behåller nuvarande typsnitt/stil (Zen Kaku Gothic Antique + Inter)
 * - Tar bort innehåll som inte bör vara där (t.ex. grafiska orbs och onödig bakgrundsanimation)
 * - Inkluderar ALLA sektioner vi diskuterade + några extra praktiska juridiska avsnitt
 */

const sections = [
  { id: 'allmant', label: '1. Allmänt' },
  { id: 'foretagsinfo', label: '2. Företagsinformation' },
  { id: 'definitioner', label: '3. Definitioner' },
  { id: 'anvandakonto', label: '4. Användarkonto' },
  { id: 'tjanster', label: '5. Våra tjänster' },
  { id: 'kundens-ansvar', label: '6. Kundens ansvar' },
  { id: 'kandidaters-ansvar', label: '7. Kandidaters ansvar' },
  { id: 'betalningsvillkor', label: '8. Betalningsvillkor' },
  { id: 'personuppgifter', label: '9. Personuppgifter & integritet' },
  { id: 'cookies', label: '10. Cookies' },
  { id: 'immaterialratt', label: '11. Immateriella rättigheter' },
  { id: 'otillaten-anvandning', label: '12. Otillåten användning' },
  { id: 'sakerhet', label: '13. IT- & informationssäkerhet' },
  { id: 'sekretess', label: '14. Sekretess (NDA) & konfidentialitet' },
  { id: 'bakgrundskontroller', label: '15. Bakgrundskontroller' },
  { id: 'arbetsmiljo', label: '16. Arbetsmiljö & skyddsregler' },
  { id: 'ansvarsbegransning', label: '17. Begränsning av ansvar' },
  { id: 'force-majeure', label: '18. Force majeure' },
  { id: 'tredjepartslankar', label: '19. Tredjepartslänkar & verktyg' },
  { id: 'teknisk-kompat', label: '20. Teknisk kompatibilitet' },
  { id: 'tillganglighet', label: '21. Tillgänglighet (WCAG)' },
  { id: 'signering', label: '22. Elektronisk signering & meddelanden' },
  { id: 'overlatelse', label: '23. Överlåtelse' },
  { id: 'tolkning', label: '24. Tolkning & ogiltighet' },
  { id: 'andringar', label: '25. Ändringar av villkor' },
  { id: 'uppsagning', label: '26. Uppsägning & upphörande' },
  { id: 'lag-tvist', label: '27. Tillämplig lag & tvistlösning' },
  { id: 'ikrafttradande', label: '28. Ikraftträdande & versioner' },
  { id: 'kontakt', label: '29. Kontakt' },
];

const TermsOfServicePage: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const observer = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return new IntersectionObserver(
      (entries) => {
        // Välj den sektion som är mest i fokus
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
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
      // Manuellt sätt aktiv när man klickar
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
                Villkor för användning av {`Workplan AB`}:s tjänster och webbplats
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500 mt-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="flex items-center gap-2"><Calendar size={16} /> Senast uppdaterad: 1 januari 2025</span>
                <span className="flex items-center gap-2"><Shield size={16} /> Version 1.0</span>
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
              {/* Helper components */}
              <Section id="allmant" title="1. Allmänt">
                <p>
                  Dessa användarvillkor ("Villkoren") reglerar din användning av Workplan AB:s ("Workplan", "vi", "oss", "vår") webbplats, konton och
                  bemanningstjänster inom lager och logistik. Genom att besöka webbplatsen, skapa konto, registrera dig som kandidat eller beställa tjänster som kund
                  accepterar du Villkoren. Om du inte accepterar dem ska du avstå från att använda webbplatsen eller tjänsterna.
                </p>
              </Section>

              <Section id="foretagsinfo" title="2. Företagsinformation">
                <DefinitionList
                  items={[
                    ['Företagsnamn', 'Workplan AB'],
                    ['Organisationsnummer', '[Ditt organisationsnummer]'],
                    ['Adress', '[Din företagsadress]'],
                    ['Telefon', '+46 [ditt nummer]'],
                    ['E-post', 'info@work-plan.se'],
                    ['Webbplats', 'work-plan.se'],
                  ]}
                />
                <InfoBox>
                  Ange korrekta uppgifter ovan innan publicering. Dessa används även i avtal, fakturor och integritetspolicy.
                </InfoBox>
              </Section>

              <Section id="definitioner" title="3. Definitioner">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Kund:</strong> Företag som hyr in personal via oss.</li>
                  <li><strong>Kandidat/Arbetstagare:</strong> Person som registrerar sig för bemanningsuppdrag eller anställning.</li>
                  <li><strong>Tjänster:</strong> Bemanning, rekrytering och relaterade tjänster vi tillhandahåller.</li>
                  <li><strong>Webbplats:</strong> Vår webbplats och digitala plattformar.</li>
                </ul>
              </Section>

              <Section id="anvandakonto" title="4. Användarkonto">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Vissa funktioner kräver konto. Du ansvarar för riktiga, uppdaterade uppgifter.</li>
                  <li>Håll inloggningsuppgifter hemliga. Du ansvarar för all aktivitet via ditt konto.</li>
                  <li>Vi kan begränsa eller stänga konton vid missbruk eller brott mot Villkoren.</li>
                </ul>
              </Section>

              <Section id="tjanster" title="5. Våra tjänster">
                <p>Workplan erbjuder bemanning inom lager/logistik, bl.a.:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Timanställning, vikariat, säsong, prov- och tillsvidareanställning.</li>
                  <li>Konsultuppdrag och rekrytering.</li>
                </ul>
                <p>Omfattning, SLA, pris och övriga villkor framgår av separata kundavtal.</p>
              </Section>

              <Section id="kundens-ansvar" title="6. Kundens ansvar">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Lämna korrekta uppgifter vid beställning. Tillhandahåll nödvändig introduktion och instruktioner.</li>
                  <li>Ansvara för arbetsmiljö, säkerhet, skyddsutrustning och tillbudshantering på arbetsplatsen.</li>
                  <li>Följa gällande lagar (arbetsrätt, arbetsmiljö, diskrimineringslagstiftning, arbetstidsregler).</li>
                  <li>Inte använda tjänsterna för olagliga, oetiska eller diskriminerande syften.</li>
                </ul>
              </Section>

              <Section id="kandidaters-ansvar" title="7. Kandidaters ansvar">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Lämna sanningsenliga uppgifter; meddela ändringar prompt.</li>
                  <li>Följa instruktioner, interna regler, säkerhetsrutiner samt bära föreskriven skyddsutrustning.</li>
                  <li>Inte vara påverkad av alkohol/droger; följa nolltolerans för trakasserier och diskriminering.</li>
                  <li>Acceptera att vi kan kontakta dig via e-post, sms eller telefon gällande uppdrag.</li>
                </ul>
              </Section>

              <Section id="betalningsvillkor" title="8. Betalningsvillkor (kunder)">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Priser och timtaxor framgår av kundavtal/offerter.</li>
                  <li>Fakturering normalt 30 dagar netto. Dröjsmålsränta enligt räntelagen samt påminnelseavgift.</li>
                  <li>Vid utebliven betalning kan tjänster pausas tills full betalning sker.</li>
                </ul>
              </Section>

              <Section id="personuppgifter" title="9. Personuppgifter & integritet (GDPR)">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personuppgifter behandlas enligt GDPR och vår Integritetspolicy.</li>
                  <li>Ändamål: hantera kandidater, matchning, uppdrag, löne- och fakturaunderlag, kundrelationer.</li>
                  <li>Lagringstid: endast så länge det är nödvändigt för syftet eller enligt lag.</li>
                  <li>Rättigheter: tillgång, rättelse, radering, invändning, dataportabilitet.</li>
                </ul>
                <InfoBox>
                  Publicera en separat <strong>Integritetspolicy</strong> och länka den här.
                </InfoBox>
              </Section>

              <Section id="cookies" title="10. Cookies">
                <p>Vi använder cookies för nödvändiga funktioner, statistik och förbättrad upplevelse. Du kan hantera inställningar i din webbläsare och i vår cookie-banner. Se vår Cookiepolicy.</p>
              </Section>

              <Section id="immaterialratt" title="11. Immateriella rättigheter">
                <p>Allt innehåll (texter, logotyper, grafik, design, kod) ägs av Workplan AB eller licensgivare och skyddas av immaterialrätt. Otillåten kopiering, bearbetning eller spridning är förbjuden.</p>
              </Section>

              <Section id="otillaten-anvandning" title="12. Otillåten användning">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Olagliga aktiviteter, intrångsförsök, sabotage, phishing eller spridning av skadlig kod.</li>
                  <li>Massutskick/spam, scraping utan tillstånd, kringgående av säkerhet eller åtkomstkontroller.</li>
                </ul>
              </Section>

              <Section id="sakerhet" title="13. IT- & informationssäkerhet">
                <p>Vi vidtar rimliga tekniska och organisatoriska säkerhetsåtgärder. Ingen metod är dock helt riskfri; användare bör vidta egna skyddsåtgärder.</p>
              </Section>

              <Section id="sekretess" title="14. Sekretess (NDA) & konfidentialitet">
                <p>Parterna ska skydda varandras konfidentiella information. Kundspecifik information, prissättning, kandidatuppgifter och affärshemligheter får inte röjas utan skriftligt medgivande, utom där lag kräver.</p>
              </Section>

              <Section id="bakgrundskontroller" title="15. Bakgrundskontroller">
                <p>Bakgrundskontroller kan förekomma för särskilda uppdrag och sker enligt lag och Integritetspolicy. Kund får inte kräva otillåtna kontroller.</p>
              </Section>

              <Section id="arbetsmiljo" title="16. Arbetsmiljö & skyddsregler">
                <p>Kunden ansvarar för en säker arbetsmiljö och introduktion enligt arbetsmiljölagen. Kandidater ska följa samtliga säkerhetsföreskrifter.</p>
              </Section>

              <Section id="ansvarsbegransning" title="17. Begränsning av ansvar">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Vi eftersträvar tillgänglighet men garanterar inte frihet från avbrott/fel.</li>
                  <li>Vi ansvarar inte för indirekta skador (t.ex. utebliven vinst, dataförlust, följdskador).</li>
                  <li>Maximalt ansvar begränsas till belopp som kunden betalat under de senaste 12 månaderna för berörd tjänst, i den mån lag medger.</li>
                </ul>
              </Section>

              <Section id="force-majeure" title="18. Force majeure">
                <p>Vi ansvarar inte för förseningar eller skador orsakade av omständigheter utanför vår kontroll (t.ex. strejk, myndighetsbeslut, pandemier, krig, naturhändelser, omfattande driftstörningar).</p>
              </Section>

              <Section id="tredjepartslankar" title="19. Tredjepartslänkar & verktyg">
                <p>Webbplatsen kan innehålla länkar till tredjepartstjänster. Vi ansvarar inte för deras innehåll, policyer eller tillgänglighet.</p>
              </Section>

              <Section id="teknisk-kompat" title="20. Teknisk kompatibilitet">
                <p>Vi eftersträvar bred kompatibilitet men kan inte garantera full funktionalitet i alla webbläsare, enheter eller versioner.</p>
              </Section>

              <Section id="tillganglighet" title="21. Tillgänglighet (WCAG)">
                <p>Vi arbetar för att förbättra tillgänglighet i linje med relevanta riktlinjer. Kontakta oss för att rapportera hinder.</p>
              </Section>

              <Section id="signering" title="22. Elektronisk signering & meddelanden">
                <p>Avtal kan ingås elektroniskt. Meddelanden kan skickas via e-post eller inom plattformen och anses mottagna när de skickats.</p>
              </Section>

              <Section id="overlatelse" title="23. Överlåtelse">
                <p>Vi får överlåta rättigheter/skyldigheter enligt dessa Villkor i samband med affärstransaktion (fusion, försäljning m.m.). Du får inte överlåta utan vårt skriftliga medgivande.</p>
              </Section>

              <Section id="tolkning" title="24. Tolkning & ogiltighet">
                <p>Om en bestämmelse är ogiltig påverkar det inte övriga. Vid konflikt mellan språkversioner har svensk version företräde.</p>
              </Section>

              <Section id="andringar" title="25. Ändringar av villkor">
                <p>Vi kan uppdatera Villkoren. Betydande ändringar meddelas via webbplatsen eller e-post. Uppdaterade villkor gäller från publicering.</p>
              </Section>

              <Section id="uppsagning" title="26. Uppsägning & upphörande">
                <p>Vi kan säga upp eller begränsa åtkomst vid brott mot Villkoren eller lag. Kundens uppsägning regleras i kundavtal. Kandidater kan avsluta kontot genom att kontakta oss.</p>
              </Section>

              <Section id="lag-tvist" title="27. Tillämplig lag & tvistlösning">
                <p>Svensk lag gäller. Tvister som inte löses genom förhandling avgörs av svensk domstol (valfri: tingsrätten på vår ort som första instans).</p>
              </Section>

              <Section id="ikrafttradande" title="28. Ikraftträdande & versioner">
                <p>Dessa Villkor gäller från publiceringsdatum och ersätter tidigare versioner.</p>
              </Section>

              <Section id="kontakt" title="29. Kontakt">
                <DefinitionList
                  items={[
                    ['Workplan AB', ''],
                    ['E-post', 'info@work-plan.se'],
                    ['Telefon', '+46 [ditt nummer]'],
                    ['Adress', '[Företagsadress], Sverige'],
                  ]}
                />
                <div className="mt-4 flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl p-3">
                  <CheckCircle2 size={18} />
                  <span>Observera: Uppdatera kontakt- och bolagsuppgifter innan publicering.</span>
                </div>
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

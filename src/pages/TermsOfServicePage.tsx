import React, { useEffect, useRef, useState } from 'react';
import { FileText, Calendar } from 'lucide-react';

/**
 * TermsOfServicePage – Komprimerad, professionell struktur (v2.4)
 * - Rubrik i mitten, logga ovanför, underrubrik under
 * - "Senast uppdaterad" ovanför vänstra rutan
 * - Vänster TOC smalare, mindre text/padding (alla punkter syns utan scroll)
 * - Stabil scroll-spy (NAV_OFFSET_PX)
 * - Aktiv TOC-punkt: bg #08132B + vit text
 * - HEADER FIX: ingen border-linje, och samma bakgrund (#F7FAFF) som resten av sidan
 */

const sections = [
  { id: 'allmant', label: '1. Allmänt & tillämpning' },
  { id: 'tjanster-anvandning', label: '2. Tjänster & användning' },
  { id: 'konto-ansvar', label: '3. Konto, roller & ansvar' },
  { id: 'immaterial-sakerhet', label: '4. Immaterialrätt & säkerhet' },
  { id: 'sekretess-bakgrund', label: '5. Sekretess & bakgrundskontroller' },
  { id: 'tillit-tek-komp', label: '6. Länkar, kompatibilitet & tillgänglighet' },
  { id: 'ansvarsbegransning', label: '7. Ansvarsbegränsning & friskrivningar' },
  { id: 'force-majeure', label: '8. Force majeure' },
  { id: 'tolkning-ogiltighet', label: '9. Tolkning, ogiltighet & meddelanden' },
  { id: 'andringar-upphor', label: '10. Ändringar, upphörande & överlåtelse' },
  { id: 'lag-tvist', label: '11. Tillämplig lag & tvist' },
];

const NAV_OFFSET_PX = 120; // justera vid behov om din navbar är högre/lägre

const TermsOfServicePage: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeIdRef = useRef<string>(activeId);
  activeIdRef.current = activeId;

  // Robust scroll-spy: välj den sektion vars topp är närmast ovanför visningsytans topp (med navbar-offset)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const getSections = () => Array.from(el.querySelectorAll('section[data-tos-section]')) as HTMLElement[];

    const onScroll = () => {
      const secs = getSections();
      if (!secs.length) return;
      const scrollY = window.scrollY + NAV_OFFSET_PX + 1;
      let currentId = secs[0].id;
      for (const sec of secs) {
        if (sec.offsetTop <= scrollY) currentId = sec.id;
        else break; // eftersom sektionerna ligger i ordning
      }
      if (currentId !== activeIdRef.current) setActiveId(currentId);
    };

    // Kör direkt och på scroll/resize
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

  const updatedAt = '20 augusti 2025';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7FAFF' }}>
      {/* Hero – samma ljusblå bakgrund som resten, ingen border-linje */}
      <header className="px-6 py-12" style={{ backgroundColor: '#F7FAFF' }}>
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#08132B] to-[#0B274D] rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1
            className="text-4xl md:text-5xl font-medium text-[#08132B] tracking-tight"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Användarvillkor
          </h1>
          <p
            className="text-gray-700 mt-4 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            Villkor för användning av Workplan AB:s tjänster och webbplats
          </p>
        </div>
      </header>

      {/* Innehåll med sidomeny */}
      <main className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Vänster TOC – smalare, mindre text, ingen scroll; "Senast uppdaterad" ovanför */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24">
              <div
                className="text-xs text-gray-500 mb-2 flex items-center gap-1.5"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Calendar className="h-3.5 w-3.5" /> Senast uppdaterad: {updatedAt}
              </div>
              <nav
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 md:p-4 max-w-xs"
                aria-label="Innehåll"
              >
                <ul className="space-y-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {sections.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => handleClick(s.id)}
                        className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition ${
                          activeId === s.id
                            ? 'bg-[#08132B] text-white font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
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

              <Section id="immaterial-sakerhet" title="4. Immaterialrätt & säkerhet">
                <p>
                  Allt innehåll på webbplatsen tillhör Workplan eller licensgivare och skyddas av immaterialrätt. Otillåten kopiering, bearbetning eller
                  spridning är förbjuden. Vi vidtar rimliga tekniska och organisatoriska säkerhetsåtgärder men kan inte garantera fullständig
                  avbrottsfrihet, felfrihet eller skydd mot intrång; användaren ska vidta egna skyddsåtgärder.
                </p>
              </Section>

              <Section id="sekretess-bakgrund" title="5. Sekretess & bakgrundskontroller">
                <p>
                  Parterna ska skydda konfidentiell information som erhålls inom ramen för samarbetet. Kundspecifik information, prissättning,
                  kandidatuppgifter och affärshemligheter får inte röjas utan skriftligt medgivande, såvida inte skyldighet att röja följer av lag eller
                  myndighetsbeslut. Bakgrundskontroller kan förekomma där uppdrag kräver det och sker i enlighet med lag och vår Integritetspolicy.
                </p>
              </Section>

              <Section id="tillit-tek-komp" title="6. Länkar, kompatibilitet & tillgänglighet">
                <p>
                  Webbplatsen kan innehålla länkar eller integrationer till tredjepartstjänster som vi inte ansvarar för avseende innehåll, policyer eller
                  tillgänglighet. Vi strävar efter bred teknisk kompatibilitet och förbättrad tillgänglighet (t.ex. i linje med relevanta riktlinjer) men kan
                  inte garantera full funktionalitet i alla webbläsare, enheter eller versioner. Rapportera gärna hinder till oss.
                </p>
              </Section>

              <Section id="ansvarsbegransning" title="7. Ansvarsbegränsning & friskrivningar">
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

              <Section id="force-majeure" title="8. Force majeure">
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

              <Section id="tolkning-ogiltighet" title="9. Tolkning, ogiltighet & meddelanden">
                <p>
                  Om någon bestämmelse i Villkoren skulle befinnas ogiltig eller inte kunna göras gällande ska detta inte påverka giltigheten av övriga
                  bestämmelser; sådan bestämmelse ska i stället tillämpas i den utsträckning som medges av gällande lag, och i övrigt ersättas av en giltig
                  bestämmelse som ligger så nära parternas ursprungliga avsikt som möjligt ("severability"). Vid motstridighet mellan språkversioner har den
                  svenska versionen företräde.
                </p>
                <p>
                  Meddelanden enligt Villkoren kan lämnas via e-post eller inom plattformen till de kontaktuppgifter som användaren eller kunden angivit och
                  anses ha kommit mottagaren till handa när de skickats, om inte annat följer av tvingande lag. Parterna ska hålla sina kontaktuppgifter
                  uppdaterade.
                </p>
              </Section>

              <Section id="andringar-upphor" title="10. Ändringar, upphörande & överlåtelse">
                <p>
                  Vi kan uppdatera Villkoren; väsentliga ändringar meddelas via webbplatsen. Vi får överlåta rättigheter och skyldigheter i samband med
                  affärstransaktion (t.ex. fusion, förvärv eller verksamhetsöverlåtelse). Du kan avsluta ditt konto genom att kontakta oss; upphörande enligt
                  separata kundavtal gäller för kommersiella tjänster.
                </p>
              </Section>

              <Section id="lag-tvist" title="11. Tillämplig lag & tvist">
                <p>
                  Svensk materiell rätt gäller med undantag för dess lagvalsregler. Tvister som inte löses genom förhandling prövas av allmän domstol i
                  Sverige med tingsrätten på Workplans hemort som första instans, i den mån tvingande lag inte föreskriver annat.
                </p>
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

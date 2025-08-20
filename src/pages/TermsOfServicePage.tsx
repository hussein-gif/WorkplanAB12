import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, FileText, Shield } from 'lucide-react';

/**
 * TermsOfServicePage – Komprimerad, professionell struktur (v2.3)
 * - Kortare och sammanslagna rubriker
 * - Tar bort Integritet/Cookies och Kontakt
 * - Lägg till exakt beteende som hos Academic Work: när sektionen är närmast navbaren markeras den i TOC
 * - Markerad knapp i TOC: bakgrund #08132B + vit text
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

const TermsOfServicePage: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const observer = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return new IntersectionObserver(
      (entries) => {
        let topMost: Element | null = null;
        let minOffset = Number.POSITIVE_INFINITY;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            if (rect.top >= 0 && rect.top < minOffset) {
              minOffset = rect.top;
              topMost = entry.target;
            }
          }
        });
        if (topMost && topMost.id) {
          setActiveId(topMost.id);
        }
      },
      { root: null, rootMargin: '0px 0px -80% 0px', threshold: [0, 0.25, 0.5, 1] }
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
                <span className="flex items-center gap-2"><Shield size={16} /> Version 2.3</span>
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
          </aside>

          {/* Höger innehåll */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div ref={containerRef} className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-10 space-y-12">
              {/* Sektioner */}
              <Section id="allmant" title="1. Allmänt & tillämpning">
                <p>Dessa villkor gäller när du använder Workplan AB:s webbplats och tjänster. Genom användning accepterar du villkoren.</p>
                <p>Villkoren riktar sig till företagskunder som hyr in personal och kandidater som söker uppdrag.</p>
              </Section>
              <Section id="tjanster-anvandning" title="2. Tjänster & användning">
                <p>Vi tillhandahåller bemanning och rekrytering. Specifika villkor regleras i separata kundavtal. Tjänsterna får inte användas för olagliga ändamål.</p>
              </Section>
              <Section id="konto-ansvar" title="3. Konto, roller & ansvar">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Konto krävs för vissa funktioner. Du ansvarar för riktiga uppgifter och att skydda inloggning.</li>
                  <li>Kunder ansvarar för arbetsmiljö och säkerhet. Kandidater ska följa instruktioner och regler.</li>
                  <li>Åtkomst kan begränsas eller avslutas vid missbruk eller brott mot villkoren.</li>
                </ul>
              </Section>
              <Section id="immaterial-sakerhet" title="4. Immaterialrätt & säkerhet">
                <p>Innehåll på webbplatsen ägs av Workplan eller licensgivare. Otillåten användning förbjuden. Vi vidtar säkerhetsåtgärder men kan inte garantera fullständig avbrottsfrihet.</p>
              </Section>
              <Section id="sekretess-bakgrund" title="5. Sekretess & bakgrundskontroller">
                <p>Parterna ska skydda konfidentiell information. Bakgrundskontroller kan utföras enligt lag och policy.</p>
              </Section>
              <Section id="tillit-tek-komp" title="6. Länkar, kompatibilitet & tillgänglighet">
                <p>Webbplatsen kan innehålla tredjepartslänkar som vi inte ansvarar för. Vi strävar efter bred kompatibilitet och tillgänglighet men kan inte garantera full funktionalitet i alla miljöer.</p>
              </Section>
              <Section id="ansvarsbegransning" title="7. Ansvarsbegränsning & friskrivningar">
                <p>Vi ansvarar inte för indirekta skador eller följdskador som uppstår vid användning av tjänsterna. Tjänster tillhandahålls i befintligt skick.</p>
              </Section>
              <Section id="force-majeure" title="8. Force majeure">
                <p>Part är befriad från ansvar om förpliktelser hindras av händelser utanför rimlig kontroll, exempelvis naturkatastrofer, strejker eller myndighetsbeslut.</p>
              </Section>
              <Section id="tolkning-ogiltighet" title="9. Tolkning, ogiltighet & meddelanden">
                <p>Om någon bestämmelse är ogiltig påverkar det inte övriga. Svenska versionen har företräde. Meddelanden anses mottagna när de skickats till angivna kontaktuppgifter.</p>
              </Section>
              <Section id="andringar-upphor" title="10. Ändringar, upphörande & överlåtelse">
                <p>Vi kan uppdatera villkoren. Betydande ändringar meddelas via webbplatsen. Rättigheter och skyldigheter får överlåtas i samband med affärstransaktion.</p>
              </Section>
              <Section id="lag-tvist" title="11. Tillämplig lag & tvist">
                <p>Svensk lag gäller. Tvister avgörs av svensk domstol.</p>
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
    <h2 className="text-2xl md:text-3xl font-medium text-[#08132B] mb-4" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}>
      {title}
    </h2>
    <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
      {children}
    </div>
  </section>
);

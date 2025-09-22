import React, { useEffect, useRef, useState, Suspense } from 'react';
import SEO from '../components/SEO'; // ⬅️ SEO import

/**
 * TermsOfServicePage – Komprimerad, professionell struktur (v2.5)
 * - Rubrik i mitten, logga ovanför, underrubrik under
 * - "Senast uppdaterad" ovanför vänstra rutan
 * - Vänster TOC smalare, mindre text/padding (alla punkter syns utan scroll på normal desktop)
 * - Stabil scroll-spy (NAV_OFFSET_PX)
 * - Aktiv TOC-punkt: bg #08132B + vit text
 * - HEADER FIX: ingen border-linje, och samma bakgrund (#F7FAFF) som resten av sidan
 * - NAV FIX: force-nav-dark aktiverar mörk logga & länkar
 * - SPACING FIX: header har pt-24 (flyttar ner innehållet från navbaren)
 *
 * Optimeringar:
 * - Ikoner lazy-loadas (minskar initial JS)
 * - content-visibility/containIntrinsicSize på stora wrappers för snabbare initial rendering
 * - scroll listeners är passiva
 */

// Lazy-load ikoner (minskar initial bundle)
const FileTextIcon = React.lazy(() =>
  import('lucide-react').then(mod => ({ default: mod.FileText }))
);
const CalendarIcon = React.lazy(() =>
  import('lucide-react').then(mod => ({ default: mod.Calendar }))
);

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

const NAV_OFFSET_PX = 120;

const TermsOfServicePage: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeIdRef = useRef<string>(activeId);
  activeIdRef.current = activeId;

  // Force mörk navbar
  useEffect(() => {
    const el = document.documentElement;
    el.classList.add('force-nav-dark');
    return () => el.classList.remove('force-nav-dark');
  }, []);

  // Scroll-spy
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const getSections = () =>
      Array.from(el.querySelectorAll('section[data-tos-section]')) as HTMLElement[];

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
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true } as any);
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
    <>
      <SEO
        title="Användarvillkor | Workplan AB – Bemanning inom lager & logistik"
        description="Läs Workplans användarvillkor. Här hittar du regler för användning av våra tjänster och webbplats inom bemanning och rekrytering."
        canonical="https://www.work-plan.se/anvandarvillkor"
      />

      <div
        className="min-h-screen"
        style={{
          backgroundColor: '#F7FAFF',
          contentVisibility: 'auto',
          containIntrinsicSize: '1px 1400px',
        }}
      >
        {/* Hero */}
        <header className="px-6 pt-24 pb-12" style={{ backgroundColor: '#F7FAFF' }}>
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#08132B] to-[#0B274D] rounded-2xl flex items-center justify-center shadow-lg">
                <Suspense fallback={<div className="h-8 w-8 rounded bg-gray-200" />}>
                  <FileTextIcon className="h-8 w-8 text-white" />
                </Suspense>
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

        {/* Innehåll */}
        <main className="px-6 pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-24">
                <div
                  className="text-xs text-gray-500 mb-2 flex items-center gap-1.5"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Suspense fallback={<div className="h-3.5 w-3.5 rounded bg-gray-200" />}>
                    <CalendarIcon className="h-3.5 w-3.5" />
                  </Suspense>
                  Senast uppdaterad: {updatedAt}
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

            <div className="lg:col-span-8 xl:col-span-9">
              <div
                ref={containerRef}
                className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-10 space-y-12"
                style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 1200px' }}
              >
                <Section id="allmant" title="1. Allmänt & tillämpning">
                  <p>
                    Dessa villkor ("Villkoren") gäller när du använder Workplan AB:s ("Workplan", "vi") webbplats och tjänster. Genom att använda plattformen
                    accepterar du Villkoren. Om du inte accepterar dem ska du avstå från att använda tjänsterna.
                  </p>
                  <p>
                    Villkoren riktar sig till företagskunder som hyr in personal och kandidater som söker uppdrag/anställning inom lager och logistik.
                  </p>
                </Section>

                <Section id="tjanster-anvandning" title="2. Tjänster & användning">
                  <p>
                    Vi tillhandahåller bemanning och rekrytering. Omfattning och specifika kommersiella villkor regleras i separata avtal mellan Workplan och
                    berörd kund. Tjänsterna får inte användas för olagliga eller diskriminerande ändamål och får inte missbrukas (t.ex. säkerhetsintrång,
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

                {/* ...resten av sektionerna (4–11) på samma sätt ... */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TermsOfServicePage;

/* Hjälpkomponent (memofierad för att undvika onödiga omrenderingar) */
const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = React.memo(
  ({ id, title, children }) => (
    <section id={id} data-tos-section className="scroll-mt-28">
      <h2
        className="text-2xl md:text-3xl font-medium text-[#08132B] mb-4"
        style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
      >
        {title}
      </h2>
      <div
        className="space-y-4 text-gray-700 leading-relaxed"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {children}
      </div>
    </section>
  )
);

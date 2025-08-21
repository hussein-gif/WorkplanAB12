import React, { useEffect, useRef, useState } from 'react';
import { FileText, Calendar } from 'lucide-react';

/**
 * TermsOfServicePage – Komprimerad, professionell struktur (v2.4)
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

const NAV_OFFSET_PX = 120;

const TermsOfServicePage: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeIdRef = useRef<string>(activeId);
  activeIdRef.current = activeId;

  // --- Force navbar dark på denna sida ---
  useEffect(() => {
    document.documentElement.classList.add("force-nav-dark");
    return () => {
      document.documentElement.classList.remove("force-nav-dark");
    };
  }, []);

  // --- Scroll spy ---
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
        else break;
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

  const updatedAt = '20 augusti 2025';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7FAFF' }}>
      {/* Hero */}
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

      {/* Content */}
      <main className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Vänster TOC */}
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
              {/* --- Sektioner --- */}
              <Section id="allmant" title="1. Allmänt & tillämpning">
                <p>
                  Dessa villkor ("Villkoren") gäller när du använder Workplan AB:s ("Workplan", "vi") webbplats och tjänster. Genom att använda
                  plattformen accepterar du Villkoren. Om du inte accepterar dem ska du avstå från att använda tjänsterna.
                </p>
                <p>
                  Villkoren riktar sig till företagskunder som hyr in personal och kandidater som söker uppdrag/anställning inom lager och logistik.
                </p>
              </Section>
              {/* ...resten av sektionerna som i din kod ... */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfServicePage;

/* Hjälpkomponenter */
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

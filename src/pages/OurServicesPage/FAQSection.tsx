import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const FAQSection: React.FC = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const panelsRef = useRef<Array<HTMLDivElement | null>>([]);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(prev => (prev === index ? null : index));
  };

  const faqs = [
    { question: 'Hur snabbt kan ni starta processen?', answer: 'Vi sätter igång direkt när vi fått ert behov beskrivet och avtalet på plats. Tidslinjen beror på rollens krav och kandidat­tillgång – vi återkopplar med en realistisk plan.' },
    { question: 'Hur ser er urvals- och kvalitetssäkringsprocess ut?', answer: 'Vi gör riktad search, kompetens- och bakgrundskontroller samt referenser innan vi presenterar kandidater. Ni får bara profiler som matchar kraven.' },
    { question: 'Vad kostar det och hur fakturerar ni?', answer: 'Transparent prissättning utan dolda avgifter. Vi går igenom allt innan start, och ni betalar endast för överenskommen leverans.' },
    { question: 'Har ni bindningstider eller minimiåtaganden?', answer: 'Nej, vi arbetar flexibelt. Ni kan skala upp eller ner efter behov.' },
    { question: 'Vad händer om kandidaten inte passar?', answer: 'Hör av er – vi tar fram en ersättare eller justerar uppdraget enligt vår överenskomna garanti.' },
    { question: 'Vilka typer av roller bemannar ni?', answer: 'Vi fokuserar på lager- och logistikroller: operatörer, truckförare, teamledare med flera.' },
    { question: 'Hur hanterar ni personuppgifter och GDPR?', answer: 'All data behandlas säkert och endast för att matcha kandidater med uppdrag. Inget delas utan samtycke.' },
    { question: 'Hur kommer vi igång?', answer: 'Fyll i formuläret eller kontakta oss – vi bokar ett kort behovssamtal och tar det därifrån.' }
  ];

  // Subtilt brus för vit bakgrund
  const noiseSvg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/>
      <feColorMatrix type='saturate' values='0'/>
      <feComponentTransfer><feFuncA type='table' tableValues='0 1'/></feComponentTransfer>
    </filter>
    <rect width='100%' height='100%' filter='url(#n)' opacity='0.35'/>
  </svg>`;
  const noiseDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(noiseSvg)}`;

  return (
    <section className="relative py-16 md:py-24 px-5 md:px-8 bg-white overflow-hidden">
      {/* Dekorativ bakgrund */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-90 md:opacity-100"
          style={{
            background: [
              'radial-gradient(900px 520px at 12% 18%, rgba(59,130,246,0.10), rgba(59,130,246,0) 60%)',
              'radial-gradient(720px 420px at 88% 22%, rgba(16,185,129,0.08), rgba(16,185,129,0) 62%)',
              'radial-gradient(660px 420px at 28% 86%, rgba(139,92,246,0.08), rgba(139,92,246,0) 64%)',
              'radial-gradient(980px 560px at 76% 78%, rgba(37,99,235,0.06), rgba(37,99,235,0) 65%)'
            ].join(','),
            mixBlendMode: 'normal',
          }}
        />
        <div className="absolute inset-0 opacity-[0.03] md:opacity-[0.04]" style={{ backgroundImage: `url(${noiseDataUrl})` }} />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-10 md:mb-16">
          <h2
            className="text-[1.875rem] md:text-4xl font-medium text-gray-900 mb-4 md:mb-6 leading-tight [text-wrap:balance]"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Vanliga Frågor Om Vår Bemanning
          </h2>
        </div>

        {/* Cards */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => {
            const isOpen = openFAQ === index;
            const panelEl = panelsRef.current[index];
            const maxH = isOpen && panelEl ? `${panelEl.scrollHeight}px` : '0px';

            return (
              <div
                key={index}
                data-open={isOpen}
                className="group relative bg-white/80 backdrop-blur-[2px] border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-[box-shadow,transform,border-color] duration-300 md:hover:shadow-md md:hover:border-gray-300 md:hover:-translate-y-0.5 will-change-transform"
              >
                {/* Vänster accentbar */}
                <span className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500/30 via-emerald-500/30 to-purple-500/30 transition-all duration-300 group-data-[open=true]:w-1.5" />

                <button
                  onClick={() => toggleFAQ(index)}
                  className="relative w-full px-6 md:px-8 py-5 md:py-6 text-left flex items-center justify-between hover:bg-gray-50/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-2xl min-h-[64px]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>

                  {/* + → – transition */}
                  <span className="ml-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 transition-transform duration-300">
                    <Plus
                      size={18}
                      className={`text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    />
                  </span>
                </button>

                {/* Svar */}
                <div
                  id={`faq-answer-${index}`}
                  ref={el => (panelsRef.current[index] = el)}
                  className="faq-collapse"
                  style={{ maxHeight: maxH }}
                >
                  <div className="px-6 md:px-8 pb-5 md:pb-6">
                    <p className="text-[0.98rem] md:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Line */}
        <div className="text-center relative z-10">
          <p className="text-lg text-gray-600">
            Fortsatt fundering?{' '}
            <button
              onClick={() => {
                const element = document.getElementById('kontakt-form') || document.getElementById('contact-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/contact');
                }
              }}
              className="font-bold text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded transition-colors"
            >
              Kontakta oss
            </button>{' '}
            så guidar vi dig.
          </p>
        </div>
      </div>

      <style>{`
        .faq-collapse {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transform: translateY(-4px);
          transition:
            max-height 280ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 220ms ease,
            transform 220ms ease;
        }
        .group[data-open="true"] .faq-collapse {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default FAQSection;

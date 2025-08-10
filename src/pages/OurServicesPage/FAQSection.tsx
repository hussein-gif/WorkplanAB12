import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';

const FAQSection: React.FC = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: 'Hur snabbt kan ni starta processen?',
      answer:
        'Vi sätter igång direkt när vi fått ert behov beskrivet och avtalet på plats. Tidslinjen beror på rollens krav och kandidat­tillgång – vi återkopplar med en realistisk plan.',
    },
    {
      question: 'Hur ser er urvals- och kvalitetssäkringsprocess ut?',
      answer:
        'Vi gör riktad search, kompetens- och bakgrundskontroller samt referenser innan vi presenterar kandidater. Ni får bara profiler som matchar kraven.',
    },
    {
      question: 'Vad kostar det och hur fakturerar ni?',
      answer:
        'Transparent prissättning utan dolda avgifter. Vi går igenom allt innan start, och ni betalar endast för överenskommen leverans.',
    },
    {
      question: 'Har ni bindningstider eller minimiåtaganden?',
      answer: 'Nej, vi arbetar flexibelt. Ni kan skala upp eller ner efter behov.',
    },
    {
      question: 'Vad händer om kandidaten inte passar?',
      answer:
        'Hör av er – vi tar fram en ersättare eller justerar uppdraget enligt vår överenskomna garanti.',
    },
    {
      question: 'Vilka typer av roller bemannar ni?',
      answer:
        'Vi fokuserar på lager- och logistikroller: operatörer, truckförare, teamledare med flera.',
    },
    {
      question: 'Hur hanterar ni personuppgifter och GDPR?',
      answer:
        'All data behandlas säkert och endast för att matcha kandidater med uppdrag. Inget delas utan samtycke.',
    },
    {
      question: 'Hur kommer vi igång?',
      answer:
        'Fyll i formuläret eller kontakta oss – vi bokar ett kort behovssamtal och tar det därifrån.',
    },
  ];

  // Subtilt brus som ger lite textur på vit bakgrund
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
    <section className="relative py-24 px-8 bg-white overflow-hidden">
      {/* Dekorativ vit bakgrund (kreativ men subtil) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Färgade radiala blobbar med låg opacitet */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(900px 520px at 12% 18%, rgba(59,130,246,0.10), rgba(59,130,246,0) 60%)', // blå
              'radial-gradient(720px 420px at 88% 22%, rgba(16,185,129,0.08), rgba(16,185,129,0) 62%)', // grön
              'radial-gradient(660px 420px at 28% 86%, rgba(139,92,246,0.08), rgba(139,92,246,0) 64%)', // lila
              'radial-gradient(980px 560px at 76% 78%, rgba(37,99,235,0.06), rgba(37,99,235,0) 65%)', // blå djup
            ].join(','),
            mixBlendMode: 'normal',
          }}
        />

        {/* Diagonala skimrande linjer (svag) */}
        <div
          className="absolute inset-0 opacity-20 rotate-[-8deg]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(17,24,39,0.06) 40%, rgba(0,0,0,0) 70%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          }}
        />

        {/* Koniska ringar i mitten (mycket subtila) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] opacity-10"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, rgba(17,24,39,0.08) 0deg, rgba(17,24,39,0) 60deg, rgba(17,24,39,0.08) 120deg, rgba(17,24,39,0) 180deg, rgba(17,24,39,0.08) 240deg, rgba(17,24,39,0) 300deg, rgba(17,24,39,0.08) 360deg)',
            WebkitMaskImage:
              'radial-gradient(circle at center, transparent 0, black 28%, black 55%, transparent 70%)',
            maskImage:
              'radial-gradient(circle at center, transparent 0, black 28%, black 55%, transparent 70%)',
          }}
        />

        {/* Subtila pixlar/stjärnor */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              'radial-gradient(1px 1px at 18% 26%, rgba(17,24,39,0.25) 50%, transparent 51%)',
              'radial-gradient(1px 1px at 62% 12%, rgba(17,24,39,0.18) 50%, transparent 51%)',
              'radial-gradient(1px 1px at 82% 72%, rgba(17,24,39,0.18) 50%, transparent 51%)',
              'radial-gradient(1px 1px at 36% 82%, rgba(17,24,39,0.15) 50%, transparent 51%)',
            ].join(', '),
            opacity: 0.22,
          }}
        />

        {/* Brus + lätt vignett för djup */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url(${noiseDataUrl})` }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 700px at 50% 20%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.06) 100%)',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6">Vanliga frågor om vår bemanning</h2>
        </div>

        {/* Cards: samma effekter som kandidatsektionen men ljust färgschema */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-[2px] border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                aria-expanded={openFAQ === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                {openFAQ === index ? (
                  <Minus size={20} className="text-gray-500 flex-shrink-0" />
                ) : (
                  <Plus size={20} className="text-gray-500 flex-shrink-0" />
                )}
              </button>

              {/* Collapsible answer med samma transition-mönster som CandidatesFAQSection */}
              <div
                id={`faq-answer-${index}`}
                className={`faq-collapse ${openFAQ === index ? 'open' : ''}`}
                style={{ maxHeight: openFAQ === index ? '500px' : '0' }}
              >
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Line */}
        <div className="text-center relative z-10">
          <p className="text-lg text-gray-600">
            Fortsatt fundering?{' '}
            <button
              onClick={() => {
                const element =
                  document.getElementById('kontakt-form') || document.getElementById('contact-form');
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

      {/* JSON-LD Schema for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />

      {/* Transitions identiska med CandidatesFAQSection */}
      <style>{`
        .faq-collapse {
          overflow: hidden;
          max-height: 0;
          transition:
            max-height 300ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 300ms ease,
            transform 300ms ease;
          opacity: 0;
          transform: translateY(-4px);
        }
        .faq-collapse.open { opacity: 1; transform: translateY(0); }
      `}</style>
    </section>
  );
};

export default FAQSection;

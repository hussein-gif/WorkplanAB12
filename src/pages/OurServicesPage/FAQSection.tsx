import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection: React.FC = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: 'Hur snabbt kan ni starta processen?',
      answer: 'Vi sätter igång direkt när vi fått ert behov beskrivet och avtalet på plats. Tidslinjen beror på rollens krav och kandidat­tillgång – vi återkopplar med en realistisk plan.'
    },
    {
      question: 'Hur ser er urvals- och kvalitetssäkringsprocess ut?',
      answer: 'Vi gör riktad search, kompetens- och bakgrundskontroller samt referenser innan vi presenterar kandidater. Ni får bara profiler som matchar kraven.'
    },
    {
      question: 'Vad kostar det och hur fakturerar ni?',
      answer: 'Transparent prissättning utan dolda avgifter. Vi går igenom allt innan start, och ni betalar endast för överenskommen leverans.'
    },
    {
      question: 'Har ni bindningstider eller minimiåtaganden?',
      answer: 'Nej, vi arbetar flexibelt. Ni kan skala upp eller ner efter behov.'
    },
    {
      question: 'Vad händer om kandidaten inte passar?',
      answer: 'Hör av er – vi tar fram en ersättare eller justerar uppdraget enligt vår överenskomna garanti.'
    },
    {
      question: 'Vilka typer av roller bemannar ni?',
      answer: 'Vi fokuserar på lager- och logistikroller: operatörer, truckförare, teamledare med flera.'
    },
    {
      question: 'Hur hanterar ni personuppgifter och GDPR?',
      answer: 'All data behandlas säkert och endast för att matcha kandidater med uppdrag. Inget delas utan samtycke.'
    },
    {
      question: 'Hur kommer vi igång?',
      answer: 'Fyll i formuläret eller kontakta oss – vi bokar ett kort behovssamtal och tar det därifrån.'
    }
  ];

  return (
    <section className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            Vanliga frågor om vår bemanning
          </h2>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                aria-expanded={openFAQ === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openFAQ === index ? (
                  <ChevronUp size={20} className="text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-8 pb-6"
                >
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Line */}
        <div className="text-center">
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
            </button>
            {' '}så guidar vi dig.
          </p>
        </div>
      </div>

      {/* JSON-LD Schema for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
};

export default FAQSection;
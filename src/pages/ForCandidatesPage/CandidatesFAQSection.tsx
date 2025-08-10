import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';

const CandidatesFAQSection: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const navigate = useNavigate();

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    { question: 'Kostar det något att söka via er?', answer: 'Nej, det är helt kostnadsfritt för dig som kandidat.' },
    { question: 'Måste jag skapa ett konto?', answer: 'Nej. Skicka bara in din ansökan – vi tar kontakt om nästa steg.' },
    { question: 'Vad händer efter att jag skickat in min ansökan?', answer: 'Vi går igenom din profil, matchar mot aktuella uppdrag och hör av oss om det finns en passande roll.' },
    { question: 'Hur snabbt får jag återkoppling?', answer: 'Vi återkommer så snart vi kan. Om du inte hört något – hör gärna av dig!' },
    { question: 'Kan jag söka flera jobb samtidigt?', answer: 'Absolut. Ansök till allt som känns relevant, vi hjälper dig prioritera.' },
    { question: 'Hur hanterar ni mina personuppgifter?', answer: 'Vi följer GDPR och behandlar allt konfidentiellt. Läs mer i vår integritetspolicy.' }
  ];

  const noiseSvg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="table" tableValues="0 1"/></feComponentTransfer>
    </filter>
    <rect width="100%" height="100%" filter="url(#n)" opacity="0.3"/>
  </svg>`;
  const noiseDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(noiseSvg)}`;

  return (
    <section
      className="relative py-24 px-8"
      style={{ backgroundColor: '#08132B' }}
    >
      {/* Dekorativ bakgrund */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(800px 500px at 12% 18%, rgba(49,104,255,0.28), rgba(49,104,255,0) 60%)',
              'radial-gradient(700px 420px at 88% 28%, rgba(0,196,204,0.22), rgba(0,196,204,0) 62%)',
              'radial-gradient(600px 360px at 28% 84%, rgba(120,119,198,0.18), rgba(120,119,198,0) 64%)',
              'radial-gradient(900px 540px at 76% 78%, rgba(0,122,255,0.16), rgba(0,122,255,0) 65%)'
            ].join(','),
            mixBlendMode: 'screen',
          }}
        />
        <div
          className="absolute inset-0 opacity-20 rotate-[-8deg]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0) 70%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] opacity-15"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.12) 0deg, rgba(255,255,255,0) 60deg, rgba(255,255,255,0.12) 120deg, rgba(255,255,255,0) 180deg, rgba(255,255,255,0.12) 240deg, rgba(255,255,255,0) 300deg, rgba(255,255,255,0.12) 360deg)',
            WebkitMaskImage:
              'radial-gradient(circle at center, transparent 0, black 28%, black 55%, transparent 70%)',
            maskImage:
              'radial-gradient(circle at center, transparent 0, black 28%, black 55%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              'radial-gradient(1px 1px at 18% 26%, rgba(255,255,255,0.35) 50%, transparent 51%)',
              'radial-gradient(1px 1px at 62% 12%, rgba(255,255,255,0.25) 50%, transparent 51%)',
              'radial-gradient(1px 1px at 82% 72%, rgba(255,255,255,0.25) 50%, transparent 51%)',
              'radial-gradient(1px 1px at 36% 82%, rgba(255,255,255,0.2) 50%, transparent 51%)'
            ].join(', '),
            opacity: 0.25,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: `url(${noiseDataUrl})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 700px at 50% 20%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.25) 100%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-medium text-white mb-6"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Vanliga Frågor & Svar
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 mb-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                aria-expanded={openFAQ === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                {openFAQ === index ? (
                  <Minus size={20} className="text-white/60 flex-shrink-0" />
                ) : (
                  <Plus size={20} className="text-white/60 flex-shrink-0" />
                )}
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`faq-collapse ${openFAQ === index ? 'open' : ''}`}
                style={{
                  maxHeight: openFAQ === index ? '500px' : '0',
                }}
              >
                <div className="px-8 pb-6">
                  <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p
            className="text-white/80 text-lg font-light"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Hittar du inte svaret?{' '}
            <button
              onClick={() => navigate('/contact')}
              className="font-bold text-blue-400 hover:text-blue-300 hover:underline transition-colors"
            >
              Kontakta oss här
            </button>
          </p>
        </div>
      </div>

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
        .faq-collapse.open {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default CandidatesFAQSection;

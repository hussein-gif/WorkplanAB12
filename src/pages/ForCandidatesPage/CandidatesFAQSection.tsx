import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';

interface CandidatesFAQSectionProps {
  isVisible: boolean;
  openFAQ: number;
  toggleFAQ: (index: number) => void;
}

const CandidatesFAQSection: React.FC<CandidatesFAQSectionProps> = ({
  isVisible,
  openFAQ,
  toggleFAQ,
}) => {
  const navigate = useNavigate();

  const faqs = [
    { question: 'Kostar det något att söka via er?', answer: 'Nej, det är helt kostnadsfritt för dig som kandidat.' },
    { question: 'Måste jag skapa ett konto?', answer: 'Nej. Skicka bara in din ansökan – vi tar kontakt om nästa steg.' },
    { question: 'Vad händer efter att jag skickat in min ansökan?', answer: 'Vi går igenom din profil, matchar mot aktuella uppdrag och hör av oss om det finns en passande roll.' },
    { question: 'Hur snabbt får jag återkoppling?', answer: 'Vi återkommer så snart vi kan. Om du inte hört något – hör gärna av dig!' },
    { question: 'Kan jag söka flera jobb samtidigt?', answer: 'Absolut. Ansök till allt som känns relevant, vi hjälper dig prioritera.' },
    { question: 'Hur hanterar ni mina personuppgifter?', answer: 'Vi följer GDPR och behandlar allt konfidentiellt. Läs mer i vår integritetspolicy.' }
  ];

  // Säkert inbäddad SVG-noise som data-URL (för att undvika TSX-escape-problem)
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
      {/* Dekorativ, proffsig bakgrund – diskret men levande */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Aurora-mesh toningar */}
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

        {/* Diagonal “sheen” för premium-känsla */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            transform: 'rotate(-8deg)',
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0) 70%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          }}
        />

        {/* Subtila koncentriska bågar för djup */}
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

        {/* Lätta “konstellations”-prickar (inte brusig) */}
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

        {/* Diskret noise för textur */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: `url(${noiseDataUrl})` }}
        />

        {/* Vignette som drar fokus mot mitten */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 700px at 50% 20%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.25) 100%)',
          }}
        />
      </div>

      {/* ---- OBS: Allt nedanför är EXAKT som din originalsektion ---- */}
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">
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

              {openFAQ === index && (
                <div id={`faq-answer-${index}`} className="px-8 pb-6">
                  <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-white/80 text-lg">
            Hittar du inte svaret?{' '}
            <button
              onClick={() => navigate('/contact')}
              className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Kontakta oss här.
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CandidatesFAQSection;

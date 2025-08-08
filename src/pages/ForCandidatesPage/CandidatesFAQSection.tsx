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
    {
      question: 'Kostar det något att söka via er?',
      answer: 'Nej, det är helt kostnadsfritt för dig som kandidat.'
    },
    {
      question: 'Måste jag skapa ett konto?',
      answer: 'Nej. Skicka bara in din ansökan – vi tar kontakt om nästa steg.'
    },
    {
      question: 'Vad händer efter att jag skickat in min ansökan?',
      answer: 'Vi går igenom din profil, matchar mot aktuella uppdrag och hör av oss om det finns en passande roll.'
    },
    {
      question: 'Hur snabbt får jag återkoppling?',
      answer: 'Vi återkommer så snart vi kan. Om du inte hört något – hör gärna av dig!'
    },
    {
      question: 'Kan jag söka flera jobb samtidigt?',
      answer: 'Absolut. Ansök till allt som känns relevant, vi hjälper dig prioritera.'
    },
    {
      question: 'Hur hanterar ni mina personuppgifter?',
      answer: 'Vi följer GDPR och behandlar allt konfidentiellt. Läs mer i vår integritetspolicy.'
    }
  ];

  return (
    <section className="py-24 px-8 bg-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Vanliga frågor & svar
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
                <div
                  id={`faq-answer-${index}`}
                  className="px-8 pb-6"
                >
                  <p className="text-white/80 leading-relaxed">
                    {faq.answer}
                  </p>
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
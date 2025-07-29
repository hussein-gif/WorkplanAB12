import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Truck, 
  Clipboard, 
  Search, 
  MessageSquare, 
  Handshake,
  Clock,
  Award,
  TrendingUp,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Star,
  Phone,
  UserCheck,
  Briefcase
} from 'lucide-react';

const OurServicesPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const processSteps = [
    {
      icon: Clipboard,
      title: 'Needs Analysis',
      description: 'We assess your specific requirements and operational needs.'
    },
    {
      icon: Search,
      title: 'Candidate Sourcing',
      description: 'Targeted recruitment from our pre-vetted talent pool.'
    },
    {
      icon: MessageSquare,
      title: 'Interview & Selection',
      description: 'Comprehensive screening and skills assessment process.'
    },
    {
      icon: Handshake,
      title: 'Onboarding & Follow-Up',
      description: 'Seamless placement with ongoing support and monitoring.'
    }
  ];

  const whyChooseUs = [
    {
      icon: Clock,
      title: '48h Placement Guarantee',
      description: 'Receive qualified short-list in under 48 hours'
    },
    {
      icon: Truck,
      title: 'Logistics Specialists',
      description: 'Dedicated recruiters with deep sector knowledge'
    },
    {
      icon: Award,
      title: '99% Retention Rate',
      description: 'Candidates who stay and perform'
    }
  ];

  const testimonials = [
    {
      quote: 'TalentBridge delivered exactly what we needed in record time.',
      name: 'Sarah Johnson',
      title: 'Operations Manager',
      company: 'LogiCorp'
    },
    {
      quote: 'Their understanding of warehouse operations is exceptional.',
      name: 'Michael Chen',
      title: 'HR Director',
      company: 'SupplyChain Pro'
    },
    {
      quote: 'Professional service with candidates who truly fit our culture.',
      name: 'Emma Williams',
      title: 'Facility Manager',
      company: 'Warehouse Solutions'
    }
  ];

  const faqs = [
    {
      question: 'How quickly can you fill a position?',
      answer: 'We guarantee to provide a qualified shortlist within 48 hours of receiving your requirements. Most placements are completed within 5-7 business days.'
    },
    {
      question: 'What screening process do you use?',
      answer: 'Our comprehensive screening includes skills assessment, background verification, reference checks, and safety certification validation specific to warehouse and logistics roles.'
    },
    {
      question: 'What are your service fees?',
      answer: 'Our fees are competitive and transparent, typically ranging from 15-20% of the candidate\'s annual salary for permanent placements. Temporary staffing rates are discussed based on your specific needs.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient Orbs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.02] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.015] blur-3xl transition-all duration-1000 delay-500"
          style={{
            background: `radial-gradient(circle, #10B981 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.2}%`,
            bottom: `${mousePosition.y * 0.3}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg"
              alt="Warehouse operations"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
            {/* Main Headline */}
            <h1 className={`
              text-5xl md:text-6xl font-light text-white mb-6 tracking-tight leading-[0.9]
              transition-all duration-1000 delay-200 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
            `}>
              Specialiserad bemanning för Lager & Logistik
            </h1>

            {/* Tagline */}
            <p className={`
              text-xl text-white/80 mb-12 font-light leading-relaxed max-w-4xl mx-auto
              transition-all duration-1000 delay-400 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}>
              Snabb tillgång till kvalificerad personal, matchad efter skift, volym och krav – utan bindningstider.
            </p>

            {/* Primary CTA */}
            <button
              onClick={() => {
                const element = document.getElementById('how-it-works');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`
                px-8 py-4 
                bg-blue-600 text-white rounded-xl
                font-semibold text-lg tracking-wide
                hover:bg-blue-700 hover:scale-105
                transition-all duration-300
                shadow-lg hover:shadow-xl
                transition-all duration-1000 delay-600 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
            >
              Så jobbar vi
            </button>
          </div>
        </section>

        {/* Service Overview */}
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <div className={`
              group bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-lg
              hover:shadow-xl transition-all duration-500
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}
            style={{ transitionDelay: '600ms' }}
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-105 transition-transform duration-500 opacity-80">
                  <Users size={24} className="text-white" />
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Bemanning som håller er drift igång
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  Vi levererar förhandskvalificerad personal inom lager och logistik – från toppar och sjukfrånvaro till längre vikariat. Matchat efter skift, volym och krav, utan bindningstider.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our 4-Step Process */}
        <section id="how-it-works" className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                Så går vår process till
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                En tydlig 5-stegsprocess som ger er rätt kompetens – snabbt, tryggt och utan överraskningar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                {
                  icon: Phone,
                  title: 'Behovsanalys',
                  description: 'Vi kartlägger mål, tidsram och kompetenskrav i ett kort uppstartssamtal.'
                },
                {
                  icon: Search,
                  title: 'Lösningsförslag',
                  description: 'Ni får ett transparent förslag på bemanningsupplägg, tidsplan och pris.'
                },
                {
                  icon: UserCheck,
                  title: 'Sökning & urval',
                  description: 'Aktiv search, annonsering vid behov och strukturerade intervjuer/screening.'
                },
                {
                  icon: Briefcase,
                  title: 'Kandidatpresentation',
                  description: 'En shortlist med matchade kandidater, referenser och våra rekommendationer.'
                },
                {
                  icon: Handshake,
                  title: 'Start & uppföljning',
                  description: 'Smidig onboarding och regelbunden uppföljning för att säkerställa kvalitet.'
                }
              ].map((step, index) => (
                <div
                  key={index}
                  className={`
                    text-center
                    transition-all duration-1000 delay-${800 + index * 100} transform
                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                  `}
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon size={24} className="text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-white font-medium text-xs">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 break-words max-w-full">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed break-words max-w-full">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose TalentBridge */}
        <section className="py-24 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-6">
               Varför välja TalentBridge?
              </h2>
             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
               Tre anledningar till att företag inom lager & logistik vänder sig till oss.
             </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               {
                 icon: Clock,
                 title: 'Flexibilitet & Snabb igångsättning',
                 description: 'Bemanning när behovet uppstår – skift, toppar eller vikariat. Inga bindningstider.',
                 highlight: 'Snabb igångsättning'
               },
               {
                 icon: Truck,
                 title: 'Djup branschkännedom',
                 description: 'Vi kan lager & logistik – vi förstår rollerna, tempot och kompetenskraven.',
                 highlight: 'Specialister inom ert område'
               },
               {
                 icon: Award,
                 title: 'Trygg & transparent process',
                 description: 'Strukturerad screening, tydliga villkor och en personlig kontakt genom hela uppdraget.',
                 highlight: 'Personlig service'
               }
             ].map((item, index) => (
                <div
                  key={index}
                  className={`
                   text-center p-8 bg-white border border-gray-200 rounded-2xl shadow-sm
                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                  `}
                  style={{ transitionDelay: `${1200 + index * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <item.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                 <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-4">
                   {item.highlight}
                 </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Call to Action */}
        <section className="py-24 px-8 bg-gradient-to-r from-gray-900 to-slate-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-12 leading-tight">
              Redo att stärka ert team?
            </h2>
            
            <button
              onClick={() => {
                const element = document.getElementById('kontakt-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/contact');
                }
              }}
              className="
                group relative px-10 py-4 
                bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl
                font-semibold text-lg tracking-wide
                hover:from-blue-700 hover:to-purple-700
                transition-all duration-300
                shadow-lg hover:shadow-xl
                hover:scale-105
                overflow-hidden
                min-w-[200px]
              "
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              
              <span className="relative z-10">Kontakta oss</span>
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                Vanliga frågor om vår bemanning
              </h2>
            </div>

            <div className="space-y-4 mb-12">
              {[
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
              ].map((faq, index) => (
                <div
                  key={index}
                  className={`
                    bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm
                    transition-all duration-1000 transform
                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                  `}
                  style={{ transitionDelay: `${2000 + index * 100}ms` }}
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
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Hur snabbt kan ni starta processen?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Vi sätter igång direkt när vi fått ert behov beskrivet och avtalet på plats. Tidslinjen beror på rollens krav och kandidat­tillgång – vi återkopplar med en realistisk plan."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Hur ser er urvals- och kvalitetssäkringsprocess ut?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Vi gör riktad search, kompetens- och bakgrundskontroller samt referenser innan vi presenterar kandidater. Ni får bara profiler som matchar kraven."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Vad kostar det och hur fakturerar ni?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Transparent prissättning utan dolda avgifter. Vi går igenom allt innan start, och ni betalar endast för överenskommen leverans."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Har ni bindningstider eller minimiåtaganden?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Nej, vi arbetar flexibelt. Ni kan skala upp eller ner efter behov."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Vad händer om kandidaten inte passar?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Hör av er – vi tar fram en ersättare eller justerar uppdraget enligt vår överenskomna garanti."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Vilka typer av roller bemannar ni?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Vi fokuserar på lager- och logistikroller: operatörer, truckförare, teamledare med flera."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Hur hanterar ni personuppgifter och GDPR?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "All data behandlas säkert och endast för att matcha kandidater med uppdrag. Inget delas utan samtycke."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Hur kommer vi igång?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Fyll i formuläret eller kontakta oss – vi bokar ett kort behovssamtal och tar det därifrån."
                    }
                  }
                ]
              })
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default OurServicesPage;
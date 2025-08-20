import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Shield } from 'lucide-react';

const TermsOfServicePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  return (
    <div className="min-h-screen bg-white">
      {/* Sophisticated Background */}
      <div className="absolute inset-0">
        {/* Dynamic Gradient Orbs */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.04] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #08132B 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03] blur-3xl transition-all duration-1000 delay-500"
          style={{
            background: `radial-gradient(circle, #0B274D 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.2}%`,
            bottom: `${mousePosition.y * 0.3}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(8,19,43,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(8,19,43,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#08132B] to-[#0B274D] rounded-2xl flex items-center justify-center shadow-lg">
                <FileText size={28} className="text-white" />
              </div>
            </div>
            
            <h1
              className={`
                text-5xl md:text-6xl font-medium text-[#08132B] mb-6 tracking-tight
                transition-all duration-1000 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
              `}
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
            >
              Användarvillkor
            </h1>
            
            <p
              className={`
                text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed
                transition-all duration-1000 delay-200 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Villkor för användning av Workplan AB:s tjänster och webbplats
            </p>

            <div
              className={`
                flex items-center justify-center space-x-6 mt-8 text-sm text-gray-500
                transition-all duration-1000 delay-400 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>Senast uppdaterad: 1 januari 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={16} />
                <span>Version 1.0</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden">
              <div className="p-8 md:p-12 space-y-12">
                
                {/* 1. Allmänt */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    1. Allmänt
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Dessa användarvillkor ("Villkoren") reglerar din användning av Workplan AB:s ("Workplan", "vi", "oss", "vår") webbplats och tjänster. Genom att använda vår webbplats eller våra tjänster accepterar du dessa villkor i sin helhet.
                    </p>
                    <p>
                      Workplan AB är ett bemanningsföretag som specialiserar sig på lager- och logistikbemanning. Vi förmedlar kontakt mellan arbetsgivare och arbetssökande inom dessa områden.
                    </p>
                  </div>
                </div>

                {/* 2. Tjänster */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    2. Våra Tjänster
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Workplan erbjuder bemanningstjänster inom lager och logistik, inklusive men inte begränsat till:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Tillsvidareanställningar</li>
                      <li>Timanställningar och vikariat</li>
                      <li>Säsongsvikariat</li>
                      <li>Provanställningar</li>
                      <li>Konsultuppdrag</li>
                    </ul>
                    <p>
                      Vi förbehåller oss rätten att när som helst ändra, avbryta eller upphöra med våra tjänster utan föregående meddelande.
                    </p>
                  </div>
                </div>

                {/* 3. Användaransvar */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    3. Användaransvar
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Som användare av våra tjänster åtar du dig att:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Lämna korrekta och aktuella uppgifter</li>
                      <li>Inte använda tjänsterna för olagliga ändamål</li>
                      <li>Respektera andra användares integritet</li>
                      <li>Inte sprida skadlig kod eller virus</li>
                      <li>Följa alla tillämpliga lagar och förordningar</li>
                    </ul>
                    <p>
                      Du är ansvarig för att hålla dina inloggningsuppgifter säkra och för all aktivitet som sker under ditt konto.
                    </p>
                  </div>
                </div>

                {/* 4. Personuppgifter */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    4. Behandling av Personuppgifter
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Vi behandlar dina personuppgifter i enlighet med gällande dataskyddslagstiftning, inklusive GDPR. Vår integritetspolicy beskriver i detalj hur vi samlar in, använder och skyddar dina personuppgifter.
                    </p>
                    <p>
                      Genom att använda våra tjänster samtycker du till vår behandling av dina personuppgifter enligt vår integritetspolicy.
                    </p>
                  </div>
                </div>

                {/* 5. Immateriella rättigheter */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    5. Immateriella Rättigheter
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Allt innehåll på vår webbplats, inklusive text, grafik, logotyper, ikoner, bilder och programvara, ägs av Workplan AB eller våra licensgivare och skyddas av upphovsrättslagstiftning.
                    </p>
                    <p>
                      Du får inte kopiera, distribuera, överföra, visa, utföra, reproducera, publicera, licensiera, skapa härledda verk från, överföra eller sälja någon information, programvara, produkter eller tjänster som erhållits från webbplatsen.
                    </p>
                  </div>
                </div>

                {/* 6. Ansvarsbegränsning */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    6. Ansvarsbegränsning
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Workplan AB ansvarar inte för direkta eller indirekta skador som kan uppstå genom användning av våra tjänster eller webbplats. Detta inkluderar men är inte begränsat till:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Förlust av data eller information</li>
                      <li>Avbrott i tjänster</li>
                      <li>Tekniska fel eller störningar</li>
                      <li>Skador orsakade av tredje part</li>
                    </ul>
                    <p>
                      Vårt ansvar är begränsat till det maximala belopp som tillåts enligt svensk lag.
                    </p>
                  </div>
                </div>

                {/* 7. Ändringar av villkor */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    7. Ändringar av Villkor
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Vi förbehåller oss rätten att när som helst ändra dessa villkor. Ändringar träder i kraft omedelbart när de publiceras på vår webbplats. Din fortsatta användning av våra tjänster efter sådana ändringar innebär att du accepterar de nya villkoren.
                    </p>
                    <p>
                      Vi rekommenderar att du regelbundet granskar dessa villkor för att hålla dig informerad om eventuella uppdateringar.
                    </p>
                  </div>
                </div>

                {/* 8. Tillämplig lag */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    8. Tillämplig Lag och Tvister
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Dessa villkor regleras av svensk lag. Eventuella tvister som uppstår i anslutning till dessa villkor eller användningen av våra tjänster ska avgöras av svensk domstol.
                    </p>
                    <p>
                      Vi strävar efter att lösa alla tvister genom dialog och förhandling innan rättsliga åtgärder vidtas.
                    </p>
                  </div>
                </div>

                {/* 9. Kontaktinformation */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    9. Kontaktinformation
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Om du har frågor om dessa användarvillkor, vänligen kontakta oss:
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="space-y-3">
                        <div>
                          <strong className="text-[#08132B]">Workplan AB</strong>
                        </div>
                        <div>
                          <strong>E-post:</strong> info@work-plan.se
                        </div>
                        <div>
                          <strong>Telefon:</strong> +46 8 123 456 78
                        </div>
                        <div>
                          <strong>Adress:</strong> [Företagsadress], Sverige
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer info */}
                <div className="border-t border-gray-200 pt-8">
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield size={16} className="text-white" />
                      </div>
                      <div>
                        <h3
                          className="text-lg font-medium text-[#08132B] mb-2"
                          style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                        >
                          Viktigt att veta
                        </h3>
                        <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Dessa villkor utgör hela avtalet mellan dig och Workplan AB angående användningen av våra tjänster. 
                          Om någon del av dessa villkor skulle anses ogiltig eller omöjlig att genomföra, påverkar det inte giltigheten av övriga delar.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
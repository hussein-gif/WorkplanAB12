import React, { useState, useEffect } from 'react';
import { Calendar, Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';

const PrivacyPolicyPage = () => {
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
                <Shield size={28} className="text-white" />
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
              Integritetspolicy
            </h1>
            
            <p
              className={`
                text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed
                transition-all duration-1000 delay-200 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Hur Workplan AB samlar in, använder och skyddar dina personuppgifter
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
                <Lock size={16} />
                <span>GDPR-kompatibel</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden">
              <div className="p-8 md:p-12 space-y-12">
                
                {/* 1. Inledning */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    1. Inledning
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Workplan AB ("vi", "oss", "vårt") respekterar din integritet och är engagerade i att skydda dina personuppgifter. Denna integritetspolicy förklarar hur vi samlar in, använder, lagrar och skyddar dina personuppgifter när du använder våra tjänster eller besöker vår webbplats.
                    </p>
                    <p>
                      Som bemanningsföretag specialiserat på lager och logistik behandlar vi personuppgifter i enlighet med Dataskyddsförordningen (GDPR) och annan tillämplig dataskyddslagstiftning.
                    </p>
                  </div>
                </div>

                {/* 2. Personuppgiftsansvarig */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    2. Personuppgiftsansvarig
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Personuppgiftsansvarig för behandlingen av dina personuppgifter är:
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="space-y-2">
                        <div><strong className="text-[#08132B]">Workplan AB</strong></div>
                        <div>Organisationsnummer: [Organisationsnummer]</div>
                        <div>E-post: info@work-plan.se</div>
                        <div>Telefon: +46 8 123 456 78</div>
                        <div>Adress: [Företagsadress], Sverige</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Vilka personuppgifter samlar vi in */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    3. Vilka Personuppgifter Samlar Vi In
                  </h2>
                  <div className="space-y-6 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <div>
                      <h3 className="text-xl font-medium text-[#08132B] mb-3">För Kandidater:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Namn, personnummer och kontaktuppgifter</li>
                        <li>CV, utbildning och arbetslivserfarenhet</li>
                        <li>Kompetenser och certifieringar</li>
                        <li>Referenser från tidigare arbetsgivare</li>
                        <li>Löneönskemål och tillgänglighet</li>
                        <li>Bakgrundskontroller och säkerhetsprövningar (vid behov)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-[#08132B] mb-3">För Företagskunder:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Företagsinformation och organisationsnummer</li>
                        <li>Kontaktpersonens namn, titel och kontaktuppgifter</li>
                        <li>Bemanningsbehov och kravspecifikationer</li>
                        <li>Avtalsvillkor och faktureringsuppgifter</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-[#08132B] mb-3">Tekniska Uppgifter:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>IP-adress och webbläsarinformation</li>
                        <li>Cookies och liknande tekniker</li>
                        <li>Användningsstatistik och sidvisningar</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 4. Ändamål och rättslig grund */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    4. Ändamål och Rättslig Grund
                  </h2>
                  <div className="space-y-6 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>Vi behandlar dina personuppgifter för följande ändamål:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-start space-x-3">
                          <UserCheck size={20} className="text-[#08132B] mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-[#08132B] mb-2">Rekrytering och Matchning</h3>
                            <p className="text-sm text-gray-700">
                              <strong>Rättslig grund:</strong> Samtycke och berättigat intresse för att matcha kandidater med lämpliga tjänster.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <div className="flex items-start space-x-3">
                          <Database size={20} className="text-[#08132B] mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-[#08132B] mb-2">Kundrelationer</h3>
                            <p className="text-sm text-gray-700">
                              <strong>Rättslig grund:</strong> Avtalsuppfyllelse och berättigat intresse för att upprätthålla kundrelationer.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                        <div className="flex items-start space-x-3">
                          <Eye size={20} className="text-[#08132B] mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-[#08132B] mb-2">Marknadsföring</h3>
                            <p className="text-sm text-gray-700">
                              <strong>Rättslig grund:</strong> Samtycke för att skicka relevant information om tjänster och möjligheter.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                        <div className="flex items-start space-x-3">
                          <Lock size={20} className="text-[#08132B] mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-[#08132B] mb-2">Juridiska Krav</h3>
                            <p className="text-sm text-gray-700">
                              <strong>Rättslig grund:</strong> Rättslig förpliktelse för att uppfylla lagkrav inom bemanningsbranschen.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Delning av personuppgifter */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    5. Delning av Personuppgifter
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Vi delar dina personuppgifter endast i följande situationer:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Med potentiella arbetsgivare:</strong> När du har gett ditt samtycke för att vi ska presentera din profil</li>
                      <li><strong>Med tjänsteleverantörer:</strong> Som hjälper oss att leverera våra tjänster (t.ex. IT-support, bakgrundskontroller)</li>
                      <li><strong>Vid juridiska krav:</strong> När vi är skyldiga enligt lag att lämna ut uppgifter</li>
                      <li><strong>Vid företagsöverlåtelser:</strong> Om Workplan AB skulle säljas eller fusioneras</li>
                    </ul>
                    <p>
                      Vi säljer aldrig dina personuppgifter till tredje part för marknadsföringsändamål.
                    </p>
                  </div>
                </div>

                {/* 6. Lagringstid */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    6. Lagringstid
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Vi lagrar dina personuppgifter endast så länge som det är nödvändigt för de ändamål som anges i denna policy:
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="space-y-3">
                        <div><strong>Kandidatuppgifter:</strong> 2 år efter senaste kontakt (om inget annat avtalats)</div>
                        <div><strong>Kunduppgifter:</strong> 7 år efter avslutat uppdrag (bokföringslagen)</div>
                        <div><strong>Webbstatistik:</strong> 25 månader (Google Analytics standard)</div>
                        <div><strong>Marknadsföringssamtycken:</strong> Tills samtycke återkallas</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 7. Dina rättigheter */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    7. Dina Rättigheter enligt GDPR
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Du har följande rättigheter gällande dina personuppgifter:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-[#08132B] mb-2">Rätt till information</h4>
                        <p className="text-sm">Få information om hur vi behandlar dina uppgifter</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-[#08132B] mb-2">Rätt till rättelse</h4>
                        <p className="text-sm">Korrigera felaktiga eller ofullständiga uppgifter</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <h4 className="font-medium text-[#08132B] mb-2">Rätt till radering</h4>
                        <p className="text-sm">Begära att vi raderar dina personuppgifter</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                        <h4 className="font-medium text-[#08132B] mb-2">Rätt till begränsning</h4>
                        <p className="text-sm">Begränsa behandlingen av dina uppgifter</p>
                      </div>
                      <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                        <h4 className="font-medium text-[#08132B] mb-2">Rätt till dataportabilitet</h4>
                        <p className="text-sm">Få ut dina uppgifter i ett strukturerat format</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                        <h4 className="font-medium text-[#08132B] mb-2">Rätt att invända</h4>
                        <p className="text-sm">Invända mot behandling baserad på berättigat intresse</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 8. Cookies och spårningstekniker */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    8. Cookies och Spårningstekniker
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Vi använder cookies och liknande tekniker för att förbättra din upplevelse på vår webbplats:
                    </p>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-[#08132B]">Nödvändiga cookies</h4>
                        <p className="text-sm">Krävs för att webbplatsen ska fungera korrekt</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium text-[#08132B]">Funktionella cookies</h4>
                        <p className="text-sm">Förbättrar funktionalitet och användarupplevelse</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-medium text-[#08132B]">Analytiska cookies</h4>
                        <p className="text-sm">Hjälper oss förstå hur webbplatsen används</p>
                      </div>
                      <div className="border-l-4 border-orange-500 pl-4">
                        <h4 className="font-medium text-[#08132B]">Marknadsföringscookies</h4>
                        <p className="text-sm">Används för att visa relevanta annonser (endast med samtycke)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 9. Säkerhet */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    9. Säkerhetsåtgärder
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Vi vidtar lämpliga tekniska och organisatoriska säkerhetsåtgärder för att skydda dina personuppgifter:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Kryptering av känsliga uppgifter under överföring och lagring</li>
                      <li>Begränsad åtkomst baserad på behörighet och arbetsuppgifter</li>
                      <li>Regelbundna säkerhetsuppdateringar och övervakning</li>
                      <li>Säkra backup-rutiner och återställningsplaner</li>
                      <li>Utbildning av personal i dataskydd och säkerhet</li>
                    </ul>
                  </div>
                </div>

                {/* 10. Överföring till tredje land */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    10. Överföring till Tredje Land
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Dina personuppgifter lagras och behandlas primärt inom EU/EES. I de fall vi använder tjänsteleverantörer utanför EU/EES säkerställer vi att:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Landet har en adekvat skyddsnivå enligt EU-kommissionen</li>
                      <li>Lämpliga skyddsåtgärder finns på plats (t.ex. standardavtalsklausuler)</li>
                      <li>Du har gett ditt uttryckliga samtycke till överföringen</li>
                    </ul>
                  </div>
                </div>

                {/* 11. Automatiserat beslutsfattande */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    11. Automatiserat Beslutsfattande
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Vi använder inte automatiserat beslutsfattande eller profilering som har rättsliga effekter för dig. Alla viktiga beslut som påverkar dig fattas av våra medarbetare med möjlighet för dig att begära manuell granskning.
                    </p>
                  </div>
                </div>

                {/* 12. Ändringar av integritetspolicyn */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    12. Ändringar av Integritetspolicyn
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Vi kan komma att uppdatera denna integritetspolicy från tid till annan. Väsentliga ändringar kommer att meddelas via e-post eller genom tydlig information på vår webbplats.
                    </p>
                    <p>
                      Vi rekommenderar att du regelbundet granskar denna policy för att hålla dig informerad om hur vi skyddar dina personuppgifter.
                    </p>
                  </div>
                </div>

                {/* 13. Kontakta oss */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    13. Kontakta Oss
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      Om du har frågor om denna integritetspolicy eller vill utöva dina rättigheter, kontakta oss:
                    </p>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="space-y-3">
                        <div>
                          <strong className="text-[#08132B]">Dataskyddsombud / Kundservice</strong>
                        </div>
                        <div>
                          <strong>E-post:</strong> privacy@work-plan.se
                        </div>
                        <div>
                          <strong>Telefon:</strong> +46 8 123 456 78
                        </div>
                        <div>
                          <strong>Postadress:</strong> Workplan AB, [Företagsadress], Sverige
                        </div>
                      </div>
                    </div>
                    <p>
                      Du har också rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY) om du anser att vi behandlar dina personuppgifter på ett felaktigt sätt.
                    </p>
                  </div>
                </div>

                {/* 14. Samtycke och återkallelse */}
                <div>
                  <h2
                    className="text-3xl font-medium text-[#08132B] mb-6"
                    style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                  >
                    14. Samtycke och Återkallelse
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      När vi behandlar dina personuppgifter baserat på samtycke har du alltid rätt att återkalla ditt samtycke. Återkallelse påverkar inte lagligheten av behandling som skedde innan återkallelsen.
                    </p>
                    <p>
                      För att återkalla ditt samtycke, kontakta oss via e-post eller telefon enligt kontaktuppgifterna ovan.
                    </p>
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
                          Ditt förtroende är viktigt för oss
                        </h3>
                        <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Vi arbetar kontinuerligt för att säkerställa att dina personuppgifter behandlas på ett säkert och transparent sätt. 
                          Tveka inte att kontakta oss om du har frågor eller funderingar kring din integritet.
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

export default PrivacyPolicyPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Star, 
  Handshake, 
  ArrowDown, 
  Users, 
  Clock, 
  TrendingUp,
  Award,
  Building,
  Target,
  Sparkles,
  CheckCircle
} from 'lucide-react';

const AboutUsPage = () => {
  const navigate = useNavigate();
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

  const scrollToStory = () => {
    const element = document.getElementById('our-story');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Transparent, honest partnerships.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'Uncompromising quality in every placement.',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Handshake,
      title: 'Partnership',
      description: 'Long-term relationships built on trust.',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      title: 'Founder & CEO',
      expertise: '15+ years in executive search and talent acquisition',
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      title: 'Head of Client Relations',
      expertise: '12+ years in business development and strategic partnerships',
      avatar: 'MC'
    },
    {
      name: 'Emma Williams',
      title: 'Senior Talent Consultant',
      expertise: '10+ years in candidate coaching and career development',
      avatar: 'EW'
    },
    {
      name: 'David Rodriguez',
      title: 'Logistics Specialist',
      expertise: '8+ years in warehouse and supply chain recruitment',
      avatar: 'DR'
    }
  ];

  const metrics = [
    { number: '150+', label: 'Placements completed' },
    { number: '95%', label: 'Repeat clients' },
    { number: '48h', label: 'Average start time' },
    { number: '98%', label: 'Success rate' }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      {/* Sophisticated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-slate-900/90 to-gray-800/95" />
        
        {/* Dynamic Gradient Orbs */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.06] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl transition-all duration-1000 delay-500"
          style={{
            background: `radial-gradient(circle, #10B981 0%, transparent 70%)`,
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
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-4xl mx-auto px-8 text-center">
            {/* Main Heading */}
            <h1 className={`
              text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight leading-tight
              transition-all duration-1000 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}>
              Om Workplan
            </h1>

            {/* Subheading */}
            <p className={`
              text-xl md:text-2xl text-white/80 mb-8 font-light leading-relaxed max-w-4xl mx-auto
              transition-all duration-1000 delay-200 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}>
              Specialiserad bemanning inom lager & logistik – snabb leverans, personlig service och full transparens.
            </p>

            {/* Primary CTA */}
            <button
              onClick={scrollToStory}
              className={`
                group px-8 py-4 mb-8
                bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl
                font-semibold text-lg tracking-wide
                hover:border-white/40 hover:bg-white/20
                transition-all duration-300
                min-w-[180px]
                transition-all duration-1000 delay-400 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>Läs vår resa</span>
                <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
              </div>
            </button>

            {/* Trust Chips */}
            <div className={`
              flex flex-wrap items-center justify-center gap-4 text-sm text-white/70
              transition-all duration-1000 delay-600 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                <span>Grundat 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                <span>Fokus: Lager & Logistik</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                <span>Baserade i Örebro</span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission & Values */}
        <section className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Mission */}
              <div>
                <h2 className="text-4xl font-light text-white mb-6">Vårt Uppdrag</h2>
                <p className="text-xl text-white/80 leading-relaxed font-light">
                  Vi gör bemanning enkelt för både företag och människor. Vi säkrar rätt kompetens snabbt för lager & logistik – samtidigt som vi hjälper kandidater att hitta trygga, utvecklande jobb utan onödigt krångel. Med tydliga processer, personlig service och fokus på kvalitet skapar vi långsiktigt värde för alla inblandade.
                </p>
              </div>

              {/* Values */}
              <div>
                <h2 className="text-4xl font-light text-white mb-6">Våra Värderingar</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Shield size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Transparens</h3>
                      <p className="text-white/70">öppna processer, tydlig prissättning och ärlig kommunikation.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Star size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Kvalitet i varje matchning</h3>
                      <p className="text-white/70">strukturerad screening, referenskontroll och noggranna leveranser.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Handshake size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Partnerskap på riktigt</h3>
                      <p className="text-white/70">en dedikerad kontaktperson och uppföljning hela vägen.</p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>

        {/* Our Story / Timeline */}
        <section id="our-story" className="py-24 px-8 bg-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Vår resa hittills</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                På några månader har vi byggt upp en smart, transparent bemanningspartner för lager & logistik.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="text-blue-400 font-bold text-lg mb-2">2025 Q2</div>
                <h3 className="text-xl font-semibold text-white mb-3">Starten</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Workplan grundas med fokus på att förenkla bemanning inom lager & logistik. Vi sätter våra processer, transparent prissättning och börjar bygga ett kvalitativt kandidatnätverk.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="text-blue-400 font-bold text-lg mb-2">2025 Q3</div>
                <h3 className="text-xl font-semibold text-white mb-3">Första uppdrag & partnerskap</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  De första bemanningarna levereras och långsiktiga kundrelationer etableras. Vi finjusterar matchningsmodellen och växer vårt nätverk av tillgängliga specialister.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Vårt Dedikerade Team</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Erfarna rekryterare som levererar kvalitet, snabbt och transparent
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
                  JA
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 break-words max-w-full">
                  Jawad Abbas
                </h3>
                <p className="text-blue-400 font-medium break-words max-w-full">
                  Medgrundare & Affärsansvarig
                </p>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
                  AM
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 break-words max-w-full">
                  Arvin Mahmoudi
                </h3>
                <p className="text-blue-400 font-medium break-words max-w-full">
                  Medgrundare & Leveranschef
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* By the Numbers */}

        {/* Trust Promise Section */}
        <section id="trust-promise" className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                Vårt löfte till dig
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Därför väljer företag oss som bemanningspartner.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <CheckCircle size={20} className="text-green-400" />
                  </div>
                  <span className="text-white/80 text-lg font-medium leading-relaxed">
                    Dedikerad kontaktperson från första dagen.
                  </span>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <CheckCircle size={20} className="text-green-400" />
                  </div>
                  <span className="text-white/80 text-lg font-medium leading-relaxed">
                    Transparent prissättning – inga bindningstider eller dolda avgifter.
                  </span>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <CheckCircle size={20} className="text-green-400" />
                  </div>
                  <span className="text-white/80 text-lg font-medium leading-relaxed">
                    Snabb återkoppling genom hela processen.
                  </span>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <CheckCircle size={20} className="text-green-400" />
                  </div>
                  <span className="text-white/80 text-lg font-medium leading-relaxed">
                    Fokus på lager & logistik – vi kan just din miljö.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUsPage;
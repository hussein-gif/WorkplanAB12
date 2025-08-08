import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  TrendingUp, 
  Users, 
  Search, 
  UserCheck, 
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Star,
  Sparkles,
  Plus,
  Minus
} from 'lucide-react';

const ForCandidatesPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [openFAQ, setOpenFAQ] = useState<number>(0); // First FAQ open by default

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

  const benefits = [
    {
      icon: Clock,
      title: 'Rätt jobb – snabbt',
      description: 'Vi matchar dig med uppdrag som passar dina mål och ditt schema. Du får snabb återkoppling.',
      highlight: 'Snabb återkoppling',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Target,
      title: 'Tydliga villkor & trygg lön',
      description: 'Klara avtal, korrekt lön i tid och full transparens genom hela uppdraget.',
      highlight: 'Tryggt & transparent',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Users,
      title: 'Personlig kontakt hela vägen',
      description: 'En dedikerad kontaktperson stöttar dig från ansökan till avslutat uppdrag.',
      highlight: 'Personlig service',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const featuredJobs = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechFlow',
      location: 'Stockholm',
      type: 'Heltid',
      companyLogo: 'T'
    },
    {
      id: '2',
      title: 'Marketing Manager',
      company: 'GrowthCo',
      location: 'Göteborg',
      type: 'Heltid',
      companyLogo: 'G'
    },
    {
      id: '3',
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Remote',
      type: 'Konsult',
      companyLogo: 'D'
    },
    {
      id: '4',
      title: 'Data Analyst',
      company: 'DataInsights',
      location: 'Malmö',
      type: 'Heltid',
      companyLogo: 'D'
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Stockholm',
      type: 'Heltid',
      companyLogo: 'C'
    },
    {
      id: '6',
      title: 'Project Manager',
      company: 'BuildCorp',
      location: 'Uppsala',
      type: 'Heltid',
      companyLogo: 'B'
    }
  ];

  const steps = [
    {
      icon: Search,
      title: 'Steg 1 – Sök & Välj',
      description: 'Utforska roller som matchar dina mål och intressen.'
    },
    {
      icon: UserCheck,
      title: 'Steg 2 – Matchning & Intervjuer',
      description: 'Vi matchar din profil, genomför intervjuer och presenterar dig sedan för arbetsgivaren.'
    },
    {
      icon: Briefcase,
      title: 'Steg 3 – Starta Ditt Nya Jobb',
      description: 'Acceptera erbjudandet och kickstarta nästa kapitel.'
    }
  ];

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

  const handleBrowseRoles = () => {
    const element = document.getElementById('featured-jobs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

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
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
              alt="Professionals collaborating"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
            <h1 className={`
              text-6xl md:text-7xl font-extralight text-white mb-6 tracking-tight leading-[0.9]
              transition-all duration-1000 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}>
              <span className="block font-light">Hitta Jobbet</span>
              <span className="block font-normal">Som Passar Dig</span>
            </h1>

            <p className={`
              text-2xl text-white/80 mb-12 font-light leading-relaxed
              transition-all duration-1000 delay-200 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}>
              Vi matchar dig med rätt jobb – snabbt och utan krångel.
            </p>

            <button
              onClick={handleBrowseRoles}
              className={`
                px-8 py-4 
                bg-blue-600 text-white rounded-xl
                font-semibold text-lg tracking-wide
                hover:bg-blue-700 hover:scale-105
                transition-all duration-300
                shadow-lg hover:shadow-xl
                min-w-[250px]
                transition-all duration-1000 delay-400 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
            >
              Visa lediga jobb
            </button>
          </div>
        </section>

        {/* Why TalentBridge for Candidates */}
        <section className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                Därför väljer kandidater oss
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
                >
                  <div className={`
                    w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} 
                    flex items-center justify-center mb-6 mx-auto
                  `}>
                    <benefit.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 text-center">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-4 text-center">
                    {benefit.description}
                  </p>
                  <div className="text-xs font-medium text-white/50 uppercase tracking-wider text-center">
                    {benefit.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Open Roles */}
        <section id="featured-jobs" className="py-24 px-8 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                Lediga Jobb
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job, index) => (
                <div
                  key={index}
                  className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-semibold text-sm">
                      {job.companyLogo}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{job.company}</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {job.title}
                  </h3>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} className="text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} className="text-gray-400" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                    onClick={() => navigate(`/job/${job.id}`)}

                  <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Ansök Nu
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/jobs')}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg tracking-wide hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Se Alla Jobb
              </button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-white">
                Så Går Det Till
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Text Row */}
            <div className="text-center">
              <p className="text-lg text-white/80">
                Redo?{' '}
                <button
                  onClick={() => {
                    const element = document.getElementById('featured-jobs');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="font-bold text-blue-400 hover:text-blue-300 transition-colors underline"
                >
                  Bläddra bland jobben ovan.
                </button>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

      </div>
    </div>
  );
};

export default ForCandidatesPage;
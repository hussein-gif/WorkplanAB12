import React, { useState, useEffect } from 'react';
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  Sparkles,
  Star
} from 'lucide-react';

const ContactUsPage = () => {
  const [userType, setUserType] = useState<'candidate' | 'company' | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [candidateForm, setCandidateForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    gdprConsent: false
  });
  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    nameTitle: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    gdprAccept: false
  });

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

  const handleCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Candidate form submitted:', candidateForm);
    // Handle form submission
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Company form submitted:', companyForm);
    // Handle form submission
  };

  const handleCandidateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setCandidateForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCompanyForm(prev => ({
      ...prev,
      [name]: value
    }));
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
        <section className="pt-32 pb-16 px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Title */}
            <h1 className={`
              text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight
              transition-all duration-1000 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
            `}>
              Hur kan vi hjälpa dig?
            </h1>

            {/* Support Line */}
            <p className={`
              text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed mb-8
              transition-all duration-1000 delay-200 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}>
              Välj om du är kandidat eller företag så visar vi rätt formulär.
            </p>

            {/* User Type Toggle */}
            <div className={`
              flex flex-col sm:flex-row gap-4 justify-center items-center mb-6
              transition-all duration-1000 delay-400 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}>
              <button
                onClick={() => setUserType('candidate')}
                className={`
                  group relative px-8 py-4 rounded-2xl font-semibold text-lg
                  border-2 transition-all duration-300
                  min-w-[200px]
                  ${userType === 'candidate'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }
                `}
              >
                <div className="flex items-center justify-center space-x-3">
                  <User size={20} />
                  <span>Jag är kandidat</span>
                </div>
              </button>

              <button
                onClick={() => setUserType('company')}
                className={`
                  group relative px-8 py-4 rounded-2xl font-semibold text-lg
                  border-2 transition-all duration-300
                  min-w-[200px]
                  ${userType === 'company'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                  }
                `}
              >
                <div className="flex items-center justify-center space-x-3">
                  <Building size={20} />
                  <span>Företagskund</span>
                </div>
              </button>
            </div>

            {/* Reassurance Line */}
            <p className={`
              text-sm text-gray-500 mb-12
              transition-all duration-1000 delay-600 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}>
              Vi hanterar dina uppgifter konfidentiellt.
            </p>
          </div>
        </section>

        {/* Contact Forms */}
        <section className="px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Candidate Form */}
            {userType === 'candidate' && (
              <div className={`
                bg-white border border-gray-200 rounded-3xl p-8 shadow-lg
                transition-all duration-500 transform
                ${userType === 'candidate' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-2">
                    Har du en fråga? Hör av dig!
                  </h2>
                  <p className="text-gray-600">
                    Fyll i formuläret så återkommer vi så snart vi kan.
                  </p>
                </div>

                <form onSubmit={handleCandidateSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Namn *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={candidateForm.name}
                        onChange={handleCandidateChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                        placeholder="Ditt namn"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        E-post *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={candidateForm.email}
                        onChange={handleCandidateChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                        placeholder="din@email.com"
                      />
                    </div>
                  </div>


                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={candidateForm.phone}
                      onChange={handleCandidateChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      placeholder="+46 XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Meddelande *
                    </label>
                    <textarea
                      name="message"
                      value={candidateForm.message}
                      onChange={handleCandidateChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 resize-none"
                      placeholder="Beskriv gärna din fråga eller ditt behov …"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="gdprConsent"
                      checked={candidateForm.gdprConsent}
                      onChange={handleCandidateChange}
                      required
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="text-gray-700 text-sm">
                      Jag godkänner att Workplan lagrar mina uppgifter enligt{' '}
                      <a 
                        href="/privacy" 
                        className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GDPR
                      </a>
                      .
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="
                      w-full py-4 px-6
                      bg-blue-600 text-white rounded-xl
                      font-semibold text-lg tracking-wide
                      hover:bg-blue-700
                      transition-all duration-300
                      shadow-lg hover:shadow-xl
                      hover:scale-[1.02]
                      flex items-center justify-center space-x-2
                    "
                  >
                    <Send size={20} />
                    <span>Skicka meddelande</span>
                  </button>
                </form>
              </div>
            )}

            {/* Company Form */}
            {userType === 'company' && (
              <div className={`
                bg-white border border-gray-200 rounded-3xl p-8 shadow-lg
                transition-all duration-500 transform
                ${userType === 'company' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-2">
                    Har ni en fråga? Hör av er!
                  </h2>
                  <p className="text-gray-600">
                    Fyll i formuläret så återkommer vi så snart vi kan.
                  </p>
                </div>

                <form onSubmit={handleCompanySubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Företagsnamn *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={companyForm.companyName}
                        onChange={handleCompanyChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                        placeholder="Ert företagsnamn"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Ditt namn & titel *
                      </label>
                      <input
                        type="text"
                        name="nameTitle"
                        value={companyForm.nameTitle}
                        onChange={handleCompanyChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                        placeholder="Anna Andersson, HR-chef"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        E‑post *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={companyForm.email}
                        onChange={handleCompanyChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                        placeholder="din@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={companyForm.phone}
                        onChange={handleCompanyChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                        placeholder="+46 XX XXX XX XX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Ämne *
                    </label>
                    <select
                      name="subject"
                      value={companyForm.subject || ''}
                      onChange={handleCompanyChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="">Välj ämne</option>
                      <option value="pris-villkor">Pris & villkor</option>
                      <option value="tillgangliga-konsulter">Tillgängliga konsulter</option>
                      <option value="processen">Hur processen fungerar</option>
                      <option value="avtal-juridik">Avtal & juridik</option>
                      <option value="annat">Annat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Meddelande *
                    </label>
                    <textarea
                      name="message"
                      value={companyForm.message}
                      onChange={handleCompanyChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 resize-none"
                      placeholder="Ställ din fråga eller beskriv kort vad du vill veta …"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="gdprAccept"
                      checked={companyForm.gdprAccept || false}
                      onChange={handleCompanyChange}
                      required
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <label className="text-gray-700 text-sm">
                      Jag godkänner att Workplan lagrar mina uppgifter enligt{' '}
                      <a 
                        href="/privacy" 
                        className="text-emerald-600 hover:text-emerald-700 underline focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 rounded"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GDPR
                      </a>
                      .
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="
                      w-full py-4 px-6
                      bg-emerald-600 text-white rounded-xl
                      font-semibold text-lg tracking-wide
                      hover:bg-emerald-700
                      transition-all duration-300
                      shadow-lg hover:shadow-xl
                      hover:scale-[1.02]
                      flex items-center justify-center space-x-2
                    "
                  >
                    <Send size={20} />
                    <span>Skicka meddelande</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>

        {/* Alternative Contact Info */}
        <section className="px-8 py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Kontakta oss direkt
              </h2>
              <p className="text-gray-600">
                Maila eller ring – vi återkommer så snart vi kan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-2xl mx-auto">
              <div className="text-center p-5 bg-white rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} className="text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">E-post</h3>
                <p className="text-gray-600">
                  <a 
                    href="mailto:info@work-plan.se"
                    className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
                  >
                    info@work-plan.se
                  </a>
                </p>
              </div>

              <div className="text-center p-5 bg-white rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone size={24} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefon</h3>
                <p className="text-gray-600">
                  <a 
                    href="tel:+46812345678"
                    className="text-purple-600 hover:text-purple-700 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded block"
                  >
                    +46 8 123 456 78
                  </a>
                  <span className="text-sm">Vardagar 09.00–16.00</span>
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Vi hanterar dina uppgifter konfidentiellt och i enlighet med GDPR.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ContactUsPage;
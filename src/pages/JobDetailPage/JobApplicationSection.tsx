import React, { useState, useRef } from 'react';
import { Send, Upload, User, Mail, Phone, FileText, Briefcase } from 'lucide-react';

interface JobApplicationSectionProps {
  jobTitle: string;
  companyName: string;
}

const JobApplicationSection: React.FC<JobApplicationSectionProps> = ({
  jobTitle,
  companyName,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    gdprConsent: false,
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', { ...formData, cvFile });
    // Handle form submission
    alert('Tack för din ansökan! Vi återkommer så snart vi kan.');
  };

  return (
    <section id="application-form" className="relative py-16 px-6 bg-white">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full opacity-[0.03] blur-3xl"
          style={{ background: 'radial-gradient(ellipse at center, #08132B, transparent 60%)' }}
        />
        <div
          className="absolute -bottom-32 -right-16 w-[32rem] h-[32rem] rounded-full opacity-[0.02] blur-3xl"
          style={{ background: 'radial-gradient(ellipse at center, #0B274D, transparent 60%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(8,19,43,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(8,19,43,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#08132B] to-[#0B274D] rounded-xl flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2
            className="text-3xl font-medium text-[#08132B] mb-2"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            Ansök till {jobTitle}
          </h2>
          <p
            className="text-gray-600"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Fyll i formuläret nedan för att ansöka till denna tjänst hos {companyName}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label 
                  className="block text-sm font-medium text-gray-700 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Förnamn *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-[#08132B] focus:ring-4 focus:ring-[#08132B]/10 transition-all duration-200"
                    placeholder="Ditt förnamn"
                  />
                </div>
              </div>
              
              <div>
                <label 
                  className="block text-sm font-medium text-gray-700 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Efternamn *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-[#08132B] focus:ring-4 focus:ring-[#08132B]/10 transition-all duration-200"
                    placeholder="Ditt efternamn"
                  />
                </div>
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label 
                  className="block text-sm font-medium text-gray-700 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  E-post *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-[#08132B] focus:ring-4 focus:ring-[#08132B]/10 transition-all duration-200"
                    placeholder="din@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label 
                  className="block text-sm font-medium text-gray-700 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Telefon
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-[#08132B] focus:ring-4 focus:ring-[#08132B]/10 transition-all duration-200"
                    placeholder="+46 XX XXX XX XX"
                  />
                </div>
              </div>
            </div>

            {/* CV Upload */}
            <div>
              <label 
                className="block text-sm font-medium text-gray-700 mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                CV/Meritförteckning *
              </label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-[#08132B] transition-colors cursor-pointer group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
                <div className="text-center">
                  <Upload className="mx-auto h-10 w-10 text-gray-400 group-hover:text-[#08132B] transition-colors mb-3" />
                  <p className="text-gray-600 font-medium">
                    {cvFile ? cvFile.name : 'Klicka för att ladda upp ditt CV'}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">PDF, DOC eller DOCX (max 10MB)</p>
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label 
                className="block text-sm font-medium text-gray-700 mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Personligt brev
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-[#08132B] focus:ring-4 focus:ring-[#08132B]/10 transition-all duration-200 resize-none"
                  placeholder="Berätta kort om dig själv och varför du är intresserad av denna tjänst..."
                />
              </div>
            </div>

            {/* GDPR Consent */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="gdprConsent"
                checked={formData.gdprConsent}
                onChange={handleInputChange}
                required
                className="w-4 h-4 text-[#08132B] border-gray-300 rounded focus:ring-[#08132B] mt-1"
              />
              <label 
                className="text-sm text-gray-700 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Jag godkänner att Workplan lagrar och behandlar mina uppgifter för att hantera min ansökan enligt{' '}
                <a
                  href="/privacy"
                  className="text-[#08132B] hover:text-[#0B274D] underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  integritetspolicyn
                </a>
                . *
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="
                group relative w-full py-4 px-6
                bg-[#08132B] text-white rounded-xl
                font-medium text-lg tracking-wide
                hover:bg-[#0B274D]
                transition-all duration-300
                shadow-lg hover:shadow-xl
                hover:scale-[1.02]
                overflow-hidden
              "
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <div className="relative flex items-center justify-center space-x-2">
                <Send size={20} />
                <span>Skicka ansökan</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JobApplicationSection;
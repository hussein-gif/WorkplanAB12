import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, ChevronUp, Send, Upload, User, Mail, Phone, FileText } from 'lucide-react';

interface JobApplicationFormProps {
  jobTitle: string;
  companyName: string;
  isPopupOpen: boolean;
  onClosePopup: () => void;
  onMinimize: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  jobTitle,
  companyName,
  isPopupOpen,
  onClosePopup,
  onMinimize,
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
  const [isMinimized, setIsMinimized] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPopupOpen && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isPopupOpen]);

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
    onClosePopup();
  };

  const handleMinimizeToggle = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      onMinimize();
    }
  };

  if (!isPopupOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClosePopup}
      />

      {/* Popup Form */}
      <div
        ref={formRef}
        className={`
          fixed left-1/2 transform -translate-x-1/2 z-50
          w-full max-w-2xl mx-4
          bg-white rounded-t-3xl shadow-2xl
          transition-all duration-500 ease-out
          ${isMinimized 
            ? 'bottom-0 translate-y-[calc(100%-80px)]' 
            : 'bottom-0 translate-y-0'
          }
        `}
        style={{ maxHeight: '85vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#08132B] rounded-t-3xl">
          <div>
            <h3 
              className="text-xl font-medium text-white"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
            >
              Ansök till {jobTitle}
            </h3>
            <p 
              className="text-white/70 text-sm"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {companyName}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleMinimizeToggle}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label={isMinimized ? "Maximera formulär" : "Minimera formulär"}
            >
              {isMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <button
              onClick={onClosePopup}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Stäng formulär"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div 
          className={`
            overflow-y-auto transition-all duration-500
            ${isMinimized ? 'max-h-0 opacity-0' : 'max-h-[70vh] opacity-100'}
          `}
        >
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-[#08132B] transition-colors cursor-pointer group"
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
                  <Upload className="mx-auto h-8 w-8 text-gray-400 group-hover:text-[#08132B] transition-colors" />
                  <p className="mt-2 text-sm text-gray-600">
                    {cvFile ? cvFile.name : 'Klicka för att ladda upp ditt CV'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC eller DOCX (max 10MB)</p>
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
                  rows={4}
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
    </>
  );
};

export default JobApplicationForm;
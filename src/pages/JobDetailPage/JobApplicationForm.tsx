import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Send, Upload, User, Mail, Phone, FileText } from 'lucide-react';

interface JobApplicationFormProps {
  jobTitle: string;
  companyName: string; // kvar i signaturen men används inte längre (önskemål)
  isPopupOpen: boolean;
  onClosePopup: () => void;
  onMinimize: () => void; // vi anropar inte denna längre (ska ej auto-scrolla)
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  jobTitle,
  // companyName,
  isPopupOpen,
  onClosePopup,
  // onMinimize,
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
  const [otherFile, setOtherFile] = useState<File | null>(null);

  const [isMinimized, setIsMinimized] = useState(false);

  const cvInputRef = useRef<HTMLInputElement>(null);
  const otherInputRef = useRef<HTMLInputElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Lås upp/återställ bakgrund-scroll
  useEffect(() => {
    if (isPopupOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev || '';
      };
    }
  }, [isPopupOpen]);

  // När öppnas: visa “header strip” högst upp (lite bakgrund synlig)
  useEffect(() => {
    if (isPopupOpen) {
      setIsMinimized(false); // alltid visa fullt ark vid öppning
    }
  }, [isPopupOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFile = (setter: (f: File | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setter(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Skicka ansökan (mock)
    console.log('Application submitted:', { ...formData, cvFile, otherFile });
    alert('Tack för din ansökan! Vi återkommer så snart vi kan.');
    onClosePopup();
  };

  const toggleMinimize = () => {
    // Bara minimera/maximera — INGEN scroll
    setIsMinimized(v => !v);
  };

  if (!isPopupOpen) return null;

  return (
    <>
      {/* Backdrop (blockerar klick & ligger under arket) */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
        onClick={onClosePopup}
      />

      {/* Själva arket – alltid överst */}
      <div
        ref={sheetRef}
        className={`
          fixed left-0 right-0 z-[99999]
          w-screen
          transition-transform duration-500 ease-out
          ${isMinimized ? 'translate-y-[calc(100%-88px)]' : 'translate-y-0'}
        `}
        style={{
          top: '14px', // lämna lite av bakgrunden synlig högst upp
          height: 'calc(100vh - 14px)',
        }}
      >
        {/* Bakgrund: #08132B med subtil gradient + mönster */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1400px 600px at 50% -200px, rgba(255,255,255,0.06), transparent 60%),' +
              'linear-gradient(180deg, #0B1D3E 0%, #08132B 35%, #08132B 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        {/* Inre container */}
        <div className="relative h-full overflow-hidden">
          {/* Header-bar (mörk) */}
          <div className="absolute top-0 left-0 right-0 bg-[#0A1731]/95 backdrop-blur-sm border-b border-white/10">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4">
              <div className="flex-1 text-center">
                {/* Titel — exakt jobbannonsens titel */}
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white"
                  style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
                >
                  {jobTitle}
                </h3>
              </div>

              {/* Endast nedåtpil (ingen X) */}
              <button
                onClick={toggleMinimize}
                className="ml-3 p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={isMinimized ? 'Maximera formulär' : 'Minimera formulär'}
              >
                {isMinimized ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </button>
            </div>
          </div>

          {/* Scroll-yta med formuläret */}
          <div className="h-full pt-[84px] pb-8 overflow-y-auto">
            <form
              onSubmit={handleSubmit}
              className="max-w-5xl mx-auto px-4 sm:px-6"
            >
              {/* Namn */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Förnamn *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-[#08132B] border border-white/20 focus:border-white focus:ring-4 focus:ring-white/20 transition-all"
                      placeholder="Ditt förnamn"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Efternamn *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-[#08132B] border border-white/20 focus:border-white focus:ring-4 focus:ring-white/20 transition-all"
                      placeholder="Ditt efternamn"
                    />
                  </div>
                </div>
              </div>

              {/* Kontakt */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    E-post *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-[#08132B] border border-white/20 focus:border-white focus:ring-4 focus:ring-white/20 transition-all"
                      placeholder="din@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Telefon *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-[#08132B] border border-white/20 focus:border-white focus:ring-4 focus:ring-white/20 transition-all"
                      placeholder="+46 XX XXX XX XX"
                    />
                  </div>
                </div>
              </div>

              {/* CV */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Ladda upp CV *
                </label>
                <div
                  onClick={() => cvInputRef.current?.click()}
                  className="relative border-2 border-dashed border-white/30 hover:border-white/60 rounded-xl p-6 cursor-pointer transition-colors bg-white/5"
                >
                  <input
                    ref={cvInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFile(handleCv => setCvFile(handleCv as File))}
                    className="hidden"
                    required
                  />
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-white/70" />
                    <p className="mt-2 text-sm text-white/90">
                      {cvFile ? cvFile.name : 'Klicka för att ladda upp ditt CV'}
                    </p>
                    <p className="text-xs text-white/60 mt-1">
                      PDF, DOC eller DOCX (max 10MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Övriga dokument */}
              <div className="mt-5">
                <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Övriga dokument
                </label>
                <div
                  onClick={() => otherInputRef.current?.click()}
                  className="relative border-2 border-dashed border-white/20 hover:border-white/50 rounded-xl p-6 cursor-pointer transition-colors bg-white/5"
                >
                  <input
                    ref={otherInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    onChange={handleFile(setOtherFile)}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-white/60" />
                    <p className="mt-2 text-sm text-white/85">
                      {otherFile ? otherFile.name : 'Klicka för att bifoga fler filer (valfritt)'}
                    </p>
                    <p className="text-xs text-white/55 mt-1">PDF, DOC, DOCX, PNG, JPG (max 10MB)</p>
                  </div>
                </div>
              </div>

              {/* Personligt brev */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Personligt brev
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-white/50" size={18} />
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-[#08132B] border border-white/20 focus:border-white focus:ring-4 focus:ring-white/20 transition-all resize-none"
                    placeholder="Berätta kort om dig själv och varför du är intresserad av denna tjänst..."
                  />
                </div>
              </div>

              {/* GDPR */}
              <div className="mt-6 flex items-start gap-3">
                <input
                  type="checkbox"
                  name="gdprConsent"
                  checked={formData.gdprConsent}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-4 h-4 rounded border-white/30 text-white focus:ring-white"
                />
                <label className="text-sm text-white/90 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Jag godkänner att Workplan lagrar och behandlar mina uppgifter för att hantera min ansökan enligt{' '}
                  <a
                    href="/privacy"
                    className="text-white underline underline-offset-2 hover:text-white/80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    integritetspolicyn
                  </a>
                  . *
                </label>
              </div>

              {/* Submit – kompakt med “3D”-känsla */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="
                    relative inline-flex items-center gap-2
                    px-6 py-3 rounded-xl
                    bg-white text-[#08132B] font-semibold
                    shadow-[0_10px_20px_rgba(0,0,0,0.35)]
                    active:translate-y-[1px] active:shadow-[0_6px_14px_rgba(0,0,0,0.35)]
                    transition-transform duration-150
                  "
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/30 to-transparent opacity-70" />
                  <Send size={18} />
                  <span>Skicka ansökan</span>
                </button>
              </div>

              {/* Liten bottenmarginal för luft */}
              <div className="h-10" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobApplicationForm;

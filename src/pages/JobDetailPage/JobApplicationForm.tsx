import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Send, Upload, User, Mail, Phone, X } from 'lucide-react';

interface JobApplicationFormProps {
  jobTitle: string;
  companyName: string;
  isPopupOpen: boolean;
  onClosePopup: () => void;
  onMinimize: () => void;
  // valfritt – används om du redan skickar dessa
  industry?: string;
  location?: string;
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
  const [otherFile, setOtherFile] = useState<File | null>(null);

  const [isMinimized, setIsMinimized] = useState(false); // används för pil-ikonens state
  const [animateIn, setAnimateIn] = useState(false);     // styr mjuk in-anim
  const [animatingOut, setAnimatingOut] = useState(false); // mjuk ut-anim

  const fileInputRef = useRef<HTMLInputElement>(null);
  const otherFileInputRef = useRef<HTMLInputElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Lås bakgrundscroll när arket är öppet
  useEffect(() => {
    if (isPopupOpen) {
      const original = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      // trigger mjuk in-animation
      requestAnimationFrame(() => setAnimateIn(true));
      return () => {
        document.documentElement.style.overflow = original;
        setAnimateIn(false);
        setAnimatingOut(false);
        setIsMinimized(false);
      };
    }
  }, [isPopupOpen]);

  // Scrolla sheetens topp i bild när det öppnas
  useEffect(() => {
    if (isPopupOpen && sheetRef.current) {
      sheetRef.current.scrollTop = 0;
    }
  }, [isPopupOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, kind: 'cv' | 'other') => {
    const file = e.target.files?.[0] || null;
    if (kind === 'cv') setCvFile(file);
    else setOtherFile(file);
  };

  const closeSmoothly = (alsoCallMinimize?: boolean) => {
    // Mjuk ut-anim och stäng efter transition
    setAnimatingOut(true);
    setIsMinimized(true);
    if (alsoCallMinimize) onMinimize?.();
    setTimeout(() => {
      onClosePopup();
      setAnimatingOut(false);
      setIsMinimized(false);
    }, 350); // matchar duration-300 + lite marginal
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', { ...formData, cvFile, otherFile });
    alert('Tack för din ansökan! Vi återkommer så snart vi kan.');
    closeSmoothly();
  };

  if (!isPopupOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[70] bg-black/30 backdrop-blur-sm transition-opacity duration-300
        ${animateIn && !animatingOut ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => closeSmoothly()} // klick utanför stänger också – behåll samma beteende
      />

      {/* Sheet (arket) */}
      <div
        ref={sheetRef}
        className={`
          fixed z-[80] left-0 right-0 bottom-0 top-10 sm:top-12   /* 🔹 lite större topp-gap */
          bg-[#08132B] text-white rounded-t-3xl
          overflow-y-auto overscroll-contain
          shadow-[0_-20px_60px_rgba(0,0,0,0.35)]
          transition-transform duration-300 ease-out will-change-transform
          ${animateIn && !animatingOut ? 'translate-y-0' : 'translate-y-full'} /* 🔹 mjuk in/ut */
        `}
      >
        {/* Enkel elegant bakgrund – subtil radial + diagonalt mönster */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            background:
              'radial-gradient(1200px 600px at 50% -200px, rgba(255,255,255,0.25), transparent 60%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(transparent 97%, rgba(255,255,255,0.25) 100%),
              linear-gradient(90deg, transparent 97%, rgba(255,255,255,0.2) 100%)
            `,
            backgroundSize: '26px 26px, 26px 26px',
          }}
        />

        {/* Header */}
        <div className="relative px-5 sm:px-8 pt-6 pb-4">
          <button
            onClick={() => closeSmoothly(true)}
            className="absolute right-4 top-4 h-10 w-10 rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 flex items-center justify-center transition"
            aria-label={isMinimized ? 'Öppna formulär' : 'Minimera formulär'}
          >
            {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {/* Rubrik */}
          <h2
            className="text-center text-3xl sm:text-4xl font-semibold tracking-tight"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            {jobTitle}
          </h2>
        </div>

        {/* Innehåll */}
        <div className="relative px-5 sm:px-8 pb-10">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
            {/* Namn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Förnamn *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B274D]/50" size={18} />
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-white text-[#08132B] pl-10 pr-4 py-3 rounded-xl border border-white/0 focus:border-white/30 focus:ring-4 focus:ring-white/10 transition"
                    placeholder="Ditt förnamn"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Efternamn *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B274D]/50" size={18} />
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-white text-[#08132B] pl-10 pr-4 py-3 rounded-xl border border-white/0 focus:border-white/30 focus:ring-4 focus:ring-white/10 transition"
                    placeholder="Ditt efternamn"
                  />
                </div>
              </div>
            </div>

            {/* Kontakt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  E-post *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B274D]/50" size={18} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white text-[#08132B] pl-10 pr-4 py-3 rounded-xl border border-white/0 focus:border-white/30 focus:ring-4 focus:ring-white/10 transition"
                    placeholder="din@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Telefon *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B274D]/50" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white text-[#08132B] pl-10 pr-4 py-3 rounded-xl border border-white/0 focus:border-white/30 focus:ring-4 focus:ring-white/10 transition"
                    placeholder="+46 XX XXX XX XX"
                  />
                </div>
              </div>
            </div>

            {/* Ladda upp CV */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Ladda upp CV *
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative rounded-xl border-2 border-dashed border-white/30 bg-white/5 hover:bg-white/10 transition p-6 cursor-pointer group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, 'cv')}
                  className="hidden"
                  required
                />
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-white/70 group-hover:text-white transition" />
                  <p className="mt-2 text-sm text-white/90">
                    {cvFile ? cvFile.name : 'Klicka för att ladda upp ditt CV'}
                  </p>
                  <p className="text-xs text-white/70 mt-1">PDF, DOC eller DOCX (max 10MB)</p>
                </div>
              </div>
            </div>

            {/* Övriga dokument (valfritt) */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Övriga dokument
              </label>
              <div
                onClick={() => otherFileInputRef.current?.click()}
                className="relative rounded-xl border-2 border-dashed border-white/30 bg-white/5 hover:bg-white/10 transition p-6 cursor-pointer group"
              >
                <input
                  ref={otherFileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={(e) => handleFileChange(e, 'other')}
                  className="hidden"
                />
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-white/70 group-hover:text-white transition" />
                  <p className="mt-2 text-sm text-white/90">
                    {otherFile ? otherFile.name : 'Klicka för att bifoga fler filer (valfritt)'}
                  </p>
                  <p className="text-xs text-white/70 mt-1">PDF, DOC, DOCX, PNG, JPG (max 10MB)</p>
                </div>
              </div>
            </div>

            {/* Personligt brev */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Personligt brev
              </label>
              <div className="relative">
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-white text-[#08132B] pl-4 pr-4 py-3 rounded-xl border border-white/0 focus:border-white/30 focus:ring-4 focus:ring-white/10 transition resize-none"
                  placeholder="Berätta kort om dig själv och varför du är intresserad av denna tjänst..."
                />
              </div>
            </div>

            {/* GDPR */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="gdprConsent"
                checked={formData.gdprConsent}
                onChange={handleInputChange}
                required
                className="w-4 h-4 text-[#08132B] border-white/40 rounded focus:ring-white/40 mt-1 bg-white"
              />
              <label className="text-sm text-white/90 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Jag godkänner att Workplan lagrar och behandlar mina uppgifter för att hantera min ansökan enligt{' '}
                <a
                  href="/privacy"
                  className="underline underline-offset-2 decoration-white/50 hover:decoration-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  integritetspolicyn
                </a>
                . *
              </label>
            </div>

            {/* Skicka ansökan – vit, elegant, centrerad, 3D-känsla */}
            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                className="
                  relative inline-flex items-center gap-2 px-8 py-3
                  rounded-2xl bg-white text-[#08132B] font-semibold
                  shadow-[0_10px_30px_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.25)]
                  transition-transform duration-300
                  hover:-translate-y-0.5 active:translate-y-0
                  focus:outline-none
                "
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {/* glans-effekt */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 40%)',
                  }}
                />
                <Send size={18} />
                <span className="relative">Skicka ansökan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default JobApplicationForm;

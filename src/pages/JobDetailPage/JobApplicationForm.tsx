import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Send, Upload, User, Mail, Phone, FileText } from 'lucide-react';

interface JobApplicationFormProps {
  jobTitle: string;
  companyName: string; // kvar för ev. framtida bruk, men visas inte längre
  isPopupOpen: boolean;
  onClosePopup: () => void;
  onMinimize: () => void; // kvar i interfacet för kompatibilitet – vi kallar inte längre denna
  industry?: string;      // NYTT – liten text ovanför rubriken, t.ex. “Lager”
  location?: string;      // NYTT – liten text ovanför rubriken, t.ex. “Örebro”
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  jobTitle,
  companyName, // eslint-disable-line @typescript-eslint/no-unused-vars
  isPopupOpen,
  onClosePopup,
  onMinimize,  // eslint-disable-line @typescript-eslint/no-unused-vars
  industry,
  location,
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
  const [extraFiles, setExtraFiles] = useState<File | null>(null);

  const cvInputRef = useRef<HTMLInputElement>(null);
  const extraInputRef = useRef<HTMLInputElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Lås body-scroll när arket är öppet (failsafe – även om sidan gör det)
  useEffect(() => {
    if (isPopupOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isPopupOpen]);

  useEffect(() => {
    if (isPopupOpen && sheetRef.current) {
      sheetRef.current.scrollTop = 0;
    }
  }, [isPopupOpen]);

  if (!isPopupOpen) return null;

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
    // Skicka/hantera – mock
    console.log('Application submitted:', { ...formData, cvFile, extraFiles });
    alert('Tack för din ansökan! Vi återkommer så snart vi kan.');
    onClosePopup();
  };

  // Lilla raden ovanför rubrik – visas bara om minst en finns
  const smallHeading =
    [industry?.trim(), location?.trim()].filter(Boolean).join(' • ') || '';

  return (
    <>
      {/* Backdrop – blockera click & scroll, lägg under arket */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        style={{ zIndex: 9998 }}
        onClick={onClosePopup}
      />

      {/* Sheet – alltid överst, fullbredd, liten gap upptill, rundade övre hörn */}
      <div
        ref={sheetRef}
        className={`
          fixed left-0 right-0 bottom-0 top-[14px]
          rounded-t-[28px]
          overflow-y-auto
        `}
        style={{
          zIndex: 9999,
          // Elegant mörk bakgrund med subtil radial + brus-känsla
          background:
            'radial-gradient(1200px 600px at 50% -200px, rgba(255,255,255,0.08), transparent 60%), radial-gradient(800px 400px at 20% 0%, rgba(255,255,255,0.05), transparent 55%), #08132B',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.4)',
        }}
        aria-modal="true"
        role="dialog"
      >
        {/* Header-bar med endast pil nedåt – ligger “ovanpå” innehållet */}
        <div className="sticky top-0 z-[1] px-4 py-3 flex justify-end items-center">
          <button
            onClick={onClosePopup}
            aria-label="Stäng ansökningsformulär"
            className="p-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white/90 transition-colors"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Innehåll – allt scrollear, inklusive rubrik */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pb-12">
          {/* Rubriker */}
          <div className="text-center mt-2 mb-8">
            {smallHeading && (
              <div
                className="text-sm tracking-wide uppercase text-white/60"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em' }}
              >
                {smallHeading}
              </div>
            )}

            <h1
              className="mt-3 text-4xl md:text-5xl lg:text-6xl text-white font-semibold"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
            >
              {jobTitle}
            </h1>
          </div>

          {/* Formulär */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Namn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-medium text-white/80 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Förnamn *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-4 focus:ring-white/10"
                    placeholder="Ditt förnamn"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-white/80 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Efternamn *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-4 focus:ring-white/10"
                    placeholder="Ditt efternamn"
                  />
                </div>
              </div>
            </div>

            {/* Kontakt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-medium text-white/80 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  E-post *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-4 focus:ring-white/10"
                    placeholder="din@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-white/80 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Telefon *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-4 focus:ring-white/10"
                    placeholder="+46 XX XXX XX XX"
                  />
                </div>
              </div>
            </div>

            {/* Ladda upp CV */}
            <div>
              <label
                className="block text-sm font-medium text-white/80 mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Ladda upp CV *
              </label>
              <div
                onClick={() => cvInputRef.current?.click()}
                className="relative border-2 border-dashed border-white/25 rounded-xl p-8 cursor-pointer group bg-white/5 hover:bg-white/[0.07] transition-colors"
              >
                <input
                  ref={cvInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFile(handleCv => setCvFile(handleCv))}
                  className="hidden"
                  required
                />
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-white/50 group-hover:text-white/80 transition-colors" />
                  <p className="mt-2 text-sm text-white/80">
                    {cvFile ? cvFile.name : 'Klicka för att ladda upp ditt CV'}
                  </p>
                  <p className="text-xs text-white/60 mt-1">PDF, DOC eller DOCX (max 10MB)</p>
                </div>
              </div>
            </div>

            {/* Övriga dokument (valfritt) */}
            <div>
              <label
                className="block text-sm font-medium text-white/80 mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Övriga dokument
              </label>
              <div
                onClick={() => extraInputRef.current?.click()}
                className="relative border-2 border-dashed border-white/25 rounded-xl p-8 cursor-pointer group bg-white/5 hover:bg-white/[0.07] transition-colors"
              >
                <input
                  ref={extraInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleFile(f => setExtraFiles(f))}
                  className="hidden"
                />
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-white/50 group-hover:text-white/80 transition-colors" />
                  <p className="mt-2 text-sm text-white/80">
                    {extraFiles ? extraFiles.name : 'Klicka för att bifoga fler filer (valfritt)'}
                  </p>
                  <p className="text-xs text-white/60 mt-1">PDF, DOC, DOCX, PNG, JPG (max 10MB)</p>
                </div>
              </div>
            </div>

            {/* Personligt brev */}
            <div>
              <label
                className="block text-sm font-medium text-white/80 mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Personligt brev
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-white/40" size={18} />
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-4 focus:ring-white/10 resize-none"
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
                className="w-4 h-4 rounded border-white/30 bg-white/10 text-white focus:ring-white/20"
              />
              <label
                className="text-sm text-white/85 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Jag godkänner att Workplan lagrar och behandlar mina uppgifter för att hantera min ansökan enligt{' '}
                <a
                  href="/privacy"
                  className="text-white underline decoration-white/50 hover:decoration-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  integritetspolicyn
                </a>
                . *
              </label>
            </div>

            {/* Skicka-knapp – centrerad, 3D/hover */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-medium
                           bg-[#0B274D] shadow-[0_10px_30px_rgba(11,39,77,0.45)] transition-all
                           hover:translate-y-[-1px] hover:shadow-[0_16px_34px_rgba(11,39,77,0.6)] active:translate-y-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity
                                 bg-gradient-to-r from-white/10 via-transparent to-white/10 pointer-events-none" />
                <Send size={20} className="relative" />
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

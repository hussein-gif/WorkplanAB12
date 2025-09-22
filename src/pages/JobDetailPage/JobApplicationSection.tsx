import React, { useState, useRef, useCallback, Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Supabase-klienten

// ⬇️ Lazy-loada ikoner (minskar initial bundle)
const SendIcon = React.lazy(() => import('lucide-react').then(m => ({ default: m.Send })));
const UploadIcon = React.lazy(() => import('lucide-react').then(m => ({ default: m.Upload })));
const UserIcon   = React.lazy(() => import('lucide-react').then(m => ({ default: m.User })));
const MailIcon   = React.lazy(() => import('lucide-react').then(m => ({ default: m.Mail })));
const PhoneIcon  = React.lazy(() => import('lucide-react').then(m => ({ default: m.Phone })));

// Liten, osynlig fallback så layouten inte hoppar
const IconFallback = () => <span aria-hidden className="inline-block align-middle" style={{ width: 0, height: 0 }} />;

export type JobApplicationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  gdprConsent: boolean;
};

interface JobApplicationSectionProps {
  jobTitle: string;
  companyName: string;
  /** Valfritt: visas som liten överrubrik "INDUSTRI • PLATS" precis som i arket */
  industry?: string;
  location?: string;

  /** Valfritt: kontrollerad state för att spegla med arket */
  formData?: JobApplicationFormData;
  setFormData?: React.Dispatch<React.SetStateAction<JobApplicationFormData>>;
  cvFile?: File | null;
  setCvFile?: (f: File | null) => void;
  otherFile?: File | null;
  setOtherFile?: (f: File | null) => void;
}

const JobApplicationSection: React.FC<JobApplicationSectionProps> = ({
  jobTitle,
  companyName,
  industry,
  location,
  // kontrollerad state (valfritt)
  formData: extFormData,
  setFormData: extSetFormData,
  cvFile: extCv,
  setCvFile: extSetCv,
  otherFile: extOther,
  setOtherFile: extSetOther,
}) => {
  // Fallback-intern state om kontrollerad state ej skickas in
  const [intFormData, setIntFormData] = useState<JobApplicationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    gdprConsent: false,
  });
  const [intCvFile, setIntCvFile] = useState<File | null>(null);
  const [intOtherFile, setIntOtherFile] = useState<File | null>(null);

  const formData = extFormData ?? intFormData;
  const setFormData = extSetFormData ?? setIntFormData;
  const cvFile = extCv ?? intCvFile;
  const setCvFile = extSetCv ?? setIntCvFile;
  const otherFile = extOther ?? intOtherFile;
  const setOtherFile = extSetOther ?? setIntOtherFile;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const otherFileInputRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false); // lås knappen vid submit
  const [showSuccess, setShowSuccess] = useState(false); // visa tack-overlay

  // ⬇️ Konfigurerbar maxgräns – memoisera så värdet är stabilt
  const { MAX_MB, MAX_BYTES } = useMemo(() => {
    const mb = 25;
    return { MAX_MB: mb, MAX_BYTES: mb * 1024 * 1024 };
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    },
    [setFormData]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, kind: 'cv' | 'other') => {
      const file = e.target.files?.[0] || null;
      if (kind === 'cv') setCvFile(file);
      else setOtherFile(file);
    },
    [setCvFile, setOtherFile]
  );

  // Spara ansökan + ladda upp filer till Storage + spara filvägar i tabellen
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return; // skydda mot dubbelklick

    if (!formData.gdprConsent) {
      alert('Du måste godkänna integritetspolicyn för att skicka ansökan.');
      return;
    }

    try {
      setSubmitting(true);

      // 1) Skapa raden först – få tillbaka id
      const basePayload: any = {
        job_title: jobTitle,
        company: companyName,
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        cover_letter: formData.coverLetter?.trim() || null,
        // industry/location utelämnas här om kolumner saknas i DB
      };

      const { data: created, error: insertErr } = await supabase
        .from('applications')
        .insert([basePayload])
        .select('id')
        .single();

      if (insertErr) throw insertErr;

      const appId = created.id as number;
      const nowStamp = Date.now();

      // 2) Ladda upp filer (parallellt om båda finns)
      let cv_path: string | null = null;
      let cv_name: string | null = null;
      let other_path: string | null = null;
      let other_name: string | null = null;

      const uploads: Promise<any>[] = [];

      if (cvFile) {
        if (cvFile.size > MAX_BYTES) throw new Error(`CV är större än ${MAX_MB}MB.`);
        cv_name = cvFile.name;
        cv_path = `cv/${appId}/${nowStamp}_${cvFile.name}`;
        uploads.push(
          supabase.storage.from('applications').upload(cv_path, cvFile, { upsert: false })
        );
      }

      if (otherFile) {
        if (otherFile.size > MAX_BYTES) throw new Error(`Bifogad fil är större än ${MAX_MB}MB.`);
        other_name = otherFile.name;
        other_path = `other/${appId}/${nowStamp}_${otherFile.name}`;
        uploads.push(
          supabase.storage.from('applications').upload(other_path, otherFile, { upsert: false })
        );
      }

      if (uploads.length) {
        const results = await Promise.all(uploads);
        const anyErr = results.find(r => r?.error);
        if (anyErr?.error) throw anyErr.error;

        // 3) Uppdatera raden med filvägar/namn (om något laddats upp)
        const { error: updErr } = await supabase
          .from('applications')
          .update({ cv_path, cv_name, other_path, other_name })
          .eq('id', appId);
        if (updErr) throw updErr;
      }

      // 4) Töm formulär + tack-overlay
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        coverLetter: '',
        gdprConsent: false,
      });
      setCvFile(null);
      setOtherFile(null);
      setShowSuccess(true);
    } catch (err: any) {
      console.error('Submit error:', err);
      alert(`Kunde inte spara ansökan:\n${err?.message ?? 'Okänt fel'}`);
    } finally {
      setSubmitting(false);
    }
  }, [submitting, formData, jobTitle, companyName, cvFile, otherFile, MAX_BYTES, MAX_MB, setFormData, setCvFile, setOtherFile]);

  return (
    <section
      id="application-form"
      className="relative bg-[#08132B] text-white"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 1400px' }}
    >
      {/* Subtil bakgrund – samma som i arket */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          background: 'radial-gradient(1200px 600px at 50% -200px, rgba(255,255,255,0.25), transparent 60%)',
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

      <div className="relative px-5 sm:px-8">
        {/* Rubrikblock */}
        <div className="pt-10 sm:pt-12 pb-8">
          {industry && location && (
            <div
              className="text-center text-xs tracking-[0.22em] uppercase text-white/70 mb-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {industry} • {location}
            </div>
          )}
          <h2
            className="text-center text-4xl sm:text-5xl font-semibold tracking-tight mb-6"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
          >
            {jobTitle}
          </h2>
        </div>

        {/* Formulär */}
        <div className="relative pb-16">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto" noValidate>
            {/* Namn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Förnamn *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B274D]/50">
                    <Suspense fallback={<IconFallback />}>
                      <UserIcon size={18} />
                    </Suspense>
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-white text-[#08132B] pl-10 pr-4 py-3 rounded-xl border border-white/0 focus:border-white/30 focus:ring-4 focus:ring-white/10 transition"
                    placeholder="Ditt förnamn"
                    autoComplete="given-name"
                    inputMode="text"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Efternamn *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B274D]/50">
                    <Suspense fallback={<IconFallback />}>
                      <UserIcon size={18} />
                    </Suspense>
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-white text-[#08132B] pl-10 pr-4 py-3 rounded-xl border border-white/0 focus:border-white/30 focus:ring-4 focus:ring-white/10 transition"
                    placeholder="Ditt efternamn"
                    autoComplete="family-name"
                    inputMode="text"
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
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B274D]/50">
                    <Suspense fallback={<IconFallback />}>
                      <MailIcon size={18} />
                    </Suspense>
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white text-[#08132B] pl-10 pr-4 py-3 rounded-xl border border-white/0 focus:border-white/30 focus:ring-4 focus:ring-white/10 transition"
                    placeholder="din@email.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Telefon *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B274D]/50">
                    <Suspense fallback={<IconFallback />}>
                      <PhoneIcon size={18} />
                    </Suspense>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white text-[#08132B] pl-10 pr-4 py-3 rounded-xl border border-white/0 focus:border-white/30 focus:ring-4 focus:ring-white/10 transition"
                    placeholder="+46 XX XXX XX XX"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
              </div>
            </div>

            {/* Ladda upp CV – VIT */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Ladda upp CV *
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 hover:border-gray-400 transition cursor-pointer group"
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
                  <div className="mx-auto h-8 w-8 text-gray-500 group-hover:text-gray-700 transition">
                    <Suspense fallback={<IconFallback />}>
                      <UploadIcon className="h-8 w-8" />
                    </Suspense>
                  </div>
                  <p className="mt-2 text-sm text-[#08132B]">
                    {cvFile ? cvFile.name : 'Klicka för att ladda upp ditt CV'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">PDF, DOC eller DOCX (max {MAX_MB}MB)</p>
                </div>
              </div>
            </div>

            {/* Övriga dokument – VIT (valfritt) */}
            <div>
              <label className="block textsm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Övriga dokument
              </label>
              <div
                onClick={() => otherFileInputRef.current?.click()}
                className="relative rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 hover:border-gray-400 transition cursor-pointer group"
              >
                <input
                  ref={otherFileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={(e) => handleFileChange(e, 'other')}
                  className="hidden"
                />
                <div className="text-center">
                  <div className="mx-auto h-8 w-8 text-gray-500 group-hover:text-gray-700 transition">
                    <Suspense fallback={<IconFallback />}>
                      <UploadIcon className="h-8 w-8" />
                    </Suspense>
                  </div>
                  <p className="mt-2 text-sm text-[#08132B]">
                    {otherFile ? otherFile.name : 'Klicka för att bifoga fler filer (valfritt)'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">PDF, DOC, DOCX, PNG, JPG (max {MAX_MB}MB)</p>
                </div>
              </div>
            </div>

            {/* Personligt brev */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Personligt brev
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-white text-[#08132B] pl-4 pr-4 py-3 rounded-xl border border-white/0 focus:border-white/30 focus:ring-4 focus:ring-white/10 transition resize-none"
                placeholder="Berätta kort om dig själv och varför du är intresserad av denna tjänst..."
              />
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
                <Link
                  to="/privacy"
                  className="underline underline-offset-2 decoration-white/50 hover:decoration-white"
                >
                  integritetspolicyn
                </Link>
                . *
              </label>
            </div>

            {/* Skicka ansökan – centrerad */}
            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className="
                  relative inline-flex items-center gap-2 px-8 py-3
                  rounded-2xl bg-white text-[#08132B] font-semibold
                  shadow-[0_10px_30px_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.25)]
                  transition-transform duration-300
                  hover:-translate-y-0.5 active:translate-y-0
                  focus:outline-none disabled:opacity-60
                "
                style={{ fontFamily: 'Inter, sans-serif' }}
                aria-busy={submitting}
              >
                <Suspense fallback={<IconFallback />}>
                  <SendIcon size={18} />
                </Suspense>
                <span className="relative">{submitting ? 'Skickar…' : 'Skicka ansökan'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Tack-overlay med cirkel + vit bock */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
          <div className="relative w-[90%] max-w-md rounded-2xl bg-white px-8 py-10 text-center shadow-2xl">
            {/* Cirkeln med vit bock */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#16A34A]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <h3
              className="mb-2 text-2xl font-semibold text-[#08132B]"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}
            >
              Tack för din ansökan!
            </h3>
            <p className="mb-6 text-sm text-[#08132B]/80" style={{ fontFamily: 'Inter, sans-serif' }}>
              Vi återkommer så snart vi kan.
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="inline-flex items-center justify-center rounded-2xl bg-[#08132B] px-6 py-3 font-semibold text-white shadow-md hover:opacity-90 transition"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Stäng
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default JobApplicationSection;

// src/pages/JobsPage/JobsList.tsx
import React from "react";
import { Search, MapPin, Building, Clock, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Job } from "./index";

interface JobsListProps {
  jobs: Job[]; // <-- kommer från Supabase via JobsPage
}

const SimpleHoverCard: React.FC<{ children: React.ReactNode; className?: string }> = React.memo(
  ({ children, className }) => (
    <div
      className={`relative z-0 rounded-2xl transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:z-10 ${
        className ?? ""
      } group`}
      style={{ position: "relative", willChange: "transform" }}
    >
      {children}
    </div>
  )
);

// slug-hjälpare om job.slug saknas
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getLogoChar = (job: Job) =>
  (job as any).companyLogo ?? (job.company ? job.company.charAt(0) : "");

const getOmfattning = (job: Job) =>
  (job as any).omfattning ?? (job as any).employment_type ?? "";

/** Samma URL-kontroll som på JobDetailPage */
const isUrl = (v?: string | null) => !!v && /^https?:\/\//i.test(v || "");

/** Hämta bild-URL så som den används på JobDetailPage (company_logo som primär källa). */
const getJobImageUrl = (job: Job): string | undefined => {
  const j: any = job;

  // Viktigt: detta är fältet du redan använder på detaljsidan
  if (isUrl(j.company_logo)) return j.company_logo as string;

  // Vanliga alternativ (om mappningen skiljer sig i listan)
  if (isUrl(j.companyLogo)) return j.companyLogo as string;
  if (isUrl(j.logo_url)) return j.logo_url as string;
  if (isUrl(j.logoUrl)) return j.logoUrl as string;
  if (isUrl(j.image_url)) return j.image_url as string;
  if (isUrl(j.imageUrl)) return j.imageUrl as string;
  if (isUrl(j.image)) return j.image as string;

  // Om companyLogo råkar vara en URL eller filväg i andra format
  const maybeUrl: string | undefined =
    typeof j.companyLogo === "string" ? j.companyLogo : undefined;
  if (isUrl(maybeUrl)) return maybeUrl;

  return undefined;
};

/** Säkert formaterad "publicerad för X sedan" i svensk stil – utan negativa värden. */
const getPostedLabel = (job: Job): string => {
  const j: any = job;

  // Prova datumfält först (Supabase & vanliga namn)
  const candidates = [
    j.posted_at,
    j.published_at,
    j.created_at,
    j.createdAt,
    j.inserted_at,
    j.updated_at, // som sista utväg
    j.posted, // om det råkar vara ISO-datum
  ].filter(Boolean);

  let postedDate: Date | null = null;
  for (const c of candidates) {
    const d = new Date(c);
    if (!isNaN(d.getTime())) {
      postedDate = d;
      break;
    }
  }

  if (postedDate) {
    const now = new Date();
    let diffMs = now.getTime() - postedDate.getTime();
    if (diffMs < 0) diffMs = 0; // skydda mot klock-skev

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diffMs < 30 * 1000) return "nyss";
    if (diffMs < minute) return "mindre än 1 minut sedan";
    if (diffMs < hour) {
      const mins = Math.floor(diffMs / minute);
      return `${mins} minut${mins === 1 ? "" : "er"} sedan`;
    }
    if (diffMs < day) {
      const hrs = Math.floor(diffMs / hour);
      return `${hrs} timme${hrs === 1 ? "" : "r"} sedan`;
    }
    const days = Math.floor(diffMs / day);
    if (days <= 30) return `${days} dag${days === 1 ? "" : "ar"} sedan`;

    // Äldre: visa datum
    try {
      return postedDate.toLocaleDateString("sv-SE");
    } catch {
      return "";
    }
  }

  // Fallback: om "posted" redan är en färdig text men råkar vara negativ, ta bort minustecken
  if (typeof j.posted === "string" && j.posted.trim()) {
    return j.posted.replace(/^[\s]*[-\u2212]\s*/, "");
  }

  return "";
};

const JobsList: React.FC<JobsListProps> = React.memo(({ jobs }) => {
  const navigate = useNavigate();

  // Använd en stabil identifierare för navigering
  const goToJob = (job: Job) => {
    const idOrSlug =
      (job as any).slug ?? (job.id != null ? String(job.id) : slugify(job.title));
    navigate(`/jobb/${encodeURIComponent(idOrSlug)}`);
  };

  // Visa exakt de jobb som kommer via props
  const jobsToShow: Job[] = Array.isArray(jobs) ? jobs : [];

  if (jobsToShow.length === 0) {
    return (
      <div className="px-4 sm:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-white/40" />
            </div>
            <h3 className="text-xl text-white/80 mb-2">
              Inga lediga jobb tillgängliga just nu.
            </h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="px-4 sm:px-8 pb-20"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 600px" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* MOBIL */}
        <div className="sm:hidden">
          <ul className="divide-y divide-white/10">
            {jobsToShow.map((job) => {
              const img = getJobImageUrl(job);
              return (
                <li
                  key={(job as any).slug ?? job.id ?? job.title}
                  className="py-4 active:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => goToJob(job)}
                >
                  <div className="flex items-start gap-3">
                    {img ? (
                      <img
                        src={img}
                        alt={job.title}
                        loading="lazy"
                        className="w-9 h-9 rounded-lg object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center font-semibold shrink-0">
                        {getLogoChar(job)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3
                        className="text-white text-base font-semibold leading-tight truncate"
                        style={{ fontFamily: "Zen Kaku Gothic Antique, sans-serif" }}
                      >
                        {job.title}
                      </h3>
                    </div>
                  </div>

                  <div
                    className="mt-2 flex flex-wrap items-center gap-3 text-[13px] text-white/75"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase size={14} /> {job.company}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} /> {getOmfattning(job)}
                    </span>
                  </div>

                  <div
                    className="mt-1 text-[12px] text-white/60"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {getPostedLabel(job)}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* DESKTOP */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-center">
            {jobsToShow.map((job) => {
              const img = getJobImageUrl(job);
              return (
                <SimpleHoverCard
                  key={(job as any).slug ?? job.id ?? job.title}
                  className="w-full max-w-sm bg-white/95 backdrop-blur-sm border border-white/20 flex flex-col cursor-pointer"
                >
                  <div className="p-5 flex-1 flex flex-col" onClick={() => goToJob(job)}>
                    <div className="flex items-start space-x-4 mb-4">
                      {img ? (
                        <img
                          src={img}
                          alt={job.title}
                          loading="lazy"
                          className="w-14 h-14 rounded-xl object-cover shadow-lg flex-shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                          {getLogoChar(job)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-lg text-gray-900 mb-2 leading-tight font-medium"
                          style={{ fontFamily: "Zen Kaku Gothic Antique, sans-serif" }}
                        >
                          {job.title}
                        </h3>
                        <div
                          className="text-base text-gray-700"
                          style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                        >
                          {job.company}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin size={14} className="text-gray-400" />
                        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                          {job.location}
                        </span>
                      </div>
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      <div className="flex items-center space-x-2">
                        <Clock size={14} className="text-gray-400" />
                        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                          {getOmfattning(job)}
                        </span>
                      </div>
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      <div className="flex items-center space-x-2">
                        <Building size={14} className="text-gray-400" />
                        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                          {(job as any).industry ?? ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="p-5 pt-0 flex items-end justify-between"
                    onClick={() => goToJob(job)}
                  >
                    <div
                      className="text-sm text-gray-500"
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                    >
                      {getPostedLabel(job)}
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                        Ansök senast
                      </div>
                      <div
                        className="text-gray-700"
                        style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                      >
                        {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("sv-SE")}
                      </div>
                    </div>
                  </div>
                </SimpleHoverCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default JobsList;

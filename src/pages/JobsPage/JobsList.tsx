import React from "react";
import { Search, MapPin, Building, Clock, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Job } from "./index";

interface JobsListProps {
  jobs: Job[];
}

const SimpleHoverCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div
    className={`
      relative z-0 rounded-2xl transition-all duration-300 ease-out
      hover:scale-105 hover:-translate-y-2 hover:shadow-2xl
      hover:z-10
      ${className ?? ""}
      group
    `}
    style={{ position: "relative" }}
  >
    {children}
  </div>
);

// slug-hjälpare om du inte har job.slug i datan
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  const navigate = useNavigate();

  // ✅ Använd alltid svensk route och en stabil identifierare (slug > id > slugifierad titel)
  const goToJob = (job: Job) => {
    const idOrSlug =
      (job as any).slug ??
      (job.id != null ? String(job.id) : slugify(job.title));
    navigate(`/jobb/${encodeURIComponent(idOrSlug)}`);
  };

  // ✅ VISA JOBBEN (filtrera ev. bort opublicerade om fältet finns)
  const jobsToShow: Job[] = jobs.filter((j: any) => j?.published !== false);

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
    <div className="px-4 sm:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* ===== MOBIL: radad lista ===== */}
        <div className="sm:hidden">
          <ul className="divide-y divide-white/10">
            {jobsToShow.map((job) => (
              <li
                key={job.id ?? job.title}
                className="py-4 active:bg-white/5 transition-colors cursor-pointer"
                onClick={() => goToJob(job)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center font-semibold shrink-0">
                    {job.companyLogo}
                  </div>
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
                    <Clock size={14} /> {job.omfattning}
                  </span>
                </div>

                <div
                  className="mt-1 text-[12px] text-white/60"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {job.posted}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== DESKTOP ===== */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-center">
            {jobsToShow.map((job) => (
              <SimpleHoverCard
                key={job.id ?? job.title}
                className="w-full max-w-sm bg-white/95 backdrop-blur-sm border border-white/20 flex flex-col cursor-pointer"
              >
                <div className="p-5 flex-1 flex flex-col" onClick={() => goToJob(job)}>
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                      {job.companyLogo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg text-gray-900 mb-2 leading-tight font-medium" style={{ fontFamily: "Zen Kaku Gothic Antique, sans-serif" }}>
                        {job.title}
                      </h3>
                      <div className="text-base text-gray-700" style={{ fontFamily: "Inter, sans-serif", fontWeight: "400" }}>
                        {job.company}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} className="text-gray-400" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: "400" }}>
                        {job.location}
                      </span>
                    </div>
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-gray-400" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: "400" }}>
                        {job.omfattning}
                      </span>
                    </div>
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    <div className="flex items-center space-x-2">
                      <Building size={14} className="text-gray-400" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: "400" }}>
                        {job.industry}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-end justify-between" onClick={() => goToJob(job)}>
                  <div className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif", fontWeight: "400" }}>
                    {job.posted}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: "400" }}>Ansök senast</div>
                    <div className="text-gray-700" style={{ fontFamily: "Inter, sans-serif", fontWeight: "400" }}>
                      {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("sv-SE")}
                    </div>
                  </div>
                </div>
              </SimpleHoverCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsList;

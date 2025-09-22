import React from "react";

interface ServicesSectionProps {
  isVisible: boolean;
  onServiceSelect?: (serviceType: string) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  isVisible,
  onServiceSelect,
}) => {
  const services = [
    {
      id: "tillsvidare",
      title: "Tillsvidareanställning",
      body: "Rätt kompetens från start – vi säkerställer att kandidaten matchar kravprofil och roll.",
      highlight: "Långsiktig lösning",
    },
    {
      id: "vikariat_tim",
      title: "Timanställda & Vikarier",
      body: "Snabb tillsättning vid sjukfrånvaro, arbetstoppar eller korta projekt.",
      highlight: "Skalbar bemanning",
    },
    {
      id: "säsongvikariat",
      title: "Säsongsvikariat",
      body: "Trygg bemanning under intensiva perioder – planerad och kostnadseffektiv.",
      highlight: "Förutsägbar täckning",
    },
    {
      id: "provanställning",
      title: "Provanställning",
      body: "Testa kompetensen i skarpt läge innan ni tar anställningsbeslut.",
      highlight: "Riskminimering",
    },
  ];

  const handleServiceClick = (serviceId: string) => {
    if (onServiceSelect) onServiceSelect(serviceId);
    const contactForm = document.getElementById("kontakt-form");
    if (contactForm) contactForm.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="py-24 px-8 relative overflow-hidden"
      style={{
        backgroundColor: "#08132B",
        contentVisibility: "auto",
        containIntrinsicSize: "1px 900px",
      }}
    >
      {/* Subtle hex-pattern + colored blobs */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="hexPattern"
            width="80"
            height="70"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(30)"
          >
            <path
              d="M40 0 L80 20 L80 50 L40 70 L0 50 L0 20 Z"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
          <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="100" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" />
        <circle
          cx="25%"
          cy="25%"
          r="200"
          fill="rgba(29,78,216,0.3)"
          filter="url(#blur)"
        />
        <circle
          cx="75%"
          cy="75%"
          r="180"
          fill="rgba(16,185,129,0.25)"
          filter="url(#blur)"
        />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl font-medium text-white mb-6"
            style={{
              fontFamily: "Zen Kaku Gothic Antique, sans-serif",
              lineHeight: 1.2,
            }}
          >
            Våra Bemanningstjänster
          </h2>
        </div>

        {/* ====================== MOBIL ====================== */}
        <div className="sm:hidden">
          <ul className="space-y-4">
            {services.map((service) => (
              <li
                key={service.id}
                className="rounded-xl p-4 bg-white/5 border border-white/10 active:bg-white/7 transition-colors will-change-transform"
                onClick={() => handleServiceClick(service.id)}
                role="button"
                tabIndex={0}
                aria-label={service.title}
              >
                <h3
                  className="text-[22px] font-semibold text-white mb-2"
                  style={{ fontFamily: "Zen Kaku Gothic Antique, sans-serif" }}
                >
                  {service.title}
                </h3>

                <p
                  className="text-[15px] leading-6 text-white/80 mb-3"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {service.body}
                </p>

                {/* Action-rad */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-[12px] uppercase tracking-wide px-2.5 py-1 rounded-full bg-white/8 text-white/90"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                  >
                    {service.highlight}
                  </span>

                  <span
                    className="w-7 h-7 grid place-items-center rounded-full bg-white/8"
                    aria-hidden
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 2 L9 6 L3 10"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* Contact Prompt */}
          <div className="text-center mt-8">
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 300,
                fontSize: "1rem",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Osäker på vilket upplägg som passar?{" "}
              <a
                href="#kontakt-form"
                className="font-medium text-[#3DA9FC] hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("kontakt-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Kontakta oss
              </a>{" "}
              så guidar vi dig.
            </p>
          </div>
        </div>

        {/* ====================== DESKTOP/TABLET ====================== */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-xl shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-white/10 hover:shadow-xl cursor-pointer will-change-transform"
                onClick={() => handleServiceClick(service.id)}
                role="button"
                tabIndex={0}
              >
                <h3
                  style={{
                    fontFamily: "Zen Kaku Gothic Antique, sans-serif",
                    fontWeight: 500,
                    fontSize: "1.5rem",
                    color: "#FFFFFF",
                    marginBottom: "1rem",
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 300,
                    fontSize: "1rem",
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.6,
                    marginBottom: "3rem",
                  }}
                >
                  {service.body}
                </p>

                <div
                  className="absolute bottom-4 left-6 px-3 py-1 text-[12px] uppercase font-medium rounded-full bg-blue-500/20 text-white shadow-md"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {service.highlight}
                </div>

                <div className="absolute bottom-4 right-6 w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/20 shadow-md">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 2 L9 6 L3 10"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Prompt */}
          <div className="text-center">
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 300,
                fontSize: "1rem",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Osäker på vilket upplägg som passar?{" "}
              <a
                href="#kontakt-form"
                className="font-medium text-[#3DA9FC] hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("kontakt-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Kontakta oss
              </a>{" "}
              så guidar vi dig.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

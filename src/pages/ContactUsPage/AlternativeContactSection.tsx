import React from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AlternativeContactSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      className="px-8 py-16 bg-gray-50"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "600px",
      }}
    >
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Zen+Kaku+Gothic+Antique:wght@400;500&display=swap');

        .btn-hero-bg {
          background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.08)),
            linear-gradient(135deg, #123B7A 0%, #1E4F9A 100%);
          box-shadow: 0 10px 24px rgba(18,59,122,0.3);
          border: 1px solid rgba(255,255,255,0.18);
          transition: all .2s ease;
        }
        .btn-hero:hover > .btn-hero-bg {
          background: linear-gradient(180deg, rgba(255,255,255,0.07), rgba(0,0,0,0.1)),
            linear-gradient(135deg, #15468C 0%, #225BB0 100%);
          box-shadow: 0 14px 32px rgba(18,59,122,0.35);
        }
        .btn-hero:active > .btn-hero-bg {
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.24),
            0 8px 22px rgba(18,59,122,0.28);
        }
      `}</style>

      <div className="max-w-3xl mx-auto">
        {/* Rubrik */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl text-gray-900 mb-3"
            style={{
              fontFamily: '"Zen Kaku Gothic Antique", sans-serif',
              fontWeight: 500,
            }}
          >
            Kontakta Oss Direkt
          </h2>
          <p
            className="text-gray-600"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
          >
            Maila oss – vi återkommer så snart vi kan.
          </p>
        </div>

        {/* Endast e-postruta – centrerad */}
        <div className="max-w-md mx-auto mb-8">
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#123B7A0D]">
                <Mail size={22} className="text-[#123B7A]" />
              </div>
              <h3
                className="text-lg text-gray-900"
                style={{
                  fontFamily: '"Zen Kaku Gothic Antique", sans-serif',
                  fontWeight: 500,
                }}
              >
                E-post
              </h3>
            </div>

            <ul
              className="list-disc pl-5 text-gray-800 space-y-1 mb-4"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
            >
              <li>Vi svarar inom 24 timmar.</li>
            </ul>

            <a
              href="mailto:info@work-plan.se"
              className="btn-hero relative inline-flex items-center justify-center w-full px-4 py-3 rounded-2xl text-white font-medium focus:outline-none focus:ring-4 focus:ring-[#123B7A]/20 transition-all"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
            >
              <span className="btn-hero-bg absolute inset-0 rounded-2xl" />
              <span className="relative z-10">info@work-plan.se</span>
            </a>
          </div>
        </div>

        <div className="text-center">
          <p
            className="text-gray-500 text-sm"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
          >
            Vi hanterar dina uppgifter konfidentiellt och i enlighet med{" "}
            <button
              onClick={() => navigate("/PrivacyPolicyPage")}
              className="text-[#123B7A] font-medium hover:underline focus:outline-none"
            >
              Integritetspolicy
            </button>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default AlternativeContactSection;

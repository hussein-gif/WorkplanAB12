import React from "react";
import { Mail, Phone } from "lucide-react";

const AlternativeContactSection: React.FC = () => {
  return (
    <section className="px-8 py-16 bg-gray-50">
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Zen+Kaku+Gothic+Antique:wght@400;500&display=swap');

        /* Mörkblå hero-knapp (alltid samma färg) */
        .btn-hero-bg {
          background: #0B274D;
          box-shadow: 0 10px 24px rgba(11,39,77,0.32);
          border: 1px solid rgba(255,255,255,0.18);
          transition: all .2s ease;
        }
        .btn-hero:active > .btn-hero-bg { 
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.24), 0 8px 22px rgba(11,39,77,0.26); 
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Rubrik */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl text-gray-900 mb-3"
            style={{ fontFamily: '"Zen Kaku Gothic Antique", sans-serif', fontWeight: 500 }}
          >
            Kontakta oss direkt
          </h2>
          <p
            className="text-gray-600"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            Maila eller ring – vi återkommer så snart vi kan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-2xl mx-auto">
          {/* E-post */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#08132B0D]">
                <Mail size={22} className="text-[#0B274D]" />
              </div>
              <h3
                className="text-lg text-gray-900"
                style={{ fontFamily: '"Zen Kaku Gothic Antique", sans-serif', fontWeight: 500 }}
              >
                E-post
              </h3>
            </div>

            <ul
              className="list-disc pl-5 text-gray-800 space-y-1 mb-4"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              <li>Vi svarar inom 24 timmar.</li>
            </ul>

            <a
              href="mailto:info@work-plan.se"
              className="btn-hero relative inline-flex items-center justify-center w-full px-4 py-3 rounded-xl text-white font-medium focus:outline-none focus:ring-4 focus:ring-[#08132B]/20 transition-all"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              <span className="btn-hero-bg absolute inset-0 rounded-xl" />
              <span className="relative z-10">info@work-plan.se</span>
            </a>
          </div>

          {/* Telefon */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#08132B0D]">
                <Phone size={22} className="text-[#0B274D]" />
              </div>
              <h3
                className="text-lg text-gray-900"
                style={{ fontFamily: '"Zen Kaku Gothic Antique", sans-serif', fontWeight: 500 }}
              >
                Telefon
              </h3>
            </div>

            <ul
              className="list-disc pl-5 text-gray-800 space-y-1 mb-4"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              <li>Vardagar 09.00–16.00.</li>
            </ul>

            <a
              href="tel:+46812345678"
              className="btn-hero relative inline-flex items-center justify-center w-full px-4 py-3 rounded-xl text-white font-medium focus:outline-none focus:ring-4 focus:ring-[#08132B]/20 transition-all"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              <span className="btn-hero-bg absolute inset-0 rounded-xl" />
              <span className="relative z-10">+46 8 123 456 78</span>
            </a>
          </div>
        </div>

        <div className="text-center">
          <p
            className="text-gray-500 text-sm"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            Vi hanterar dina uppgifter konfidentiellt och i enlighet med GDPR.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AlternativeContactSection;

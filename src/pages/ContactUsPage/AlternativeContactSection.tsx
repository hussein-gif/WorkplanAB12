import React from "react";
import { Mail, Phone } from "lucide-react";

const AlternativeContactSection: React.FC = () => {
  return (
    <section className="px-8 py-16 bg-gray-50">
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Zen+Kaku+Gothic+Antique:wght@400;500&display=swap');
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Rubrik: Zen Kaku, medium */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl text-gray-900 mb-3"
            style={{ fontFamily: '"Zen Kaku Gothic Antique", sans-serif', fontWeight: 500 }}
          >
            Kontakta oss direkt
          </h2>

          {/* Underrubrik: Inter, behåll nuvarande vikt (normal) */}
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
            {/* Header: ikon + rubrik bredvid varandra */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#08132B0D]">
                <Mail size={22} className="text-[#08132B]" />
              </div>
              <h3
                className="text-lg text-gray-900"
                style={{ fontFamily: '"Zen Kaku Gothic Antique", sans-serif', fontWeight: 500 }}
              >
                E-post
              </h3>
            </div>

            {/* Bullet-lista: Inter, normal vikt */}
            <ul
              className="list-disc pl-5 text-gray-800 space-y-1 mb-4"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              <li>Vi svarar inom 24 timmar.</li>
            </ul>

            {/* Knapp: Inter, medium | #08132B med gradient + hover */}
            <a
              href="mailto:info@work-plan.se"
              className="
                inline-flex items-center justify-center w-full px-4 py-3 rounded-full
                text-white font-medium transition-all
                hover:brightness-110 hover:shadow-lg active:translate-y-px
                focus:outline-none focus:ring-4 focus:ring-[#08132B]/20
              "
              style={{
                fontFamily: 'Inter, sans-serif',
                background:
                  'linear-gradient(135deg, #08132B 0%, #0E274F 100%)',
              }}
              aria-label="Skicka e-post till info@work-plan.se"
            >
              info@work-plan.se
            </a>
          </div>

          {/* Telefon */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#08132B0D]">
                <Phone size={22} className="text-[#08132B]" />
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
              className="
                inline-flex items-center justify-center w-full px-4 py-3 rounded-full
                text-white font-medium transition-all
                hover:brightness-110 hover:shadow-lg active:translate-y-px
                focus:outline-none focus:ring-4 focus:ring-[#08132B]/20
              "
              style={{
                fontFamily: 'Inter, sans-serif',
                background:
                  'linear-gradient(135deg, #08132B 0%, #0E274F 100%)',
              }}
              aria-label="Ring +46 8 123 456 78"
            >
              +46 8 123 456 78
            </a>
          </div>
        </div>

        {/* GDPR-text: Inter, behåll storlek/vikt */}
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

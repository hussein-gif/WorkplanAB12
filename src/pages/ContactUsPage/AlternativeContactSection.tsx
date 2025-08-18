import React from "react";
import { Mail, Phone } from "lucide-react";

const AlternativeContactSection: React.FC = () => {
  return (
    <section className="px-8 py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-gray-900 mb-3">
            Kontakta oss direkt
          </h2>
          <p className="text-gray-600">
            Maila eller ring – vi återkommer så snart vi kan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-2xl mx-auto">
          {/* E-post */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            {/* Header: ikon + rubrik bredvid varandra */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <Mail size={22} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">E-post</h3>
            </div>

            {/* Bullet-lista */}
            <ul className="list-disc pl-5 text-gray-800 space-y-1 mb-4">
              <li>Vi svarar inom 24 timmar.</li>
            </ul>

            {/* Knapp */}
            <a
              href="mailto:info@work-plan.se"
              className="inline-flex items-center justify-center w-full px-4 py-3 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
              aria-label="Skicka e-post till info@work-plan.se"
            >
              info@work-plan.se
            </a>
          </div>

          {/* Telefon */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            {/* Header: ikon + rubrik bredvid varandra */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                <Phone size={22} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Telefon</h3>
            </div>

            {/* Bullet-lista */}
            <ul className="list-disc pl-5 text-gray-800 space-y-1 mb-4">
              <li>Vardagar 09.00–16.00.</li>
            </ul>

            {/* Knapp */}
            <a
              href="tel:+46812345678"
              className="inline-flex items-center justify-center w-full px-4 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors focus:outline-none focus:ring-4 focus:ring-purple-500/20"
              aria-label="Ring +46 8 123 456 78"
            >
              +46 8 123 456 78
            </a>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Vi hanterar dina uppgifter konfidentiellt och i enlighet med GDPR.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AlternativeContactSection;

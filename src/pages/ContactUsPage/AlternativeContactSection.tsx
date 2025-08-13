import React from 'react';
import { Mail, Phone } from 'lucide-react';

const AlternativeContactSection: React.FC = () => {
  return (
    <section className="px-8 py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Kontakta oss direkt
          </h2>
          <p className="text-gray-600">
            Maila eller ring – vi återkommer så snart vi kan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-2xl mx-auto">
          <div className="text-center p-5 bg-white rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail size={24} className="text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">E-post</h3>
            <p className="text-gray-600">
              <a 
                href="mailto:info@work-plan.se"
                className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
              >
                info@work-plan.se
              </a>
            </p>
          </div>

          <div className="text-center p-5 bg-white rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Phone size={24} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefon</h3>
            <p className="text-gray-600">
              <a 
                href="tel:+46812345678"
                className="text-purple-600 hover:text-purple-700 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded block"
              >
                +46 8 123 456 78
              </a>
              <span className="text-sm">Vardagar 09.00–16.00</span>
            </p>
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
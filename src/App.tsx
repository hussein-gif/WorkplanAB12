import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import AudienceTiles from './components/AudienceTiles';
import IndustryGrid from './components/IndustryGrid';
import FeaturedJobs from './components/FeaturedJobs';
import ConversionBanner from './components/ConversionBanner';
import Footer from './components/Footer';

import ScrollToTop from './components/ScrollToTop';
import { routes } from './routes'; // ⬅️ Svenska routes
import SEO from './components/SEO'; // ⬅️ SEO-komponenten

function HomePage() {
  return (
    <>
      <SEO
        title="Workplan AB – Bemanning inom Lager & Logistik"
        description="Workplan AB är din pålitliga partner för bemanning och rekrytering inom lager- och logistikbranschen. Vi levererar rätt människor i varje steg av ert flöde."
        canonical="https://www.work-plan.se/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Workplan AB",
          "url": "https://www.work-plan.se",
          "logo": "https://www.work-plan.se/logo.png",
          "description": "Workplan AB är din pålitliga partner för bemanning och rekrytering inom lager- och logistikbranschen i Sverige.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Exempelgatan 10",
            "addressLocality": "Örebro",
            "postalCode": "702 10",
            "addressCountry": "SE"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+46-70-064 64 16",
            "contactType": "customer service",
            "availableLanguage": ["Swedish", "English"]
          },
          "sameAs": [
            "https://www.linkedin.com/company/workplan-ab/",
            "https://www.instagram.com/workplan_ab/"
          ]
        }}
      />

      <Hero />
      <WhyChoose />
      <AudienceTiles />
      <IndustryGrid />
      <FeaturedJobs />
      <ConversionBanner />
    </>
  );
}

/** Redirect helper that preserves :jobId param from legacy /job/:jobId to /jobb/:jobId */
function LegacyJobRedirect() {
  const { jobId } = useParams();
  return <Navigate to={`/jobb/${encodeURIComponent(jobId ?? '')}`} replace />;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            {/* Startsida */}
            <Route path="/" element={<HomePage />} />

            {/* Svenska routes från routes.tsx */}
            {routes.map((r) => (
              <Route key={r.path} path={r.path} element={r.element} />
            ))}

            {/* Redirects från gamla engelska paths */}
            <Route path="/jobs" element={<Navigate to="/jobb" replace />} />
            {/* IMPORTANT: keep param when redirecting */}
            <Route path="/job/:jobId" element={<LegacyJobRedirect />} />
            <Route path="/partner" element={<Navigate to="/foretag" replace />} />
            <Route path="/for-candidates" element={<Navigate to="/for-kandidater" replace />} />
            <Route path="/about" element={<Navigate to="/om-oss" replace />} />
            <Route path="/contact" element={<Navigate to="/kontakt" replace />} />
            <Route path="/services" element={<Navigate to="/tjanster" replace />} />
            <Route path="/terms" element={<Navigate to="/villkor" replace />} />
            <Route path="/privacy" element={<Navigate to="/integritetspolicy" replace />} />
            <Route path="/cookies" element={<Navigate to="/cookiepolicy" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';

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

// ⬇️ NYTT: Admin-importer
import AdminRoute from './admin/AdminRoute';
import AdminLogin from './admin/AdminLogin';
import AdminPanel from './admin/AdminPanel';

// ⬇️ TILLAGT: explicita jobb-sidor (säkerställer att /jobb/:jobId fungerar)
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';

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
          "logo": "https://i.ibb.co/HfmhhtVt/Workplan-White-LG.png",
          "description": "Workplan AB är din pålitliga partner för bemanning och rekrytering inom lager- och logistikbranschen i Sverige.",
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

// ⬇️ NYTT: Inre komponent som kan använda useLocation för att dölja header/footer på admin-sidor
function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        {!isAdminRoute && <Header />}
        <main>
          <Routes>
            {/* Startsida */}
            <Route path="/" element={<HomePage />} />

            {/* ⬇️ TILLAGT: explicita jobb-routes (tas innan map:routes för att säkert matcha) */}
            <Route path="/jobb" element={<JobsPage />} />
            <Route path="/jobb/:jobId" element={<JobDetailPage />} />

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

            {/* ⬇️ NYTT: Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

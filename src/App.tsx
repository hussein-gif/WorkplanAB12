import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import AudienceTiles from './components/AudienceTiles';
import IndustryGrid from './components/IndustryGrid';
import FeaturedJobs from './components/FeaturedJobs';
import ConversionBanner from './components/ConversionBanner';
import Footer from './components/Footer';

import ScrollToTop from './components/ScrollToTop';
import { routes } from './routes'; // ⬅️ Importera de svenska routes här

function HomePage() {
  return (
    <>
      <Hero />
      <WhyChoose />
      <AudienceTiles />
      <IndustryGrid />
      <FeaturedJobs />
      <ConversionBanner />
    </>
  );
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
            <Route path="/job/:jobId" element={<Navigate to="/jobb/:jobId" replace />} />
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

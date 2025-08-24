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

// Svenska sidkomponenter (börjar med stor bokstav)
import Jobb from './pages/Jobb';
import JobbDetalj from './pages/JobbDetalj';
import Foretag from './pages/Foretag';
import ForKandidater from './pages/ForKandidater';
import OmOss from './pages/OmOss';
import Kontakt from './pages/Kontakt';
import Tjanster from './pages/Tjanster';
import Villkor from './pages/Villkor';
import Integritetspolicy from './pages/Integritetspolicy';
import Cookiepolicy from './pages/Cookiepolicy';

// Scroll helper
import ScrollToTop from './components/ScrollToTop';

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
            {/* Svenska routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/jobb" element={<Jobb />} />
            <Route path="/jobb/:jobId" element={<JobbDetalj />} />
            <Route path="/foretag" element={<Foretag />} />
            <Route path="/for-kandidater" element={<ForKandidater />} />
            <Route path="/om-oss" element={<OmOss />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/tjanster" element={<Tjanster />} />
            <Route path="/villkor" element={<Villkor />} />
            <Route path="/integritetspolicy" element={<Integritetspolicy />} />
            <Route path="/cookiepolicy" element={<Cookiepolicy />} />

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

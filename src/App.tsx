import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import AudienceTiles from './components/AudienceTiles';
import WarehouseLogisticsSpecialists from './components/IndustryGrid';
import FeaturedJobs from './components/FeaturedJobs';
import ConversionBanner from './components/ConversionBanner';
import Footer from './components/Footer';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import PartnerWithUsPage from './pages/PartnerWithUsPage';
import ForCandidatesPage from './pages/ForCandidatesPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import OurServicesPage from './pages/OurServicesPage';

function HomePage() {
  return (
    <>
      <Hero />
      <WhyChoose />
      <AudienceTiles />
      <WarehouseLogisticsSpecialists />
      <FeaturedJobs />
      <ConversionBanner />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/job/:jobId" element={<JobDetailPage />} />
            <Route path="/partner" element={<PartnerWithUsPage />} />
            <Route path="/for-candidates" element={<ForCandidatesPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/services" element={<OurServicesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
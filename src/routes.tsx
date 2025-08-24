import React from "react";

// Importera dina befintliga filer (engelska filnamn)
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import PartnerWithUsPage from "./pages/PartnerWithUsPage";
import ForCandidatesPage from "./pages/ForCandidatesPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import OurServicesPage from "./pages/OurServicesPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";

// Svenska URL:er → befintliga komponenter
export const routes = [
  { path: "/jobb", element: <JobsPage /> },
  { path: "/jobb/:jobId", element: <JobDetailPage /> },
  { path: "/foretag", element: <PartnerWithUsPage /> },
  { path: "/for-kandidater", element: <ForCandidatesPage /> },
  { path: "/om-oss", element: <AboutUsPage /> },
  { path: "/kontakt", element: <ContactUsPage /> },
  { path: "/tjanster", element: <OurServicesPage /> },
  { path: "/villkor", element: <TermsOfServicePage /> },
  { path: "/integritetspolicy", element: <PrivacyPolicyPage /> },
  { path: "/cookiepolicy", element: <CookiePolicyPage /> },
];

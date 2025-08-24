import React from "react";

// Importera sidor (alla börjar med stor bokstav nu)
import Jobb from "./pages/Jobb";
import JobbDetalj from "./pages/JobbDetalj";
import Foretag from "./pages/Foretag";
import ForKandidater from "./pages/ForKandidater";
import OmOss from "./pages/OmOss";
import Kontakt from "./pages/Kontakt";
import Tjanster from "./pages/Tjanster";
import Villkor from "./pages/Villkor";
import Integritetspolicy from "./pages/Integritetspolicy";
import Cookiepolicy from "./pages/Cookiepolicy";

export const routes = [
  { path: "/jobb", element: <Jobb /> },
  { path: "/jobb/:jobId", element: <JobbDetalj /> },
  { path: "/foretag", element: <Foretag /> },
  { path: "/for-kandidater", element: <ForKandidater /> },
  { path: "/om-oss", element: <OmOss /> },
  { path: "/kontakt", element: <Kontakt /> },
  { path: "/tjanster", element: <Tjanster /> },
  { path: "/villkor", element: <Villkor /> },
  { path: "/integritetspolicy", element: <Integritetspolicy /> },
  { path: "/cookiepolicy", element: <Cookiepolicy /> },
];

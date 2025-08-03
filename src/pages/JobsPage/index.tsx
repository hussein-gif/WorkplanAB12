import React from 'react';
import { createRoot } from 'react-dom/client';
import JobsPage from './JobsPage';
import './globals.css'; // Se till att din Tailwind / globala CSS laddas

// Professionell, enkel bakgrund med gradient + subtilt mönster + mjuka floating shapes
const ProfessionalBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen relative overflow-hidden">
    {/* Basgradient */}
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 65%, #0f172a 100%)',
        zIndex: 0,
      }}
    />

    {/* Subtilt geometriskt mönster (diagonal grid) */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'><path d='M20 0 L0 0 0 20' stroke='%23ffffff' stroke-width='0.5' fill='none'/></pattern></defs><rect width='160' height='160' fill='url(%23grid)' opacity='0.04'/></svg>")`,
        zIndex: 1,
      }}
    />

    {/* Mjuka floating shapes för djup */}
    <div
      aria-hidden="true"
      className="absolute top-1/4 left-[15%] w-[480px] h-[480px] rounded-[100px] blur-[140px] opacity-20"
      style={{
        background: 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.3) 0%, transparent 70%)',
        mixBlendMode: 'overlay',
        animation: 'float 32s ease-in-out infinite',
        zIndex: 2,
      }}
    />
    <div
      aria-hidden="true"
      className="absolute bottom-1/3 right-[10%] w-[600px] h-[600px] rounded-[140px] blur-[160px] opacity-18"
      style={{
        background: 'radial-gradient(circle at 70% 60%, rgba(16,185,129,0.25) 0%, transparent 70%)',
        mixBlendMode: 'overlay',
        animation: 'float 38s ease-in-out 1s infinite',
        zIndex: 2,
      }}
    />

    {/* Innehåll ovanpå */}
    <div className="relative z-10">{children}</div>

    {/* Keyframes ilined för att undvika att kräva global CSS-ändring */}
    <style>{`
      @keyframes float {
        0% { transform: translate(0,0) scale(1); }
        50% { transform: translate(8px,-6px) scale(1.01); }
        100% { transform: translate(0,0) scale(1); }
      }
    `}</style>
  </div>
);

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');

createRoot(rootEl).render(
  <React.StrictMode>
    <ProfessionalBackground>
      <JobsPage />
    </ProfessionalBackground>
  </React.StrictMode>
);

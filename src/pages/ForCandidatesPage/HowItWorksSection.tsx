import React from 'react';
import { Search, UserCheck, Briefcase } from 'lucide-react';

interface HowItWorksSectionProps {
  isVisible: boolean;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  isVisible,
}) => {
  const steps = [
    {
      icon: Search,
      title: 'Steg 1 – Sök & Välj',
      description: 'Utforska roller som matchar dina mål och intressen.'
    },
    {
      icon: UserCheck,
      title: 'Steg 2 – Matchning & Intervjuer',
      description: 'Vi matchar din profil, genomför intervjuer och presenterar dig sedan för arbetsgivaren.'
    },
    {
      icon: Briefcase,
      title: 'Steg 3 – Starta Ditt Nya Jobb',
      description: 'Acceptera erbjudandet och kickstarta nästa kapitel.'
    }
  ];

  return (
    <section className="py-24 px-8 relative overflow-hidden bg-white">
      {/* Sophisticated Background Design */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient foundation */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 30%, #f1f5f9 70%, #ffffff 100%)',
          }}
        />

        {/* Elegant geometric patterns */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(30deg, rgba(59,130,246,0.4) 1px, transparent 1px),
              linear-gradient(150deg, rgba(16,185,129,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168,85,247,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 120px 120px, 60px 60px',
          }}
        />

        {/* Flowing organic shapes */}
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #3B82F6 0%, #1D4ED8 40%, transparent 70%)',
            animation: 'float 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full opacity-[0.035] blur-3xl"
          style={{
            background: 'radial-gradient(circle at 70% 70%, #10B981 0%, #059669 40%, transparent 70%)',
            animation: 'float 30s ease-in-out infinite reverse',
            animationDelay: '5s',
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.025] blur-3xl"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #A855F7 0%, #7C3AED 40%, transparent 70%)',
            animation: 'float 35s ease-in-out infinite',
            animationDelay: '10s',
          }}
        />

        {/* Sophisticated mesh gradient overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(59,130,246,0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 30%, rgba(16,185,129,0.25) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(168,85,247,0.2) 0%, transparent 50%),
              radial-gradient(circle at 90% 90%, rgba(239,68,68,0.15) 0%, transparent 50%)
            `,
          }}
        />

        {/* Crystalline structure pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.015]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="crystalPattern"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(15)"
            >
              <path
                d="M100 0 L150 50 L100 100 L50 50 Z M100 100 L150 150 L100 200 L50 150 Z"
                stroke="rgba(59,130,246,0.2)"
                strokeWidth="0.5"
                fill="none"
              />
              <path
                d="M0 100 L50 50 L100 100 L50 150 Z M100 100 L150 50 L200 100 L150 150 Z"
                stroke="rgba(16,185,129,0.15)"
                strokeWidth="0.5"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#crystalPattern)" />
        </svg>

        {/* Subtle noise texture for depth */}
        <div
          className="absolute inset-0 opacity-[0.008]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Elegant light rays */}
        <div
          className="absolute top-0 left-1/4 w-px h-full opacity-[0.06] transform rotate-12"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(59,130,246,0.3) 30%, rgba(59,130,246,0.1) 70%, transparent 100%)',
          }}
        />
        <div
          className="absolute top-0 right-1/3 w-px h-full opacity-[0.05] transform -rotate-6"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(16,185,129,0.25) 25%, rgba(16,185,129,0.08) 75%, transparent 100%)',
          }}
        />

        {/* Floating accent dots */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/10 rounded-full animate-pulse" />
        <div className="absolute top-32 right-32 w-1.5 h-1.5 bg-emerald-400/12 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/3 w-1 h-1 bg-purple-400/8 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-2.5 h-2.5 bg-rose-400/6 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />

        {/* Sophisticated vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.01) 100%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-3">
            Så Går Det Till
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Text Row */}
        <div className="text-center">
          <p className="text-lg text-gray-700">
            Redo?{' '}
            <button
              onClick={() => {
                const element = document.getElementById('featured-jobs');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors underline"
            >
              Bläddra bland jobben ovan.
            </button>
          </p>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(15px, -10px) rotate(1deg); }
          66% { transform: translate(-10px, 5px) rotate(-1deg); }
        }
      `}</style>
    </section>
  );
};

export default HowItWorksSection;
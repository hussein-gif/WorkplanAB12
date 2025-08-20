import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, MapPin, Building, Mail, Phone } from 'lucide-react';
import { mockJobData, JobData } from './jobData';

const JobDetailPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<JobData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (jobId && mockJobData[jobId as keyof typeof mockJobData]) {
      setJob(mockJobData[jobId as keyof typeof mockJobData]);
    }
    setIsVisible(true);
  }, [jobId]);

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6" />
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-blue-400 rounded-full animate-spin mx-auto"
              style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
            />
          </div>
          <p className="text-white/70 text-lg font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
            Laddar tjänst...
          </p>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/jobs');
  };

  const handleApply = () => {
    const subject = encodeURIComponent(`Ansökan: ${job.title} – ${job.company}`);
    const body = encodeURIComponent(
      `Hej!\n\nJag vill gärna ansöka till tjänsten "${job.title}" hos ${job.company}.\n\nVänliga hälsningar,\n`
    );
    window.open(`mailto:${job.recruiterEmail}?subject=${subject}&body=${body}`);
  };

  const startDate = (job as any).startDate || 'Enligt överenskommelse';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-6 py-8 pt-28 md:pt-32">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className={`
            group flex items-center space-x-2 px-4 py-2 mb-6
            bg-white/10 border border-white/20 rounded-lg
            text-white/80 hover:text-white hover:bg-white/15
            transition-all duration-200
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
          style={{ transitionDelay: '80ms', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          <span className="text-sm">Tillbaka till jobb</span>
        </button>

        {/* Title + Logo Row */}
        <div
          className={`
            flex items-start justify-between gap-4 mb-4
            transition-all duration-700 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}
          `}
          style={{ transitionDelay: '120ms' }}
        >
          <h1
            className="text-4xl md:text-5xl leading-tight text-white"
            style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
          >
            {job.title}
          </h1>

          {/* Logo / Image to the right */}
          <div className="shrink-0">
            <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <span className="text-white text-2xl font-bold select-none" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}>
                {job.companyLogo || (job.company?.[0] ?? '•')}
              </span>
            </div>
          </div>
        </div>

        {/* Short, selling summary */}
        <p
          className={`
            text-white/80 leading-relaxed mb-5 max-w-3xl
            transition-all duration-700 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
          `}
          style={{ transitionDelay: '200ms', fontFamily: 'Inter, sans-serif' }}
        >
          {job.summary}
        </p>

        {/* Primary CTA "Ansök här" with arrow */}
        <div className="mb-8">
          <button
            onClick={handleApply}
            className="
              inline-flex items-center justify-center gap-2
              px-6 py-3 rounded-xl
              bg-gradient-to-r from-blue-600 to-purple-600
              text-white font-semibold
              hover:from-blue-700 hover:to-purple-700
              shadow-lg hover:shadow-xl
              transition-all duration-200
            "
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span>Ansök här</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Attribute Box: Företag, Startdatum, Plats, Omfattning */}
        <div
          className={`
            bg-white/10 border border-white/20 rounded-xl p-6 mb-14
            grid grid-cols-2 md:grid-cols-4 gap-6
            transition-all duration-700 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
          `}
          style={{ transitionDelay: '260ms' }}
        >
          <div className="text-center">
            <Building size={20} className="text-white/60 mx-auto mb-2" />
            <div className="text-xs uppercase tracking-wider text-white/60 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              Företag
            </div>
            <div className="text-white font-bold" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}>
              {job.company}
            </div>
          </div>
          <div className="text-center">
            <Clock size={20} className="text-white/60 mx-auto mb-2" />
            <div className="text-xs uppercase tracking-wider text-white/60 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              Startdatum
            </div>
            <div className="text-white font-bold" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}>
              {startDate}
            </div>
          </div>
          <div className="text-center">
            <MapPin size={20} className="text-white/60 mx-auto mb-2" />
            <div className="text-xs uppercase tracking-wider text-white/60 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              Plats
            </div>
            <div className="text-white font-bold" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}>
              {job.location}
            </div>
          </div>
          <div className="text-center">
            <svg className="mx-auto mb-2" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" className="text-white/60" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="text-xs uppercase tracking-wider text-white/60 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              Omfattning
            </div>
            <div className="text-white font-bold" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif' }}>
              {job.omfattning}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* Om Rollen */}
          <section
            className={`
              transition-all duration-700 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
            `}
          >
            <h2
              className="text-2xl text-white mb-6"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
            >
              Om rollen
            </h2>
            <div className="bg-white/10 border border-white/20 rounded-xl p-6">
              <p className="text-white/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                {job.aboutRole}
              </p>
            </div>
          </section>

          {/* Arbetsuppgifter */}
          <section
            className={`
              transition-all duration-700 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
            `}
          >
            <h2
              className="text-2xl text-white mb-6"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
            >
              Arbetsuppgifter
            </h2>
            <div className="bg-white/10 border border-white/20 rounded-xl p-6">
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white/50 rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-white/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {responsibility}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Vem vi söker */}
          <section
            className={`
              transition-all duration-700 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
            `}
          >
            <h2
              className="text-2xl text-white mb-6"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
            >
              Vem vi söker
            </h2>
            <div className="bg-white/10 border border-white/20 rounded-xl p-6">
              <ul className="space-y-3">
                {job.requirements.map((requirement: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white/50 rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-white/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {requirement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Vår rekryteringsprocess */}
          <section
            className={`
              transition-all duration-700 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
            `}
          >
            <h2
              className="text-2xl text-white mb-6"
              style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
            >
              Vår rekryteringsprocess
            </h2>
            <div className="bg-white/10 border border-white/20 rounded-xl p-6">
              <p className="text-white/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                {job.recruitmentProcess}
              </p>
            </div>
          </section>

          {/* Har du frågor? */}
          <section
            className={`
              transition-all duration-700 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
            `}
          >
            <div className="bg-white/10 border border-white/20 rounded-xl p-6">
              <h3
                className="text-xl text-white mb-4"
                style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: 500 }}
              >
                Har du frågor?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`mailto:${job.recruiterEmail}`}
                  className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Mail size={20} className="text-blue-400" />
                  <div>
                    <div className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                      E-post
                    </div>
                    <div className="text-white font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {job.recruiterEmail}
                    </div>
                  </div>
                </a>
                <a
                  href={`tel:${job.recruiterPhone}`}
                  className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Phone size={20} className="text-green-400" />
                  <div>
                    <div className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Telefon
                    </div>
                    <div className="text-white font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {job.recruiterPhone}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Final CTA */}
        <div className="mt-14 flex">
          <button
            onClick={handleApply}
            className="
              inline-flex items-center justify-center gap-2
              px-6 py-3 rounded-xl
              bg-gradient-to-r from-blue-600 to-purple-600
              text-white font-semibold
              hover:from-blue-700 hover:to-purple-700
              shadow-lg hover:shadow-xl
              transition-all duration-200
            "
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span>Ansök här</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;

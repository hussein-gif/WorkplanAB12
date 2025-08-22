import React from 'react';

interface JobsHeaderProps {
  filteredJobsCount: number;
}

const JobsHeader: React.FC<JobsHeaderProps> = ({ filteredJobsCount }) => {
  return (
    <div className="pt-32 pb-16 px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Desktop title */}
        <h1 className="hidden md:block text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight leading-[0.9]">
          <span
            className="font-normal"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 400,
            }}
          >
            Hitta Din{' '}
          </span>
          <span
            className="font-medium text-white"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 500,
            }}
          >
            Nästa Roll
          </span>
        </h1>

        {/* Mobile title */}
        <h1 className="block md:hidden text-4xl font-extralight text-white mb-6 tracking-tight leading-tight">
          <span
            className="font-normal block"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 400,
            }}
          >
            Hitta Din
          </span>
          <span
            className="font-medium text-white block"
            style={{
              fontFamily: 'Zen Kaku Gothic Antique, sans-serif',
              fontWeight: 500,
            }}
          >
            Nästa Jobb
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-8 font-light"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
        >
          {filteredJobsCount} aktiva tjänster väntar på dig
        </p>
      </div>
    </div>
  );
};

export default JobsHeader;

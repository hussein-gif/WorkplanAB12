import React, { useState, useEffect, useRef } from 'react';
import { User, Briefcase, ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobsPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const audiences = [
    {
      id: 'candidates',
      icon: User,
      accentIcon: Target,
      title: 'För',
      subtitle: 'Kandidater',
      description:
        'Lås upp din potential med kurerade möjligheter som stämmer överens med dina ambitioner och värderingar.',
      features: ['Personlig Matchning', 'Karriäracceleration', 'Premium Nätverk'],
      gradient: 'from-blue-500 via-blue-600 to-indigo-700',
    },
    {
      id: 'clients',
      icon: Briefcase,
      accentIcon: Zap,
      title: 'För',
      subtitle: 'Företag',
      description:
        'Prioriterad matchning – Vi lägger extra fokus på att snabbt identifiera och kontakta rätt kandidater för era behov.',
      features: ['Snabb Sourcing', 'Kvalitetssäkring', 'Strategiskt Partnerskap'],
      gradient: 'from-teal-500 via-emerald-600 to-green-700',
    },
  ];

  const subtleStars = [
    { left: '12%', top: '18%', size: 2, delay: '0s', color: '#ffffff', opacity: 0.12 },
    { left: '80%', top: '25%', size: 1.5, delay: '1s', color: '#d1ddff', opacity: 0.08 },
    { left: '45%', top: '60%', size: 1.8, delay: '2s', color: '#8fcfff', opacity: 0.1 },
    { left: '30%', top: '40%', size: 1.2, delay: '0.5s', color: '#a0bfff', opacity: 0.07 },
    { left: '65%', top: '10%', size: 2.5, delay: '1.5s', color: '#c5e8ff', opacity: 0.09 },
  ];

  const handleTilt = (e: React.MouseEvent, idx: number) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 12;
    const rotateX = -(py - 0.5) * 12;
    setTilt((prev) => {
      const copy = [...prev];
      copy[idx] = { x: rotateX, y: rotateY };
      return copy;
    });
  };

  const resetTilt = (idx: number) => {
    setTilt((prev) => {
      const copy = [...prev];
      copy[idx] = { x: 0, y: 0 };
      return copy;
    });
  };

  return (
    <ProfessionalBackground>
      <JobsHeader filteredJobsCount={filteredJobs.length} />
      <JobsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        selectedOmfattning={selectedOmfattning}
        setSelectedOmfattning={setSelectedOmfattning}
        locations={locations}
        industries={industries}
        omfattningar={omfattningar}
        clearFilters={clearFilters}
      />
      <JobsList jobs={filteredJobs} />
    </ProfessionalBackground>
  );
};

export default JobsPage;
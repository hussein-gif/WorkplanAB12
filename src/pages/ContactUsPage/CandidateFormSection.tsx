"use client";
import React, { useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

interface CandidateFormSectionProps {
  userType: 'candidate' | 'company' | null;
  candidateForm: {
    name: string;
    email: string;
    phone: string;
    message: string;
    gdprConsent: boolean;
  };
  handleCandidateSubmit: (e: React.FormEvent) => void;
  handleCandidateChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClose?: () => void;
  // NY:
  loading?: boolean;
}

const CandidateFormSection: React.FC<CandidateFormSectionProps> = ({
  candidateForm,
  handleCandidateSubmit,
  handleCandidateChange,
  loading = false, // default
}) => {
  ...
  return (
    ...
    <button
      type="submit"
      disabled={loading}
      className={`
        relative w-full py-4 px-6 text-white rounded-2xl font-semibold text-lg tracking-wide
        transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]
        overflow-hidden font-['Inter'] focus:outline-none focus:ring-4 focus:ring-blue-500/25 group
        ${loading ? "opacity-60 cursor-not-allowed" : ""}
      `}
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.12)), linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #0B69E3 100%)',
        border: '1px solid rgba(255,255,255,0.18)',
      }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <Send size={20} />
        <span>{loading ? "Skickar…" : "Skicka meddelande"}</span>
      </span>
    </button>
    ...

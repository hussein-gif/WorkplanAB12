"use client";
import React, { useState } from "react";
import CandidateFormSection from "./CandidateFormSection";
import { supabase } from "../../supabaseClient";
import { Check } from "lucide-react"; // ikon för bocken

type CandidateFormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  gdprConsent: boolean;
};

const INITIAL: CandidateFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  gdprConsent: false,
};

const CandidateFormContainer: React.FC<{ onSent?: () => void }> = ({ onSent }) => {
  const [candidateForm, setCandidateForm] = useState<CandidateFormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // ny state för success
  const [feedback, setFeedback] = useState<{ typ: "ok" | "error"; text: string } | null>(null);

  const handleCandidateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setCandidateForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!candidateForm.name || !candidateForm.email || !candidateForm.message) {
      setFeedback({ typ: "error", text: "Fyll i namn, e-post och meddelande." });
      return;
    }
    if (!candidateForm.gdprConsent) {
      setFeedback({ typ: "error", text: "Du måste godkänna GDPR för att kunna skicka." });
      return;
    }

    try {
      setLoading(true);

      const row = {
        from_type: "candidate" as const,
        full_name: candidateForm.name,
        email: candidateForm.email,
        phone: candidateForm.phone || null,
        subject: "Kandidatfråga",
        message: candidateForm.message,
        status: "new" as const,
        gdpr_consent: !!candidateForm.gdprConsent,
        gdpr_consented_at: candidateForm.gdprConsent ? new Date().toISOString() : null,
      };

      const { error } = await supabase.from("contact_messages").insert([row]).select();

      if (error) {
        console.error("Supabase insert error:", error);
        setFeedback({ typ: "error", text: `Kunde inte skicka (${error.message}).` });
        return;
      }

      // Visa success istället för formulär
      setSuccess(true);
      setCandidateForm(INITIAL);
      onSent?.();
    } catch (err: any) {
      console.error("Unexpected submit error:", err);
      setFeedback({ typ: "error", text: "Ett oväntat fel inträffade." });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-600 shadow-lg">
          <Check size={40} className="text-white" strokeWidth={3} />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-gray-900 font-['Zen_Kaku_Gothic_Antique']">
          Tack! Ditt meddelande har skickats.
        </h2>
        <p className="mt-2 text-gray-600">Vi återkommer till dig så snart vi kan.</p>
      </div>
    );
  }

  return (
    <div>
      <CandidateFormSection
        userType="candidate"
        candidateForm={candidateForm}
        handleCandidateChange={handleCandidateChange}
        handleCandidateSubmit={handleCandidateSubmit}
        loading={loading}
      />

      {feedback && feedback.typ === "error" && (
        <div
          className="mt-4 rounded-2xl border px-4 py-3 border-red-300 bg-red-50 text-red-800"
          role="status"
        >
          {feedback.text}
        </div>
      )}

      {loading && (
        <div className="mt-2 text-sm text-gray-500" aria-live="polite">
          Skickar…
        </div>
      )}
    </div>
  );
};

export default CandidateFormContainer;

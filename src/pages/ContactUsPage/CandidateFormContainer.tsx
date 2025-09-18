"use client";
import React, { useState } from "react";
import CandidateFormSection from "./CandidateFormSection";
import { supabase } from "../../supabaseClient";

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
        name: candidateForm.name,
        email: candidateForm.email,
        phone: candidateForm.phone || null,
        subject: "Kandidatfråga",
        message: candidateForm.message,
        status: "new" as const,
      };

      // Viktigt: array till insert + select för att få tillbaka rad/ev. fel
      const { data, error, status } = await supabase
        .from("contact_messages")
        .insert([row])
        .select();

      if (error) {
        console.error("Supabase insert error:", error, "HTTP status:", status, "data:", data);
        setFeedback({ typ: "error", text: `Kunde inte skicka (${error.message}).` });
        return;
      }

      setFeedback({ typ: "ok", text: "Tack! Ditt meddelande har skickats." });
      setCandidateForm(INITIAL);
      onSent?.();
    } catch (err: any) {
      console.error("Unexpected submit error:", err);
      setFeedback({ typ: "error", text: "Ett oväntat fel inträffade." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CandidateFormSection
        userType="candidate"
        candidateForm={candidateForm}
        handleCandidateChange={handleCandidateChange}
        handleCandidateSubmit={handleCandidateSubmit}
        loading={loading}
      />

      {feedback && (
        <div
          className={
            "mt-4 rounded-2xl border px-4 py-3 " +
            (feedback.typ === "ok"
              ? "border-green-300 bg-green-50 text-green-800"
              : "border-red-300 bg-red-50 text-red-800")
          }
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

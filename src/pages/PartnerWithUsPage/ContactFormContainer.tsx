"use client";
import React, { useState } from "react";
import ContactFormSection from "./ContactFormSection";
import { supabase } from "../../supabaseClient";
import { Check } from "lucide-react";

type ContactFormState = {
  fornamn: string;
  efternamn: string;
  foretag: string;
  titel: string;
  epost: string;
  telefon: string;
  typAvBehov: string;
  antalPersoner: string;
  onskadStart: string;
  plats: string;
  meddelande: string;
  gdprAccept: boolean;
};

const INITIAL: ContactFormState = {
  fornamn: "",
  efternamn: "",
  foretag: "",
  titel: "",
  epost: "",
  telefon: "",
  typAvBehov: "",
  antalPersoner: "",
  onskadStart: "",
  plats: "",
  meddelande: "",
  gdprAccept: false,
};

const ContactFormContainer: React.FC<{ onSent?: () => void }> = ({ onSent }) => {
  const [formData, setFormData] = useState<ContactFormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState<{ typ: "ok" | "error"; text: string } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!formData.fornamn || !formData.efternamn || !formData.foretag || !formData.epost || !formData.typAvBehov || !formData.meddelande) {
      setFeedback({ typ: "error", text: "Fyll i alla obligatoriska fält." });
      return;
    }
    if (!formData.gdprAccept) {
      setFeedback({ typ: "error", text: "Du måste godkänna GDPR för att kunna skicka." });
      return;
    }

    try {
      setLoading(true);

      const combinedMessage = `
Typ av behov: ${formData.typAvBehov}
Antal personer: ${formData.antalPersoner || "-"}
Önskad start: ${formData.onskadStart || "-"}
Plats: ${formData.plats || "-"}
Meddelande: ${formData.meddelande}
      `.trim();

      const row = {
        from_type: "staffing_request" as const,
        full_name: `${formData.fornamn} ${formData.efternamn}`,
        company_name: formData.foretag,
        title: formData.titel || null,
        email: formData.epost,
        phone: formData.telefon || null,
        subject: formData.typAvBehov,
        message: combinedMessage,
        status: "new" as const,
        gdpr_consent: !!formData.gdprAccept,
        gdpr_consented_at: formData.gdprAccept ? new Date().toISOString() : null,
      };

      const { error } = await supabase.from("contact_messages").insert([row]).select();

      if (error) {
        console.error("Supabase insert error:", error);
        setFeedback({ typ: "error", text: `Kunde inte skicka (${error.message}).` });
        return;
      }

      setSuccess(true);
      setFormData(INITIAL);
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
      <div className="flex flex-col items-center justify-center py-16 bg-[#08132B] text-white">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-600 shadow-lg">
          <Check size={40} className="text-white" strokeWidth={3} />
        </div>
        <h2 className="mt-6 text-2xl font-semibold font-['Zen_Kaku_Gothic_Antique']">
          Tack! Er förfrågan har skickats.
        </h2>
        <p className="mt-2 text-white/80">Vi kontaktar er så snart vi kan.</p>
      </div>
    );
  }

  return (
    <div>
      <ContactFormSection
        formData={formData}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
      />

      {feedback && feedback.typ === "error" && (
        <div className="mt-4 rounded-2xl border px-4 py-3 border-red-300 bg-red-50 text-red-800">
          {feedback.text}
        </div>
      )}

      {loading && (
        <div className="mt-2 text-sm text-gray-300" aria-live="polite">
          Skickar…
        </div>
      )}
    </div>
  );
};

export default ContactFormContainer;

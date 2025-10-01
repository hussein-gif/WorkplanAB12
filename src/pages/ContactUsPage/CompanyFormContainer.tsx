"use client";
import React, { useState } from "react";
import CompanyFormSection from "./CompanyFormSection";
import { supabase } from "../../supabaseClient";
import { Check } from "lucide-react";

type CompanyFormState = {
  companyName: string;
  nameTitle: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  gdprAccept: boolean;
};

const INITIAL: CompanyFormState = {
  companyName: "",
  nameTitle: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  gdprAccept: false,
};

const CompanyFormContainer: React.FC<{ onSent?: () => void }> = ({ onSent }) => {
  const [companyForm, setCompanyForm] = useState<CompanyFormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState<{ typ: "ok" | "error"; text: string } | null>(null);

  const handleCompanyChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setCompanyForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (
      !companyForm.companyName ||
      !companyForm.nameTitle ||
      !companyForm.email ||
      !companyForm.subject ||
      !companyForm.message
    ) {
      setFeedback({ typ: "error", text: "Fyll i alla obligatoriska fält." });
      return;
    }
    if (!companyForm.gdprAccept) {
      setFeedback({ typ: "error", text: "Du måste godkänna GDPR för att kunna skicka." });
      return;
    }

    try {
      setLoading(true);

      const row = {
        from_type: "company" as const,
        company_name: companyForm.companyName,
        full_name: companyForm.nameTitle,
        email: companyForm.email,
        phone: companyForm.phone || null,
        subject: companyForm.subject,
        message: companyForm.message,
        status: "new" as const,
        gdpr_consent: !!companyForm.gdprAccept,
        gdpr_consented_at: companyForm.gdprAccept ? new Date().toISOString() : null,
      };

      const { error } = await supabase.from("contact_messages").insert([row]);

      if (error) {
        console.error("Supabase insert error:", error);
        setFeedback({ typ: "error", text: `Kunde inte skicka (${error.message}).` });
        return;
      }

      setSuccess(true);
      setCompanyForm(INITIAL);
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
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-600 shadow-lg">
          <Check size={40} className="text-white" strokeWidth={3} />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-gray-900 font-['Zen_Kaku_Gothic_Antique']">
          Tack! Ditt meddelande har skickats.
        </h2>
        <p className="mt-2 text-gray-600">Vi återkommer till er så snart vi kan.</p>
      </div>
    );
  }

  return (
    <div>
      <CompanyFormSection
        companyForm={companyForm}
        handleCompanyChange={handleCompanyChange}
        handleCompanySubmit={handleCompanySubmit}
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

export default CompanyFormContainer;

import React, { useState } from 'react';
import CandidateFormSection from './CandidateFormSection';
import { supabase } from '@/supabaseClient';

type CandidateFormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  gdprConsent: boolean;
};

const INITIAL: CandidateFormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
  gdprConsent: false,
};

const KandidatFormContainer: React.FC<{ onSent?: () => void }> = ({ onSent }) => {
  const [candidateForm, setCandidateForm] = useState<CandidateFormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ typ: 'ok' | 'error'; text: string } | null>(null);

  // Hanterar både input, textarea och checkbox
  const handleCandidateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setCandidateForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    // Enkel validering
    if (!candidateForm.name || !candidateForm.email || !candidateForm.message) {
      setFeedback({ typ: 'error', text: 'Fyll i namn, e-post och meddelande.' });
      return;
    }
    if (!candidateForm.gdprConsent) {
      setFeedback({ typ: 'error', text: 'Du måste godkänna GDPR för att kunna skicka.' });
      return;
    }

    setLoading(true);

    // Förbered raden att spara i Supabase
    const row = {
      from_type: 'candidate' as const,
      name: candidateForm.name,
      email: candidateForm.email,
      phone: candidateForm.phone || null,
      // Om din kolumn subject är NOT NULL i databasen, använd en default:
      subject: 'Kandidatfråga',
      message: candidateForm.message,
      status: 'new' as const,
    };

    const { error } = await supabase.from('contact_messages').insert(row);

    setLoading(false);

    if (error) {
      console.error(error);
      setFeedback({
        typ: 'error',
        text: 'Kunde inte skicka just nu. Försök igen om en stund.',
      });
      return;
    }

    setFeedback({ typ: 'ok', text: 'Tack! Ditt meddelande har skickats.' });
    setCandidateForm(INITIAL);
    onSent?.();
  };

  return (
    <div>
      <CandidateFormSection
        userType="candidate"
        candidateForm={candidateForm}
        handleCandidateChange={handleCandidateChange}
        handleCandidateSubmit={handleCandidateSubmit}
      />

      {/* Enkel feedback under formuläret */}
      {feedback && (
        <div
          className={
            'mt-4 rounded-2xl border px-4 py-3 ' +
            (feedback.typ === 'ok'
              ? 'border-green-300 bg-green-50 text-green-800'
              : 'border-red-300 bg-red-50 text-red-800')
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

export default KandidatFormContainer;

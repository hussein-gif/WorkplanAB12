// src/supabaseClient.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * ENV (Vite): Publika nycklar för frontend.
 * Dessa två måste finnas i projektets .env (med prefix VITE_).
 */
const VITE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const VITE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!VITE_URL || !VITE_ANON) {
  throw new Error(
    "Saknar Supabase ENV. Lägg till VITE_SUPABASE_URL och VITE_SUPABASE_ANON_KEY i .env"
  );
}

/* ------------------------------------------------------------------
   Singleton helpers så Vite HMR inte skapar nya klienter hela tiden.
------------------------------------------------------------------- */
declare global {
  interface Window {
    __sb_public?: SupabaseClient;
    __sb_admin?: SupabaseClient;
  }
}

/* ------------------------------------------------------------------
   1) Publik klient (för hela sajten / kontaktformulär)
   - Ingen session
   - Ingen auto refresh
   - Ingen auth i URL
------------------------------------------------------------------- */
export const supabase: SupabaseClient =
  (typeof window !== "undefined" && window.__sb_public) ||
  createClient(VITE_URL, VITE_ANON, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      flowType: "pkce",
      storage: undefined, // ingen storage i publika klienten
    },
    db: { schema: "public" },
  });

if (typeof window !== "undefined") {
  window.__sb_public = supabase;
}

/* ------------------------------------------------------------------
   2) Admin-klient (endast i admin-vyer)
   - Kräver användarinloggning (GoTrue) och sparar session i sessionStorage
   - OBS: fortfarande anon key (inte service-role); policies + user session styr access
------------------------------------------------------------------- */
export const adminSupabase: SupabaseClient =
  (typeof window !== "undefined" && window.__sb_admin) ||
  createClient(VITE_URL, VITE_ANON, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce",
      storage:
        typeof window !== "undefined" ? window.sessionStorage : undefined,
      storageKey: "sb-admin-session",
    },
    db: { schema: "public" },
  });

if (typeof window !== "undefined") {
  window.__sb_admin = adminSupabase;
}

/* ------------------------------------------------------------------
   3) Valfritt: hård maxtid för admin-session
------------------------------------------------------------------- */
const MAX_MINUTES = Number(import.meta.env.VITE_ADMIN_MAX_SESSION_MINUTES ?? 120);

if (typeof window !== "undefined") {
  adminSupabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      sessionStorage.setItem("sb-admin-session-start", String(Date.now()));
    } else {
      sessionStorage.removeItem("sb-admin-session-start");
    }
  });

  const checkHardLimit = async () => {
    const startedAt = Number(sessionStorage.getItem("sb-admin-session-start") ?? "0");
    if (!startedAt) return;
    const ageMinutes = (Date.now() - startedAt) / 60000;
    if (ageMinutes > MAX_MINUTES) {
      await adminSupabase.auth.signOut();
    }
  };

  setInterval(checkHardLimit, 60_000);
}

/* ------------------------------------------------------------------
   4) Små hjälpare för dina formulär (valfritt men skönt att återanvända)
   - Använder pub-klienten + throwOnError (så felet syns i UI)
------------------------------------------------------------------- */
type CompanyRow = {
  from_type: "company";
  company_name: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: "new";
  gdpr_consent: boolean;
  gdpr_consented_at: string | null;
};

type CandidateRow = {
  from_type: "candidate";
  company_name?: null; // lämnas tomt i DB (kolumnen bör vara nullable)
  full_name: string;
  email: string;
  phone: string | null;
  subject: string; // t.ex. "Kandidatfråga"
  message: string;
  status: "new";
  gdpr_consent: boolean;
  gdpr_consented_at: string | null;
};

export async function insertCompanyMessage(row: CompanyRow) {
  await supabase.from("contact_messages").insert([row]).throwOnError();
}

export async function insertCandidateMessage(row: CandidateRow) {
  await supabase.from("contact_messages").insert([row]).throwOnError();
}

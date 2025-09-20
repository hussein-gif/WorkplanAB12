// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL!;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

/* ------------------------------------------------------------
   PUBLIK KLIENT (webbplatsen): alltid 'anon' – ingen session.
   Används av publika sidor som t.ex. JobApplicationSection.
------------------------------------------------------------- */
export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: false,          // ingen session = alltid anon
    autoRefreshToken: false,
    detectSessionInUrl: false,
    flowType: 'pkce',
    storage: undefined,             // viktig: ingen storage kopplas
  },
});

/* ------------------------------------------------------------
   ADMIN KLIENT: PKCE + sessionStorage (som tidigare).
   Använd i adminpanelen: import { adminSupabase } from '...'
   eller: import { adminSupabase as supabase } from '...'
------------------------------------------------------------- */
export const adminSupabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,            // behåll session under besöket
    autoRefreshToken: true,          // förläng access token
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
    storageKey: 'sb-admin-session',  // nyckelnamn för admin
  },
});

/* ------------------------------------------------------------
   Valfritt: Hård max-livslängd på admin-sessionen.
   - Styrs via env: VITE_ADMIN_MAX_SESSION_MINUTES (t.ex. 120)
   - När tiden passerats sker automatisk signOut.
------------------------------------------------------------- */
const MAX_MINUTES = Number(import.meta.env.VITE_ADMIN_MAX_SESSION_MINUTES ?? 120);

if (typeof window !== 'undefined') {
  // Sätt starttid när man loggar in, rensa när man loggar ut (ADMIN-klienten)
  adminSupabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      sessionStorage.setItem('sb-admin-session-start', String(Date.now()));
    } else {
      sessionStorage.removeItem('sb-admin-session-start');
    }
  });

  // Kolla var minut om max-tiden har passerats
  const checkHardLimit = async () => {
    const startedAt = Number(sessionStorage.getItem('sb-admin-session-start') ?? '0');
    if (!startedAt) return;
    const ageMinutes = (Date.now() - startedAt) / 60000;
    if (ageMinutes > MAX_MINUTES) {
      await adminSupabase.auth.signOut(); // logga ut när gränsen passerats
    }
  };

  setInterval(checkHardLimit, 60_000);
}

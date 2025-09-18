// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL!;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// OBS: sessionStorage = sessionen försvinner när webbläsarfönstret stängs.
// Vi aktiverar även PKCE-flödet (säkrare i produktion).
export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,            // behåll sessionen under pågående besök
    autoRefreshToken: true,          // förläng access token medan användaren är aktiv
    detectSessionInUrl: true,
    flowType: 'pkce',                // rekommenderat flöde
    storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
    storageKey: 'sb-admin-session'   // eget nyckelnamn (kan ändras fritt)
  }
});

/* ------------------------------------------------------------
   Valfritt: Hård max-livslängd på admin-sessionen.
   - Styrs via env: VITE_ADMIN_MAX_SESSION_MINUTES (t.ex. 120)
   - När tiden passerats sker automatisk signOut.
------------------------------------------------------------- */
const MAX_MINUTES =
  Number(import.meta.env.VITE_ADMIN_MAX_SESSION_MINUTES ?? 120);

if (typeof window !== 'undefined') {
  // Sätt starttid när man loggar in, rensa när man loggar ut
  supabase.auth.onAuthStateChange((_event, session) => {
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
      await supabase.auth.signOut(); // logga ut när gränsen passerats
    }
  };

  setInterval(checkHardLimit, 60_000);
}

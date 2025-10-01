// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

/**
 * Miljövariabler (Vite)
 * VITE_SUPABASE_URL och VITE_SUPABASE_ANON_KEY ska vara publika.
 */
const url = import.meta.env.VITE_SUPABASE_URL!;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

if (!url || !anonKey) {
  throw new Error('Supabase env saknas: kontrollera VITE_SUPABASE_URL och VITE_SUPABASE_ANON_KEY');
}

/* ------------------------------------------------------------
   1) PUBLIK KLIENT (webbplatsen): alltid "anon" utan session.
   - Ingen storage
   - Ingen token-autorefresh
   - Ingen session i URL
   Använd denna i publika komponenter, t.ex. kontaktformuläret.
------------------------------------------------------------- */
export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: false,       // ingen session lagras
    autoRefreshToken: false,     // ingen auto-refresh
    detectSessionInUrl: false,   // ignorera auth i URL
    flowType: 'pkce',
    storage: undefined,          // viktig: ingen storage kopplas
  },
  db: { schema: 'public' },
});

/* ------------------------------------------------------------
   2) ADMIN-KLIENT för adminpanelen (kräver inloggning).
   - PKCE + sessionStorage
   - Endast i admin-vyer
   OBS: Detta är fortfarande "anon key" + användarsession (inte service key).
------------------------------------------------------------- */
export const adminSupabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
    storageKey: 'sb-admin-session',
  },
  db: { schema: 'public' },
});

/* Liten säkerhets-vakt: varna om admin-klienten används utanför /admin */
if (typeof window !== 'undefined') {
  const path = window.location?.pathname ?? '';
  const isAdminRoute = path.startsWith('/admin');
  if (!isAdminRoute) {
    // Om någon råkar importera adminSupabase i publika sidor får vi en hint i konsolen
    // (helt ofarligt i drift — bara en varning vid felimport).
    // Du kan ta bort detta om du vill.
    (adminSupabase as any).__warnIfUsedOutsideAdmin = new Proxy(adminSupabase, {
      get(target, prop, receiver) {
        console.warn(
          '[adminSupabase] används utanför /admin – importera "supabase" istället för publika sidor.'
        );
        return Reflect.get(target, prop, receiver);
      },
    });
  }
}

/* ------------------------------------------------------------
   3) Hård max-livslängd på admin-sessionen (valfritt).
   Styrs via VITE_ADMIN_MAX_SESSION_MINUTES (default 120).
------------------------------------------------------------- */
const MAX_MINUTES = Number(import.meta.env.VITE_ADMIN_MAX_SESSION_MINUTES ?? 120);

if (typeof window !== 'undefined') {
  adminSupabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      sessionStorage.setItem('sb-admin-session-start', String(Date.now()));
    } else {
      sessionStorage.removeItem('sb-admin-session-start');
    }
  });

  const checkHardLimit = async () => {
    const startedAt = Number(sessionStorage.getItem('sb-admin-session-start') ?? '0');
    if (!startedAt) return;
    const ageMinutes = (Date.now() - startedAt) / 60000;
    if (ageMinutes > MAX_MINUTES) {
      await adminSupabase.auth.signOut();
    }
  };

  setInterval(checkHardLimit, 60_000);
}

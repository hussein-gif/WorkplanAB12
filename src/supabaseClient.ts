// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL!;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// Viktigt: storage = sessionStorage  → utloggad när browsern stängs
export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,           // håller dig inloggad medan du är aktiv
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
    storageKey: 'sb-admin-session'    // eget nyckelnamn (valfritt)
  }
});

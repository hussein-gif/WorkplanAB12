// src/admin/AdminRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const MAX_IDLE_MS = 2 * 60 * 60 * 1000; // 2 timmar

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<null | boolean>(null);
  const navigate = useNavigate();

  // Kolla att användaren är admin
  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { if (alive) setAllowed(false); return; }

      const { data, error } = await supabase
        .from('user_profiles')
        .select('is_admin')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error || !data?.is_admin) { if (alive) setAllowed(false); return; }
      if (alive) setAllowed(true);
    })();
    return () => { alive = false; };
  }, []);

  // Idle-timer: logga ut efter X ms utan aktivitet
  useEffect(() => {
    const KEY = 'last-activity-ts';

    const markActivity = () =>
      sessionStorage.setItem(KEY, String(Date.now()));

    // markera direkt vid mount
    markActivity();

    // lyssna på aktivitet
    const events = ['click', 'keydown', 'mousemove', 'scroll', 'touchstart'];
    events.forEach(ev => window.addEventListener(ev, markActivity, { passive: true }));

    // kolla var 1 minut
    const iv = window.setInterval(async () => {
      const last = Number(sessionStorage.getItem(KEY) || '0');
      if (last && Date.now() - last > MAX_IDLE_MS) {
        // tidsgräns passerad → logga ut och skicka till login
        await supabase.auth.signOut();
        sessionStorage.removeItem(KEY);
        navigate('/admin/login', { replace: true });
      }
    }, 60 * 1000);

    return () => {
      events.forEach(ev => window.removeEventListener(ev, markActivity));
      clearInterval(iv);
    };
  }, [navigate]);

  if (allowed === null) return <div className="p-8 text-center text-gray-500">Laddar…</div>;
  if (!allowed) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

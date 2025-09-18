import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<null | boolean>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { if (mounted) setAllowed(false); return; }
      const { data } = await supabase
        .from('user_profiles')
        .select('is_admin')
        .eq('user_id', session.user.id)
        .maybeSingle();
      if (!data?.is_admin) { if (mounted) setAllowed(false); return; }
      if (mounted) setAllowed(true);
    })();
    return () => { mounted = false; };
  }, []);

  if (allowed === null) return <div className="p-8 text-center">Laddar…</div>;
  if (!allowed) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

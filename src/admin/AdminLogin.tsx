// src/admin/AdminLogin.tsx
import React, { useState } from 'react';
// ⬇️ Byt till admin-klienten och rätt sökväg
import { adminSupabase as supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    nav('/admin', { replace: true });
  }

  return (
    <div className="max-w-sm mx-auto py-16">
      <h1 className="text-2xl font-semibold mb-6">Admin Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="E-post"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Lösenord"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
        {err && <div className="text-sm text-red-600">{err}</div>}
        <button disabled={loading} className="w-full bg-black text-white rounded-lg py-2">
          {loading ? 'Loggar in…' : 'Logga in'}
        </button>
      </form>
    </div>
  );
}

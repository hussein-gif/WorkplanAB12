import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../supabaseClient';

type Application = {
  id: string; full_name: string; email: string;
  phone: string | null; city: string | null; role_applied: string | null;
  cover_letter: string | null; cv_path: string | null;
  status: 'new'|'reviewed'|'interview'|'rejected'|'hired';
  created_at: string;
};
const STATUSES: Application['status'][] = ['new','reviewed','interview','rejected','hired'];

export default function AdminPanel() {
  const [apps, setApps] = useState<Application[]>([]);
  const [q, setQ] = useState(''); const [status, setStatus] = useState<'all'|Application['status']>('all');
  const [loading, setLoading] = useState(true);

  async function fetchApps() {
    setLoading(true);
    const { data } = await supabase.from('applications').select('*').order('created_at',{ascending:false});
    setApps((data ?? []) as Application[]); setLoading(false);
  }
  useEffect(()=>{ fetchApps(); },[]);

  const filtered = useMemo(()=>apps.filter(a=>{
    const matchQ = [a.full_name,a.email,a.city,a.role_applied].join(' ').toLowerCase().includes(q.toLowerCase());
    const matchS = status==='all' ? true : a.status===status; return matchQ && matchS;
  }),[apps,q,status]);

  async function updateStatus(id:string, s:Application['status']) {
    const { error } = await supabase.from('applications').update({status:s}).eq('id',id);
    if (!error) setApps(prev=>prev.map(a=>a.id===id?{...a,status:s}:a));
  }
  async function openCv(path:string|null){
    if(!path) return;
    const { data } = await supabase.storage.from('cv').createSignedUrl(path,60);
    if(data?.signedUrl) window.open(data.signedUrl,'_blank');
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-5">
        <h1 className="text-2xl font-semibold">Ansökningar</h1>
        <div className="flex gap-2">
          <input className="border rounded-lg px-3 py-2 w-64" placeholder="Sök…" value={q} onChange={e=>setQ(e.target.value)} />
          <select className="border rounded-lg px-3 py-2" value={status} onChange={e=>setStatus(e.target.value as any)}>
            <option value="all">Alla statusar</option>{STATUSES.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={fetchApps} className="border rounded-lg px-3 py-2">Uppdatera</button>
        </div>
      </div>

      {loading ? <div className="p-8 text-gray-500">Laddar…</div> :
       filtered.length===0 ? <div className="p-8 text-gray-600">Inga ansökningar.</div> :
       <div className="overflow-x-auto border rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr><th className="px-4 py-3 text-left">Sökande</th><th className="px-4 py-3 text-left">Kontakt</th>
                <th className="px-4 py-3 text-left">Ort</th><th className="px-4 py-3 text-left">Roll</th>
                <th className="px-4 py-3 text-left">Skickad</th><th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">CV</th></tr>
          </thead>
          <tbody>
            {filtered.map(a=>(
              <tr key={a.id} className="border-t">
                <td className="px-4 py-3 font-medium">{a.full_name}</td>
                <td className="px-4 py-3"><div>{a.email}</div>{a.phone && <div className="text-gray-500">{a.phone}</div>}</td>
                <td className="px-4 py-3">{a.city ?? '—'}</td>
                <td className="px-4 py-3">{a.role_applied ?? '—'}</td>
                <td className="px-4 py-3">{new Date(a.created_at).toLocaleString('sv-SE')}</td>
                <td className="px-4 py-3">
                  <select className="border rounded-lg px-2 py-1" value={a.status} onChange={e=>updateStatus(a.id, e.target.value as any)}>
                    {STATUSES.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3">
                  {a.cv_path ? <button className="underline" onClick={()=>openCv(a.cv_path!)}>Visa CV</button> : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>}
    </div>
  );
}

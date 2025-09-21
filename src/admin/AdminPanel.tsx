// src/admin/AdminPanel.tsx
import React, { useState, useEffect } from 'react';

// ✅ Direktimportera alla sektioner från rätt sökväg (små bokstäver)
import DashboardSection from './sections/DashboardSection';
import ApplicationsSection from './sections/ApplicationsSection';
import MessagesSection from './sections/MessagesSection';
import RequestsSection from './sections/RequestsSection';
import JobsSection from './sections/JobsSection';

// ⬇️ ÄNDRAT: använd admin-klienten i adminpanelen
import { adminSupabase as supabase } from '../supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom'; // ⬅️ NYTT: useLocation
import { Briefcase, MessageSquare, Users, LogOut, Home, FileText } from 'lucide-react';

type Tab = 'dashboard' | 'applications' | 'messages' | 'requests' | 'jobs';

export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>('dashboard'); // startflik
  const navigate = useNavigate();
  const location = useLocation(); // ⬅️ NYTT

  // 🔢 Räknare för "new" i varje relevant sektion
  const [newAppCount, setNewAppCount] = useState<number>(0);
  const [newMsgCount, setNewMsgCount] = useState<number>(0);
  const [newReqCount, setNewReqCount] = useState<number>(0);

  // ⬅️ NYTT: Växla flik när ?tab= finns (med sessionStorage-fallback)
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const fromUrl = sp.get('tab') as Tab | null;
    const validTabs: Tab[] = ['dashboard', 'applications', 'messages', 'requests', 'jobs'];

    if (fromUrl && validTabs.includes(fromUrl)) {
      setTab(fromUrl);
    } else {
      const stored = sessionStorage.getItem('admin_next_tab') as Tab | null;
      if (stored && validTabs.includes(stored)) {
        setTab(stored);
        sessionStorage.removeItem('admin_next_tab');
      }
    }
  }, [location.search]);

  useEffect(() => {
    let alive = true;

    async function fetchCounts() {
      const [apps, msgs, reqs] = await Promise.all([
        supabase.from('applications').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        supabase
          .from('contact_messages')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'new')
          .in('from_type', ['candidate', 'company']),
        supabase
          .from('contact_messages')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'new')
          .eq('from_type', 'staffing_request'),
      ]);

      if (!alive) return;
      if (!apps.error && typeof apps.count === 'number') setNewAppCount(apps.count);
      if (!msgs.error && typeof msgs.count === 'number') setNewMsgCount(msgs.count);
      if (!reqs.error && typeof reqs.count === 'number') setNewReqCount(reqs.count);
    }

    // initial hämtning
    fetchCounts();

    // Hjälpfunktioner för inkrementell uppdatering
    const dec = (setter: React.Dispatch<React.SetStateAction<number>>) =>
      setter((c) => (c > 0 ? c - 1 : 0));
    const inc = (setter: React.Dispatch<React.SetStateAction<number>>) =>
      setter((c) => c + 1);

    const isReq = (row: any) => row?.from_type === 'staffing_request';
    const isNew = (row: any) => row?.status === 'new';

    // Realtime-lyssnare (behåll som tidigare)
    const ch = supabase
      .channel('admin-leftpanel-counts')
      // applications
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'applications' }, (p: any) => {
        if (isNew(p.new)) inc(setNewAppCount);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'applications' }, (p: any) => {
        if (isNew(p.old) && !isNew(p.new)) dec(setNewAppCount);
        else if (!isNew(p.old) && isNew(p.new)) inc(setNewAppCount);
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'applications' }, (p: any) => {
        if (isNew(p.old)) dec(setNewAppCount);
      })
      // contact_messages
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'contact_messages' }, (p: any) => {
        if (isNew(p.new)) {
          if (isReq(p.new)) inc(setNewReqCount);
          else inc(setNewMsgCount);
        }
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'contact_messages' }, (p: any) => {
        const oldWasNew = isNew(p.old),
          newIsNew = isNew(p.new);
        const oldWasReq = isReq(p.old),
          newIsReq = isReq(p.new);
        if (oldWasNew && !newIsNew) {
          if (oldWasReq) dec(setNewReqCount);
          else dec(setNewMsgCount);
        } else if (!oldWasNew && newIsNew) {
          if (newIsReq) inc(setNewReqCount);
          else inc(setNewMsgCount);
        } else if (oldWasNew && newIsNew && oldWasReq !== newIsReq) {
          if (oldWasReq) {
            dec(setNewReqCount);
            inc(setNewMsgCount);
          } else {
            dec(setNewMsgCount);
            inc(setNewReqCount);
          }
        }
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'contact_messages' }, (p: any) => {
        if (isNew(p.old)) {
          if (isReq(p.old)) dec(setNewReqCount);
          else dec(setNewMsgCount);
        }
      })
      .subscribe();

    // 🔔 Optimistiska UI-events (NYTT: lägg till +lyssnare)
    const msgReadHandler = (e: any) => {
      if (e.detail?.wasNew) dec(setNewMsgCount);
    };
    const reqHandledHandler = (e: any) => {
      if (e.detail?.wasNew) dec(setNewReqCount);
    };
    const msgNewHandler = () => inc(setNewMsgCount); // ⬅️
    const reqNewHandler = () => inc(setNewReqCount); // ⬅️

    window.addEventListener('msg:read', msgReadHandler);
    window.addEventListener('req:handled', reqHandledHandler);
    window.addEventListener('msg:new', msgNewHandler); // ⬅️
    window.addEventListener('req:new', reqNewHandler); // ⬅️

    return () => {
      alive = false;
      window.removeEventListener('msg:read', msgReadHandler);
      window.removeEventListener('req:handled', reqHandledHandler);
      window.removeEventListener('msg:new', msgNewHandler); // ⬅️
      window.removeEventListener('req:new', reqNewHandler); // ⬅️
      supabase.removeChannel(ch);
    };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  }

  // 🔹 Mild badge-komponent (blå)
  const Badge = ({ count }: { count: number }) =>
    count > 0 ? (
      <span className="ml-auto inline-flex items-center justify-center rounded-full text-xs w-5 h-5 bg-blue-100 text-blue-800 ring-1 ring-blue-200">
        {count > 99 ? '99+' : count}
      </span>
    ) : null;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="flex">
        {/* Sidopanel */}
        <aside className="w-64 border-r h-screen sticky top-0 hidden md:flex md:flex-col">
          <div className="p-5 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 text-white rounded-xl grid place-items-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-semibold">Workplan Admin</div>
                <div className="text-xs text-gray-500">Översikt</div>
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-2">
            <button
              onClick={() => setTab('dashboard')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                tab === 'dashboard' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4" /> Översikt
            </button>

            <button
              onClick={() => setTab('applications')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                tab === 'applications' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4" /> Ansökningar
              <Badge count={newAppCount} />
            </button>

            <button
              onClick={() => setTab('messages')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                tab === 'messages' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Meddelanden
              <Badge count={newMsgCount} />
            </button>

            <button
              onClick={() => setTab('requests')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                tab === 'requests' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'
              }`}
            >
              <Briefcase className="w-4 h-4" /> Förfrågningar
              <Badge count={newReqCount} />
            </button>

            <button
              onClick={() => setTab('jobs')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                tab === 'jobs' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'
              }`}
            >
              <FileText className="w-4 h-4" /> Jobb
            </button>
          </nav>

          {/* Flytta logga ut längst ned */}
          <div className="mt-auto p-3">
            <button
              onClick={signOut}
              className="w-full px-3 py-2 rounded-lg flex items-center gap-2 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" /> Logga ut
            </button>
          </div>
        </aside>

        {/* Innehåll */}
        <main className="flex-1 p-5 md:p-8">
          {/* Mobila flikar */}
          <div className="md:hidden mb-4 flex gap-2 flex-wrap">
            <button
              className={`px-3 py-2 rounded-lg border ${tab === 'dashboard' ? 'bg-gray-900 text-white' : ''}`}
              onClick={() => setTab('dashboard')}
            >
              Översikt
            </button>
            <button
              className={`px-3 py-2 rounded-lg border ${tab === 'applications' ? 'bg-gray-900 text-white' : ''}`}
              onClick={() => setTab('applications')}
            >
              Ansökningar
            </button>
            <button
              className={`px-3 py-2 rounded-lg border ${tab === 'messages' ? 'bg-gray-900 text-white' : ''}`}
              onClick={() => setTab('messages')}
            >
              Meddelanden
            </button>
            <button
              className={`px-3 py-2 rounded-lg border ${tab === 'requests' ? 'bg-gray-900 text-white' : ''}`}
              onClick={() => setTab('requests')}
            >
              Förfrågningar
            </button>
            <button
              className={`px-3 py-2 rounded-lg border ${tab === 'jobs' ? 'bg-gray-900 text-white' : ''}`}
              onClick={() => setTab('jobs')}
            >
              Jobb
            </button>
          </div>

          {tab === 'dashboard' && <DashboardSection />}
          {tab === 'applications' && <ApplicationsSection />}
          {tab === 'messages' && <MessagesSection />}
          {tab === 'requests' && <RequestsSection />}
          {tab === 'jobs' && <JobsSection />}
        </main>
      </div>
    </div>
  );
}

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
import { useNavigate } from 'react-router-dom';
import { Briefcase, MessageSquare, Users, LogOut, Home, FileText } from 'lucide-react';

type Tab = 'dashboard' | 'applications' | 'messages' | 'requests' | 'jobs';

export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>('applications'); // startflik
  const navigate = useNavigate();

  // 🔢 Räknare
  const [newAppCount, setNewAppCount] = useState<number>(0);
  const [newMsgCount, setNewMsgCount] = useState<number>(0);
  const [newReqCount, setNewReqCount] = useState<number>(0); // staffing requests (från contact_messages)

  useEffect(() => {
    let alive = true;

    async function fetchCounts() {
      const [apps, msgsNonReq, msgsReq] = await Promise.all([
        // Ansökningar med status 'new'
        supabase.from('applications')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'new'),

        // Meddelanden: contact_messages med status 'new' OCH from_type != 'staffing_request'
        supabase.from('contact_messages')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'new')
          .neq('from_type', 'staffing_request'),

        // Förfrågningar: contact_messages med status 'new' OCH from_type = 'staffing_request'
        supabase.from('contact_messages')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'new')
          .eq('from_type', 'staffing_request'),
      ]);

      if (!alive) return;
      if (!apps.error && typeof apps.count === 'number') setNewAppCount(apps.count);
      if (!msgsNonReq.error && typeof msgsNonReq.count === 'number') setNewMsgCount(msgsNonReq.count);
      if (!msgsReq.error && typeof msgsReq.count === 'number') setNewReqCount(msgsReq.count);
    }

    // 1) Hämta initiala värden
    fetchCounts();

    // Hjälpfunktioner för inkrementell uppdatering
    const dec = (setter: React.Dispatch<React.SetStateAction<number>>) =>
      setter((c) => (c > 0 ? c - 1 : 0));
    const inc = (setter: React.Dispatch<React.SetStateAction<number>>) =>
      setter((c) => c + 1);

    // Små helpers för att avgöra vilket counter som ska påverkas i contact_messages
    const isReq = (row: any) => row?.from_type === 'staffing_request';
    const isNew = (row: any) => row?.status === 'new';

    // 2) Realtime-lyssnare som uppdaterar badges direkt (utan reload)
    const ch = supabase
      .channel('admin-leftpanel-counts')

      // ---- applications ----
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

      // ---- contact_messages (både Meddelanden & Förfrågningar) ----
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'contact_messages' }, (p: any) => {
        if (isNew(p.new)) {
          if (isReq(p.new)) inc(setNewReqCount);
          else inc(setNewMsgCount);
        }
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'contact_messages' }, (p: any) => {
        // Hantera alla övergångar mellan new/ej-new och mellan req/ej-req
        const oldWasNew = isNew(p.old);
        const newIsNew = isNew(p.new);
        const oldWasReq = isReq(p.old);
        const newIsReq = isReq(p.new);

        if (oldWasNew && !newIsNew) {
          // Gick från new -> ej-new
          if (oldWasReq) dec(setNewReqCount);
          else dec(setNewMsgCount);
        } else if (!oldWasNew && newIsNew) {
          // Gick från ej-new -> new
          if (newIsReq) inc(setNewReqCount);
          else inc(setNewMsgCount);
        } else if (oldWasNew && newIsNew && oldWasReq !== newIsReq) {
          // Fortfarande 'new' men flyttad mellan req/ej-req (ovanligt)
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

    // (Valfritt) Optimistiska UI-events från sektionerna — om du vill kalla dessa
    const msgReadHandler = (e: any) => { if (e.detail?.wasNew) dec(setNewMsgCount); };
    const reqHandledHandler = (e: any) => { if (e.detail?.wasNew) dec(setNewReqCount); };
    const appReviewedHandler = (e: any) => { if (e.detail?.wasNew) dec(setNewAppCount); };
    window.addEventListener('msg:read', msgReadHandler);
    window.addEventListener('req:handled', reqHandledHandler);
    window.addEventListener('app:reviewed', appReviewedHandler);

    return () => {
      alive = false;
      window.removeEventListener('msg:read', msgReadHandler);
      window.removeEventListener('req:handled', reqHandledHandler);
      window.removeEventListener('app:reviewed', appReviewedHandler);
      supabase.removeChannel(ch);
    };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  }

  // 🔹 Mild badge (blå)
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
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${tab === 'dashboard' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
            >
              <Home className="w-4 h-4" /> Översikt
            </button>

            <button
              onClick={() => setTab('applications')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${tab === 'applications' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
            >
              <Users className="w-4 h-4" /> Ansökningar
              <Badge count={newAppCount} />
            </button>

            <button
              onClick={() => setTab('messages')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${tab === 'messages' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
            >
              <MessageSquare className="w-4 h-4" /> Meddelanden
              <Badge count={newMsgCount} />
            </button>

            <button
              onClick={() => setTab('requests')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${tab === 'requests' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
            >
              <Briefcase className="w-4 h-4" /> Förfrågningar
              <Badge count={newReqCount} />
            </button>

            <button
              onClick={() => setTab('jobs')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${tab === 'jobs' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
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
            >Översikt</button>
            <button
              className={`px-3 py-2 rounded-lg border ${tab === 'applications' ? 'bg-gray-900 text-white' : ''}`}
              onClick={() => setTab('applications')}
            >Ansökningar</button>
            <button
              className={`px-3 py-2 rounded-lg border ${tab === 'messages' ? 'bg-gray-900 text-white' : ''}`}
              onClick={() => setTab('messages')}
            >Meddelanden</button>
            <button
              className={`px-3 py-2 rounded-lg border ${tab === 'requests' ? 'bg-gray-900 text-white' : ''}`}
              onClick={() => setTab('requests')}
            >Förfrågningar</button>
            <button
              className={`px-3 py-2 rounded-lg border ${tab === 'jobs' ? 'bg-gray-900 text-white' : ''}`}
              onClick={() => setTab('jobs')}
            >Jobb</button>
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

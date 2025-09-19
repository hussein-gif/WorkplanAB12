// src/admin/AdminPanel.tsx
import React, { useState } from 'react';
import {
  ApplicationsSection,
  MessagesSection,
  RequestsSection,
  DashboardSection,
} from './sections';
import JobsSection from './sections/JobsSection'; // ✅ Direktimport av rätt komponent
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MessageSquare, Users, LogOut, Home, FileText } from 'lucide-react';

type Tab = 'dashboard' | 'applications' | 'messages' | 'requests' | 'jobs';

export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>('applications'); // startflik
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  }

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
            </button>
            <button
              onClick={() => setTab('messages')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                tab === 'messages' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Meddelanden
            </button>
            <button
              onClick={() => setTab('requests')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
                tab === 'requests' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'
              }`}
            >
              <Briefcase className="w-4 h-4" /> Förfrågningar
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
              className={`px-3 py-2 rounded-lg border ${
                tab === 'dashboard' ? 'bg-gray-900 text-white' : ''
              }`}
              onClick={() => setTab('dashboard')}
            >
              Översikt
            </button>
            <button
              className={`px-3 py-2 rounded-lg border ${
                tab === 'applications' ? 'bg-gray-900 text-white' : ''
              }`}
              onClick={() => setTab('applications')}
            >
              Ansökningar
            </button>
            <button
              className={`px-3 py-2 rounded-lg border ${
                tab === 'messages' ? 'bg-gray-900 text-white' : ''
              }`}
              onClick={() => setTab('messages')}
            >
              Meddelanden
            </button>
            <button
              className={`px-3 py-2 rounded-lg border ${
                tab === 'requests' ? 'bg-gray-900 text-white' : ''
              }`}
              onClick={() => setTab('requests')}
            >
              Förfrågningar
            </button>
            <button
              className={`px-3 py-2 rounded-lg border ${
                tab === 'jobs' ? 'bg-gray-900 text-white' : ''
              }`}
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

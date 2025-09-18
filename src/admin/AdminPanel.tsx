import React, { useState } from 'react';
import { ApplicationsSection, MessagesSection, RequestsSection, DashboardSection } from './Sections';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MessageSquare, Users, LogOut, Home } from 'lucide-react';

type Tab = 'dashboard' | 'applications' | 'messages' | 'requests';

export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>('applications'); // behåller samma start som tidigare
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r h-screen sticky top-0 hidden md:block">
          <div className="p-5 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 text-white rounded-xl grid place-items-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-semibold">Workplan Admin</div>
                <div className="text-xs text-gray-500">Dashboard</div>
              </div>
            </div>
          </div>
          <nav className="p-3 space-y-2">
            <button
              onClick={() => setTab('dashboard')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${tab === 'dashboard' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
            >
              <Home className="w-4 h-4" /> Dashboard
            </button>
            <button
              onClick={() => setTab('applications')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${tab === 'applications' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
            >
              <Users className="w-4 h-4" /> Applications
            </button>
            <button
              onClick={() => setTab('messages')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${tab === 'messages' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
            >
              <MessageSquare className="w-4 h-4" /> Messages
            </button>
            <button
              onClick={() => setTab('requests')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${tab === 'requests' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
            >
              <Briefcase className="w-4 h-4" /> Requests
            </button>
          </nav>
          <div className="mt-auto p-3">
            <button
              onClick={signOut}
              className="w-full px-3 py-2 rounded-lg flex items-center gap-2 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" /> Log out
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-5 md:p-8">
          {/* Mobile tabs */}
          <div className="md:hidden mb-4 flex gap-2 flex-wrap">
            <button
              className={`px-3 py-2 rounded-lg border ${tab === 'dashboard' ? 'bg-gray-900 text-white' : ''}`}
              onClick={() => setTab('dashboard')}
            >Dashboard</button>
            <button
              className={`px-3 py-2 rounded-lg border ${tab === 'applications' ? 'bg-gray-900 text-white' : ''}`}
              onClick={() => setTab('applications')}
            >Applications</button>
            <button
              className={`px-3 py-2 rounded-lg border ${tab === 'messages' ? 'bg-gray-900 text-white' : ''}`}
              onClick={() => setTab('messages')}
            >Messages</button>
            <button
              className={`px-3 py-2 rounded-lg border ${tab === 'requests' ? 'bg-gray-900 text-white' : ''}`}
              onClick={() => setTab('requests')}
            >Requests</button>
          </div>

          {tab === 'dashboard' && <DashboardSection />}
          {tab === 'applications' && <ApplicationsSection />}
          {tab === 'messages' && <MessagesSection />}
          {tab === 'requests' && <RequestsSection />}
        </main>
      </div>
    </div>
  );
}

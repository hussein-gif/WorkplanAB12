import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import {
  Application,
  ContactMessage,
  TopBar,
  EmptyState as Empty,
  formatDate,
  badgeClass,
  statusLabel,
} from '../shared';
import { Users, MessageSquare, Briefcase, Check } from 'lucide-react';

export default function DashboardSection() {
  const [q, setQ] = useState('');
  const [appsTotal, setAppsTotal] = useState<number | null>(null);
  const [appsHired, setAppsHired] = useState<number | null>(null);
  const [msgsNew, setMsgsNew] = useState<number | null>(null);
  const [reqsActive, setReqsActive] = useState<number | null>(null);
  const [recentApps, setRecentApps] = useState<Array<Pick<Application, 'id' | 'full_name' | 'role_applied' | 'status' | 'created_at'>>>([]);
  const [recentMsgs, setRecentMsgs] = useState<Array<Pick<ContactMessage, 'id' | 'full_name' | 'subject' | 'status' | 'created_at'>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      // Antal
      const appsCount = supabase.from('applications').select('*', { count: 'exact', head: true });
      const hiredCount = supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'hired');

      // Nya meddelanden: ENBART candidate/company
      const newMsgsCount = supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .in('from_type', ['candidate', 'company'])
        .eq('status', 'new');

      // Aktiva förfrågningar: from_type='staffing_request'
      const activeReqsCount = supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('from_type', 'staffing_request');

      // Listor
      const lastApps = supabase
        .from('applications')
        .select('id, full_name, role_applied, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      // Senaste meddelanden: exkludera staffing_request
      const lastMsgs = supabase
        .from('contact_messages')
        .select('id, full_name, subject, status, created_at')
        .in('from_type', ['candidate', 'company'])
        .order('created_at', { ascending: false })
        .limit(5);

      const [
        appsCountRes,
        hiredCountRes,
        newMsgsCountRes,
        activeReqsCountRes,
        lastAppsRes,
        lastMsgsRes,
      ] = await Promise.allSettled([
        appsCount,
        hiredCount,
        newMsgsCount,
        activeReqsCount,
        lastApps,
        lastMsgs,
      ]);

      const getCount = (r: PromiseSettledResult<any>) =>
        r.status === 'fulfilled' && r.value && typeof r.value.count === 'number' ? r.value.count : 0;

      setAppsTotal(getCount(appsCountRes));
      setAppsHired(getCount(hiredCountRes));
      setMsgsNew(getCount(newMsgsCountRes));
      setReqsActive(getCount(activeReqsCountRes));

      setRecentApps(
        lastAppsRes.status === 'fulfilled' && Array.isArray(lastAppsRes.value.data) ? lastAppsRes.value.data : []
      );
      setRecentMsgs(
        lastMsgsRes.status === 'fulfilled' && Array.isArray(lastMsgsRes.value.data) ? lastMsgsRes.value.data : []
      );

      setLoading(false);
    }

    load();
  }, []);

  return (
    <div>
      <TopBar title="Översikt" q={q} setQ={setQ} />

      {/* KPI-kort */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Antal ansökningar</div>
              <div className="text-2xl font-semibold">{appsTotal ?? (loading ? '…' : 0)}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-900 text-white grid place-items-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Nya meddelanden</div>
              <div className="text-2xl font-semibold">{msgsNew ?? (loading ? '…' : 0)}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-900 text-white grid place-items-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Aktiva förfrågningar</div>
              <div className="text-2xl font-semibold">{reqsActive ?? (loading ? '…' : 0)}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-900 text-white grid place-items-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Placeringar (anställda)</div>
              <div className="text-2xl font-semibold">{appsHired ?? (loading ? '…' : 0)}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-900 text-white grid place-items-center">
              <Check className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Listor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6">
          <div className="text-lg font-semibold mb-4">Senaste ansökningar</div>
          {loading ? (
            <div className="text-gray-500">Laddar…</div>
          ) : recentApps.length === 0 ? (
            <Empty title="Inga ansökningar" hint="Visas här när nya kommer in." />
          ) : (
            <div className="space-y-3">
              {recentApps.map((a) => (
                <div key={a.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{a.full_name}</div>
                    <div className="text-sm text-gray-500">{a.role_applied ?? '—'} • {formatDate(a.created_at)}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs ${badgeClass(a.status)}`}>
                    {statusLabel('application', a.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border rounded-xl p-6">
          <div className="text-lg font-semibold mb-4">Senaste meddelanden</div>
          {loading ? (
            <div className="text-gray-500">Laddar…</div>
          ) : recentMsgs.length === 0 ? (
            <Empty title="Inga meddelanden" hint="Visas här när nya kommer in." />
          ) : (
            <div className="space-y-3">
              {recentMsgs.map((m) => (
                <div key={m.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{m.full_name}</div>
                    <div className="text-sm text-gray-500">{m.subject}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs ${badgeClass(m.status)}`}>
                    {statusLabel('message', m.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

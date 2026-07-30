import React from 'react';
import { DashboardSidebar } from '@/components/ui/DashboardSidebar';
import { DashboardHeader } from '@/components/ui/DashboardHeader';
import { AgentTicker } from '@/components/feature/AgentTicker';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900 overflow-x-hidden">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        <AgentTicker />
        <main className="flex-1 p-6 overflow-y-auto max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

import React from 'react';
import { DashboardSidebar } from '@/components/ui/DashboardSidebar';
import { DashboardHeader } from '@/components/ui/DashboardHeader';
import { AgentTicker } from '@/components/feature/AgentTicker';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900 overflow-x-hidden print:bg-white print:min-h-0 print:block">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 print:block print:w-full">
        <DashboardHeader />
        <AgentTicker />
        <main className="flex-1 p-6 overflow-y-auto max-w-[1400px] w-full mx-auto print:p-0 print:m-0 print:max-w-none print:w-full print:block">
          {children}
        </main>
      </div>
    </div>
  );
}

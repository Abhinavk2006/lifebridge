'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLifeBridgeStore } from '@/lib/store';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { 
  Sparkles, 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  Network, 
  Bot, 
  Building2, 
  BarChart3, 
  Sliders, 
  ShieldAlert, 
  Scale, 
  Lock, 
  FileSpreadsheet,
  ChevronDown,
  UserCheck,
  UserX
} from 'lucide-react';

export const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();
  const { cases, activeCaseId, setActiveCaseId } = useLifeBridgeStore();
  const { t } = useLanguage();
  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];

  const navGroups = [
    {
      title: t('nav.group_overview'),
      items: [
        { name: t('nav.mission_control'), href: '/dashboard', icon: LayoutDashboard },
        { name: t('nav.cases_directory'), href: '/dashboard/cases', icon: FolderKanban, badge: cases.length }
      ]
    },
    {
      title: t('nav.group_intelligence'),
      items: [
        { name: t('nav.document_vault'), href: '/dashboard/documents', icon: FileText, badge: '4' },
        { name: t('nav.execution_dag'), href: `/dashboard/cases/${activeCaseId}/dag`, icon: Network },
        { name: t('nav.knowledge_graph'), href: '/dashboard/graph', icon: Network },
        { name: t('nav.agent_mesh'), href: '/dashboard/agents', icon: Bot, badge: t('common.active') }
      ]
    },
    {
      title: t('nav.group_organizations'),
      items: [
        { name: t('nav.institutions_registry'), href: '/dashboard/organizations', icon: Building2, badge: '28' },
        { name: 'Bank Statements & Loans Audit', href: '/dashboard/organizations/banks', icon: FileSpreadsheet, badge: 'NEW' },
        { name: 'Insurance Death Claims Gateway', href: '/dashboard/organizations/insurance', icon: Building2, badge: 'IRDAI' },
        { name: t('nav.negotiation_room'), href: '/dashboard/organizations/org-301', icon: Building2 }
      ]
    },
    {
      title: t('nav.group_command_risk'),
      items: [
        { name: t('nav.financial_liquidity'), href: '/dashboard/analytics', icon: BarChart3 },
        { name: t('nav.scenario_simulation'), href: '/dashboard/simulation', icon: Sliders },
        { name: t('nav.fraud_shield'), href: '/dashboard/risk', icon: ShieldAlert }
      ]
    },
    {
      title: t('nav.group_legal_audit'),
      items: [
        { name: t('nav.legal_audit'), href: '/dashboard/law', icon: Scale },
        { name: t('nav.identity_deactivation'), href: '/dashboard/deactivation', icon: UserX, badge: '5' },
        { name: t('common.export'), href: '/dashboard/audit', icon: Lock },
        { name: t('nav.settings'), href: '/dashboard/settings', icon: Sliders }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col shrink-0 min-h-screen print:hidden">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
          <Sparkles className="w-4 h-4 text-blue-200" />
        </div>
        <div>
          <span className="font-serif text-lg font-bold tracking-tight text-white block">LIFEBRIDGE</span>
          <span className="text-[10px] text-blue-400 font-mono-val font-semibold uppercase tracking-wider">Command Center v2.4</span>
        </div>
      </div>

      {/* Active Case Selector */}
      <div className="p-3 border-b border-slate-800/80 bg-slate-950/60">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 px-1">
          {t('nav.active_estate_case')}
        </label>
        <div className="relative">
          <select 
            value={activeCaseId}
            onChange={(e) => setActiveCaseId(e.target.value)}
            className="w-full bg-slate-800 text-white text-xs font-semibold rounded-lg px-2.5 py-2 pr-8 border border-slate-700 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.deceasedName} ({c.caseNumber.split('-')[0]})
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] px-1 text-slate-400">
          <span>{currentCase.jurisdiction.split('(')[0]}</span>
          <span className="text-emerald-400 font-mono-val font-semibold">{currentCase.progressPercent}% {t('nav.resolved')}</span>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-5 text-xs">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">
              {group.title}
            </h4>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors font-medium ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-sm font-semibold' 
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono-val font-bold ${
                        isActive 
                          ? 'bg-blue-500 text-white' 
                          : item.badge === 'LIVE'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/80'
                            : 'bg-slate-800 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer User Info */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-blue-900 border border-blue-700 flex items-center justify-center text-blue-200 text-xs font-bold">
            EV
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-200">Eleanor Vance</p>
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-emerald-400" /> {t('nav.lead_executor')}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

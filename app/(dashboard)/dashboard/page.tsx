'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { formatINR } from '@/utils/formatters';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  FileText, 
  Network, 
  Bot, 
  Scale, 
  Clock, 
  UserCheck, 
  ExternalLink
} from 'lucide-react';

import { useLanguage } from '@/components/providers/LanguageProvider';

export default function MissionControlPage() {
  const { cases, activeCaseId, institutions, dagNodes, updateInstitutionStatus, updateDAGNodeStatus } = useLifeBridgeStore();
  const { t } = useLanguage();
  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];
  const [actionDoneMessage, setActionDoneMessage] = useState<string | null>(null);

  const handleApproveFeeWaiver = (instId: string, instName: string) => {
    updateInstitutionStatus(instId, 'settled', 45000);
    updateDAGNodeStatus('dag-5', 'completed');
    setActionDoneMessage(`Approved ₹45,000 penalty fee waiver with ${instName} under RBI Master Directions. Claim settled.`);
    setTimeout(() => setActionDoneMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Case Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Legal Heir Fiduciary Command Center</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
              Estate of {currentCase.deceasedName}
            </h1>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-3">
              <span>Case #: <strong className="font-mono-val text-white">{currentCase.caseNumber}</strong></span>
              <span>•</span>
              <span>Bench: <strong>{currentCase.probateCourt}</strong></span>
              <span>•</span>
              <span>Executor: <strong>{currentCase.executorName}</strong></span>
            </p>
          </div>

          {/* Master Resolution Progress */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-300">Master Probate Settlement Progress</span>
              <span className="text-emerald-400 font-mono-val font-bold text-sm">{currentCase.progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${currentCase.progressPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-2 flex items-center justify-between">
              <span>{currentCase.resolvedInstitutionsCount} of {currentCase.institutionsCount} Institutions Resolved</span>
              <span className="text-blue-300 font-medium">3 Weeks Elapsed</span>
            </p>
          </div>
        </div>
      </div>

      {/* Action Done Success Banner */}
      {actionDoneMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{actionDoneMessage}</span>
          </div>
          <span className="text-xs text-emerald-600 font-mono-val">SHA-256 Hash Appended</span>
        </div>
      )}

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-enterprise p-4">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>{t('dashboard.net_estate_val')}</span>
            <span className="font-bold text-blue-600">₹ INR</span>
          </div>
          <p className="font-mono-val text-2xl font-bold text-slate-900">
            {formatINR(currentCase.netEstateValue)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Assets: {formatINR(currentCase.totalAssets)} | Debts: {formatINR(currentCase.totalLiabilities)}
          </p>
        </div>

        <div className="card-enterprise p-4">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>{t('dashboard.institutions_identified')}</span>
            <Building2 className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="font-mono-val text-2xl font-bold text-slate-900">
            {currentCase.institutionsCount} Organizations
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {currentCase.resolvedInstitutionsCount} Settled Autonomously
          </p>
        </div>

        <div className="card-enterprise p-4">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>{t('dashboard.forensic_docs')}</span>
            <FileText className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-mono-val text-2xl font-bold text-slate-900">
            4 / 4 Verified
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Average Authenticity Score: <strong className="text-slate-900">98.6%</strong>
          </p>
        </div>

        <div className="card-enterprise p-4">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>{t('dashboard.pending_approvals')}</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="font-mono-val text-2xl font-bold text-rose-600">
            {currentCase.openActionCount} Action Items
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Requires executor digital signoff
          </p>
        </div>
      </div>

      {/* Main Grid: Priority Actions & Active Case Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Priority Action Feed & DAG Snapshot */}
        <div className="lg:col-span-2 space-y-6">
          {/* Priority Human-in-the-Loop Action Card */}
          <div className="card-enterprise p-5 border-l-4 border-l-amber-500">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <h3 className="font-bold text-slate-900 text-sm">{t('dashboard.hitl_notice')}</h3>
              </div>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded font-mono-val">
                P0 HIGH PRIORITY
              </span>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t('dashboard.sbi_fee_waiver')}</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Negotiation Agent 04 successfully negotiated a waiver of <strong>₹45,000</strong> in account dormant penalties on savings account <strong>#SB-****4912</strong> under RBI Master Directions. Bank compliance requires 1-click executor authorization.
                  </p>
                </div>
                <span className="font-mono-val text-emerald-600 font-bold text-base shrink-0 ml-4">
                  +₹45,000 Saved
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <Bot className="w-3.5 h-3.5 text-blue-600" />
                  <span>Agent Confidence: <strong>96%</strong></span>
                  <span>•</span>
                  <span>Rule: <strong>RBI Deceased Depositor Circular 2026</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleApproveFeeWaiver('org-301', 'State Bank of India (SBI)')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" /> {t('dashboard.approve_waiver')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Execution DAG Task Tree */}
          <div className="card-enterprise p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">{t('dashboard.execution_flight_plan')}</h3>
                <p className="text-xs text-slate-500">{t('dashboard.task_dependencies')}</p>
              </div>
              <Link 
                href={`/dashboard/cases/${activeCaseId}/dag`}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                {t('dashboard.open_full_dag')} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {dagNodes.map((node) => (
                <div 
                  key={node.id}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                    node.status === 'completed'
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                      : node.status === 'action_required'
                        ? 'bg-amber-50 border-amber-200 text-slate-900 font-medium'
                        : node.status === 'in_progress'
                          ? 'bg-blue-50/60 border-blue-200 text-slate-900'
                          : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {node.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    {node.status === 'in_progress' && <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shrink-0" />}
                    {node.status === 'action_required' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />}
                    {node.status === 'pending' && <Clock className="w-4 h-4 text-slate-400 shrink-0" />}

                    <div>
                      <p className="font-semibold text-slate-900">{node.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{node.description}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono-val font-semibold">
                      {node.assignedAgent}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1 capitalize font-medium">{node.status.replace('_', ' ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Active Cases Directory Overview & Knowledge Graph Widget */}
        <div className="space-y-6">
          {/* Active Cases Directory Card */}
          <div className="card-enterprise p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <h3 className="font-serif text-base font-bold text-slate-900">{t('dashboard.active_managed_cases')}</h3>
              <Link href="/dashboard/cases" className="text-xs text-blue-600 font-semibold hover:underline">
                {t('dashboard.view_all')} ({cases.length})
              </Link>
            </div>

            <div className="space-y-3">
              {cases.map((c) => (
                <div 
                  key={c.id}
                  onClick={() => useLifeBridgeStore.getState().setActiveCaseId(c.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    c.id === activeCaseId 
                      ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-500/20' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900">{c.deceasedName}</p>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono-val ${
                      c.status === 'negotiation' 
                        ? 'bg-amber-100 text-amber-800' 
                        : c.status === 'verification'
                          ? 'bg-blue-100 text-blue-800'
                          : c.status === 'settled'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-800'
                    }`}>
                      {c.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{c.jurisdiction.split('(')[0]}</p>
                  <div className="mt-2.5 flex items-center justify-between text-[11px]">
                    <span className="font-mono-val font-semibold text-slate-700">{formatINR(c.netEstateValue)}</span>
                    <span className="text-emerald-600 font-semibold">{c.progressPercent}% Resolved</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Graph Quick View Card */}
          <div className="card-enterprise p-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-blue-400" />
                <h3 className="font-serif text-base font-bold text-white">{t('dashboard.estate_knowledge_graph')}</h3>
              </div>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded font-mono-val">
                28 Nodes
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {t('dashboard.realtime_graph_mapping')}
            </p>

            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 font-mono-val text-[11px] space-y-1.5 text-slate-300">
              <p className="text-blue-300">● [Deceased] Rameshchandra Mehta</p>
              <p className="pl-4 text-slate-400">├── [Legal Heir] Eleanor Mehta Vance (60%)</p>
              <p className="pl-4 text-slate-400">├── [Bank] SBI Savings (₹24,50,000)</p>
              <p className="pl-4 text-slate-400">├── [Insurer] LIC Policy (₹50,00,000)</p>
              <p className="pl-4 text-emerald-400">└── [Pension] EPFO UAN Corpus (₹62,00,000)</p>
            </div>

            <Link
              href="/dashboard/graph"
              className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <span>{t('dashboard.explore_interactive_graph')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Institutional Resolution Table */}
      <div className="card-enterprise p-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900">{t('dashboard.institutional_claims_registry')}</h3>
            <p className="text-xs text-slate-500">{t('dashboard.live_negotiation_status')}</p>
          </div>
          <Link href="/dashboard/organizations" className="text-xs text-blue-600 font-semibold hover:underline">
            {t('dashboard.view_all_institutions')} →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Institution Name</th>
                <th className="py-2.5 px-3">Sector</th>
                <th className="py-2.5 px-3">Account Ref</th>
                <th className="py-2.5 px-3 font-mono-val">Est. Value (INR)</th>
                <th className="py-2.5 px-3">Negotiation Status</th>
                <th className="py-2.5 px-3 font-mono-val">Fee Waiver</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {institutions.map((inst) => (
                <tr key={inst.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900">{inst.name}</td>
                  <td className="py-3 px-3 text-slate-600">{inst.sector}</td>
                  <td className="py-3 px-3 font-mono-val text-slate-600">{inst.accountNumberMasked}</td>
                  <td className="py-3 px-3 font-mono-val font-bold text-slate-900">
                    {formatINR(inst.estimatedValue)}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono-val ${
                      inst.status === 'settled'
                        ? 'bg-emerald-100 text-emerald-800'
                        : inst.status === 'in_negotiation'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : 'bg-slate-100 text-slate-700'
                    }`}>
                      {inst.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono-val text-emerald-600 font-semibold">
                    {inst.feeWaiverAmount > 0 ? `+${formatINR(inst.feeWaiverAmount)}` : '—'}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href={`/dashboard/organizations/${inst.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                    >
                      View Transcript →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

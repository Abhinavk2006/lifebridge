'use client';

import React from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Network, CheckCircle2, AlertTriangle, Clock, Bot } from 'lucide-react';

export default function ExecutionDAGPage() {
  const { cases, activeCaseId, dagNodes } = useLifeBridgeStore();
  const { t } = useLanguage();
  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <Network className="w-4 h-4" />
            <span>{t('dag.title')}</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            {t('dag.flight_plan_title')} — {currentCase.deceasedName}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('dag.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-blue-50 text-blue-800 border border-blue-200 text-xs font-mono-val font-bold px-3 py-1.5 rounded-lg">
            {t('dag.status_active')}
          </span>
          <Link
            href="/dashboard"
            className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ← {t('common.back_to_mission_control')}
          </Link>
        </div>
      </div>

      {/* DAG Explanation Bar */}
      <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <Bot className="w-5 h-5 text-blue-400" />
          <div>
            <p className="font-semibold text-blue-200">{t('dag.controller_title')}</p>
            <p className="text-slate-400 text-[11px]">{t('dag.controller_subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono-val">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 3 {t('common.completed')}</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" /> 1 {t('common.active')}</span>
          <span className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> 1 {t('common.action_needed')}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> 2 {t('common.pending')}</span>
        </div>
      </div>

      {/* Visual Task Dependency Tree */}
      <div className="space-y-4 relative before:absolute before:left-6 before:top-6 before:bottom-6 before:w-0.5 before:bg-slate-200 pl-4">
        {dagNodes.map((node, index) => (
          <div key={node.id} className="relative flex items-start gap-4">
            {/* Step Dot */}
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 z-10 bg-white ${
              node.status === 'completed' 
                ? 'border-emerald-500 text-emerald-600 bg-emerald-50' 
                : node.status === 'in_progress'
                  ? 'border-blue-600 text-blue-600 bg-blue-50 ring-4 ring-blue-100'
                  : node.status === 'action_required'
                    ? 'border-amber-500 text-amber-600 bg-amber-50 ring-4 ring-amber-100'
                    : 'border-slate-300 text-slate-400'
            }`}>
              <span className="text-[10px] font-bold font-mono-val">{index + 1}</span>
            </div>

            {/* Task Card */}
            <div className={`flex-1 card-enterprise p-4 transition-all ${
              node.status === 'action_required' ? 'border-amber-300 ring-2 ring-amber-500/20' : ''
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-sm text-slate-900">{node.title}</span>
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-mono-val px-2 py-0.5 rounded border border-slate-200">
                    {node.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">{t('dag.assigned_agent')}:</span>
                  <span className="font-semibold text-blue-600 font-mono-val bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {node.assignedAgent}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600">{node.description}</p>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <span>{t('dag.prerequisites')}: <strong className="text-slate-700 font-mono-val">{node.dependencies.length > 0 ? node.dependencies.join(', ') : 'None (Root Node)'}</strong></span>
                  <span>{t('dag.est_duration')}: <strong className="text-slate-700 font-mono-val">{node.estimatedDays} {t('dag.days')}</strong></span>
                </div>

                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono-val ${
                  node.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : node.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800 animate-pulse'
                      : node.status === 'action_required'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                }`}>
                  {node.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

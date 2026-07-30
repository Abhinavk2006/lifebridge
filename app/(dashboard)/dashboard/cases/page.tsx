'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { formatINR } from '@/utils/formatters';
import { FolderKanban, Search, Plus, Filter, ArrowRight, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export default function CasesDirectoryPage() {
  const { cases, setActiveCaseId } = useLifeBridgeStore();
  const [filter, setFilter] = useState<'all' | 'negotiation' | 'verification' | 'settled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCases = cases.filter(
    (c) =>
      (filter === 'all' || c.status === filter) &&
      (c.deceasedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Estate Probate Cases Directory</h1>
          <p className="text-xs text-slate-500 mt-1">Multi-case command center for legal heirs, executors, and advocates</p>
        </div>
        <Link 
          href="/dashboard/cases/new"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Initialize New Estate Case
        </Link>
      </div>

      {/* Tab Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(['all', 'negotiation', 'verification', 'settled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filter === tab 
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'all' ? 'All Active Cases' : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cases by name/PAN..."
            className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCases.map((c) => (
          <div key={c.id} className="card-enterprise p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono-val font-bold text-slate-400 uppercase tracking-wider">
                  Case ID: {c.caseNumber}
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-0.5">
                  {c.deceasedName}
                </h3>
                <p className="text-xs text-slate-500">{c.jurisdiction}</p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono-val ${
                c.status === 'settled'
                  ? 'bg-emerald-100 text-emerald-800'
                  : c.status === 'negotiation'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-100 text-blue-800'
              }`}>
                {c.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Net Value</span>
                <span className="font-mono-val font-bold text-slate-900">{formatINR(c.netEstateValue)}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Institutions</span>
                <span className="font-bold text-slate-900">{c.resolvedInstitutionsCount}/{c.institutionsCount} Done</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Lead Advocate</span>
                <span className="font-semibold text-slate-700 truncate block">{c.primaryAttorney}</span>
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium mb-1">
                <span className="text-slate-500">Settlement Progress</span>
                <span className="font-mono-val text-emerald-600 font-bold">{c.progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${c.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono-val">Updated: {c.updatedAt}</span>
              <Link
                href="/dashboard"
                onClick={() => setActiveCaseId(c.id)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Load in Mission Control</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="card-enterprise p-12 text-center text-slate-400 text-xs">
          No estate cases found matching "{searchQuery}".
        </div>
      )}
    </div>
  );
}

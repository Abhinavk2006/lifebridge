'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { formatINR } from '@/utils/formatters';
import { Building2, ArrowRight, ShieldCheck, Search, Filter } from 'lucide-react';

export default function OrganizationsDirectoryPage() {
  const { institutions } = useLifeBridgeStore();
  const [filterSector, setFilterSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInsts = institutions.filter(
    (inst) =>
      (filterSector === 'all' || inst.sector === filterSector) &&
      (inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.accountNumberMasked.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Organizations & Institutional Registry</h1>
          <p className="text-xs text-slate-500 mt-1">RBI-regulated banks, IRDAI insurers, EPFO pension trusts, and municipal discoms</p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/organizations/banks" className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors">
            Banks (RBI)
          </Link>
          <Link href="/dashboard/organizations/insurance" className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors">
            Insurers (IRDAI)
          </Link>
          <Link href="/dashboard/organizations/government" className="px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition-colors">
            Govt / EPFO
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {['all', 'Banking', 'Insurance', 'Pension', 'Utilities', 'Government'].map((sector) => (
            <button
              key={sector}
              onClick={() => setFilterSector(sector)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterSector === sector
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sector === 'all' ? 'All Sectors' : sector}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search institution or account..."
            className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInsts.map((inst) => (
          <div key={inst.id} className="card-enterprise p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono-val font-bold text-blue-600 uppercase tracking-wider">
                  {inst.sector}
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-900 mt-0.5">{inst.name}</h3>
                <p className="text-xs text-slate-500 font-mono-val">{inst.accountNumberMasked}</p>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono-val ${
                inst.status === 'settled'
                  ? 'bg-emerald-100 text-emerald-800'
                  : inst.status === 'in_negotiation'
                    ? 'bg-amber-100 text-amber-800 animate-pulse'
                    : 'bg-slate-100 text-slate-700'
              }`}>
                {inst.status.toUpperCase()}
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Verified Balance</span>
                <span className="font-mono-val font-bold text-slate-900">{formatINR(inst.estimatedValue)}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Fee Saved</span>
                <span className="font-mono-val font-bold text-emerald-600">+{formatINR(inst.feeWaiverAmount)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono-val">Claim: {inst.claimId}</span>
              <Link
                href={`/dashboard/organizations/${inst.id}`}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>View Negotiation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredInsts.length === 0 && (
        <div className="card-enterprise p-12 text-center text-slate-400 text-xs">
          No institutions found matching "{searchQuery}".
        </div>
      )}
    </div>
  );
}

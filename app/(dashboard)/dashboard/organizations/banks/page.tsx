'use client';

import React from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { formatINR } from '@/utils/formatters';
import { Building2, ArrowLeft, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function BankingOrganizationsPage() {
  const { institutions } = useLifeBridgeStore();
  const bankInsts = institutions.filter((i) => i.sector === 'Banking');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/organizations" className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <Building2 className="w-4 h-4" /> RBI Regulated Banking Directory
            </div>
            <h1 className="font-serif text-2xl font-bold text-slate-900">Banking Institutions Registry</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bankInsts.map((inst) => (
          <div key={inst.id} className="card-enterprise p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono-val font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  RBI REGULATED
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">{inst.name}</h3>
                <p className="text-xs text-slate-500">Account #{inst.accountNumberMasked} • {inst.accountType}</p>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono-val ${
                inst.status === 'settled' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {inst.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Verified Balance</span>
                <span className="font-mono-val font-bold text-slate-900">{formatINR(inst.estimatedValue)}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Fee Waiver Value</span>
                <span className="font-mono-val font-bold text-emerald-600">+{formatINR(inst.feeWaiverAmount)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono-val">Claim ID: {inst.claimId}</span>
              <Link
                href={`/dashboard/organizations/${inst.id}`}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Open Negotiation Transcript</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

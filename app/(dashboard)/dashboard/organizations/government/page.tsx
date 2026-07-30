'use client';

import React from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { formatINR } from '@/utils/formatters';
import { Scale, ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';

export default function GovernmentOrganizationsPage() {
  const { institutions } = useLifeBridgeStore();
  const govInsts = institutions.filter((i) => i.sector === 'Government' || i.sector === 'Pension');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/organizations" className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
              <Scale className="w-4 h-4" /> EPFO, NPS & Income Tax Dept Registry
            </div>
            <h1 className="font-serif text-2xl font-bold text-slate-900">Government & Pension Bodies Directory</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {govInsts.map((inst) => (
          <div key={inst.id} className="card-enterprise p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono-val font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  STATUTORY BODY
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">{inst.name}</h3>
                <p className="text-xs text-slate-500">Ref #{inst.accountNumberMasked} • {inst.accountType}</p>
              </div>

              <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono-val">
                {inst.status.toUpperCase()}
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs flex items-center justify-between">
              <span className="text-slate-500">Claim Corpus / Benefit Value:</span>
              <span className="font-mono-val font-bold text-indigo-700 text-base">{formatINR(inst.estimatedValue)}</span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono-val">Claim ID: {inst.claimId}</span>
              <Link
                href={`/dashboard/organizations/${inst.id}`}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>View Legal Clearance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

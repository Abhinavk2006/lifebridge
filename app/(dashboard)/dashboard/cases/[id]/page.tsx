'use client';

import React from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { formatINR } from '@/utils/formatters';
import { ArrowLeft, Building2, Network, FileText, ShieldCheck, CheckCircle2, DollarSign, Scale, UserCheck } from 'lucide-react';

export default function CaseDetailsPage({ params }: { params: { id: string } }) {
  const { cases, setActiveCaseId } = useLifeBridgeStore();
  const caseItem = cases.find((c) => c.id === params.id) || cases[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/cases" className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <Scale className="w-4 h-4" /> Estate Probate Case Profile
            </div>
            <h1 className="font-serif text-2xl font-bold text-slate-900">Estate of {caseItem.deceasedName}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/cases/${caseItem.id}/dag`}
            onClick={() => setActiveCaseId(caseItem.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Network className="w-4 h-4" /> View Execution DAG
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 card-enterprise p-6 space-y-5">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Estate Summary & Jurisdiction Detail
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-slate-400 text-[10px] block">Deceased PAN & Aadhaar</span>
              <span className="font-mono-val font-bold text-slate-900">{caseItem.ssnMasked}</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-slate-400 text-[10px] block">Case Docket Number</span>
              <span className="font-mono-val font-bold text-slate-900">{caseItem.caseNumber}</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-slate-400 text-[10px] block">Jurisdiction Bench</span>
              <span className="font-semibold text-slate-900">{caseItem.jurisdiction}</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-slate-400 text-[10px] block">Fiduciary Lead</span>
              <span className="font-semibold text-slate-900">{caseItem.executorName} ({caseItem.executorRole})</span>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Net Estate Valuation (INR)</span>
              <span className="text-emerald-400 font-mono-val font-bold">{caseItem.progressPercent}% Resolved</span>
            </div>
            <p className="font-mono-val text-3xl font-bold">{formatINR(caseItem.netEstateValue)}</p>
            <p className="text-[11px] text-slate-400">
              Gross Assets: {formatINR(caseItem.totalAssets)} | Total Liabilities: {formatINR(caseItem.totalLiabilities)}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-enterprise p-5 space-y-4">
            <h3 className="font-serif text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Action Quick Links
            </h3>
            <div className="space-y-2 text-xs">
              <Link
                href="/dashboard/documents"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 font-semibold text-slate-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" /> Document Vault
                </span>
                <span>4 PDFs</span>
              </Link>
              <Link
                href="/dashboard/organizations"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 font-semibold text-slate-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-600" /> Institutions Registry
                </span>
                <span>{caseItem.institutionsCount} Orgs</span>
              </Link>
              <Link
                href="/dashboard/audit"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 font-semibold text-slate-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Audit Ledger
                </span>
                <span>SHA-256</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

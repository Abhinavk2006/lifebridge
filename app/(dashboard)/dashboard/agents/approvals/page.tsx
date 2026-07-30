'use client';

import React, { useState } from 'react';
import { useLifeBridgeStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { AlertTriangle, CheckCircle2, Bot, ShieldCheck, DollarSign, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ApprovalsQueuePage() {
  const { institutions, updateInstitutionStatus, updateDAGNodeStatus } = useLifeBridgeStore();
  const { toast } = useToast();

  const [approvedIds, setApprovedIds] = useState<string[]>([]);

  const handleApprove = (instId: string, instName: string) => {
    updateInstitutionStatus(instId, 'settled', 450);
    updateDAGNodeStatus('dag-5', 'completed');
    setApprovedIds((prev) => [...prev, instId]);
    toast('Approval Granted!', `Approved $450 fee waiver with ${instName}. Audit log ledger appended.`, 'success');
  };

  const pendingApprovals = institutions.filter(i => i.status === 'in_negotiation' && !approvedIds.includes(i.id));

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>High Priority Approvals Queue</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Executor Action Required</h1>
          <p className="text-xs text-slate-500 mt-1">Review AI agent recommendations and authorize statutory actions</p>
        </div>
        <Link
          href="/dashboard"
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          Return to Mission Control <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-4">
        {pendingApprovals.map((inst) => (
          <div key={inst.id} className="card-enterprise p-5 border-l-4 border-l-amber-500 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded font-mono-val">
                  ACTION REQUIRED
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">{inst.name} Maintenance Fee Waiver</h3>
                <p className="text-xs text-slate-500">Account #{inst.accountNumberMasked} • {inst.sector} Sector</p>
              </div>

              <div className="text-right">
                <span className="font-mono-val font-bold text-emerald-600 text-lg block">+$450 Waiver</span>
                <span className="text-[10px] text-slate-400">Claim ID: {inst.claimId}</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-700 space-y-2">
              <p className="font-semibold text-slate-900">Agent Recommendation Reasoning:</p>
              <p className="text-slate-600 leading-relaxed">
                Negotiation Agent 04 engaged {inst.name} claims division. The bank agreed to waive $450 in accrued monthly maintenance penalties accrued during estate freeze, pending executor digital signoff.
              </p>
              <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                <span className="flex items-center gap-1 text-blue-600 font-semibold">
                  <Bot className="w-3.5 h-3.5" /> Negotiation Agent 04
                </span>
                <span>Confidence Score: <strong>96.4%</strong></span>
                <span>Statute: <strong>NY EPTL § 11-1.1</strong></span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-[11px] text-slate-400 font-mono-val">
                SHA-256 Ledger Target: a4f91b92c81d...
              </div>

              <button
                onClick={() => handleApprove(inst.id, inst.name)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve Fee Waiver & Execute Settlement
              </button>
            </div>
          </div>
        ))}

        {pendingApprovals.length === 0 && (
          <div className="card-enterprise p-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-slate-900">All Approvals Completed!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are currently zero pending approval items. All institutional claims are proceeding autonomously.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg mt-2"
            >
              Return to Mission Control
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

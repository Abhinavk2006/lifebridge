'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { formatINR } from '@/utils/formatters';
import { Building2, Bot, CheckCircle2, FileText, Send, ShieldCheck, ArrowLeft, DollarSign, Clock } from 'lucide-react';

export default function NegotiationRoomPage() {
  const { institutions, updateInstitutionStatus } = useLifeBridgeStore();
  const { toast } = useToast();
  const inst = institutions[0] || {
    id: 'org-301',
    name: 'State Bank of India (SBI)',
    sector: 'Banking',
    accountNumberMasked: 'SB-****4912',
    estimatedValue: 2450000,
    accountType: 'Premier Savings & Term Deposit',
    status: 'in_negotiation',
    contactPerson: 'Fiduciary & Claims Desk (Mumbai Main)',
    lastContactDate: '2026-07-30 08:45',
    feeWaiverAmount: 45000,
    sopRequirements: ['Certified Death Certificate', 'Legal Heir Certificate', 'Form ISR-1 (KYC Update)', 'NOC from Heirs'],
    claimId: 'CLM-SBI-9921'
  };

  const [messages, setMessages] = useState([
    {
      id: 'm-1',
      sender: 'Agent',
      senderName: 'Negotiation Agent 04',
      timestamp: '2026-07-29 10:14 AM',
      content: 'Dispatched automated Notice of Fiduciary Claim & Form ISR-1 KYC Update packet for savings account #SB-****4912 under High Court Case #MH-2026-004921.',
      attachedDoc: 'Legal_Heir_Certificate_Bombay_High_Court.pdf'
    },
    {
      id: 'm-2',
      sender: 'Institution',
      senderName: 'State Bank of India (SBI) Fiduciary Ops (Ref: CLM-SBI-9921)',
      timestamp: '2026-07-29 02:45 PM',
      content: 'Notice received. Account frozen per RBI guidelines. Savings balance verified at ₹24,50,000. Account accrued ₹45,000 in dormant account maintenance penalties over the past 60 days.',
      attachedDoc: 'SBI_Account_Ledger_Statement.pdf'
    },
    {
      id: 'm-3',
      sender: 'Agent',
      senderName: 'Negotiation Agent 04',
      timestamp: '2026-07-30 08:30 AM',
      content: 'Invoked RBI Master Directions on Settlement of Claims in Respect of Deceased Depositors (DBOD.No.Leg.BC.95/09.07.005/2004-05) demanding waiver of dormant penalty fees for accounts undergoing legal heir intake.',
      attachedDoc: 'RBI_Statutory_Fee_Waiver_Brief.pdf'
    },
    {
      id: 'm-4',
      sender: 'Institution',
      senderName: 'State Bank of India (SBI) Fiduciary Ops',
      timestamp: '2026-07-30 08:45 AM',
      content: 'RBI Master Direction cited. State Bank of India agrees to waive ₹45,000 in penalty charges upon 1-click digital authorization by Lead Executor Eleanor Vance.',
      attachedDoc: 'SBI_Fee_Waiver_Release_Form.pdf'
    }
  ]);

  const [settled, setSettled] = useState(false);

  const handleSettle = () => {
    updateInstitutionStatus(inst.id, 'settled', 45000);
    setSettled(true);
    toast('Claim Settled!', `Approved ₹45,000 fee waiver with State Bank of India. Claim marked as Settled.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/organizations" className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <Building2 className="w-4 h-4" /> Autonomous Institution Negotiation Room
            </div>
            <h1 className="font-serif text-2xl font-bold text-slate-900">{inst.name}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-amber-100 text-amber-800 text-xs font-bold font-mono-val px-3 py-1.5 rounded-lg border border-amber-200">
            {settled ? 'STATUS: SETTLED' : 'STATUS: WAIVER PENDING'}
          </span>
        </div>
      </div>

      {/* Main Grid: Live Dialogue Transcript & Bank Meta */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Negotiation Dialogue Transcript */}
        <div className="lg:col-span-2 card-enterprise p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-slate-900">Live Agent Negotiation Transcript</h3>
            <span className="text-xs text-slate-400 font-mono-val">Claim ID: {inst.claimId}</span>
          </div>

          <div className="space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`p-4 rounded-xl border text-xs space-y-2 ${
                  msg.sender === 'Agent' 
                    ? 'bg-blue-50/70 border-blue-200 text-slate-900 ml-4' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 mr-4'
                }`}
              >
                <div className="flex items-center justify-between font-semibold border-b border-slate-200/60 pb-1.5">
                  <span className="flex items-center gap-1.5 text-slate-900 font-bold">
                    {msg.sender === 'Agent' ? <Bot className="w-4 h-4 text-blue-600" /> : <Building2 className="w-4 h-4 text-slate-600" />}
                    {msg.senderName}
                  </span>
                  <span className="text-slate-400 text-[10px] font-mono-val">{msg.timestamp}</span>
                </div>

                <p className="leading-relaxed text-slate-700">{msg.content}</p>

                {msg.attachedDoc && (
                  <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded text-[11px] font-mono-val text-blue-700 font-semibold mt-1">
                    <FileText className="w-3.5 h-3.5" /> Attached: {msg.attachedDoc}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Callout inside Negotiation Room */}
          {!settled && (
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-blue-200">Executor Sign-Off Required to Settle</p>
                <p className="text-xs text-slate-300">Authorize State Bank of India ₹45,000 penalty fee waiver and close claim.</p>
              </div>
              <button
                onClick={handleSettle}
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" /> Authorize & Settle Claim
              </button>
            </div>
          )}
        </div>

        {/* Right Col: Institution SOP & Meta */}
        <div className="space-y-6">
          <div className="card-enterprise p-5 space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Institution Overview
            </h3>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block">Account Balance</span>
                <span className="font-mono-val font-bold text-slate-900 text-lg">{formatINR(inst.estimatedValue)}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block">Fee Waiver Value</span>
                <span className="font-mono-val font-bold text-emerald-600 text-base">+{formatINR(inst.feeWaiverAmount || 45000)} Waived</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block mb-1">Required SOP Documents</span>
                <ul className="space-y-1 text-slate-700">
                  {inst.sopRequirements.map((sop, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {sop}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ShieldCheck, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';

export default function RiskPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Identity Theft & Account Takeover Guard</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Fraud Shield & Fiduciary Risk Monitor</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time surveillance protecting estate assets against fraudulent account claims</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-enterprise p-5 border-l-4 border-l-emerald-500">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Forgery Risk Score</span>
          <p className="font-mono-val text-3xl font-bold text-emerald-600">0.0% Risk</p>
          <p className="text-xs text-slate-500 mt-2">Zero anomalous seal scans detected</p>
        </div>

        <div className="card-enterprise p-5 border-l-4 border-l-emerald-500">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Account Takeover Shield</span>
          <p className="font-mono-val text-3xl font-bold text-emerald-600">SECURE</p>
          <p className="text-xs text-slate-500 mt-2">28 Accounts Frozen & Monitored</p>
        </div>

        <div className="card-enterprise p-5 border-l-4 border-l-emerald-500">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Fiduciary Audit Compliance</span>
          <p className="font-mono-val text-3xl font-bold text-emerald-600">100% Compliant</p>
          <p className="text-xs text-slate-500 mt-2">Zero breaches of executor duty</p>
        </div>
      </div>
    </div>
  );
}

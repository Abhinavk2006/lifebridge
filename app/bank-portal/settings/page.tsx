"use client";

import React from "react";
import { Settings, ShieldCheck, UserCheck, Lock } from "lucide-react";

export default function BankPortalSettingsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-[#1E2761] text-xs font-mono font-semibold uppercase tracking-wider mb-1">
          <Settings className="w-4 h-4 text-[#E8B04B]" />
          <span>Compliance Policy & System Configuration</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2761] tracking-tight">
          Compliance & Officer Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage B2B portal authorization rules, HITL friction thresholds, and compliance parameters.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <h3 className="font-serif font-bold text-base text-[#1E2761] flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#E8B04B]" />
          <span>Human-in-the-Loop Threshold Configuration</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-800 block">
              HITL Approval Threshold Amount (INR)
            </label>
            <input
              type="text"
              defaultValue="₹10,000"
              disabled
              className="w-full bg-slate-100 border border-slate-300 rounded-lg p-2.5 font-mono text-slate-800"
            />
            <p className="text-[11px] text-slate-500">
              Any claim above ₹10,000 requires dual officer sign-off and mandatory compliance comments.
            </p>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-800 block">
              AI Forensic Verification Threshold
            </label>
            <input
              type="text"
              defaultValue="90.0%"
              disabled
              className="w-full bg-slate-100 border border-slate-300 rounded-lg p-2.5 font-mono text-slate-800"
            />
            <p className="text-[11px] text-slate-500">
              Documents scoring below 90% confidence are automatically flagged for manual officer inspection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

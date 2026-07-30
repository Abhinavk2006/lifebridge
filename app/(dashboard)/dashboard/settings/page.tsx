'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import { Sliders, ShieldCheck, Lock, Bell, CheckCircle2, Scale, UserCheck } from 'lucide-react';

export default function SettingsPage() {
  const { toast } = useToast();

  const [settingsState, setSettingsState] = useState({
    autoWaiverLimit: '50000',
    rbiComplianceMode: true,
    epfoIntegration: true,
    auditTrailSigning: true,
    emailAlerts: true
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Settings Saved!', 'Fiduciary compliance and API integration parameters updated.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
          <Sliders className="w-4 h-4" />
          <span>Fiduciary Command & System Configurations</span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-slate-900">System & Compliance Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage RBI guidelines, auto-waiver thresholds, and security keys</p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        <div className="card-enterprise p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" /> Statutory Compliance & Fee Waiver Controls
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Auto-Negotiation Fee Waiver Cap (INR ₹)</label>
              <input
                type="number"
                value={settingsState.autoWaiverLimit}
                onChange={(e) => setSettingsState({ ...settingsState, autoWaiverLimit: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono-val focus:outline-none focus:border-blue-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">Waivers below ₹50,000 auto-negotiated under RBI Master Directions.</p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="font-semibold text-slate-900">RBI Master Directions Mode</p>
                <p className="text-[10px] text-slate-500">Enforce 2026 RBI Deceased Depositors Claims SOP</p>
              </div>
              <input
                type="checkbox"
                checked={settingsState.rbiComplianceMode}
                onChange={(e) => setSettingsState({ ...settingsState, rbiComplianceMode: e.target.checked })}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="card-enterprise p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600" /> Security & Cryptographic Audit Ledger
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="font-semibold text-slate-900">SHA-256 Ledger Auto-Signing</p>
                <p className="text-[10px] text-slate-500">Cryptographically hash every agent decision for High Court filing</p>
              </div>
              <input
                type="checkbox"
                checked={settingsState.auditTrailSigning}
                onChange={(e) => setSettingsState({ ...settingsState, auditTrailSigning: e.target.checked })}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" /> Save System Settings
          </button>
        </div>
      </form>
    </div>
  );
}

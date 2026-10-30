'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import { Sliders, ShieldCheck, Lock, Bell, CheckCircle2, Scale, UserCheck } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function SettingsPage() {
  const { toast } = useToast();
  const { t } = useLanguage();

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
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
          <Sliders className="w-4 h-4" />
          <span>{t('nav.settings')}</span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-slate-900">{t('settings.title')}</h1>
        <p className="text-xs text-slate-500 mt-0.5">{t('settings.subtitle')}</p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" />
            <span>{t('settings.statutory_controls')}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">{t('settings.auto_waiver_cap')}</label>
              <input
                type="number"
                value={settingsState.autoWaiverLimit}
                onChange={(e) => setSettingsState({ ...settingsState, autoWaiverLimit: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono focus:outline-none focus:border-blue-500 font-bold"
              />
              <p className="text-[10px] text-slate-400 mt-1">Waivers below ₹50,000 auto-negotiated under RBI Master Directions.</p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="font-semibold text-slate-900">{t('settings.rbi_mode')}</p>
                <p className="text-[10px] text-slate-500">{t('settings.rbi_desc')}</p>
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

        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            <span>{t('settings.security_title')}</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="font-semibold text-slate-900">{t('settings.sha256_autosign')}</p>
                <p className="text-[10px] text-slate-500">{t('settings.sha256_desc')}</p>
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
            className="px-6 py-2.5 bg-[#004c8c] hover:bg-[#002b49] text-white font-bold text-xs font-mono rounded-xl transition flex items-center gap-2 shadow-sm cursor-pointer uppercase tracking-wider"
          >
            <CheckCircle2 className="w-4 h-4 text-[#B8935B]" />
            <span>{t('settings.save_btn')}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

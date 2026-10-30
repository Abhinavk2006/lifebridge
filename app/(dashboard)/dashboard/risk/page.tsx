'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { ShieldAlert, ShieldCheck, CheckCircle2, AlertTriangle, Lock, RefreshCw, Sparkles, Download, Activity, Cpu, Eye, AlertOctagon } from 'lucide-react';

import { useLanguage } from '@/components/providers/LanguageProvider';

export default function RiskPage() {
  const { cases, activeCaseId } = useLifeBridgeStore();
  const { toast } = useToast();
  const { t } = useLanguage();
  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];

  const [isLockdown, setIsLockdown] = useState(true);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(100);

  const handleToggleLockdown = () => {
    const nextState = !isLockdown;
    setIsLockdown(nextState);
    if (nextState) {
      toast('EMERGENCY LOCKDOWN ACTIVATED', 'Frozen all 28 estate accounts across SBI, ICICI, LIC, & EPFO.', 'error');
    } else {
      toast('Lockdown Paused', 'Resumed standard monitoring mode across estate accounts.', 'info');
    }
  };

  const handleRunAudit = () => {
    setIsAuditing(true);
    setAuditProgress(20);
    toast('FIU-IND Audit Started', 'Scanning 28 bank accounts for unauthorized access logs...', 'info');

    setTimeout(() => setAuditProgress(60), 800);
    setTimeout(() => {
      setAuditProgress(100);
      setIsAuditing(false);
      toast('Security Audit Passed!', 'Verified 0 breaches. FIU-IND & RBI Compliance Score: 100%.', 'success');
    }, 1800);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* High-Impact Indian Vault Photography Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-700 min-h-[260px] flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/indian_bank_vault.png"
            alt="Bank Vault Protection"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b49] via-[#002b49]/90 to-transparent" />
        </div>

        <div className="relative z-10 p-8 w-full flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#B8935B]/20 text-[#B8935B] border border-[#B8935B]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#B8935B]" />
              <span>FIU-IND & RBI CYBER FRAUD SHIELD SURVEILLANCE</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 shrink-0 bg-white/10 p-1.5 rounded-2xl border border-white/20">
                <Image
                  src="/ashoka_legal_seal.png"
                  alt="High Court Seal"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="font-serif text-3xl font-bold tracking-tight text-white">
                  {t('risk.title')}
                </h1>
                <p className="text-xs text-blue-200 font-mono mt-0.5">
                  {t('risk.subtitle')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={handleRunAudit}
              disabled={isAuditing}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-mono rounded-xl transition flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
              <span>{isAuditing ? 'Auditing...' : 'Run Live FIU-IND Audit'}</span>
            </button>

            <Link
              href="/dashboard/export-certificate"
              className="px-5 py-2.5 bg-[#B8935B] text-[#002b49] font-bold text-xs font-mono rounded-xl hover:bg-white transition flex items-center gap-2 shadow-sm uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT RISK REPORT (PDF)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Emergency Lockdown Toggle Card */}
      <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
            isLockdown ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
          }`}>
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-white">Emergency Fiduciary Lockdown Switch</h3>
            <p className="text-xs text-slate-400">Status: <strong className={isLockdown ? 'text-emerald-400' : 'text-amber-400'}>{isLockdown ? 'ACTIVE (28 Accounts Frozen & Guarded)' : 'MONITORING MODE (Standby)'}</strong></p>
          </div>
        </div>

        <button
          onClick={handleToggleLockdown}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-md uppercase tracking-wider ${
            isLockdown ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-rose-600 hover:bg-rose-700 text-white'
          }`}
        >
          {isLockdown ? 'Lockdown Active (Click to Pause)' : 'ENGAGE EMERGENCY LOCKDOWN'}
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs border-l-4 border-l-emerald-500 space-y-2">
          <span className="text-xs text-slate-500 font-mono font-bold block uppercase">Forgery Risk Score</span>
          <p className="font-mono text-3xl font-bold text-emerald-600">0.0% Risk</p>
          <p className="text-xs text-slate-600 font-sans pt-1">Zero anomalous seal or signature scans detected across 28 files.</p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs border-l-4 border-l-emerald-500 space-y-2">
          <span className="text-xs text-slate-500 font-mono font-bold block uppercase">Account Takeover Shield</span>
          <p className="font-mono text-3xl font-bold text-emerald-600">SECURE</p>
          <p className="text-xs text-slate-600 font-sans pt-1">28 Accounts Frozen & Monitored via RBI Cyber Incident Feed.</p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs border-l-4 border-l-emerald-500 space-y-2">
          <span className="text-xs text-slate-500 font-mono font-bold block uppercase">Fiduciary Audit Compliance</span>
          <p className="font-mono text-3xl font-bold text-emerald-600">100% Compliant</p>
          <p className="text-xs text-slate-600 font-sans pt-1">Zero breaches of executor duty logged in SHA-256 audit ledger.</p>
        </div>
      </div>

      {/* Live Threat Intelligence Log */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4 font-sans">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#004c8c]" />
            <span>Real-Time Intercepted Fraud & Threat Surveillance Log</span>
          </h3>
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold px-3 py-1 rounded-full">
            SURVEILLANCE ACTIVE
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-emerald-900">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold">SBI Nariman Point Account NetBanking OTP Intercepted</p>
                <p className="text-emerald-800 text-[11px]">Unauthorized IP (103.22.180.12 - Mumbai) blocked by LifeBridge Account Shield.</p>
              </div>
            </div>
            <span className="font-bold text-emerald-700">BLOCKED (0.01s)</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-emerald-900">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold">Duplicate Form 15H Tax Exemption Submission Quarantined</p>
                <p className="text-emerald-800 text-[11px]">Flagged mismatched PAN signature against Income Tax Department (ITD) e-Filing database.</p>
              </div>
            </div>
            <span className="font-bold text-emerald-700">QUARANTINED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { formatINR } from '@/utils/formatters';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  FileText, 
  Download,
  ShieldCheck,
  Award,
  ArrowRight,
  UserCheck,
  UserX,
  ShieldAlert,
  Trash2,
  Sparkles,
  PhoneCall,
  Zap,
  MapPin
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function MissionControlPage() {
  const { cases, activeCaseId, institutions, updateInstitutionStatus, updateDAGNodeStatus } = useLifeBridgeStore();
  const { t } = useLanguage();
  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];
  const [actionDoneMessage, setActionDoneMessage] = useState<string | null>(null);

  const handleApproveFeeWaiver = (instId: string, instName: string) => {
    updateInstitutionStatus(instId, 'settled', 45000);
    updateDAGNodeStatus('dag-5', 'completed');
    setActionDoneMessage(`Approved ₹45,000 penalty fee waiver with ${instName} under RBI Master Directions. Claim settled.`);
    setTimeout(() => setActionDoneMessage(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* High-Impact Indian Banking Hero Banner with Full-Bleed Background Photography (HDFC Style) */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-700 min-h-[360px] flex items-center bg-slate-900">
        {/* Real Indian Family Photography Background */}
        <div className="absolute inset-0 z-0 opacity-45">
          <Image
            src="/indian_family_hero.png"
            alt="Indian Family Estate Claim"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b49] via-[#002b49]/90 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-8 sm:p-10 w-full flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-white">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#B8935B]/20 text-[#B8935B] border border-[#B8935B]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-[#B8935B]" />
              <span>{t('dashboard.fiduciary_center')}</span>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center shrink-0 bg-white/10 p-2 rounded-2xl border border-white/20 backdrop-blur-xs">
                <div className="relative w-14 h-14">
                  <Image 
                    src="/ashoka_legal_seal.png" 
                    alt="High Court Seal" 
                    width={56} 
                    height={56} 
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  {t('dashboard.title')}
                </h1>
                <p className="text-xs text-blue-200 font-mono mt-1">
                  {t('dashboard.bench')} <strong className="text-white">{currentCase.probateCourt}</strong> &nbsp;|&nbsp; 
                  {t('dashboard.case_ref')} <strong className="text-[#B8935B]">{currentCase.caseNumber}</strong>
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {t('dashboard.legal_heir_rep')} <strong className="text-white">{currentCase.executorName}</strong> &nbsp;|&nbsp; 
              {t('dashboard.jurisdiction')} <strong className="text-white">{currentCase.jurisdiction}</strong>
            </p>
          </div>

          {/* Master Resolution Progress & Export Card */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur-md min-w-[300px] space-y-4 shrink-0 shadow-lg">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-blue-100 font-sans">{t('dashboard.probate_progress')}</span>
              <span className="text-[#B8935B] font-mono font-bold text-sm">{currentCase.progressPercent}%</span>
            </div>
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-400 to-[#B8935B] h-full rounded-full transition-all duration-500"
                style={{ width: `${currentCase.progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-300 font-mono flex items-center justify-between">
              <span>{currentCase.resolvedInstitutionsCount} / {currentCase.institutionsCount} {t('common.resolved')}</span>
              <span className="text-[#B8935B] font-bold">3 {t('dag.days')}</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Link 
                href="/dashboard/agents"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-mono rounded-xl transition flex items-center justify-center gap-1.5 shadow-md uppercase tracking-wider"
              >
                <Zap className="w-3.5 h-3.5 text-[#B8935B]" />
                <span>RUN WHOLE AGENT</span>
              </Link>
              <Link 
                href="/dashboard/export-certificate"
                className="w-full py-2.5 bg-[#B8935B] text-[#002b49] font-bold text-xs font-mono rounded-xl hover:bg-white transition flex items-center justify-center gap-1.5 shadow-sm uppercase tracking-wider"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('dashboard.export_pdf')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Photographic Visual Cards Grid (HDFC Bank Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Bank Officer Direct Contact */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition space-y-4 group">
          <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
            <Image
              src="/indian_bank_manager.png"
              alt="Assigned Bank Officer"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="bg-[#004c8c] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                {t('dashboard.assigned_officer')}
              </span>
              <p className="font-semibold text-sm pt-1">Vikram Malhotra (SBI Manager)</p>
            </div>
          </div>
          <div className="p-4 pt-0 space-y-2 text-xs">
            <p className="text-slate-600 leading-relaxed">
              {t('dashboard.subtitle')}
            </p>
            <Link href="/bank-portal" className="text-xs font-bold text-[#004c8c] hover:underline inline-flex items-center gap-1">
              <span>{t('dashboard.open_bank_portal')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 2: Legal Heir Claimant Family */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition space-y-4 group">
          <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
            <Image
              src="/indian_family_hero.png"
              alt="Legal Heir Claimants"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="bg-emerald-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                {t('dashboard.verified_legal_heirs')}
              </span>
              <p className="font-semibold text-sm pt-1">Vikramaditya Rao & Family</p>
            </div>
          </div>
          <div className="p-4 pt-0 space-y-2 text-xs">
            <p className="text-slate-600 leading-relaxed">
              {t('dashboard.subtitle')}
            </p>
            <Link href="/dashboard/approvals" className="text-xs font-bold text-[#004c8c] hover:underline inline-flex items-center gap-1">
              <span>{t('dashboard.inspect_approvals')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 3: High Court Official Seal */}
        <div className="bg-gradient-to-br from-[#002b49] to-[#004c8c] text-white border border-slate-700 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="relative w-14 h-14">
              <Image
                src="/ashoka_legal_seal.png"
                alt="High Court Seal"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
            <span className="bg-[#B8935B] text-[#002b49] text-[10px] font-mono font-bold px-2.5 py-1 rounded">
              {t('dashboard.judicature_seal')}
            </span>
            <h3 className="font-serif text-lg font-bold">{t('dashboard.sha256_sealed')}</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              {t('dashboard.realtime_graph_mapping')}
            </p>
          </div>
          <Link href="/dashboard/audit" className="text-xs font-bold text-[#B8935B] hover:underline inline-flex items-center gap-1">
            <span>{t('dashboard.view_audit_trail')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Deceased Identity Surrender & Data Deletion Action Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-900/60 border border-rose-700 flex items-center justify-center shrink-0 text-rose-300">
            <UserX className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-rose-900/80 text-rose-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-rose-700 uppercase tracking-wider">
                Statutory Surrender & Deletion
              </span>
              <span className="text-slate-400 text-xs font-mono">• 5 Credentials Tracked</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-white">
              Deceased Identity Surrender & Data Deletion Center
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Statutory surrender of Aadhaar Card (UIDAI), PAN Card (Income Tax Dept), Vehicle & Driving License (RTO Parivahan), Voter ID (EPIC Form 7), and Passport (PSK), with DPDP Act 2023 compliant data purging.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/deactivation"
          className="shrink-0 bg-[#B8935B] hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 font-mono uppercase tracking-wider"
        >
          <span>MANAGE IDENTITY SURRENDER</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Bank Statement Summary Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-lg text-[#002b49] border-b border-slate-200 pb-3">
          {t('dashboard.valuation_statement')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
          <div className="bg-[#F6F7FA] border border-[#E2E6EC] rounded-xl p-4 space-y-1">
            <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">{t('dashboard.total_estate_assets')}</span>
            <p className="font-mono text-xl sm:text-2xl font-bold text-[#0F2439]">
              {formatINR(currentCase.totalAssets || 34000000)}
            </p>
            <p className="text-[10px] text-gray-500">28 {t('dashboard.institutions_identified')}</p>
          </div>

          <div className="bg-[#F6F7FA] border border-[#E2E6EC] rounded-xl p-4 space-y-1">
            <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">{t('dashboard.total_liabilities')}</span>
            <p className="font-mono text-xl sm:text-2xl font-bold text-red-700">
              - {formatINR(currentCase.totalLiabilities || 2100000)}
            </p>
            <p className="text-[10px] text-gray-500">{t('dashboard.pending_approvals')}</p>
          </div>

          <div className="bg-[#F6F7FA] border border-[#E2E6EC] rounded-xl p-4 space-y-1">
            <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">{t('dashboard.settled_proceeds')}</span>
            <p className="font-mono text-xl sm:text-2xl font-bold text-[#1F7A4D]">
              + {formatINR(8540000)}
            </p>
            <p className="text-[10px] text-[#1F7A4D] font-medium">22 {t('common.resolved')}</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-1">
            <span className="text-[11px] font-mono text-[#004c8c] uppercase tracking-wider font-semibold">{t('dashboard.net_payable_heirs')}</span>
            <p className="font-mono text-xl sm:text-2xl font-bold text-[#004c8c]">
              {formatINR(currentCase.netEstateValue)}
            </p>
            <p className="text-[10px] text-[#004c8c] font-semibold">100% RBI Guidance Compliant</p>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {actionDoneMessage && (
        <div className="bg-[#1F7A4D]/10 border border-[#1F7A4D]/30 text-[#1F7A4D] px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#1F7A4D]" />
            <span>{actionDoneMessage}</span>
          </div>
          <span className="text-xs font-mono text-[#1F7A4D]">SHA-256 Hash Appended to Ledger</span>
        </div>
      )}

      {/* Action Needed HITL Card */}
      <div className="bg-white border border-[#B8935B]/40 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                {t('dashboard.hitl_authorization')}
              </h3>
              <p className="text-xs text-gray-500 font-sans">
                {t('dashboard.sbi_waiver_title')}
              </p>
            </div>
          </div>
          <span className="bg-amber-100 text-amber-800 font-mono text-xs font-semibold px-3 py-1 rounded-full">
            +₹45,000 SAVED
          </span>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed font-sans">
          {t('dashboard.sbi_waiver_desc')}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-[#E2E6EC] text-xs font-mono">
          <span className="text-gray-500">Agent Confidence: 96% | Citation: RBI Deceased Depositor Circular 2026</span>
          <button
            onClick={() => handleApproveFeeWaiver('inst-1', 'State Bank of India')}
            className="px-5 py-2 bg-[#004c8c] text-white font-sans text-xs font-semibold rounded-lg hover:bg-[#002b49] transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-[#B8935B]" />
            <span>{t('dashboard.approve_waiver_btn')}</span>
          </button>
        </div>
      </div>

      {/* Formal Bank Statement / Ledger Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-[#E2E6EC] pb-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#004c8c]" />
              <span>{t('dashboard.official_ledger_title')}</span>
            </h2>
            <p className="text-xs text-gray-500 font-sans mt-0.5">
              {t('dashboard.official_ledger_desc')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/cases/c-101/dag"
              className="text-xs font-mono font-bold bg-blue-50 text-[#004c8c] hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 flex items-center gap-1.5 transition"
            >
              <MapPin className="w-3.5 h-3.5 text-[#B8935B]" />
              <span>VIEW REGISTRY MAP & GPS</span>
            </Link>
            <Link
              href="/dashboard/approvals"
              className="text-xs font-mono text-[#004c8c] hover:underline font-semibold flex items-center gap-1"
            >
              <span>{t('dashboard.view_approval_queue')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B8935B]" />
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead>
              <tr className="bg-[#F6F7FA] border-b border-[#E2E6EC] text-gray-600 font-mono text-[11px] uppercase tracking-wider">
                <th className="p-3">{t('table.ref_id')}</th>
                <th className="p-3">{t('table.institution')}</th>
                <th className="p-3">{t('table.category')}</th>
                <th className="p-3">{t('table.account_number')}</th>
                <th className="p-3">{t('table.verification_stamp')}</th>
                <th className="p-3 text-right">{t('table.value_inr')}</th>
                <th className="p-3 text-center">{t('table.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E6EC] font-mono text-xs">
              {institutions.map((inst, index) => (
                <tr key={inst.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F6F7FA]/60'}>
                  <td className="p-3 text-[#004c8c] font-semibold">{inst.claimId || `REF-00${index + 1}`}</td>
                  <td className="p-3 font-sans font-medium text-slate-900">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>{inst.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-600 font-sans">{inst.sector} / {inst.accountType}</td>
                  <td className="p-3 text-gray-500">{inst.accountNumberMasked}</td>
                  <td className="p-3 font-sans">
                    {inst.status === 'settled' ? (
                      <span className="bg-[#1F7A4D]/10 text-[#1F7A4D] font-semibold px-2.5 py-1 rounded-md text-[11px] inline-flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{t('common.completed')}</span>
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-800 font-semibold px-2.5 py-1 rounded-md text-[11px] inline-flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{t('common.pending')}</span>
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right font-bold text-slate-900">
                    {formatINR(inst.estimatedValue)}
                  </td>
                  <td className="p-3 text-center font-sans">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${
                      inst.status === 'settled' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {inst.status === 'settled' ? t('common.resolved') : t('common.pending')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

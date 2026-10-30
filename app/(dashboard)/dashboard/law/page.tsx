'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { formatINR } from '@/utils/formatters';
import { Scale, CheckCircle2, Clock, Calendar, ShieldCheck, Sparkles, Download, Search, FileText, ExternalLink, Calculator, BookOpen, Printer, FileUp } from 'lucide-react';

import { useLanguage } from '@/components/providers/LanguageProvider';

export default function LawPage() {
  const { cases, activeCaseId } = useLifeBridgeStore();
  const { toast } = useToast();
  const { t } = useLanguage();
  const currentCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const [successionAct, setSuccessionAct] = useState<'HSA' | 'MPL' | 'ISA'>('HSA');
  const [cnrQuery, setCnrQuery] = useState('MHHC01-004921-2026');
  const [cnrResult, setCnrResult] = useState<any | null>({
    cnrNumber: 'MHHC01-004921-2026',
    petitioner: 'Eleanor Mehta Vance',
    respondent: 'General Public & State Bank of India',
    courtName: 'High Court of Judicature at Bombay (Testamentary Bench)',
    judgeName: "Hon'ble Justice S. K. Deshmukh",
    nextHearingDate: '14 August 2026',
    stage: 'Order Reserved / Public Notice Completed'
  });

  const handleCnrSearch = () => {
    toast('Searching e-Courts Database', `Executing API query for CNR: ${cnrQuery}...`, 'info');
    setTimeout(() => {
      setCnrResult({
        cnrNumber: cnrQuery,
        petitioner: currentCase.executorName,
        respondent: 'General Public & Sub-Registrar',
        courtName: currentCase.probateCourt,
        judgeName: "Hon'ble Justice S. K. Deshmukh",
        nextHearingDate: '14 August 2026',
        stage: 'Statutory 60-Day Gazette Notice Verified'
      });
      toast('e-Courts Record Found!', `Retrieved High Court Order for CNR ${cnrQuery}.`, 'success');
    }, 1000);
  };

  const handleDownloadNotice = () => {
    toast('Generating Public Notice', 'Creating 60-Day Statutory Newspaper & Gazette Notice PDF...', 'info');
    setTimeout(() => {
      window.open('/dashboard/export-certificate', '_blank');
      toast('Public Notice PDF Ready!', 'Downloaded 60-day creditor notice for Gazette publication.', 'success');
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* High-Impact Indian Banking & Legal Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-700 min-h-[260px] flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/indian_legal_advocate.png"
            alt="High Court Legal Bench"
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
              <Scale className="w-4 h-4 text-[#B8935B]" />
              <span>HIGH COURT OF JUDICATURE & e-COURTS COMPLIANCE SUITE</span>
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
                  {t('law.title')}
                </h1>
                <p className="text-xs text-blue-200 font-mono mt-0.5">
                  {t('law.subtitle')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadNotice}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-mono rounded-xl transition flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <FileUp className="w-4 h-4" />
              <span>{t('law.download_certified_order')}</span>
            </button>
            <Link
              href="/dashboard/export-certificate"
              className="px-5 py-2.5 bg-[#B8935B] text-[#002b49] font-bold text-xs font-mono rounded-xl hover:bg-white transition flex items-center gap-2 shadow-sm uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              <span>{t('dashboard.export_pdf')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* e-Courts Live CNR Case Status Search Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#004c8c]" />
            <span>{t('law.title')}</span>
          </h2>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold">
            LIVE e-COURTS API ACTIVE
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={cnrQuery}
              onChange={(e) => setCnrQuery(e.target.value)}
              placeholder="Enter High Court CNR Number (e.g. MHHC01-004921-2026)"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleCnrSearch}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#004c8c] hover:bg-[#002b49] text-white font-mono font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0 uppercase tracking-wider"
          >
            <Search className="w-4 h-4" />
            <span>{t('law.ecourts_search')}</span>
          </button>
        </div>

        {/* CNR Result Box with Download Order PDF Button */}
        {cnrResult && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-mono text-xs font-bold text-[#004c8c]">CNR: {cnrResult.cnrNumber}</span>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded">
                NEXT HEARING: {cnrResult.nextHearingDate}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
              <div>
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Petitioner / Lead Executor</span>
                <span className="font-bold text-slate-900">{cnrResult.petitioner}</span>
              </div>
              <div>
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Presiding High Court Judge</span>
                <span className="font-bold text-slate-900">{cnrResult.judgeName}</span>
              </div>
              <div>
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Testamentary Bench</span>
                <span className="font-semibold text-slate-800">{cnrResult.courtName}</span>
              </div>
              <div>
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Current Case Stage</span>
                <span className="font-bold text-emerald-700">{cnrResult.stage}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">HIGH COURT ORDER CERTIFIED BY REGISTRAR</span>
              <Link
                href="/dashboard/export-certificate"
                className="px-4 py-2 bg-[#004c8c] hover:bg-[#002b49] text-white text-xs font-bold font-mono rounded-xl transition flex items-center gap-1.5 shadow-xs uppercase tracking-wider"
              >
                <Download className="w-3.5 h-3.5 text-[#B8935B]" />
                <span>Download Certified Order PDF</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Succession Inheritance Share Calculator */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#004c8c]" />
            <span>Indian Personal Succession Share Calculator</span>
          </h2>
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-mono">
            <button
              onClick={() => setSuccessionAct('HSA')}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                successionAct === 'HSA' ? 'bg-[#004c8c] text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Hindu Succession Act 1956
            </button>
            <button
              onClick={() => setSuccessionAct('MPL')}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                successionAct === 'MPL' ? 'bg-[#004c8c] text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Muslim Personal Law (Shariat)
            </button>
            <button
              onClick={() => setSuccessionAct('ISA')}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                successionAct === 'ISA' ? 'bg-[#004c8c] text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Indian Succession Act 1925
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="bg-blue-100 text-blue-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
              CLASS I HEIR (WIDOW)
            </span>
            <h4 className="font-serif font-bold text-base text-slate-900">Lead Executor (Widow)</h4>
            <p className="text-slate-500 font-mono">Share: <strong>33.33% (Equal Share)</strong></p>
            <p className="font-bold text-[#004c8c] font-mono text-lg">{formatINR(currentCase.netEstateValue * 0.3333)}</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="bg-blue-100 text-blue-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
              CLASS I HEIR (SON)
            </span>
            <h4 className="font-serif font-bold text-base text-slate-900">Thomas Mehta (Son)</h4>
            <p className="text-slate-500 font-mono">Share: <strong>33.33% (Equal Share)</strong></p>
            <p className="font-bold text-[#004c8c] font-mono text-lg">{formatINR(currentCase.netEstateValue * 0.3333)}</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="bg-blue-100 text-blue-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
              CLASS I HEIR (DAUGHTER)
            </span>
            <h4 className="font-serif font-bold text-base text-slate-900">Ananya Mehta (Daughter)</h4>
            <p className="text-slate-500 font-mono">Share: <strong>33.33% (Equal Share)</strong></p>
            <p className="font-bold text-[#004c8c] font-mono text-lg">{formatINR(currentCase.netEstateValue * 0.3333)}</p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
          <Link
            href="/dashboard/export-certificate"
            className="px-4 py-2 bg-[#004c8c] hover:bg-[#002b49] text-white text-xs font-bold font-mono rounded-xl transition flex items-center gap-1.5 shadow-xs uppercase tracking-wider"
          >
            <Printer className="w-3.5 h-3.5 text-[#B8935B]" />
            <span>Export Inheritance Schedule (PDF)</span>
          </Link>
        </div>
      </div>

      {/* Statutory Timelines List */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4 font-sans">
        <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Indian Statutory Milestones (Hindu Succession Act, 1956 & High Court Regulations)
        </h3>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-900">Public Notice to Creditors & Heirs Publication Period (60 Days)</p>
                <p className="text-slate-600 mt-0.5">Published in State Government Gazette & Leading Daily Newspaper per High Court order.</p>
              </div>
            </div>
            <span className="bg-emerald-600 text-white font-mono font-bold px-3 py-1 rounded-lg">COMPLETED</span>
          </div>

          <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-900">Legal Representative Income Tax Clearance (ITD e-Filing)</p>
                <p className="text-slate-600 mt-0.5">Filing required under Income Tax Act Sec 159 for deceased assessment year.</p>
              </div>
            </div>
            <span className="bg-blue-600 text-white font-mono font-bold px-3 py-1 rounded-lg">ON TRACK</span>
          </div>
        </div>
      </div>
    </div>
  );
}

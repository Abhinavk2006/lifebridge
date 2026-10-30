'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLifeBridgeStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { formatINR } from '@/utils/formatters';
import { FolderKanban, Search, Plus, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Building2, Download, X } from 'lucide-react';

import { useLanguage } from '@/components/providers/LanguageProvider';

export default function CasesDirectoryPage() {
  const router = useRouter();
  const { cases, setActiveCaseId } = useLifeBridgeStore();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'negotiation' | 'verification' | 'settled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);
  const [newDeceasedName, setNewDeceasedName] = useState('');
  const [newExecutorName, setNewExecutorName] = useState('');
  const [newCourt, setNewCourt] = useState('High Court of Judicature at Bombay');

  const filteredCases = cases.filter(
    (c) =>
      (filter === 'all' || c.status === filter) &&
      (c.deceasedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectCase = (caseId: string, name: string) => {
    setActiveCaseId(caseId);
    toast('Estate Case Activated', `Switched active case to Estate of ${name}. Loading Mission Control...`, 'success');
    router.push('/dashboard');
  };

  const handleCreateNewCase = () => {
    if (!newDeceasedName.trim()) return;
    toast('New Case Initialized', `Created new estate case for ${newDeceasedName} under ${newCourt}.`, 'success');
    setIsNewCaseOpen(false);
    setNewDeceasedName('');
    setNewExecutorName('');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* High-Impact Indian Banking Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-700 min-h-[260px] flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/indian_legal_advocate.png"
            alt="Indian Legal Advocate Cases"
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
              <Sparkles className="w-4 h-4 text-[#B8935B]" />
              <span>HIGH COURT OF JUDICATURE TESTAMENTARY BENCH</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 shrink-0 bg-white/10 p-1.5 rounded-2xl border border-white/20">
                <Image
                  src="/ashoka_legal_seal.png"
                  alt="High Court Ashoka Emblem Seal"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="font-serif text-3xl font-bold tracking-tight text-white">
                  {t('cases.title')}
                </h1>
                <p className="text-xs text-blue-200 font-mono mt-0.5">
                  {t('cases.subtitle')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsNewCaseOpen(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-mono rounded-xl transition flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>INITIALIZE NEW CASE</span>
            </button>
            <Link
              href="/dashboard/export-certificate"
              className="px-5 py-2.5 bg-[#B8935B] text-[#002b49] font-bold text-xs font-mono rounded-xl hover:bg-white transition flex items-center gap-2 shadow-sm uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT STATEMENT (PDF)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(['all', 'negotiation', 'verification', 'settled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === tab 
                  ? 'bg-[#004c8c] text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'all' ? 'All Active Cases' : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Deceased Name, Case #, Bench..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004c8c]"
          />
        </div>
      </div>

      {/* Cases Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCases.map((item) => (
          <div 
            key={item.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition space-y-4 p-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 shrink-0">
                    <Image
                      src="/ashoka_legal_seal.png"
                      alt="Ashoka Seal"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      Estate of {item.deceasedName}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Bench: <strong>{item.probateCourt}</strong> &nbsp;|&nbsp; Case #: <strong className="text-[#004c8c]">{item.caseNumber}</strong>
                    </p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase ${
                  item.status === 'settled' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Net Estate Valuation</span>
                  <span className="font-bold text-[#004c8c] text-sm">{formatINR(item.netEstateValue)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Institutions Discovered</span>
                  <span className="font-bold text-slate-900 text-sm">{item.resolvedInstitutionsCount} / {item.institutionsCount} Settled</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Probate Settlement Progress</span>
                  <span className="text-[#B8935B] font-mono">{item.progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#004c8c] h-full rounded-full transition-all"
                    style={{ width: `${item.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Executor: <strong className="text-slate-800">{item.executorName}</strong></span>
              <button
                onClick={() => handleSelectCase(item.id, item.deceasedName)}
                className="px-4 py-2 bg-[#004c8c] text-white text-xs font-semibold rounded-lg hover:bg-[#002b49] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Select & Open Mission Control</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B8935B]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Initialize New Case Modal */}
      {isNewCaseOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-slate-900 rounded-2xl w-full max-w-xl shadow-2xl p-6 space-y-5 text-slate-900 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-[#004c8c]" />
                <span>Initialize New Estate Case</span>
              </h3>
              <button onClick={() => setIsNewCaseOpen(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Deceased Account Holder Full Name</label>
                <input
                  type="text"
                  value={newDeceasedName}
                  onChange={(e) => setNewDeceasedName(e.target.value)}
                  placeholder="e.g. Rameshchandra Mehta"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004c8c]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Lead Executor / Representative Name</label>
                <input
                  type="text"
                  value={newExecutorName}
                  onChange={(e) => setNewExecutorName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004c8c]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Testamentary Jurisdiction Bench</label>
                <select
                  value={newCourt}
                  onChange={(e) => setNewCourt(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004c8c]"
                >
                  <option>High Court of Judicature at Bombay</option>
                  <option>High Court of Delhi, New Delhi</option>
                  <option>High Court of Karnataka, Bengaluru</option>
                  <option>High Court of Judicature at Madras</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsNewCaseOpen(false)}
                className="px-4 py-2 bg-slate-200 text-slate-800 font-semibold rounded-xl hover:bg-slate-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNewCase}
                className="px-5 py-2 bg-[#004c8c] hover:bg-[#002b49] text-white font-bold rounded-xl transition shadow-xs uppercase tracking-wider"
              >
                Initialize Case
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

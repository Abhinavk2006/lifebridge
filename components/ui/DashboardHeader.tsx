'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLifeBridgeStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { Search, AlertTriangle, Download, Building2, FileText, UserCheck, CheckCircle2 } from 'lucide-react';

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { downloadCourtPackagePDF } from '@/utils/exportPackage';
import { formatINR } from '@/utils/formatters';

export const DashboardHeader: React.FC = () => {
  const router = useRouter();
  const { cases, activeCaseId, documents, institutions } = useLifeBridgeStore();
  const { toast } = useToast();
  const { t } = useLanguage();
  const currentCase = cases.find((c) => c.id === activeCaseId) || cases[0];
  const [roleView, setRoleView] = useState<'Executor' | 'Attorney' | 'Auditor'>('Executor');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleRoleChange = (role: 'Executor' | 'Attorney' | 'Auditor') => {
    setRoleView(role);
    toast(`Role View Switched`, `Switched active dashboard perspective to ${role} Mode.`, 'info');
  };

  const handleExportPackage = () => {
    toast('Exporting Court Package', 'Generating tamper-proof SHA-256 PDF audit pack...', 'info');
    setTimeout(() => {
      downloadCourtPackagePDF({
        caseNumber: currentCase.caseNumber,
        deceasedName: currentCase.deceasedName,
        executorName: currentCase.executorName,
        jurisdiction: currentCase.jurisdiction,
        netEstateValue: formatINR(currentCase.netEstateValue)
      });
      toast('Court Package Exported', `Downloaded Court_Package_${currentCase.caseNumber}_Audit.pdf with verified SHA-256 seal.`, 'success');
    }, 1200);
  };

  // Search matches
  const matchingCases = cases.filter(c => c.deceasedName.toLowerCase().includes(searchQuery.toLowerCase()) || c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()));
  const matchingDocs = documents.filter(d => d.fileName.toLowerCase().includes(searchQuery.toLowerCase()) || d.category.toLowerCase().includes(searchQuery.toLowerCase()));
  const matchingInsts = institutions.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.sector.toLowerCase().includes(searchQuery.toLowerCase()));

  const hasResults = searchQuery.trim().length > 0 && (matchingCases.length > 0 || matchingDocs.length > 0 || matchingInsts.length > 0);

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-3 flex items-center justify-between shadow-xs">
      {/* Search & Case Meta */}
      <div className="flex items-center gap-6">
        <div className="relative w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder={t('common.search')}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 transition-colors font-sans"
          />

          {/* Live Search Dropdown */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 text-xs space-y-3">
              {matchingCases.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">Cases</p>
                  {matchingCases.map(c => (
                    <div
                      key={c.id}
                      onClick={() => {
                        useLifeBridgeStore.getState().setActiveCaseId(c.id);
                        setIsSearchOpen(false);
                      }}
                      className="p-2 rounded-lg hover:bg-blue-50 cursor-pointer flex items-center justify-between"
                    >
                      <span className="font-semibold text-slate-800">{c.deceasedName}</span>
                      <span className="text-[10px] text-slate-400 font-mono-val">{c.caseNumber}</span>
                    </div>
                  ))}
                </div>
              )}

              {matchingDocs.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">Documents</p>
                  {matchingDocs.map(d => (
                    <Link
                      key={d.id}
                      href={`/dashboard/documents/${d.id}/verify`}
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2 rounded-lg hover:bg-blue-50 cursor-pointer flex items-center justify-between block"
                    >
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span className="font-medium text-slate-800 truncate max-w-[180px]">{d.fileName}</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold">{d.authenticityScore}%</span>
                    </Link>
                  ))}
                </div>
              )}

              {matchingInsts.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">Institutions</p>
                  {matchingInsts.map(i => (
                    <Link
                      key={i.id}
                      href={`/dashboard/organizations/${i.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2 rounded-lg hover:bg-blue-50 cursor-pointer flex items-center justify-between block"
                    >
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="font-medium text-slate-800">{i.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono-val">{i.accountNumberMasked}</span>
                    </Link>
                  ))}
                </div>
              )}

              {!hasResults && (
                <p className="text-center py-4 text-slate-400 text-xs">No matching entities found for "{searchQuery}"</p>
              )}
            </div>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-3 border-l border-slate-200 pl-6 text-xs">
          <div>
            <span className="text-slate-400 font-medium">{t('header.case')}</span>{' '}
            <span className="font-semibold text-slate-900">{currentCase.deceasedName}</span>
          </div>
          <span className="bg-slate-100 text-slate-700 font-mono-val px-2 py-0.5 rounded text-[11px] font-bold border border-slate-200">
            {currentCase.caseNumber}
          </span>
        </div>
      </div>

      {/* Right Controls, Language Switcher & Role Switcher */}
      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Role Switcher */}
        <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center gap-1 text-xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold px-1 hidden sm:inline">{t('header.role_view')}</span>
          {(['Executor', 'Attorney', 'Auditor'] as const).map((role) => {
            const roleKey = role === 'Executor' ? 'header.executor' : role === 'Attorney' ? 'header.attorney' : 'header.auditor';
            return (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`px-2.5 py-1 rounded font-semibold text-[11px] transition-colors ${
                  roleView === role
                    ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t(roleKey)}
              </button>
            );
          })}
        </div>

        {/* Action Needed Pill */}
        {currentCase.openActionCount > 0 && (
          <Link
            href="/dashboard/agents/approvals"
            className="flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-rose-100 transition-colors animate-pulse"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>{currentCase.openActionCount} {t('common.action_needed')}</span>
          </Link>
        )}

        {/* Certified Export Button */}
        <button
          onClick={handleExportPackage}
          className="hidden sm:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-blue-400" />
          <span>{t('common.export')}</span>
        </button>
      </div>
    </header>
  );
};

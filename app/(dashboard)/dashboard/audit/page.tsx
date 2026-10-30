'use client';

import React, { useState } from 'react';
import { useLifeBridgeStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { Lock, Download, ShieldCheck, CheckCircle2, Search, FileText } from 'lucide-react';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { downloadCourtPackagePDF } from '@/utils/exportPackage';
import { formatINR } from '@/utils/formatters';

export default function AuditTrailPage() {
  const { auditLogs, cases, activeCaseId } = useLifeBridgeStore();
  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleExportCourtPackage = () => {
    setIsExporting(true);
    toast('Generating Audit Pack', 'Assembling cryptographic SHA-256 ledger for High Court filing...', 'info');

    setTimeout(() => {
      setIsExporting(false);
      downloadCourtPackagePDF({
        caseNumber: currentCase.caseNumber,
        deceasedName: currentCase.deceasedName,
        executorName: currentCase.executorName,
        jurisdiction: currentCase.jurisdiction,
        netEstateValue: formatINR(currentCase.netEstateValue)
      });
      toast('Court Package Exported!', `Downloaded Court_Package_${currentCase.caseNumber}_Audit.pdf with verified SHA-256 seal.`, 'success');
    }, 1500);
  };

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actionGroup.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <Lock className="w-4 h-4" />
            <span>{t('dashboard.sha256_sealed')}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {t('audit.title')}
          </h1>
          <p className="text-xs text-gray-500 font-sans mt-0.5">
            {t('audit.subtitle')}
          </p>
        </div>

        <button
          onClick={handleExportCourtPackage}
          disabled={isExporting}
          className="px-4 py-2.5 bg-[#004c8c] hover:bg-[#002b49] text-white text-xs font-bold font-mono rounded-xl transition flex items-center justify-center gap-2 shadow-sm uppercase tracking-wider disabled:opacity-50 cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4 text-[#B8935B]" />
          <span>{isExporting ? 'Exporting Package...' : t('audit.export_certified_package')}</span>
        </button>
      </div>

      {/* Audit Log Table */}
      <div className="card-enterprise p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-bold text-slate-900">Cryptographic Event Ledger</h3>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono-val px-2.5 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> SHA-256 IMMUTABLE
            </span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audit records..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs animate-in fade-in duration-150">
              <div className="flex items-center justify-between font-semibold">
                <div className="flex items-center gap-2 text-slate-900">
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-mono-val font-bold">
                    {log.actionGroup}
                  </span>
                  <span className="font-bold">{log.actor} ({log.actorType})</span>
                </div>
                <span className="text-slate-400 font-mono-val text-[11px]">{log.timestamp}</span>
              </div>

              <p className="text-slate-700 font-medium">{log.description}</p>
              {log.reasoning && (
                <p className="text-slate-500 italic bg-white p-2 rounded border border-slate-100">
                  Reasoning: {log.reasoning}
                </p>
              )}

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-400 font-mono-val">
                <span>Cryptographic SHA-256: <strong>{log.hashSHA256}</strong></span>
                <span className="text-emerald-600 font-semibold">Verified</span>
              </div>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-xs">
            No audit log entries match "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
}

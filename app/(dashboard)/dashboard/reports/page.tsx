'use client';

import React from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { formatINR } from '@/utils/formatters';
import { downloadCourtPackagePDF } from '@/utils/exportPackage';
import { FileSpreadsheet, Download, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ReportsPage() {
  const { cases, activeCaseId } = useLifeBridgeStore();
  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    toast('Generating Report', 'Assembling certified legal heir accounting PDF...', 'info');
    setTimeout(() => {
      downloadCourtPackagePDF({
        caseNumber: currentCase.caseNumber,
        deceasedName: currentCase.deceasedName,
        executorName: currentCase.executorName,
        jurisdiction: currentCase.jurisdiction,
        netEstateValue: formatINR(currentCase.netEstateValue)
      });
      toast('Report Downloaded', `Downloaded Court_Package_${currentCase.caseNumber}_Audit.pdf with verified SHA-256 seal.`, 'success');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Reports & Export Center</h1>
          <p className="text-xs text-slate-500 mt-1">Download certified High Court packages, legal heir distribution statements, and ITD tax summaries</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-enterprise p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Court-Ready Final Accounting Package</h3>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono-val px-2 py-0.5 rounded">PDF CERTIFIED</span>
          </div>
          <p className="text-xs text-slate-600">Complete formal accounting statement prepared for High Court probate & succession closing.</p>
          <button 
            onClick={handleDownloadPDF} 
            className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download Certified Accounting PDF
          </button>
        </div>

        <div className="card-enterprise p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Heir Distribution & Allocation Breakdown</h3>
            <span className="bg-blue-100 text-blue-800 text-[10px] font-bold font-mono-val px-2 py-0.5 rounded">CSV / PDF</span>
          </div>
          <p className="text-xs text-slate-600">Detailed line-item summary of net asset distributions to Eleanor Vance and Thomas Mehta under Hindu Succession Act.</p>
          <button 
            onClick={handleDownloadPDF} 
            className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export Heir Summary Statement
          </button>
        </div>
      </div>
    </div>
  );
}

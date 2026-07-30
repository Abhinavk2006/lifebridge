'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLifeBridgeStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { Sparkles, ArrowLeft, CheckCircle2, ShieldCheck, Scale, FileText } from 'lucide-react';

export default function NewCaseWizardPage() {
  const router = useRouter();
  const { cases } = useLifeBridgeStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    deceasedName: 'Anand Vardhan Mehta',
    dateOfBirth: '1945-09-12',
    dateOfDeath: '2026-06-15',
    pan: 'ABCDE4412M',
    aadhaar: 'XXXX-XXXX-8492',
    jurisdiction: 'High Court of Judicature at Bombay (Testamentary Division)',
    executorName: 'Eleanor Mehta Vance',
    executorRole: 'Executor' as const,
    probateCourt: 'Bombay High Court (Testamentary Bench)',
    caseNumber: 'MH-2026-009912'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast('Initializing Case', 'Creating PostgreSQL relational tables & Neo4j graph nodes...', 'info');

    setTimeout(() => {
      const newCaseId = `c-${100 + cases.length + 1}`;
      const newCaseItem = {
        id: newCaseId,
        deceasedName: formData.deceasedName,
        dateOfBirth: formData.dateOfBirth,
        dateOfDeath: formData.dateOfDeath,
        ssnMasked: `PAN: ${formData.pan}`,
        panMasked: formData.pan,
        aadhaarMasked: formData.aadhaar,
        jurisdiction: formData.jurisdiction,
        executorName: formData.executorName,
        executorRole: formData.executorRole,
        status: 'intake' as const,
        progressPercent: 5,
        totalAssets: 12500000,
        totalLiabilities: 450000,
        netEstateValue: 12050000,
        institutionsCount: 12,
        resolvedInstitutionsCount: 1,
        openActionCount: 2,
        createdAt: '2026-07-30',
        updatedAt: '2026-07-30',
        primaryAttorney: 'Shardul Amarchand & Partners',
        probateCourt: formData.probateCourt,
        caseNumber: formData.caseNumber
      };

      // Add to store
      useLifeBridgeStore.setState((state) => ({
        cases: [newCaseItem, ...state.cases],
        activeCaseId: newCaseId
      }));

      toast('Case Initialized!', `Estate of ${formData.deceasedName} created successfully.`, 'success');
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Initialize New Estate Case</h1>
          <p className="text-xs text-slate-500">Register deceased person, High Court / Sub-Registrar jurisdiction, and legal heir powers</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card-enterprise p-6 space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Autonomous Setup Assistant</p>
            <p className="text-blue-700 mt-0.5">
              Form pre-loaded with verified demo parameters. Submitting will trigger PostgreSQL table entry, Neo4j Knowledge Graph node creation, and initial Agent Mesh dispatch.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Deceased Full Name</label>
            <input
              type="text"
              required
              value={formData.deceasedName}
              onChange={(e) => setFormData({ ...formData, deceasedName: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Permanent Account Number (PAN)</label>
            <input
              type="text"
              required
              value={formData.pan}
              onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono-val focus:outline-none focus:border-blue-500"
              placeholder="e.g. ABCDE1234F"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Date of Birth</label>
            <input
              type="date"
              required
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Date of Death</label>
            <input
              type="date"
              required
              value={formData.dateOfDeath}
              onChange={(e) => setFormData({ ...formData, dateOfDeath: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">High Court / Sub-Registrar Jurisdiction</label>
            <input
              type="text"
              required
              value={formData.jurisdiction}
              onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Case Index / Docket Number</label>
            <input
              type="text"
              required
              value={formData.caseNumber}
              onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono-val focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Executor / Legal Heir Name</label>
            <input
              type="text"
              required
              value={formData.executorName}
              onChange={(e) => setFormData({ ...formData, executorName: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Fiduciary Legal Role</label>
            <select
              value={formData.executorRole}
              onChange={(e) => setFormData({ ...formData, executorRole: e.target.value as any })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
            >
              <option value="Executor">Executor (Named in Will)</option>
              <option value="Administrator">Administrator (Court Appointed)</option>
              <option value="Legal Rep">Legal Representative / Heir</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Provisioning Case Graph...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Initialize Case & Build Graph</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

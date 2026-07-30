'use client';

import React from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { ShieldCheck, CheckCircle2, FileText, Lock, ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';

export default function DocumentVerificationDetail() {
  const { documents } = useLifeBridgeStore();
  const doc = documents[0]; // Arthur Pendelton Death Certificate

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/documents" className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <ShieldCheck className="w-4 h-4" /> Forensic Document Authenticity Verification
            </div>
            <h1 className="font-serif text-2xl font-bold text-slate-900">{doc.fileName}</h1>
          </div>
        </div>

        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold font-mono-val px-3 py-1.5 rounded-lg border border-emerald-200">
          AUTHENTICITY SCORE: {doc.authenticityScore}%
        </span>
      </div>

      {/* Side-by-Side Verification Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Raw Document Preview Mock */}
        <div className="card-enterprise p-6 bg-slate-900 text-white min-h-[500px] flex flex-col justify-between border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono-val text-blue-400 font-bold">PDF HIGH-RES SCAN CANVAS</span>
            <span className="text-xs text-slate-400 font-mono-val">300 DPI // CRYPTOGRAPHICALLY SEALED</span>
          </div>

          <div className="my-auto bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 font-mono-val text-xs text-slate-300">
            <div className="text-center border-b border-slate-800 pb-3">
              <p className="font-bold text-white text-sm">MUNICIPAL CORPORATION OF GREATER MUMBAI (MCGM)</p>
              <p className="text-blue-400">CERTIFICATE OF DEATH #MCGM-2026-004921</p>
            </div>
            <div className="space-y-1.5 text-slate-300">
              <p>DECEDENT: <strong>RAMESHCHANDRA MEHTA</strong></p>
              <p>DATE OF DEATH: <strong>MAY 12, 2026</strong></p>
              <p>PRIMARY LEGAL HEIR: <strong>ELEANOR MEHTA VANCE</strong></p>
              <p>ISSUING AUTHORITY: <strong>REGISTRAR OF BIRTHS & DEATHS (MCGM G-SOUTH WARD)</strong></p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-emerald-400">
              <span>[MCGM DIGITAL QR STAMP VERIFIED]</span>
              <span>SHA-256 MATCH</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3 flex items-center justify-between">
            <span>Issuing Authority: {doc.issuingAuthority}</span>
            <span className="text-emerald-400">Tamper Status: 0.0% Anomaly</span>
          </div>
        </div>

        {/* Right: AI Extraction & Forensics Scorecard */}
        <div className="space-y-6">
          <div className="card-enterprise p-5 space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Forensic Authenticity Scorecard
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-900">Raised Seal Cryptographic Scan</span>
                </div>
                <span className="font-mono-val font-bold text-emerald-700">100% Match</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-900">Registrar Signature Density</span>
                </div>
                <span className="font-mono-val font-bold text-emerald-700">98.8% Match</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-900">Tamper & Metadata Alteration Check</span>
                </div>
                <span className="font-mono-val font-bold text-emerald-700">Zero Anomalies</span>
              </div>
            </div>
          </div>

          <div className="card-enterprise p-5 space-y-3">
            <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Extracted Legal Entities (Knowledge Graph Ready)
            </h3>

            <div className="bg-slate-900 p-4 rounded-xl text-white font-mono-val text-xs space-y-2">
              <p className="text-blue-400">&#123;</p>
              <p className="pl-4 text-slate-300">"entity_name": "Arthur Pendelton",</p>
              <p className="pl-4 text-slate-300">"date_of_death": "2026-05-12",</p>
              <p className="pl-4 text-slate-300">"executor_name": "Eleanor Pendelton Vance",</p>
              <p className="pl-4 text-slate-300">"issuing_jurisdiction": "New York County",</p>
              <p className="pl-4 text-emerald-400">"authenticity_hash": "a4f91b92c81d09e82341b590e2d192fa"</p>
              <p className="text-blue-400">&#125;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

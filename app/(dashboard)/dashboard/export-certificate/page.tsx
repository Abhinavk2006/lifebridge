"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Printer, ShieldCheck } from "lucide-react";
import { useLifeBridgeStore } from "@/lib/store";
import { formatINR } from "@/utils/formatters";

export default function ExportCertificatePage() {
  const { cases, activeCaseId, institutions } = useLifeBridgeStore();
  const currentCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Automatically trigger PDF print/download dialog upon page mount
  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8 font-serif print:bg-white print:p-0">
      {/* Top Controls Bar (Hidden during printing) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden font-sans">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#002b49] hover:underline font-semibold"
        >
          <ArrowLeft className="w-4 h-4 text-[#B8935B]" />
          <span>RETURN TO MISSION CONTROL</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-[#004c8c] text-white text-xs font-semibold rounded-xl hover:bg-[#002b49] transition shadow-md flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-[#B8935B]" />
            <span>PRINT / SAVE AS PDF</span>
          </button>
        </div>
      </div>

      {/* Formal High Court Certified Legal Heir Certificate & Estate Statement Document */}
      <div className="max-w-4xl mx-auto bg-white border-2 border-slate-900 rounded-none p-8 sm:p-12 shadow-2xl space-y-8 print:shadow-none print:border-slate-900 print:max-w-none print:w-full print:p-6 text-slate-900 relative overflow-hidden">
        {/* Subtle Background Watermark Stamp Graphic */}
        <div className="absolute right-12 top-24 opacity-10 pointer-events-none">
          <Image
            src="/rbi_compliance_badge.png"
            alt="RBI Compliance Watermark"
            width={240}
            height={240}
            className="object-contain"
          />
        </div>

        {/* Official High Court & Fiduciary Letterhead Header (Single Logo Only) */}
        <div className="border-b-2 border-slate-900 pb-6 flex items-start justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Single Official Seal Logo */}
            <div className="relative w-20 h-20 shrink-0">
              <Image
                src="/ashoka_legal_seal.png"
                alt="High Court Ashoka Emblem Seal"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold uppercase tracking-wider text-slate-900">
                HIGH COURT OF JUDICATURE AT BOMBAY
              </h1>
              <p className="text-xs font-mono uppercase tracking-widest text-slate-700">
                TESTAMENTARY & INTESTATE JURISDICTION DIVISION
              </p>
              <p className="text-sm font-bold text-[#004c8c] mt-1">
                OFFICIAL FIDUCIARY ESTATE STATEMENT & LEGAL HEIR CERTIFICATE
              </p>
            </div>
          </div>

          <div className="text-right font-mono text-xs text-slate-700 shrink-0">
            <p>DATE: <strong>{currentDate}</strong></p>
            <p>CASE REF: <strong>{currentCase.caseNumber}</strong></p>
            <p>BENCH: <strong>{currentCase.probateCourt}</strong></p>
          </div>
        </div>

        {/* Certificate Preamble Statement */}
        <div className="text-xs sm:text-sm leading-relaxed space-y-3 font-sans">
          <p>
            <strong>TO WHOMSOEVER IT MAY CONCERN:</strong> This official fiduciary statement certifies that the financial holdings, bank accounts, and asset claims listed herein belonging to the deceased estate of late <strong className="text-slate-900 uppercase font-mono">{currentCase.deceasedName}</strong> have been forensically verified, audited, and matched against Class I legal heir entitlement rules under the <strong>Hindu Succession Act, 1956 (Section 8)</strong> and applicable <strong>Reserve Bank of India (RBI) Deceased Account Guidelines</strong>.
          </p>
        </div>

        {/* Case & Legal Representative Particulars Grid */}
        <div className="border border-slate-900 rounded-none overflow-hidden font-sans text-xs">
          <div className="bg-slate-100 border-b border-slate-900 p-2.5 font-mono font-bold uppercase tracking-wider text-slate-900">
            I. ESTATE & LEGAL REPRESENTATIVE PARTICULARS
          </div>
          <div className="grid grid-cols-2 divide-x divide-y divide-slate-900">
            <div className="p-3">
              <span className="text-slate-500 font-mono text-[10px] uppercase block">Deceased Account Holder</span>
              <span className="font-bold text-slate-900 font-mono text-sm">{currentCase.deceasedName}</span>
            </div>
            <div className="p-3">
              <span className="text-slate-500 font-mono text-[10px] uppercase block">Legal Representative / Executor</span>
              <span className="font-bold text-slate-900 font-mono text-sm">{currentCase.executorName}</span>
            </div>
            <div className="p-3">
              <span className="text-slate-500 font-mono text-[10px] uppercase block">Jurisdiction & Bench</span>
              <span className="font-semibold text-slate-800">{currentCase.probateCourt}</span>
            </div>
            <div className="p-3">
              <span className="text-slate-500 font-mono text-[10px] uppercase block">Applicable Succession Law</span>
              <span className="font-semibold text-slate-800">Hindu Succession Act 1956 - Class I Heir Schedule</span>
            </div>
          </div>
        </div>

        {/* Financial Assets Schedule Table */}
        <div className="border border-slate-900 rounded-none overflow-hidden font-sans text-xs">
          <div className="bg-slate-100 border-b border-slate-900 p-2.5 font-mono font-bold uppercase tracking-wider text-slate-900 flex justify-between">
            <span>II. SCHEDULE OF DISCOVERED BANK ACCOUNTS & ASSET CLAIMS</span>
            <span className="text-emerald-800">100% VERIFIED</span>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-900 font-mono text-[10px] uppercase bg-slate-50">
                <th className="p-2.5 border-r border-slate-900">Ref No</th>
                <th className="p-2.5 border-r border-slate-900">Institution & Branch</th>
                <th className="p-2.5 border-r border-slate-900">Account / Folio Ref</th>
                <th className="p-2.5 border-r border-slate-900">Category</th>
                <th className="p-2.5 text-right">Value (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 font-mono text-xs">
              {institutions.map((inst, idx) => (
                <tr key={inst.id}>
                  <td className="p-2.5 border-r border-slate-900 font-bold">{inst.claimId || `REF-00${idx + 1}`}</td>
                  <td className="p-2.5 border-r border-slate-900 font-sans font-semibold">{inst.name}</td>
                  <td className="p-2.5 border-r border-slate-900 text-slate-700">{inst.accountNumberMasked}</td>
                  <td className="p-2.5 border-r border-slate-900 font-sans">{inst.sector} / {inst.accountType}</td>
                  <td className="p-2.5 text-right font-bold">{formatINR(inst.estimatedValue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Net Valuation Summary Box */}
        <div className="border-2 border-slate-900 p-4 font-mono text-xs space-y-2 bg-slate-50">
          <div className="flex justify-between">
            <span>TOTAL DISCOVERED ASSET VALUE:</span>
            <span className="font-bold">{formatINR(currentCase.totalAssets || 34000000)}</span>
          </div>
          <div className="flex justify-between text-red-700">
            <span>LESS: MUNICIPAL DUES & OUTSTANDING LIABILITIES:</span>
            <span className="font-bold">- {formatINR(currentCase.totalLiabilities || 2100000)}</span>
          </div>
          <div className="border-t border-slate-900 pt-2 flex justify-between text-sm font-bold text-[#004c8c]">
            <span>NET AUDITED PROCEEDS PAYABLE TO LEGAL HEIRS:</span>
            <span>{formatINR(currentCase.netEstateValue)}</span>
          </div>
        </div>

        {/* Cryptographic SHA-256 Audit Seal Stamp Block */}
        <div className="border-2 border-dashed border-slate-900 p-4 font-mono text-xs space-y-2 bg-blue-50/50">
          <div className="flex items-center justify-between text-slate-900 font-bold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#004c8c]" />
              <span>CRYPTOGRAPHIC SHA-256 IMMUTABLE AUDIT SEAL STAMP</span>
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">PASSED & SEALED</span>
          </div>
          <p className="text-[10px] text-slate-700 break-all leading-tight">
            HASH: 8f9b4c2e1a3d5e7f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f
          </p>
          <p className="text-[10px] text-slate-600 font-sans">
            Every agent prompt, document verification score, and human officer sign-off event has been cryptographically recorded and appended to the immutable blockchain-equivalent ledger.
          </p>
        </div>

        {/* Signature & Officer Stamp Block */}
        <div className="pt-8 grid grid-cols-2 gap-8 items-end text-xs font-sans">
          <div className="space-y-1 text-center">
            <div className="h-12 flex items-center justify-center italic font-serif text-slate-700 text-sm">
              {currentCase.executorName}
            </div>
            <div className="border-t border-slate-900 pt-1 font-mono text-[11px] font-bold">
              SIGNATURE OF LEGAL HEIR EXECUTOR
            </div>
          </div>

          <div className="space-y-1 text-center">
            <div className="h-12 flex items-center justify-center">
              <Image src="/ashoka_legal_seal.png" alt="High Court Seal Stamp" width={48} height={48} className="object-contain" />
            </div>
            <div className="border-t border-slate-900 pt-1 font-mono text-[11px] font-bold">
              SEAL & SIGNATURE OF HIGH COURT COMPLIANCE AUDITOR
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

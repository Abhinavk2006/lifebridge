'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  FileCheck, 
  Bot, 
  Lock, 
  Building2, 
  ChevronRight,
  Phone,
  HelpCircle,
  Award,
  Send
} from 'lucide-react';

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<'discovery' | 'verification' | 'negotiation' | 'compliance'>('discovery');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full bg-[#F6F7FA] font-sans">
      {/* Top Utility Bar (HDFC Bank Style) */}
      <div className="bg-[#002b49] text-white text-xs py-2 px-4 border-b border-white/10 hidden sm:block">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between font-medium">
          <div className="flex items-center gap-6">
            <span className="text-[#B8935B] font-bold">Personal</span>
            <span className="hover:text-gray-300 cursor-pointer">NRI Legal Heirs</span>
            <span className="hover:text-gray-300 cursor-pointer">HNI & Probate</span>
            <span className="hover:text-gray-300 cursor-pointer">Bank Partner Portal</span>
            <span className="hover:text-gray-300 cursor-pointer">Government Schemes (EPF/NPS)</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-gray-300 cursor-pointer">
              <Phone className="w-3.5 h-3.5 text-[#B8935B]" />
              <span>Helpline: 1800-200-8819</span>
            </span>
            <select className="bg-white/10 text-white rounded px-2 py-0.5 text-[11px] focus:outline-none cursor-pointer">
              <option value="en" className="bg-[#002b49]">English</option>
              <option value="hi" className="bg-[#002b49]">हिंदी (Hindi)</option>
              <option value="mr" className="bg-[#002b49]">मराठी (Marathi)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Bank Navigation Header */}
      <header className="bg-[#004c8c] text-white py-3.5 px-4 shadow-md sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* LifeBridge Brand Logo Block */}
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-lg shadow-sm">
                <Image 
                  src="/ashoka_legal_seal.png" 
                  alt="LifeBridge Seal" 
                  width={36} 
                  height={36} 
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block leading-tight">
                  LIFEBRIDGE BANKING
                </span>
                <span className="text-[10px] font-mono text-blue-200 uppercase tracking-wider block">
                  AI Estate & Claim Settlement Mesh
                </span>
              </div>
            </Link>

            {/* Main Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-white">
              <span className="hover:text-[#B8935B] cursor-pointer flex items-center gap-1">
                <span>Discover Accounts</span>
                <ChevronRight className="w-3 h-3 text-[#B8935B]" />
              </span>
              <span className="hover:text-[#B8935B] cursor-pointer flex items-center gap-1">
                <span>Legal Heir Verification</span>
                <ChevronRight className="w-3 h-3 text-[#B8935B]" />
              </span>
              <span className="hover:text-[#B8935B] cursor-pointer flex items-center gap-1">
                <span>RBI Settlement Rules</span>
                <ChevronRight className="w-3 h-3 text-[#B8935B]" />
              </span>
              <span className="hover:text-[#B8935B] cursor-pointer">Offers & Fee Waivers</span>
            </nav>
          </div>

          {/* Login & Portal Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/bank-portal"
              className="hidden sm:inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-lg border border-white/20 transition"
            >
              <Building2 className="w-4 h-4 text-[#B8935B]" />
              <span>B2B Bank Portal</span>
            </Link>

            <Link
              href="/dashboard/approvals"
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm transition flex items-center gap-1.5 uppercase tracking-wider"
            >
              <span>LOGIN TO CLAIMS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner with Authentic Indian Family Background Image (HDFC Style) */}
      <section className="relative min-h-[520px] bg-slate-900 overflow-hidden flex items-center py-12">
        {/* Real Indian Family Photography Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/indian_family_hero.png"
            alt="Indian Family Banking"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b49] via-[#002b49]/80 to-transparent" />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-white">
            <div className="inline-flex items-center gap-2 bg-[#B8935B]/20 text-[#B8935B] border border-[#B8935B]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-[#B8935B]" />
              <span>AI-Assisted, Human-Approved Estate Settlement Platform</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-[1.15] text-white tracking-tight">
              Resolve Deceased Accounts & Unlisted Assets in Weeks, Not Months.
            </h1>

            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-xl">
              Helping legal heirs in India discover bank accounts, fixed deposits, mutual funds, and LIC policies — with 100% human-in-the-loop sign-off.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/dashboard/approvals"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <span>Launch Claim Command Center</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </Link>
              <Link
                href="/bank-portal"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-white/20 backdrop-blur-xs transition flex items-center gap-2"
              >
                <Building2 className="w-5 h-5 text-[#B8935B]" />
                <span>Bank Compliance Portal</span>
              </Link>
            </div>
          </div>

          {/* Right Column: HDFC-Style Floating Card Selector Box */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-slate-200 text-slate-900 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="font-serif font-bold text-base text-[#002b49] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#004c8c]" />
                  <span>Start Guided Estate Claim</span>
                </span>
                <span className="bg-blue-50 text-[#004c8c] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  RBI COMPLIANT
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Select Asset Category</label>
                  <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#004c8c]">
                    <option>Bank Savings Account & Fixed Deposit</option>
                    <option>Mutual Fund & Demat Folio</option>
                    <option>LIC / Insurance Death Claim</option>
                    <option>EPF / NPS Pension Settlement</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Deceased Jurisdiction / High Court</label>
                  <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#004c8c]">
                    <option>Maharashtra (High Court of Judicature at Bombay)</option>
                    <option>Delhi NCR (High Court of Delhi)</option>
                    <option>Karnataka (High Court of Karnataka, Bengaluru)</option>
                    <option>Tamil Nadu (High Court of Judicature at Madras)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <Link
                    href="/dashboard"
                    className="w-full bg-[#004c8c] hover:bg-[#002b49] text-white font-bold text-xs py-3 rounded-lg shadow-sm transition flex items-center justify-center gap-2 uppercase tracking-wider"
                  >
                    <span>Check Claim Eligibility</span>
                    <ArrowRight className="w-4 h-4 text-[#B8935B]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating ASK EVA / ASK LIFEBRIDGE AI Bar (HDFC Style from Screenshot 2) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-20 hidden md:block">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-2xl border border-blue-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#004c8c] text-white flex items-center justify-center font-bold text-xs shrink-0">
              AI
            </div>
            <input
              type="text"
              placeholder="Ask LifeBridge AI: e.g. What documents are required for SBI account claim without nominee?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-xs text-slate-800 focus:outline-none placeholder-slate-400 font-sans"
            />
            <button className="p-2 rounded-lg bg-[#004c8c] text-white hover:bg-[#002b49] transition">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Promotional Banking Cards Grid (HDFC Style from Screenshot 3) */}
      <section className="py-16 px-4 max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="font-serif text-3xl font-bold text-[#002b49]">Fiduciary Services Tailor-Made for Heirs</h2>
          <p className="text-slate-600 text-xs">Official legal heir support, bank negotiation, and forensic verification.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Bank Officer Direct Contact */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition space-y-4 group">
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              <Image
                src="/indian_bank_manager.png"
                alt="Indian Bank Officer"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>
            <div className="p-5 space-y-2">
              <span className="bg-blue-50 text-[#004c8c] text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                B2B BANK PARTNER MESH
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900">Direct Bank Officer Negotiation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with assigned compliance officers across 28+ Indian nationalized and private banks.
              </p>
              <div className="pt-2">
                <Link href="/bank-portal" className="text-xs font-bold text-[#004c8c] hover:underline inline-flex items-center gap-1">
                  <span>Open Bank Partner Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Digital Fraud Protection (HDFC Vigil Style) */}
          <div className="bg-gradient-to-br from-blue-900 to-[#002b49] text-white border border-slate-700 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#B8935B] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                100% RBI COMPLIANCE
              </span>
              <h3 className="font-serif text-xl font-bold">Forensic Document Verification Shield</h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Prevents account takeover fraud with SHA-256 cryptographic seal matching against Municipal Corporation e-District databases.
              </p>
            </div>
            <Link
              href="/dashboard/approvals"
              className="bg-[#B8935B] text-[#002b49] text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-white transition text-center"
            >
              INSPECT AUDIT LEDGER
            </Link>
          </div>

          {/* Card 3: High Court Official Seal */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="relative w-16 h-16">
                <Image
                  src="/ashoka_legal_seal.png"
                  alt="High Court Legal Seal"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                HIGH COURT JUDICATURE
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900">High Court Probate Package</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Export court-certified legal heir accounting statements compliant with the Hindu Succession Act, 1956.
              </p>
            </div>
            <Link href="/dashboard" className="text-xs font-bold text-[#004c8c] hover:underline inline-flex items-center gap-1">
              <span>View Sample Court Export</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Yellow/Cream Digital Services Section (HDFC Style from Screenshot 4) */}
      <section className="bg-[#ffeb99]/60 border-t border-b border-amber-200 py-16 px-4">
        <div className="max-w-[1280px] mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-serif text-3xl font-bold text-slate-900">Explore Digital Estate Services</h2>
            <p className="text-xs text-slate-700">Instant digital services for legal heirs, executors, and bank auditors.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-xs space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#002b49] border-b border-slate-100 pb-2">Top Online Services</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="hover:text-[#004c8c] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#004c8c]" />
                  <span>Instant Deceased Claim Status</span>
                </li>
                <li className="hover:text-[#004c8c] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#004c8c]" />
                  <span>Form 26AS Tax Asset Parsing</span>
                </li>
                <li className="hover:text-[#004c8c] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#004c8c]" />
                  <span>Digital Heir Cert Verification</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-xs space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#002b49] border-b border-slate-100 pb-2">Account Services</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="hover:text-[#004c8c] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#004c8c]" />
                  <span>Nominee Updation & Verification</span>
                </li>
                <li className="hover:text-[#004c8c] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#004c8c]" />
                  <span>Address & Claimant KYC Update</span>
                </li>
                <li className="hover:text-[#004c8c] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#004c8c]" />
                  <span>Indemnity Bond Generation</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-xs space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#002b49] border-b border-slate-100 pb-2">Deposits & Mutual Funds</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="hover:text-[#004c8c] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#004c8c]" />
                  <span>Fixed Deposit Liquidation</span>
                </li>
                <li className="hover:text-[#004c8c] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#004c8c]" />
                  <span>Demat Folio Transmission</span>
                </li>
                <li className="hover:text-[#004c8c] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#004c8c]" />
                  <span>EPF / NPS Claim Settlement</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-xs space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#002b49] border-b border-slate-100 pb-2">Legal & Compliance</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="hover:text-[#004c8c] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#004c8c]" />
                  <span>High Court Testamentary Bench</span>
                </li>
                <li className="hover:text-[#004c8c] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#004c8c]" />
                  <span>SHA-256 Ledger Audit Log</span>
                </li>
                <li className="hover:text-[#004c8c] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#004c8c]" />
                  <span>Advocate Review Workspace</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002b49] text-white py-8 px-4 text-xs">
        <div className="max-w-[1280px] mx-auto text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm font-serif font-bold text-white">
            <Image src="/ashoka_legal_seal.png" alt="LifeBridge Seal" width={24} height={24} />
            <span>LIFEBRIDGE AI ESTATE SETTLEMENT PLATFORM</span>
          </div>
          <p className="text-slate-300 max-w-3xl mx-auto text-[11px] leading-relaxed">
            Legal Disclaimer: LifeBridge is an AI-assisted, human-approved fiduciary claim platform. All succession logic is constructed under the Hindu Succession Act, 1956 and RBI Master Directions. Unverified legal citations are flagged for advocate review. No autonomous transfer occurs without explicit human approval.
          </p>
        </div>
      </footer>
    </div>
  );
}

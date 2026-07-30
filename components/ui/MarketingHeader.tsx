'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ShieldCheck, ChevronDown, Sparkles, Building2, FileCheck, ArrowRight, UserCheck, Lock, Globe } from 'lucide-react';

export const MarketingHeader: React.FC = () => {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-slate-200">
      {/* Slim Dark Utility Bar */}
      <div className="bg-[#0b132b] text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">Audience:</span>
            <button className="text-white font-semibold flex items-center gap-1 hover:text-blue-300">
              For Family Executors <ChevronDown className="w-3 h-3" />
            </button>
            <span className="text-slate-600">|</span>
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">
              For Legal Counsel & Fiduciaries
            </Link>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> SOC2 Type II & HIPAA Certified
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> US & Canada Jurisdiction
            </span>
            <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 font-medium">
              24/7 Fiduciary Hotline
            </Link>
          </div>
        </div>
      </div>

      {/* Main White Nav Bar */}
      <div className="max-w-[1200px] mx-auto px-4 py-3.5 flex items-center justify-between relative">
        {/* Brand Emblem */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-800 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5 text-blue-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xl font-bold tracking-tight text-slate-900">LIFEBRIDGE</span>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded font-mono-val">AI</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Enterprise Estate Settlement</p>
          </div>
        </Link>

        {/* Primary Links with Mega-Menu hover */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <div 
            className="relative"
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-blue-600 py-2">
              Platform Modules <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {/* Mega Menu Dropdown */}
            {megaMenuOpen && (
              <div className="absolute top-full left-0 -ml-16 w-[720px] bg-white border border-slate-200 rounded-xl shadow-2xl p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Core Intelligence</h4>
                  <Link href="/dashboard" className="group block p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600" /> Mission Control
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Real-time executor command dashboard and agent ticker.</p>
                  </Link>
                  <Link href="/dashboard/graph" className="group block p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600" /> Knowledge Graph
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Interactive visual map of estate assets, debts, and heirs.</p>
                  </Link>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Automation & Risk</h4>
                  <Link href="/dashboard/documents" className="group block p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-blue-600" /> Forensic Verification
                    </div>
                    <p className="text-xs text-slate-500 mt-1">OCR, tamper detection, and legal document authentication.</p>
                  </Link>
                  <Link href="/dashboard/audit" className="group block p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-600" /> Immutable Audit
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Cryptographic proof ledger for court probate filings.</p>
                  </Link>
                </div>

                {/* Promo Card in Mega-Menu */}
                <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-xl p-4 text-white flex flex-col justify-between">
                  <div>
                    <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-400/30">
                      Enterprise Case Study
                    </span>
                    <h5 className="font-serif font-bold text-sm mt-2 text-white">40 Calls reduced to 3 Weeks</h5>
                    <p className="text-xs text-slate-300 mt-1">See how LifeBridge AI settled a complex 28-institution estate autonomously.</p>
                  </div>
                  <Link href="/dashboard" className="inline-flex items-center text-xs font-semibold text-blue-300 hover:text-white mt-4">
                    Explore Demo Path <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Agent Mesh</Link>
          <Link href="/dashboard/audit" className="hover:text-blue-600 transition-colors">Legal & Compliance</Link>
          <Link href="/dashboard/simulation" className="hover:text-blue-600 transition-colors">Scenario Simulator</Link>
        </nav>

        {/* CTA Button & Language Switcher */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href="/dashboard" className="text-slate-700 hover:text-slate-900 text-sm font-semibold px-3 py-2">
            Log In
          </Link>
          <Link 
            href="/dashboard" 
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4" /> Enter Mission Control
          </Link>
        </div>
      </div>
    </header>
  );
};

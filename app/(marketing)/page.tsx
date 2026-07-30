'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  FileCheck, 
  Bot, 
  Sliders, 
  Lock, 
  Building2, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  Zap,
  Users
} from 'lucide-react';

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<'discovery' | 'verification' | 'negotiation' | 'compliance'>('discovery');

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-blue-50/30 pt-16 pb-20 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 text-center relative z-10">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 border border-blue-200 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
            <span>Introducing Autonomous Estate Settlement Mesh</span>
            <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
          </div>

          {/* Editorial Serif Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-[1.15] max-w-4xl mx-auto tracking-tight">
            Turn <span className="text-blue-600 underline decoration-blue-300 underline-offset-4">40 Phone Calls & 8 Months</span> into One Command Center, Resolved in Weeks.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            The enterprise AI platform for executors, families, and legal counsel. Discover unlisted accounts, verify documents forensically, negotiate with institutions, and generate court-certified audit trails automatically.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
            >
              <span>Launch Mission Control Demo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/dashboard/graph"
              className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-800 font-semibold text-base px-6 py-4 rounded-xl border border-slate-300 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Building2 className="w-5 h-5 text-slate-500" />
              <span>Explore Knowledge Graph</span>
            </Link>
          </div>

          {/* Trust Metrics Pill */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 max-w-3xl mx-auto grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-mono-val font-bold text-2xl sm:text-3xl text-slate-900">₹1.48 Cr+</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Average Estate Assets Discovered</p>
            </div>
            <div>
              <p className="font-mono-val font-bold text-2xl sm:text-3xl text-blue-600">28 Orgs</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Institutions Resolved Autonomously</p>
            </div>
            <div>
              <p className="font-mono-val font-bold text-2xl sm:text-3xl text-emerald-600">100%</p>
              <p className="text-xs text-slate-500 font-medium mt-1">High Court Probate Audit Compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Interactive Feature Showcase */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-bold text-slate-900">Six Autonomous Platform Pillars</h2>
            <p className="text-slate-600 text-sm mt-2">
              Designed specifically for grieving family executors, legal heirs, and enterprise probate attorneys in India.
            </p>
          </div>

          {/* Tab Controls */}
          <div className="flex justify-center border-b border-slate-200 mb-8 overflow-x-auto">
            {(['discovery', 'verification', 'negotiation', 'compliance'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold text-sm capitalize border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'border-blue-600 text-blue-600 font-bold' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab === 'discovery' && '1. Multi-Bank Discovery'}
                {tab === 'verification' && '2. Forensic Verification'}
                {tab === 'negotiation' && '3. Institution AI Agents'}
                {tab === 'compliance' && '4. Legal Audit Trail'}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="card-enterprise p-8 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              {activeTab === 'discovery' && (
                <>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900">Multi-Institutional Account Discovery</h3>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    Most executors spend months waiting for physical letters to find EPF/NPS pensions, fixed deposits, or LIC policies. LifeBridge AI parses Form 26AS, AIS/TIS tax statements, bank feeds, and ITD filings to automatically construct an entity knowledge graph of 25+ Indian institutions.
                  </p>
                  <ul className="mt-4 space-y-2 text-xs font-semibold text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Scans Form 26AS, AIS, Form 16 & ITD disclosures</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Identifies unlisted Demat accounts, mutual funds & insurance</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Maps bank loans, municipal dues & utility connection endpoints</li>
                  </ul>
                </>
              )}

              {activeTab === 'verification' && (
                <>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900">Forensic Document Verification & Fraud Shield</h3>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    Prevent account takeover fraud while ensuring document authenticity. Verification agents scan seals, Sub-Registrar stamps, Tehsildar signatures, and QR codes against e-District databases in seconds.
                  </p>
                  <ul className="mt-4 space-y-2 text-xs font-semibold text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cryptographic SHA-256 seal verification</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Automated PAN, Aadhaar & Legal Heir Cert entity extraction</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Forgery scorecards accepted by Indian nationalized & private banks</li>
                  </ul>
                </>
              )}

              {activeTab === 'negotiation' && (
                <>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
                    <Bot className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900">AI Agent Institution Negotiation Mesh</h3>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    Stop waiting in bank branch queues for hours. Specialized agents generate RBI-compliant claim packets, submit Form ISR-1, EPFO Form 10D, follow up autonomously, and request dormant fee waivers under RBI Master Directions.
                  </p>
                  <ul className="mt-4 space-y-2 text-xs font-semibold text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Autonomous follow-ups with SBI, LIC, EPFO, and insurers</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Waives dormant account penalty fees automatically under RBI guidelines</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Human-in-the-Loop one-click executor approvals</li>
                  </ul>
                </>
              )}

              {activeTab === 'compliance' && (
                <>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900">Cryptographic Audit & Court Accounting Export</h3>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    Every prompt trace, document upload, and institution handshake is recorded in an immutable ledger. Export court-ready legal heir accounting packets compliant with the High Court and Hindu Succession Act.
                  </p>
                  <ul className="mt-4 space-y-2 text-xs font-semibold text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Court-certified PDF accounting statements</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Complete prompt trace & decision transparency</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Legal succession compliance verification</li>
                  </ul>
                </>
              )}

              <div className="mt-6">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                >
                  <span>See Live Demo in Mission Control</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Interactive Mock Preview Box */}
            <div className="bg-slate-900 rounded-xl p-5 text-white font-mono-val text-xs space-y-3 shadow-xl border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-blue-400 font-bold">LIFEBRIDGE AGENT LOG // CASE #MH-2026-004921</span>
                <span className="text-emerald-400">STATUS: ACTIVE</span>
              </div>
              <div className="space-y-2 text-slate-300">
                <p className="text-slate-400">[09:22:10] Executing Agent: Discovery-01</p>
                <p className="text-emerald-300">✓ Found account #****-4912 at State Bank of India (₹24,50,000)</p>
                <p className="text-slate-400">[09:23:44] Executing Agent: Verification-03</p>
                <p className="text-emerald-300">✓ Legal Heir Certificate Seal Score: 98.8% (Verified by High Court)</p>
                <p className="text-slate-400">[09:25:01] Executing Agent: Negotiation-04</p>
                <p className="text-amber-300">⚡ Claim packet dispatched to SBI. Penalty fee waiver (₹45,000) pending executor click under RBI norms.</p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Knowledge Graph Nodes: 28 Linked</span>
                <span className="text-blue-300">Execution DAG: 78% Complete</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

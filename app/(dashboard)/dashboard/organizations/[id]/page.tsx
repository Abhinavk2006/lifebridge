'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLifeBridgeStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { formatINR } from '@/utils/formatters';
import { Building2, Bot, CheckCircle2, FileText, Send, ShieldCheck, ArrowLeft, Download, X, Eye, Printer, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { downloadRBIFeeWaiverCertificate } from '@/utils/exportPackage';

export default function NegotiationRoomPage() {
  const params = useParams();
  const instId = params?.id as string;
  const { institutions, updateInstitutionStatus } = useLifeBridgeStore();
  const { toast } = useToast();
  const { t } = useLanguage();
  const inst = institutions.find(i => i.id === instId) || institutions[0] || {
    id: 'org-301',
    name: 'State Bank of India (SBI)',
    sector: 'Banking',
    accountNumberMasked: 'SB-****4912',
    estimatedValue: 2450000,
    accountType: 'Premier Savings & Term Deposit',
    status: 'in_negotiation',
    contactPerson: 'Fiduciary & Claims Desk (Mumbai Main)',
    lastContactDate: '2026-07-30 08:45',
    feeWaiverAmount: 45000,
    sopRequirements: ['Certified Death Certificate', 'Legal Heir Certificate', 'Form ISR-1 (KYC Update)', 'NOC from Heirs'],
    claimId: 'CLM-SBI-9921'
  };

  const [messages, setMessages] = useState([
    {
      id: 'm-1',
      sender: 'Agent',
      senderName: 'Negotiation Agent 04',
      timestamp: '2026-07-29 10:14 AM',
      content: 'Dispatched automated Notice of Fiduciary Claim & Form ISR-1 KYC Update packet for savings account #SB-****4912 under High Court Case #MH-2026-004921.',
      attachedDoc: 'Legal_Heir_Certificate_Bombay_High_Court.pdf'
    },
    {
      id: 'm-2',
      sender: 'Institution',
      senderName: 'State Bank of India (SBI) Fiduciary Ops (Ref: CLM-SBI-9921)',
      timestamp: '2026-07-29 02:45 PM',
      content: 'Notice received. Account frozen per RBI guidelines. Savings balance verified at ₹24,50,000. Account accrued ₹45,000 in dormant account maintenance penalties over the past 60 days.',
      attachedDoc: 'SBI_Account_Ledger_Statement.pdf'
    },
    {
      id: 'm-3',
      sender: 'Agent',
      senderName: 'Negotiation Agent 04',
      timestamp: '2026-07-30 08:30 AM',
      content: 'Invoked RBI Master Directions on Settlement of Claims in Respect of Deceased Depositors (DBOD.No.Leg.BC.95/09.07.005/2004-05) demanding waiver of dormant penalty fees for accounts undergoing legal heir intake.',
      attachedDoc: 'RBI_Statutory_Fee_Waiver_Brief.pdf'
    },
    {
      id: 'm-4',
      sender: 'Institution',
      senderName: 'State Bank of India (SBI) Fiduciary Ops',
      timestamp: '2026-07-30 08:45 AM',
      content: 'RBI Master Direction cited. State Bank of India agrees to waive ₹45,000 in penalty charges upon 1-click digital authorization by Lead Executor Eleanor Vance.',
      attachedDoc: 'SBI_Fee_Waiver_Release_Form.pdf'
    }
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<{ title: string; docType: string } | null>(null);

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      sender: 'User',
      senderName: 'Eleanor Vance (Lead Executor)',
      timestamp: 'Just now',
      content: inputMsg,
      attachedDoc: 'Executor_Authorization_Affidavit.pdf'
    };

    setMessages([...messages, newMsg]);
    setInputMsg('');
    toast('Message Dispatched', 'Your instructions have been sent to Negotiation Agent 04 & SBI Fiduciary Ops.', 'success');
  };

  const handleExportWaiverCert = () => {
    downloadRBIFeeWaiverCertificate({
      claimId: inst.claimId,
      institutionName: inst.name,
      waivedAmount: '₹45,000'
    });
    toast('RBI Fee Waiver Certificate Exported!', `Downloaded RBI_Statutory_Fee_Waiver_Release_${inst.claimId}.txt with official RBI circular citation.`, 'success');
  };

  const handleOpenDoc = (docName: string) => {
    setSelectedDoc({
      title: docName,
      docType: docName.includes('Certificate') ? 'Legal Heir Certificate' : docName.includes('Ledger') ? 'Bank Account Statement' : 'RBI Fee Waiver Notice'
    });
    toast('Viewing Verified Document', `Opening ${docName} with High Court Ashoka Seal verification...`, 'info');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/organizations"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition text-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#004c8c]">
              <Building2 className="w-4 h-4 text-[#B8935B]" />
              <span>{t('org.room_tag')}</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-slate-900">{inst.name}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-amber-100 text-amber-800 text-xs font-mono font-bold px-3 py-1.5 rounded-lg border border-amber-200">
            {t('org.waiver_pending')} (+₹45,000)
          </span>
          <button
            onClick={handleExportWaiverCert}
            className="px-4 py-2 bg-[#004c8c] text-white text-xs font-semibold rounded-xl hover:bg-[#002b49] transition flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#B8935B]" />
            <span>{t('org.export_certificate')}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Live Agent Negotiation Transcript */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-serif font-bold text-lg text-slate-900">{t('org.negotiation_transcript')}</h2>
              <span className="text-xs font-mono text-slate-500">Claim ID: {inst.claimId}</span>
            </div>

            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl space-y-2 border text-xs font-sans transition ${
                    m.sender === 'Agent'
                      ? 'bg-blue-50/70 border-blue-200 text-slate-900'
                      : m.sender === 'Institution'
                      ? 'bg-slate-50 border-slate-200 text-slate-900'
                      : 'bg-emerald-50 border-emerald-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <div className="flex items-center gap-2 font-bold text-[#004c8c]">
                      <Bot className="w-3.5 h-3.5 text-[#B8935B]" />
                      <span>{m.senderName}</span>
                    </div>
                    <span className="text-slate-500">{m.timestamp}</span>
                  </div>

                  <p className="leading-relaxed text-slate-800">{m.content}</p>

                  {m.attachedDoc && (
                    <div className="pt-2">
                      <button
                        onClick={() => handleOpenDoc(m.attachedDoc)}
                        className="inline-flex items-center gap-2 bg-white border border-blue-300 hover:border-[#004c8c] text-[#004c8c] font-mono font-semibold px-3 py-1.5 rounded-lg text-[11px] shadow-2xs hover:shadow-xs transition cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#B8935B]" />
                        <span>Attached: {m.attachedDoc}</span>
                        <Eye className="w-3.5 h-3.5 text-blue-600 ml-1" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Form */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type executor instructions or upload counter-claim affidavit..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004c8c]"
              />
              <button
                onClick={handleSendMessage}
                className="px-5 py-2.5 bg-[#004c8c] hover:bg-[#002b49] text-white text-xs font-bold rounded-xl transition flex items-center gap-2 uppercase tracking-wider shrink-0"
              >
                <Send className="w-4 h-4 text-[#B8935B]" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Institution Overview & Required SOP Documents */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
              {t('org.institution_overview')}
            </h3>

            <div className="space-y-4 font-sans text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 font-mono">
                <span className="text-[11px] text-slate-500 uppercase">{t('org.account_verified_balance')}</span>
                <p className="text-2xl font-bold text-[#004c8c]">{formatINR(inst.estimatedValue)}</p>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-1 font-mono">
                <span className="text-[11px] text-emerald-800 uppercase font-bold">{t('org.fee_waiver_value')}</span>
                <p className="text-xl font-bold text-emerald-700">+₹45,000 Waived</p>
              </div>

              {/* Required SOP Documents List */}
              <div className="space-y-3 pt-2">
                <h4 className="font-semibold text-slate-900">{t('org.required_sop_docs')}</h4>
                <div className="space-y-2">
                  {inst.sopRequirements.map((req, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOpenDoc(`${req.replace(/\s+/g, '_')}.pdf`)}
                      className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition flex items-center justify-between gap-2 cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-medium text-slate-800 text-xs group-hover:text-[#004c8c]">{req}</span>
                      </div>
                      <Eye className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#004c8c]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Forensic Document Inspection Viewer Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-slate-900 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden text-slate-900 font-serif">
            {/* Document Header */}
            <div className="bg-[#002b49] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 p-1 border border-white/20">
                  <Image src="/ashoka_legal_seal.png" alt="High Court Seal" width={36} height={36} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white">{selectedDoc.title}</h3>
                  <p className="text-xs text-blue-200 font-mono">FORENSIC SEAL AUTHENTICATED &bull; HIGH COURT BENCH BOMBAY</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-slate-300 hover:text-white transition p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Preview Body */}
            <div className="p-8 space-y-6 bg-slate-50 max-h-[70vh] overflow-y-auto font-sans text-xs">
              <div className="bg-white border border-slate-300 p-6 rounded-xl shadow-xs space-y-4 font-serif">
                <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-3">
                    <Image src="/ashoka_legal_seal.png" alt="Ashoka Seal" width={56} height={56} />
                    <div>
                      <h4 className="font-bold text-base text-slate-900">HIGH COURT OF JUDICATURE AT BOMBAY</h4>
                      <p className="text-xs font-mono text-slate-600">TESTAMENTARY DIVISION &bull; VERIFIED EXHIBIT</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-mono font-bold text-xs px-3 py-1 rounded-full">
                    AUTHENTICITY: 98.9%
                  </span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-slate-800 font-sans">
                  <p>
                    <strong>EXHIBIT SUMMARY:</strong> Verified copy of <strong className="text-slate-900">{selectedDoc.title}</strong> pertaining to the Estate of Late Rameshchandra Mehta (Case REF: MH-2026-004921).
                  </p>
                  <div className="bg-slate-100 p-3 rounded-lg font-mono text-[11px] text-slate-700">
                    CRYPTOGRAPHIC HASH: 8f9b4c2e1a3d5e7f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d
                  </div>
                  <p className="text-slate-600">
                    Matches Section 8 Hindu Succession Act Class I Legal Heir records and State Bank of India Fiduciary Intake SOP.
                  </p>
                </div>
              </div>
            </div>

            {/* Document Footer Controls */}
            <div className="bg-slate-100 px-6 py-4 border-t border-slate-300 flex items-center justify-between font-sans text-xs">
              <span className="text-slate-600 font-mono">STATUS: SEAL VERIFIED & ACCEPTED BY BANK</span>
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard/export-certificate"
                  className="px-5 py-2.5 bg-[#004c8c] hover:bg-[#002b49] text-white font-bold rounded-xl transition flex items-center gap-2 uppercase tracking-wider"
                >
                  <Download className="w-4 h-4 text-[#B8935B]" />
                  <span>Download PDF Document</span>
                </Link>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

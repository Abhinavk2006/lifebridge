'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Institution } from '@/lib/types';
import { formatINR } from '@/utils/formatters';
import { 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  IndianRupee, 
  Building2, 
  Key, 
  Award, 
  BadgeCheck, 
  Clock, 
  Download, 
  Printer, 
  Eye, 
  Send, 
  Scan, 
  Zap, 
  Sparkles,
  Shield,
  FileCheck,
  Check,
  UploadCloud,
  FilePlus,
  QrCode,
  Smartphone,
  CreditCard,
  Copy,
  AlertCircle
} from 'lucide-react';

export default function InsuranceOrganizationsPage() {
  const { institutions, updateInstitutionStatus, cases, activeCaseId } = useLifeBridgeStore();
  const { t } = useLanguage();

  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];
  const insInsts = institutions.filter((i) => i.sector === 'Insurance');

  // Claim Gateway State
  const [selectedInstForClaim, setSelectedInstForClaim] = useState<Institution | null>(null);
  const [portalStep, setPortalStep] = useState<'UPLOAD_DOCS' | 'AUDIT' | 'PAYMENT' | 'VOUCHER'>('UPLOAD_DOCS');
  const [claimProgress, setClaimProgress] = useState(0);
  const [claimLogs, setClaimLogs] = useState<string[]>([]);
  const [claimRefNo, setClaimRefNo] = useState('');
  const [neftRefNo, setNeftRefNo] = useState('');
  const [txnId, setTxnId] = useState('');

  // Document Uploads State for Insurance Claim
  const [uploadedDeathCert, setUploadedDeathCert] = useState('Certified_Death_Certificate_DigiLocker_MH2026.pdf');
  const [uploadedPolicyDoc, setUploadedPolicyDoc] = useState('Original_Policy_Bond_Schedule_LIC_883910.pdf');
  const [uploadedChequeDoc, setUploadedChequeDoc] = useState('Nominee_SBI_Cancelled_Cheque_Eleanor.pdf');
  const [uploadedKycDoc, setUploadedKycDoc] = useState('Nominee_Aadhaar_PAN_KYC_Verified.pdf');
  const [isDocUploading, setIsDocUploading] = useState(false);
  const [docUploadStep, setDocUploadStep] = useState<string | null>(null);

  // Payment Options State (₹100.00 IRDAI Processing Fee)
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'NET_BANKING' | 'RUPAY'>('UPI');
  const [selectedBank, setSelectedBank] = useState('State Bank of India (SBI)');
  const [upiId, setUpiId] = useState('eleanor.vance@okaxis');
  const [isUpiVerified, setIsUpiVerified] = useState(true);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [cardNumber, setCardNumber] = useState('6521 9041 8820 9014');
  const [cardHolder, setCardHolder] = useState('Eleanor Vance');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('491');
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Preview Death Certificate Modal State
  const [showCertPreview, setShowCertPreview] = useState(false);

  const totalSumAssured = insInsts.reduce((acc, curr) => acc + Math.abs(curr.estimatedValue), 0);
  const settledSumAssured = insInsts
    .filter(i => i.status === 'settled')
    .reduce((acc, curr) => acc + Math.abs(curr.estimatedValue), 0);

  const handleStartClaim = (inst: Institution) => {
    setSelectedInstForClaim(inst);
    setPortalStep('UPLOAD_DOCS');
    setClaimProgress(0);
    setClaimLogs([]);
    const ref = `IRDAI-CLAIM-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const neft = `NEFT-${inst.name.substring(0, 3).toUpperCase()}-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const txn = `TXN-INS-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setClaimRefNo(ref);
    setNeftRefNo(neft);
    setTxnId(txn);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSimulateCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetDocType: 'policy' | 'cheque' | 'kyc') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsDocUploading(true);
      setDocUploadStep(targetDocType);
      setTimeout(() => {
        setIsDocUploading(false);
        setDocUploadStep(null);
        if (targetDocType === 'policy') setUploadedPolicyDoc(file.name);
        if (targetDocType === 'cheque') setUploadedChequeDoc(file.name);
        if (targetDocType === 'kyc') setUploadedKycDoc(file.name);
      }, 1000);
    }
  };

  const handleExecutePaymentAndDisbursement = () => {
    setPaymentProcessing(true);
    setClaimProgress(10);
    setClaimLogs(['[0.1s] Authorizing ₹100.00 IRDAI Statutory Claim Intimation Fee...']);

    setTimeout(() => {
      setClaimProgress(45);
      setClaimLogs(prev => [
        ...prev,
        `[0.5s] Verifying Uploaded Documents (${uploadedDeathCert}, ${uploadedPolicyDoc}) against Policy #${selectedInstForClaim?.accountNumberMasked}...`
      ]);
    }, 500);

    setTimeout(() => {
      setClaimProgress(85);
      setClaimLogs(prev => [
        ...prev,
        `[1.0s] Payment Authorized (${paymentMethod === 'UPI' ? upiId : paymentMethod}). Transmitting ${formatINR(selectedInstForClaim?.estimatedValue || 5000000)} to Nominee SBI A/C SB-****4912...`
      ]);
    }, 1000);

    setTimeout(() => {
      setClaimProgress(100);
      setClaimLogs(prev => [
        ...prev,
        `[1.6s] IRDAI Fast-Track Clearance Complete: NEFT Ref ${neftRefNo} Issued.`
      ]);
      setPaymentProcessing(false);
      if (selectedInstForClaim) {
        updateInstitutionStatus(selectedInstForClaim.id, 'settled');
      }
      setPortalStep('VOUCHER');
    }, 1600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-insurance-voucher, #printable-insurance-voucher * {
            visibility: visible !important;
          }
          #printable-insurance-voucher {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: auto !important;
            margin: 0 !important;
            padding: 24px !important;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: 2px solid #0f172a !important;
            z-index: 999999 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Header */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1">
            <Link href="/dashboard/organizations" className="hover:text-blue-400 flex items-center gap-1 text-slate-300">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Institutions Registry
            </Link>
            <span>•</span>
            <span className="text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-950/80 px-3 py-0.5 rounded-full border border-emerald-700/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> IRDAI Master Circular Death Claims Gateway
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-extrabold text-white flex items-center gap-3 tracking-tight">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-slate-950 flex items-center justify-center font-bold shadow-lg shrink-0">
              <Shield className="w-6 h-6 text-slate-950" />
            </div>
            Life Insurance Death Claims Settlement Portal
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl">
            Upload required claim documents, complete statutory treasury fee payment, and claim policy sum assured payouts using DigiLocker certified Death Certificates.
          </p>
        </div>

        <button
          onClick={() => setShowCertPreview(true)}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-2xl border border-slate-700 transition-colors cursor-pointer shrink-0"
        >
          <Eye className="w-4 h-4 text-emerald-400" /> Preview Verified Death Certificate
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">TOTAL POLICIES</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 font-serif">{insInsts.length} Policies</span>
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[10px] text-slate-500 block">LIC, HDFC Life, ICICI Pru, Max Life</span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">TOTAL SUM ASSURED</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-blue-900 font-serif">{formatINR(totalSumAssured)}</span>
            <IndianRupee className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-[10px] text-slate-500 block">Combined Policy Benefit Pool</span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">CLAIMS DISBURSED</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-700 font-serif">{formatINR(settledSumAssured)}</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block">Transferred to Nominee Bank A/C</span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">DEATH CERTIFICATE CLEARANCE</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-700 font-serif">DC-MH-2026-88492</span>
            <Key className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[10px] text-slate-500 block">MCGM Municipal Certified DigiLocker Seal</span>
        </div>
      </div>

      {/* POLICY DIRECTORY & CLAIM CARDS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-serif font-bold text-slate-900">
            Life Insurance Policies Available for Death Claim Settlement
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {insInsts.length} Policies Found
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insInsts.map((inst) => {
            const isSettled = inst.status === 'settled';

            return (
              <div 
                key={inst.id}
                className={`bg-white rounded-3xl border-2 p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between space-y-5 ${
                  isSettled ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-300 hover:border-emerald-500'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 uppercase">
                        IRDAI LICENSED INSURER
                      </span>
                      <h3 className="font-serif text-xl font-extrabold text-slate-900 mt-1.5">{inst.name}</h3>
                      <p className="text-xs text-slate-600 font-mono">
                        Policy #{inst.accountNumberMasked} • {inst.accountType}
                      </p>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase ${
                      isSettled ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'bg-amber-100 text-amber-950 border border-amber-300'
                    }`}>
                      {isSettled ? 'CLAIM DISBURSED' : 'READY TO CLAIM'}
                    </span>
                  </div>

                  {/* Benefit Amount Box */}
                  <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block">POLICY SUM ASSURED PAYOUT:</span>
                      <span className="font-serif text-2xl font-bold text-emerald-400">{formatINR(inst.estimatedValue)}</span>
                    </div>
                    <div className="text-right font-mono text-[10px] text-slate-400">
                      <span>Claim ID: {inst.claimId}</span>
                    </div>
                  </div>

                  {/* Requirements Note */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5 text-xs font-mono">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">DOCUMENTATION & FEE REQUIRED:</span>
                    <div className="flex items-center gap-1.5 text-slate-700 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Death Certificate + Policy Schedule + Bank Cancelled Cheque</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>₹100.00 Statutory IRDAI Processing Fee (UPI / Net Banking / RuPay)</span>
                    </div>
                  </div>
                </div>

                <div>
                  {!isSettled ? (
                    <button
                      onClick={() => handleStartClaim(inst)}
                      className="w-full bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-bold text-xs py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-emerald-300" />
                      <span>Upload Documents & Claim Insurance Amount</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartClaim(inst)}
                      className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300 font-bold text-xs py-3.5 px-4 rounded-2xl text-center flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Claim Disbursed • View/Print IRDAI Payout Voucher</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      {showCertPreview && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-3xl border-2 border-blue-900 shadow-2xl max-w-2xl w-full text-slate-900 overflow-hidden flex flex-col my-auto max-h-[90vh]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h3 className="font-serif font-bold text-sm text-white">Government Certified Death Certificate Inspection</h3>
              </div>
              <button 
                onClick={() => setShowCertPreview(false)}
                className="text-slate-400 hover:text-white font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto font-mono text-xs">
              <div className="border-2 border-slate-900 p-6 rounded-2xl bg-slate-50 space-y-4 text-center">
                <div className="border-b border-slate-900 pb-3">
                  <h4 className="font-bold text-base uppercase text-slate-900">MUNICIPAL CORPORATION OF GREATER MUMBAI</h4>
                  <p className="text-[10px] text-slate-600">DEPARTMENT OF PUBLIC HEALTH • REGISTRAR OF BIRTHS & DEATHS</p>
                  <p className="text-xs font-bold text-emerald-950 mt-1">CERTIFIED CERTIFICATE OF DEATH</p>
                </div>

                <div className="text-left space-y-2 text-[11px]">
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="text-slate-500">Deceased Full Name:</span>
                    <span className="font-bold text-slate-950">{currentCase.deceasedName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="text-slate-500">Date of Demise:</span>
                    <span className="font-bold text-slate-950">{currentCase.dateOfDeath}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="text-slate-500">Registration Number:</span>
                    <span className="font-bold text-amber-900">DC-MH-2026-88492</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="text-slate-500">DigiLocker Status:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">✓ 100% Verified Authentic</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-300">
                  <span>Digitally Signed by Municipal Registrar</span>
                  <span>Issued under Sec 12/17 of RBD Act 1969</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowCertPreview(false)}
                  className="bg-slate-900 text-white font-bold px-5 py-2 rounded-xl text-xs"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4-STEP INTERACTIVE INSURANCE CLAIM GATEWAY MODAL (WITH DOCUMENT UPLOAD & PAYMENT) */}
      {selectedInstForClaim && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto no-print">
          <div className="bg-white rounded-3xl border-2 border-emerald-600 shadow-2xl max-w-2xl w-full text-slate-900 overflow-hidden flex flex-col my-auto max-h-[94vh]">
            
            {/* Modal Top Header */}
            <div className="p-5 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 text-white flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-slate-950 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6 text-slate-950" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
                    IRDAI Insurance Claim Gateway • {selectedInstForClaim.name}
                  </h3>
                  <p className="text-[11px] text-emerald-300 font-mono">
                    Ref: <span className="font-bold text-amber-300">{claimRefNo}</span> • Form 3801 Death Intimation
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedInstForClaim(null)}
                className="text-slate-400 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Stepper Header */}
            <div className="bg-slate-100 border-b border-slate-200 px-6 py-3 grid grid-cols-4 text-center font-mono text-[11px] gap-1">
              <div className={`py-1.5 rounded-xl font-bold ${portalStep === 'UPLOAD_DOCS' ? 'bg-emerald-800 text-white' : 'text-slate-600 bg-slate-200'}`}>
                1. Upload Docs
              </div>
              <div className={`py-1.5 rounded-xl font-bold ${portalStep === 'AUDIT' ? 'bg-emerald-800 text-white' : 'text-slate-600 bg-slate-200'}`}>
                2. Audit Claim
              </div>
              <div className={`py-1.5 rounded-xl font-bold ${portalStep === 'PAYMENT' ? 'bg-emerald-800 text-white' : 'text-slate-600 bg-slate-200'}`}>
                3. Pay Fee (₹100)
              </div>
              <div className={`py-1.5 rounded-xl font-bold ${portalStep === 'VOUCHER' ? 'bg-emerald-800 text-white' : 'text-slate-600 bg-slate-200'}`}>
                4. Payout Voucher
              </div>
            </div>

            <div className="p-6 space-y-5 text-xs overflow-y-auto flex-1">

              {/* STEP 1: INTERACTIVE DOCUMENT UPLOADER STEP */}
              {portalStep === 'UPLOAD_DOCS' && (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-950 bg-emerald-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      STEP 1: ATTACH & UPLOAD CLAIM DOCUMENTS
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Upload Required Proofs for {selectedInstForClaim.name} (Policy #{selectedInstForClaim.accountNumberMasked})
                    </h4>
                    <p className="text-slate-600 text-xs">
                      Attach certified Death Certificate, Policy Bond, Nominee Bank Cheque, & Aadhaar/PAN KYC.
                    </p>
                  </div>

                  {/* Document Uploader Cards */}
                  <div className="space-y-3 font-mono">

                    {/* Doc 1: Death Certificate */}
                    <div className="bg-slate-950 text-white p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-emerald-400 font-bold block">1. CERTIFIED DEATH CERTIFICATE</span>
                        <p className="text-xs font-bold text-white truncate max-w-[320px]">{uploadedDeathCert}</p>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] px-2.5 py-1 rounded-full font-bold shrink-0">
                        ✓ DIGILOCKER VERIFIED
                      </span>
                    </div>

                    {/* Doc 2: Original Policy Bond */}
                    <div className="bg-slate-950 text-white p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-blue-400 font-bold block">2. ORIGINAL POLICY BOND / SCHEDULE</span>
                        <p className="text-xs font-bold text-white truncate max-w-[320px]">{uploadedPolicyDoc}</p>
                      </div>
                      <label className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors shrink-0">
                        <input 
                          type="file" 
                          accept=".pdf,.png,.jpg"
                          onChange={(e) => handleSimulateCustomFileUpload(e, 'policy')}
                          className="hidden" 
                        />
                        {isDocUploading && docUploadStep === 'policy' ? 'Uploading...' : 'Replace Policy Bond'}
                      </label>
                    </div>

                    {/* Doc 3: Nominee Bank Cancelled Cheque */}
                    <div className="bg-slate-950 text-white p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-amber-400 font-bold block">3. NOMINEE BANK CANCELLED CHEQUE / PASSBOOK</span>
                        <p className="text-xs font-bold text-white truncate max-w-[320px]">{uploadedChequeDoc}</p>
                      </div>
                      <label className="bg-amber-600 hover:bg-amber-500 text-slate-950 text-[10px] px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors shrink-0">
                        <input 
                          type="file" 
                          accept=".pdf,.png,.jpg"
                          onChange={(e) => handleSimulateCustomFileUpload(e, 'cheque')}
                          className="hidden" 
                        />
                        {isDocUploading && docUploadStep === 'cheque' ? 'Uploading...' : 'Upload Bank Proof'}
                      </label>
                    </div>

                    {/* Doc 4: Nominee KYC Copy */}
                    <div className="bg-slate-950 text-white p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-purple-400 font-bold block">4. NOMINEE AADHAAR & PAN KYC PROOF</span>
                        <p className="text-xs font-bold text-white truncate max-w-[320px]">{uploadedKycDoc}</p>
                      </div>
                      <label className="bg-purple-600 hover:bg-purple-500 text-white text-[10px] px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors shrink-0">
                        <input 
                          type="file" 
                          accept=".pdf,.png,.jpg"
                          onChange={(e) => handleSimulateCustomFileUpload(e, 'kyc')}
                          className="hidden" 
                        />
                        {isDocUploading && docUploadStep === 'kyc' ? 'Uploading...' : 'Upload KYC File'}
                      </label>
                    </div>

                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                    <button
                      onClick={() => setSelectedInstForClaim(null)}
                      className="px-4 py-2.5 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setPortalStep('AUDIT')}
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md flex items-center gap-2 text-xs cursor-pointer"
                    >
                      <span>Proceed to Policy Audit</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: POLICY & CLAIM AUDIT */}
              {portalStep === 'AUDIT' && (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 p-4.5 rounded-2xl space-y-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-950 bg-emerald-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      STEP 2: POLICY AUDIT & PAYOUT VERIFICATION
                    </span>
                    <h4 className="font-bold text-slate-900 text-base">
                      {selectedInstForClaim.name} — {selectedInstForClaim.accountType}
                    </h4>
                    <p className="text-slate-700 text-xs">
                      Policy Number: <strong>{selectedInstForClaim.accountNumberMasked}</strong>
                    </p>
                    <p className="text-slate-900 text-sm font-bold font-serif">
                      Sum Assured Benefit Payout: <span className="text-emerald-700">{formatINR(selectedInstForClaim.estimatedValue)}</span>
                    </p>
                  </div>

                  {/* Attached Documents Audit Summary */}
                  <div className="space-y-2">
                    <label className="font-bold text-slate-900 block text-xs">Audit Verification Summary (AI OCR Score: 99.8% Passed):</label>
                    <div className="space-y-2 bg-slate-950 text-white p-4 rounded-2xl font-mono text-xs border border-slate-800">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="flex items-center gap-2 text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Death Certificate:
                        </span>
                        <span className="font-bold text-white">{uploadedDeathCert}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 pt-1">
                        <span className="flex items-center gap-2 text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Policy Schedule:
                        </span>
                        <span className="font-bold text-blue-300">{uploadedPolicyDoc}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 pt-1">
                        <span className="flex items-center gap-2 text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Bank Cancelled Cheque:
                        </span>
                        <span className="font-bold text-amber-300">{uploadedChequeDoc}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="flex items-center gap-2 text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Nominee KYC Proof:
                        </span>
                        <span className="font-bold text-emerald-400">{uploadedKycDoc}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <button
                      onClick={() => setPortalStep('UPLOAD_DOCS')}
                      className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setPortalStep('PAYMENT')}
                      className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-md flex items-center gap-2 text-xs cursor-pointer"
                    >
                      <span>Proceed to Statutory Processing Fee Payment (₹100.00)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: STATUTORY PROCESSING FEE PAYMENT (₹100.00) */}
              {portalStep === 'PAYMENT' && (
                <div className="space-y-4">
                  {/* Fee Summary Banner */}
                  <div className="bg-slate-900 text-white p-4.5 rounded-2xl flex items-center justify-between shadow-md border border-slate-800">
                    <div>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold block uppercase tracking-wider">
                        IRDAI STATUTORY CLAIM INTIMATION FEE
                      </span>
                      <h4 className="font-bold text-sm text-white">Fast-Track Processing & NEFT Fee</h4>
                      <p className="text-[10px] text-slate-400">IRDAI Fee: ₹85.00 • e-Governance Charge: ₹15.00</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold font-mono text-emerald-400">₹100.00</span>
                      <span className="text-[9px] text-slate-400 block font-mono">256-Bit SSL Encrypted</span>
                    </div>
                  </div>

                  {/* Payment Mode Selector Tabs */}
                  <div className="space-y-2">
                    <label className="font-bold text-slate-900 block text-xs">Select Indian Payment Mode:</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('UPI')}
                        className={`p-3 rounded-xl border text-center transition-all font-bold text-xs cursor-pointer flex flex-col items-center gap-1 ${
                          paymentMethod === 'UPI' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-600'
                        }`}
                      >
                        <QrCode className="w-5 h-5 text-emerald-600" />
                        <span>BHIM UPI / GPay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('NET_BANKING')}
                        className={`p-3 rounded-xl border text-center transition-all font-bold text-xs cursor-pointer flex flex-col items-center gap-1 ${
                          paymentMethod === 'NET_BANKING' ? 'border-blue-600 bg-blue-50 text-blue-950 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-600'
                        }`}
                      >
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <span>Net Banking</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('RUPAY')}
                        className={`p-3 rounded-xl border text-center transition-all font-bold text-xs cursor-pointer flex flex-col items-center gap-1 ${
                          paymentMethod === 'RUPAY' ? 'border-indigo-600 bg-indigo-50 text-indigo-950 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-600'
                        }`}
                      >
                        <CreditCard className="w-5 h-5 text-indigo-600" />
                        <span>RuPay / Card</span>
                      </button>
                    </div>
                  </div>

                  {/* Mode 1: BHIM UPI */}
                  {paymentMethod === 'UPI' && (
                    <div className="bg-emerald-950 text-white p-4.5 rounded-2xl border border-emerald-800 space-y-4 text-xs font-mono">
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="bg-white p-2.5 rounded-xl border-2 border-emerald-400 shrink-0 text-center">
                          <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100">
                            <rect width="100" height="100" fill="white" />
                            <rect x="5" y="5" width="25" height="25" fill="#065f46" />
                            <rect x="9" y="9" width="17" height="17" fill="white" />
                            <rect x="13" y="13" width="9" height="9" fill="#065f46" />

                            <rect x="70" y="5" width="25" height="25" fill="#065f46" />
                            <rect x="74" y="9" width="17" height="17" fill="white" />
                            <rect x="78" y="13" width="9" height="9" fill="#065f46" />

                            <rect x="5" y="70" width="25" height="25" fill="#065f46" />
                            <rect x="9" y="74" width="17" height="17" fill="white" />
                            <rect x="13" y="78" width="9" height="9" fill="#065f46" />

                            <rect x="35" y="10" width="8" height="8" fill="#065f46" />
                            <rect x="48" y="10" width="8" height="8" fill="#065f46" />
                            <rect x="35" y="25" width="20" height="6" fill="#065f46" />
                            <rect x="10" y="40" width="30" height="8" fill="#065f46" />
                            <rect x="45" y="40" width="15" height="15" fill="#065f46" />
                            <rect x="68" y="40" width="22" height="8" fill="#065f46" />
                            <rect x="35" y="65" width="10" height="25" fill="#065f46" />
                            <rect x="50" y="70" width="15" height="10" fill="#065f46" />
                            <rect x="70" y="65" width="20" height="20" fill="#065f46" />
                          </svg>
                          <span className="text-[9px] text-slate-800 font-bold block mt-1">SCAN VIA ANY UPI APP</span>
                        </div>

                        <div className="space-y-2 flex-1 w-full">
                          <div className="flex items-center justify-between">
                            <label className="text-emerald-300 font-bold block text-[11px]">VPA / Custom UPI ID:</label>
                            <button
                              type="button"
                              onClick={handleCopyUpi}
                              className="text-[10px] text-emerald-400 hover:text-white flex items-center gap-1 cursor-pointer font-bold"
                            >
                              <Copy className="w-3 h-3" /> {copiedUpi ? 'Copied!' : 'Copy VPA'}
                            </button>
                          </div>

                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              className="bg-slate-900 border border-emerald-700 text-white rounded-xl px-3 py-2 text-xs font-mono w-full focus:outline-none focus:border-emerald-400"
                            />
                            <button
                              type="button"
                              onClick={() => setIsUpiVerified(true)}
                              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-2 rounded-xl font-bold text-[10px] shrink-0"
                            >
                              Verify
                            </button>
                          </div>
                          {isUpiVerified && (
                            <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                              <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" /> UPI VPA Verified: Eleanor Mehta Vance
                            </p>
                          )}
                          <p className="text-[10px] text-emerald-200/80">
                            Supports BHIM, Google Pay, PhonePe, Paytm, & CRED UPI.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mode 2: Net Banking */}
                  {paymentMethod === 'NET_BANKING' && (
                    <div className="bg-blue-950 text-white p-4.5 rounded-2xl border border-blue-800 space-y-3 text-xs font-mono">
                      <label className="font-bold text-blue-300 block text-xs">Select Indian Bank for NetBanking:</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full bg-slate-900 border border-blue-700 text-white p-2.5 rounded-xl font-bold text-xs"
                      >
                        <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Bank of Baroda">Bank of Baroda</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      </select>
                      <div className="bg-slate-900 p-3 rounded-xl border border-blue-900/60 text-[11px] text-blue-200">
                        Redirects to <strong>{selectedBank}</strong> official treasury payment gateway for instant authorization of ₹100.00.
                      </div>
                    </div>
                  )}

                  {/* Mode 3: RuPay Card */}
                  {paymentMethod === 'RUPAY' && (
                    <div className="bg-indigo-950 text-white p-4.5 rounded-2xl border border-indigo-800 space-y-3 text-xs font-mono">
                      <div className="flex items-center justify-between border-b border-indigo-800 pb-2">
                        <span className="font-bold text-indigo-300">RuPay / Debit / Credit Card Interface</span>
                        <span className="bg-indigo-800 text-indigo-200 text-[10px] px-2 py-0.5 rounded font-bold">RuPay SECURE</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <label className="text-[10px] text-indigo-300 font-bold block mb-1">Card Number:</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-slate-900 border border-indigo-700 text-white p-2 rounded-xl text-xs font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] text-indigo-300 font-bold block mb-1">Expiry Date:</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full bg-slate-900 border border-indigo-700 text-white p-2 rounded-xl text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-indigo-300 font-bold block mb-1">CVV:</label>
                            <input
                              type="password"
                              maxLength={3}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full bg-slate-900 border border-indigo-700 text-white p-2 rounded-xl text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setPortalStep('AUDIT')}
                      className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleExecutePaymentAndDisbursement}
                      disabled={paymentProcessing}
                      className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-2xl shadow-md flex items-center gap-2 cursor-pointer text-xs"
                    >
                      {paymentProcessing ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" /> Authorizing Payment & Disbursing NEFT...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" /> Pay ₹100.00 & Transfer Sum Assured ({formatINR(selectedInstForClaim.estimatedValue)})
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: OFFICIAL PRINTABLE IRDAI PAYOUT VOUCHER */}
              {portalStep === 'VOUCHER' && (
                <div className="space-y-4">
                  {/* High-Fidelity Printable Insurance Voucher */}
                  <div 
                    id="printable-insurance-voucher"
                    className="bg-white border-2 border-slate-900 p-6 rounded-2xl space-y-4 text-slate-900 shadow-xl font-mono relative overflow-hidden"
                  >
                    {/* Header Seal */}
                    <div className="border-b-2 border-slate-900 pb-3 text-center space-y-1">
                      <div className="flex items-center justify-center gap-2 text-slate-900 font-bold text-xs tracking-wider">
                        <span>🏛️ IRDAI REGULATED INSURANCE SETTLEMENT</span>
                        <span>•</span>
                        <span>GOVERNMENT OF INDIA</span>
                      </div>
                      <h3 className="font-serif font-extrabold text-base md:text-lg text-slate-950 uppercase tracking-tight">
                        STATUTORY LIFE INSURANCE DEATH CLAIM DISBURSEMENT VOUCHER
                      </h3>
                      <p className="text-[11px] font-bold text-emerald-950 uppercase">
                        Official Policy Payout & Death Benefit Settlement Receipt
                      </p>
                    </div>

                    {/* Meta Bar */}
                    <div className="grid grid-cols-2 bg-slate-100 p-3 rounded-xl border border-slate-300 text-[11px] gap-2">
                      <div>
                        <span className="text-slate-600 block text-[10px]">IRDAI CLAIM REF NO:</span>
                        <span className="font-bold text-slate-950 text-xs">{claimRefNo}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-600 block text-[10px]">NEFT TRANSFER REF:</span>
                        <span className="font-bold text-emerald-950 text-xs">{neftRefNo}</span>
                      </div>
                    </div>

                    {/* Receipt Details Table */}
                    <div className="space-y-2 text-[11px] border-b border-slate-300 pb-3">
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Insurer Name:</span>
                        <span className="font-bold text-slate-950">{selectedInstForClaim.name}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Policy Number & Plan:</span>
                        <span className="font-bold text-blue-900">{selectedInstForClaim.accountNumberMasked} ({selectedInstForClaim.accountType})</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Deceased Policyholder:</span>
                        <span className="font-bold text-slate-950">{currentCase.deceasedName} (Demise Date: {currentCase.dateOfDeath})</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Verified Death Cert Ref:</span>
                        <span className="font-bold text-amber-900">{uploadedDeathCert}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Attached Policy Schedule:</span>
                        <span className="font-bold text-blue-950">{uploadedPolicyDoc}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Nominee / Beneficiary Account:</span>
                        <span className="font-bold text-slate-950">Eleanor Mehta Vance • SBI A/C SB-****4912</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Statutory Intimation Fee Paid:</span>
                        <span className="font-bold text-emerald-800">₹100.00 SUCCESS ({paymentMethod === 'UPI' ? upiId : paymentMethod})</span>
                      </div>
                      <div className="flex justify-between py-1 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                        <span className="text-emerald-900 font-bold">TOTAL DEATH BENEFIT DISBURSED:</span>
                        <span className="font-bold text-emerald-800 text-base">{formatINR(selectedInstForClaim.estimatedValue)} SUCCESS</span>
                      </div>
                    </div>

                    {/* Digital Stamps */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                      <div className="space-y-1 text-[9px] text-slate-600 font-mono">
                        <p><strong>SHA-256 Stamp:</strong> e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</p>
                        <p><strong>Treasury Txn ID:</strong> {txnId}</p>
                        <p className="text-emerald-700 font-bold">STATUS: POLICY SETTLED & NEFT BENEFIT TRANSFERRED</p>
                      </div>

                      {/* Verification QR SVG */}
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-300 shrink-0 text-center">
                        <svg className="w-16 h-16 mx-auto" viewBox="0 0 100 100">
                          <rect width="100" height="100" fill="white" />
                          <rect x="5" y="5" width="25" height="25" fill="#0f172a" />
                          <rect x="9" y="9" width="17" height="17" fill="white" />
                          <rect x="13" y="13" width="9" height="9" fill="#0f172a" />

                          <rect x="70" y="5" width="25" height="25" fill="#0f172a" />
                          <rect x="74" y="9" width="17" height="17" fill="white" />
                          <rect x="78" y="13" width="9" height="9" fill="#0f172a" />

                          <rect x="5" y="70" width="25" height="25" fill="#0f172a" />
                          <rect x="9" y="74" width="17" height="17" fill="white" />
                          <rect x="13" y="78" width="9" height="9" fill="#0f172a" />

                          <rect x="35" y="10" width="10" height="10" fill="#0f172a" />
                          <rect x="45" y="45" width="15" height="15" fill="#0f172a" />
                          <rect x="70" y="70" width="20" height="20" fill="#0f172a" />
                        </svg>
                        <span className="text-[8px] font-bold text-slate-700 block mt-0.5">VERIFY IRDAI QR</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2 no-print">
                    <button
                      onClick={() => window.print()}
                      className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 text-xs shadow-md cursor-pointer transition-all"
                    >
                      <Printer className="w-4 h-4" /> Print Official Insurance Claim Voucher
                    </button>
                    <button
                      onClick={() => setSelectedInstForClaim(null)}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-2xl text-xs cursor-pointer transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

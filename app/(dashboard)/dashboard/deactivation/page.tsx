'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { CredentialDeactivationItem } from '@/lib/types';
import { 
  ShieldAlert, 
  Trash2, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Lock, 
  Download, 
  Printer, 
  ArrowLeft, 
  UserX, 
  CreditCard, 
  Car, 
  Vote, 
  Globe, 
  Sparkles, 
  FileCheck, 
  Check, 
  UploadCloud, 
  FilePlus, 
  AlertTriangle, 
  ShieldCheck, 
  Fingerprint, 
  Send, 
  Volume2,
  Scan,
  Zap,
  ArrowRight,
  HelpCircle,
  FileCode2,
  CheckCircle,
  IndianRupee,
  Building2,
  QrCode,
  Smartphone,
  Wallet,
  Radio,
  BadgeCheck,
  Building,
  Key,
  Shield,
  ExternalLink,
  CheckSquare,
  Copy,
  Cpu,
  Eye,
  Layers,
  Filter,
  RefreshCw,
  Award
} from 'lucide-react';

export default function DeceasedIdentityDeactivationPage() {
  const { cases, activeCaseId, deactivations, initiateDeactivation, completeDeactivation, purgeDeceasedIdentityDetails } = useLifeBridgeStore();
  const { t } = useLanguage();

  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];

  // Document Upload & AI Scanner State
  const [isScanning, setIsScanning] = useState(false);
  const [isDigiLockerFetching, setIsDigiLockerFetching] = useState(false);
  const [deathCertUploaded, setDeathCertUploaded] = useState(true);
  const [uploadedDocName, setUploadedDocName] = useState('Certified_Death_Certificate_DigiLocker_Govt_MH2026.pdf');
  const [extractedRegNo, setExtractedRegNo] = useState('DC-MH-2026-88492');
  const [docSource, setDocSource] = useState<'MANUAL' | 'DIGILOCKER'>('DIGILOCKER');

  // Preview Modal State
  const [showDocPreview, setShowDocPreview] = useState(false);

  // Filter & Batch State
  const [cardFilter, setCardFilter] = useState<'ALL' | 'READY' | 'IN_PROGRESS' | 'COMPLETED'>('ALL');
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);

  // Simple Audio Guidance State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioLang, setAudioLang] = useState<'en' | 'hi' | 'ta'>('en');

  // e-Sevai 3-Step Portal Gateway State
  const [selectedItemForRemoval, setSelectedItemForRemoval] = useState<CredentialDeactivationItem | null>(null);
  const [portalStep, setPortalStep] = useState<'VERIFY_DOCS' | 'DISPATCH' | 'PAYMENT' | 'RECEIPT'>('VERIFY_DOCS');
  const [dispatchProgress, setDispatchProgress] = useState(0);
  const [dispatchLogs, setDispatchLogs] = useState<string[]>([]);
  const [receiptRefNo, setReceiptRefNo] = useState('');
  const [txnId, setTxnId] = useState('');

  // Payment Options State (Statutory ₹60.00 Fee)
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

  // Purge PII Modal State
  const [showPurgeModal, setShowPurgeModal] = useState(false);
  const [purgeConfirmed, setPurgeConfirmed] = useState(false);

  const completedCount = deactivations.filter(d => d.status === 'COMPLETED').length;
  const inProgressCount = deactivations.filter(d => d.status === 'IN_PROGRESS').length;
  const readyCount = deactivations.filter(d => d.status !== 'COMPLETED' && d.status !== 'IN_PROGRESS').length;
  const isRedacted = currentCase.aadhaarMasked.includes('REDACTED') || currentCase.panMasked.includes('REDACTED');

  // Filtered Cards
  const filteredDeactivations = deactivations.filter(item => {
    if (cardFilter === 'READY') return item.status !== 'COMPLETED' && item.status !== 'IN_PROGRESS';
    if (cardFilter === 'IN_PROGRESS') return item.status === 'IN_PROGRESS';
    if (cardFilter === 'COMPLETED') return item.status === 'COMPLETED';
    return true;
  });

  // Voice Guidance Assistant
  const toggleAudioGuide = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      const msg = audioLang === 'hi' 
        ? "ई-सेवा पोर्टल मार्गदर्शक: 1. डिजीलॉकर से मृत्यु प्रमाण पत्र सत्यापित करें। 2. 'Submit to Govt Portal' पर क्लिक करें। 3. ₹60 वैधानिक शुल्क यूपीआई या नेट बैंकिंग से भुगतान करें और आधिकारिक रसीद प्रिंट करें।"
        : audioLang === 'ta'
          ? "இ-சேவை வழிகாட்டி: 1. இறப்பு சான்றிதழை சரிபார்க்கவும். 2. 'Submit to Govt Portal' பொத்தானை அழுத்தவும். 3. ₹60 கட்டணத்தை செலுத்தி சான்றிதழை அச்சிடவும்."
          : "e-Sevai Portal Guide: Step 1. Verify target department & attached documents. Step 2. Transmit encrypted DSC payload to Govt portal. Step 3. Pay ₹60 statutory treasury fee via BHIM UPI, Net Banking, or RuPay card and print your official acknowledgement receipt.";
      
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSimulateDigiLockerFetch = () => {
    setIsDigiLockerFetching(true);
    setTimeout(() => {
      setIsDigiLockerFetching(false);
      setDeathCertUploaded(true);
      setDocSource('DIGILOCKER');
      setUploadedDocName('Certified_Death_Certificate_DigiLocker_Govt_MH2026.pdf');
      setExtractedRegNo('DC-MH-2026-88492');
    }, 1200);
  };

  const handleSimulateNewUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedDocName(file.name);
      setDocSource('MANUAL');
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        setDeathCertUploaded(true);
        setExtractedRegNo(`DC-MH-2026-${Math.floor(100000 + Math.random() * 900000)}`);
      }, 1200);
    }
  };

  // Launch 3-Step e-Sevai Submission Gateway Modal
  const handleStartGovtSubmission = (item: CredentialDeactivationItem) => {
    if (!deathCertUploaded) {
      alert("PLEASE UPLOAD OR FETCH DEATH CERTIFICATE FROM DIGILOCKER FIRST!");
      return;
    }
    setSelectedItemForRemoval(item);
    setPortalStep('VERIFY_DOCS');
    setDispatchProgress(0);
    setDispatchLogs([]);
    const generatedRef = `ESEVAI-GOVT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const generatedTxn = `TXN-UPI-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setReceiptRefNo(generatedRef);
    setTxnId(generatedTxn);
  };

  // Batch Submit All Ready Cards
  const handleBatchSubmitAll = () => {
    if (readyCount === 0) return;
    setIsBatchProcessing(true);
    setTimeout(() => {
      deactivations.forEach(item => {
        if (item.status !== 'COMPLETED') {
          initiateDeactivation(item.id);
          completeDeactivation(item.id);
        }
      });
      setIsBatchProcessing(false);
      alert(`BATCH DISPATCH SUCCESSFUL: All ${readyCount} active credentials submitted to respective government department portals with statutory receipts issued!`);
    }, 1800);
  };

  // Step 1 -> Step 2: Encrypted Direct Dispatch Simulation
  const handleStartDispatch = () => {
    setPortalStep('DISPATCH');
    setDispatchProgress(10);
    setDispatchLogs(['[0.1s] Initializing 256-bit AES Cryptographic Payload Enclosure...']);

    setTimeout(() => {
      setDispatchProgress(45);
      setDispatchLogs(prev => [
        ...prev,
        '[0.5s] Applying Legal Heir Digital Signature Certificate (DSC Key #88492) by Executor Eleanor Vance...'
      ]);
    }, 600);

    setTimeout(() => {
      setDispatchProgress(80);
      setDispatchLogs(prev => [
        ...prev,
        `[1.1s] Opening Secure TLS 1.3 Direct Tunnel to ${selectedItemForRemoval?.authority}...`
      ]);
    }, 1200);

    setTimeout(() => {
      setDispatchProgress(100);
      setDispatchLogs(prev => [
        ...prev,
        '[1.8s] Government Server ACK Received: HTTP 200 OK — Encrypted Payload Registered & Stamp Issued.'
      ]);
    }, 1800);
  };

  // Step 3: Statutory Treasury Fee Payment Execution (₹60.00)
  const handleExecutePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      if (selectedItemForRemoval) {
        initiateDeactivation(selectedItemForRemoval.id);
        completeDeactivation(selectedItemForRemoval.id);
      }
      setPortalStep('RECEIPT');
    }, 1300);
  };

  const handlePurgeSubmit = () => {
    purgeDeceasedIdentityDetails(currentCase.id);
    setPurgeConfirmed(true);
    setTimeout(() => {
      setShowPurgeModal(false);
      setPurgeConfirmed(false);
    }, 1800);
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'Aadhaar Card':
        return <CreditCard className="w-7 h-7 text-blue-600" />;
      case 'PAN Card':
        return <FileText className="w-7 h-7 text-emerald-600" />;
      case 'Driving License':
        return <Car className="w-7 h-7 text-amber-600" />;
      case 'Voter ID (EPIC)':
        return <Vote className="w-7 h-7 text-purple-600" />;
      case 'Passport':
        return <Globe className="w-7 h-7 text-indigo-600" />;
      default:
        return <CreditCard className="w-7 h-7 text-slate-600" />;
    }
  };

  const getDepartmentDetails = (type: string) => {
    switch (type) {
      case 'Aadhaar Card':
        return {
          office: 'UIDAI CIDR (Unique Identification Authority of India)',
          dept: 'Ministry of Electronics & Information Technology (MeitY)',
          gateway: 'CIDR Direct Deactivation API Portal'
        };
      case 'PAN Card':
        return {
          office: 'Income Tax AO Ward 12(1) (CBDT)',
          dept: 'Central Board of Direct Taxes - Department of Revenue',
          gateway: 'ITD e-Filing Legal Heir Surrender Gateway'
        };
      case 'Driving License':
        return {
          office: 'RTO Regional Transport Office',
          dept: 'Ministry of Road Transport and Highways (MoRTH)',
          gateway: 'Vahan & Sarathi Parivahan Citizen Gateway'
        };
      case 'Voter ID (EPIC)':
        return {
          office: 'Election Commission of India (ERO Office)',
          dept: 'Election Commission of India Electoral Roll Division',
          gateway: 'NVSP Electoral Roll Form 7 Deletion Portal'
        };
      case 'Passport':
        return {
          office: 'Passport Seva Kendra (PSK)',
          dept: 'Ministry of External Affairs (Consular & Passport Div)',
          gateway: 'Passport Seva Direct Impounding & Cancellation Desk'
        };
      default:
        return {
          office: 'e-Sevai Central Dispatch Gateway',
          dept: 'National e-Governance Division (NeGD)',
          gateway: 'Government Citizen Services Direct Portal'
        };
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      
      {/* EXECUTIVE TOP HEADER BAR */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1 flex-wrap">
            <Link href="/dashboard" className="hover:text-blue-400 flex items-center gap-1 transition-colors text-slate-300">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Mission Control
            </Link>
            <span>•</span>
            <span className="text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-950/80 px-3 py-0.5 rounded-full border border-emerald-700/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              e-Sevai Direct Government Dispatch Gateway Active
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-serif font-extrabold text-white flex items-center gap-3 tracking-tight">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shrink-0">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            Deceased Identity Surrender & e-Sevai Gateway
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-3xl">
            Official citizen services portal submission node for UIDAI CIDR, Income Tax AO Ward, RTO Transport, Election Commission, & Passport Seva Kendra.
          </p>
        </div>

        {/* Audio Assistant Box */}
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 text-white p-3 rounded-2xl shrink-0 shadow-lg relative z-10">
          <button
            onClick={toggleAudioGuide}
            className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer ${
              isPlayingAudio ? 'bg-rose-600 text-white animate-pulse' : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            {isPlayingAudio ? 'Stop Guide' : '🔊 Listen Voice Guide'}
          </button>
          
          <select 
            value={audioLang}
            onChange={(e) => setAudioLang(e.target.value as any)}
            className="text-xs font-bold bg-slate-900 text-white border border-slate-700 rounded-xl p-2 cursor-pointer focus:outline-none"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="ta">தமிழ் (Tamil)</option>
          </select>
        </div>
      </div>

      {/* METRICS & OVERVIEW CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">TOTAL CREDENTIALS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 font-serif">5 Documents</span>
            <ShieldCheck className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-[10px] text-slate-500 block">Aadhaar, PAN, DL, Voter, Passport</span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">SURRENDER STATUS</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-700 font-serif">{completedCount} Cancelled</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[10px] text-slate-500 block">{inProgressCount} Dispatch Active • {readyCount} Ready</span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">STATUTORY FEES PAID</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-blue-900 font-serif">₹{completedCount * 60}.00</span>
            <IndianRupee className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-[10px] text-slate-500 block">₹60.00 / document statutory fee</span>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">DIGILOCKER SYNC</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-700 font-serif">✓ 3/3 Vault</span>
            <Key className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block">100% Authentic Govt Seal</span>
        </div>
      </div>

      {/* STEP 1: HIGH CONTRAST DOCUMENT CLEARANCE HERO PANEL */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border-2 border-blue-600 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shrink-0">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white font-mono font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  STEP 1: DOCUMENT CLEARANCE
                </span>
                <span className="text-emerald-400 text-xs font-bold font-mono flex items-center gap-1">
                  <BadgeCheck className="w-4 h-4 text-emerald-400" /> DIGILOCKER API CONNECTED
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-serif font-extrabold text-white mt-1">
                Attached Verified Death Certificate & Legal Annexures
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowDocPreview(true)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4 text-blue-400" /> Preview Certificate
            </button>

            <button
              onClick={handleSimulateDigiLockerFetch}
              disabled={isDigiLockerFetching}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Key className="w-4 h-4 text-slate-950" />
              {isDigiLockerFetching ? 'Connecting DigiLocker API...' : 'Fetch from Govt DigiLocker'}
            </button>
          </div>
        </div>

        {/* Upload Zone & Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Upload Zone Box */}
          <div className="lg:col-span-2 relative group border-2 border-dashed border-blue-500/80 hover:border-emerald-400 bg-slate-950 p-6 rounded-2xl text-center space-y-3 transition-all duration-300 cursor-pointer shadow-inner">
            <input 
              type="file" 
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleSimulateNewUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
            />

            {isScanning || isDigiLockerFetching ? (
              <div className="py-4 space-y-3 text-emerald-400 font-mono">
                <Scan className="w-12 h-12 mx-auto animate-spin text-emerald-400" />
                <p className="font-bold text-sm">
                  {isDigiLockerFetching ? 'Fetching Authentic Death Certificate from Govt DigiLocker Server...' : 'Verifying Municipal Registrar Digital Signature & QR Stamp...'}
                </p>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-500 text-blue-300 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-7 h-7 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center justify-center gap-2">
                    Attached File: <span className="text-emerald-400 underline underline-offset-4">{uploadedDocName}</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Registration Ref: <span className="font-mono font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-600/60">{extractedRegNo}</span> (Municipal Corporation Certified)
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl font-mono shadow-md">
                  <FilePlus className="w-4 h-4" /> Replace or Upload Alternate PDF
                </div>
              </>
            )}
          </div>

          {/* Verification Status Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400 font-bold">REQUIRED ANNEXURES</span>
              <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                3 / 3 VERIFIED
              </span>
            </div>

            <div className="space-y-2 text-slate-300 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Death Certificate:
                </span>
                <span className="font-bold text-white">{extractedRegNo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> High Court Probate:
                </span>
                <span className="font-bold text-amber-300">HC-BOM-2026-04921</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Executor e-KYC:
                </span>
                <span className="font-bold text-emerald-400">Aadhaar Verified</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[10px] text-emerald-400 font-bold flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
              <span>Ready for e-Sevai Direct Government Dispatch</span>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 2: CREDENTIAL SELECTION WITH FILTER TABS & BATCH ACTION */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-900 text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">
                STEP 2: DISPATCH SELECTION
              </span>
              <h2 className="text-lg md:text-xl font-serif font-bold text-slate-900">
                Select Identity Document to Submit to Govt Portal
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Click <strong>"Submit to Govt Portal (e-Sevai Gateway)"</strong> on any credential card below to launch the workflow.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setCardFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${cardFilter === 'ALL' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                All ({deactivations.length})
              </button>
              <button
                onClick={() => setCardFilter('READY')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${cardFilter === 'READY' ? 'bg-blue-900 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Ready ({readyCount})
              </button>
              <button
                onClick={() => setCardFilter('COMPLETED')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${cardFilter === 'COMPLETED' ? 'bg-emerald-700 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Cancelled ({completedCount})
              </button>
            </div>

            {/* Batch Submit Button */}
            <button
              onClick={handleBatchSubmitAll}
              disabled={readyCount === 0 || isBatchProcessing}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-40 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Zap className="w-4 h-4" />
              {isBatchProcessing ? 'Processing Batch...' : `Batch Submit All Ready (${readyCount})`}
            </button>
          </div>
        </div>

        {/* Identity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeactivations.map((item) => {
            const isCompleted = item.status === 'COMPLETED';
            const isInProgress = item.status === 'IN_PROGRESS';
            const deptInfo = getDepartmentDetails(item.credentialType);

            return (
              <div 
                key={item.id}
                className={`bg-white rounded-2xl border-2 p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between space-y-5 ${
                  isCompleted 
                    ? 'border-emerald-300 bg-emerald-50/20' 
                    : isInProgress 
                      ? 'border-blue-300 bg-blue-50/20' 
                      : 'border-slate-300 hover:border-blue-400'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center shadow-inner">
                        {getCardIcon(item.credentialType)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{item.credentialType}</h3>
                        <p className="text-xs font-mono font-bold text-blue-900">{item.identifier}</p>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase ${
                      isCompleted 
                        ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' 
                        : isInProgress 
                          ? 'bg-blue-100 text-blue-950 border border-blue-300' 
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                    }`}>
                      {isCompleted ? 'CANCELLED' : isInProgress ? 'DISPATCH IN PROGRESS' : 'READY TO SUBMIT'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span className="font-medium">Target Office:</span>
                      <span className="font-bold text-slate-900 truncate max-w-[170px]" title={deptInfo.office}>
                        {deptInfo.office}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-medium">Portal Gateway:</span>
                      <span className="font-bold text-blue-900 truncate max-w-[170px]" title={deptInfo.gateway}>
                        {deptInfo.gateway}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-medium">Statutory Fee:</span>
                      <span className="font-bold text-emerald-700">₹60.00 (₹50 Govt + ₹10 e-Sevai)</span>
                    </div>
                  </div>
                </div>

                <div>
                  {!isCompleted ? (
                    <button
                      onClick={() => handleStartGovtSubmission(item)}
                      className="w-full bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-900 hover:from-blue-900 hover:to-indigo-800 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                      <span>Submit to Govt Portal (e-Sevai Gateway)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartGovtSubmission(item)}
                      className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300 font-bold text-xs py-3 px-4 rounded-xl text-center flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Officially Cancelled • View/Print Receipt</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 3: EASY PII DATA PURGE CARD */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 border border-rose-300 flex items-center justify-center shrink-0">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-rose-100 text-rose-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">
                STEP 3: PRIVACY PURGE
              </span>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Purge All Deceased Personal Identity Details
              </h3>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Permanently mask raw Aadhaar, PAN, and License numbers from storage to adhere to DPDP & ISO 27001 standards.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPurgeModal(true)}
          disabled={isRedacted}
          className={`shrink-0 text-xs font-bold px-5 py-3 rounded-xl shadow-sm transition-all flex items-center gap-2 ${
            isRedacted 
              ? 'bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-300' 
              : 'bg-rose-700 hover:bg-rose-800 text-white cursor-pointer'
          }`}
        >
          <Trash2 className="w-4 h-4" />
          {isRedacted ? 'Details Already Purged' : 'Purge All Personal Details Now'}
        </button>
      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      {showDocPreview && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-3xl border-2 border-blue-900 shadow-2xl max-w-2xl w-full text-slate-900 overflow-hidden flex flex-col my-auto max-h-[90vh]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h3 className="font-serif font-bold text-sm text-white">Government Death Certificate Inspection</h3>
              </div>
              <button 
                onClick={() => setShowDocPreview(false)}
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
                  <p className="text-xs font-bold text-blue-950 mt-1">CERTIFIED CERTIFICATE OF DEATH</p>
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
                    <span className="font-bold text-amber-900">{extractedRegNo}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="text-slate-500">Place of Death:</span>
                    <span className="font-bold text-slate-900">Breach Candy Hospital, Mumbai</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">QR Stamp Status:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">✓ Cryptographically Validated</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-300">
                  <span>Digitally Signed by Registrar</span>
                  <span>Issued under Sec 12/17 of RBD Act 1969</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowDocPreview(false)}
                  className="bg-blue-900 text-white font-bold px-5 py-2 rounded-xl text-xs"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3-STEP e-SEVAI GOVERNMENT PORTAL WORKFLOW MODAL */}
      {selectedItemForRemoval && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto no-print">
          <div className="bg-white rounded-3xl border-2 border-blue-900 shadow-2xl max-w-2xl w-full text-slate-900 overflow-hidden flex flex-col my-auto max-h-[92vh]">
            
            {/* Modal Top Header */}
            <div className="p-5 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white flex items-center justify-between border-b border-blue-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400 flex items-center justify-center text-blue-300">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
                    Official e-Sevai Citizen Services Portal
                  </h3>
                  <p className="text-[11px] text-blue-300 font-mono">
                    Ref: <span className="font-bold text-amber-300">{receiptRefNo}</span> • Govt Dispatch Gateway
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedItemForRemoval(null)}
                className="text-slate-400 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Stepper Navigation */}
            <div className="bg-slate-100 border-b border-slate-200 px-6 py-3 grid grid-cols-4 text-center font-mono text-[11px]">
              <div className={`py-1 rounded-lg font-bold ${portalStep === 'VERIFY_DOCS' ? 'bg-blue-900 text-white' : 'text-slate-600'}`}>
                1. Verify Docs
              </div>
              <div className={`py-1 rounded-lg font-bold ${portalStep === 'DISPATCH' ? 'bg-blue-900 text-white' : 'text-slate-600'}`}>
                2. Direct Dispatch
              </div>
              <div className={`py-1 rounded-lg font-bold ${portalStep === 'PAYMENT' ? 'bg-blue-900 text-white' : 'text-slate-600'}`}>
                3. Treasury Fee (₹60)
              </div>
              <div className={`py-1 rounded-lg font-bold ${portalStep === 'RECEIPT' ? 'bg-emerald-700 text-white' : 'text-slate-600'}`}>
                4. Govt Receipt
              </div>
            </div>

            <div className="p-6 space-y-5 text-xs overflow-y-auto flex-1">

              {/* STEP 1: DOCUMENT VERIFICATION */}
              {portalStep === 'VERIFY_DOCS' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl space-y-2">
                    <span className="text-[10px] font-mono font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded uppercase">
                      Target Department Verification
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {selectedItemForRemoval.credentialType} ({selectedItemForRemoval.identifier})
                    </h4>
                    <p className="text-slate-700 text-xs">
                      Target Authority: <strong>{selectedItemForRemoval.authority}</strong>
                    </p>
                    <p className="text-slate-600 text-[11px]">
                      Required Form: <strong>{selectedItemForRemoval.formRequired}</strong>
                    </p>
                  </div>

                  {/* Attached Documents Checklist */}
                  <div className="space-y-2">
                    <label className="font-bold text-slate-900 block text-xs">Attached Verified Document Packages (DSC Sealed):</label>
                    <div className="space-y-2 bg-slate-900 text-white p-4 rounded-2xl font-mono text-xs border border-slate-800">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="flex items-center gap-2 text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1. Certified Death Certificate:
                        </span>
                        <span className="font-bold text-white">{extractedRegNo}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 pt-1">
                        <span className="flex items-center gap-2 text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 2. High Court Probate Grant:
                        </span>
                        <span className="font-bold text-amber-300">HC-BOM-PROBATE-2026-004921</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="flex items-center gap-2 text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 3. Executor e-KYC Verification:
                        </span>
                        <span className="font-bold text-emerald-400">PASSED (Eleanor Vance)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                    <button
                      onClick={() => setSelectedItemForRemoval(null)}
                      className="px-4 py-2.5 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleStartDispatch}
                      className="px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl shadow-md flex items-center gap-2 text-xs cursor-pointer"
                    >
                      <span>Verify & Proceed to Encrypted Dispatch</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: ENCRYPTED DIRECT DISPATCH WITH REAL-TIME TRACKING */}
              {portalStep === 'DISPATCH' && (
                <div className="space-y-5 py-2">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-900 border border-blue-300 flex items-center justify-center mx-auto shadow-inner">
                      <Scan className="w-7 h-7 text-blue-900 animate-spin" style={{ animationDuration: '6s' }} />
                    </div>
                    <h4 className="font-bold text-base text-slate-900">Transmitting Encrypted Document Package</h4>
                    <p className="text-xs text-slate-600">
                      Transmitting to <strong>{selectedItemForRemoval.authority}</strong> with Digital Signature Certificate (DSC) seal.
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono font-bold">
                      <span className="text-slate-600">Dispatch Progress</span>
                      <span className="text-blue-900">{dispatchProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-900 to-emerald-600 h-full transition-all duration-500"
                        style={{ width: `${dispatchProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Real-Time Terminal Log */}
                  <div className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-[11px] space-y-1.5 border border-slate-800 shadow-inner h-36 overflow-y-auto">
                    {dispatchLogs.map((log, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-slate-500">❯</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => setPortalStep('PAYMENT')}
                      disabled={dispatchProgress < 100}
                      className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 text-xs cursor-pointer"
                    >
                      <span>Proceed to Statutory Treasury Fee Payment (₹60.00)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: STATUTORY TREASURY FEE PAYMENT CHECKOUT (₹60.00) */}
              {portalStep === 'PAYMENT' && (
                <div className="space-y-4">
                  {/* Fee Summary Banner */}
                  <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-md border border-slate-800">
                    <div>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold block uppercase tracking-wider">
                        STATUTORY TREASURY FEE PAYMENT
                      </span>
                      <h4 className="font-bold text-sm text-white">e-Sevai Submission Fee</h4>
                      <p className="text-[10px] text-slate-400">Govt Fee: ₹50.00 • e-Sevai Charge: ₹10.00</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold font-mono text-emerald-400">₹60.00</span>
                      <span className="text-[9px] text-slate-400 block font-mono">256-Bit SSL Treasury Link</span>
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

                  {/* PAYMENT MODE DETAILS */}
                  {paymentMethod === 'UPI' && (
                    <div className="bg-emerald-950 text-white p-4 rounded-2xl border border-emerald-800 space-y-4 text-xs font-mono">
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
                          <label className="text-emerald-300 font-bold block text-[11px]">VPA / Custom UPI ID:</label>
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

                  {paymentMethod === 'NET_BANKING' && (
                    <div className="bg-blue-950 text-white p-4 rounded-2xl border border-blue-800 space-y-3 text-xs font-mono">
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
                        Redirects to <strong>{selectedBank}</strong> official treasury payment gateway for instant authorization of ₹60.00.
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'RUPAY' && (
                    <div className="bg-indigo-950 text-white p-4 rounded-2xl border border-indigo-800 space-y-3 text-xs font-mono">
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
                      onClick={() => setPortalStep('VERIFY_DOCS')}
                      className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleExecutePayment}
                      disabled={paymentProcessing}
                      className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer text-xs"
                    >
                      {paymentProcessing ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" /> Authorizing Statutory Fee & Generating Receipt...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" /> Pay ₹60.00 & Generate Official Receipt
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: OFFICIAL PRINTABLE e-SEVAI GOVERNMENT RECEIPT */}
              {portalStep === 'RECEIPT' && (
                <div className="space-y-4">
                  {/* High Fidelity Printable Receipt Container */}
                  <div 
                    id="printable-eseval-receipt"
                    className="bg-white border-2 border-slate-900 p-6 rounded-2xl space-y-4 text-slate-900 shadow-xl font-mono relative overflow-hidden"
                  >
                    {/* Header Seal */}
                    <div className="border-b-2 border-slate-900 pb-3 text-center space-y-1">
                      <div className="flex items-center justify-center gap-2 text-slate-900 font-bold text-xs tracking-wider">
                        <span>🏛️ GOVERNMENT OF INDIA</span>
                        <span>•</span>
                        <span>STATE e-GOVERNANCE AGENCY</span>
                      </div>
                      <h3 className="font-serif font-extrabold text-base md:text-lg text-slate-950 uppercase tracking-tight">
                        OFFICIAL e-SEVAI CITIZEN SERVICES ACKNOWLEDGEMENT RECEIPT
                      </h3>
                      <p className="text-[11px] font-bold text-blue-950 uppercase">
                        Statutory Document Surrender & Deactivation Confirmation
                      </p>
                    </div>

                    {/* Meta Bar */}
                    <div className="grid grid-cols-2 bg-slate-100 p-3 rounded-xl border border-slate-300 text-[11px] gap-2">
                      <div>
                        <span className="text-slate-600 block text-[10px]">e-SEVAI APPLICATION REF NO:</span>
                        <span className="font-bold text-slate-950 text-xs">{receiptRefNo}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-600 block text-[10px]">TREASURY TRANSACTION ID:</span>
                        <span className="font-bold text-emerald-950 text-xs">{txnId}</span>
                      </div>
                    </div>

                    {/* Receipt Field Details Table */}
                    <div className="space-y-2 text-[11px] border-b border-slate-300 pb-3">
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Deceased Individual Name:</span>
                        <span className="font-bold text-slate-950">{currentCase.deceasedName}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Date of Demise:</span>
                        <span className="font-bold text-slate-950">{currentCase.dateOfDeath}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Surrendered Document:</span>
                        <span className="font-bold text-blue-900">{selectedItemForRemoval.credentialType} ({selectedItemForRemoval.identifier})</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Target Govt Office:</span>
                        <span className="font-bold text-slate-900">{selectedItemForRemoval.authority}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Verified Death Certificate Ref:</span>
                        <span className="font-bold text-amber-900">{extractedRegNo}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Statutory Fee Paid:</span>
                        <span className="font-bold text-emerald-800">₹60.00 SUCCESS (₹50 Govt + ₹10 e-Sevai)</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-600 font-medium">Payment Mode Used:</span>
                        <span className="font-bold text-slate-950">
                          {paymentMethod === 'UPI' ? `BHIM UPI (${upiId})` : paymentMethod === 'NET_BANKING' ? selectedBank : 'RuPay Card'}
                        </span>
                      </div>
                    </div>

                    {/* Digital Signature & Verification Stamps */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                      <div className="space-y-1 text-[9px] text-slate-600 font-mono">
                        <p><strong>SHA-256 Stamp:</strong> {selectedItemForRemoval.auditHash}</p>
                        <p><strong>DSC Seal:</strong> Digitally Signed by e-Governance Treasury Officer #88492</p>
                        <p className="text-emerald-700 font-bold">STATUS: OFFICIALLY CANCELLED & DISPATCHED TO GOVT SERVER</p>
                      </div>

                      {/* Verification QR Seal SVG */}
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
                        <span className="text-[8px] font-bold text-slate-700 block mt-0.5">VERIFY GOVT QR</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-2 no-print">
                    <button
                      onClick={() => window.print()}
                      className="bg-blue-900 hover:bg-blue-950 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 text-xs shadow-md cursor-pointer transition-all"
                    >
                      <Printer className="w-4 h-4" /> Print Official e-Sevai Receipt
                    </button>
                    <button
                      onClick={() => setSelectedItemForRemoval(null)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-2xl text-xs cursor-pointer transition-colors"
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

      {/* EASY DATA PURGE MODAL */}
      {showPurgeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-3xl border-2 border-rose-300 shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">Purge Personal Details</h3>
                <p className="text-xs text-slate-500">Protect Privacy & Mask PII Data</p>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-rose-50 p-3.5 rounded-2xl border border-rose-200">
              Are you sure you want to mask raw identity numbers (Aadhaar, PAN, License) for <strong>{currentCase.deceasedName}</strong>?
            </p>

            {purgeConfirmed ? (
              <div className="p-3 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" /> Details Masked & Purged Successfully!
              </div>
            ) : (
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowPurgeModal(false)}
                  className="px-4 py-2.5 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePurgeSubmit}
                  className="px-5 py-2.5 font-bold text-white bg-rose-700 hover:bg-rose-800 rounded-xl shadow-md transition-colors text-xs cursor-pointer"
                >
                  Purge Details Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

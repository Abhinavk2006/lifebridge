'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { formatINR } from '@/utils/formatters';
import { 
  Building2, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  FileText, 
  IndianRupee, 
  Download, 
  Printer, 
  Eye, 
  CreditCard, 
  Home, 
  Landmark, 
  MapPin, 
  BadgeCheck, 
  ShieldCheck, 
  Clock, 
  FileCheck, 
  Scale, 
  TrendingUp,
  FileSpreadsheet,
  FileCode
} from 'lucide-react';
import { downloadCourtPackagePDF } from '@/utils/exportPackage';
import { useToast } from '@/components/ui/Toast';

export default function BankingOrganizationsPage() {
  const { institutions, cases, activeCaseId } = useLifeBridgeStore();
  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<'STATEMENTS' | 'LOANS' | 'PROPERTIES'>('STATEMENTS');
  const [selectedStatementBank, setSelectedStatementBank] = useState<string | null>(null);

  // Filter Banking Institutions
  const bankInsts = institutions.filter((i) => i.sector === 'Banking');

  // Deceased Bank Accounts Detailed Data
  const bankAccounts = [
    {
      id: 'acc-sbi-101',
      bankName: 'State Bank of India (SBI)',
      branch: 'Mumbai Main Branch (Fort)',
      accountType: 'Premier Savings Account',
      accountNumber: 'SB-****4912',
      ifsc: 'SBIN0000300',
      balance: 2450000,
      status: 'FROZEN (Intimation Delivered • Fee Waived +₹45,000)',
      penaltyWaived: 45000,
      nominee: 'Eleanor Mehta Vance (Daughter)',
      lastTxnDate: '2026-05-10',
      transactions: [
        { date: '2026-05-10', desc: 'Quarterly Savings Interest Credit', type: 'CREDIT', amount: 18450 },
        { date: '2026-05-02', desc: 'Tata Power Electricity Auto-Debit Mandate', type: 'DEBIT', amount: 4200 },
        { date: '2026-04-15', desc: 'TCS Dividend Direct Credit', type: 'CREDIT', amount: 32000 },
        { date: '2026-04-01', desc: 'SBI Dormant Maintenance Fee Waiver (RBI Direction)', type: 'CREDIT', amount: 45000 }
      ]
    },
    {
      id: 'acc-hdfc-102',
      bankName: 'HDFC Bank',
      branch: 'Worli Seaface Branch, Mumbai',
      accountType: 'Current Enterprise Account',
      accountNumber: 'CA-****8821',
      ifsc: 'HDFC0000240',
      balance: 840000,
      status: 'INTIMATED (Nominee Verified)',
      penaltyWaived: 0,
      nominee: 'Eleanor Mehta Vance',
      lastTxnDate: '2026-05-08',
      transactions: [
        { date: '2026-05-08', desc: 'Nariman Point Commercial Rent Credit', type: 'CREDIT', amount: 45000 },
        { date: '2026-04-28', desc: 'GST Monthly Tax Settlement', type: 'DEBIT', amount: 12400 }
      ]
    },
    {
      id: 'acc-bob-103',
      bankName: 'Bank of Baroda',
      branch: 'Fort Zonal Office, Mumbai',
      accountType: 'Senior Citizen Term Deposit',
      accountNumber: 'SB-****1092',
      ifsc: 'BARB0FORTMU',
      balance: 315000,
      status: 'INTIMATED',
      penaltyWaived: 0,
      nominee: 'Thomas Mehta (Son)',
      lastTxnDate: '2026-04-20',
      transactions: [
        { date: '2026-04-20', desc: 'Fixed Deposit Maturity Interest', type: 'CREDIT', amount: 12800 }
      ]
    }
  ];

  // Deceased Loans & Liabilities Data
  const loans = [
    {
      id: 'loan-sbi-101',
      lender: 'State Bank of India (SBI Realty)',
      loanType: 'Residential Home Loan',
      loanAccountNo: 'HL-SBI-881290',
      originalSanction: 4500000,
      outstandingBalance: 580000,
      interestRate: '8.5% p.a.',
      emiAmount: 38500,
      status: 'ACTIVE COVERAGE (SBI Rinn Raksha Insurance Claim Active)',
      insuranceShield: '✓ Covered by SBI Rinn Raksha (Debt Waiver Claim Submitted)',
      securityCollateral: 'Flat #1402, Sea Crest Tower, Worli, Mumbai'
    },
    {
      id: 'loan-hdfc-102',
      lender: 'HDFC Bank Personal Loans',
      loanType: 'Jumbo Personal Loan',
      loanAccountNo: 'PL-HDFC-331902',
      originalSanction: 200000,
      outstandingBalance: 40000,
      interestRate: '11.2% p.a.',
      emiAmount: 8500,
      status: 'WAIVED (Group Life Insurance Protection Discharged Debt)',
      insuranceShield: '✓ 100% Debt Waived by Insurer on Death Certificate Submission',
      securityCollateral: 'Unsecured Credit Line'
    },
    {
      id: 'loan-icici-103',
      lender: 'ICICI Bank Auto Loans',
      loanType: 'Vehicle Finance Loan',
      loanAccountNo: 'VL-ICICI-990142',
      originalSanction: 850000,
      outstandingBalance: 0,
      interestRate: '9.1% p.a.',
      emiAmount: 0,
      status: 'CLOSED (NOC & Form 35 Cleared with RTO)',
      insuranceShield: '✓ Fully Repaid & NOC Issued',
      securityCollateral: 'Honda City Car (Hypothecation Cancelled)'
    }
  ];

  // Deceased Real Estate & Properties Data
  const properties = [
    {
      id: 'prop-101',
      propertyName: 'Luxury 3-BHK Flat at Sea Crest Tower, Worli',
      category: 'Self-Acquired Residential Real Estate',
      location: 'Flat #1402, 14th Floor, Sea Crest Tower, Worli Sea Face, Mumbai - 400018',
      surveyNumber: 'SRO-MUMBAI-WORLI-2018-8891',
      areaSqFt: '1,850 sq. ft',
      marketValuation: 9500000,
      ownershipType: '100% Sole Ownership (Rameshchandra Mehta)',
      probateAllocation: '60% Eleanor Vance (Daughter) • 40% Thomas Mehta (Son)',
      subRegistrarOffice: 'Sub-Registrar Office (SRO Mumbai South)',
      taxSteppedUpBasis: 'Sec 48 IT Act Indexed Cost ₹95,00,000 (Zero Capital Gains Tax)',
      verificationStatus: '✓ Verified Sub-Registrar Marketable Clear Title'
    },
    {
      id: 'prop-102',
      propertyName: 'Ancestral Agricultural Land, Satara District',
      category: 'Ancestral Agricultural Land',
      location: 'Gat #441, Village Wai, Satara District, Maharashtra',
      surveyNumber: '7/12 Extract Ref: Satara-712-4410-B',
      areaSqFt: '4.5 Acres (1.82 Hectares)',
      marketValuation: 3500000,
      ownershipType: 'Ancestral Property (Hindu Succession Act Sec 8)',
      probateAllocation: 'Legal Heir Joint Partition Registered',
      subRegistrarOffice: 'Tehsildar & SRO Wai, Satara',
      taxSteppedUpBasis: 'Agricultural Land Exemption under Sec 2(14) IT Act',
      verificationStatus: '✓ Verified 7/12 Mutation Extract & Revenue Record'
    },
    {
      id: 'prop-103',
      propertyName: 'Commercial Shop Premises #14, Nariman Point',
      category: 'Commercial Rental Property',
      location: 'Shop #14, Ground Floor, Nariman Point Commercial Complex, Mumbai - 400021',
      surveyNumber: 'SRO-MUMBAI-SOUTH-2015-1102',
      areaSqFt: '450 sq. ft',
      marketValuation: 1850000,
      ownershipType: 'Sole Ownership (Rameshchandra Mehta)',
      probateAllocation: 'Lease Revenue Stream Transferred to Eleanor Vance',
      subRegistrarOffice: 'SRO Mumbai South',
      taxSteppedUpBasis: 'Annual Rental Yield ₹5,40,000/year (30% Standard Deduction)',
      verificationStatus: '✓ Verified Active Commercial Lease Agreement'
    }
  ];

  const totalBankBalances = bankAccounts.reduce((acc, curr) => acc + curr.balance, 0);
  const totalOutstandingLoans = loans.reduce((acc, curr) => acc + curr.outstandingBalance, 0);
  const totalPropertyValuation = properties.reduce((acc, curr) => acc + curr.marketValuation, 0);

  const handleDownloadFullAudit = () => {
    toast('Generating Full Financial Audit', 'Assembling bank ledgers, loan liabilities & property title report...', 'info');
    setTimeout(() => {
      downloadCourtPackagePDF({
        caseNumber: currentCase.caseNumber,
        deceasedName: currentCase.deceasedName,
        executorName: currentCase.executorName,
        jurisdiction: currentCase.jurisdiction,
        netEstateValue: formatINR(currentCase.netEstateValue)
      });
      toast('Audit Downloaded', 'Downloaded Full_Bank_Loan_Property_Audit_Package.pdf with High Court seal.', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-bank-statement, #printable-bank-statement * {
            visibility: visible !important;
          }
          #printable-bank-statement {
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
              <Building2 className="w-4 h-4 text-emerald-400" /> RBI & Revenue Department Audit Hub
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-extrabold text-white flex items-center gap-3 tracking-tight">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shrink-0">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            Deceased Bank Statements, Loans, & Real Estate Audit
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl">
            Complete financial investigation hub for bank statements, outstanding loan liabilities, and real estate property title deeds of <span className="font-bold text-emerald-400">{currentCase.deceasedName}</span>.
          </p>
        </div>

        <button
          onClick={handleDownloadFullAudit}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-lg transition-all cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" /> Download Complete Financial Audit Package
        </button>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">VERIFIED BANK BALANCES</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-blue-900 font-serif">{formatINR(totalBankBalances)}</span>
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-[10px] text-slate-500 block">Across 3 RBI Regulated Accounts (SBI, HDFC, BOB)</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">OUTSTANDING LOANS & LIABILITIES</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-rose-700 font-serif">{formatINR(totalOutstandingLoans)}</span>
            <CreditCard className="w-5 h-5 text-rose-600" />
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block">₹40 Lakh Debt Waived via Insurance Shield</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">TOTAL REAL ESTATE PORTFOLIO</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-700 font-serif">{formatINR(totalPropertyValuation)}</span>
            <Home className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[10px] text-slate-500 block">Worli 3-BHK + Satara Land + Nariman Shop</span>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex items-center justify-around font-mono text-xs text-white">
        <button
          onClick={() => setActiveTab('STATEMENTS')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'STATEMENTS' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>1. Whole Bank Statements ({bankAccounts.length} Accounts)</span>
        </button>

        <button
          onClick={() => setActiveTab('LOANS')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'LOANS' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>2. Loans & Liabilities ({loans.length} Loans)</span>
        </button>

        <button
          onClick={() => setActiveTab('PROPERTIES')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'PROPERTIES' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>3. Real Estate & Property Assets ({properties.length} Assets)</span>
        </button>
      </div>

      {/* TAB 1: WHOLE BANK STATEMENTS */}
      {activeTab === 'STATEMENTS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-slate-900">
              Verified Deceased Bank Accounts & Transaction Statements
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Total Verified Balance: <strong>{formatINR(totalBankBalances)}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {bankAccounts.map((acc) => (
              <div key={acc.id} className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-900 font-bold shrink-0">
                      <Building2 className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase">
                        {acc.branch}
                      </span>
                      <h3 className="font-serif text-xl font-extrabold text-slate-900 mt-1">{acc.bankName}</h3>
                      <p className="text-xs text-slate-500 font-mono">
                        Account #{acc.accountNumber} • IFSC: {acc.ifsc} • {acc.accountType}
                      </p>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-[10px] text-slate-400 block uppercase">CURRENT VERIFIED BALANCE:</span>
                    <span className="text-2xl font-bold text-emerald-700">{formatINR(acc.balance)}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Nominee: {acc.nominee}</span>
                  </div>
                </div>

                {/* Status & Penalty Note */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px]">ACCOUNT STATUS:</span>
                    <span className="font-bold text-slate-900">{acc.status}</span>
                  </div>
                  {acc.penaltyWaived > 0 && (
                    <div className="bg-emerald-100 text-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-300 font-bold text-[11px] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>+{formatINR(acc.penaltyWaived)} Dormant Penalty Waived via RBI Circular</span>
                    </div>
                  )}
                </div>

                {/* Recent Transaction Ledger Table */}
                <div className="space-y-2 font-mono text-xs">
                  <span className="font-bold text-slate-900 block text-xs">Recent Ledger Transactions (Audit Verified):</span>
                  <div className="bg-slate-950 text-white rounded-2xl p-4 space-y-2 border border-slate-800">
                    <div className="grid grid-cols-4 font-bold text-slate-400 text-[10px] border-b border-slate-800 pb-2">
                      <span>DATE</span>
                      <span>DESCRIPTION</span>
                      <span>TYPE</span>
                      <span className="text-right">AMOUNT</span>
                    </div>

                    {acc.transactions.map((txn, idx) => (
                      <div key={idx} className="grid grid-cols-4 text-[11px] py-1 border-b border-slate-900/60 items-center">
                        <span className="text-slate-400">{txn.date}</span>
                        <span className="text-white truncate font-medium">{txn.desc}</span>
                        <span className={`font-bold text-[10px] px-2 py-0.5 rounded w-fit ${
                          txn.type === 'CREDIT' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        }`}>
                          {txn.type}
                        </span>
                        <span className={`text-right font-bold ${txn.type === 'CREDIT' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {txn.type === 'CREDIT' ? '+' : '-'}{formatINR(txn.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedStatementBank(acc.bankName)}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-blue-400" />
                    <span>Inspect Full Statement PDF</span>
                  </button>

                  <button
                    onClick={handleDownloadFullAudit}
                    className="bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-blue-700" />
                    <span>Export Statement CSV / PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LOANS & LIABILITIES LEDGER */}
      {activeTab === 'LOANS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-slate-900">
              Deceased Applied Loans & Liability Accounts
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Total Outstanding Balance: <strong className="text-rose-700">{formatINR(totalOutstandingLoans)}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {loans.map((loan) => (
              <div key={loan.id} className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 font-bold shrink-0">
                      <CreditCard className="w-6 h-6 text-rose-700" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 uppercase">
                        {loan.loanType}
                      </span>
                      <h3 className="font-serif text-xl font-extrabold text-slate-900 mt-1">{loan.lender}</h3>
                      <p className="text-xs text-slate-500 font-mono">
                        Loan Account #{loan.loanAccountNo} • Interest: {loan.interestRate}
                      </p>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-[10px] text-slate-400 block uppercase">OUTSTANDING BALANCE:</span>
                    <span className={`text-2xl font-bold ${loan.outstandingBalance === 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {loan.outstandingBalance === 0 ? '₹0.00 (PAID / WAIVED)' : formatINR(loan.outstandingBalance)}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Original Loan: {formatINR(loan.originalSanction)}</span>
                  </div>
                </div>

                {/* Insurance Shield & Security Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 space-y-1">
                    <span className="text-[10px] text-emerald-800 font-bold block uppercase">INSURANCE DEATH SHIELD STATUS:</span>
                    <p className="font-bold text-emerald-950 text-[11px]">{loan.insuranceShield}</p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">SECURITY / COLLATERAL:</span>
                    <p className="font-bold text-slate-900 text-[11px]">{loan.securityCollateral}</p>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-3.5 rounded-2xl font-mono text-xs flex items-center justify-between">
                  <span className="text-slate-400">Monthly EMI Repayment Mandate:</span>
                  <span className="font-bold text-amber-300">{loan.emiAmount > 0 ? `${formatINR(loan.emiAmount)} / month` : 'EMI Mandate Closed'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REAL ESTATE & PROPERTY ASSETS REGISTER */}
      {activeTab === 'PROPERTIES' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-slate-900">
              Deceased Owned Real Estate Properties & Land Title Deeds
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Total Real Estate Valuation: <strong className="text-emerald-700">{formatINR(totalPropertyValuation)}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {properties.map((prop) => (
              <div key={prop.id} className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 font-bold shrink-0">
                      <Home className="w-6 h-6 text-emerald-800" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 uppercase">
                        {prop.category}
                      </span>
                      <h3 className="font-serif text-xl font-extrabold text-slate-900 mt-1">{prop.propertyName}</h3>
                      <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {prop.location}
                      </p>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-[10px] text-slate-400 block uppercase">ESTIMATED MARKET VALUATION:</span>
                    <span className="text-2xl font-bold text-emerald-700">{formatINR(prop.marketValuation)}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Area: {prop.areaSqFt}</span>
                  </div>
                </div>

                {/* Property Legal Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">TITLE & REVENUE REF:</span>
                    <p className="font-bold text-slate-900 text-[11px] truncate" title={prop.surveyNumber}>{prop.surveyNumber}</p>
                    <span className="text-[9px] text-slate-500 block">{prop.subRegistrarOffice}</span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">HIGH COURT PROBATE ALLOCATION:</span>
                    <p className="font-bold text-blue-900 text-[11px]">{prop.probateAllocation}</p>
                    <span className="text-[9px] text-slate-500 block">{prop.ownershipType}</span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">TAX STEPPED-UP BASIS (SEC 48):</span>
                    <p className="font-bold text-emerald-800 text-[11px]">{prop.taxSteppedUpBasis}</p>
                    <span className="text-[9px] text-emerald-700 font-bold block">{prop.verificationStatus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULL STATEMENT PDF INSPECTION MODAL */}
      {selectedStatementBank && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-3xl border-2 border-slate-900 shadow-2xl max-w-2xl w-full text-slate-900 overflow-hidden flex flex-col my-auto max-h-[90vh]">
            
            <div 
              id="printable-bank-statement"
              className="p-6 space-y-4 overflow-y-auto font-mono text-xs bg-white text-slate-900"
            >
              <div className="border-b-2 border-slate-900 pb-3 text-center space-y-1">
                <div className="flex items-center justify-center gap-2 text-slate-900 font-bold text-xs tracking-wider">
                  <span>🏛️ OFFICIAL BANKING STATEMENT</span>
                  <span>•</span>
                  <span>HIGH COURT AUDIT RECORD</span>
                </div>
                <h3 className="font-serif font-extrabold text-base md:text-lg text-slate-950 uppercase tracking-tight">
                  OFFICIAL AUDITED BANK STATEMENT & LEDGER HISTORY
                </h3>
                <p className="text-[11px] font-bold text-blue-950 uppercase">
                  Inspected for Deceased Depositor Settlement • {selectedStatementBank}
                </p>
              </div>

              <div className="bg-slate-100 p-3 rounded-xl border border-slate-300 text-[11px] grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-600 block text-[10px]">DECEASED DEPOSITOR:</span>
                  <span className="font-bold text-slate-950">{currentCase.deceasedName}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-600 block text-[10px]">LEGAL HEIR REPRESENTATIVE:</span>
                  <span className="font-bold text-slate-950">Eleanor Vance (Lead Executor)</span>
                </div>
              </div>

              <div className="border border-slate-900 p-4 rounded-xl space-y-2 bg-slate-50">
                <h4 className="font-bold text-xs text-slate-900 uppercase">Statement Summary & High Court Certificate</h4>
                <p className="text-slate-700 text-[11px]">
                  This bank statement is certified under Section 65B of the Indian Evidence Act / BSA 2023 for probate accounting before the High Court of Judicature.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 no-print">
                <button
                  onClick={() => window.print()}
                  className="bg-blue-900 hover:bg-blue-950 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 text-xs cursor-pointer shadow-md"
                >
                  <Printer className="w-4 h-4" /> Print Certified Statement PDF
                </button>
                <button
                  onClick={() => setSelectedStatementBank(null)}
                  className="bg-slate-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer"
                >
                  Close Statement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

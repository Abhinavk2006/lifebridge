import { create } from "zustand";
import { BankClaim, BankClaimStatus, BankNotification, RiskLevel } from "@/lib/types/bank-portal";

interface BankPortalState {
  claims: BankClaim[];
  notifications: BankNotification[];
  selectedBranch: string;
  searchQuery: string;
  statusFilter: string;
  riskFilter: string;

  // Actions
  setSelectedBranch: (branch: string) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  setRiskFilter: (risk: string) => void;
  
  decideClaim: (
    claimId: string, 
    newStatus: "APPROVED" | "REJECTED" | "MORE_INFO_REQUESTED", 
    reasoning: string, 
    officerName: string
  ) => void;

  markNotificationRead: (id: string) => void;
}

const INITIAL_BANK_CLAIMS: BankClaim[] = [
  {
    id: "CLM-SBI-2026-0941",
    claimantName: "Ananya Sharma",
    claimantRelationship: "Daughter (Class I Legal Heir)",
    claimantPhone: "+91 98201 44512",
    claimantEmail: "ananya.sharma@example.com",
    deceasedName: "Late Ramesh Chandra Sharma",
    deceasedAccountNumber: "SB-48190021482",
    accountType: "Savings Bank & Fixed Deposit",
    branchName: "Mumbai Main Branch",
    claimAmountINR: 745000,
    dateSubmitted: "2026-07-30T09:30:00Z",
    assignedOfficer: "Vikram Malhotra (Senior Compliance Manager)",
    status: "PENDING_APPROVAL",
    riskLevel: "LOW",
    documents: [
      {
        id: "doc-101",
        documentType: "Death Certificate",
        fileName: "death_certificate_ramesh_sharma.pdf",
        fileUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&auto=format&fit=crop&q=60",
        fileSize: "1.4 MB",
        uploadTimestamp: "2026-07-30T09:32:00Z",
        status: "AI_VERIFIED",
        aiConfidenceScore: 0.98,
        tamperCheckPassed: true,
        sha256Hash: "8f9b4c2e1a3d5e7f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f",
        extractedEntities: {
          "Deceased Name": "Ramesh Chandra Sharma",
          "Date of Death": "14-04-2026",
          "Issuer": "Municipal Corporation of Greater Mumbai",
          "Registration No": "MCGM/2026/884920",
        },
      },
      {
        id: "doc-102",
        documentType: "Legal Heir Certificate",
        fileName: "legal_heir_certificate_tahsildar.pdf",
        fileUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=60",
        fileSize: "2.1 MB",
        uploadTimestamp: "2026-07-30T09:33:00Z",
        status: "AI_VERIFIED",
        aiConfidenceScore: 0.94,
        tamperCheckPassed: true,
        sha256Hash: "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
        extractedEntities: {
          "Heirs Identified": "Ananya Sharma (Daughter), Rahul Sharma (Son)",
          "Authority": "Tehsildar Office, Kurla West",
          "Issue Date": "10-05-2026",
        },
      },
      {
        id: "doc-103",
        documentType: "Claimant Identity Proof (Aadhaar & PAN)",
        fileName: "kyc_ananya_sharma_aadhaar.pdf",
        fileUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=60",
        fileSize: "890 KB",
        uploadTimestamp: "2026-07-30T09:35:00Z",
        status: "AI_VERIFIED",
        aiConfidenceScore: 0.97,
        tamperCheckPassed: true,
        sha256Hash: "3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
        extractedEntities: {
          "Aadhaar Number": "XXXX-XXXX-9912",
          "PAN Number": "ABCPS8812K",
          "Name Match": "100% Match with Claim Form",
        },
      },
    ],
    complianceChecklist: [
      {
        id: "rule-1",
        lawSource: "Hindu Succession Act 1956 - Section 8",
        ruleDescription: "Class I legal heirs share equal entitlement in intestate property.",
        status: "PASSED",
        mandatoryForSettlement: true,
      },
      {
        id: "rule-2",
        lawSource: "RBI Guidance on Deceased Account Settlement 2024",
        ruleDescription: "Indemnity Bond executed by all legal heirs for claims without active nomination.",
        status: "PASSED",
        mandatoryForSettlement: true,
      },
      {
        id: "rule-3",
        lawSource: "Bank AML & KYC Master Policy §14",
        ruleDescription: "Biometric e-KYC verification completed for recipient account holder.",
        status: "PASSED",
        mandatoryForSettlement: true,
      },
    ],
    agentLogs: [
      {
        id: "log-1",
        agentName: "Discovery Agent",
        timestamp: "2026-07-30T09:30:15Z",
        actionTaken: "Parsed Form 26AS & SBI Central Database to match accounts.",
        confidenceScore: 0.96,
        outputSummary: "Discovered Savings Account #SB-48190021482 & FD Receipt #FD-990214.",
      },
      {
        id: "log-2",
        agentName: "Verification Agent",
        timestamp: "2026-07-30T09:33:45Z",
        actionTaken: "Verified Municipal Seal and Tehsildar Digital Stamp.",
        confidenceScore: 0.95,
        outputSummary: "Forensic document verification passed with 0 tamper indicators.",
      },
      {
        id: "log-3",
        agentName: "Negotiation Agent",
        timestamp: "2026-07-30T09:34:10Z",
        actionTaken: "Evaluated dormant account fee waiver eligibility under RBI Master Circular.",
        confidenceScore: 0.92,
        outputSummary: "Approved ₹45,000 penalty fee waiver calculation.",
      },
      {
        id: "log-4",
        agentName: "Execution Agent",
        timestamp: "2026-07-30T09:35:00Z",
        actionTaken: "Generated ApprovalRequest #appr-901 for Bank Officer signoff.",
        confidenceScore: 0.99,
        outputSummary: "Halted execution flow pending B2B Bank Partner Officer authorization.",
      },
    ],
  },
  {
    id: "CLM-SBI-2026-0942",
    claimantName: "Savitri Devi Sharma",
    claimantRelationship: "Spouse (Class I Legal Heir)",
    claimantPhone: "+91 98202 55910",
    claimantEmail: "savitri.sharma@example.com",
    deceasedName: "Late Devendra Sharma",
    deceasedAccountNumber: "SB-99120011400",
    accountType: "Fixed Deposit & Locker",
    branchName: "South Delhi Connaught Place Branch",
    claimAmountINR: 1775000,
    dateSubmitted: "2026-07-29T14:20:00Z",
    assignedOfficer: "Rajesh Kulkarni (Chief Compliance Officer)",
    status: "UNDER_REVIEW",
    riskLevel: "MEDIUM",
    riskReason: "Multiple legal heirs listed in Will. Secondary succession certificate pending verification.",
    documents: [
      {
        id: "doc-201",
        documentType: "Death Certificate",
        fileName: "death_cert_devendra.pdf",
        fileUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&auto=format&fit=crop&q=60",
        fileSize: "1.2 MB",
        uploadTimestamp: "2026-07-29T14:22:00Z",
        status: "AI_VERIFIED",
        aiConfidenceScore: 0.96,
        tamperCheckPassed: true,
        sha256Hash: "7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
        extractedEntities: {
          "Deceased Name": "Devendra Sharma",
          "Date of Death": "02-05-2026",
          "Issuer": "New Delhi Municipal Council",
        },
      },
      {
        id: "doc-202",
        documentType: "Registered Will & Succession Deed",
        fileName: "registered_will_deed.pdf",
        fileUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=60",
        fileSize: "3.4 MB",
        uploadTimestamp: "2026-07-29T14:25:00Z",
        status: "NEEDS_REVIEW",
        aiConfidenceScore: 0.78,
        tamperCheckPassed: true,
        sha256Hash: "2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c",
        extractedEntities: {
          "Will Status": "Registered at Sub-Registrar VI Delhi",
          "Witness Verification": "Requires Advocate Sign-Off Verification",
        },
        officerNotes: "Sub-Registrar stamp clarity is low. Recommend manual verification.",
      },
    ],
    complianceChecklist: [
      {
        id: "rule-201",
        lawSource: "Indian Succession Act 1925 - Probate Section",
        ruleDescription: "Probate of Will or Letters of Administration required for high-value claims > ₹10 Lakhs.",
        status: "FLAGGED",
        mandatoryForSettlement: true,
      },
    ],
    agentLogs: [
      {
        id: "log-201",
        agentName: "Discovery Agent",
        timestamp: "2026-07-29T14:20:10Z",
        actionTaken: "Identified Fixed Deposit #FD-88910 (₹17.75 Lakhs).",
        confidenceScore: 0.98,
        outputSummary: "Discovered asset records.",
      },
    ],
  },
  {
    id: "CLM-SBI-2026-0943",
    claimantName: "Vikramaditya Rao",
    claimantRelationship: "Son (Class I Legal Heir)",
    claimantPhone: "+91 98450 11928",
    claimantEmail: "vikram.rao@example.com",
    deceasedName: "Late Narayana Rao",
    deceasedAccountNumber: "SB-1100223344",
    accountType: "Mutual Fund & Demat Folio",
    branchName: "Bengaluru MG Road Branch",
    claimAmountINR: 3190000,
    dateSubmitted: "2026-07-28T11:00:00Z",
    assignedOfficer: "Priya Nair (Legal Compliance Officer)",
    status: "APPROVED",
    riskLevel: "LOW",
    officerDecisionReasoning: "All Class I legal heir certificates, death certificates, and bank e-KYC verified against Digital India databases. Approved settlement.",
    decidedAt: "2026-07-29T16:00:00Z",
    decidedBy: "Priya Nair (Senior Compliance Manager)",
    documents: [],
    complianceChecklist: [],
    agentLogs: [],
  },
];

const INITIAL_NOTIFICATIONS: BankNotification[] = [
  {
    id: "notif-1",
    type: "SLA_WARNING",
    title: "SLA Warning: Claim #CLM-SBI-2026-0942",
    description: "Claim has been pending under review for >48 hours. Requires officer decision.",
    claimId: "CLM-SBI-2026-0942",
    timestamp: "2026-07-30T10:00:00Z",
    read: false,
  },
  {
    id: "notif-2",
    type: "FLAGGED_DOCUMENT",
    title: "Document Flagged: Registered Will & Succession Deed",
    description: "AI confidence score 78% is below threshold. Manual compliance review recommended.",
    claimId: "CLM-SBI-2026-0942",
    timestamp: "2026-07-29T14:26:00Z",
    read: false,
  },
  {
    id: "notif-3",
    type: "NEW_CLAIM",
    title: "New Estate Claim Submitted: Ananya Sharma",
    description: "New claim #CLM-SBI-2026-0941 (₹7,45,000) assigned to your branch queue.",
    claimId: "CLM-SBI-2026-0941",
    timestamp: "2026-07-30T09:30:00Z",
    read: true,
  },
];

export const useBankPortalStore = create<BankPortalState>((set, get) => ({
  claims: INITIAL_BANK_CLAIMS,
  notifications: INITIAL_NOTIFICATIONS,
  selectedBranch: "ALL",
  searchQuery: "",
  statusFilter: "ALL",
  riskFilter: "ALL",

  setSelectedBranch: (branch: string) => set({ selectedBranch: branch }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setStatusFilter: (status: string) => set({ statusFilter: status }),
  setRiskFilter: (risk: string) => set({ riskFilter: risk }),

  decideClaim: (
    claimId: string, 
    newStatus: "APPROVED" | "REJECTED" | "MORE_INFO_REQUESTED", 
    reasoning: string, 
    officerName: string
  ) => {
    const timestamp = new Date().toISOString();
    set((state) => ({
      claims: state.claims.map((c) =>
        c.id === claimId
          ? {
              ...c,
              status: newStatus,
              officerDecisionReasoning: reasoning,
              decidedAt: timestamp,
              decidedBy: officerName,
              agentLogs: [
                ...c.agentLogs,
                {
                  id: `officer-dec-${Date.now()}`,
                  agentName: "Execution Agent",
                  timestamp,
                  actionTaken: `Bank Compliance Officer Decision: ${newStatus}`,
                  confidenceScore: 1.0,
                  outputSummary: `Officer '${officerName}' recorded decision '${newStatus}'. Reason: ${reasoning}`,
                },
              ],
            }
          : c
      ),
    }));
  },

  markNotificationRead: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },
}));

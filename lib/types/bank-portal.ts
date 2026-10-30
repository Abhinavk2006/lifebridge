export type BankClaimStatus = 
  | "NEW"
  | "UNDER_REVIEW"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "MORE_INFO_REQUESTED";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface DocumentVerificationItem {
  id: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  uploadTimestamp: string;
  status: "AI_VERIFIED" | "NEEDS_REVIEW" | "REJECTED";
  aiConfidenceScore: number; // 0 to 1
  tamperCheckPassed: boolean;
  sha256Hash: string;
  extractedEntities: Record<string, string>;
  officerNotes?: string;
}

export interface ComplianceCheckRule {
  id: string;
  lawSource: string; // e.g. "Hindu Succession Act 1956 - Sec 8" or "RBI Master Direction 2024"
  ruleDescription: string;
  status: "PASSED" | "FLAGGED" | "PENDING_OFFICER";
  mandatoryForSettlement: boolean;
}

export interface AgentExecutionLog {
  id: string;
  agentName: "Discovery Agent" | "Verification Agent" | "Negotiation Agent" | "Execution Agent";
  timestamp: string;
  actionTaken: string;
  confidenceScore: number;
  outputSummary: string;
}

export interface BankClaim {
  id: string; // e.g. "CLM-SBI-2026-0941"
  claimantName: string;
  claimantRelationship: string; // e.g. "Son / Class I Legal Heir"
  claimantPhone: string;
  claimantEmail: string;
  deceasedName: string;
  deceasedAccountNumber: string;
  accountType: string; // e.g. "Savings Bank Account"
  branchName: string; // e.g. "Mumbai Main Branch (Code: 00300)"
  claimAmountINR: number;
  dateSubmitted: string; // ISO 8601
  assignedOfficer: string;
  status: BankClaimStatus;
  riskLevel: RiskLevel;
  riskReason?: string;
  documents: DocumentVerificationItem[];
  complianceChecklist: ComplianceCheckRule[];
  agentLogs: AgentExecutionLog[];
  officerDecisionReasoning?: string;
  decidedAt?: string;
  decidedBy?: string;
}

export interface BankNotification {
  id: string;
  type: "NEW_CLAIM" | "FLAGGED_DOCUMENT" | "SLA_WARNING";
  title: string;
  description: string;
  claimId: string;
  timestamp: string;
  read: boolean;
}

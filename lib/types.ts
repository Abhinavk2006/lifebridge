export type CaseStatus = 'intake' | 'discovery' | 'verification' | 'negotiation' | 'settled' | 'closed';

export interface EstateCase {
  id: string;
  deceasedName: string;
  dateOfBirth: string;
  dateOfDeath: string;
  ssnMasked: string; // Retained for compatibility (PAN/Aadhaar)
  panMasked: string;
  aadhaarMasked: string;
  jurisdiction: string;
  executorName: string;
  executorRole: 'Executor' | 'Administrator' | 'Legal Rep' | 'Legal Heir / Administrator';
  status: CaseStatus;
  progressPercent: number;
  totalAssets: number;
  totalLiabilities: number;
  netEstateValue: number;
  institutionsCount: number;
  resolvedInstitutionsCount: number;
  openActionCount: number;
  createdAt: string;
  updatedAt: string;
  primaryAttorney?: string;
  probateCourt: string;
  caseNumber: string;
}

export interface AgentActivity {
  id: string;
  agentId: string;
  agentName: string;
  agentRole: 'Discovery' | 'Verification' | 'Negotiation' | 'Compliance' | 'Simulation' | 'Orchestrator';
  action: string;
  institutionName?: string;
  caseId: string;
  timestamp: string;
  status: 'running' | 'completed' | 'action_needed' | 'escalated';
  confidenceScore: number;
  explanation: string;
}

export interface DAGNode {
  id: string;
  caseId: string;
  title: string;
  description: string;
  assignedAgent: string;
  status: 'completed' | 'in_progress' | 'pending' | 'blocked' | 'action_required';
  dependencies: string[];
  estimatedDays: number;
  category: 'Legal' | 'Financial' | 'Verification' | 'Disbursement' | 'Tax';
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'Deceased' | 'Executor' | 'Beneficiary' | 'Bank' | 'Insurance' | 'Property' | 'Government' | 'Utility' | 'Debt';
  value?: number;
  status?: string;
  details?: string;
  x?: number;
  y?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  relation: string;
  status?: 'verified' | 'pending' | 'disputed';
}

export interface DocumentItem {
  id: string;
  caseId: string;
  fileName: string;
  fileType: 'PDF' | 'IMAGE' | 'DOCX';
  category: 'Identity' | 'Legal' | 'Financial' | 'Tax' | 'Property' | 'Court';
  uploadedAt: string;
  authenticityScore: number; // 0 to 100
  tamperStatus: 'PASSED' | 'WARNING' | 'FAILED';
  issuingAuthority: string;
  extractedEntitiesCount: number;
  summary: string;
  fileUrl?: string;
}

export interface Institution {
  id: string;
  name: string;
  sector: 'Banking' | 'Insurance' | 'Government' | 'Property' | 'Utilities' | 'Subscriptions' | 'Pension' | 'Loans';
  accountNumberMasked: string;
  estimatedValue: number;
  accountType: string;
  status: 'discovered' | 'notified' | 'in_negotiation' | 'settled' | 'disputed';
  contactPerson?: string;
  lastContactDate: string;
  feeWaiverAmount: number;
  sopRequirements: string[];
  claimId: string;
}

export interface NegotiationMessage {
  id: string;
  institutionId: string;
  sender: 'Agent' | 'Institution' | 'Human Executor';
  senderName: string;
  timestamp: string;
  content: string;
  actionTaken?: string;
  attachedDocument?: string;
  sentiment: 'positive' | 'neutral' | 'demanding' | 'resolved';
}

export interface AuditRecord {
  id: string;
  caseId: string;
  timestamp: string;
  actor: string;
  actorType: 'AI Agent' | 'Human User' | 'System';
  actionGroup: 'DOCUMENT_PARSE' | 'AGENT_DECISION' | 'CLAIM_DISPATCH' | 'APPROVAL_GRANTED' | 'FEE_WAIVER' | 'IDENTITY_DEACTIVATION' | 'DATA_PURGE';
  description: string;
  hashSHA256: string;
  reasoning?: string;
  metadata?: Record<string, any>;
}

export interface SimulationResult {
  scenarioName: string;
  estimatedProbateMonths: number;
  totalTaxLiability: number;
  netBeneficiaryPayout: number;
  creditorPayoffOrder: string[];
  riskRating: 'LOW' | 'MEDIUM' | 'HIGH';
  savingsVersusTraditional: number;
}

export interface CredentialDeactivationItem {
  id: string;
  credentialType: 'Aadhaar Card' | 'PAN Card' | 'Driving License' | 'Voter ID (EPIC)' | 'Passport';
  identifier: string;
  authority: string;
  status: 'PENDING_SURRENDER' | 'IN_PROGRESS' | 'COMPLETED';
  initiatedDate: string | null;
  completedDate: string | null;
  formRequired: string;
  auditHash: string;
  notes: string;
}


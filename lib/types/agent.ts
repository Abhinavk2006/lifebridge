export type AgentId = "discovery" | "verification" | "negotiation" | "execution" | "orchestrator";

export interface Citation {
  text: string;
  source: string;
  verified: boolean; // false unless a human or a checked source confirmed it
}

export interface AgentResponse<T = unknown> {
  agent_id: AgentId;
  claim_id: string;
  timestamp: string; // ISO 8601
  confidence_score: number; // 0–1
  output: T; // agent-specific payload
  citations: Citation[];
  human_approval_required: boolean;
  audit_hash: string; // sha256 of (previous_hash + this event), hash-chained
}

export type ClaimStage = 
  | "DISCOVERED"
  | "DOCUMENTS_PENDING"
  | "VERIFIED"
  | "NEGOTIATION"
  | "APPROVAL_REQUIRED"
  | "APPROVED"
  | "EXECUTION_PENDING"
  | "COMPLETED"
  | "REJECTED"
  | "ESCALATED";

export interface Heir {
  id: string;
  name: string;
  relationship: string; // e.g. Class I legal heir, son, daughter, spouse
  kycStatus: "PENDING" | "VERIFIED" | "REJECTED";
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
}

export interface Asset {
  id: string;
  institutionName: string;
  assetType: "SAVINGS_ACCOUNT" | "FIXED_DEPOSIT" | "MUTUAL_FUND" | "INSURANCE" | "PPF";
  accountNumberMasked: string;
  estimatedValueINR: number;
  requiredDocuments: string[];
  status: "DISCOVERED" | "VERIFIED" | "CLAIM_IN_PROGRESS" | "SETTLED";
}

export interface Estate {
  id: string;
  deceasedName: string;
  dateOfDeath: string;
  jurisdiction: string;
  legalHeirs: Heir[];
  assets: Asset[];
}

export interface Claim {
  id: string;
  estateId: string;
  deceasedName: string;
  heirIds: string[];
  assetIds: string[];
  stage: ClaimStage;
  totalClaimAmountINR: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApprovalRequest {
  id: string;
  claim_id: string;
  agent_id: AgentId;
  proposedAction: string;
  amountINR: number;
  hitlThresholdExceeded: boolean;
  citations: Citation[];
  agentResponse: AgentResponse;
  status: "PENDING" | "APPROVED" | "REJECTED" | "EDITED_AND_APPROVED";
  diff?: {
    original: Record<string, unknown>;
    modified: Record<string, unknown>;
  };
  createdAt: string;
  decidedAt?: string;
  decidedBy?: string;
}

export interface AuditEvent {
  id: string;
  claimId: string;
  timestamp: string;
  actor: string;
  actorType: "AGENT" | "HUMAN" | "SYSTEM";
  action: string;
  details: string;
  agentResponse?: AgentResponse;
  hash: string;
  previousHash: string;
}

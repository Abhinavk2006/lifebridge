import { AgentResponse, Asset } from "@/lib/types/agent";

export interface DiscoveryInput {
  claim_id: string;
  deceasedName: string;
  panOrAadhaar?: string;
  knownBanks?: string[];
}

export interface DiscoveryOutput {
  discoveredAssets: Asset[];
  recommendedDocumentChecklist: string[];
}

export async function runDiscoveryAgent(input: DiscoveryInput): Promise<AgentResponse<DiscoveryOutput>> {
  const timestamp = new Date().toISOString();
  
  const mockAssets: Asset[] = [
    {
      id: "ast-01",
      institutionName: "State Bank of India",
      assetType: "SAVINGS_ACCOUNT",
      accountNumberMasked: "XXXX-XXXX-4819",
      estimatedValueINR: 245000,
      requiredDocuments: ["Death Certificate", "Legal Heir Certificate", "KYC of Claimant", "Claim Form Annexure A"],
      status: "DISCOVERED",
    },
    {
      id: "ast-02",
      institutionName: "HDFC Bank",
      assetType: "FIXED_DEPOSIT",
      accountNumberMasked: "XXXX-XXXX-9902",
      estimatedValueINR: 500000,
      requiredDocuments: ["Death Certificate", "Fixed Deposit Receipt", "Succession Certificate", "Indemnity Bond"],
      status: "DISCOVERED",
    },
  ];

  const checklist = [
    "Original Death Certificate issued by Municipal Corporation",
    "Legal Heir Certificate / Succession Certificate",
    "Aadhaar & PAN of Legal Heir",
    "Cancelled Cheque / Bank Passbook of Legal Heir for Asset Transfer",
  ];

  return {
    agent_id: "discovery",
    claim_id: input.claim_id,
    timestamp,
    confidence_score: 0.94,
    output: {
      discoveredAssets: mockAssets,
      recommendedDocumentChecklist: checklist,
    },
    citations: [
      {
        text: "Discovery scan performed across registered banking networks & tax records.",
        source: "RBI Master Direction - Settlement of Claims in Deceased Accounts",
        verified: false, // TODO(legal): unverified — needs advocate review
      },
    ],
    human_approval_required: false,
    audit_hash: "", // to be filled by orchestrator hash-chain
  };
}

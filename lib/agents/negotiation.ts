import { AgentResponse } from "@/lib/types/agent";

export interface NegotiationInput {
  claim_id: string;
  institutionName: string;
  assetType: string;
  claimantName: string;
  amountINR: number;
}

export interface NegotiationOutput {
  draftClaimLetter: string;
  ruleReferencesUsed: {
    ruleTitle: string;
    citationText: string;
    verified: boolean;
  }[];
}

export async function runNegotiationAgent(input: NegotiationInput): Promise<AgentResponse<NegotiationOutput>> {
  const timestamp = new Date().toISOString();

  const letter = `TO THE BRANCH MANAGER,
${input.institutionName.toUpperCase()}

SUBJECT: CLAIM FOR SETTLEMENT OF DECEASED ACCOUNT / ASSET (${input.assetType})
AMOUNT: ₹${input.amountINR.toLocaleString("en-IN")}

Respected Sir/Madam,

I am writing on behalf of legal heir ${input.claimantName} regarding the settlement of asset holdings under account/folio held by the late account holder.

Enclosed herewith please find the verified copies of:
1. Municipal Death Certificate
2. Legal Heir Certificate issued by competent Revenue Authority
3. KYC documents & Indemnity Bond executed by legal heirs

We request you to initiate the claim settlement process as per applicable guidelines and transfer the net proceed value of ₹${input.amountINR.toLocaleString("en-IN")} to the designated bank account of the legal heir.

Yours faithfully,
LifeBridge AI-Assisted Claim Support System`;

  return {
    agent_id: "negotiation",
    claim_id: input.claim_id,
    timestamp,
    confidence_score: 0.91,
    output: {
      draftClaimLetter: letter,
      ruleReferencesUsed: [
        {
          ruleTitle: "RBI Guidance on Claim Settlement in Deceased Accounts",
          citationText: "Settlement without probate up to prescribed threshold for non-nominated accounts.",
          verified: false, // TODO(legal): unverified — needs advocate review
        },
        {
          ruleTitle: "Hindu Succession Act 1956 - Class I Heir Entitlement",
          citationText: "Equal share distribution among Class I legal heirs.",
          verified: false, // TODO(legal): unverified — needs advocate review
        },
      ],
    },
    citations: [
      {
        text: "Claim letter drafted per RBI guidelines on deceased account settlement.",
        source: "RBI Master Direction on Customer Service in Banks",
        verified: false, // TODO(legal): unverified — needs advocate review
      },
    ],
    human_approval_required: false,
    audit_hash: "",
  };
}

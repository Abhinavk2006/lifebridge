import { AgentResponse, ApprovalRequest } from "@/lib/types/agent";

export const HITL_AMOUNT_THRESHOLD_INR = Number(process.env.HITL_AMOUNT_THRESHOLD_INR || 10000);

export interface ExecutionInput {
  claim_id: string;
  institutionName: string;
  amountINR: number;
  recipientAccountMasked: string;
  legalHeirsCount: number;
}

export interface ExecutionOutput {
  proposedApprovalRequest: ApprovalRequest;
  additionalFrictionRequired: boolean;
  frictionMessage?: string;
}

export async function runExecutionAgent(input: ExecutionInput): Promise<AgentResponse<ExecutionOutput>> {
  const timestamp = new Date().toISOString();
  
  const additionalFriction = input.amountINR >= HITL_AMOUNT_THRESHOLD_INR || input.legalHeirsCount > 1;

  const approvalReq: ApprovalRequest = {
    id: `appr-${Date.now()}`,
    claim_id: input.claim_id,
    agent_id: "execution",
    proposedAction: `Transfer claim settlement proceeds of ₹${input.amountINR.toLocaleString("en-IN")} from ${input.institutionName} to verified recipient account ${input.recipientAccountMasked}`,
    amountINR: input.amountINR,
    hitlThresholdExceeded: input.amountINR >= HITL_AMOUNT_THRESHOLD_INR,
    citations: [
      {
        text: "Human-in-the-loop signoff required before preparing claim dispatch package.",
        source: "LifeBridge HITL Safety Guardrail §4.1",
        verified: true,
      },
      {
        text: "RBI Guideline on deceased claim proceeds settlement.",
        source: "RBI Guidance on Claim Settlement",
        verified: false, // TODO(legal): unverified — needs advocate review
      },
    ],
    agentResponse: {
      agent_id: "execution",
      claim_id: input.claim_id,
      timestamp,
      confidence_score: 0.99,
      output: {
        targetInstitution: input.institutionName,
        payoutAmountINR: input.amountINR,
        destinationAccount: input.recipientAccountMasked,
      },
      citations: [
        {
          text: "Execution agent prepares approval request payload only. Does NOT execute funds transfer.",
          source: "LifeBridge Safety Guardrail §0 & §4.1",
          verified: true,
        },
      ],
      human_approval_required: true,
      audit_hash: "",
    },
    status: "PENDING",
    createdAt: timestamp,
  };

  return {
    agent_id: "execution",
    claim_id: input.claim_id,
    timestamp,
    confidence_score: 0.99,
    output: {
      proposedApprovalRequest: approvalReq,
      additionalFrictionRequired: additionalFriction,
      frictionMessage: additionalFriction
        ? `Amount ₹${input.amountINR.toLocaleString("en-IN")} exceeds HITL threshold of ₹${HITL_AMOUNT_THRESHOLD_INR.toLocaleString("en-IN")} or involves multiple legal heirs. Dual sign-off warning and mandatory human review active.`
        : "Standard human-in-the-loop review active before execution package creation.",
    },
    citations: [
      {
        text: "Execution package prepared for human review. No autonomous transfer will occur.",
        source: "LifeBridge Guardrail §1",
        verified: true,
      },
    ],
    human_approval_required: true,
    audit_hash: "",
  };
}

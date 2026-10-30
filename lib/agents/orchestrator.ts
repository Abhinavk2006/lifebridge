import { validateStateTransition } from "@/lib/state-machine/claim-machine";
import { createAuditEvent } from "@/lib/audit/hash-chain";
import { runDiscoveryAgent } from "./discovery";
import { runVerificationAgent } from "./verification";
import { runNegotiationAgent } from "./negotiation";
import { runExecutionAgent } from "./execution";
import { Claim, ClaimStage, AuditEvent, ApprovalRequest } from "@/lib/types/agent";

export interface OrchestrationResult {
  claim: Claim;
  auditEvents: AuditEvent[];
  approvalRequest?: ApprovalRequest;
}

export async function advanceClaimStage(
  currentClaim: Claim,
  targetStage: ClaimStage,
  actor: string = "Orchestrator Agent",
  previousHash: string
): Promise<OrchestrationResult> {
  // Validate state machine rule
  validateStateTransition(currentClaim.stage, targetStage);

  let newClaim: Claim = {
    ...currentClaim,
    stage: targetStage,
    updatedAt: new Date().toISOString(),
  };

  const newAuditEvents: AuditEvent[] = [];
  let approvalReq: ApprovalRequest | undefined;

  if (targetStage === "DOCUMENTS_PENDING") {
    const discoveryRes = await runDiscoveryAgent({
      claim_id: currentClaim.id,
      deceasedName: currentClaim.deceasedName,
    });
    const auditEvt = await createAuditEvent(
      currentClaim.id,
      "Discovery Agent",
      "AGENT",
      "RUN_DISCOVERY",
      `Discovered ${discoveryRes.output.discoveredAssets.length} asset candidates for ${currentClaim.deceasedName}`,
      previousHash,
      discoveryRes
    );
    newAuditEvents.push(auditEvt);
  } else if (targetStage === "VERIFIED") {
    const verifRes = await runVerificationAgent({
      claim_id: currentClaim.id,
      submittedDocuments: [
        { documentType: "Death Certificate", fileName: "death_cert.pdf" },
        { documentType: "Legal Heir Certificate", fileName: "heir_cert.pdf" },
      ],
    });
    const auditEvt = await createAuditEvent(
      currentClaim.id,
      "Verification Agent",
      "AGENT",
      "RUN_VERIFICATION",
      `Verification passed with confidence score ${verifRes.confidence_score}`,
      previousHash,
      verifRes
    );
    newAuditEvents.push(auditEvt);
  } else if (targetStage === "NEGOTIATION") {
    const negRes = await runNegotiationAgent({
      claim_id: currentClaim.id,
      institutionName: "State Bank of India",
      assetType: "SAVINGS_ACCOUNT",
      claimantName: "Ananya Sharma",
      amountINR: currentClaim.totalClaimAmountINR,
    });
    const auditEvt = await createAuditEvent(
      currentClaim.id,
      "Negotiation Agent",
      "AGENT",
      "RUN_NEGOTIATION",
      `Drafted formal claim settlement letter referencing RBI Guidelines`,
      previousHash,
      negRes
    );
    newAuditEvents.push(auditEvt);
  } else if (targetStage === "APPROVAL_REQUIRED") {
    const execRes = await runExecutionAgent({
      claim_id: currentClaim.id,
      institutionName: "State Bank of India",
      amountINR: currentClaim.totalClaimAmountINR,
      recipientAccountMasked: "XXXX-XXXX-8812",
      legalHeirsCount: currentClaim.heirIds.length,
    });
    approvalReq = execRes.output.proposedApprovalRequest;
    const auditEvt = await createAuditEvent(
      currentClaim.id,
      "Execution Agent",
      "AGENT",
      "CREATE_APPROVAL_REQUEST",
      `Created Approval Request ${approvalReq.id} for human sign-off of ₹${currentClaim.totalClaimAmountINR.toLocaleString("en-IN")}`,
      previousHash,
      execRes
    );
    newAuditEvents.push(auditEvt);
  }

  return {
    claim: newClaim,
    auditEvents: newAuditEvents,
    approvalRequest: approvalReq,
  };
}

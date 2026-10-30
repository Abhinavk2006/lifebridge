import { ClaimStage } from "@/lib/types/agent";

const VALID_TRANSITIONS: Record<ClaimStage, ClaimStage[]> = {
  DISCOVERED: ["DOCUMENTS_PENDING", "REJECTED", "ESCALATED"],
  DOCUMENTS_PENDING: ["VERIFIED", "REJECTED", "ESCALATED"],
  VERIFIED: ["NEGOTIATION", "REJECTED", "ESCALATED"],
  NEGOTIATION: ["APPROVAL_REQUIRED", "REJECTED", "ESCALATED"],
  APPROVAL_REQUIRED: ["APPROVED", "REJECTED", "ESCALATED"],
  APPROVED: ["EXECUTION_PENDING", "REJECTED", "ESCALATED"],
  EXECUTION_PENDING: ["COMPLETED", "REJECTED", "ESCALATED"],
  COMPLETED: [],
  REJECTED: ["DOCUMENTS_PENDING", "NEGOTIATION"], // can retry after fix
  ESCALATED: ["DOCUMENTS_PENDING", "APPROVAL_REQUIRED"],
};

export class InvalidStateTransitionError extends Error {
  constructor(from: ClaimStage, to: ClaimStage) {
    super(`Invalid state transition from '${from}' to '${to}' in Claim lifecycle.`);
    this.name = "InvalidStateTransitionError";
  }
}

export function validateStateTransition(currentStage: ClaimStage, targetStage: ClaimStage): void {
  const allowed = VALID_TRANSITIONS[currentStage] || [];
  if (!allowed.includes(targetStage)) {
    throw new InvalidStateTransitionError(currentStage, targetStage);
  }
}

export function canTransition(currentStage: ClaimStage, targetStage: ClaimStage): boolean {
  const allowed = VALID_TRANSITIONS[currentStage] || [];
  return allowed.includes(targetStage);
}

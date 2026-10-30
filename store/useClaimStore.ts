import { create } from "zustand";
import { Claim, ApprovalRequest, AuditEvent, ClaimStage } from "@/lib/types/agent";
import { advanceClaimStage } from "@/lib/agents/orchestrator";
import { GENESIS_HASH, createAuditEvent } from "@/lib/audit/hash-chain";

interface ClaimState {
  claims: Claim[];
  approvalRequests: ApprovalRequest[];
  auditLogs: Record<string, AuditEvent[]>; // claimId -> AuditEvent[]
  selectedClaimId: string;

  // Actions
  setSelectedClaimId: (id: string) => void;
  advanceClaim: (claimId: string, targetStage: ClaimStage) => Promise<void>;
  decideApproval: (requestId: string, status: "APPROVED" | "REJECTED" | "EDITED_AND_APPROVED", editedAction?: string) => Promise<void>;
}

const INITIAL_MOCK_CLAIM: Claim = {
  id: "CLM-2026-8801",
  estateId: "EST-4029",
  deceasedName: "Late Ramesh Chandra Sharma",
  heirIds: ["HEIR-01", "HEIR-02"],
  assetIds: ["ast-01", "ast-02"],
  stage: "DISCOVERED",
  totalClaimAmountINR: 745000,
  createdAt: "2026-07-30T10:00:00Z",
  updatedAt: "2026-07-30T10:00:00Z",
};

export const useClaimStore = create<ClaimState>((set, get) => ({
  claims: [INITIAL_MOCK_CLAIM],
  approvalRequests: [],
  auditLogs: {
    "CLM-2026-8801": [],
  },
  selectedClaimId: "CLM-2026-8801",

  setSelectedClaimId: (id: string) => set({ selectedClaimId: id }),

  advanceClaim: async (claimId: string, targetStage: ClaimStage) => {
    const claim = get().claims.find((c) => c.id === claimId);
    if (!claim) return;

    const existingLogs = get().auditLogs[claimId] || [];
    const previousHash = existingLogs.length > 0 ? existingLogs[existingLogs.length - 1].hash : GENESIS_HASH;

    try {
      const result = await advanceClaimStage(claim, targetStage, "Orchestrator Agent", previousHash);

      set((state) => ({
        claims: state.claims.map((c) => (c.id === claimId ? result.claim : c)),
        auditLogs: {
          ...state.auditLogs,
          [claimId]: [...(state.auditLogs[claimId] || []), ...result.auditEvents],
        },
        approvalRequests: result.approvalRequest
          ? [...state.approvalRequests.filter((r) => r.id !== result.approvalRequest!.id), result.approvalRequest]
          : state.approvalRequests,
      }));
    } catch (err: any) {
      console.error("State machine transition error:", err.message);
      throw err;
    }
  },

  decideApproval: async (requestId: string, status: "APPROVED" | "REJECTED" | "EDITED_AND_APPROVED", editedAction?: string) => {
    const req = get().approvalRequests.find((r) => r.id === requestId);
    if (!req) return;

    const claimId = req.claim_id;
    const existingLogs = get().auditLogs[claimId] || [];
    const previousHash = existingLogs.length > 0 ? existingLogs[existingLogs.length - 1].hash : GENESIS_HASH;

    const updatedReq: ApprovalRequest = {
      ...req,
      status,
      proposedAction: editedAction ? editedAction : req.proposedAction,
      diff: editedAction
        ? {
            original: { action: req.proposedAction },
            modified: { action: editedAction },
          }
        : undefined,
      decidedAt: new Date().toISOString(),
      decidedBy: "Legal Heir / Human Executor",
    };

    const humanAuditEvt = await createAuditEvent(
      claimId,
      "Human Executor",
      "HUMAN",
      `HUMAN_DECISION_${status}`,
      `Human decided '${status}' on Approval Request ${requestId}. Action: ${updatedReq.proposedAction}`,
      previousHash
    );

    set((state) => ({
      approvalRequests: state.approvalRequests.map((r) => (r.id === requestId ? updatedReq : r)),
      auditLogs: {
        ...state.auditLogs,
        [claimId]: [...(state.auditLogs[claimId] || []), humanAuditEvt],
      },
    }));

    // If approved, transition claim stage from APPROVAL_REQUIRED -> APPROVED -> EXECUTION_PENDING
    if (status === "APPROVED" || status === "EDITED_AND_APPROVED") {
      await get().advanceClaim(claimId, "APPROVED");
      await get().advanceClaim(claimId, "EXECUTION_PENDING");
    }
  },
}));

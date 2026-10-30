"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useClaimStore } from "@/store/useClaimStore";
import { ApprovalCard } from "@/components/approval/approval-card";
import { Play, ShieldAlert, CheckCircle2, History } from "lucide-react";

export default function ApprovalsPage() {
  const { claims, approvalRequests, auditLogs, selectedClaimId, advanceClaim, decideApproval } = useClaimStore();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const selectedClaim = claims.find((c) => c.id === selectedClaimId) || claims[0];
  const claimAudits = (selectedClaimId && auditLogs[selectedClaimId]) || [];

  const handleStepNext = async () => {
    if (!selectedClaim) return;
    setLoading(true);
    setMessage(null);
    try {
      if (selectedClaim.stage === "DISCOVERED") {
        await advanceClaim(selectedClaim.id, "DOCUMENTS_PENDING");
        setMessage("Discovery Agent executed. Claim moved to DOCUMENTS_PENDING.");
      } else if (selectedClaim.stage === "DOCUMENTS_PENDING") {
        await advanceClaim(selectedClaim.id, "VERIFIED");
        setMessage("Verification Agent executed. Claim moved to VERIFIED.");
      } else if (selectedClaim.stage === "VERIFIED") {
        await advanceClaim(selectedClaim.id, "NEGOTIATION");
        setMessage("Negotiation Agent executed. Claim moved to NEGOTIATION.");
      } else if (selectedClaim.stage === "NEGOTIATION") {
        await advanceClaim(selectedClaim.id, "APPROVAL_REQUIRED");
        setMessage("Execution Agent generated ApprovalRequest payload. Human sign-off required.");
      }
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-2 font-sans">
      {/* High-Impact Indian Banking Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-700 min-h-[240px] flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/indian_senior_family.png"
            alt="Human in the Loop Approvals"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b49] via-[#002b49]/90 to-transparent" />
        </div>

        <div className="relative z-10 p-8 w-full flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#B8935B]/20 text-[#B8935B] border border-[#B8935B]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <ShieldAlert className="w-4 h-4 text-[#B8935B]" />
              <span>HUMAN-IN-THE-LOOP SAFETY MANDATE (§4.2)</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 shrink-0 bg-white/10 p-1.5 rounded-2xl border border-white/20">
                <Image
                  src="/ashoka_legal_seal.png"
                  alt="High Court Seal"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="font-serif text-3xl font-bold tracking-tight text-white">
                  Human-in-the-Loop Approval Center
                </h1>
                <p className="text-xs text-blue-200 font-mono mt-0.5">
                  Zero autonomous money transfers. Mandatory human sign-off for claims ≥ ₹10,000.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleStepNext}
              disabled={loading || selectedClaim?.stage === "APPROVAL_REQUIRED" || selectedClaim?.stage === "COMPLETED"}
              className="px-5 py-2.5 bg-[#0E2E52] text-white font-medium text-sm rounded-lg hover:bg-[#0E2E52]/90 disabled:opacity-50 transition flex items-center space-x-2 shadow-sm"
            >
              <Play className="w-4 h-4 text-[#B8935B]" />
              <span>{loading ? "Running Agent..." : `Advance Agent (${selectedClaim?.stage})`}</span>
            </button>
            <Link
              href="/dashboard/export-certificate"
              className="px-5 py-2.5 bg-[#B8935B] text-[#002b49] font-bold text-xs font-mono rounded-xl hover:bg-white transition flex items-center gap-2 shadow-sm uppercase tracking-wider"
            >
              <span>EXPORT STATEMENT (PDF)</span>
            </Link>
          </div>
        </div>
      </div>

      {message && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg text-sm font-medium">
          {message}
        </div>
      )}

      {/* Claim Summary Strip */}
      {selectedClaim && (
        <div className="bg-[#F6F7FA] border border-[#E2E6EC] rounded-xl p-5 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-sans">
          <div>
            <span className="text-xs text-gray-500 font-mono uppercase">Deceased Name</span>
            <p className="font-semibold text-[#0F2439]">{selectedClaim.deceasedName}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500 font-mono uppercase">Claim ID</span>
            <p className="font-mono text-[#0E2E52] font-semibold">{selectedClaim.id}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500 font-mono uppercase">Current Lifecycle Stage</span>
            <span className="inline-block mt-1 px-3 py-1 bg-[#0E2E52] text-white text-xs font-mono rounded-full">
              {selectedClaim.stage}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-500 font-mono uppercase">Total Claim Amount</span>
            <p className="font-mono text-lg font-bold text-[#0E2E52]">
              ₹{selectedClaim.totalClaimAmountINR.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      )}

      {/* Approval Queue */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[#0F2439] flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-[#B8935B]" />
          <span>Active Approval Queue ({approvalRequests.length})</span>
        </h2>

        {approvalRequests.length === 0 ? (
          <div className="bg-white border border-[#E2E6EC] rounded-xl p-12 text-center text-gray-500 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#1F7A4D] mx-auto" />
            <p className="font-medium text-[#0F2439]">No Pending Approvals</p>
            <p className="text-sm text-gray-500">
              Click &quot;Advance Agent&quot; above to simulate discovery, verification, negotiation, and trigger an Execution Approval Request.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {approvalRequests.map((req) => (
              <ApprovalCard key={req.id} request={req} onDecide={decideApproval} />
            ))}
          </div>
        )}
      </div>

      {/* Live Hash-Chained Audit Trail (§3.1, §4.2) */}
      <div className="bg-white border border-[#E2E6EC] rounded-xl p-6 space-y-4 shadow-sm font-sans">
        <div className="flex items-center justify-between border-b border-[#E2E6EC] pb-4">
          <h2 className="text-lg font-semibold text-[#0F2439] flex items-center space-x-2">
            <History className="w-5 h-5 text-[#0E2E52]" />
            <span>Immutable Hash-Chained Audit Trail ({claimAudits.length})</span>
          </h2>
          <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2.5 py-1 rounded">
            SHA-256 LEDGER ACTIVE
          </span>
        </div>

        {claimAudits.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No audit events logged yet for this claim.</p>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            {claimAudits.map((evt, idx) => (
              <div key={evt.id} className="bg-[#F6F7FA] border border-[#E2E6EC] rounded-lg p-3 space-y-1">
                <div className="flex items-center justify-between text-gray-500">
                  <span>#{idx + 1} | {evt.actor} ({evt.actorType})</span>
                  <span>{new Date(evt.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="font-sans text-sm font-medium text-[#0F2439]">{evt.action}: {evt.details}</p>
                <div className="text-[11px] text-gray-500 pt-1 truncate">
                  <span className="text-gray-400">HASH: </span>
                  <span className="text-[#0E2E52] font-semibold">{evt.hash}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

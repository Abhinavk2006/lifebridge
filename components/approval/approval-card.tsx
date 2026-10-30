"use client";

import { useState } from "react";
import { ApprovalRequest } from "@/lib/types/agent";
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Code2, ChevronDown, ChevronUp, Edit3 } from "lucide-react";

interface ApprovalCardProps {
  request: ApprovalRequest;
  onDecide: (id: string, status: "APPROVED" | "REJECTED" | "EDITED_AND_APPROVED", editedAction?: string) => void;
}

export function ApprovalCard({ request, onDecide }: ApprovalCardProps) {
  const [showJson, setShowJson] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [actionText, setActionText] = useState(request.proposedAction);

  const isExceeded = request.hitlThresholdExceeded;

  return (
    <div className="bg-white border border-[#E2E6EC] rounded-xl p-6 shadow-sm font-sans space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <span className="bg-[#0E2E52]/10 text-[#0E2E52] text-xs font-mono font-semibold px-2.5 py-1 rounded-md">
              REQ ID: {request.id}
            </span>
            <span className="text-xs font-mono text-gray-500">
              Claim: {request.claim_id}
            </span>
            {request.status !== "PENDING" && (
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                request.status.includes("APPROVED")
                  ? "bg-[#1F7A4D]/10 text-[#1F7A4D]"
                  : "bg-red-100 text-red-700"
              }`}>
                {request.status}
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-[#0F2439] pt-1">
            Human-in-the-Loop Approval Required
          </h3>
        </div>
        <div className="text-right font-mono">
          <div className="text-sm text-gray-500">Claim Amount</div>
          <div className="text-xl font-bold text-[#0E2E52]">
            ₹{request.amountINR.toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      {/* Threshold Warning Banner */}
      {isExceeded && (
        <div className="bg-[#A15C00]/10 border border-[#A15C00]/30 rounded-lg p-4 flex items-start space-x-3 text-sm text-[#A15C00]">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-[#A15C00]" />
          <div>
            <span className="font-semibold">HITL Friction Threshold Triggered:</span> Amount (₹{request.amountINR.toLocaleString("en-IN")}) exceeds the ₹10,000 safety threshold. Mandatory human review and dual sign-off warnings active.
          </div>
        </div>
      )}

      {/* Proposed Action */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-gray-500 uppercase tracking-wider">
          <span>Proposed Action</span>
          {request.status === "PENDING" && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-[#0E2E52] hover:underline flex items-center space-x-1 capitalize font-sans"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? "Cancel Edit" : "Edit Proposed Action"}</span>
            </button>
          )}
        </div>
        {isEditing ? (
          <textarea
            value={actionText}
            onChange={(e) => setActionText(e.target.value)}
            className="w-full border border-[#B8935B] rounded-lg p-3 text-sm text-[#0F2439] focus:outline-none focus:ring-2 focus:ring-[#B8935B]"
            rows={3}
          />
        ) : (
          <div className="bg-[#F6F7FA] border border-[#E2E6EC] rounded-lg p-4 text-sm text-[#0F2439] font-mono leading-relaxed">
            {request.proposedAction}
          </div>
        )}
      </div>

      {/* Citations & Rule References */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">
          Citations & Legal Grounding
        </div>
        <div className="space-y-2">
          {request.citations.map((cit, idx) => (
            <div key={idx} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs">
              <div className="space-y-0.5">
                <p className="font-medium text-[#0F2439]">{cit.text}</p>
                <p className="text-gray-500 italic">Source: {cit.source}</p>
              </div>
              <div>
                {cit.verified ? (
                  <span className="bg-[#1F7A4D]/10 text-[#1F7A4D] font-medium px-2.5 py-1 rounded-md flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                ) : (
                  <span className="bg-[#A15C00]/10 text-[#A15C00] font-medium px-2.5 py-1 rounded-md flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Unverified — needs review</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live AgentResponse JSON Inspector (§4.2) */}
      <div className="border border-[#E2E6EC] rounded-lg overflow-hidden bg-[#0F2439] text-white">
        <button
          onClick={() => setShowJson(!showJson)}
          className="w-full flex items-center justify-between p-3.5 bg-[#0E2E52] text-xs font-mono text-gray-200 hover:bg-[#0E2E52]/90 transition"
        >
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-[#B8935B]" />
            <span className="font-semibold text-white">Inspect AgentResponse Payload (§4.2 Output Contract)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#B8935B]/20 text-[#B8935B] px-2 py-0.5 rounded text-[10px]">LIVE JSON</span>
            {showJson ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>
        {showJson && (
          <div className="p-4 font-mono text-xs overflow-x-auto max-h-72 leading-relaxed text-emerald-400 bg-[#0F2439]">
            <pre>{JSON.stringify(request.agentResponse, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {request.status === "PENDING" && (
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            onClick={() => onDecide(request.id, "REJECTED")}
            className="px-5 py-2.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 text-sm font-medium transition flex items-center space-x-2"
          >
            <XCircle className="w-4 h-4" />
            <span>Reject Request</span>
          </button>
          <button
            onClick={() =>
              onDecide(
                request.id,
                isEditing ? "EDITED_AND_APPROVED" : "APPROVED",
                isEditing ? actionText : undefined
              )
            }
            className="px-6 py-2.5 rounded-lg bg-[#0E2E52] text-white hover:bg-[#0E2E52]/90 text-sm font-medium transition shadow-sm flex items-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#B8935B]" />
            <span>{isEditing ? "Approve Edited Action" : "Approve & Advance"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

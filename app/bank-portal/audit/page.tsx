"use client";

import React, { useState } from "react";
import { useBankPortalStore } from "@/store/useBankPortalStore";
import { 
  History, 
  Download, 
  ShieldCheck, 
  Search, 
  FileText, 
  UserCheck, 
  Bot, 
  CheckCircle2, 
  Filter
} from "lucide-react";

export default function BankPortalAuditPage() {
  const { claims } = useBankPortalStore();
  const [selectedClaimId, setSelectedClaimId] = useState<string>("ALL");
  const [actorFilter, setActorFilter] = useState<string>("ALL");

  const selectedClaim = claims.find((c) => c.id === selectedClaimId);

  // Combine agent logs across claims into a single timestamped audit ledger
  const allAuditLogs = claims.flatMap((c) =>
    c.agentLogs.map((log) => ({
      ...log,
      claimId: c.id,
      claimantName: c.claimantName,
      deceasedName: c.deceasedName,
      branchName: c.branchName,
    }))
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const filteredLogs = allAuditLogs.filter((log) => {
    const matchesClaim = selectedClaimId === "ALL" || log.claimId === selectedClaimId;
    const matchesActor =
      actorFilter === "ALL" ||
      (actorFilter === "AGENT" && log.agentName !== "Execution Agent") ||
      (actorFilter === "HUMAN" && log.agentName === "Execution Agent");
    return matchesClaim && matchesActor;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#1E2761] text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-[#E8B04B]" />
            <span>Regulatory Immutable Audit Trail & Activity Ledger</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2761] tracking-tight">
            Compliance & Activity Log
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Cryptographically sealed SHA-256 event log tracking every AI agent action and officer authorization decision.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Downloading Regulatory Audit Package (PDF)...")}
            className="px-4 py-2.5 bg-[#1E2761] text-white text-xs font-mono font-semibold rounded-lg hover:bg-[#1E2761]/90 transition shadow-xs flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-[#E8B04B]" />
            <span>EXPORT REGULATORY PDF PACKAGE</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedClaimId}
            onChange={(e) => setSelectedClaimId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1E2761]"
          >
            <option value="ALL">All Estate Claims</option>
            {claims.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} - {c.claimantName} ({c.deceasedName})
              </option>
            ))}
          </select>

          <select
            value={actorFilter}
            onChange={(e) => setActorFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1E2761]"
          >
            <option value="ALL">All Actors (AI & Human)</option>
            <option value="AGENT">AI Agent Inferences Only</option>
            <option value="HUMAN">Bank Officer Sign-Offs Only</option>
          </select>
        </div>

        <div className="text-xs font-mono text-slate-500">
          Showing <strong>{filteredLogs.length}</strong> recorded audit events
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-serif font-bold text-base text-[#1E2761] flex items-center gap-2">
            <History className="w-5 h-5 text-[#E8B04B]" />
            <span>Timestamped Event History Ledger</span>
          </h3>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>SHA-256 Hash Chain Validated</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 font-mono text-[11px] uppercase tracking-wider text-slate-600">
                <th className="p-3.5">Timestamp (UTC)</th>
                <th className="p-3.5">Claim Ref</th>
                <th className="p-3.5">Actor & Component</th>
                <th className="p-3.5">Action Executed</th>
                <th className="p-3.5">Summary / Reasoning</th>
                <th className="p-3.5 text-center">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono text-xs">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-3.5 text-slate-500 text-[11px]">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>

                  <td className="p-3.5 font-semibold text-[#1E2761]">
                    {log.claimId}
                  </td>

                  <td className="p-3.5 font-sans font-medium text-slate-900">
                    <div className="flex items-center gap-2">
                      {log.agentName.includes("Officer") ? (
                        <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Bot className="w-4 h-4 text-[#1E2761] shrink-0" />
                      )}
                      <span>{log.agentName}</span>
                    </div>
                  </td>

                  <td className="p-3.5 font-sans font-medium text-slate-800">
                    {log.actionTaken}
                  </td>

                  <td className="p-3.5 font-sans text-slate-600 text-[11px] leading-relaxed max-w-md">
                    {log.outputSummary}
                  </td>

                  <td className="p-3.5 text-center font-bold text-slate-700">
                    {(log.confidenceScore * 100).toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

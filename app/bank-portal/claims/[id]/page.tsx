"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useBankPortalStore } from "@/store/useBankPortalStore";
import { formatINR } from "@/utils/formatters";
import { 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Eye, 
  Lock, 
  UserCheck, 
  ZoomIn, 
  Clock, 
  Bot,
  ExternalLink,
  Edit3
} from "lucide-react";

export default function ClaimDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { claims, decideClaim } = useBankPortalStore();
  
  const claim = claims.find((c) => c.id === id) || claims[0];

  const [selectedDoc, setSelectedDoc] = useState(claim.documents[0] || null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [decisionType, setDecisionType] = useState<"APPROVED" | "REJECTED" | "MORE_INFO_REQUESTED">("APPROVED");
  const [officerReasoning, setOfficerReasoning] = useState("");

  const handleOfficerSubmit = () => {
    if (!officerReasoning.trim()) {
      alert("Please provide officer reasoning/comments before submitting your decision.");
      return;
    }
    decideClaim(claim.id, decisionType, officerReasoning, "Vikram Malhotra (Senior Compliance Officer)");
    setShowDecisionModal(false);
    setOfficerReasoning("");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link
          href="/bank-portal"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#1E2761] hover:underline font-semibold"
        >
          <ArrowLeft className="w-4 h-4 text-[#E8B04B]" />
          <span>BACK TO CLAIMS OVERVIEW</span>
        </Link>
        <span className="text-xs font-mono bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
          CLAIM REF: {claim.id}
        </span>
      </div>

      {/* Case Summary Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                claim.status === "APPROVED"
                  ? "bg-emerald-100 text-emerald-800"
                  : claim.status === "PENDING_APPROVAL"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-blue-100 text-blue-800"
              }`}>
                STATUS: {claim.status.replace("_", " ")}
              </span>
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                claim.riskLevel === "LOW" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
              }`}>
                {claim.riskLevel} RISK
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2761] mt-2">
              Claimant: {claim.claimantName}
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Deceased: <strong className="text-slate-900">{claim.deceasedName}</strong> &nbsp;|&nbsp;
              Account: <strong className="text-[#1E2761]">{claim.deceasedAccountNumber}</strong> &nbsp;|&nbsp;
              Branch: {claim.branchName}
            </p>
          </div>

          <div className="text-right font-mono shrink-0">
            <span className="text-xs text-slate-500 block uppercase">Discovered Claim Value</span>
            <span className="text-2xl sm:text-3xl font-bold text-[#1E2761]">
              {formatINR(claim.claimAmountINR)}
            </span>
          </div>
        </div>

        {/* Officer Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <p className="text-xs text-slate-500 font-sans">
            Assigned Officer: <strong className="text-slate-800 font-semibold">{claim.assignedOfficer}</strong>
          </p>

          {claim.status !== "APPROVED" && claim.status !== "REJECTED" && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setDecisionType("MORE_INFO_REQUESTED");
                  setShowDecisionModal(true);
                }}
                className="px-4 py-2 bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold rounded-lg hover:bg-amber-100 transition flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Request Info</span>
              </button>

              <button
                onClick={() => {
                  setDecisionType("REJECTED");
                  setShowDecisionModal(true);
                }}
                className="px-4 py-2 bg-red-50 border border-red-300 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Claim</span>
              </button>

              <button
                onClick={() => {
                  setDecisionType("APPROVED");
                  setShowDecisionModal(true);
                }}
                className="px-6 py-2 bg-[#1E2761] text-white text-xs font-semibold rounded-lg hover:bg-[#1E2761]/90 transition shadow-xs flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#E8B04B]" />
                <span>Approve & Release Funds</span>
              </button>
            </div>
          )}
        </div>

        {claim.officerDecisionReasoning && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-4 text-xs font-sans space-y-1">
            <span className="font-mono text-emerald-700 font-bold uppercase text-[11px] block">
              OFFICER DECISION RECORDED BY {claim.decidedBy} ({new Date(claim.decidedAt || "").toLocaleString()})
            </span>
            <p className="leading-relaxed">{claim.officerDecisionReasoning}</p>
          </div>
        )}
      </div>

      {/* Main Grid: Document Checklist & Side-by-Side Inspection Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Document Checklist & AI Verification Status (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-[#1E2761] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#E8B04B]" />
                <span>Document Verification Checklist</span>
              </h3>
              <span className="text-xs font-mono text-slate-500">
                {claim.documents.filter((d) => d.status === "AI_VERIFIED").length}/{claim.documents.length} Verified
              </span>
            </div>

            <div className="space-y-3">
              {claim.documents.map((doc) => {
                const isSelected = selectedDoc?.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`p-4 rounded-xl border cursor-pointer transition space-y-2 ${
                      isSelected
                        ? "bg-blue-50/70 border-[#1E2761] ring-1 ring-[#1E2761]"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-slate-900 text-xs">{doc.documentType}</p>
                        <p className="text-[11px] font-mono text-slate-500 truncate max-w-[200px]">{doc.fileName}</p>
                      </div>

                      {doc.status === "AI_VERIFIED" ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>AI VERIFIED ({(doc.aiConfidenceScore * 100).toFixed(0)}%)</span>
                        </span>
                      ) : (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>NEEDS REVIEW</span>
                        </span>
                      )}
                    </div>

                    {/* SHA-256 Tamper Check Indicator */}
                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 font-mono">
                      <span className="text-slate-500">Tamper Hash Check:</span>
                      {doc.tamperCheckPassed ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>PASS (Hash Match)</span>
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold">FAIL (Mismatch)</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Auto-Generated Compliance Checklist */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="font-serif font-bold text-base text-[#1E2761] flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#1E2761]" />
                <span>Succession Law & Compliance Audit</span>
              </h3>
              <p className="text-[11px] text-slate-500">Auto-generated rules based on Hindu Succession Act 1956 & RBI Master Directions.</p>
            </div>

            <div className="space-y-3">
              {claim.complianceChecklist.map((rule) => (
                <div key={rule.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#1E2761]">{rule.lawSource}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rule.status === "PASSED" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                    }`}>
                      {rule.status}
                    </span>
                  </div>
                  <p className="text-slate-700 font-sans">{rule.ruleDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Side-by-Side Interactive Document Inspection Viewer (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {selectedDoc ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#1E2761] flex items-center gap-2">
                    <Eye className="w-5 h-5 text-[#E8B04B]" />
                    <span>Forensic Inspection Viewer — {selectedDoc.documentType}</span>
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500">SHA-256: {selectedDoc.sha256Hash}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-mono font-bold"
                    title="Zoom In"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="px-2 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-mono"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Side-by-Side Layout: Document Image + Extracted Entities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {/* Document Graphic Box */}
                <div className="bg-slate-900 rounded-xl overflow-hidden p-2 relative h-80 flex items-center justify-center border border-slate-800">
                  <div
                    style={{ transform: `scale(${zoomLevel})` }}
                    className="transition-transform duration-200 w-full h-full relative"
                  >
                    <Image
                      src={selectedDoc.fileUrl}
                      alt={selectedDoc.documentType}
                      fill
                      unoptimized
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* AI Entity Extraction Results Panel */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 font-sans">
                  <span className="text-xs font-mono font-bold text-[#1E2761] uppercase block border-b border-slate-200 pb-2">
                    AI Entity Extraction Results
                  </span>
                  <div className="space-y-2 text-xs">
                    {Object.entries(selectedDoc.extractedEntities).map(([key, val]) => (
                      <div key={key} className="space-y-0.5">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">{key}</span>
                        <p className="font-semibold text-slate-900 font-mono">{val}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-600">
                    <span className="font-bold text-[#1E2761]">AI Forensic Score:</span> ({(selectedDoc.aiConfidenceScore * 100).toFixed(0)}%) Authenticity score verified against issuer e-District database.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
              Select a document from the checklist to open the forensic side-by-side inspection viewer.
            </div>
          )}

          {/* AI Agent Activity Log Timeline */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="font-serif font-bold text-base text-[#1E2761] flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#1E2761]" />
                <span>AI Agent Execution Trace Log</span>
              </h3>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {claim.agentLogs.map((log) => (
                <div key={log.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="font-bold text-[#1E2761]">{log.agentName}</span>
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-slate-800 font-sans font-medium text-xs">{log.actionTaken}</p>
                  <p className="text-[11px] text-slate-500">{log.outputSummary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Officer Decision Modal */}
      {showDecisionModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-serif font-bold text-lg text-[#1E2761]">
                Record Bank Officer Authorization Decision
              </h3>
              <button onClick={() => setShowDecisionModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-500 uppercase block">Selected Action</span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                decisionType === "APPROVED" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
              }`}>
                {decisionType.replace("_", " ")}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-800 block">
                Officer Comments & Regulatory Reasoning (Mandatory) *
              </label>
              <textarea
                value={officerReasoning}
                onChange={(e) => setOfficerReasoning(e.target.value)}
                placeholder="Enter mandatory compliance notes, legal heir verification checks, and reasoning before signing off..."
                className="w-full border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1E2761]"
                rows={4}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                onClick={() => setShowDecisionModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleOfficerSubmit}
                className="px-5 py-2 bg-[#1E2761] text-white text-xs font-semibold rounded-lg hover:bg-[#1E2761]/90 shadow-xs"
              >
                Confirm & Record Digital Sign-Off
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

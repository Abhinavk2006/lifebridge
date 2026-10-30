"use client";

import React from "react";
import Link from "next/link";
import { useBankPortalStore } from "@/store/useBankPortalStore";
import { formatINR } from "@/utils/formatters";
import { 
  FileCheck2, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowUpRight,
  Sparkles,
  Building,
  UserCheck,
  Calendar
} from "lucide-react";

export default function BankPortalDashboardPage() {
  const { 
    claims, 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter, 
    riskFilter, 
    setRiskFilter,
    selectedBranch 
  } = useBankPortalStore();

  // Filter logic
  const filteredClaims = claims.filter((c) => {
    const matchesSearch = 
      c.claimantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.deceasedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.deceasedAccountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    const matchesRisk = riskFilter === "ALL" || c.riskLevel === riskFilter;
    const matchesBranch = selectedBranch === "ALL" || c.branchName === selectedBranch;

    return matchesSearch && matchesStatus && matchesRisk && matchesBranch;
  });

  const pendingApprovalsCount = claims.filter((c) => c.status === "PENDING_APPROVAL" || c.status === "UNDER_REVIEW").length;
  const flaggedCount = claims.filter((c) => c.riskLevel === "MEDIUM" || c.riskLevel === "HIGH").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#1E2761] text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-[#E8B04B]" />
            <span>Fiduciary Estate Claim Management & Officer Dashboard</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2761] tracking-tight">
            Deceased Estate Claims Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            B2B Bank Partner Portal for reviewing, verifying, and authorizing legal heir claim submissions under RBI Master Directions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/bank-portal/audit"
            className="px-4 py-2.5 bg-white border border-slate-300 text-[#1E2761] text-xs font-semibold rounded-lg hover:bg-slate-50 transition shadow-xs flex items-center gap-2"
          >
            <Clock className="w-4 h-4 text-[#1E2761]" />
            <span>View Full Audit Trail</span>
          </Link>
        </div>
      </div>

      {/* Primary Summary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Claims This Week</span>
            <span className="w-8 h-8 rounded-lg bg-[#1E2761]/10 text-[#1E2761] flex items-center justify-center font-bold">
              <FileCheck2 className="w-4 h-4" />
            </span>
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2761]">14 Cases</p>
          <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18% vs previous week</span>
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Avg Processing Time</span>
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">3.4 Days</p>
          <p className="text-[11px] text-slate-500">Traditional bank average: 65 Days</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Pending Officer Approvals</span>
            <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <UserCheck className="w-4 h-4" />
            </span>
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-700">{pendingApprovalsCount} Pending</p>
          <p className="text-[11px] text-amber-700 font-medium">Requires officer signoff</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Flagged for Compliance Review</span>
            <span className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-red-700">{flaggedCount} Cases</p>
          <p className="text-[11px] text-red-600 font-medium">SecondaryWill / Document Verification</p>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by Claimant Name, Deceased Account Holder, Account Number, or Claim Ref ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1E2761]"
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E2761] cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="PENDING_APPROVAL">Pending Officer Approval</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>

            {/* Risk Filter Dropdown */}
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E2761] cursor-pointer"
            >
              <option value="ALL">All Risk Flags</option>
              <option value="LOW">Low Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="HIGH">High Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data-Dense Claims Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-serif font-bold text-base text-[#1E2761] flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-[#E8B04B]" />
            <span>Active Estate Claims Queue ({filteredClaims.length})</span>
          </h3>
          <span className="text-xs font-mono text-slate-500">Showing filtered results</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 font-mono text-[11px] uppercase tracking-wider text-slate-600">
                <th className="p-3.5">Claim Ref ID</th>
                <th className="p-3.5">Claimant & Relationship</th>
                <th className="p-3.5">Deceased & Account</th>
                <th className="p-3.5">Branch</th>
                <th className="p-3.5 text-right">Claim Amount</th>
                <th className="p-3.5 text-center">Risk Flag</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredClaims.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 italic">
                    No claims match your active search and status filter criteria.
                  </td>
                </tr>
              ) : (
                filteredClaims.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 font-mono font-semibold text-[#1E2761]">
                      {c.id}
                    </td>

                    <td className="p-3.5 font-sans">
                      <p className="font-semibold text-slate-900">{c.claimantName}</p>
                      <p className="text-[11px] text-slate-500">{c.claimantRelationship}</p>
                    </td>

                    <td className="p-3.5 font-sans">
                      <p className="font-semibold text-slate-900">{c.deceasedName}</p>
                      <p className="text-[11px] font-mono text-slate-500">{c.deceasedAccountNumber}</p>
                    </td>

                    <td className="p-3.5 text-slate-600 font-sans text-[11px]">
                      {c.branchName}
                    </td>

                    <td className="p-3.5 text-right font-mono font-bold text-[#1E2761] text-sm">
                      {formatINR(c.claimAmountINR)}
                    </td>

                    <td className="p-3.5 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        c.riskLevel === "LOW"
                          ? "bg-emerald-100 text-emerald-800"
                          : c.riskLevel === "MEDIUM"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {c.riskLevel === "LOW" && <ShieldCheck className="w-3 h-3" />}
                        {c.riskLevel !== "LOW" && <AlertTriangle className="w-3 h-3" />}
                        <span>{c.riskLevel} RISK</span>
                      </span>
                    </td>

                    <td className="p-3.5 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        c.status === "APPROVED"
                          ? "bg-emerald-100 text-emerald-800"
                          : c.status === "PENDING_APPROVAL"
                          ? "bg-amber-100 text-amber-800 font-bold"
                          : c.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {c.status.replace("_", " ")}
                      </span>
                    </td>

                    <td className="p-3.5 text-center">
                      <Link
                        href={`/bank-portal/claims/${c.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#1E2761] text-white font-medium rounded-md hover:bg-[#1E2761]/90 transition text-xs shadow-xs"
                      >
                        <span>Review Claim</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#E8B04B]" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

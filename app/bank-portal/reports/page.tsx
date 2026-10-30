"use client";

import React from "react";
import { BarChart3, TrendingUp, Clock, CheckCircle2, Building, ShieldCheck } from "lucide-react";

export default function BankPortalReportsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-[#1E2761] text-xs font-mono font-semibold uppercase tracking-wider mb-1">
          <BarChart3 className="w-4 h-4 text-[#E8B04B]" />
          <span>Branch Performance & SLA Settlement Analytics</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2761] tracking-tight">
          Regional Branch Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Comprehensive SLA metrics across State Bank of India regional branches.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-medium">Total Claims Processed (YTD)</span>
          <p className="font-serif text-3xl font-bold text-[#1E2761]">142 Claims</p>
          <p className="text-xs text-emerald-600 font-medium">98.5% Settlement Success Rate</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-medium">Average Days to Resolution</span>
          <p className="font-serif text-3xl font-bold text-slate-900">3.2 Days</p>
          <p className="text-xs text-slate-500">Target SLA: &lt; 5 Days</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
          <span className="text-xs text-slate-500 font-medium">Dormant Account Penalty Waivers Saved</span>
          <p className="font-serif text-3xl font-bold text-[#1E2761]">₹24.8 Lakhs</p>
          <p className="text-xs text-emerald-600 font-medium">Under RBI Master Directions</p>
        </div>
      </div>

      {/* Branch Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-6 space-y-4">
        <h3 className="font-serif font-bold text-base text-[#1E2761]">Branch Performance Breakdown</h3>
        <table className="w-full text-left text-xs border-collapse font-sans">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] uppercase text-slate-600">
              <th className="p-3">Branch Name</th>
              <th className="p-3">Active Claims</th>
              <th className="p-3">Avg Resolution Time</th>
              <th className="p-3">SLA Compliance Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="p-3 font-semibold text-slate-900">SBI — Mumbai Main Branch</td>
              <td className="p-3">8 Cases</td>
              <td className="p-3 font-mono">2.8 Days</td>
              <td className="p-3 font-mono font-bold text-emerald-600">100%</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-900">SBI — Connaught Place, New Delhi</td>
              <td className="p-3">4 Cases</td>
              <td className="p-3 font-mono">3.5 Days</td>
              <td className="p-3 font-mono font-bold text-emerald-600">96.4%</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-slate-900">SBI — MG Road, Bengaluru</td>
              <td className="p-3">2 Cases</td>
              <td className="p-3 font-mono">3.1 Days</td>
              <td className="p-3 font-mono font-bold text-emerald-600">98.1%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

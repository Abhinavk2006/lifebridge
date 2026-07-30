'use client';

import React from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { formatINR } from '@/utils/formatters';
import { BarChart3, TrendingUp, DollarSign, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AnalyticsPage() {
  const { cases, activeCaseId } = useLifeBridgeStore();
  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Financial Liquidity & Velocity Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time estate net valuation, cashflow schedule, and time-to-resolution metrics</p>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card-enterprise p-5">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">Total Estate Gross Value</span>
          <p className="font-mono-val text-3xl font-bold text-slate-900">{formatINR(currentCase.totalAssets)}</p>
          <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Includes ₹18.42 Lakh Discovered EPF Assets
          </p>
        </div>

        <div className="card-enterprise p-5">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">Estate Net Liquidity Pool</span>
          <p className="font-mono-val text-3xl font-bold text-blue-600">{formatINR(currentCase.netEstateValue)}</p>
          <p className="text-xs text-slate-500 mt-2">After {formatINR(currentCase.totalLiabilities)} Creditor Payoff</p>
        </div>

        <div className="card-enterprise p-5">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">Resolution Velocity</span>
          <p className="font-mono-val text-3xl font-bold text-emerald-600">3.2 Weeks</p>
          <p className="text-xs text-slate-500 mt-2">Vs. 8.4 Months Industry Benchmark</p>
        </div>
      </div>

      {/* Asset Breakdown Chart Box */}
      <div className="card-enterprise p-6 space-y-4">
        <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Estate Asset Allocation Breakdown
        </h3>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span>EPFO Provident Fund & Pension Scheme (EPS-95)</span>
              <span className="font-mono-val">₹62,00,000 (41.7%)</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full w-[41.7%]" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span>Life Insurance Corp (LIC) Jeevan Anand Claim</span>
              <span className="font-mono-val">₹50,00,000 (33.6%)</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-[33.6%]" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span>State Bank of India (SBI) Premier Savings</span>
              <span className="font-mono-val">₹24,50,000 (16.5%)</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full w-[16.5%]" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span>National Pension System (NPS Tier-I) (Discovered)</span>
              <span className="font-mono-val">₹25,50,000 (17.2%)</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full w-[17.2%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

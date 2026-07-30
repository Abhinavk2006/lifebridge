'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { formatINR } from '@/utils/formatters';
import { Sliders, Sparkles, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';

export default function SimulationPage() {
  const { cases, activeCaseId } = useLifeBridgeStore();
  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];
  const [liquidationOrder, setLiquidationOrder] = useState<'tax_optimized' | 'cash_first'>('tax_optimized');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <Sliders className="w-4 h-4" />
            <span>Interactive Scenario Simulator Workbench</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            "What-If" Capital Gains Tax & Legal Heir Distribution Modeling
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Test liquidation sequences under Income Tax Act Sec 48 and Hindu Succession Act before legal execution
          </p>
        </div>
      </div>

      {/* Simulator Inputs & Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Controls */}
        <div className="card-enterprise p-5 space-y-4">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Simulation Strategy Controls
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-500 font-semibold block mb-1.5">Asset Liquidation Strategy</label>
              <select
                value={liquidationOrder}
                onChange={(e) => setLiquidationOrder(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold text-slate-800 focus:outline-none"
              >
                <option value="tax_optimized">Indexed Cost Basis (IT Act Sec 48 - Zero Capital Gains)</option>
                <option value="cash_first">Bank Deposit Liquidity First (Fast Heir Payout)</option>
              </select>
            </div>

            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 space-y-1">
              <span className="text-blue-800 font-bold block">Simulation Agent 05 Recommendation</span>
              <p className="text-slate-600">
                Cost Inflation Indexing (CII) under Income Tax Act Section 48 resets cost basis on ancestral property and SBI Mutual Funds to DOD market value, saving legal heirs <strong>₹12,40,000</strong> in capital gains tax.
              </p>
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Scenario Result Output */}
        <div className="lg:col-span-2 card-enterprise p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-bold text-slate-900">Projected Distribution Outcomes (INR)</h3>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold font-mono-val px-3 py-1 rounded-full">
              OPTIMAL SCENARIO
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500 font-semibold block mb-1">Eleanor Mehta Vance (60% Legal Heir Share)</span>
              <p className="font-mono-val text-2xl font-bold text-slate-900">{formatINR(8538000)}</p>
              <p className="text-emerald-600 font-semibold text-[11px] mt-1">Tax Liability: ₹0 (Exempt under Sec 56(2))</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500 font-semibold block mb-1">Thomas Mehta (40% Legal Heir Share)</span>
              <p className="font-mono-val text-2xl font-bold text-slate-900">{formatINR(5692000)}</p>
              <p className="text-emerald-600 font-semibold text-[11px] mt-1">Tax Liability: ₹0 (Exempt under Sec 56(2))</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

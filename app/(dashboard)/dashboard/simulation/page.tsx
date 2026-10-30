'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { formatINR } from '@/utils/formatters';
import { Sliders, Sparkles, CheckCircle2, TrendingUp, ArrowRight, Download, Calculator, Scale, Layers } from 'lucide-react';

import { useLanguage } from '@/components/providers/LanguageProvider';

export default function SimulationPage() {
  const { cases, activeCaseId } = useLifeBridgeStore();
  const { toast } = useToast();
  const { t } = useLanguage();
  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];

  const [liquidationOrder, setLiquidationOrder] = useState<'tax_optimized' | 'cash_first' | 'property_first'>('tax_optimized');
  const [holdingYears, setHoldingYears] = useState(15);

  const calculateTaxSavings = () => {
    if (liquidationOrder === 'tax_optimized') return 1240000;
    if (liquidationOrder === 'property_first') return 890000;
    return 320000;
  };

  const calculateMonths = () => {
    if (liquidationOrder === 'tax_optimized') return 3.5;
    if (liquidationOrder === 'cash_first') return 2.0;
    return 7.0;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* High-Impact Senior Family Wealth Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-700 min-h-[260px] flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/indian_senior_family_wealth.png"
            alt="Senior Family Wealth Modeling"
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
              <Sliders className="w-4 h-4 text-[#B8935B]" />
              <span>INCOME TAX ACT SEC 48 & COST INFLATION INDEXING WORKBENCH</span>
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
                  {t('simulation.title')}
                </h1>
                <p className="text-xs text-blue-200 font-mono mt-0.5">
                  {t('simulation.subtitle')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/dashboard/export-certificate"
              className="px-5 py-2.5 bg-[#B8935B] text-[#002b49] font-bold text-xs font-mono rounded-xl hover:bg-white transition flex items-center gap-2 shadow-sm uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT SIMULATION (PDF)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Simulator Inputs & Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
        {/* Left Col: Controls */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#004c8c]" />
            <span>Simulation Strategy Controls</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-700 font-semibold block mb-1.5">Asset Liquidation Strategy</label>
              <select
                value={liquidationOrder}
                onChange={(e) => setLiquidationOrder(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004c8c]"
              >
                <option value="tax_optimized">Indexed Cost Basis (IT Act Sec 48 - Zero Tax)</option>
                <option value="cash_first">Bank Deposit Liquidity First (Fast Payout)</option>
                <option value="property_first">Ancestral Real Estate Sale First</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 font-semibold mb-1">
                <span>Property Holding Period</span>
                <span className="font-mono font-bold text-[#004c8c]">{holdingYears} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={holdingYears}
                onChange={(e) => setHoldingYears(Number(e.target.value))}
                className="w-full accent-[#004c8c]"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 space-y-2">
              <span className="text-[#004c8c] font-bold font-mono text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#B8935B]" />
                <span>Simulation Agent 05 Recommendation</span>
              </span>
              <p className="text-slate-700 text-xs leading-relaxed">
                Cost Inflation Indexing (CII) under Income Tax Act Section 48 resets cost basis on ancestral property and SBI Mutual Funds to DOD market value, saving legal heirs <strong>{formatINR(calculateTaxSavings())}</strong> in capital gains tax.
              </p>
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Simulation Results */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>Simulated Financial & Legal Outcomes</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-1">
              <span className="text-slate-500 font-mono text-[10px] font-bold uppercase block">Capital Gains Tax Saved</span>
              <p className="font-mono text-2xl font-bold text-emerald-700">{formatINR(calculateTaxSavings())}</p>
              <p className="text-xs text-emerald-800 font-mono pt-1">Zero Penalty Guarantee</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl space-y-1">
              <span className="text-slate-500 font-mono text-[10px] font-bold uppercase block">Est. Settlement Timeline</span>
              <p className="font-mono text-2xl font-bold text-[#004c8c]">{calculateMonths()} Months</p>
              <p className="text-xs text-blue-800 font-mono pt-1">vs 14 Months Traditional</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-1">
              <span className="text-slate-500 font-mono text-[10px] font-bold uppercase block">Net Legal Heir Payout</span>
              <p className="font-mono text-2xl font-bold text-slate-900">{formatINR(currentCase.netEstateValue)}</p>
              <p className="text-xs text-slate-600 font-mono pt-1">Class I Equal Distribution</p>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[#B8935B] font-bold">ALGORITHMIC CREDITOR PAYOFF SEQUENCE</span>
              <span className="text-emerald-400">OPTIMIZED</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li>1. Settle Adani Electricity final residential bill (₹34,000) &bull; Priority 1</li>
              <li>2. Apply for State Bank of India dormant penalty fee waiver (+₹45,000) &bull; Priority 2</li>
              <li>3. Distribute net liquidity to Eleanor Vance (60%) & Thomas Mehta (40%) &bull; Priority 3</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { Network, Search, Filter, ShieldCheck, CheckCircle2, User, Building2, FileText, ExternalLink, ArrowRight } from 'lucide-react';

export default function KnowledgeGraphPage() {
  const { cases, activeCaseId } = useLifeBridgeStore();
  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];
  const [selectedNode, setSelectedNode] = useState<string | null>('node-1');
  const [filterType, setFilterType] = useState<string>('ALL');

  const nodes = [
    { id: 'node-1', label: 'Rameshchandra Mehta', type: 'Deceased', val: '₹1,48,50,000 Total Estate', details: 'Deceased Subject (DOD: May 12, 2026)', verified: true },
    { id: 'node-2', label: 'Eleanor Mehta Vance', type: 'Executor', val: '60% Net Beneficiary', details: 'Primary Executor & Lead Legal Heir', verified: true },
    { id: 'node-3', label: 'Thomas Mehta', type: 'Beneficiary', val: '40% Net Beneficiary', details: 'Secondary Legal Heir (Son)', verified: true },
    { id: 'node-4', label: 'State Bank of India (SBI)', type: 'Bank', val: '₹24,50,000 Savings Deposit', details: 'Account #SB-****4912 (Fee Waiver Pending)', verified: true },
    { id: 'node-5', label: 'Life Insurance Corp of India (LIC)', type: 'Insurance', val: '₹50,00,000 Jeevan Anand', details: 'Policy #POL-LIC-883910 (Claim Settled)', verified: true },
    { id: 'node-6', label: 'EPFO Provident Fund', type: 'Bank', val: '₹62,00,000 EPF Corpus', details: 'UAN #1009-8812-4912 (Settled)', verified: true },
    { id: 'node-7', label: 'National Pension System (NPS)', type: 'Bank', val: '₹25,50,000 NPS Tier-I', details: 'Discovered via Form 26AS Tax Parsing', verified: true },
    { id: 'node-8', label: 'Bombay High Court', type: 'Government', val: 'Case #MH-2026-004921', details: 'Testamentary & Intestate Bench', verified: true },
    { id: 'node-9', label: 'Adani Electricity / MCGM', type: 'Utility', val: '-₹34,000 Final Bill', details: 'Account #CA-****7712 (Closure Pending)', verified: true }
  ];

  const currentNode = nodes.find(n => n.id === selectedNode) || nodes[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <Network className="w-4 h-4" />
            <span>Interactive Knowledge Graph Studio</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Entity Relationship Map — {currentCase.deceasedName}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Visual network mapping ownership, legal heirs, asset nodes, and institutional liabilities
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono-val font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> 28 Verified Graph Nodes
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          {['ALL', 'PEOPLE', 'BANKS', 'INSURANCE', 'GOVERNMENT'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterType === cat 
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-mono-val">
          Click any node to inspect entity details
        </span>
      </div>

      {/* Graph Visual Canvas & Inspector Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Graph Interactive Canvas */}
        <div className="lg:col-span-2 card-enterprise p-6 bg-slate-950 text-white min-h-[460px] relative flex flex-col justify-between overflow-hidden shadow-2xl border-slate-800">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono-val text-blue-300 font-semibold uppercase tracking-wider">
              Neo4j Graph Engine Connected
            </span>
          </div>

          {/* Interactive Graph Node Grid Mock */}
          <div className="my-auto py-10 grid grid-cols-3 gap-8 relative">
            {nodes.map((node) => (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedNode === node.id 
                    ? 'bg-blue-600 border-blue-300 ring-4 ring-blue-500/30 scale-105 shadow-xl' 
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono-val text-blue-300 font-bold mb-1">
                  <span>{node.type.toUpperCase()}</span>
                  {node.verified && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                </div>
                <h4 className="font-bold text-sm text-white truncate">{node.label}</h4>
                <p className="text-[11px] text-slate-300 font-mono-val mt-1">{node.val}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
            <span>Graph Density: 100% Verified</span>
            <span>Relationships: 14 Connected Edges</span>
          </div>
        </div>

        {/* Right Col: Entity Inspector Panel */}
        <div className="card-enterprise p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-mono-val font-bold text-blue-600 uppercase tracking-wider">
              Entity Inspector
            </span>
            <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">{currentNode.label}</h3>
            <p className="text-xs text-slate-500">{currentNode.details}</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Valuation / Capacity</span>
              <span className="font-mono-val font-bold text-slate-900 text-sm">{currentNode.val}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Verification Source</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" /> Certified Death Cert & Form 26AS Tax Disclosures
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Relationship Edges</span>
              <ul className="space-y-1 text-slate-700 mt-1">
                <li>• Linked to Subject: <strong>Rameshchandra Mehta</strong></li>
                <li>• Authorized Agent: <strong>Negotiation Agent 04</strong></li>
                <li>• Audit Trail Hash: <strong className="font-mono-val">#a4f9...8310</strong></li>
              </ul>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/dashboard/documents"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Source Document in Vault</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

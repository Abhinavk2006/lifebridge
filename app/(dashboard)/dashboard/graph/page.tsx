'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { Network, Search, Filter, ShieldCheck, CheckCircle2, User, Building2, FileText, ExternalLink, ArrowRight, Download, Plus, Sparkles, X } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function KnowledgeGraphPage() {
  const { cases, activeCaseId } = useLifeBridgeStore();
  const { toast } = useToast();
  const { t } = useLanguage();
  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];
  const [selectedNode, setSelectedNode] = useState<string | null>('node-1');
  const [filterType, setFilterType] = useState<string>('ALL');

  // Interactive New Node Add State
  const [isAddNodeOpen, setIsAddNodeOpen] = useState(false);
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [newNodeType, setNewNodeType] = useState('Bank');
  const [newNodeVal, setNewNodeVal] = useState('₹15,00,000 Deposit');
  const [newNodeDetails, setNewNodeDetails] = useState('Discovered via Form 26AS Tax Disclosures');

  const [nodes, setNodes] = useState([
    { id: 'node-1', label: 'Rameshchandra Mehta', type: 'Deceased', val: '₹1,48,50,000 Total Estate', details: 'Deceased Subject (DOD: May 12, 2026)', verified: true },
    { id: 'node-2', label: 'Eleanor Mehta Vance', type: 'Executor', val: '60% Net Beneficiary', details: 'Primary Executor & Lead Legal Heir', verified: true },
    { id: 'node-3', label: 'Thomas Mehta', type: 'Beneficiary', val: '40% Net Beneficiary', details: 'Secondary Legal Heir (Son)', verified: true },
    { id: 'node-4', label: 'State Bank of India (SBI)', type: 'Bank', val: '₹24,50,000 Savings Deposit', details: 'Account #SB-****4912 (Fee Waiver Pending)', verified: true },
    { id: 'node-5', label: 'Life Insurance Corp of India (LIC)', type: 'Insurance', val: '₹50,00,000 Jeevan Anand', details: 'Policy #POL-LIC-883910 (Claim Settled)', verified: true },
    { id: 'node-6', label: 'EPFO Provident Fund', type: 'Bank', val: '₹62,00,000 EPF Corpus', details: 'UAN #1009-8812-4912 (Settled)', verified: true },
    { id: 'node-7', label: 'National Pension System (NPS)', type: 'Bank', val: '₹25,50,000 NPS Tier-I', details: 'Discovered via Form 26AS Tax Parsing', verified: true },
    { id: 'node-8', label: 'Bombay High Court', type: 'Government', val: 'Case #MH-2026-004921', details: 'Testamentary & Intestate Bench', verified: true },
    { id: 'node-9', label: 'Adani Electricity / MCGM', type: 'Utility', val: '-₹34,000 Final Bill', details: 'Account #CA-****7712 (Closure Pending)', verified: true }
  ]);

  const handleAddNode = () => {
    if (!newNodeLabel) return;
    const id = `node-${nodes.length + 1}`;
    const newNode = {
      id,
      label: newNodeLabel,
      type: newNodeType,
      val: newNodeVal,
      details: newNodeDetails,
      verified: true
    };
    setNodes([...nodes, newNode]);
    setSelectedNode(id);
    setIsAddNodeOpen(false);
    setNewNodeLabel('');
    toast('New Asset Node Added!', `Added ${newNodeLabel} to the Knowledge Graph mesh.`, 'success');
  };

  const filteredNodes = filterType === 'ALL'
    ? nodes
    : nodes.filter(n => n.type.toUpperCase().includes(filterType.slice(0, 4)));

  const currentNode = nodes.find(n => n.id === selectedNode) || nodes[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* High-Impact Indian Banking Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-700 min-h-[260px] flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/indian_family_hero.png"
            alt="Interactive Knowledge Graph"
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
              <Network className="w-4 h-4 text-[#B8935B]" />
              <span>INTERACTIVE KNOWLEDGE GRAPH & ENTITY MESH</span>
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
                  {t('graph.title')} — {currentCase.deceasedName}
                </h1>
                <p className="text-xs text-blue-200 font-mono mt-0.5">
                  {t('graph.subtitle')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsAddNodeOpen(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-mono rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t('graph.add_node')}</span>
            </button>
            <Link
              href="/dashboard/export-certificate"
              className="px-5 py-2.5 bg-[#B8935B] text-[#002b49] font-bold text-xs font-mono rounded-xl hover:bg-white transition flex items-center gap-2 shadow-sm uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              <span>{t('graph.export_mesh')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-mono">
          {['ALL', 'PEOPLE', 'BANKS', 'INSURANCE', 'GOVERNMENT'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                filterType === cat 
                  ? 'bg-[#004c8c] text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-mono">
          Click any node to inspect entity details
        </span>
      </div>

      {/* Graph Visual Canvas & Inspector Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
        {/* Left 2 Cols: Graph Interactive Canvas */}
        <div className="lg:col-span-2 bg-slate-950 text-white rounded-3xl p-6 min-h-[480px] relative flex flex-col justify-between overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono text-blue-300 font-semibold uppercase tracking-wider">
              Neo4j Graph Engine Active &bull; {filteredNodes.length} Nodes Rendered
            </span>
          </div>

          {/* Interactive Graph Node Grid Mock */}
          <div className="my-auto py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
            {filteredNodes.map((node) => (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                  selectedNode === node.id 
                    ? 'bg-blue-600 border-blue-300 ring-4 ring-blue-500/30 scale-105 shadow-xl' 
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-blue-300 font-bold">
                  <span>{node.type.toUpperCase()}</span>
                  {node.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <h4 className="font-serif font-bold text-sm text-white truncate">{node.label}</h4>
                <p className="text-[11px] text-slate-300 font-mono">{node.val}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3 font-mono">
            <span>Graph Density: 100% Verified</span>
            <span>Relationships: {nodes.length + 5} Connected Edges</span>
          </div>
        </div>

        {/* Right Col: Entity Inspector Panel */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4 font-sans">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-mono font-bold text-[#004c8c] uppercase tracking-wider">
              Entity Inspector
            </span>
            <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">{currentNode.label}</h3>
            <p className="text-xs text-slate-500 font-sans mt-0.5">{currentNode.details}</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] uppercase font-bold font-mono block mb-0.5">Valuation / Capacity</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{currentNode.val}</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] uppercase font-bold font-mono block mb-0.5">Verification Source</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#004c8c]" /> Certified Death Cert & Form 26AS Tax Disclosures
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] uppercase font-bold font-mono block mb-0.5">Relationship Edges</span>
              <ul className="space-y-1 text-slate-700 mt-1 font-mono text-[11px]">
                <li>&bull; Linked Subject: <strong>Rameshchandra Mehta</strong></li>
                <li>&bull; Authorized Agent: <strong>Negotiation Agent 04</strong></li>
                <li>&bull; Audit Trail: <strong>#a4f9...8310</strong></li>
              </ul>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/dashboard/documents"
              className="w-full bg-[#004c8c] hover:bg-[#002b49] text-white text-xs font-bold font-mono py-3 rounded-xl flex items-center justify-center gap-2 transition uppercase tracking-wider shadow-xs"
            >
              <span>View Source Document in Vault</span>
              <ExternalLink className="w-4 h-4 text-[#B8935B]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Add Discovered Node Modal */}
      {isAddNodeOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-slate-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden text-slate-900 font-sans">
            <div className="bg-[#002b49] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#B8935B]/20 text-[#B8935B] flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white">Add Discovered Asset Node</h3>
                  <p className="text-xs text-blue-200 font-mono">Insert Node into Neo4j Mesh</p>
                </div>
              </div>
              <button onClick={() => setIsAddNodeOpen(false)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-sans">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Entity / Institution Name</label>
                <input
                  type="text"
                  value={newNodeLabel}
                  onChange={(e) => setNewNodeLabel(e.target.value)}
                  placeholder="e.g. Post Office Monthly Income Scheme (MIS)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Node Sector Type</label>
                  <select
                    value={newNodeType}
                    onChange={(e) => setNewNodeType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-mono"
                  >
                    <option value="Bank">Bank</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Government">Government</option>
                    <option value="Beneficiary">Beneficiary</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Valuation / Corpus</label>
                  <input
                    type="text"
                    value={newNodeVal}
                    onChange={(e) => setNewNodeVal(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Discovery Source Note</label>
                <input
                  type="text"
                  value={newNodeDetails}
                  onChange={(e) => setNewNodeDetails(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  onClick={() => setIsAddNodeOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNode}
                  className="px-5 py-2.5 bg-[#004c8c] hover:bg-[#002b49] text-white font-bold rounded-xl font-mono uppercase tracking-wider"
                >
                  Add Node to Graph
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

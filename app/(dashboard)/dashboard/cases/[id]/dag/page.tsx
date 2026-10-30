'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Network, CheckCircle2, AlertTriangle, Clock, Bot, MapPin, Sparkles, ArrowRight, Play, Download, ShieldCheck, X, Navigation, Phone, ExternalLink } from 'lucide-react';

export default function ExecutionDAGPage() {
  const { cases, activeCaseId, dagNodes, updateDAGNodeStatus } = useLifeBridgeStore();
  const { t } = useLanguage();
  const { toast } = useToast();
  const currentCase = cases.find(c => c.id === activeCaseId) || cases[0];
  const [executingNodeId, setExecutingNodeId] = useState<string | null>(null);

  // Selected Map Location for Interactive Modal
  const [selectedMapLoc, setSelectedMapLoc] = useState<{
    location: string;
    authority: string;
    city: string;
    coordinates: string;
    phone: string;
    hours: string;
  } | null>(null);

  // Indian Location Mappings per DAG Node
  const nodeLocations = [
    { location: 'MCGM G-South Ward Office, Fort, Mumbai 400001', authority: 'Registrar of Births & Deaths', city: 'Mumbai, Maharashtra', coordinates: '18.9298° N, 72.8335° E', phone: '022-2267-9000', hours: 'Mon-Sat 10:00 AM - 5:00 PM IST' },
    { location: 'High Court of Judicature at Bombay, Fort, Mumbai 400032', authority: 'Testamentary Registry Bench', city: 'Mumbai, Maharashtra', coordinates: '18.9291° N, 72.8312° E', phone: '022-2267-4131', hours: 'Mon-Fri 10:30 AM - 4:30 PM IST' },
    { location: 'Income Tax Centralized Processing Center, Bengaluru 560500', authority: 'CBDT Form 26AS Tax Server', city: 'Bengaluru, Karnataka', coordinates: '12.9716° N, 77.5946° E', phone: '1800-180-1961', hours: 'Mon-Fri 9:00 AM - 6:00 PM IST' },
    { location: 'SBI Nariman Point Main Branch, Fort, Mumbai 400021', authority: 'Fiduciary & Claims Intake Desk', city: 'Mumbai, Maharashtra', coordinates: '18.9256° N, 72.8242° E', phone: '022-2288-5000', hours: 'Mon-Sat 10:00 AM - 4:00 PM IST' },
    { location: 'LIC Divisional Office 1, Yogakshema, Nariman Point, Mumbai', authority: 'Death Claims Settlement Desk', city: 'Mumbai, Maharashtra', coordinates: '18.9264° N, 72.8251° E', phone: '022-2281-0000', hours: 'Mon-Fri 10:00 AM - 5:30 PM IST' }
  ];

  const handleExecuteNode = (nodeId: string, title: string) => {
    setExecutingNodeId(nodeId);
    toast('Executing Algorithmic Task', `Dispatching agent task for "${title}"...`, 'info');

    setTimeout(() => {
      updateDAGNodeStatus(nodeId, 'completed');
      setExecutingNodeId(null);
      toast('Task Completed Successfully!', `Executed "${title}" and updated DAG flight plan.`, 'success');
    }, 1200);
  };

  const handleOpenMap = (loc: typeof nodeLocations[0]) => {
    setSelectedMapLoc(loc);
    toast('Opening Indian Map Location', `Viewing GPS coordinates & office registry for ${loc.location}...`, 'info');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* High-Impact Indian Banking Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-700 min-h-[260px] flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/indian_family_hero.png"
            alt="Master Task Flight Plan"
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
              <span>EXECUTION DIRECTED ACYCLIC GRAPH (DAG)</span>
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
                  {t('dag.flight_plan_title')} — Estate of {currentCase.deceasedName}
                </h1>
                <p className="text-xs text-blue-200 font-mono mt-0.5">
                  {t('dag.subtitle')}
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
              <span>EXPORT STATEMENT (PDF)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* RECOMMENDED NEXT STEPS CARD */}
      <div className="bg-gradient-to-r from-[#002b49] to-[#004c8c] text-white rounded-2xl p-6 shadow-lg border border-slate-700 space-y-4 font-sans">
        <div className="flex items-center justify-between border-b border-white/20 pb-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#B8935B]" />
            <h2 className="font-serif font-bold text-lg text-white">
              WHAT TO DO NEXT — Recommended Executor Actions
            </h2>
          </div>
          <span className="bg-[#B8935B] text-[#002b49] font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase">
            ACTION REQUIRED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          <div className="bg-white/10 p-4 rounded-xl border border-white/20 space-y-2">
            <span className="font-mono text-[#B8935B] font-bold text-sm block">STEP 1: APPROVE FEE WAIVER</span>
            <p className="text-blue-100">
              Sign off on State Bank of India dormant penalty fee waiver (+₹45,000 Saved) in the Approval Center.
            </p>
            <Link
              href="/dashboard/approvals"
              className="inline-flex items-center gap-1.5 text-[#B8935B] font-bold hover:underline font-mono text-[11px]"
            >
              <span>Go to Approval Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white/10 p-4 rounded-xl border border-white/20 space-y-2">
            <span className="font-mono text-emerald-300 font-bold text-sm block">STEP 2: SUBMIT FORM ISR-1</span>
            <p className="text-blue-100">
              Dispatched KYC update packet to ICICI Mutual Fund Registrars (CAMS / KFintech).
            </p>
            <Link
              href="/dashboard/organizations/org-301"
              className="inline-flex items-center gap-1.5 text-emerald-300 font-bold hover:underline font-mono text-[11px]"
            >
              <span>Open Negotiation Room</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white/10 p-4 rounded-xl border border-white/20 space-y-2">
            <span className="font-mono text-blue-200 font-bold text-sm block">STEP 3: DOWNLOAD CERTIFICATE</span>
            <p className="text-blue-100">
              Export High Court certified legal heir statement for sub-registrar presentation.
            </p>
            <Link
              href="/dashboard/export-certificate"
              className="inline-flex items-center gap-1.5 text-blue-200 font-bold hover:underline font-mono text-[11px]"
            >
              <span>Print / Save as PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* DAG Controller Explanation Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <Bot className="w-5 h-5 text-blue-400" />
          <div>
            <p className="font-semibold text-blue-200">Orchestrator Agent Flight Controller</p>
            <p className="text-slate-400 text-[11px]">Tasks execute sequentially based on strict legal prerequisite rules.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 3 Completed</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" /> 1 Active</span>
          <span className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> 1 Action Needed</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> 2 Pending</span>
        </div>
      </div>

      {/* Visual Task Dependency Tree */}
      <div className="space-y-6 relative before:absolute before:left-6 before:top-6 before:bottom-6 before:w-0.5 before:bg-slate-200 pl-4 font-sans">
        {dagNodes.map((node, index) => {
          const loc = nodeLocations[index % nodeLocations.length];

          return (
            <div key={node.id} className="relative flex items-start gap-4">
              {/* Step Dot */}
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 bg-white font-mono text-xs font-bold ${
                node.status === 'completed' 
                  ? 'border-emerald-500 text-emerald-600 bg-emerald-50' 
                  : node.status === 'in_progress'
                    ? 'border-blue-600 text-blue-600 bg-blue-50 ring-4 ring-blue-100'
                    : 'border-slate-300 text-slate-400'
              }`}>
                {index + 1}
              </div>

              {/* Node Card */}
              <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-base text-slate-900">{node.title}</h3>
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold">
                        {node.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-sans mt-0.5">{node.description}</p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase shrink-0 ${
                    node.status === 'completed' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : node.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                  }`}>
                    {node.status}
                  </span>
                </div>

                {/* Clickable Indian Location & Map Badge */}
                <button
                  onClick={() => handleOpenMap(loc)}
                  className="w-full text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-[#004c8c] font-semibold group-hover:text-blue-700">
                    <MapPin className="w-4 h-4 text-[#B8935B] shrink-0 group-hover:scale-110 transition-transform" />
                    <span>Location: {loc.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span>Authority: <strong>{loc.authority}</strong></span>
                    <Navigation className="w-3.5 h-3.5 text-[#004c8c]" />
                  </div>
                </button>

                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <span className="text-slate-500">Prerequisites: <strong>{node.dependencies?.length ? node.dependencies.join(', ') : 'None (Root Node)'}</strong></span>

                  {node.status !== 'completed' && (
                    <button
                      onClick={() => handleExecuteNode(node.id, node.title)}
                      disabled={executingNodeId === node.id}
                      className="px-4 py-1.5 bg-[#004c8c] hover:bg-[#002b49] text-white font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-xs uppercase tracking-wider text-[11px]"
                    >
                      <Play className={`w-3.5 h-3.5 text-[#B8935B] ${executingNodeId === node.id ? 'animate-spin' : ''}`} />
                      <span>{executingNodeId === node.id ? 'Executing...' : 'Execute Task'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Indian Map Location & Office Inspector Modal */}
      {selectedMapLoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-slate-900 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden text-slate-900 font-sans">
            {/* Modal Header */}
            <div className="bg-[#002b49] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#B8935B]/20 border border-[#B8935B]/40 flex items-center justify-center text-[#B8935B]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white">{selectedMapLoc.authority}</h3>
                  <p className="text-xs text-blue-200 font-mono">{selectedMapLoc.city}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMapLoc(null)}
                className="text-slate-300 hover:text-white transition p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Visual Map Card Canvas */}
            <div className="relative h-52 bg-slate-900 overflow-hidden flex items-center justify-center text-white">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 text-center space-y-2 p-4">
                <div className="inline-flex items-center gap-2 bg-[#004c8c] text-white px-4 py-1.5 rounded-full font-mono text-xs font-bold shadow-lg animate-bounce">
                  <MapPin className="w-4 h-4 text-[#B8935B]" />
                  <span>GPS: {selectedMapLoc.coordinates}</span>
                </div>
                <p className="font-serif text-lg font-bold text-white">{selectedMapLoc.location}</p>
                <p className="text-xs text-blue-200 font-mono">REGISTRY DISTRICT: SOUTH MUMBAI DIVISION</p>
              </div>
            </div>

            {/* Office Particulars Body */}
            <div className="p-6 space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 gap-3 font-mono bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Working Hours</span>
                  <span className="font-bold text-slate-800">{selectedMapLoc.hours}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Helpline Contact</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>{selectedMapLoc.phone}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedMapLoc.location)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#004c8c] hover:bg-[#002b49] text-white font-bold rounded-xl transition flex items-center gap-2 font-mono uppercase tracking-wider shadow-xs"
                >
                  <ExternalLink className="w-4 h-4 text-[#B8935B]" />
                  <span>Open in Google Maps</span>
                </a>

                <button
                  onClick={() => setSelectedMapLoc(null)}
                  className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl transition"
                >
                  Close Map
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

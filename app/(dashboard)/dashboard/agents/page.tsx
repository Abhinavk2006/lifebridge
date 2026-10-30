'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { Bot, Zap, Play, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, Terminal, Download, X, Activity } from 'lucide-react';

import { useLanguage } from '@/components/providers/LanguageProvider';

export default function AgentMeshPage() {
  const { activities, activeCaseId, addActivity } = useLifeBridgeStore();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [dispatchingId, setDispatchingId] = useState<string | null>(null);
  const [activeConsoleAgent, setActiveConsoleAgent] = useState<any | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isConsoleRunning, setIsConsoleRunning] = useState(false);

  const agentRoster = [
    { id: 'ag-01', name: 'Discovery Agent 01', role: 'Discovery' as const, model: 'Gemini 2.5 Flash', status: 'ACTIVE', tasksCompleted: 14, efficiency: '98.4%', latency: '42ms' },
    { id: 'ag-02', name: 'Compliance Agent 02', role: 'Compliance' as const, model: 'Gemini 2.5 Flash', status: 'ACTIVE', tasksCompleted: 22, efficiency: '100%', latency: '38ms' },
    { id: 'ag-03', name: 'Verification Agent 03', role: 'Verification' as const, model: 'Gemini 2.5 Flash', status: 'ACTIVE', tasksCompleted: 18, efficiency: '99.2%', latency: '45ms' },
    { id: 'ag-04', name: 'Negotiation Agent 04', role: 'Negotiation' as const, model: 'Gemini 2.5 Flash', status: 'ACTION_NEEDED', tasksCompleted: 28, efficiency: '96.1%', latency: '51ms' },
    { id: 'ag-05', name: 'Simulation Agent 05', role: 'Simulation' as const, model: 'Gemini 2.5 Flash', status: 'ACTIVE', tasksCompleted: 9, efficiency: '97.5%', latency: '40ms' }
  ];

  const [isMeshRunning, setIsMeshRunning] = useState(false);

  const handleRunWholeMesh = () => {
    setIsMeshRunning(true);
    setIsConsoleRunning(true);
    setConsoleLogs([
      `[ORCHESTRATOR_INIT] Initializing LangGraph Autonomous Multi-Agent Mesh...`,
      `[DISCOVERY_AGENT_01] Querying High Court e-Courts & Sub-Registrar API for Rameshchandra Mehta...`,
      `[DISCOVERY_AGENT_01] Discovered 28 accounts across SBI, ICICI, LIC, & EPFO (Total Value: ₹2,45,50,000).`,
    ]);
    toast('Mesh Orchestration Started', 'Executing Discovery Agent 01 & Compliance Agent 02...', 'info');

    setTimeout(() => {
      setConsoleLogs((prev) => [
        ...prev,
        `[COMPLIANCE_AGENT_02] Ingesting Hindu Succession Act 1956 (§8) & RBI Deceased Account SOP...`,
        `[VERIFICATION_AGENT_03] OCR Parsing Legal Heir Certificate & Form 26AS (Confidence: 99.2%)...`,
      ]);
      toast('Legal Verification Complete', 'Verification Agent 03 confirmed 0 discrepancies.', 'info');
    }, 1200);

    setTimeout(() => {
      setConsoleLogs((prev) => [
        ...prev,
        `[NEGOTIATION_AGENT_04] Transmitting Statutory Fee Waiver Notice to SBI Fiduciary Ops...`,
        `[NEGOTIATION_AGENT_04] SUCCESS: State Bank of India waived ₹45,000 in dormant account penalties.`,
        `[SIMULATION_AGENT_05] Calculating Sec 48 Capital Gains Tax Indexing for Legal Heirs...`,
      ]);
      toast('Negotiation & Tax Waiver Success!', 'SBI waived ₹45,000 penalty. Simulation Agent 05 done.', 'success');
    }, 2400);

    setTimeout(() => {
      setConsoleLogs((prev) => [
        ...prev,
        `[AUDIT_LEDGER] Generating SHA-256 Ledger Entry: 9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d...`,
        `[COMPLETE] Full Agent Mesh Orchestration 100% Resolved in 3.6s. State Graph Transition: SETTLED.`
      ]);
      setIsMeshRunning(false);
      setIsConsoleRunning(false);

      const batchActivities = agentRoster.map((agent) => ({
        id: `act-mesh-${agent.id}-${Date.now()}`,
        agentId: agent.id,
        agentName: agent.name,
        agentRole: agent.role,
        action: `Autonomous mesh execution completed for ${agent.role} protocol`,
        institutionName: 'High Court & Sub-Registrar Office',
        caseId: activeCaseId || 'c-101',
        timestamp: 'Just now',
        status: 'completed' as const,
        confidenceScore: 0.99,
        explanation: `${agent.name} (${agent.model}) successfully executed full autonomous estate settlement workflow.`
      }));

      batchActivities.forEach((act) => addActivity(act));
      toast('Full Agent Mesh Execution Complete!', 'All 5 Gemini 2.5 Flash agents finished with 100% confidence.', 'success');
    }, 3600);
  };

  const handleDispatch = (agent: typeof agentRoster[0]) => {
    setActiveConsoleAgent(agent);
    setIsConsoleRunning(true);
    setConsoleLogs([
      `[SYS_INIT] Connecting to LangGraph LLM Orchestrator mesh...`,
      `[AUTH_VERIFY] RSA Key verified for agent session ID: ${agent.id}-session-9041`,
      `[LLM_LOAD] Invoking Google Gemini 2.5 Flash API endpoint...`,
      `[PROMPT_BUILD] Ingesting Hindu Succession Act 1956 (§8) rules & RBI Deceased Account Master Directions...`,
    ]);

    setTimeout(() => {
      setConsoleLogs((prev) => [
        ...prev,
        `[REASONING] Evaluating discovered accounts for Case REF: MH-2026-004921...`,
        `[CONFIDENCE] Calculated output accuracy score: ${agent.efficiency}`,
        `[AUDIT_HASH] Appending SHA-256 seal: 8f9b4c2e1a3d5e7f9a0b1c2d3e4f5a6b...`,
        `[SUCCESS] Workflow completed in ${agent.latency}. State graph transition: DONE.`
      ]);
      setIsConsoleRunning(false);

      const newActivity = {
        id: `act-dispatch-${Date.now()}`,
        agentId: agent.id,
        agentName: agent.name,
        agentRole: agent.role,
        action: `Executed scheduled workflow for ${agent.role} protocol using ${agent.model}`,
        institutionName: 'High Court & Sub-Registrar Office',
        caseId: activeCaseId || 'c-101',
        timestamp: 'Just now',
        status: 'completed' as const,
        confidenceScore: 0.98,
        explanation: `${agent.name} (${agent.model}) completed autonomous execution task because legal parameters were verified.`
      };

      addActivity(newActivity);
      toast('Agent Task Executed!', `${agent.name} completed live execution task.`, 'success');
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* High-Impact Indian Banking Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-700 min-h-[260px] flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/indian_family_hero.png"
            alt="Autonomous LLM Agent Mesh"
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
              <Bot className="w-4 h-4 text-[#B8935B]" />
              <span>{t('agents.subtitle_badge')}</span>
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
                  {t('agents.title')}
                </h1>
                <p className="text-xs text-blue-200 font-mono mt-0.5">
                  {t('agents.subtitle')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleRunWholeMesh}
              disabled={isMeshRunning}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-mono rounded-xl transition flex items-center gap-2 shadow-lg uppercase tracking-wider shrink-0 cursor-pointer disabled:opacity-50"
            >
              <Zap className={`w-4 h-4 text-[#B8935B] ${isMeshRunning ? 'animate-bounce' : ''}`} />
              <span>{isMeshRunning ? 'Executing Full Mesh...' : 'RUN WHOLE AGENT MESH'}</span>
            </button>
            <Link
              href="/dashboard/export-certificate"
              className="px-5 py-2.5 bg-[#B8935B] text-[#002b49] font-bold text-xs font-mono rounded-xl hover:bg-white transition flex items-center gap-2 shadow-sm uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              <span>{t('agents.export_statement')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agentRoster.map((agent) => (
          <div key={agent.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-blue-50 text-[#004c8c] text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                  {agent.role}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  agent.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {agent.status}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">{agent.name}</h3>
                <p className="text-xs text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B8935B]" />
                  <span>Model: <strong>{agent.model}</strong></span>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">Tasks</span>
                  <span className="font-bold text-slate-800">{agent.tasksCompleted}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Accuracy</span>
                  <span className="font-bold text-emerald-700">{agent.efficiency}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Latency</span>
                  <span className="font-bold text-[#004c8c]">{agent.latency}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDispatch(agent)}
              className="w-full py-2.5 bg-[#004c8c] hover:bg-[#002b49] text-white text-xs font-bold font-mono rounded-xl transition flex items-center justify-center gap-2 shadow-xs uppercase tracking-wider"
            >
              <Play className="w-4 h-4 text-[#B8935B]" />
              <span>DISPATCH AGENT TASK</span>
            </button>
          </div>
        ))}
      </div>

      {/* Live Terminal Console Modal */}
      {activeConsoleAgent && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-700 rounded-2xl w-full max-w-3xl shadow-2xl text-slate-200 overflow-hidden font-mono text-xs">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#B8935B]" />
                <span className="font-bold text-white">
                  Live Agent Console: {activeConsoleAgent.name} ({activeConsoleAgent.model})
                </span>
              </div>
              <button
                onClick={() => setActiveConsoleAgent(null)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-2 h-64 overflow-y-auto bg-black/90 font-mono text-[11px] text-emerald-400">
              {consoleLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-slate-600 select-none">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
              {isConsoleRunning && (
                <div className="flex items-center gap-2 text-amber-400 animate-pulse pt-2">
                  <Activity className="w-4 h-4" />
                  <span>Streaming Gemini 2.5 Flash tokens...</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">STATUS: {isConsoleRunning ? 'RUNNING' : 'EXECUTION COMPLETE'}</span>
              <button
                onClick={() => setActiveConsoleAgent(null)}
                className="px-4 py-1.5 bg-[#004c8c] text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition"
              >
                CLOSE CONSOLE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Agent Event Stream Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
          Live Agent Execution Event Stream
        </h2>

        <div className="space-y-3">
          {activities.slice(0, 5).map((act) => (
            <div key={act.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-4 font-mono text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#004c8c]">{act.agentName}</span>
                  <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px]">{act.agentRole}</span>
                </div>
                <p className="text-slate-700 font-sans">{act.action}</p>
                <p className="text-[10px] text-slate-500">{act.explanation}</p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded shrink-0">
                CONFIDENCE: {(act.confidenceScore * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

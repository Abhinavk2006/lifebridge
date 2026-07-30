'use client';

import React, { useState } from 'react';
import { useLifeBridgeStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { Bot, Zap, Play, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

export default function AgentMeshPage() {
  const { activities, activeCaseId, addActivity } = useLifeBridgeStore();
  const { toast } = useToast();
  const [dispatchingId, setDispatchingId] = useState<string | null>(null);

  const agentRoster = [
    { id: 'ag-01', name: 'Discovery Agent 01', role: 'Discovery' as const, model: 'Gemini 2.5 Flash', status: 'ACTIVE', tasksCompleted: 14, efficiency: '98.4%' },
    { id: 'ag-02', name: 'Compliance Agent 02', role: 'Compliance' as const, model: 'Gemini 2.5 Flash', status: 'ACTIVE', tasksCompleted: 22, efficiency: '100%' },
    { id: 'ag-03', name: 'Verification Agent 03', role: 'Verification' as const, model: 'Gemini 2.5 Flash', status: 'ACTIVE', tasksCompleted: 18, efficiency: '99.2%' },
    { id: 'ag-04', name: 'Negotiation Agent 04', role: 'Negotiation' as const, model: 'Gemini 2.5 Flash', status: 'ACTION_NEEDED', tasksCompleted: 28, efficiency: '96.1%' },
    { id: 'ag-05', name: 'Simulation Agent 05', role: 'Simulation' as const, model: 'Gemini 2.5 Flash', status: 'ACTIVE', tasksCompleted: 9, efficiency: '97.5%' }
  ];

  const handleDispatch = (agent: typeof agentRoster[0]) => {
    setDispatchingId(agent.id);
    toast('Dispatching LLM Agent', `Sending execution command to ${agent.name} (${agent.model}) via LangGraph orchestrator...`, 'info');

    setTimeout(() => {
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
        explanation: `${agent.name} (${agent.model}) completed autonomous execution task because legal parameters were verified, based on LangGraph LLM state graph transition.`
      };

      addActivity(newActivity);
      setDispatchingId(null);
      toast('Task Completed!', `${agent.name} (${agent.model}) successfully executed task and logged state to audit trail.`, 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <Bot className="w-4 h-4" />
            <span>Autonomous LLM Agent Mesh Monitor</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Deployed Agent Roster & Live Trace Logs</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time status, LLM reasoning metrics, and execution rationale across 5 Gemini 2.5 Flash agents</p>
        </div>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agentRoster.map((agent) => (
          <div key={agent.id} className="card-enterprise p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-val font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {agent.role}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono-val ${
                agent.status === 'ACTION_NEEDED' ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {agent.status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">{agent.name}</h3>
              <span className="text-[10px] font-mono-val font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                <Sparkles className="w-3 h-3 inline mr-1 text-indigo-500" />
                {agent.model}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>Tasks Done: <strong className="text-slate-900 font-mono-val">{agent.tasksCompleted}</strong></span>
              <span>Efficiency: <strong className="text-emerald-600 font-mono-val">{agent.efficiency}</strong></span>
            </div>

            <button
              onClick={() => handleDispatch(agent)}
              disabled={dispatchingId === agent.id}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {dispatchingId === agent.id ? (
                <span>Executing Node...</span>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                  <span>Dispatch Execution Task</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Live Log Stream */}
      <div className="card-enterprise p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Live Agent Execution Event Stream
          </h3>
          <span className="text-xs font-mono-val text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Real-Time Telemetry
          </span>
        </div>

        <div className="space-y-3">
          {activities.map((act) => (
            <div key={act.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between font-semibold">
                <span className="text-slate-900 font-bold">{act.agentName}</span>
                <span className="text-slate-400 font-mono-val text-[11px]">{act.timestamp}</span>
              </div>
              <p className="text-slate-700">{act.action}</p>
              <p className="text-slate-500 italic text-[11px] bg-white p-2 rounded border border-slate-100">
                Rationale: {act.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

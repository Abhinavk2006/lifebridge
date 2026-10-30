'use client';

import React, { useEffect, useState } from 'react';
import { useLifeBridgeStore } from '@/lib/store';
import { AgentActivity } from '@/lib/types';
import { Bot, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AgentTicker: React.FC = () => {
  const { activities, addActivity, setWsConnected, isWsConnected } = useLifeBridgeStore();
  const [items, setItems] = useState<AgentActivity[]>(activities);

  useEffect(() => {
    setItems(activities);
  }, [activities]);

  // WebSocket connection with automatic simulation fallback
  useEffect(() => {
    let ws: WebSocket | null = null;
    let fallbackInterval: NodeJS.Timeout | null = null;

    try {
      const defaultApi = process.env.NEXT_PUBLIC_API_URL;
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 
        (defaultApi ? defaultApi.replace(/^http/, 'ws') + '/ws/agent-ticker' : 'ws://localhost:8000/ws/agent-ticker');
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setWsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as AgentActivity;
          addActivity(data);
        } catch (e) {
          console.error('WS Parse error:', e);
        }
      };

      ws.onerror = () => {
        setWsConnected(false);
      };

      ws.onclose = () => {
        setWsConnected(false);
      };
    } catch (err) {
      setWsConnected(false);
    }

    // Fallback simulation loop so ticker is always dynamically alive during demos
    const dynamicEvents: Omit<AgentActivity, 'id' | 'timestamp'>[] = [
      {
        agentId: 'ag-03',
        agentName: 'Verification Agent 03',
        agentRole: 'Verification',
        action: 'Scanning letters of administration notary seal against state court database',
        institutionName: 'Cook County Probate Division',
        caseId: 'c-104',
        status: 'running',
        confidenceScore: 0.99,
        explanation: 'Seal analysis matches state database record #9012.'
      },
      {
        agentId: 'ag-04',
        agentName: 'Negotiation Agent 04',
        agentRole: 'Negotiation',
        action: 'Drafting statutory fee waiver demand for account #****-4912',
        institutionName: 'JPMorgan Chase Bank',
        caseId: 'c-101',
        status: 'running',
        confidenceScore: 0.96,
        explanation: 'Applying NY Surrogate Court Fiduciary Rule Section 2110.'
      },
      {
        agentId: 'ag-01',
        agentName: 'Discovery Agent 01',
        agentRole: 'Discovery',
        action: 'Cross-referencing 1099 tax schedules against Vanguard index holdings',
        institutionName: 'Vanguard Group',
        caseId: 'c-103',
        status: 'completed',
        confidenceScore: 0.98,
        explanation: 'Identified additional $142,000 index fund dividend trajectory.'
      },
      {
        agentId: 'ag-02',
        agentName: 'Compliance Agent 02',
        agentRole: 'Compliance',
        action: 'Flagging mandatory statutory creditor 60-day notice milestone completion',
        institutionName: 'NY County Probate Registry',
        caseId: 'c-101',
        status: 'completed',
        confidenceScore: 1.0,
        explanation: 'Zero outstanding creditor claims logged within statutory window.'
      }
    ];

    let eventIdx = 0;
    fallbackInterval = setInterval(() => {
      const template = dynamicEvents[eventIdx % dynamicEvents.length];
      const newActivity: AgentActivity = {
        ...template,
        id: `act-live-${Date.now()}`,
        timestamp: 'Just now'
      };
      addActivity(newActivity);
      eventIdx++;
    }, 25000);

    return () => {
      if (ws) ws.close();
      if (fallbackInterval) clearInterval(fallbackInterval);
    };
  }, [addActivity, setWsConnected]);

  // Duplicate items for infinite marquee loop
  const displayItems = [...items, ...items];

  return (
    <div className="w-full bg-[#090D16] text-slate-100 border-b border-slate-800 text-xs py-2.5 overflow-hidden select-none relative shadow-inner print:hidden">
      <div className="max-w-[1280px] mx-auto px-4 flex items-center gap-3">
        {/* Left Fixed Badge */}
        <div className="shrink-0 flex items-center gap-1.5 bg-blue-950/80 text-blue-300 border border-blue-800/60 px-2.5 py-1 rounded-full font-medium tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Bot className="w-3.5 h-3.5 text-blue-400" />
          <span className="uppercase text-[10px] font-semibold tracking-wider">Live Agent Mesh</span>
        </div>

        {/* Marquee Wrapper */}
        <div className="grow overflow-hidden relative">
          <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
            {displayItems.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex items-center gap-2 group cursor-pointer">
                {item.status === 'running' && (
                  <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                )}
                {item.status === 'completed' && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                )}
                {item.status === 'action_needed' && (
                  <AlertTriangle className="w-3.5 h-3.5 text-coral-400 text-rose-400 shrink-0" />
                )}
                {item.status === 'escalated' && (
                  <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                )}

                <span className="font-semibold text-slate-200 group-hover:text-blue-300 transition-colors">
                  {item.agentName}
                </span>
                <span className="text-slate-400">—</span>
                <span className="text-slate-300">{item.action}</span>
                {item.institutionName && (
                  <span className="bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded text-[11px] font-mono-val border border-slate-700">
                    [{item.institutionName}]
                  </span>
                )}
                <span className="text-slate-500 text-[10px] font-mono-val">{item.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Status Badge */}
        <div className="shrink-0 text-[11px] font-mono-val text-slate-400 border-l border-slate-800 pl-3 hidden md:flex items-center gap-2">
          <span className="text-emerald-400 font-semibold">{isWsConnected ? 'WS ACTIVE' : 'MESH ONLINE'}</span>
        </div>
      </div>
    </div>
  );
};

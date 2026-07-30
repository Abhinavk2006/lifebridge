import React from 'react';
import { MarketingHeader } from '@/components/ui/MarketingHeader';
import { AgentTicker } from '@/components/feature/AgentTicker';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      <MarketingHeader />
      <AgentTicker />
      <main className="flex-1">{children}</main>
      
      {/* Enterprise Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
              <span>LIFEBRIDGE</span>
              <span className="bg-blue-600 text-white text-[10px] font-mono-val px-1.5 py-0.5 rounded">AI</span>
            </div>
            <p className="mt-2 text-slate-400">
              Autonomous enterprise platform for estate settlement, asset discovery, and multi-institutional legal resolution.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-slate-200 uppercase text-[11px] tracking-wider mb-3">Platform Pillars</h5>
            <ul className="space-y-2">
              <li>Multi-Bank Account Discovery</li>
              <li>Forensic Document Verification</li>
              <li>AI Agent Institution Negotiation</li>
              <li>Cryptographic Audit Trails</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-slate-200 uppercase text-[11px] tracking-wider mb-3">Legal & Security</h5>
            <ul className="space-y-2">
              <li>SOC2 Type II Certified</li>
              <li>State Probate Statute Compliance</li>
              <li>Fiduciary Responsibility Guardrails</li>
              <li>End-to-End Encryption</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-slate-200 uppercase text-[11px] tracking-wider mb-3">Hackathon Demo</h5>
            <p className="text-slate-400 mb-3">Built for high-stakes enterprise demonstration with live WebSocket agent feeds.</p>
            <span className="text-emerald-400 font-mono-val font-semibold">Ready for Final Evaluation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

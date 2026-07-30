'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, CheckCircle2, Clock, Calendar } from 'lucide-react';

export default function LawPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Succession Law & Statutory Timeline Directory</h1>
          <p className="text-xs text-slate-500 mt-1">Indian statutory windows, legal heir publication deadlines, and RBI/IRDAI claims regulations</p>
        </div>
      </div>

      <div className="card-enterprise p-6 space-y-4">
        <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Indian Succession Law Milestones (Hindu Succession Act, 1956 & High Court Regulations)
        </h3>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-900">Public Notice to Creditors & Heirs Publication Period (60 Days)</p>
                <p className="text-slate-600 mt-0.5">Published in State Government Gazette & Leading Daily Newspaper per High Court order.</p>
              </div>
            </div>
            <span className="bg-emerald-600 text-white font-mono-val font-bold px-3 py-1 rounded">COMPLETED</span>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-900">Legal Representative Income Tax Clearance (ITD e-Filing)</p>
                <p className="text-slate-600 mt-0.5">Filing required under Income Tax Act Sec 159 for deceased assessment year.</p>
              </div>
            </div>
            <span className="bg-blue-600 text-white font-mono-val font-bold px-3 py-1 rounded">ON TRACK</span>
          </div>
        </div>
      </div>
    </div>
  );
}

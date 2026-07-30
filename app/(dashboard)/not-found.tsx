'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function DashboardNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-lg">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-[10px] font-mono-val font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
          404 — Route Uncharted
        </span>
        <h1 className="font-serif text-3xl font-bold text-slate-900">Dashboard Page Not Found</h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          The requested fiduciary module or estate case pathway is not indexed in your active workspace.
        </p>
      </div>

      <Link
        href="/dashboard"
        className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-md transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4 text-blue-400" /> Back to Mission Control
      </Link>
    </div>
  );
}


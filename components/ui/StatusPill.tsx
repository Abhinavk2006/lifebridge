// StatusPill.tsx — Standardized status badge primitive with colored pill and text label.
import React from 'react';
import { StatusPillProps } from '@/types';

export const StatusPill: React.FC<StatusPillProps> = ({ status, label, size = 'md', pulse = false }) => {
  const getStyles = () => {
    switch (status) {
      case 'done':
      case 'completed':
      case 'settled':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending':
      case 'in_progress':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'action_needed':
      case 'action_required':
      case 'disputed':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-mono-val font-bold ${getStyles()}`}>
      {pulse && <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />}
      <span>{label || status.toUpperCase().replace('_', ' ')}</span>
    </span>
  );
};

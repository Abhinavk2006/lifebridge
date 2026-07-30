// index.ts — Primary type re-export index for LifeBridge AI.
export * from '@/lib/types';

export interface StatusPillProps {
  status: 'done' | 'completed' | 'pending' | 'in_progress' | 'action_needed' | 'action_required' | 'settled' | 'disputed';
  label?: string;
  size?: 'sm' | 'md';
  pulse?: boolean;
}

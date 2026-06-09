'use client';

import { useTransition } from 'react';
import { toggleTaskAction } from '../clients/actions';

export function TaskToggle({ taskId, completed }: { taskId: string; completed: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => toggleTaskAction(taskId))}
      disabled={isPending}
      className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors duration-150"
      style={{
        borderColor: completed ? 'var(--color-success)' : 'var(--color-border)',
        backgroundColor: completed ? 'var(--color-success)' : 'white',
      }}
      aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
    >
      {completed && <span className="text-white text-xs">✓</span>}
    </button>
  );
}

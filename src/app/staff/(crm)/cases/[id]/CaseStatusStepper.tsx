'use client';

import { useTransition } from 'react';
import { updateCaseStatusAction } from '../actions';
import type { CaseStatus } from '@/lib/crm/types';

const steps: { value: CaseStatus; label: string }[] = [
  { value: 'assessment', label: 'Assessment' },
  { value: 'documents', label: 'Documents' },
  { value: 'lodged', label: 'Lodged' },
  { value: 'decision', label: 'Decision' },
  { value: 'granted', label: 'Granted' },
];

interface Props {
  caseId: string;
  currentStatus: CaseStatus;
  canEdit: boolean;
}

export function CaseStatusStepper({ caseId, currentStatus, canEdit }: Props) {
  const [isPending, startTransition] = useTransition();

  const currentIdx = steps.findIndex((s) => s.value === currentStatus);

  const advance = () => {
    if (!canEdit || currentIdx >= steps.length - 1) return;
    const next = steps[currentIdx + 1].value;
    startTransition(() => updateCaseStatusAction(caseId, next));
  };

  if (currentStatus === 'refused') {
    return (
      <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'rgba(192,57,43,0.08)', border: '1px solid var(--color-error)' }}>
        <p className="text-sm font-semibold" style={{ color: 'var(--color-error)' }}>Case Refused</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-0 overflow-x-auto">
        {steps.map((step, idx) => {
          const isDone = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          return (
            <div key={step.value} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center flex-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    backgroundColor: isDone ? 'var(--color-success)' : isCurrent ? 'var(--color-accent)' : 'var(--color-slate-100)',
                    color: isDone || isCurrent ? 'white' : 'var(--color-slate-600)',
                  }}
                >
                  {isDone ? '✓' : idx + 1}
                </div>
                <p className="text-xs mt-1 text-center" style={{ color: isCurrent ? 'var(--color-slate-900)' : 'var(--color-slate-600)', opacity: isCurrent ? 1 : 0.5, fontWeight: isCurrent ? 600 : 400 }}>
                  {step.label}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className="h-0.5 flex-1 mx-1"
                  style={{ backgroundColor: isDone ? 'var(--color-success)' : 'var(--color-border)' }}
                />
              )}
            </div>
          );
        })}
      </div>
      {canEdit && currentIdx < steps.length - 1 && (
        <button
          onClick={advance}
          disabled={isPending}
          className="mt-4 px-4 py-2 rounded-md text-sm font-medium border-2 transition-colors duration-150 disabled:opacity-70"
          style={{ borderColor: 'var(--color-accent)', color: 'var(--color-slate-900)' }}
        >
          {isPending ? 'Updating…' : `Advance to ${steps[currentIdx + 1]?.label} →`}
        </button>
      )}
    </div>
  );
}

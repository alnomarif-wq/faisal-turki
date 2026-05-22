'use client';

import { Check } from 'lucide-react';
import { clsx } from 'clsx';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0 w-full max-w-xl mx-auto">
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        const isFuture = stepNum > currentStep;

        return (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2',
                  isDone
                    ? 'bg-gold-500 border-gold-500 text-dark-900'
                    : isActive
                    ? 'bg-gold-500/10 border-gold-500 text-gold-400'
                    : 'bg-dark-800 border-dark-600 text-dark-400'
                )}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : stepNum}
              </div>
              <span
                className={clsx(
                  'text-xs font-medium hidden sm:block text-center whitespace-nowrap',
                  isActive ? 'text-gold-400' : isDone ? 'text-dark-200' : 'text-dark-500'
                )}
              >
                {step}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-1 mb-5 sm:mb-5 rounded-full overflow-hidden bg-dark-700">
                <div
                  className="h-full bg-gold-500 transition-all duration-500"
                  style={{ width: isDone ? '100%' : '0%' }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

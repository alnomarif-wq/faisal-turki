import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  unit?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, unit, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-white/70">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full rounded-xl border bg-dark-800/50 text-white placeholder-white/20',
              'focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50',
              'transition-all duration-200',
              error ? 'border-accent-red/50' : 'border-white/10',
              icon ? 'pl-10' : 'pl-4',
              unit ? 'pr-16' : 'pr-4',
              'py-3 text-sm',
              className
            )}
            {...props}
          />
          {unit && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/40 font-medium">
              {unit}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-accent-red">{error}</p>}
        {hint && !error && <p className="text-xs text-white/40">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export { Input };

import { SelectHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-white/70">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={clsx(
              'w-full rounded-xl border bg-dark-800/50 text-white appearance-none cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50',
              'transition-all duration-200 px-4 py-3 pr-10 text-sm',
              error ? 'border-accent-red/50' : 'border-white/10',
              className
            )}
            {...props}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-dark-800">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
        </div>
        {error && <p className="text-xs text-accent-red">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export { Select };

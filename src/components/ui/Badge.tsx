import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'green' | 'blue' | 'red' | 'purple' | 'gray';
  size?: 'sm' | 'md';
}

export function Badge({ variant = 'gold', size = 'sm', className, children, ...props }: BadgeProps) {
  const variants = {
    gold: 'bg-gold-500/15 text-gold-400 border-gold-500/30',
    green: 'bg-accent-green/15 text-accent-green border-accent-green/30',
    blue: 'bg-accent-blue/15 text-accent-blue border-accent-blue/30',
    red: 'bg-accent-red/15 text-accent-red border-accent-red/30',
    purple: 'bg-accent-purple/15 text-accent-purple border-accent-purple/30',
    gray: 'bg-white/5 text-white/50 border-white/10',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, icon, leftIcon, rightIcon, iconPosition = 'left', fullWidth, className, children, disabled, ...props }, ref) => {
    const resolvedLeft = leftIcon ?? (iconPosition === 'left' ? icon : undefined);
    const resolvedRight = rightIcon ?? (iconPosition === 'right' ? icon : undefined);
    const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 select-none';

    const variants = {
      primary: 'bg-gradient-to-r from-gold-500 to-gold-600 text-black hover:from-gold-400 hover:to-gold-500 focus:ring-gold-500 shadow-gold hover:shadow-gold-lg active:scale-[0.98]',
      secondary: 'bg-dark-700 text-white border border-dark-500 hover:bg-dark-600 hover:border-dark-400 focus:ring-dark-500',
      ghost: 'text-white/70 hover:text-white hover:bg-white/5 focus:ring-white/20',
      danger: 'bg-accent-red/10 text-accent-red border border-accent-red/20 hover:bg-accent-red/20 focus:ring-accent-red',
      outline: 'border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/60 focus:ring-gold-500',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          base,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          (disabled || loading) && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : resolvedLeft}
        {children}
        {!loading && resolvedRight}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };

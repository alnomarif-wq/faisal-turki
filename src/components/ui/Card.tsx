import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ glow, hover, padding = 'md', className, children, ...props }, ref) => {
    const paddings = { none: '', sm: 'p-4', md: 'p-5', lg: 'p-6' };

    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-2xl border border-white/5 bg-gradient-to-br from-dark-700 to-dark-800',
          paddings[padding],
          glow && 'shadow-gold border-gold-500/20',
          hover && 'transition-all duration-200 hover:border-gold-500/20 hover:shadow-gold cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
const CardHeader = ({ className, children, ...props }: CardHeaderProps) => (
  <div className={clsx('mb-4', className)} {...props}>{children}</div>
);

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
const CardTitle = ({ className, children, ...props }: CardTitleProps) => (
  <h3 className={clsx('text-lg font-semibold text-white', className)} {...props}>{children}</h3>
);

export { Card, CardHeader, CardTitle };

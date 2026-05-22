'use client';

import { clsx } from 'clsx';

interface StatsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon: React.ReactNode;
  iconColor?: string;
  trend?: { value: number; label: string };
  className?: string;
}

export function StatsCard({
  title,
  value,
  unit,
  subtitle,
  icon,
  iconColor = 'text-gold-400',
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={clsx(
        'p-5 rounded-2xl border border-white/5 bg-gradient-to-br from-dark-700 to-dark-800',
        'hover:border-gold-500/15 transition-all duration-200',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-dark-300 font-medium">{title}</p>
        <div className={clsx('p-2 rounded-xl bg-dark-600/60', iconColor)}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-white">{value}</span>
        {unit && <span className="text-sm text-dark-400 font-medium">{unit}</span>}
      </div>
      {subtitle && (
        <p className="text-xs text-dark-400 mt-1">{subtitle}</p>
      )}
      {trend && (
        <div
          className={clsx(
            'inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-xs font-medium',
            trend.value >= 0
              ? 'bg-green-500/10 text-green-400'
              : 'bg-red-500/10 text-red-400'
          )}
        >
          <span>{trend.value >= 0 ? '↑' : '↓'}</span>
          <span>{Math.abs(trend.value)}% {trend.label}</span>
        </div>
      )}
    </div>
  );
}

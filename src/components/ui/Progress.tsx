'use client';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'gold' | 'green' | 'blue' | 'red' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  color = 'gold',
  size = 'md',
  showLabel,
  label,
  className = '',
  animated = true,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  const colors = {
    gold: 'bg-gradient-to-r from-gold-500 to-gold-400',
    green: 'bg-gradient-to-r from-accent-green to-emerald-400',
    blue: 'bg-gradient-to-r from-accent-blue to-blue-400',
    red: 'bg-gradient-to-r from-accent-red to-red-400',
    purple: 'bg-gradient-to-r from-accent-purple to-violet-400',
  };

  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

  return (
    <div className={className}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-white/50">{label}</span>}
          {showLabel && <span className="text-xs font-medium text-white/70">{pct}%</span>}
        </div>
      )}
      <div className={`w-full bg-dark-600 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} rounded-full ${colors[color]} ${animated ? 'transition-all duration-700 ease-out' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

interface MacroRingProps {
  protein: number;
  carbs: number;
  fats: number;
  size?: number;
}

export function MacroRing({ protein, carbs, fats, size = 120 }: MacroRingProps) {
  const total = protein * 4 + carbs * 4 + fats * 9;
  const proteinPct = total > 0 ? (protein * 4) / total : 0.33;
  const carbsPct = total > 0 ? (carbs * 4) / total : 0.34;
  const fatsPct = total > 0 ? (fats * 9) / total : 0.33;

  const r = 45;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * r;
  const gap = 3;

  const proteinDash = circumference * proteinPct - gap;
  const carbsDash = circumference * carbsPct - gap;
  const fatsDash = circumference * fatsPct - gap;

  const proteinOffset = 0;
  const carbsOffset = -(circumference * proteinPct);
  const fatsOffset = -(circumference * (proteinPct + carbsPct));

  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a1a2e" strokeWidth="12" />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="#F59E0B" strokeWidth="12"
        strokeDasharray={`${proteinDash} ${circumference - proteinDash}`}
        strokeDashoffset={proteinOffset}
        transform={`rotate(-90 ${cx} ${cy})`}
        strokeLinecap="round"
      />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="#3B82F6" strokeWidth="12"
        strokeDasharray={`${carbsDash} ${circumference - carbsDash}`}
        strokeDashoffset={carbsOffset}
        transform={`rotate(-90 ${cx} ${cy})`}
        strokeLinecap="round"
      />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="#10B981" strokeWidth="12"
        strokeDasharray={`${fatsDash} ${circumference - fatsDash}`}
        strokeDashoffset={fatsOffset}
        transform={`rotate(-90 ${cx} ${cy})`}
        strokeLinecap="round"
      />
      <text x={cx} y={cy - 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="700">
        {Math.round(protein * 4 + carbs * 4 + fats * 9)}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#9494ab" fontSize="8">
        kcal
      </text>
    </svg>
  );
}

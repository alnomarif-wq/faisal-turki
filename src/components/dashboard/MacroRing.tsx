'use client';

interface MacroRingProps {
  protein: number;
  carbs: number;
  fats: number;
  goalCalories: number;
  size?: number;
}

interface MacroBarProps {
  label: string;
  value: number;
  target: number;
  color: string;
  unit?: string;
}

function MacroBar({ label, value, target, color, unit = 'g' }: MacroBarProps) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-dark-300 font-medium">{label}</span>
        <span className="text-white font-bold">
          {value}{unit} <span className="text-dark-400 font-normal">/ {target}{unit}</span>
        </span>
      </div>
      <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function MacroRingChart({ protein, carbs, fats, goalCalories, size = 140 }: MacroRingProps) {
  const totalCalFromMacros = protein * 4 + carbs * 4 + fats * 9;
  const total = totalCalFromMacros || 1;

  const proteinPct = (protein * 4) / total;
  const carbsPct = (carbs * 4) / total;
  const fatsPct = (fats * 9) / total;

  const r = 52;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * r;
  const gap = 4;

  const proteinDash = Math.max(0, circumference * proteinPct - gap);
  const carbsDash = Math.max(0, circumference * carbsPct - gap);
  const fatsDash = Math.max(0, circumference * fatsPct - gap);

  const carbsOffset = -(circumference * proteinPct);
  const fatsOffset = -(circumference * (proteinPct + carbsPct));

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* SVG Ring */}
      <div className="relative flex-shrink-0">
        <svg width={size} height={size} viewBox="0 0 120 120">
          {/* Track */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a1a2e" strokeWidth="14" />

          {/* Protein (Gold) */}
          <circle
            cx={cx} cy={cy} r={r} fill="none"
            stroke="#F59E0B"
            strokeWidth="14"
            strokeDasharray={`${proteinDash} ${circumference - proteinDash}`}
            strokeDashoffset={0}
            transform={`rotate(-90 ${cx} ${cy})`}
            strokeLinecap="round"
          />

          {/* Carbs (Blue) */}
          <circle
            cx={cx} cy={cy} r={r} fill="none"
            stroke="#3B82F6"
            strokeWidth="14"
            strokeDasharray={`${carbsDash} ${circumference - carbsDash}`}
            strokeDashoffset={carbsOffset}
            transform={`rotate(-90 ${cx} ${cy})`}
            strokeLinecap="round"
          />

          {/* Fats (Green) */}
          <circle
            cx={cx} cy={cy} r={r} fill="none"
            stroke="#10B981"
            strokeWidth="14"
            strokeDasharray={`${fatsDash} ${circumference - fatsDash}`}
            strokeDashoffset={fatsOffset}
            transform={`rotate(-90 ${cx} ${cy})`}
            strokeLinecap="round"
          />

          {/* Center text */}
          <text x={cx} y={cy - 5} textAnchor="middle" fill="white" fontSize="13" fontWeight="800">
            {goalCalories}
          </text>
          <text x={cx} y={cy + 9} textAnchor="middle" fill="#9494ab" fontSize="9">
            kcal/day
          </text>
        </svg>
      </div>

      {/* Legend & Bars */}
      <div className="flex-1 w-full space-y-3">
        <div className="flex items-center gap-3 flex-wrap text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-400 flex-shrink-0" />
            <span className="text-dark-300">Protein ({Math.round(proteinPct * 100)}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 flex-shrink-0" />
            <span className="text-dark-300">Carbs ({Math.round(carbsPct * 100)}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0" />
            <span className="text-dark-300">Fats ({Math.round(fatsPct * 100)}%)</span>
          </div>
        </div>

        <MacroBar label="Protein" value={protein} target={protein} color="bg-gold-500" />
        <MacroBar label="Carbohydrates" value={carbs} target={carbs} color="bg-blue-500" />
        <MacroBar label="Fats" value={fats} target={fats} color="bg-green-500" />
      </div>
    </div>
  );
}

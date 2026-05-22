'use client';

import { useState } from 'react';
import { Meal } from '@/lib/types';
import { ChevronDown, ChevronUp, Clock, Flame, Beef, Wheat, Droplets } from 'lucide-react';
import { ProgressBar } from '@/components/ui/Progress';

interface MealCardProps {
  meal: Meal;
  totalCalories: number;
}

export function MealCard({ meal, totalCalories }: MealCardProps) {
  const [expanded, setExpanded] = useState(false);

  const caloriePct = Math.round((meal.calories / totalCalories) * 100);

  return (
    <div className="rounded-xl border border-white/5 bg-dark-800/40 overflow-hidden">
      <div
        className="p-4 flex items-start gap-4 cursor-pointer hover:bg-white/2 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Time badge */}
        <div className="flex-shrink-0 bg-dark-900/60 rounded-lg px-3 py-2 text-center">
          <Clock className="w-3.5 h-3.5 text-gold-500 mx-auto mb-0.5" />
          <span className="text-xs font-bold text-white">{meal.time}</span>
        </div>

        {/* Meal info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm leading-tight">{meal.name}</h4>
          {meal.nameAr && <p className="text-xs text-white/30 mt-0.5" dir="rtl">{meal.nameAr}</p>}

          <div className="flex items-center flex-wrap gap-3 mt-2">
            <div className="flex items-center gap-1 text-xs">
              <Flame className="w-3 h-3 text-orange-400" />
              <span className="font-bold text-white">{meal.calories}</span>
              <span className="text-white/40">kcal ({caloriePct}%)</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/50">
              <span><span className="text-gold-400 font-bold">P</span> {meal.protein}g</span>
              <span><span className="text-blue-400 font-bold">C</span> {meal.carbs}g</span>
              <span><span className="text-green-400 font-bold">F</span> {meal.fats}g</span>
            </div>
          </div>

          <ProgressBar value={meal.calories} max={totalCalories} color="gold" size="sm" className="mt-2" />
        </div>

        {expanded ? <ChevronUp className="w-4 h-4 text-white/30 flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0 mt-1" />}
      </div>

      {expanded && (
        <div className="border-t border-white/5 p-4 space-y-4">
          {/* Macro detail */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Calories', value: `${meal.calories}`, unit: 'kcal', icon: <Flame className="w-3.5 h-3.5" />, color: 'text-orange-400' },
              { label: 'Protein', value: `${meal.protein}`, unit: 'g', icon: <Beef className="w-3.5 h-3.5" />, color: 'text-gold-400' },
              { label: 'Carbs', value: `${meal.carbs}`, unit: 'g', icon: <Wheat className="w-3.5 h-3.5" />, color: 'text-blue-400' },
              { label: 'Fats', value: `${meal.fats}`, unit: 'g', icon: <Droplets className="w-3.5 h-3.5" />, color: 'text-green-400' },
            ].map(m => (
              <div key={m.label} className="bg-dark-900/50 rounded-lg p-2 text-center">
                <div className={`${m.color} flex items-center justify-center gap-1 mb-1`}>
                  {m.icon}
                </div>
                <div className="text-sm font-bold text-white">{m.value}</div>
                <div className="text-xs text-white/30">{m.unit}</div>
              </div>
            ))}
          </div>

          {/* Ingredients */}
          <div>
            <div className="text-xs font-medium text-white/40 mb-2">Ingredients</div>
            <div className="space-y-2">
              {meal.ingredients.map((ing, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-white">{ing.name}</span>
                    {ing.nameAr && <span className="text-white/30 ml-2" dir="rtl">{ing.nameAr}</span>}
                  </div>
                  <div className="flex items-center gap-3 text-white/50">
                    <span className="font-bold text-white/80">{ing.amount}{ing.unit}</span>
                    <span>{ing.calories} kcal</span>
                    <span className="text-gold-400">{ing.protein}P</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          {meal.instructions.length > 0 && (
            <div>
              <div className="text-xs font-medium text-white/40 mb-2">Preparation</div>
              <ol className="space-y-1.5">
                {meal.instructions.map((step, i) => (
                  <li key={i} className="flex gap-2 text-xs text-white/60">
                    <span className="text-gold-500 font-bold">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import { MealPlan } from '@/lib/types';
import { MealCard } from './MealCard';
import { ShoppingCart, Target } from 'lucide-react';
import { useState } from 'react';
import { MacroRing } from '@/components/ui/Progress';

interface MealPlanViewProps {
  plan: MealPlan;
  goalCalories: number;
}

export function MealPlanView({ plan, goalCalories }: MealPlanViewProps) {
  const [tab, setTab] = useState<'meals' | 'shopping'>('meals');

  const categories = Array.from(new Set(plan.shoppingList.map(item => item.category))).sort();

  return (
    <div className="space-y-5">
      {/* Macro overview */}
      <div className="p-5 rounded-2xl border border-white/5 bg-gradient-to-br from-dark-700 to-dark-800">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <MacroRing
              protein={plan.totalProtein}
              carbs={plan.totalCarbs}
              fats={plan.totalFats}
              size={130}
            />
          </div>
          <div className="flex-1 grid grid-cols-3 gap-4 w-full">
            <div className="text-center">
              <div className="text-2xl font-black text-gold-400">{plan.totalProtein}g</div>
              <div className="text-xs text-dark-400">Protein</div>
              <div className="text-xs text-dark-500">{plan.totalProtein * 4} kcal</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-blue-400">{plan.totalCarbs}g</div>
              <div className="text-xs text-dark-400">Carbs</div>
              <div className="text-xs text-dark-500">{plan.totalCarbs * 4} kcal</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-green-400">{plan.totalFats}g</div>
              <div className="text-xs text-dark-400">Fats</div>
              <div className="text-xs text-dark-500">{plan.totalFats * 9} kcal</div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-dark-700/50">
          <Target className="w-4 h-4 text-gold-400 flex-shrink-0" />
          <span className="text-sm text-dark-200">
            Total: <span className="text-white font-bold">{plan.totalCalories} kcal/day</span>
            <span className="text-dark-400 ml-2">Target: {goalCalories} kcal</span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('meals')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            tab === 'meals'
              ? 'bg-gold-500/10 border border-gold-500/30 text-gold-400'
              : 'text-dark-400 hover:text-white'
          }`}
        >
          Daily Meals
        </button>
        <button
          onClick={() => setTab('shopping')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            tab === 'shopping'
              ? 'bg-gold-500/10 border border-gold-500/30 text-gold-400'
              : 'text-dark-400 hover:text-white'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          Shopping List
        </button>
      </div>

      {/* Meals tab */}
      {tab === 'meals' && (
        <div className="space-y-3">
          {plan.meals.map((meal, i) => (
            <MealCard key={i} meal={meal} totalCalories={plan.totalCalories} />
          ))}
        </div>
      )}

      {/* Shopping list tab */}
      {tab === 'shopping' && (
        <div className="space-y-5">
          {categories.map(category => {
            const items = plan.shoppingList.filter(item => item.category === category);
            return (
              <div key={category}>
                <h3 className="text-xs font-bold text-dark-400 uppercase tracking-wider mb-2">
                  {category}
                </h3>
                <div className="space-y-1.5">
                  {items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-dark-800 border border-white/5"
                    >
                      <div>
                        <span className="text-sm font-medium text-white">{item.name}</span>
                        {item.nameAr && (
                          <span className="text-xs text-dark-400 ml-2">({item.nameAr})</span>
                        )}
                      </div>
                      <span className="text-xs text-gold-400 font-medium bg-gold-500/5 px-2 py-1 rounded-lg">
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

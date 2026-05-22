'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { MealPlanView } from '@/components/nutrition/MealPlan';
import { useStore } from '@/store/useStore';
import { Apple, Droplets, Info } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function NutritionPage() {
  const router = useRouter();
  const { isOnboarded, mealPlan, macroData, calorieData, userProfile } = useStore();

  useEffect(() => {
    if (!isOnboarded) router.replace('/onboarding');
  }, [isOnboarded, router]);

  if (!isOnboarded || !mealPlan || !macroData || !calorieData || !userProfile) return null;

  return (
    <div className="min-h-screen bg-dark-900 page-transition">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <Apple className="w-4 h-4 text-green-400" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">Nutrition Plan</h1>
              </div>
              <p className="text-dark-400">Your personalized 6-meal daily plan</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {userProfile.foodPreferences.map(pref => (
                <Badge key={pref} variant="green">{pref.replace('_', ' ')}</Badge>
              ))}
            </div>
          </div>

          {/* Water target */}
          <div className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/15">
            <Droplets className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blue-300">
                Daily Water Target: {macroData.water}L
              </p>
              <p className="text-xs text-dark-400 mt-0.5">
                Based on your body weight ({userProfile.weight}kg × 35ml/kg). Spread throughout the day.
              </p>
            </div>
          </div>

          {/* Nutrition tip */}
          <div className="mt-3 flex items-start gap-3 p-4 rounded-xl bg-dark-800 border border-white/5">
            <Info className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-dark-300 leading-relaxed">
              <span className="text-gold-400 font-semibold">Tip:</span> Meal timing matters less than hitting your daily totals. 
              If you miss a meal, redistribute the remaining calories into your next meals.
              Prioritize protein at every meal for muscle preservation.
            </p>
          </div>
        </motion.div>

        {/* Meal Plan */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <MealPlanView plan={mealPlan} goalCalories={calorieData.goalCalories} />
        </motion.div>

        {/* Nutrition principles */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-5 rounded-2xl bg-dark-800 border border-white/5"
        >
          <h3 className="font-bold text-white mb-4">Nutrition Principles</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: 'Protein Priority', desc: 'Eat protein first at every meal. It is the most satiating macro.' },
              { title: 'Meal Prep', desc: 'Prepare 2-3 days of meals at a time. Reduces decision fatigue.' },
              { title: 'Track Everything', desc: 'Use MyFitnessPal or similar app to log meals accurately.' },
              { title: 'Avoid Liquid Calories', desc: 'Stick to water, black coffee, and tea as primary beverages.' },
              { title: 'Consistency Over Perfection', desc: '80% adherence over time beats a perfect plan you cannot follow.' },
              { title: 'Pre/Post Workout Nutrition', desc: 'Prioritize carbs pre-workout and protein post-workout for results.' },
            ].map((tip, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-green-500 font-black text-sm mt-0.5 flex-shrink-0">0{i + 1}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{tip.title}</p>
                  <p className="text-xs text-dark-400">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

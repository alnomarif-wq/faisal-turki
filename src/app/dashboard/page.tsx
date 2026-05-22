'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import { ProgressBar, MacroRing } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import {
  Flame, Dumbbell, Droplets, TrendingUp, Brain, ArrowRight,
  Target, Zap, Calendar, CheckCircle, AlertCircle
} from 'lucide-react';
import { getGoalLabel } from '@/lib/calculations';

export default function DashboardPage() {
  const router = useRouter();
  const { isOnboarded, userProfile, calorieData, macroData, workoutPlan, activeDay } = useStore();

  useEffect(() => {
    if (!isOnboarded) router.replace('/onboarding');
  }, [isOnboarded, router]);

  if (!isOnboarded || !userProfile || !calorieData || !macroData || !workoutPlan) {
    return null;
  }

  const today = workoutPlan.days.find(d => d.day === activeDay) || workoutPlan.days[0];
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const goalColor: Record<string, string> = {
    bulk: 'text-gold-400',
    cut: 'text-accent-red',
    recomp: 'text-accent-purple',
    maintain: 'text-accent-blue',
  };

  const motivationalMessages = {
    bulk: '💪 Eat big, train hard. Mass is built in the kitchen and the gym.',
    cut: '🔥 Caloric deficit + training = fat gone. Stay strict today.',
    recomp: '⚡ Recomp is a long game. Stay consistent — your body is changing.',
    maintain: '🎯 Maintenance mode. Focus on quality and performance.',
  };

  return (
    <div className="min-h-screen bg-dark-900 page-transition">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-white/40 mb-1">{date}</p>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'} 👋
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="gold">{getGoalLabel(userProfile.goal)}</Badge>
                <Badge variant="gray">{userProfile.experience}</Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-white/30">Weekly change</div>
              <div className={`text-lg font-bold ${goalColor[userProfile.goal] || 'text-white'}`}>
                {calorieData.weeklyExpectedChange > 0 ? '+' : ''}{calorieData.weeklyExpectedChange} kg
              </div>
            </div>
          </div>

          {/* Motivation */}
          <div className="mt-4 p-4 rounded-xl bg-gold-500/5 border border-gold-500/15">
            <p className="text-sm text-gold-300">{motivationalMessages[userProfile.goal]}</p>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
        >
          {[
            {
              label: 'Goal Calories',
              value: calorieData.goalCalories.toLocaleString(),
              unit: 'kcal',
              icon: <Flame className="w-5 h-5" />,
              color: 'text-orange-400',
              bg: 'bg-orange-500/10',
            },
            {
              label: 'Protein Target',
              value: macroData.protein,
              unit: 'g',
              icon: <Target className="w-5 h-5" />,
              color: 'text-gold-400',
              bg: 'bg-gold-500/10',
            },
            {
              label: 'Water Intake',
              value: macroData.water,
              unit: 'L',
              icon: <Droplets className="w-5 h-5" />,
              color: 'text-accent-blue',
              bg: 'bg-accent-blue/10',
            },
            {
              label: 'Maintenance',
              value: calorieData.tdee.toLocaleString(),
              unit: 'kcal',
              icon: <TrendingUp className="w-5 h-5" />,
              color: 'text-accent-green',
              bg: 'bg-accent-green/10',
            },
          ].map((stat, i) => (
            <Card key={i} className="text-center">
              <div className={`inline-flex p-2.5 rounded-xl ${stat.bg} ${stat.color} mb-3`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40 mt-0.5">{stat.unit}</div>
              <div className="text-xs text-white/30 mt-1">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-5 gap-5">
          {/* Macro breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="sm:col-span-2"
          >
            <Card>
              <div className="font-semibold text-white mb-4">Daily Macros</div>
              <div className="flex items-center justify-between gap-4">
                <MacroRing protein={macroData.protein} carbs={macroData.carbs} fats={macroData.fats} size={110} />
                <div className="flex-1 space-y-3">
                  {[
                    { label: 'Protein', value: macroData.protein, color: 'gold' as const, pct: Math.round((macroData.protein * 4 / calorieData.goalCalories) * 100) },
                    { label: 'Carbs', value: macroData.carbs, color: 'blue' as const, pct: Math.round((macroData.carbs * 4 / calorieData.goalCalories) * 100) },
                    { label: 'Fats', value: macroData.fats, color: 'green' as const, pct: Math.round((macroData.fats * 9 / calorieData.goalCalories) * 100) },
                  ].map(m => (
                    <div key={m.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/50">{m.label}</span>
                        <span className="font-bold text-white">{m.value}g <span className="text-white/30">({m.pct}%)</span></span>
                      </div>
                      <ProgressBar value={m.pct} color={m.color} size="sm" />
                    </div>
                  ))}
                  <div className="pt-1 border-t border-white/5">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Fiber</span>
                      <span className="text-white/60">{macroData.fiber}g</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Today's Workout */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="sm:col-span-3"
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold text-white">Today&apos;s Workout</div>
                  <div className="text-xs text-white/40 mt-0.5">Day {activeDay} • {today.name}</div>
                </div>
                <Badge variant="blue">{today.focus.split(',')[0]}</Badge>
              </div>

              <div className="space-y-2 mb-4">
                {today.exercises.slice(0, 4).map((ex, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-dark-600 flex items-center justify-center text-xs text-white/50 font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{ex.name}</div>
                        <div className="text-xs text-white/30">{ex.targetMuscle}</div>
                      </div>
                    </div>
                    <div className="text-xs text-white/50">
                      <span className="font-bold text-white">{ex.sets}</span>×<span className="font-bold text-white">{ex.reps}</span>
                    </div>
                  </div>
                ))}
                {today.exercises.length > 4 && (
                  <div className="text-xs text-white/30 text-center py-1">
                    +{today.exercises.length - 4} more exercises
                  </div>
                )}
              </div>

              {today.cardio && (
                <div className="p-3 rounded-xl bg-accent-blue/5 border border-accent-blue/20 mb-4">
                  <div className="flex items-center gap-2 text-xs">
                    <TrendingUp className="w-3.5 h-3.5 text-accent-blue" />
                    <span className="text-accent-blue font-medium">Cardio:</span>
                    <span className="text-white/60">{today.cardio.type} — {today.cardio.duration} min</span>
                  </div>
                </div>
              )}

              <Button
                variant="outline"
                fullWidth
                onClick={() => router.push('/training')}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                size="sm"
              >
                View Full Workout
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Calorie breakdown & AI coach */}
        <div className="grid sm:grid-cols-2 gap-5 mt-5">
          {/* Calorie details */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card>
              <div className="font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-gold-500" />
                Calorie Details
              </div>
              <div className="space-y-3">
                {[
                  { label: 'BMR (Base Metabolic Rate)', value: calorieData.bmr, icon: '🔋' },
                  { label: 'TDEE (Total Daily Expenditure)', value: calorieData.tdee, icon: '⚡' },
                  { label: 'Goal Calories', value: calorieData.goalCalories, icon: '🎯', highlight: true },
                  {
                    label: `Calorie ${calorieData.surplus >= 0 ? 'Surplus' : 'Deficit'}`,
                    value: Math.abs(calorieData.surplus),
                    icon: calorieData.surplus >= 0 ? '📈' : '📉',
                    suffix: 'kcal',
                  },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between py-2 ${i < 3 ? 'border-b border-white/5' : ''}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-sm text-white/60">{item.label}</span>
                    </div>
                    <span className={`font-bold text-sm ${item.highlight ? 'text-gold-400' : 'text-white'}`}>
                      {item.value.toLocaleString()} kcal
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* AI Coach quick access */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="flex flex-col">
              <div className="font-semibold text-white mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-gold-500" />
                AI Coach
              </div>
              <div className="flex-1 space-y-3">
                {[
                  { icon: '✅', text: `Goal: ${getGoalLabel(userProfile.goal)} — ${calorieData.surplus > 0 ? '+' : ''}${calorieData.surplus} kcal/day`, good: true },
                  { icon: '💪', text: `Train ${userProfile.workoutDays}x/week with ${userProfile.experience} programming`, good: true },
                  { icon: '🛌', text: userProfile.sleepHours >= 7 ? `Good sleep: ${userProfile.sleepHours}h/night` : `Improve sleep: aim for 7-9h (current: ${userProfile.sleepHours}h)`, good: userProfile.sleepHours >= 7 },
                  { icon: '🧘', text: userProfile.stressLevel <= 5 ? 'Stress under control — good for recovery' : 'High stress detected — prioritize recovery', good: userProfile.stressLevel <= 5 },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-base mt-0.5">{item.icon}</span>
                    <span className={`text-xs leading-relaxed ${item.good ? 'text-white/60' : 'text-orange-300'}`}>{item.text}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => router.push('/coach')}
                fullWidth
                size="sm"
                className="mt-4"
                icon={<Brain className="w-4 h-4" />}
              >
                Open AI Coach
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Quick navigation */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Training Plan', icon: <Dumbbell className="w-5 h-5" />, href: '/training', color: 'text-gold-400' },
              { label: 'Meal Plan', icon: <Flame className="w-5 h-5" />, href: '/nutrition', color: 'text-orange-400' },
              { label: 'AI Coach', icon: <Brain className="w-5 h-5" />, href: '/coach', color: 'text-accent-purple' },
              { label: 'Progress', icon: <TrendingUp className="w-5 h-5" />, href: '/progress', color: 'text-accent-green' },
            ].map(nav => (
              <button
                key={nav.label}
                onClick={() => router.push(nav.href)}
                className="p-4 rounded-xl border border-white/5 bg-dark-800/40 hover:border-white/10 hover:bg-dark-700/60 transition-all text-center group"
              >
                <div className={`${nav.color} flex justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  {nav.icon}
                </div>
                <div className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">{nav.label}</div>
              </button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

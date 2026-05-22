'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ExerciseCard } from '@/components/training/ExerciseCard';
import { useStore } from '@/store/useStore';
import { Dumbbell, TrendingUp, Clock, Target, ChevronRight, Activity } from 'lucide-react';

export default function TrainingPage() {
  const router = useRouter();
  const { isOnboarded, workoutPlan, userProfile, activeDay, setActiveDay } = useStore();
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isOnboarded) router.replace('/onboarding');
  }, [isOnboarded, router]);

  useEffect(() => {
    setCompletedExercises(new Set());
  }, [activeDay]);

  if (!isOnboarded || !workoutPlan || !userProfile) return null;

  const today = workoutPlan.days.find(d => d.day === activeDay) || workoutPlan.days[0];

  const toggleExercise = (id: string) => {
    setCompletedExercises(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const completedCount = completedExercises.size;
  const totalExercises = today.exercises.length;
  const completionPct = Math.round((completedCount / totalExercises) * 100);

  return (
    <div className="min-h-screen bg-dark-900 page-transition">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold text-white mb-1">Training Program</h1>
          <p className="text-sm text-white/40">{workoutPlan.split}</p>
        </div>

        {/* Day selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {workoutPlan.days.map(day => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                activeDay === day.day
                  ? 'bg-gold-500/20 border-gold-500/50 text-gold-400'
                  : 'bg-dark-800/40 border-white/10 text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              <div className="font-bold">Day {day.day}</div>
              <div className="text-xs opacity-70 whitespace-nowrap mt-0.5">{day.name}</div>
            </button>
          ))}
        </div>

        {/* Today's workout header */}
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          <Card glow={completionPct === 100}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold text-white">{today.name}</h2>
                <p className="text-sm text-white/50 mt-0.5">{today.focus}</p>
              </div>
              <Badge variant={completionPct === 100 ? 'green' : 'gold'}>
                {completedCount}/{totalExercises} done
              </Badge>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-dark-600 rounded-full h-2 mb-4">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-500"
                style={{ width: `${completionPct}%` }}
              />
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-white/50">
              <div className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-gold-500" />
                <span>{today.exercises.length} exercises</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent-blue" />
                <span>~{userProfile.workoutDuration} min</span>
              </div>
              {today.cardio && (
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-accent-green" />
                  <span>+{today.cardio.duration} min cardio</span>
                </div>
              )}
            </div>
          </Card>

          {/* Warmup */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-sm font-semibold text-white">Warm-Up (5 min)</span>
            </div>
            <div className="space-y-1.5">
              {today.warmup.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                  <ChevronRight className="w-3 h-3 text-accent-green/60 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </Card>

          {/* Exercises */}
          <div>
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
              Main Workout
            </h3>
            <div className="space-y-3">
              {today.exercises.map((ex, i) => (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  index={i}
                  completed={completedExercises.has(ex.id)}
                  onComplete={() => toggleExercise(ex.id)}
                />
              ))}
            </div>
          </div>

          {/* Cardio */}
          {today.cardio && (
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-accent-blue" />
                <span className="text-sm font-semibold text-white">Post-Workout Cardio</span>
                <Badge variant="blue">{today.cardio.intensity}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center p-3 rounded-xl bg-dark-900/50">
                  <div className="text-lg font-bold text-white">{today.cardio.duration}</div>
                  <div className="text-xs text-white/30">minutes</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-dark-900/50 col-span-2">
                  <div className="text-sm font-semibold text-white">{today.cardio.type}</div>
                  <div className="text-xs text-white/30 mt-1">Activity</div>
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">{today.cardio.notes}</p>
            </Card>
          )}

          {/* Cooldown */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
              <span className="text-sm font-semibold text-white">Cool-Down & Stretching</span>
            </div>
            <div className="space-y-1.5">
              {today.cooldown.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                  <ChevronRight className="w-3 h-3 text-accent-purple/60 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </Card>

          {/* Progression scheme */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-gold-500" />
              <span className="text-sm font-semibold text-white">Progressive Overload Plan</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">{workoutPlan.progressionScheme}</p>
          </Card>

          {/* Volume breakdown */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="w-4 h-4 text-gold-500" />
              <span className="text-sm font-semibold text-white">Weekly Training Volume</span>
            </div>
            <div className="space-y-3">
              {Object.entries(workoutPlan.weeklyVolume).map(([muscle, sets]) => (
                <div key={muscle}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">{muscle}</span>
                    <span className="font-bold text-white">{sets} sets/week</span>
                  </div>
                  <div className="w-full bg-dark-600 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                      style={{ width: `${Math.min(100, (sets / 20) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

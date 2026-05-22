'use client';

import Link from 'next/link';
import { Dumbbell, Clock, Flame, ChevronRight, CheckCircle } from 'lucide-react';
import { WorkoutDay } from '@/lib/types';

interface WorkoutCardProps {
  workout: WorkoutDay;
  isToday?: boolean;
}

export function WorkoutCard({ workout, isToday = false }: WorkoutCardProps) {
  const exerciseCount = workout.exercises.length;
  const estimatedSets = workout.exercises.reduce((sum, e) => sum + e.sets, 0);

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-200 ${
      isToday
        ? 'border-gold-500/30 bg-gold-500/5'
        : 'border-white/5 bg-gradient-to-br from-dark-700 to-dark-800'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          {isToday && (
            <span className="text-xs font-bold text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/20 mb-1 inline-block">
              TODAY
            </span>
          )}
          <h3 className="font-bold text-white text-base">{workout.name}</h3>
          <p className="text-sm text-dark-400 mt-0.5">{workout.focus}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-dark-600/60 flex items-center justify-center">
          <Dumbbell className="w-5 h-5 text-gold-400" />
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-dark-300">
          <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
          <span>{exerciseCount} exercises</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-dark-300">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>{estimatedSets} total sets</span>
        </div>
        {workout.cardio && (
          <div className="flex items-center gap-1.5 text-xs text-dark-300">
            <Clock className="w-3.5 h-3.5 text-green-400" />
            <span>+{workout.cardio.duration}m cardio</span>
          </div>
        )}
      </div>

      {/* Preview exercises */}
      <div className="space-y-1.5 mb-4">
        {workout.exercises.slice(0, 3).map((ex, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-dark-600 flex items-center justify-center text-dark-400 font-bold text-xs flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-dark-200">{ex.name}</span>
            </div>
            <span className="text-dark-400">{ex.sets}×{ex.reps}</span>
          </div>
        ))}
        {exerciseCount > 3 && (
          <p className="text-xs text-dark-500 pl-7">+{exerciseCount - 3} more exercises</p>
        )}
      </div>

      <Link
        href="/training"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gold-500/20 text-gold-400 text-sm font-medium hover:bg-gold-500/5 transition-colors"
      >
        View Full Workout
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

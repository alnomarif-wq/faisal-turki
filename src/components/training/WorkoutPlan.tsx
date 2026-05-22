'use client';

import { useState } from 'react';
import { WorkoutPlan, WorkoutDay } from '@/lib/types';
import { ExerciseCard } from './ExerciseCard';
import { Dumbbell, Flame, Clock, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface WorkoutPlanProps {
  plan: WorkoutPlan;
}

function DayTab({
  workout,
  isActive,
  onClick,
}: {
  workout: WorkoutDay;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex-shrink-0 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150',
        isActive
          ? 'bg-gold-500/10 border-gold-500/30 text-gold-400'
          : 'border-white/5 text-dark-300 hover:border-white/10 hover:text-white bg-dark-800'
      )}
    >
      <div className="font-black text-xs mb-0.5">DAY {workout.day}</div>
      <div className="text-xs opacity-80 truncate max-w-[80px]">{workout.name}</div>
    </button>
  );
}

export function WorkoutPlanView({ plan }: WorkoutPlanProps) {
  const [activeDay, setActiveDay] = useState(0);
  const workout = plan.days[activeDay];

  return (
    <div className="space-y-5">
      {/* Split info banner */}
      <div className="p-4 rounded-xl bg-gold-500/5 border border-gold-500/15 flex items-center gap-3">
        <Dumbbell className="w-5 h-5 text-gold-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-bold text-gold-300">{plan.split}</p>
          <p className="text-xs text-dark-400 mt-0.5">{plan.progressionScheme.slice(0, 80)}...</p>
        </div>
      </div>

      {/* Volume overview */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {Object.entries(plan.weeklyVolume).map(([muscle, sets]) => (
          <div key={muscle} className="p-3 rounded-xl bg-dark-800 border border-white/5 text-center">
            <div className="text-lg font-black text-gold-400">{sets}</div>
            <div className="text-xs text-dark-400">{muscle}</div>
            <div className="text-xs text-dark-600">sets/wk</div>
          </div>
        ))}
      </div>

      {/* Day tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {plan.days.map((day, i) => (
          <DayTab
            key={i}
            workout={day}
            isActive={i === activeDay}
            onClick={() => setActiveDay(i)}
          />
        ))}
      </div>

      {/* Workout content */}
      {workout && (
        <div className="space-y-4">
          {/* Workout header */}
          <div className="p-4 rounded-xl border border-white/5 bg-gradient-to-br from-dark-700 to-dark-800">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-black text-white">{workout.name}</h2>
                <p className="text-sm text-dark-400 mt-1">{workout.focus}</p>
              </div>
              <div className="flex gap-3 text-xs text-dark-400">
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-3.5 h-3.5 text-gold-400" />
                  <span>{workout.exercises.length} exercises</span>
                </div>
                {workout.cardio && (
                  <div className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>{workout.cardio.duration}m cardio</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Warm-up */}
          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/15">
            <h3 className="text-sm font-bold text-blue-300 mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Warm-Up (5-10 min)
            </h3>
            <ul className="space-y-1">
              {workout.warmup.map((item, i) => (
                <li key={i} className="text-xs text-dark-300 flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-blue-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Exercises */}
          <div>
            <h3 className="text-sm font-bold text-dark-200 mb-3 uppercase tracking-wide">
              Main Training
            </h3>
            <div className="space-y-2">
              {workout.exercises.map((exercise, i) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  index={i + 1}
                />
              ))}
            </div>
          </div>

          {/* Cardio */}
          {workout.cardio && (
            <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/15">
              <h3 className="text-sm font-bold text-orange-300 mb-2 flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                Cardio
              </h3>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-dark-400 text-xs">Type</span>
                  <p className="text-white font-semibold">{workout.cardio.type}</p>
                </div>
                <div>
                  <span className="text-dark-400 text-xs">Duration</span>
                  <p className="text-white font-semibold">{workout.cardio.duration} min</p>
                </div>
                <div>
                  <span className="text-dark-400 text-xs">Intensity</span>
                  <p className="text-white font-semibold capitalize">{workout.cardio.intensity}</p>
                </div>
              </div>
              <p className="text-xs text-dark-400 mt-2">{workout.cardio.notes}</p>
            </div>
          )}

          {/* Cool-down */}
          <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/15">
            <h3 className="text-sm font-bold text-green-300 mb-2">Cool-Down</h3>
            <ul className="space-y-1">
              {workout.cooldown.map((item, i) => (
                <li key={i} className="text-xs text-dark-300 flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

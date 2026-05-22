'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { ChevronDown, ChevronUp, Clock, RotateCcw, Zap, Dumbbell } from 'lucide-react';
import { Exercise } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  completed?: boolean;
  onComplete?: () => void;
}

export function ExerciseCard({ exercise, index, completed, onComplete }: ExerciseCardProps) {
  const [expanded, setExpanded] = useState(false);

  const difficultyColor: Record<string, 'green' | 'gold' | 'red'> = {
    easy: 'green',
    medium: 'gold',
    hard: 'red',
  };

  return (
    <div className={clsx(
      'rounded-xl border transition-all duration-200',
      completed ? 'border-accent-green/30 bg-accent-green/5' : 'border-white/5 bg-dark-800/40 hover:border-white/10'
    )}>
      <div
        className="p-4 flex items-start gap-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Index / Complete button */}
        <button
          type="button"
          onClick={e => { e.stopPropagation(); onComplete?.(); }}
          className={clsx(
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-all',
            completed
              ? 'bg-accent-green text-black border-accent-green'
              : 'bg-dark-700 text-white/50 border-white/10 hover:border-gold-500/50 hover:text-gold-400'
          )}
        >
          {completed ? '✓' : index + 1}
        </button>

        {/* Exercise info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h4 className="font-semibold text-white text-sm leading-tight">{exercise.name}</h4>
              {exercise.nameAr && <p className="text-xs text-white/30 mt-0.5" dir="rtl">{exercise.nameAr}</p>}
            </div>
            <Badge variant={difficultyColor[exercise.difficulty]} size="sm">
              {exercise.difficulty}
            </Badge>
          </div>

          <div className="flex items-center flex-wrap gap-3 mt-2">
            <div className="flex items-center gap-1 text-xs text-white/50">
              <Dumbbell className="w-3 h-3 text-gold-500" />
              <span className="text-gold-400 font-medium">{exercise.targetMuscle}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-white/50">
              <span className="font-bold text-white">{exercise.sets}</span> sets ×
              <span className="font-bold text-white">{exercise.reps}</span> reps
            </div>
            <div className="flex items-center gap-1 text-xs text-white/50">
              <Clock className="w-3 h-3" />
              {exercise.restTime}s rest
            </div>
          </div>
        </div>

        {expanded ? <ChevronUp className="w-4 h-4 text-white/30 flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0 mt-1" />}
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-white/5 pt-4 space-y-4">
          {/* Specs */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Tempo', value: exercise.tempo, icon: <Zap className="w-3.5 h-3.5" /> },
              { label: 'Rest', value: `${exercise.restTime}s`, icon: <Clock className="w-3.5 h-3.5" /> },
              { label: 'Alternative', value: exercise.alternative, icon: <RotateCcw className="w-3.5 h-3.5" />, small: true },
            ].map(spec => (
              <div key={spec.label} className="bg-dark-900/50 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-white/30 mb-1">
                  {spec.icon}
                  <span className="text-xs">{spec.label}</span>
                </div>
                <div className={clsx('font-semibold text-white', spec.small ? 'text-xs' : 'text-sm')}>
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          {/* Weight recommendation */}
          <div className="bg-gold-500/5 border border-gold-500/20 rounded-lg p-3">
            <div className="text-xs text-gold-400 font-medium mb-1">⚖️ Weight Recommendation</div>
            <div className="text-sm text-white/70">{exercise.weightRecommendation}</div>
          </div>

          {/* Instructions */}
          <div>
            <div className="text-xs text-white/40 font-medium mb-2">Form Instructions</div>
            <ol className="space-y-1.5">
              {exercise.instructions.map((inst, i) => (
                <li key={i} className="flex gap-2 text-xs text-white/60">
                  <span className="text-gold-500 font-bold flex-shrink-0">{i + 1}.</span>
                  {inst}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

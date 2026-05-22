'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { calculateBMR, calculateTDEE, calculateGoalCalories, calculateMacros } from '@/lib/calculations';
import { generateWorkoutPlan } from '@/lib/workoutGenerator';
import { generateMealPlan } from '@/lib/mealGenerator';
import { UserProfile, Goal, ActivityLevel, Experience, GymAccess, FoodPreference } from '@/lib/types';
import {
  User, Target, Dumbbell, Salad, ChevronRight, ChevronLeft,
  CheckCircle, Zap, Scale, Ruler, Calendar, Clock
} from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Basic Info', icon: <User className="w-4 h-4" /> },
  { id: 2, label: 'Your Goal', icon: <Target className="w-4 h-4" /> },
  { id: 3, label: 'Training', icon: <Dumbbell className="w-4 h-4" /> },
  { id: 4, label: 'Body Details', icon: <Scale className="w-4 h-4" /> },
  { id: 5, label: 'Nutrition', icon: <Salad className="w-4 h-4" /> },
  { id: 6, label: 'Generate Plan', icon: <Zap className="w-4 h-4" /> },
];

const GOALS: { value: Goal; label: string; desc: string; emoji: string }[] = [
  { value: 'bulk', label: 'Muscle Gain', desc: '+300 kcal surplus, max muscle', emoji: '💪' },
  { value: 'cut', label: 'Fat Loss', desc: '-400 kcal deficit, preserve muscle', emoji: '🔥' },
  { value: 'recomp', label: 'Recomposition', desc: 'Lose fat, gain muscle simultaneously', emoji: '⚡' },
  { value: 'maintain', label: 'Maintenance', desc: 'Stay lean and strong', emoji: '🎯' },
];

const ACTIVITY_LEVELS: { value: ActivityLevel; label: string; desc: string }[] = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Desk job, little to no exercise' },
  { value: 'lightly_active', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
  { value: 'moderately_active', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
  { value: 'very_active', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
];

const EXPERIENCE_LEVELS: { value: Experience; label: string; desc: string }[] = [
  { value: 'beginner', label: 'Beginner', desc: 'Less than 1 year training' },
  { value: 'intermediate', label: 'Intermediate', desc: '1-3 years consistent training' },
  { value: 'advanced', label: 'Advanced', desc: '3+ years, strong compound lifts' },
];

const MUSCLE_GROUPS = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Glutes', 'Core', 'Calves'];

const FOOD_PREFS: { value: FoodPreference; label: string; emoji: string }[] = [
  { value: 'high_protein', label: 'High Protein', emoji: '🥩' },
  { value: 'budget', label: 'Budget Meals', emoji: '💰' },
  { value: 'arabic', label: 'Arabic/Saudi Foods', emoji: '🌙' },
  { value: 'vegetarian', label: 'Vegetarian', emoji: '🥗' },
  { value: 'flexible', label: 'Flexible Diet', emoji: '🍽️' },
];

type FormData = {
  gender: 'male' | 'female';
  age: string;
  height: string;
  weight: string;
  goal: Goal;
  activityLevel: ActivityLevel;
  sleepHours: string;
  stressLevel: number;
  experience: Experience;
  workoutDays: 4 | 5;
  workoutDuration: string;
  gymAccess: GymAccess;
  injuries: string;
  weakMuscles: string[];
  strongMuscles: string[];
  foodPreferences: FoodPreference[];
};

const defaultForm: FormData = {
  gender: 'male',
  age: '',
  height: '',
  weight: '',
  goal: 'bulk',
  activityLevel: 'moderately_active',
  sleepHours: '7',
  stressLevel: 5,
  experience: 'intermediate',
  workoutDays: 4,
  workoutDuration: '75',
  gymAccess: 'full_gym',
  injuries: '',
  weakMuscles: [],
  strongMuscles: [],
  foodPreferences: ['flexible'],
};

function SelectCard({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'w-full p-4 rounded-xl border text-left transition-all duration-200',
        selected
          ? 'border-gold-500/60 bg-gold-500/10 shadow-gold-sm'
          : 'border-white/10 bg-dark-800/40 hover:border-white/20 hover:bg-dark-800/60'
      )}
    >
      {children}
    </button>
  );
}

export function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [generating, setGenerating] = useState(false);
  const router = useRouter();
  const { setUserProfile, setCalorieData, setMacroData, setWorkoutPlan, setMealPlan, setIsOnboarded } = useStore();

  const update = (key: keyof FormData, value: unknown) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const toggleMuscle = (list: 'weakMuscles' | 'strongMuscles', muscle: string) => {
    setForm(prev => {
      const current = prev[list] as string[];
      return {
        ...prev,
        [list]: current.includes(muscle) ? current.filter(m => m !== muscle) : [...current, muscle],
      };
    });
  };

  const toggleFoodPref = (pref: FoodPreference) => {
    setForm(prev => {
      const current = prev.foodPreferences;
      return {
        ...prev,
        foodPreferences: current.includes(pref) ? current.filter(p => p !== pref) : [...current, pref],
      };
    });
  };

  const validateStep = () => {
    if (step === 1) {
      if (!form.age || !form.height || !form.weight) {
        toast.error('Please fill in all fields');
        return false;
      }
      if (parseInt(form.age) < 16 || parseInt(form.age) > 80) {
        toast.error('Age must be between 16 and 80');
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < STEPS.length) setStep(s => s + 1);
  };

  const prev = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1800));

    const profile: UserProfile = {
      gender: form.gender,
      age: parseInt(form.age),
      height: parseFloat(form.height),
      weight: parseFloat(form.weight),
      goal: form.goal,
      activityLevel: form.activityLevel,
      experience: form.experience,
      workoutDays: form.workoutDays,
      workoutDuration: parseInt(form.workoutDuration) || 75,
      gymAccess: form.gymAccess,
      injuries: form.injuries,
      foodPreferences: form.foodPreferences.length > 0 ? form.foodPreferences : ['flexible'],
      sleepHours: parseFloat(form.sleepHours) || 7,
      stressLevel: form.stressLevel,
      weakMuscles: form.weakMuscles,
      strongMuscles: form.strongMuscles,
    };

    const bmr = calculateBMR(profile);
    const tdee = calculateTDEE(bmr, profile.activityLevel);
    const calorieData = calculateGoalCalories(tdee, profile.goal);
    const macroData = calculateMacros(profile, calorieData.goalCalories);
    const workoutPlan = generateWorkoutPlan(profile);
    const mealPlan = generateMealPlan(profile, macroData, calorieData.goalCalories);

    setUserProfile(profile);
    setCalorieData(calorieData);
    setMacroData(macroData);
    setWorkoutPlan(workoutPlan);
    setMealPlan(mealPlan);
    setIsOnboarded(true);

    toast.success('Your personalized plan is ready!');
    router.push('/dashboard');
  };

  const slideVariants = {
    enter: { x: 40, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -40, opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-6 pb-20">
      <div className="max-w-xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-gold-500" fill="currentColor" />
            <span className="font-display font-bold text-white">FitAI <span className="text-gold-500">Pro</span></span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Build Your Plan</h1>
          <p className="text-sm text-white/40">Step {step} of {STEPS.length}</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 px-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                s.id < step ? 'bg-gold-500 text-black' :
                s.id === step ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50' :
                'bg-dark-700 text-white/30 border border-white/10'
              )}>
                {s.id < step ? <CheckCircle className="w-4 h-4" /> : s.id}
              </div>
              {i < STEPS.length - 1 && (
                <div className={clsx('flex-1 h-px mx-1 w-6 sm:w-8', s.id < step ? 'bg-gold-500/50' : 'bg-white/10')} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-dark-700 to-dark-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <div className="text-gold-400">{STEPS[step - 1].icon}</div>
            <span className="text-sm font-semibold text-white">{STEPS[step - 1].label}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="p-6 space-y-5"
            >
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-3">Gender</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['male', 'female'] as const).map(g => (
                        <SelectCard key={g} selected={form.gender === g} onClick={() => update('gender', g)}>
                          <div className="text-lg mb-1">{g === 'male' ? '♂️' : '♀️'}</div>
                          <div className="font-medium text-white capitalize">{g}</div>
                        </SelectCard>
                      ))}
                    </div>
                  </div>
                  <Input label="Age" type="number" placeholder="25" value={form.age} onChange={e => update('age', e.target.value)} unit="years" min="16" max="80" />
                  <Input label="Height" type="number" placeholder="175" value={form.height} onChange={e => update('height', e.target.value)} unit="cm" />
                  <Input label="Weight" type="number" placeholder="80" value={form.weight} onChange={e => update('weight', e.target.value)} unit="kg" />
                </>
              )}

              {/* Step 2: Goal & Activity */}
              {step === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-3">Your Goal</label>
                    <div className="grid grid-cols-2 gap-3">
                      {GOALS.map(g => (
                        <SelectCard key={g.value} selected={form.goal === g.value} onClick={() => update('goal', g.value)}>
                          <div className="text-2xl mb-1">{g.emoji}</div>
                          <div className="font-semibold text-white text-sm">{g.label}</div>
                          <div className="text-xs text-white/40 mt-1">{g.desc}</div>
                        </SelectCard>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-3">Activity Level</label>
                    <div className="space-y-2">
                      {ACTIVITY_LEVELS.map(a => (
                        <SelectCard key={a.value} selected={form.activityLevel === a.value} onClick={() => update('activityLevel', a.value)}>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-white text-sm">{a.label}</div>
                              <div className="text-xs text-white/40">{a.desc}</div>
                            </div>
                            {form.activityLevel === a.value && <CheckCircle className="w-4 h-4 text-gold-400" />}
                          </div>
                        </SelectCard>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Sleep Hours" type="number" placeholder="7" value={form.sleepHours} onChange={e => update('sleepHours', e.target.value)} unit="hrs" min="4" max="12" />
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">Stress Level</label>
                      <div className="flex items-center gap-3">
                        <input type="range" min="1" max="10" value={form.stressLevel} onChange={e => update('stressLevel', parseInt(e.target.value))} className="flex-1" />
                        <span className="text-sm font-bold text-gold-400 w-6 text-right">{form.stressLevel}</span>
                      </div>
                      <div className="flex justify-between text-xs text-white/30 mt-1">
                        <span>Low</span><span>High</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Training */}
              {step === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-3">Training Experience</label>
                    <div className="space-y-2">
                      {EXPERIENCE_LEVELS.map(e => (
                        <SelectCard key={e.value} selected={form.experience === e.value} onClick={() => update('experience', e.value)}>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-white text-sm">{e.label}</div>
                              <div className="text-xs text-white/40">{e.desc}</div>
                            </div>
                            {form.experience === e.value && <CheckCircle className="w-4 h-4 text-gold-400" />}
                          </div>
                        </SelectCard>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-3">Workout Days Per Week</label>
                    <div className="grid grid-cols-2 gap-3">
                      {([4, 5] as const).map(d => (
                        <SelectCard key={d} selected={form.workoutDays === d} onClick={() => update('workoutDays', d)}>
                          <div className="text-2xl font-black text-gold-400">{d}</div>
                          <div className="text-sm text-white/60">days/week</div>
                          <div className="text-xs text-white/30 mt-1">
                            {d === 4 ? 'Upper/Lower Split' : 'PPL + Upper/Lower'}
                          </div>
                        </SelectCard>
                      ))}
                    </div>
                  </div>
                  <Input
                    label="Workout Duration"
                    type="number"
                    placeholder="75"
                    value={form.workoutDuration}
                    onChange={e => update('workoutDuration', e.target.value)}
                    unit="min"
                    icon={<Clock className="w-4 h-4" />}
                  />
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-3">Gym Access</label>
                    <div className="grid grid-cols-2 gap-3">
                      {([{ value: 'full_gym', label: 'Full Gym', emoji: '🏋️' }, { value: 'home_gym', label: 'Home Gym', emoji: '🏠' }] as const).map(g => (
                        <SelectCard key={g.value} selected={form.gymAccess === g.value} onClick={() => update('gymAccess', g.value)}>
                          <div className="text-2xl mb-1">{g.emoji}</div>
                          <div className="font-medium text-white text-sm">{g.label}</div>
                        </SelectCard>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 4: Body Details */}
              {step === 4 && (
                <>
                  <Input
                    label="Injuries or Limitations (optional)"
                    placeholder="e.g. lower back pain, knee issues"
                    value={form.injuries}
                    onChange={e => update('injuries', e.target.value)}
                  />
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-3">Weak Muscle Groups (tap to select)</label>
                    <div className="flex flex-wrap gap-2">
                      {MUSCLE_GROUPS.map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => toggleMuscle('weakMuscles', m)}
                          className={clsx(
                            'px-3 py-1.5 rounded-full text-sm font-medium border transition-all',
                            form.weakMuscles.includes(m)
                              ? 'bg-accent-red/20 border-accent-red/40 text-accent-red'
                              : 'bg-dark-800/40 border-white/10 text-white/50 hover:border-white/20'
                          )}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-3">Strong Muscle Groups</label>
                    <div className="flex flex-wrap gap-2">
                      {MUSCLE_GROUPS.map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => toggleMuscle('strongMuscles', m)}
                          className={clsx(
                            'px-3 py-1.5 rounded-full text-sm font-medium border transition-all',
                            form.strongMuscles.includes(m)
                              ? 'bg-accent-green/20 border-accent-green/40 text-accent-green'
                              : 'bg-dark-800/40 border-white/10 text-white/50 hover:border-white/20'
                          )}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 5: Nutrition */}
              {step === 5 && (
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">Food Preferences (select all that apply)</label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {FOOD_PREFS.map(p => (
                      <SelectCard
                        key={p.value}
                        selected={form.foodPreferences.includes(p.value)}
                        onClick={() => toggleFoodPref(p.value)}
                      >
                        <div className="text-2xl mb-1">{p.emoji}</div>
                        <div className="font-medium text-white text-xs">{p.label}</div>
                      </SelectCard>
                    ))}
                  </div>
                  <p className="text-xs text-white/30 mt-4">
                    Selecting &quot;Arabic/Saudi Foods&quot; includes kabsa, dates, labneh, and other local favorites in your meal plan.
                  </p>
                </div>
              )}

              {/* Step 6: Generate */}
              {step === 6 && (
                <div className="text-center space-y-5">
                  <div className="inline-flex p-5 rounded-2xl bg-gold-500/10 border border-gold-500/20">
                    <Zap className="w-12 h-12 text-gold-500" fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Ready to Build Your Plan</h3>
                    <p className="text-sm text-white/50">
                      We have everything we need to generate your complete personalized fitness system.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-left">
                    {[
                      { label: 'Goal', value: GOALS.find(g => g.value === form.goal)?.label },
                      { label: 'Experience', value: form.experience.charAt(0).toUpperCase() + form.experience.slice(1) },
                      { label: 'Workout Days', value: `${form.workoutDays} days/week` },
                      { label: 'Gym Access', value: form.gymAccess === 'full_gym' ? 'Full Gym' : 'Home Gym' },
                    ].map(item => (
                      <div key={item.label} className="p-3 rounded-xl bg-dark-900/50 border border-white/5">
                        <div className="text-xs text-white/40">{item.label}</div>
                        <div className="text-sm font-semibold text-white mt-0.5">{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <Button
                    fullWidth
                    size="lg"
                    loading={generating}
                    onClick={handleGenerate}
                    icon={<Zap className="w-5 h-5" />}
                    className="font-bold text-base"
                  >
                    {generating ? 'Building Your Plan...' : 'Generate My Complete Plan'}
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {step < 6 && (
            <div className="px-6 pb-6 flex gap-3">
              {step > 1 && (
                <Button variant="secondary" onClick={prev} icon={<ChevronLeft className="w-4 h-4" />} className="flex-1">
                  Back
                </Button>
              )}
              <Button onClick={next} icon={<ChevronRight className="w-4 h-4" />} iconPosition="right" className="flex-1">
                {step === 5 ? 'Review Plan' : 'Continue'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

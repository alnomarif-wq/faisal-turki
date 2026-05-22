export type Gender = 'male' | 'female';
export type Goal = 'bulk' | 'cut' | 'recomp' | 'maintain';
export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
export type Experience = 'beginner' | 'intermediate' | 'advanced';
export type WorkoutDays = 4 | 5;
export type GymAccess = 'full_gym' | 'home_gym';
export type FoodPreference = 'high_protein' | 'budget' | 'arabic' | 'vegetarian' | 'flexible';

export interface UserProfile {
  gender: Gender;
  age: number;
  height: number; // cm
  weight: number; // kg
  goal: Goal;
  activityLevel: ActivityLevel;
  experience: Experience;
  workoutDays: WorkoutDays;
  workoutDuration: number; // minutes
  injuries: string;
  gymAccess: GymAccess;
  foodPreferences: FoodPreference[];
  sleepHours: number;
  stressLevel: number; // 1-10
  weakMuscles: string[];
  strongMuscles: string[];
}

export interface CalorieData {
  bmr: number;
  tdee: number;
  goalCalories: number;
  surplus: number;
  weeklyExpectedChange: number;
}

export interface MacroData {
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  water: number;
}

export interface Exercise {
  id: string;
  name: string;
  nameAr?: string;
  targetMuscle: string;
  sets: number;
  reps: string;
  restTime: number; // seconds
  tempo: string;
  weightRecommendation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  instructions: string[];
  alternative: string;
  videoUrl?: string;
}

export interface WorkoutDay {
  day: number;
  name: string;
  focus: string;
  warmup: string[];
  exercises: Exercise[];
  cooldown: string[];
  cardio?: CardioSession;
}

export interface CardioSession {
  type: string;
  duration: number; // minutes
  intensity: 'low' | 'moderate' | 'high';
  notes: string;
}

export interface WorkoutPlan {
  split: string;
  days: WorkoutDay[];
  progressionScheme: string;
  weeklyVolume: Record<string, number>;
}

export interface Meal {
  name: string;
  nameAr?: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  ingredients: MealIngredient[];
  instructions: string[];
}

export interface MealIngredient {
  name: string;
  nameAr?: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface MealPlan {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  meals: Meal[];
  shoppingList: ShoppingItem[];
}

export interface ShoppingItem {
  name: string;
  nameAr?: string;
  amount: string;
  category: string;
}

export interface ProgressEntry {
  date: string;
  weight: number;
  bodyFat?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

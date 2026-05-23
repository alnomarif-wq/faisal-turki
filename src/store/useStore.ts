import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, CalorieData, MacroData, WorkoutPlan, MealPlan, ProgressEntry, ChatMessage } from '@/lib/types';

interface AppState {
  userProfile: UserProfile | null;
  calorieData: CalorieData | null;
  macroData: MacroData | null;
  workoutPlan: WorkoutPlan | null;
  mealPlan: MealPlan | null;
  progress: ProgressEntry[];
  chatHistory: ChatMessage[];
  isOnboarded: boolean;
  activeDay: number;

  setUserProfile: (profile: UserProfile) => void;
  setCalorieData: (data: CalorieData) => void;
  setMacroData: (data: MacroData) => void;
  setWorkoutPlan: (plan: WorkoutPlan) => void;
  setMealPlan: (plan: MealPlan) => void;
  addProgress: (entry: ProgressEntry) => void;
  addChatMessage: (message: ChatMessage) => void;
  updateChatMessage: (id: string, content: string) => void;
  setIsOnboarded: (value: boolean) => void;
  setActiveDay: (day: number) => void;
  resetAll: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      userProfile: null,
      calorieData: null,
      macroData: null,
      workoutPlan: null,
      mealPlan: null,
      progress: [],
      chatHistory: [],
      isOnboarded: false,
      activeDay: 1,

      setUserProfile: (profile) => set({ userProfile: profile }),
      setCalorieData: (data) => set({ calorieData: data }),
      setMacroData: (data) => set({ macroData: data }),
      setWorkoutPlan: (plan) => set({ workoutPlan: plan }),
      setMealPlan: (plan) => set({ mealPlan: plan }),
      addProgress: (entry) => set((state) => ({ progress: [...state.progress, entry] })),
      addChatMessage: (message) =>
        set((state) => ({ chatHistory: [...state.chatHistory, message] })),
      updateChatMessage: (id, content) =>
        set((state) => ({
          chatHistory: state.chatHistory.map((m) =>
            m.id === id ? { ...m, content } : m
          ),
        })),
      setIsOnboarded: (value) => set({ isOnboarded: value }),
      setActiveDay: (day) => set({ activeDay: day }),
      resetAll: () =>
        set({
          userProfile: null,
          calorieData: null,
          macroData: null,
          workoutPlan: null,
          mealPlan: null,
          progress: [],
          chatHistory: [],
          isOnboarded: false,
          activeDay: 1,
        }),
    }),
    { name: 'fitai-storage' }
  )
);

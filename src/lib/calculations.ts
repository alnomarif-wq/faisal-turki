import { UserProfile, CalorieData, MacroData } from './types';

export function calculateBMR(profile: UserProfile): number {
  // Mifflin-St Jeor Equation
  const { gender, weight, height, age } = profile;
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

export function calculateTDEE(bmr: number, activityLevel: UserProfile['activityLevel']): number {
  const multipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
  };
  return Math.round(bmr * multipliers[activityLevel]);
}

export function calculateGoalCalories(tdee: number, goal: UserProfile['goal']): CalorieData {
  const bmrApprox = Math.round(tdee / 1.55);
  let goalCalories: number;
  let surplus: number;
  let weeklyExpectedChange: number;

  switch (goal) {
    case 'bulk':
      surplus = 300;
      goalCalories = tdee + surplus;
      weeklyExpectedChange = 0.3;
      break;
    case 'cut':
      surplus = -400;
      goalCalories = tdee + surplus;
      weeklyExpectedChange = -0.4;
      break;
    case 'recomp':
      surplus = -100;
      goalCalories = tdee + surplus;
      weeklyExpectedChange = 0;
      break;
    case 'maintain':
    default:
      surplus = 0;
      goalCalories = tdee;
      weeklyExpectedChange = 0;
      break;
  }

  return {
    bmr: bmrApprox,
    tdee,
    goalCalories: Math.round(goalCalories),
    surplus,
    weeklyExpectedChange,
  };
}

export function calculateMacros(profile: UserProfile, goalCalories: number): MacroData {
  const { weight, goal } = profile;

  // Protein: 1.8-2.5g per kg depending on goal
  let proteinMultiplier: number;
  switch (goal) {
    case 'bulk': proteinMultiplier = 2.0; break;
    case 'cut': proteinMultiplier = 2.4; break;
    case 'recomp': proteinMultiplier = 2.2; break;
    default: proteinMultiplier = 1.8; break;
  }

  const protein = Math.round(weight * proteinMultiplier);
  const proteinCalories = protein * 4;

  // Fats: 25% of total calories
  const fatCalories = goalCalories * 0.25;
  const fats = Math.round(fatCalories / 9);

  // Carbs: remaining calories
  const carbCalories = goalCalories - proteinCalories - fatCalories;
  const carbs = Math.round(carbCalories / 4);

  // Fiber: ~14g per 1000 calories
  const fiber = Math.round((goalCalories / 1000) * 14);

  // Water: 35ml per kg body weight
  const water = Math.round((weight * 35) / 1000 * 10) / 10;

  return { protein, carbs, fats, fiber, water };
}

export function calculateBMI(weight: number, height: number): number {
  const heightM = height / 100;
  return Math.round((weight / (heightM * heightM)) * 10) / 10;
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal Weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function estimateBodyFat(profile: UserProfile): number {
  // Rough estimate using BMI-based formula
  const bmi = calculateBMI(profile.weight, profile.height);
  const { age, gender } = profile;

  if (gender === 'male') {
    return Math.round((1.20 * bmi + 0.23 * age - 16.2) * 10) / 10;
  } else {
    return Math.round((1.20 * bmi + 0.23 * age - 5.4) * 10) / 10;
  }
}

export function getGoalLabel(goal: string): string {
  const labels: Record<string, string> = {
    bulk: 'Muscle Building',
    cut: 'Fat Loss',
    recomp: 'Body Recomposition',
    maintain: 'Maintenance',
  };
  return labels[goal] || goal;
}

export function getActivityLabel(level: string): string {
  const labels: Record<string, string> = {
    sedentary: 'Sedentary (desk job)',
    lightly_active: 'Lightly Active (1-3 days/week)',
    moderately_active: 'Moderately Active (3-5 days/week)',
    very_active: 'Very Active (6-7 days/week)',
  };
  return labels[level] || level;
}

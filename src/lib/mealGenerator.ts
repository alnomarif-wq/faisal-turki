import { UserProfile, MacroData, MealPlan, Meal, MealIngredient, ShoppingItem } from './types';

function scaleMeal(meal: Meal, targetCalories: number): Meal {
  const scaleFactor = targetCalories / meal.calories;
  return {
    ...meal,
    calories: Math.round(meal.calories * scaleFactor),
    protein: Math.round(meal.protein * scaleFactor),
    carbs: Math.round(meal.carbs * scaleFactor),
    fats: Math.round(meal.fats * scaleFactor),
    fiber: Math.round(meal.fiber * scaleFactor),
    ingredients: meal.ingredients.map(ing => ({
      ...ing,
      amount: Math.round(ing.amount * scaleFactor),
      calories: Math.round(ing.calories * scaleFactor),
      protein: Math.round(ing.protein * scaleFactor),
      carbs: Math.round(ing.carbs * scaleFactor),
      fats: Math.round(ing.fats * scaleFactor),
    })),
  };
}

export function generateMealPlan(
  profile: UserProfile,
  macros: MacroData,
  goalCalories: number
): MealPlan {
  const isArabic = profile.foodPreferences.includes('arabic');
  const isVegetarian = profile.foodPreferences.includes('vegetarian');
  const isBudget = profile.foodPreferences.includes('budget');

  const meals: Meal[] = isArabic
    ? generateArabicMeals(goalCalories, macros, isVegetarian)
    : generateWesternMeals(goalCalories, macros, isVegetarian, isBudget);

  const shoppingList = generateShoppingList(meals);

  const totals = meals.reduce(
    (acc, m) => ({
      cal: acc.cal + m.calories,
      pro: acc.pro + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fats,
    }),
    { cal: 0, pro: 0, carbs: 0, fat: 0 }
  );

  return {
    totalCalories: totals.cal,
    totalProtein: totals.pro,
    totalCarbs: totals.carbs,
    totalFats: totals.fat,
    meals,
    shoppingList,
  };
}

function generateArabicMeals(goalCalories: number, macros: MacroData, isVegetarian: boolean): Meal[] {
  const mealDistribution = [0.25, 0.10, 0.25, 0.15, 0.15, 0.10];

  const breakfastCal = Math.round(goalCalories * mealDistribution[0]);
  const snack1Cal = Math.round(goalCalories * mealDistribution[1]);
  const lunchCal = Math.round(goalCalories * mealDistribution[2]);
  const preworkoutCal = Math.round(goalCalories * mealDistribution[3]);
  const postworkoutCal = Math.round(goalCalories * mealDistribution[4]);
  const dinnerCal = Math.round(goalCalories * mealDistribution[5]);

  const proteinPerMeal = Math.round(macros.protein / 6);

  const breakfast: Meal = {
    name: 'High-Protein Arabic Breakfast',
    nameAr: 'فطور عربي عالي البروتين',
    time: '07:00',
    calories: breakfastCal,
    protein: proteinPerMeal,
    carbs: Math.round(breakfastCal * 0.45 / 4),
    fats: Math.round(breakfastCal * 0.25 / 9),
    fiber: 4,
    ingredients: [
      { name: 'Eggs', nameAr: 'بيض', amount: 4, unit: 'whole', calories: 280, protein: 24, carbs: 2, fats: 20 },
      { name: 'Whole Wheat Arabic Bread', nameAr: 'خبز عربي أسمر', amount: 60, unit: 'g', calories: 150, protein: 5, carbs: 30, fats: 2 },
      { name: 'Labneh (Strained Yogurt)', nameAr: 'لبنة', amount: 100, unit: 'g', calories: 100, protein: 6, carbs: 4, fats: 7 },
      { name: 'Cucumber', nameAr: 'خيار', amount: 100, unit: 'g', calories: 15, protein: 1, carbs: 3, fats: 0 },
      { name: 'Tomato', nameAr: 'طماطم', amount: 100, unit: 'g', calories: 20, protein: 1, carbs: 4, fats: 0 },
      { name: 'Olive Oil', nameAr: 'زيت زيتون', amount: 10, unit: 'ml', calories: 90, protein: 0, carbs: 0, fats: 10 },
    ],
    instructions: [
      'Scramble or fry 4 eggs with minimal oil',
      'Toast Arabic bread lightly',
      'Serve with labneh, sliced cucumber and tomatoes',
      'Drizzle olive oil over labneh',
    ],
  };

  const snack1: Meal = {
    name: 'Dates & Greek Yogurt Snack',
    nameAr: 'وجبة خفيفة: تمر ويوغرت يوناني',
    time: '10:00',
    calories: snack1Cal,
    protein: Math.round(proteinPerMeal * 0.6),
    carbs: Math.round(snack1Cal * 0.55 / 4),
    fats: Math.round(snack1Cal * 0.15 / 9),
    fiber: 2,
    ingredients: [
      { name: 'Greek Yogurt', nameAr: 'يوغرت يوناني', amount: 150, unit: 'g', calories: 100, protein: 15, carbs: 6, fats: 0 },
      { name: 'Dates', nameAr: 'تمر', amount: 30, unit: 'g (3-4 dates)', calories: 83, protein: 1, carbs: 22, fats: 0 },
      { name: 'Almonds', nameAr: 'لوز', amount: 20, unit: 'g', calories: 116, protein: 4, carbs: 4, fats: 10 },
    ],
    instructions: [
      'Pour Greek yogurt into a bowl',
      'Pit and slice dates, add on top',
      'Add almonds for healthy fats and crunch',
    ],
  };

  const mainProtein = isVegetarian
    ? { name: 'Grilled Falafel Patty', nameAr: 'فلافل مشوية', amount: 150, unit: 'g', calories: 200, protein: 10, carbs: 20, fats: 8 }
    : { name: 'Grilled Chicken Breast', nameAr: 'صدر دجاج مشوي', amount: 200, unit: 'g', calories: 220, protein: 44, carbs: 0, fats: 5 };

  const lunch: Meal = {
    name: isVegetarian ? 'Vegetarian Kabsa' : 'Healthy Chicken Kabsa',
    nameAr: isVegetarian ? 'كبسة خضار' : 'كبسة دجاج صحية',
    time: '13:00',
    calories: lunchCal,
    protein: Math.round(proteinPerMeal * 1.5),
    carbs: Math.round(lunchCal * 0.45 / 4),
    fats: Math.round(lunchCal * 0.20 / 9),
    fiber: 5,
    ingredients: [
      mainProtein,
      { name: 'Basmati Rice (cooked)', nameAr: 'أرز بسمتي مطبوخ', amount: 200, unit: 'g', calories: 260, protein: 5, carbs: 56, fats: 0 },
      { name: 'Mixed Vegetables', nameAr: 'خضار مشكلة', amount: 100, unit: 'g', calories: 40, protein: 2, carbs: 8, fats: 0 },
      { name: 'Tomato Sauce (kabsa base)', nameAr: 'صلصة طماطم', amount: 50, unit: 'g', calories: 20, protein: 1, carbs: 4, fats: 0 },
      { name: 'Kabsa Spice Mix', nameAr: 'بهارات كبسة', amount: 5, unit: 'g', calories: 15, protein: 0, carbs: 3, fats: 0 },
    ],
    instructions: [
      'Cook basmati rice in chicken/vegetable broth with kabsa spices',
      'Grill chicken breast or prepare falafel separately',
      'Sauté vegetables in minimal olive oil',
      'Serve protein over rice with vegetables on side',
    ],
  };

  const preworkout: Meal = {
    name: 'Pre-Workout Fuel',
    nameAr: 'وجبة ما قبل التمرين',
    time: '16:30',
    calories: preworkoutCal,
    protein: proteinPerMeal,
    carbs: Math.round(preworkoutCal * 0.55 / 4),
    fats: Math.round(preworkoutCal * 0.15 / 9),
    fiber: 3,
    ingredients: [
      { name: 'Oats', nameAr: 'شوفان', amount: 60, unit: 'g', calories: 228, protein: 8, carbs: 39, fats: 4 },
      { name: 'Banana', nameAr: 'موزة', amount: 120, unit: 'g (1 medium)', calories: 107, protein: 1, carbs: 27, fats: 0 },
      { name: 'Whey Protein Powder', nameAr: 'بروتين واي', amount: 30, unit: 'g (1 scoop)', calories: 120, protein: 25, carbs: 3, fats: 2 },
      { name: 'Milk (low fat)', nameAr: 'حليب قليل الدسم', amount: 200, unit: 'ml', calories: 90, protein: 7, carbs: 10, fats: 2 },
    ],
    instructions: [
      'Prepare oats with milk or water 60-90 minutes before training',
      'Add banana slices on top',
      'Mix protein powder separately in 200ml water, drink 30 min before training',
    ],
  };

  const postworkout: Meal = {
    name: 'Post-Workout Recovery Meal',
    nameAr: 'وجبة ما بعد التمرين',
    time: '19:30',
    calories: postworkoutCal,
    protein: Math.round(proteinPerMeal * 1.4),
    carbs: Math.round(postworkoutCal * 0.50 / 4),
    fats: Math.round(postworkoutCal * 0.15 / 9),
    fiber: 2,
    ingredients: [
      { name: 'Tuna in Water (canned)', nameAr: 'تونة بالماء', amount: 170, unit: 'g (1 can)', calories: 160, protein: 38, carbs: 0, fats: 1 },
      { name: 'Sweet Potato', nameAr: 'بطاطا حلوة', amount: 200, unit: 'g', calories: 172, protein: 3, carbs: 40, fats: 0 },
      { name: 'Broccoli', nameAr: 'بروكلي', amount: 100, unit: 'g', calories: 34, protein: 3, carbs: 7, fats: 0 },
    ],
    instructions: [
      'Bake or microwave sweet potato until soft',
      'Steam broccoli for 4-5 minutes',
      'Season tuna with lemon, salt, pepper',
      'Eat within 30-60 minutes of finishing workout',
    ],
  };

  const dinner: Meal = {
    name: 'Light Protein Dinner',
    nameAr: 'عشاء خفيف عالي البروتين',
    time: '21:30',
    calories: dinnerCal,
    protein: proteinPerMeal,
    carbs: Math.round(dinnerCal * 0.25 / 4),
    fats: Math.round(dinnerCal * 0.30 / 9),
    fiber: 3,
    ingredients: [
      { name: 'Salmon Fillet', nameAr: 'سمك سالمون', amount: 150, unit: 'g', calories: 280, protein: 32, carbs: 0, fats: 16 },
      { name: 'Mixed Green Salad', nameAr: 'سلطة خضراء', amount: 150, unit: 'g', calories: 30, protein: 2, carbs: 5, fats: 0 },
      { name: 'Olive Oil & Lemon Dressing', nameAr: 'تتبيلة زيت زيتون وليمون', amount: 15, unit: 'ml', calories: 120, protein: 0, carbs: 1, fats: 13 },
    ],
    instructions: [
      'Season salmon with garlic, lemon, herbs',
      'Bake at 200°C for 15-18 minutes or pan-sear',
      'Toss salad with olive oil and lemon dressing',
      'Keep dinner lighter to support sleep quality',
    ],
  };

  return [breakfast, snack1, lunch, preworkout, postworkout, dinner];
}

function generateWesternMeals(goalCalories: number, macros: MacroData, isVegetarian: boolean, isBudget: boolean): Meal[] {
  const mealDistribution = [0.25, 0.10, 0.25, 0.15, 0.15, 0.10];

  const breakfastCal = Math.round(goalCalories * mealDistribution[0]);
  const snack1Cal = Math.round(goalCalories * mealDistribution[1]);
  const lunchCal = Math.round(goalCalories * mealDistribution[2]);
  const preworkoutCal = Math.round(goalCalories * mealDistribution[3]);
  const postworkoutCal = Math.round(goalCalories * mealDistribution[4]);
  const dinnerCal = Math.round(goalCalories * mealDistribution[5]);

  const proteinPerMeal = Math.round(macros.protein / 6);

  const breakfast: Meal = {
    name: 'Power Oatmeal Breakfast',
    time: '07:00',
    calories: breakfastCal,
    protein: proteinPerMeal,
    carbs: Math.round(breakfastCal * 0.50 / 4),
    fats: Math.round(breakfastCal * 0.20 / 9),
    fiber: 6,
    ingredients: [
      { name: 'Oats', amount: 80, unit: 'g', calories: 304, protein: 11, carbs: 54, fats: 5 },
      { name: 'Whey Protein', amount: 30, unit: 'g', calories: 120, protein: 25, carbs: 3, fats: 2 },
      { name: 'Blueberries', amount: 100, unit: 'g', calories: 57, protein: 1, carbs: 14, fats: 0 },
      { name: 'Almond Butter', amount: 20, unit: 'g', calories: 122, protein: 4, carbs: 3, fats: 11 },
      { name: 'Milk (2%)', amount: 200, unit: 'ml', calories: 104, protein: 7, carbs: 12, fats: 4 },
    ],
    instructions: [
      'Cook oats with milk for 3-4 minutes on stovetop',
      'Stir in protein powder off heat',
      'Top with blueberries and almond butter',
    ],
  };

  const snack1: Meal = {
    name: 'Greek Yogurt & Nuts',
    time: '10:30',
    calories: snack1Cal,
    protein: Math.round(proteinPerMeal * 0.7),
    carbs: Math.round(snack1Cal * 0.35 / 4),
    fats: Math.round(snack1Cal * 0.30 / 9),
    fiber: 2,
    ingredients: [
      { name: 'Greek Yogurt (0% fat)', amount: 200, unit: 'g', calories: 130, protein: 22, carbs: 8, fats: 0 },
      { name: 'Mixed Nuts', amount: 30, unit: 'g', calories: 180, protein: 5, carbs: 6, fats: 16 },
      { name: 'Honey', amount: 10, unit: 'g', calories: 30, protein: 0, carbs: 8, fats: 0 },
    ],
    instructions: [
      'Add yogurt to bowl, drizzle honey, top with nuts',
    ],
  };

  const mainProtein = isVegetarian
    ? { name: 'Tempeh', amount: 150, unit: 'g', calories: 297, protein: 31, carbs: 11, fats: 17 }
    : isBudget
    ? { name: 'Chicken Thighs (skinless)', amount: 200, unit: 'g', calories: 260, protein: 38, carbs: 0, fats: 10 }
    : { name: 'Chicken Breast', amount: 200, unit: 'g', calories: 220, protein: 44, carbs: 0, fats: 5 };

  const lunch: Meal = {
    name: 'Chicken Rice Bowl',
    time: '13:00',
    calories: lunchCal,
    protein: Math.round(proteinPerMeal * 1.5),
    carbs: Math.round(lunchCal * 0.45 / 4),
    fats: Math.round(lunchCal * 0.20 / 9),
    fiber: 5,
    ingredients: [
      mainProtein,
      { name: 'White Rice (cooked)', amount: 200, unit: 'g', calories: 260, protein: 5, carbs: 56, fats: 0 },
      { name: 'Broccoli', amount: 150, unit: 'g', calories: 51, protein: 4, carbs: 10, fats: 0 },
      { name: 'Olive Oil', amount: 10, unit: 'ml', calories: 90, protein: 0, carbs: 0, fats: 10 },
    ],
    instructions: [
      'Grill or bake protein with seasonings',
      'Cook rice and steam broccoli',
      'Drizzle olive oil, season to taste',
    ],
  };

  const preworkout: Meal = {
    name: 'Pre-Workout Meal',
    time: '16:30',
    calories: preworkoutCal,
    protein: proteinPerMeal,
    carbs: Math.round(preworkoutCal * 0.55 / 4),
    fats: Math.round(preworkoutCal * 0.15 / 9),
    fiber: 3,
    ingredients: [
      { name: 'Banana', amount: 120, unit: 'g', calories: 107, protein: 1, carbs: 27, fats: 0 },
      { name: 'Rice Cakes', amount: 60, unit: 'g', calories: 240, protein: 5, carbs: 50, fats: 2 },
      { name: 'Cottage Cheese', amount: 150, unit: 'g', calories: 130, protein: 18, carbs: 5, fats: 5 },
    ],
    instructions: [
      'Eat 60-90 minutes before training',
      'Pair cottage cheese with rice cakes and banana',
    ],
  };

  const postworkout: Meal = {
    name: 'Post-Workout Recovery',
    time: '19:30',
    calories: postworkoutCal,
    protein: Math.round(proteinPerMeal * 1.4),
    carbs: Math.round(postworkoutCal * 0.50 / 4),
    fats: Math.round(postworkoutCal * 0.10 / 9),
    fiber: 3,
    ingredients: [
      { name: 'Whey Protein', amount: 40, unit: 'g', calories: 160, protein: 33, carbs: 4, fats: 3 },
      { name: 'Sweet Potato', amount: 200, unit: 'g', calories: 172, protein: 3, carbs: 40, fats: 0 },
      { name: 'Spinach', amount: 50, unit: 'g', calories: 11, protein: 1, carbs: 2, fats: 0 },
    ],
    instructions: [
      'Drink protein shake immediately post workout',
      'Eat baked sweet potato and spinach 30-45 min later',
    ],
  };

  const dinner: Meal = {
    name: 'Salmon & Veggies Dinner',
    time: '21:00',
    calories: dinnerCal,
    protein: proteinPerMeal,
    carbs: Math.round(dinnerCal * 0.20 / 4),
    fats: Math.round(dinnerCal * 0.35 / 9),
    fiber: 4,
    ingredients: [
      { name: 'Salmon Fillet', amount: 150, unit: 'g', calories: 280, protein: 32, carbs: 0, fats: 16 },
      { name: 'Asparagus', amount: 100, unit: 'g', calories: 20, protein: 2, carbs: 4, fats: 0 },
      { name: 'Olive Oil', amount: 10, unit: 'ml', calories: 90, protein: 0, carbs: 0, fats: 10 },
    ],
    instructions: [
      'Pan-sear or bake salmon 15-18 minutes at 200°C',
      'Roast asparagus with olive oil and garlic',
      'Season with lemon, salt, pepper',
    ],
  };

  return [breakfast, snack1, lunch, preworkout, postworkout, dinner];
}

function generateShoppingList(meals: Meal[]): ShoppingItem[] {
  const itemMap = new Map<string, ShoppingItem>();

  meals.forEach(meal => {
    meal.ingredients.forEach(ing => {
      const key = ing.name.toLowerCase();
      if (itemMap.has(key)) {
        const existing = itemMap.get(key)!;
        const existingAmount = parseFloat(existing.amount);
        const newAmount = existingAmount + ing.amount;
        itemMap.set(key, { ...existing, amount: `${Math.round(newAmount * 7)} ${ing.unit}/week` });
      } else {
        itemMap.set(key, {
          name: ing.name,
          nameAr: ing.nameAr,
          amount: `${Math.round(ing.amount * 7)} ${ing.unit}/week`,
          category: categorizeIngredient(ing.name),
        });
      }
    });
  });

  return Array.from(itemMap.values()).sort((a, b) => a.category.localeCompare(b.category));
}

function categorizeIngredient(name: string): string {
  const lowerName = name.toLowerCase();
  if (['chicken', 'beef', 'salmon', 'tuna', 'steak', 'turkey', 'eggs', 'tempeh'].some(p => lowerName.includes(p))) {
    return 'Protein';
  }
  if (['oats', 'rice', 'bread', 'potato', 'banana', 'dates', 'pasta'].some(p => lowerName.includes(p))) {
    return 'Carbohydrates';
  }
  if (['olive oil', 'almond', 'nuts', 'butter', 'avocado'].some(p => lowerName.includes(p))) {
    return 'Fats';
  }
  if (['yogurt', 'milk', 'cheese', 'labneh'].some(p => lowerName.includes(p))) {
    return 'Dairy';
  }
  if (['broccoli', 'spinach', 'cucumber', 'tomato', 'asparagus', 'vegetable', 'salad'].some(p => lowerName.includes(p))) {
    return 'Vegetables';
  }
  if (['blueberries', 'fruit', 'berry'].some(p => lowerName.includes(p))) {
    return 'Fruits';
  }
  return 'Other';
}

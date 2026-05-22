import { UserProfile, WorkoutPlan, WorkoutDay, Exercise } from './types';

type ExerciseTemplate = Omit<Exercise, 'sets' | 'reps' | 'restTime' | 'weightRecommendation'> & {
  sets: { beginner: number; intermediate: number; advanced: number };
  reps: { beginner: string; intermediate: string; advanced: string };
  restTime: { beginner: number; intermediate: number; advanced: number };
  weightRecommendation: { beginner: string; intermediate: string; advanced: string };
};

const exerciseTemplates: Record<string, ExerciseTemplate> = {
  benchPress: {
    id: 'bench-press',
    name: 'Barbell Bench Press',
    nameAr: 'ضغط الصدر بالبار',
    targetMuscle: 'Chest',
    sets: { beginner: 3, intermediate: 4, advanced: 5 },
    reps: { beginner: '8-10', intermediate: '6-8', advanced: '4-6' },
    restTime: { beginner: 90, intermediate: 120, advanced: 180 },
    tempo: '3-1-1-0',
    weightRecommendation: { beginner: '50-60% of bodyweight', intermediate: '70-80% 1RM', advanced: '80-90% 1RM' },
    difficulty: 'medium',
    instructions: [
      'Lie flat on bench, feet firmly on floor',
      'Grip bar slightly wider than shoulder width',
      'Lower bar to mid-chest with control (3 seconds)',
      'Press explosively back to starting position',
      'Keep shoulder blades retracted throughout',
    ],
    alternative: 'Dumbbell Bench Press',
  },
  inclineDBPress: {
    id: 'incline-db-press',
    name: 'Incline Dumbbell Press',
    nameAr: 'ضغط الدمبل المائل',
    targetMuscle: 'Chest (Upper)',
    sets: { beginner: 3, intermediate: 3, advanced: 4 },
    reps: { beginner: '10-12', intermediate: '8-10', advanced: '8-10' },
    restTime: { beginner: 75, intermediate: 90, advanced: 120 },
    tempo: '3-1-1-0',
    weightRecommendation: { beginner: '12-16kg each', intermediate: '18-24kg each', advanced: '26-34kg each' },
    difficulty: 'medium',
    instructions: [
      'Set bench to 30-45 degree incline',
      'Hold dumbbells at shoulder level, palms facing forward',
      'Press up and slightly inward',
      'Lower with control to starting position',
      'Focus on upper chest contraction at the top',
    ],
    alternative: 'Incline Barbell Press',
  },
  cableFlyes: {
    id: 'cable-flyes',
    name: 'Cable Chest Flyes',
    nameAr: 'تمرين الفراشة بالكابل',
    targetMuscle: 'Chest',
    sets: { beginner: 3, intermediate: 3, advanced: 4 },
    reps: { beginner: '12-15', intermediate: '12-15', advanced: '10-12' },
    restTime: { beginner: 60, intermediate: 75, advanced: 90 },
    tempo: '2-1-2-0',
    weightRecommendation: { beginner: '10-15kg each side', intermediate: '15-20kg each side', advanced: '20-25kg each side' },
    difficulty: 'easy',
    instructions: [
      'Stand in cable machine with handles at shoulder height',
      'Step forward into stagger stance',
      'Bring handles together in front of chest',
      'Control the return with arms wide',
      'Keep slight bend in elbows throughout',
    ],
    alternative: 'Pec Deck Machine',
  },
  pullUps: {
    id: 'pull-ups',
    name: 'Pull-ups / Lat Pulldown',
    nameAr: 'سحب للأعلى',
    targetMuscle: 'Back (Lats)',
    sets: { beginner: 3, intermediate: 4, advanced: 4 },
    reps: { beginner: '5-8', intermediate: '8-10', advanced: '10-12' },
    restTime: { beginner: 90, intermediate: 90, advanced: 120 },
    tempo: '2-0-2-1',
    weightRecommendation: { beginner: 'Bodyweight / assisted', intermediate: 'Bodyweight', advanced: 'Bodyweight + weight' },
    difficulty: 'hard',
    instructions: [
      'Hang from bar with overhand grip, slightly wider than shoulders',
      'Retract shoulder blades before pulling',
      'Pull chin above bar by driving elbows down',
      'Lower slowly with control',
      'Beginners: use lat pulldown machine instead',
    ],
    alternative: 'Lat Pulldown',
  },
  barbellRow: {
    id: 'barbell-row',
    name: 'Barbell Bent-Over Row',
    nameAr: 'تجديف الظهر بالبار',
    targetMuscle: 'Back (Mid)',
    sets: { beginner: 3, intermediate: 4, advanced: 4 },
    reps: { beginner: '8-10', intermediate: '6-8', advanced: '6-8' },
    restTime: { beginner: 90, intermediate: 120, advanced: 120 },
    tempo: '2-1-1-0',
    weightRecommendation: { beginner: '40-50% bodyweight', intermediate: '60-70% 1RM', advanced: '75-85% 1RM' },
    difficulty: 'hard',
    instructions: [
      'Hinge at hips until torso is ~45 degrees',
      'Grip bar slightly wider than shoulder width',
      'Pull bar to lower abdomen, lead with elbows',
      'Squeeze back muscles at top',
      'Lower with control while maintaining hinge position',
    ],
    alternative: 'Dumbbell Row',
  },
  cableRow: {
    id: 'cable-row',
    name: 'Seated Cable Row',
    nameAr: 'تجديف بالكابل',
    targetMuscle: 'Back (Mid/Lower)',
    sets: { beginner: 3, intermediate: 3, advanced: 4 },
    reps: { beginner: '10-12', intermediate: '10-12', advanced: '8-10' },
    restTime: { beginner: 75, intermediate: 90, advanced: 90 },
    tempo: '2-1-2-0',
    weightRecommendation: { beginner: '40-60kg', intermediate: '60-80kg', advanced: '80-100kg' },
    difficulty: 'easy',
    instructions: [
      'Sit upright at cable row station',
      'Feet on platform, slight knee bend',
      'Pull handle to lower abdomen',
      'Keep chest up and avoid rounding back',
      'Squeeze shoulder blades at peak contraction',
    ],
    alternative: 'Machine Row',
  },
  ohp: {
    id: 'ohp',
    name: 'Overhead Press (OHP)',
    nameAr: 'الضغط فوق الرأس',
    targetMuscle: 'Shoulders',
    sets: { beginner: 3, intermediate: 4, advanced: 4 },
    reps: { beginner: '8-10', intermediate: '6-8', advanced: '5-7' },
    restTime: { beginner: 90, intermediate: 120, advanced: 150 },
    tempo: '2-1-1-0',
    weightRecommendation: { beginner: '30-40% bodyweight', intermediate: '45-55% 1RM', advanced: '65-75% 1RM' },
    difficulty: 'medium',
    instructions: [
      'Stand with barbell at upper chest, grip slightly wider than shoulders',
      'Press bar overhead, slightly back to avoid lower back stress',
      'Lock out elbows at top',
      'Lower controlled to starting position',
      'Keep core braced throughout',
    ],
    alternative: 'Dumbbell Shoulder Press',
  },
  lateralRaises: {
    id: 'lateral-raises',
    name: 'Lateral Raises',
    nameAr: 'رفع جانبي للأكتاف',
    targetMuscle: 'Shoulders (Lateral)',
    sets: { beginner: 3, intermediate: 3, advanced: 4 },
    reps: { beginner: '12-15', intermediate: '12-15', advanced: '12-15' },
    restTime: { beginner: 60, intermediate: 60, advanced: 75 },
    tempo: '2-1-2-0',
    weightRecommendation: { beginner: '5-8kg each', intermediate: '8-12kg each', advanced: '12-16kg each' },
    difficulty: 'easy',
    instructions: [
      'Stand upright holding dumbbells at sides',
      'Raise arms to shoulder height with slight bend in elbows',
      'Lead with pinky finger slightly up',
      'Lower slowly over 2 seconds',
      'Avoid using momentum or swinging',
    ],
    alternative: 'Cable Lateral Raises',
  },
  facePulls: {
    id: 'face-pulls',
    name: 'Face Pulls',
    nameAr: 'سحب للوجه',
    targetMuscle: 'Rear Delts / Rotator Cuff',
    sets: { beginner: 3, intermediate: 3, advanced: 3 },
    reps: { beginner: '15-20', intermediate: '15-20', advanced: '15-20' },
    restTime: { beginner: 60, intermediate: 60, advanced: 60 },
    tempo: '2-1-2-0',
    weightRecommendation: { beginner: '10-15kg', intermediate: '15-20kg', advanced: '20-25kg' },
    difficulty: 'easy',
    instructions: [
      'Set cable at face height with rope attachment',
      'Pull rope towards face, hands ending at ear level',
      'Externally rotate shoulders at end range',
      'Control return slowly',
      'Great for shoulder health and posture',
    ],
    alternative: 'Reverse Pec Deck',
  },
  squat: {
    id: 'squat',
    name: 'Barbell Back Squat',
    nameAr: 'القرفصاء بالبار',
    targetMuscle: 'Legs (Quads/Glutes)',
    sets: { beginner: 3, intermediate: 4, advanced: 5 },
    reps: { beginner: '8-10', intermediate: '6-8', advanced: '5-6' },
    restTime: { beginner: 120, intermediate: 150, advanced: 180 },
    tempo: '3-1-1-0',
    weightRecommendation: { beginner: '60-70% bodyweight', intermediate: '80-100% bodyweight', advanced: '120-140% bodyweight' },
    difficulty: 'hard',
    instructions: [
      'Bar rests on upper traps/rear delts',
      'Feet shoulder-width apart, toes slightly out',
      'Break at hips and knees simultaneously',
      'Descend until thighs parallel or below',
      'Drive through whole foot to stand',
    ],
    alternative: 'Leg Press',
  },
  legPress: {
    id: 'leg-press',
    name: 'Leg Press',
    nameAr: 'ضغط الأرجل',
    targetMuscle: 'Legs (Quads/Glutes)',
    sets: { beginner: 3, intermediate: 4, advanced: 4 },
    reps: { beginner: '10-12', intermediate: '8-10', advanced: '8-10' },
    restTime: { beginner: 90, intermediate: 120, advanced: 120 },
    tempo: '3-1-1-0',
    weightRecommendation: { beginner: '80-120kg', intermediate: '120-180kg', advanced: '180-240kg' },
    difficulty: 'medium',
    instructions: [
      'Sit in leg press machine, feet hip-width on platform',
      'Lower platform until 90-degree knee angle',
      'Press through heels to full extension',
      'Do not lock out knees completely',
      'Control descent every rep',
    ],
    alternative: 'Hack Squat',
  },
  romanianDeadlift: {
    id: 'rdl',
    name: 'Romanian Deadlift (RDL)',
    nameAr: 'الرفعة الرومانية',
    targetMuscle: 'Legs (Hamstrings/Glutes)',
    sets: { beginner: 3, intermediate: 4, advanced: 4 },
    reps: { beginner: '10-12', intermediate: '8-10', advanced: '8-10' },
    restTime: { beginner: 90, intermediate: 120, advanced: 120 },
    tempo: '3-1-1-0',
    weightRecommendation: { beginner: '50-60% 1RM', intermediate: '65-75% 1RM', advanced: '75-85% 1RM' },
    difficulty: 'medium',
    instructions: [
      'Stand with barbell at hip level, overhand grip',
      'Push hips back and hinge forward',
      'Lower bar along legs to mid-shin',
      'Feel stretch in hamstrings at bottom',
      'Drive hips forward to stand tall',
    ],
    alternative: 'Dumbbell RDL',
  },
  legCurl: {
    id: 'leg-curl',
    name: 'Lying Leg Curl',
    nameAr: 'ثني الركبة',
    targetMuscle: 'Hamstrings',
    sets: { beginner: 3, intermediate: 3, advanced: 4 },
    reps: { beginner: '12-15', intermediate: '10-12', advanced: '10-12' },
    restTime: { beginner: 60, intermediate: 75, advanced: 90 },
    tempo: '2-1-2-0',
    weightRecommendation: { beginner: '30-40kg', intermediate: '40-55kg', advanced: '55-70kg' },
    difficulty: 'easy',
    instructions: [
      'Lie face down on leg curl machine',
      'Place roller just below calf muscles',
      'Curl heels toward glutes',
      'Hold briefly at peak contraction',
      'Lower slowly over 2 seconds',
    ],
    alternative: 'Nordic Hamstring Curl',
  },
  legExtension: {
    id: 'leg-extension',
    name: 'Leg Extension',
    nameAr: 'مد الركبة',
    targetMuscle: 'Quads',
    sets: { beginner: 3, intermediate: 3, advanced: 3 },
    reps: { beginner: '12-15', intermediate: '12-15', advanced: '12-15' },
    restTime: { beginner: 60, intermediate: 60, advanced: 60 },
    tempo: '2-1-2-0',
    weightRecommendation: { beginner: '30-45kg', intermediate: '45-60kg', advanced: '60-80kg' },
    difficulty: 'easy',
    instructions: [
      'Sit in machine with back firmly against pad',
      'Ankles behind roller pad, knees at 90 degrees',
      'Extend legs to near full extension',
      'Hold 1 second at top',
      'Lower controlled over 2 seconds',
    ],
    alternative: 'Wall Sit',
  },
  barbellCurls: {
    id: 'barbell-curls',
    name: 'Barbell Bicep Curls',
    nameAr: 'ثني الكوع بالبار',
    targetMuscle: 'Biceps',
    sets: { beginner: 3, intermediate: 3, advanced: 4 },
    reps: { beginner: '10-12', intermediate: '8-10', advanced: '8-10' },
    restTime: { beginner: 75, intermediate: 75, advanced: 90 },
    tempo: '2-1-2-0',
    weightRecommendation: { beginner: '20-30kg', intermediate: '30-45kg', advanced: '45-60kg' },
    difficulty: 'easy',
    instructions: [
      'Stand holding barbell with underhand grip, shoulder width',
      'Curl bar up keeping elbows at sides',
      'Squeeze biceps at top',
      'Lower slowly over 2 seconds',
      'Avoid swinging or using momentum',
    ],
    alternative: 'Dumbbell Bicep Curls',
  },
  tricepPushdown: {
    id: 'tricep-pushdown',
    name: 'Tricep Pushdown',
    nameAr: 'ضغط التراي سيبس',
    targetMuscle: 'Triceps',
    sets: { beginner: 3, intermediate: 3, advanced: 4 },
    reps: { beginner: '12-15', intermediate: '10-12', advanced: '10-12' },
    restTime: { beginner: 60, intermediate: 75, advanced: 90 },
    tempo: '2-1-2-0',
    weightRecommendation: { beginner: '20-30kg', intermediate: '30-45kg', advanced: '45-60kg' },
    difficulty: 'easy',
    instructions: [
      'Stand at cable station with rope or bar attachment at high position',
      'Hold attachment with overhand grip at chest level',
      'Push down until arms fully extended',
      'Elbows stay pinned to sides',
      'Control the return to starting position',
    ],
    alternative: 'Overhead Tricep Extension',
  },
  skullCrushers: {
    id: 'skull-crushers',
    name: 'EZ-Bar Skull Crushers',
    nameAr: 'تمرين كسر الجمجمة',
    targetMuscle: 'Triceps',
    sets: { beginner: 3, intermediate: 3, advanced: 3 },
    reps: { beginner: '10-12', intermediate: '8-10', advanced: '8-10' },
    restTime: { beginner: 75, intermediate: 90, advanced: 90 },
    tempo: '3-0-1-0',
    weightRecommendation: { beginner: '20-25kg', intermediate: '30-40kg', advanced: '40-55kg' },
    difficulty: 'medium',
    instructions: [
      'Lie on bench holding EZ-bar or dumbbells above chest',
      'Lower bar to forehead by bending elbows',
      'Keep upper arms vertical throughout',
      'Press back to starting position',
      'Focus on tricep stretch at bottom',
    ],
    alternative: 'Dumbbell Overhead Extension',
  },
  hammerCurls: {
    id: 'hammer-curls',
    name: 'Dumbbell Hammer Curls',
    nameAr: 'ثني الكوع المطرقة',
    targetMuscle: 'Biceps / Brachialis',
    sets: { beginner: 3, intermediate: 3, advanced: 3 },
    reps: { beginner: '10-12', intermediate: '10-12', advanced: '10-12' },
    restTime: { beginner: 60, intermediate: 60, advanced: 75 },
    tempo: '2-1-2-0',
    weightRecommendation: { beginner: '10-14kg each', intermediate: '14-18kg each', advanced: '18-24kg each' },
    difficulty: 'easy',
    instructions: [
      'Hold dumbbells with neutral grip (thumbs up)',
      'Curl up without rotating wrists',
      'Alternate arms or do both simultaneously',
      'Full squeeze at top',
      'Lower slowly and fully',
    ],
    alternative: 'Cable Hammer Curls',
  },
  calfRaises: {
    id: 'calf-raises',
    name: 'Standing Calf Raises',
    nameAr: 'رفع الكعب',
    targetMuscle: 'Calves',
    sets: { beginner: 3, intermediate: 4, advanced: 4 },
    reps: { beginner: '15-20', intermediate: '15-20', advanced: '12-15' },
    restTime: { beginner: 60, intermediate: 60, advanced: 60 },
    tempo: '2-2-1-0',
    weightRecommendation: { beginner: 'Bodyweight', intermediate: '30-50kg', advanced: '50-80kg' },
    difficulty: 'easy',
    instructions: [
      'Stand on edge of step or platform with heels hanging',
      'Lower heels below platform level (full stretch)',
      'Rise up on toes as high as possible',
      'Hold peak contraction for 2 seconds',
      'Lower slowly for full range of motion',
    ],
    alternative: 'Seated Calf Raises',
  },
  dips: {
    id: 'dips',
    name: 'Tricep Dips',
    nameAr: 'الغطس للتراي سيبس',
    targetMuscle: 'Triceps / Chest',
    sets: { beginner: 3, intermediate: 3, advanced: 4 },
    reps: { beginner: '8-10', intermediate: '10-12', advanced: '12-15' },
    restTime: { beginner: 90, intermediate: 90, advanced: 90 },
    tempo: '2-1-1-0',
    weightRecommendation: { beginner: 'Bodyweight / assisted', intermediate: 'Bodyweight', advanced: 'Bodyweight + weight' },
    difficulty: 'medium',
    instructions: [
      'Hold parallel bars with arms straight',
      'Keep torso upright for tricep focus',
      'Lower body until elbows at 90 degrees',
      'Press back up to full extension',
      'Avoid flaring elbows too wide',
    ],
    alternative: 'Close-Grip Bench Press',
  },
};

function buildExercise(template: ExerciseTemplate, experience: UserProfile['experience']): Exercise {
  return {
    id: template.id,
    name: template.name,
    nameAr: template.nameAr,
    targetMuscle: template.targetMuscle,
    sets: template.sets[experience],
    reps: template.reps[experience],
    restTime: template.restTime[experience],
    tempo: template.tempo,
    weightRecommendation: template.weightRecommendation[experience],
    difficulty: template.difficulty,
    instructions: template.instructions,
    alternative: template.alternative,
    videoUrl: template.videoUrl,
  };
}

function getCardio(goal: UserProfile['goal'], day: number) {
  if (goal === 'maintain' || goal === 'bulk') return undefined;

  const cardioOptions = [
    { type: 'Treadmill Incline Walk', duration: 20, intensity: 'low' as const, notes: '3.5-4.5 mph, 8-10% incline' },
    { type: 'Stationary Bike', duration: 20, intensity: 'moderate' as const, notes: 'Level 8-12, steady pace' },
    { type: 'Rowing Machine', duration: 15, intensity: 'moderate' as const, notes: '22-26 strokes per minute' },
  ];

  return cardioOptions[day % cardioOptions.length];
}

export function generateWorkoutPlan(profile: UserProfile): WorkoutPlan {
  const { workoutDays, experience, goal } = profile;
  const days: WorkoutDay[] = [];

  const warmupRoutine = [
    '5 min light cardio (treadmill or bike)',
    'Arm circles - 10 each direction',
    'Hip circles - 10 each direction',
    'Bodyweight squats - 15 reps',
    'Band pull-aparts - 15 reps',
  ];

  const cooldownRoutine = [
    'Chest stretch - 30 seconds each side',
    'Hip flexor stretch - 30 seconds each side',
    'Hamstring stretch - 30 seconds each side',
    'Shoulder cross-body stretch - 30 seconds each side',
    'Deep breathing - 1 minute',
  ];

  if (workoutDays === 4) {
    // Upper/Lower Split
    // Day 1: Upper A (Push focused)
    days.push({
      day: 1,
      name: 'Upper Body A',
      focus: 'Chest, Shoulders, Triceps',
      warmup: warmupRoutine,
      exercises: [
        buildExercise(exerciseTemplates.benchPress, experience),
        buildExercise(exerciseTemplates.inclineDBPress, experience),
        buildExercise(exerciseTemplates.ohp, experience),
        buildExercise(exerciseTemplates.lateralRaises, experience),
        buildExercise(exerciseTemplates.cableFlyes, experience),
        buildExercise(exerciseTemplates.tricepPushdown, experience),
      ],
      cooldown: cooldownRoutine,
      cardio: getCardio(goal, 0),
    });

    // Day 2: Lower A (Quad focused)
    days.push({
      day: 2,
      name: 'Lower Body A',
      focus: 'Quads, Glutes, Calves',
      warmup: warmupRoutine,
      exercises: [
        buildExercise(exerciseTemplates.squat, experience),
        buildExercise(exerciseTemplates.legPress, experience),
        buildExercise(exerciseTemplates.legExtension, experience),
        buildExercise(exerciseTemplates.calfRaises, experience),
      ],
      cooldown: cooldownRoutine,
      cardio: getCardio(goal, 1),
    });

    // Day 3: Upper B (Pull focused)
    days.push({
      day: 3,
      name: 'Upper Body B',
      focus: 'Back, Biceps, Rear Delts',
      warmup: warmupRoutine,
      exercises: [
        buildExercise(exerciseTemplates.pullUps, experience),
        buildExercise(exerciseTemplates.barbellRow, experience),
        buildExercise(exerciseTemplates.cableRow, experience),
        buildExercise(exerciseTemplates.facePulls, experience),
        buildExercise(exerciseTemplates.barbellCurls, experience),
        buildExercise(exerciseTemplates.hammerCurls, experience),
      ],
      cooldown: cooldownRoutine,
      cardio: getCardio(goal, 2),
    });

    // Day 4: Lower B (Hinge focused)
    days.push({
      day: 4,
      name: 'Lower Body B',
      focus: 'Hamstrings, Glutes, Calves',
      warmup: warmupRoutine,
      exercises: [
        buildExercise(exerciseTemplates.romanianDeadlift, experience),
        buildExercise(exerciseTemplates.legCurl, experience),
        buildExercise(exerciseTemplates.legPress, experience),
        buildExercise(exerciseTemplates.calfRaises, experience),
      ],
      cooldown: cooldownRoutine,
      cardio: getCardio(goal, 3),
    });
  } else {
    // 5-Day Push/Pull/Legs/Upper/Lower Split
    // Day 1: Push
    days.push({
      day: 1,
      name: 'Push Day',
      focus: 'Chest, Shoulders, Triceps',
      warmup: warmupRoutine,
      exercises: [
        buildExercise(exerciseTemplates.benchPress, experience),
        buildExercise(exerciseTemplates.inclineDBPress, experience),
        buildExercise(exerciseTemplates.ohp, experience),
        buildExercise(exerciseTemplates.lateralRaises, experience),
        buildExercise(exerciseTemplates.cableFlyes, experience),
        buildExercise(exerciseTemplates.tricepPushdown, experience),
        buildExercise(exerciseTemplates.skullCrushers, experience),
      ],
      cooldown: cooldownRoutine,
      cardio: getCardio(goal, 0),
    });

    // Day 2: Pull
    days.push({
      day: 2,
      name: 'Pull Day',
      focus: 'Back, Biceps, Rear Delts',
      warmup: warmupRoutine,
      exercises: [
        buildExercise(exerciseTemplates.pullUps, experience),
        buildExercise(exerciseTemplates.barbellRow, experience),
        buildExercise(exerciseTemplates.cableRow, experience),
        buildExercise(exerciseTemplates.facePulls, experience),
        buildExercise(exerciseTemplates.barbellCurls, experience),
        buildExercise(exerciseTemplates.hammerCurls, experience),
      ],
      cooldown: cooldownRoutine,
      cardio: getCardio(goal, 1),
    });

    // Day 3: Legs
    days.push({
      day: 3,
      name: 'Leg Day',
      focus: 'Quads, Hamstrings, Glutes, Calves',
      warmup: warmupRoutine,
      exercises: [
        buildExercise(exerciseTemplates.squat, experience),
        buildExercise(exerciseTemplates.legPress, experience),
        buildExercise(exerciseTemplates.romanianDeadlift, experience),
        buildExercise(exerciseTemplates.legCurl, experience),
        buildExercise(exerciseTemplates.legExtension, experience),
        buildExercise(exerciseTemplates.calfRaises, experience),
      ],
      cooldown: cooldownRoutine,
      cardio: getCardio(goal, 2),
    });

    // Day 4: Upper (Strength Focus)
    days.push({
      day: 4,
      name: 'Upper Body (Strength)',
      focus: 'Full Upper Body - Strength Focus',
      warmup: warmupRoutine,
      exercises: [
        buildExercise(exerciseTemplates.benchPress, experience),
        buildExercise(exerciseTemplates.barbellRow, experience),
        buildExercise(exerciseTemplates.ohp, experience),
        buildExercise(exerciseTemplates.pullUps, experience),
        buildExercise(exerciseTemplates.dips, experience),
      ],
      cooldown: cooldownRoutine,
      cardio: getCardio(goal, 3),
    });

    // Day 5: Lower (Volume Focus)
    days.push({
      day: 5,
      name: 'Lower Body (Volume)',
      focus: 'Full Lower Body - Volume Focus',
      warmup: warmupRoutine,
      exercises: [
        buildExercise(exerciseTemplates.squat, experience),
        buildExercise(exerciseTemplates.romanianDeadlift, experience),
        buildExercise(exerciseTemplates.legPress, experience),
        buildExercise(exerciseTemplates.legCurl, experience),
        buildExercise(exerciseTemplates.calfRaises, experience),
      ],
      cooldown: cooldownRoutine,
      cardio: getCardio(goal, 4),
    });
  }

  const progressionScheme = experience === 'beginner'
    ? 'Add 2.5kg to upper body lifts and 5kg to lower body lifts each week when you complete all sets and reps with good form.'
    : experience === 'intermediate'
    ? 'Progressive overload: add weight when you hit the top of your rep range for all sets. Deload every 4-6 weeks.'
    : 'Periodized programming: 3 weeks progressive loading followed by 1 deload week. Track daily and weekly PRs.';

  const weeklyVolume: Record<string, number> = {
    Chest: days.reduce((acc, d) => acc + d.exercises.filter(e => e.targetMuscle.includes('Chest')).reduce((s, e) => s + e.sets, 0), 0),
    Back: days.reduce((acc, d) => acc + d.exercises.filter(e => e.targetMuscle.includes('Back')).reduce((s, e) => s + e.sets, 0), 0),
    Shoulders: days.reduce((acc, d) => acc + d.exercises.filter(e => e.targetMuscle.includes('Shoulder')).reduce((s, e) => s + e.sets, 0), 0),
    Legs: days.reduce((acc, d) => acc + d.exercises.filter(e => e.targetMuscle.includes('Leg') || e.targetMuscle.includes('Quad') || e.targetMuscle.includes('Hamstring') || e.targetMuscle.includes('Glute')).reduce((s, e) => s + e.sets, 0), 0),
    Arms: days.reduce((acc, d) => acc + d.exercises.filter(e => e.targetMuscle.includes('Bicep') || e.targetMuscle.includes('Tricep')).reduce((s, e) => s + e.sets, 0), 0),
  };

  const splitName = workoutDays === 4 ? 'Upper/Lower Split (4 Day)' : 'Push/Pull/Legs + Upper/Lower (5 Day)';

  return {
    split: splitName,
    days,
    progressionScheme,
    weeklyVolume,
  };
}

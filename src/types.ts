export type DayOfWeek = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';

export interface Meal {
  id: string;
  name: string;
  description: string;
  details?: string;
  quantities?: string;
  ingredients?: string[];
}

export interface DailyDiet {
  breakfast: Meal;
  midMorning: Meal;
  lunch: Meal;
  snack: Meal;
  dinner: Meal;
}

export interface Exercise {
  id: string;
  name: string;
  description?: string;
  sets?: number;
  reps?: string;
  duration?: string;
  videoUrl?: string;
}

export interface DailyExercise {
  title: string;
  exercises: Exercise[];
}

export interface PadelMatch {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
}

export interface UserProfile {
  gender: 'male' | 'female' | 'other';
  age: number;
  height: number; // cm
  weight: number; // kg
  activityLevel: 'sedentary' | 'moderate' | 'active';
  goals?: string;
}

export interface UserProgress {
  completedMeals: Record<string, boolean>; // key: "YYYY-MM-DD-mealType"
  completedExercises: Record<string, boolean>; // key: "YYYY-MM-DD-exerciseId"
  favorites: string[]; // list of meal IDs
  shoppingListChecked: Record<string, boolean>; // key: "ingredientName"
  padelMatches: PadelMatch[];
  profile?: UserProfile;
}

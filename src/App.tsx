/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, 
  Dumbbell, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Play,
  Info,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  History,
  ShoppingBag,
  Star,
  ChevronDown,
  ChevronUp,
  Scale,
  User,
  Activity,
  Trash2
} from 'lucide-react';
import { MEAL_POOL, EXERCISE_PLAN, DAYS, STRENGTH_ROUTINE } from './constants';
import { DayOfWeek, Meal, UserProgress, PadelMatch, UserProfile } from './types';

// Helper to adjust quantities based on profile
const adjustQuantities = (quantities: string, profile?: UserProfile): string => {
  if (!profile || !quantities) return quantities;
  
  // Very simple heuristic: scale by weight relative to 70kg
  const weightFactor = profile.weight / 70;
  const genderFactor = profile.gender === 'male' ? 1.1 : 1.0;
  const totalFactor = weightFactor * genderFactor;
  
  if (totalFactor > 1.15) {
    return quantities.replace(/(\d+)/g, (match) => Math.round(parseInt(match) * 1.2).toString()) + " (Ajustado +20% por peso/género)";
  } else if (totalFactor < 0.85) {
    return quantities.replace(/(\d+)/g, (match) => Math.round(parseInt(match) * 0.8).toString()) + " (Ajustado -20% por peso/género)";
  }
  
  return quantities;
};

// Helper to get a deterministic meal for a date
const getMealForDate = (date: Date, type: string, favorites: string[], hasPadel: boolean, profile?: UserProfile): Meal => {
  let poolKey = type;
  if (hasPadel) {
    if (type === 'lunch') poolKey = 'padel_lunch';
    if (type === 'dinner') poolKey = 'padel_dinner';
  }
  
  let pool = MEAL_POOL[poolKey] || MEAL_POOL[type] || [];
  if (pool.length === 0) return { id: 'none', name: 'N/A', description: 'N/A' };

  // Goal-based filtering/prioritization
  if (profile?.goals) {
    const goals = profile.goals.toLowerCase();
    if (goals.includes('colesterol')) {
      const heartHealthyKeywords = ['avena', 'chía', 'nueces', 'salmón', 'atún', 'merluza', 'pescado', 'verduras'];
      const prioritized = pool.filter(m => 
        heartHealthyKeywords.some(kw => m.description.toLowerCase().includes(kw))
      );
      if (prioritized.length > 0) pool = prioritized;
    }
    if (goals.includes('barriga') || goals.includes('abdomen') || goals.includes('grasa')) {
      const leanKeywords = ['pollo', 'pavo', 'verduras', 'ensalada', 'pescado blanco'];
      const prioritized = pool.filter(m => 
        leanKeywords.some(kw => m.description.toLowerCase().includes(kw))
      );
      if (prioritized.length > 0) pool = prioritized;
    }
  }

  // Prioritize favorites if they are in the pool for this type
  const favoriteInPool = pool.filter(m => favorites.includes(m.id));
  
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const useFavorite = favoriteInPool.length > 0 && (seed % 10) < 4;
  
  const baseMeal = useFavorite 
    ? favoriteInPool[seed % favoriteInPool.length]
    : pool[seed % pool.length];

  return {
    ...baseMeal,
    quantities: adjustQuantities(baseMeal.quantities || '', profile)
  };
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'diet' | 'exercise' | 'progress' | 'shopping' | 'profile'>('diet');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('fitapp_progress_v3');
    const defaultState: UserProgress = {
      completedMeals: {},
      completedExercises: {},
      favorites: [],
      shoppingListChecked: {},
      padelMatches: [],
      profile: {
        gender: 'female',
        age: 35,
        height: 165,
        weight: 70,
        activityLevel: 'moderate',
        goals: ''
      }
    };
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultState, ...parsed };
      } catch (e) {
        return defaultState;
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('fitapp_progress_v3', JSON.stringify(progress));
  }, [progress]);

  const dateString = useMemo(() => currentDate.toISOString().split('T')[0], [currentDate]);
  
  const hasPadelToday = useMemo(() => {
    return (progress.padelMatches || []).some(m => m.date === dateString);
  }, [progress.padelMatches, dateString]);

  const padelMatchToday = useMemo(() => {
    return (progress.padelMatches || []).find(m => m.date === dateString);
  }, [progress.padelMatches, dateString]);

  const currentDiet = useMemo(() => {
    return {
      breakfast: getMealForDate(currentDate, 'breakfast', progress.favorites, hasPadelToday, progress.profile),
      midMorning: getMealForDate(currentDate, 'midMorning', progress.favorites, hasPadelToday, progress.profile),
      lunch: getMealForDate(currentDate, 'lunch', progress.favorites, hasPadelToday, progress.profile),
      snack: getMealForDate(currentDate, 'snack', progress.favorites, hasPadelToday, progress.profile),
      dinner: getMealForDate(currentDate, 'dinner', progress.favorites, hasPadelToday, progress.profile),
    };
  }, [currentDate, progress.favorites, hasPadelToday, progress.profile]);

  const selectedDay = useMemo(() => {
    const daysMap: Record<number, DayOfWeek> = {
      1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 0: 'Domingo'
    };
    return daysMap[currentDate.getDay()];
  }, [currentDate]);

  const toggleItem = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const key = `${dateString}-${id}`;
    setProgress(prev => {
      if (id.startsWith('diet-')) {
        return {
          ...prev,
          completedMeals: { ...prev.completedMeals, [key]: !prev.completedMeals[key] }
        };
      } else {
        return {
          ...prev,
          completedExercises: { ...prev.completedExercises, [key]: !prev.completedExercises[key] }
        };
      }
    });
  };

  const toggleFavorite = (mealId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProgress(prev => {
      const isFav = prev.favorites.includes(mealId);
      return {
        ...prev,
        favorites: isFav 
          ? prev.favorites.filter(id => id !== mealId)
          : [...prev.favorites, mealId]
      };
    });
  };

  const toggleShoppingItem = (ingredient: string) => {
    setProgress(prev => ({
      ...prev,
      shoppingListChecked: {
        ...prev.shoppingListChecked,
        [ingredient]: !prev.shoppingListChecked[ingredient]
      }
    }));
  };

  const changeDate = (days: number) => {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + days);
    setCurrentDate(next);
    setExpandedMeal(null);
    setExpandedExercise(null);
  };

  const currentExercise = useMemo(() => {
    const base = EXERCISE_PLAN[selectedDay];
    let exercises = [...base.exercises];

    // Adjust reps/sets based on profile
    if (progress.profile) {
      const { weight, age, activityLevel, goals } = progress.profile;
      
      // Goal-based exercise additions
      if (goals) {
        const goalsLower = goals.toLowerCase();
        if (goalsLower.includes('barriga') || goalsLower.includes('abdomen') || goalsLower.includes('grasa')) {
          // Add core exercises if not present
          const coreIds = ['plank', 'crunches', 'leg_raises'];
          coreIds.forEach(id => {
            if (!exercises.some(ex => ex.id === id)) {
              const coreEx = STRENGTH_ROUTINE.find(e => e.id === id);
              if (coreEx) exercises.push({ ...coreEx, name: `${coreEx.name} (Objetivo: Abdomen)` });
            }
          });
        }
      }

      exercises = exercises.map(ex => {
        let adjustedSets = ex.sets || 3;
        let adjustedReps = ex.reps;

        if (weight > 90 && (ex.id === 'squats' || ex.id === 'lunges')) {
          // Reduce reps for heavy weight to protect knees, maybe add a set
          adjustedReps = '10 reps (Ajustado por peso)';
          adjustedSets = (ex.sets || 3) + 1;
        } else if (activityLevel === 'active') {
          adjustedSets = (ex.sets || 3) + 1;
        } else if (activityLevel === 'sedentary') {
          adjustedSets = Math.max(2, (ex.sets || 3) - 1);
        }

        return { ...ex, sets: adjustedSets, reps: adjustedReps };
      });
    }

    if (hasPadelToday && padelMatchToday) {
      return {
        title: `Pádel (${padelMatchToday.time})`,
        exercises: [
          { 
            id: 'padel', 
            name: 'Partido de Pádel', 
            duration: '60-90 min',
            description: `Partido programado a las ${padelMatchToday.time}. ¡A por todas!`
          }
        ]
      };
    }
    return { ...base, exercises };
  }, [selectedDay, hasPadelToday, padelMatchToday, progress.profile]);

  const getDayProgress = (date: Date) => {
    const dStr = date.toISOString().split('T')[0];
    const daysMap: Record<number, DayOfWeek> = {
      1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 0: 'Domingo'
    };
    const dayName = daysMap[date.getDay()];
    
    const hasPadelOnDate = (progress.padelMatches || []).some(m => m.date === dStr);
    const padelOnDate = (progress.padelMatches || []).find(m => m.date === dStr);

    const dietItems = ['breakfast', 'midMorning', 'lunch', 'snack', 'dinner'];
    let exerciseItems: string[] = [];
    
    if (hasPadelOnDate) {
      exerciseItems = ['padel'];
    } else {
      exerciseItems = EXERCISE_PLAN[dayName].exercises.map(e => e.id);
    }
    
    const total = dietItems.length + exerciseItems.length;
    const completed = [
      ...dietItems.map(type => `diet-${type}`),
      ...exerciseItems.map(id => `ex-${id}`)
    ].filter(id => {
      const key = `${dStr}-${id}`;
      return id.startsWith('diet-') ? progress.completedMeals[key] : progress.completedExercises[key];
    }).length;

    return total > 0 ? (completed / total) * 100 : 0;
  };

  const shoppingList = useMemo(() => {
    const totals: Record<string, { amount: number; unit: string; originalItems: string[] }> = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Look 8 days ahead from today
    for (let i = 0; i < 8; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dStr = d.toISOString().split('T')[0];
      const hasPadelOnDate = (progress.padelMatches || []).some(m => m.date === dStr);
      
      const dayMeals = {
        breakfast: getMealForDate(d, 'breakfast', progress.favorites, hasPadelOnDate, progress.profile),
        midMorning: getMealForDate(d, 'midMorning', progress.favorites, hasPadelOnDate, progress.profile),
        lunch: getMealForDate(d, 'lunch', progress.favorites, hasPadelOnDate, progress.profile),
        snack: getMealForDate(d, 'snack', progress.favorites, hasPadelOnDate, progress.profile),
        dinner: getMealForDate(d, 'dinner', progress.favorites, hasPadelOnDate, progress.profile),
      };

      Object.values(dayMeals).forEach(meal => {
        if (meal.ingredients) {
          const qtyParts = (meal.quantities || '').split(',').map(q => q.trim());
          meal.ingredients.forEach(ing => {
            const matchingQty = qtyParts.find(q => q.toLowerCase().includes(ing.toLowerCase())) || ing;
            
            // Basic parsing of quantity (e.g., "150g pechuga" -> 150, "g", "1/2 calabacín" -> 0.5)
            const fractionMatch = matchingQty.match(/(\d+)\/(\d+)/);
            let amount = 1;
            let unit = 'unidad';

            if (fractionMatch) {
              amount = parseInt(fractionMatch[1]) / parseInt(fractionMatch[2]);
            } else {
              const numMatch = matchingQty.match(/(\d+(?:\.\d+)?)/);
              if (numMatch) amount = parseFloat(numMatch[1]);
            }

            const unitMatch = matchingQty.match(/[a-zA-Záéíóúñ]+/g);
            if (unitMatch) {
              // Filter out the ingredient name itself from potential units
              const potentialUnit = unitMatch.find(u => 
                u.toLowerCase() !== ing.toLowerCase() && 
                !ing.toLowerCase().includes(u.toLowerCase()) &&
                ['g', 'gr', 'ml', 'l', 'kg', 'rebanada', 'docena', 'pack', 'bolsa', 'uds', 'unidad', 'taza', 'cdta', 'cdas', 'bol'].includes(u.toLowerCase())
              );
              if (potentialUnit) unit = potentialUnit.toLowerCase();
            }

            if (!totals[ing]) {
              totals[ing] = { amount: 0, unit, originalItems: [] };
            }
            
            // Normalize units for summing
            if (unit === 'g' || unit === 'gr') {
              totals[ing].amount += amount;
              totals[ing].unit = 'g';
            } else if (unit === 'kg') {
              totals[ing].amount += amount * 1000;
              totals[ing].unit = 'g';
            } else if (unit === 'ml') {
              totals[ing].amount += amount;
              totals[ing].unit = 'ml';
            } else if (unit === 'l') {
              totals[ing].amount += amount * 1000;
              totals[ing].unit = 'ml';
            } else {
              totals[ing].amount += amount;
              // Keep the last unit if it's not g/ml
              if (unit !== 'unidad') totals[ing].unit = unit;
            }
          });
        }
      });
    }
    
    return Object.entries(totals)
      .map(([name, data]) => {
        let displayQty = '';
        const nameLower = name.toLowerCase();
        
        // Supermarket logic (Mercadona style)
        if (data.unit === 'g') {
          // Greens usually go in bags of ~150g
          if (nameLower.includes('rúcula') || nameLower.includes('espinaca') || nameLower.includes('lechuga') || nameLower.includes('canónigo')) {
            const bags = Math.ceil(data.amount / 150);
            displayQty = `${data.amount}g (${bags} ${bags === 1 ? 'bolsa' : 'bolsas'})`;
          } else if (nameLower.includes('champiñón') || nameLower.includes('seta')) {
            const trays = Math.ceil(data.amount / 250); // Trays of 250g
            displayQty = `${data.amount}g (${trays} ${trays === 1 ? 'bandeja' : 'bandejas'})`;
          } else if (data.amount >= 1000) {
            displayQty = `${(data.amount / 1000).toFixed(1)} kg aprox.`;
          } else {
            displayQty = `${Math.ceil(data.amount)} g`;
          }
        } else if (data.unit === 'ml') {
          // Milk and liquids in 1L cartons
          if (nameLower.includes('leche') || data.amount >= 1000) {
            const liters = Math.ceil(data.amount / 1000);
            displayQty = `${(data.amount / 1000).toFixed(1)} L (${liters} ${liters === 1 ? 'brick' : 'bricks'})`;
          } else {
            displayQty = `${Math.ceil(data.amount)} ml`;
          }
        } else if (nameLower.includes('huevo')) {
          const dozens = Math.ceil(data.amount / 12);
          displayQty = `${data.amount} uds (${dozens} ${dozens === 1 ? 'docena' : 'docenas'})`;
        } else if (nameLower.includes('pan')) {
          // Assuming sliced bread (pan de molde) has ~20 slices per bag
          const bags = Math.ceil(data.amount / 20);
          displayQty = `${data.amount} rebanadas (${bags} ${bags === 1 ? 'bolsa' : 'bolsas'})`;
        } else if (nameLower.includes('yogur')) {
          const packs = Math.ceil(data.amount / 4);
          displayQty = `${data.amount} uds (${packs} ${packs === 1 ? 'pack' : 'packs'})`;
        } else if (nameLower.includes('pepino') || nameLower.includes('tomate') || nameLower.includes('calabacín') || nameLower.includes('pimiento') || nameLower.includes('zanahoria')) {
          // Vegetables usually sold by piece or weight
          displayQty = `${data.amount} ${data.amount === 1 ? 'unidad' : 'unidades'}`;
        } else {
          displayQty = `${Math.ceil(data.amount)} ${data.unit}${data.amount > 1 ? 's' : ''}`;
        }

        return {
          name,
          display: `${name} — ${displayQty}`
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [progress.favorites, progress.padelMatches, progress.profile]);

  const last7Days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' }).format(date);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans pb-24">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10 px-6 py-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">Fitapp</h1>
            <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">Objetivo: -8kg & Salud</p>
          </div>
          <div className="bg-stone-100 p-2 rounded-full">
            <TrendingDown className="w-5 h-5 text-stone-600" />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pt-6">
        {/* Date Navigation */}
        <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-stone-200 shadow-sm mb-6">
          <button 
            onClick={() => changeDate(-1)}
            className="p-2 hover:bg-stone-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-stone-400" />
          </button>
          <div className="text-center flex flex-col items-center">
            <p className="text-sm font-bold text-stone-900">{selectedDay}</p>
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{formatDate(currentDate)}</p>
            {currentDate.toDateString() !== new Date().toDateString() && (
              <button 
                onClick={() => setCurrentDate(new Date())}
                className="mt-1 text-[9px] font-bold text-emerald-600 uppercase tracking-tighter hover:underline"
              >
                Volver a Hoy
              </button>
            )}
          </div>
          <button 
            onClick={() => changeDate(1)}
            className="p-2 hover:bg-stone-100 rounded-xl transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-stone-400" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'diet' && (
            <motion.div
              key="diet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Utensils className="w-5 h-5 text-stone-400" />
                <h2 className="text-lg font-semibold">Menú del día</h2>
              </div>
              
              {(Object.entries(currentDiet) as [string, Meal][]).map(([type, meal]) => {
                const id = `diet-${type}`;
                const isCompleted = progress.completedMeals[`${dateString}-${id}`];
                const isExpanded = expandedMeal === type;
                const isFavorite = progress.favorites.includes(meal.id);
                
                return (
                  <div 
                    key={type}
                    onClick={() => setExpandedMeal(isExpanded ? null : type)}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isCompleted ? 'bg-stone-100 border-transparent opacity-60' : 'bg-white border-stone-200 shadow-sm'
                    }`}
                  >
                    <div className="p-4 flex items-start gap-4 cursor-pointer">
                      <div className="mt-1" onClick={(e) => toggleItem(id, e)}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-stone-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{meal.name}</p>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={(e) => toggleFavorite(meal.id, e)}
                              className={`p-1 rounded-full transition-colors ${isFavorite ? 'text-amber-400' : 'text-stone-300 hover:text-stone-400'}`}
                            >
                              <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                            </button>
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                          </div>
                        </div>
                        <p className={`text-sm leading-relaxed font-medium ${isCompleted ? 'line-through text-stone-500' : 'text-stone-800'}`}>
                          {meal.description}
                        </p>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-stone-100 bg-stone-50/50"
                        >
                          <div className="p-4 space-y-4">
                            {meal.quantities && (
                              <div className="flex items-start gap-3">
                                <Scale className="w-4 h-4 text-stone-400 mt-0.5" />
                                <div>
                                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Cantidades</p>
                                  <p className="text-sm text-stone-700">{meal.quantities}</p>
                                </div>
                              </div>
                            )}
                            {meal.details && (
                              <div className="flex items-start gap-3">
                                <Info className="w-4 h-4 text-stone-400 mt-0.5" />
                                <div>
                                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Detalles</p>
                                  <p className="text-sm text-stone-600 leading-relaxed italic">{meal.details}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 mt-6">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    <strong>Tip:</strong> Bebe 1.5-2L de agua al día. Evita el alcohol y los ultraprocesados para proteger tu hígado.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'exercise' && (
            <motion.div
              key="exercise"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell className="w-5 h-5 text-stone-400" />
                <h2 className="text-lg font-semibold">{currentExercise.title}</h2>
              </div>

              {currentExercise.exercises.map((ex) => {
                const id = `ex-${ex.id}`;
                const isCompleted = progress.completedExercises[`${dateString}-${id}`];
                const isExpanded = expandedExercise === ex.id;
                
                return (
                  <div 
                    key={ex.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isCompleted ? 'bg-stone-100 border-transparent opacity-60' : 'bg-white border-stone-200 shadow-sm'
                    }`}
                  >
                    <div 
                      className="p-4 flex items-center gap-4 cursor-pointer"
                      onClick={() => setExpandedExercise(isExpanded ? null : ex.id)}
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItem(id);
                        }} 
                        className="mt-0"
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-stone-300" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className={`text-sm font-semibold ${isCompleted ? 'line-through text-stone-500' : 'text-stone-800'}`}>
                            {ex.name}
                          </p>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {ex.sets ? `${ex.sets} series x ` : ''}{ex.reps || ex.duration}
                        </p>
                      </div>
                      {ex.videoUrl && (
                        <a 
                          href={ex.videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 bg-stone-100 rounded-full text-stone-600 hover:bg-stone-200 transition-colors"
                        >
                          <Play className="w-4 h-4 fill-current" />
                        </a>
                      )}
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-stone-100 bg-stone-50/50"
                        >
                          <div className="p-4 space-y-3">
                            {ex.description && (
                              <div className="flex items-start gap-3">
                                <Info className="w-4 h-4 text-stone-400 mt-0.5" />
                                <div>
                                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Instrucciones</p>
                                  <p className="text-xs text-stone-600 leading-relaxed">{ex.description}</p>
                                </div>
                              </div>
                            )}
                            <div className="flex gap-4">
                              {ex.sets && (
                                <div>
                                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Series</p>
                                  <p className="text-sm font-bold text-stone-900">{ex.sets}</p>
                                </div>
                              )}
                              {(ex.reps || ex.duration) && (
                                <div>
                                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                    {ex.reps ? 'Reps' : 'Duración'}
                                  </p>
                                  <p className="text-sm font-bold text-stone-900">{ex.reps || ex.duration}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Padel Match Scheduler */}
              <div className="bg-stone-900 text-white p-6 rounded-3xl mt-6 shadow-xl overflow-hidden relative">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-bold">Programar Pádel</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input 
                        type="time" 
                        id="padelTime"
                        className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        defaultValue="18:00"
                      />
                      <button 
                        onClick={() => {
                          const timeInput = document.getElementById('padelTime') as HTMLInputElement;
                          const time = timeInput.value || '18:00';
                          setProgress(prev => {
                            const matches = prev.padelMatches || [];
                            const exists = matches.some(m => m.date === dateString);
                            if (exists) {
                              return {
                                ...prev,
                                padelMatches: matches.map(m => m.date === dateString ? { ...m, time } : m)
                              };
                            }
                            return {
                              ...prev,
                              padelMatches: [...matches, { id: Math.random().toString(36).substr(2, 9), date: dateString, time }]
                            };
                          });
                        }}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                      >
                        {hasPadelToday ? 'Actualizar' : 'Añadir'}
                      </button>
                    </div>

                    {hasPadelToday && (
                      <div className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <p className="text-sm font-medium">Partido hoy a las {padelMatchToday?.time}</p>
                        </div>
                        <button 
                          onClick={() => {
                            setProgress(prev => ({
                              ...prev,
                              padelMatches: (prev.padelMatches || []).filter(m => m.date !== dateString)
                            }));
                          }}
                          className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-widest"
                        >
                          Quitar
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-[10px] text-stone-400 mt-4 leading-relaxed">
                    Al añadir un partido, ajustaremos tus ejercicios y tu dieta para que tengas el máximo rendimiento.
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <TrendingDown className="w-32 h-32" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <History className="w-5 h-5 text-stone-400" />
                <h2 className="text-lg font-semibold">Historial de 7 días</h2>
              </div>
              
              <div className="space-y-4">
                {last7Days.map(date => {
                  const progress = getDayProgress(date);
                  const isToday = date.toDateString() === new Date().toDateString();
                  return (
                    <div 
                      key={date.toISOString()} 
                      onClick={() => {
                        setCurrentDate(new Date(date));
                        setActiveTab('diet');
                      }}
                      className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer ${
                        isToday ? 'border-stone-900 ring-1 ring-stone-900' : 'border-stone-200 shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-stone-700">
                          {new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(date)}
                          <span className="text-[10px] text-stone-400 ml-2 uppercase tracking-widest">{formatDate(date)}</span>
                        </span>
                        <span className="text-xs font-bold text-stone-400">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className="h-full bg-stone-900"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm text-center">
                  <p className="text-2xl font-bold text-stone-900">80kg</p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mt-1">Peso Inicial</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm text-center">
                  <p className="text-2xl font-bold text-stone-900">72kg</p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mt-1">Objetivo</p>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de que quieres borrar todo tu progreso? Esta acción no se puede deshacer.')) {
                      setProgress({
                        completedMeals: {},
                        completedExercises: {},
                        favorites: [],
                        shoppingListChecked: {},
                        padelMatches: []
                      });
                      localStorage.removeItem('fitapp_progress_v3');
                    }
                  }}
                  className="w-full py-3 text-xs font-bold text-red-500 uppercase tracking-widest border border-red-100 rounded-2xl hover:bg-red-50 transition-colors"
                >
                  Reiniciar todo el progreso
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'shopping' && (
            <motion.div
              key="shopping"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="w-5 h-5 text-stone-400" />
                <h2 className="text-lg font-semibold">Lista de la compra (8 días)</h2>
              </div>

              <p className="text-xs text-stone-500 mb-4">
                Ingredientes necesarios para tus comidas desde hoy hasta el {formatDate(new Date(new Date().setDate(new Date().getDate() + 7)))}.
              </p>

              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm divide-y divide-stone-100">
                {shoppingList.length > 0 ? (
                  shoppingList.map((item) => {
                    const isChecked = progress.shoppingListChecked[item.name];
                    return (
                      <div 
                        key={item.name}
                        onClick={() => toggleShoppingItem(item.name)}
                        className="p-4 flex items-center gap-4 cursor-pointer hover:bg-stone-50 transition-colors"
                      >
                        {isChecked ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-stone-300" />
                        )}
                        <span className={`text-sm font-medium ${isChecked ? 'line-through text-stone-400' : 'text-stone-700'}`}>
                          {item.display}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-sm text-stone-400">No hay ingredientes en la lista.</p>
                  </div>
                )}
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 mt-6">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Esta lista se actualiza automáticamente cada día para mostrarte siempre lo que necesitas para los próximos 7 días.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-stone-400" />
                <h2 className="text-lg font-semibold">Mi Perfil</h2>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Género</label>
                    <select 
                      value={progress.profile?.gender || 'female'}
                      onChange={(e) => setProgress(prev => ({ ...prev, profile: { ...prev.profile!, gender: e.target.value as any } }))}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                    >
                      <option value="female">Mujer</option>
                      <option value="male">Hombre</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Edad</label>
                    <input 
                      type="number"
                      value={progress.profile?.age || 35}
                      onChange={(e) => setProgress(prev => ({ ...prev, profile: { ...prev.profile!, age: parseInt(e.target.value) || 0 } }))}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Altura (cm)</label>
                    <input 
                      type="number"
                      value={progress.profile?.height || 165}
                      onChange={(e) => setProgress(prev => ({ ...prev, profile: { ...prev.profile!, height: parseInt(e.target.value) || 0 } }))}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Peso (kg)</label>
                    <input 
                      type="number"
                      value={progress.profile?.weight || 70}
                      onChange={(e) => setProgress(prev => ({ ...prev, profile: { ...prev.profile!, weight: parseInt(e.target.value) || 0 } }))}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Nivel de Actividad</label>
                  <select 
                    value={progress.profile?.activityLevel || 'moderate'}
                    onChange={(e) => setProgress(prev => ({ ...prev, profile: { ...prev.profile!, activityLevel: e.target.value as any } }))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  >
                    <option value="sedentary">Sedentario (Poco ejercicio)</option>
                    <option value="moderate">Moderado (2-3 veces/semana)</option>
                    <option value="active">Activo (4+ veces/semana)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Objetivos de Salud</label>
                  <textarea 
                    value={progress.profile?.goals || ''}
                    onChange={(e) => setProgress(prev => ({ ...prev, profile: { ...prev.profile!, goals: e.target.value } }))}
                    placeholder="Ej: Bajar colesterol, reducir barriga, ganar fuerza..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 min-h-[80px] resize-none"
                  />
                  <p className="text-[10px] text-stone-400 italic">La app ajustará tus menús y ejercicios según lo que escribas aquí.</p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Estado</p>
                      <p className="text-sm text-emerald-700">Tu plan se está ajustando automáticamente a tus datos.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-stone-100 p-6 rounded-3xl space-y-4">
                <h3 className="text-sm font-bold text-stone-800">Zona de Peligro</h3>
                <button 
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de que quieres borrar todos tus datos? Esta acción no se puede deshacer.')) {
                      setProgress({
                        completedMeals: {},
                        completedExercises: {},
                        favorites: [],
                        shoppingListChecked: {},
                        padelMatches: [],
                        profile: {
                          gender: 'female',
                          age: 35,
                          height: 165,
                          weight: 70,
                          activityLevel: 'moderate',
                          goals: ''
                        }
                      });
                      localStorage.removeItem('fitapp_progress_v3');
                    }
                  }}
                  className="w-full py-3 bg-white border border-red-200 text-red-600 rounded-2xl text-sm font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Borrar todos los datos
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-stone-200 px-6 py-4 z-20">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button 
            onClick={() => setActiveTab('diet')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'diet' ? 'text-stone-900' : 'text-stone-400'}`}
          >
            <Utensils className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Dieta</span>
          </button>
          <button 
            onClick={() => setActiveTab('exercise')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'exercise' ? 'text-stone-900' : 'text-stone-400'}`}
          >
            <Dumbbell className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Entreno</span>
          </button>
          <button 
            onClick={() => setActiveTab('shopping')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'shopping' ? 'text-stone-900' : 'text-stone-400'}`}
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Compra</span>
          </button>
          <button 
            onClick={() => setActiveTab('progress')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'progress' ? 'text-stone-900' : 'text-stone-400'}`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Progreso</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-stone-900' : 'text-stone-400'}`}
          >
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

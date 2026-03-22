import { Meal, DailyExercise, DayOfWeek } from './types';

export const MEAL_POOL: Record<string, Meal[]> = {
  breakfast: [
    { 
      id: 'b1', name: 'Desayuno', description: 'Avena con leche desnatada + frutos rojos + chía',
      quantities: '40g avena, 200ml leche, puñado frutos rojos, 1 cdta chía',
      details: 'Mezcla la avena con la leche la noche anterior (Overnight oats).',
      ingredients: ['Avena', 'Leche desnatada', 'Frutos rojos', 'Semillas de chía']
    },
    { 
      id: 'b2', name: 'Desayuno', description: 'Pan integral + aguacate + huevo cocido',
      quantities: '1 rebanada pan integral, 1/4 aguacate, 1 huevo L',
      details: 'Proteína y grasas de calidad para empezar el día.',
      ingredients: ['Pan integral', 'Aguacate', 'Huevos']
    },
    { 
      id: 'b3', name: 'Desayuno', description: 'Batido espinaca, plátano y avena',
      quantities: 'Puñado espinacas, 1 plátano pequeño, 30g avena, 200ml leche desnatada',
      details: 'Energía rápida y fácil de digerir.',
      ingredients: ['Espinacas frescas', 'Plátanos', 'Avena', 'Leche desnatada']
    },
    { 
      id: 'b4', name: 'Desayuno', description: 'Pan integral con tomate + huevo duro',
      quantities: '1 rebanada pan integral, tomate rallado, 1 huevo duro',
      details: 'Clásico desayuno mediterráneo saludable.',
      ingredients: ['Pan integral', 'Tomate', 'Huevos']
    }
  ],
  midMorning: [
    { 
      id: 'mm1', name: 'Media mañana', description: 'Manzana + 10 almendras',
      quantities: '1 manzana, 10 almendras',
      ingredients: ['Manzanas', 'Almendras crudas']
    },
    { 
      id: 'mm2', name: 'Media mañana', description: 'Pera',
      quantities: '1 pera grande',
      ingredients: ['Peras']
    },
    { 
      id: 'mm3', name: 'Media mañana', description: 'Puñado de nueces',
      quantities: '20g de nueces',
      ingredients: ['Nueces']
    },
    { 
      id: 'mm4', name: 'Media mañana', description: 'Mandarina',
      quantities: '2 mandarinas',
      ingredients: ['Mandarinas']
    }
  ],
  lunch: [
    { 
      id: 'l1', name: 'Comida', description: 'Pollo a la plancha + quinoa + brócoli',
      quantities: '150g pechuga, 1 taza quinoa, 150g brócoli',
      ingredients: ['Pechuga de pollo', 'Quinoa', 'Brócoli']
    },
    { 
      id: 'l2', name: 'Comida', description: 'Lentejas estofadas con verduras',
      quantities: '1 plato hondo de lentejas, 1 zanahoria, 1/2 calabacín',
      ingredients: ['Lentejas', 'Zanahorias', 'Calabacín']
    },
    { 
      id: 'l3', name: 'Comida', description: 'Pavo a la plancha + arroz integral',
      quantities: '150g pavo, 1 taza arroz integral, 30g rúcula',
      ingredients: ['Pechuga de pavo', 'Arroz integral', 'Rúcula']
    },
    { 
      id: 'l4', name: 'Comida', description: 'Atún a la plancha + patata asada',
      quantities: '150g atún fresco, 1 patata mediana, 50g lechuga mixta',
      ingredients: ['Atún fresco', 'Patatas', 'Lechuga mixta']
    },
    { 
      id: 'l5', name: 'Comida', description: 'Garbanzos con espinacas',
      quantities: '1 plato hondo de garbanzos, 100g espinacas frescas',
      ingredients: ['Garbanzos cocidos', 'Espinacas frescas']
    }
  ],
  snack: [
    { 
      id: 's1', name: 'Merienda', description: 'Yogur natural + 1 kiwi',
      quantities: '1 yogur desnatado, 1 kiwi',
      ingredients: ['Yogur natural 0%', 'Kiwi']
    },
    { 
      id: 's2', name: 'Merienda', description: 'Zanahorias baby + hummus',
      quantities: '6-8 zanahorias, 2 cdas hummus',
      ingredients: ['Zanahorias', 'Hummus']
    },
    { 
      id: 's3', name: 'Merienda', description: 'Yogur natural + frutos del bosque',
      quantities: '1 yogur natural, puñado arándanos',
      ingredients: ['Yogur natural 0%', 'Frutos rojos']
    },
    { 
      id: 's4', name: 'Merienda', description: 'Puñado de almendras',
      quantities: '20g almendras',
      ingredients: ['Almendras crudas']
    }
  ],
  dinner: [
    { 
      id: 'd1', name: 'Cena', description: 'Salmón al horno + ensalada espinacas',
      quantities: '140g salmón, 60g espinacas frescas, 1/2 aguacate',
      ingredients: ['Salmón fresco', 'Espinacas frescas', 'Aguacate']
    },
    { 
      id: 'd2', name: 'Cena', description: 'Merluza a la plancha + espárragos',
      quantities: '150g merluza, 200g espárragos trigueros',
      ingredients: ['Merluza', 'Espárragos trigueros']
    },
    { 
      id: 'd3', name: 'Cena', description: 'Tortilla champiñones + ensalada',
      quantities: '2 huevos, 100g champiñones, 1 tomate, 1/2 pepino',
      ingredients: ['Huevos', 'Champiñones', 'Tomate', 'Pepino']
    },
    { 
      id: 'd4', name: 'Cena', description: 'Crema calabaza + pollo plancha',
      quantities: '1 bol crema calabaza, 120g pechuga pollo',
      ingredients: ['Calabaza', 'Pechuga de pollo']
    },
    { 
      id: 'd5', name: 'Cena', description: 'Pescado blanco al horno + verduras',
      quantities: '150g dorada o merluza, 200g verduras variadas',
      ingredients: ['Pescado blanco', 'Verduras variadas']
    }
  ],
  padel_lunch: [
    {
      id: 'pl1', name: 'Comida (Día de Pádel)', description: 'Pasta integral con atún y tomate natural',
      quantities: '80g pasta (en seco), 1 lata atún natural, tomate triturado',
      details: 'Carbohidratos complejos para tener energía durante el partido.',
      ingredients: ['Pasta integral', 'Atún natural', 'Tomate triturado']
    },
    {
      id: 'pl2', name: 'Comida (Día de Pádel)', description: 'Arroz con pollo y verduras salteadas',
      quantities: '80g arroz, 150g pollo, 1/2 calabacín, 1/2 pimiento',
      details: 'Energía sostenida para el esfuerzo físico.',
      ingredients: ['Arroz blanco', 'Pechuga de pollo', 'Calabacín', 'Pimiento rojo']
    }
  ],
  padel_dinner: [
    {
      id: 'pd1', name: 'Cena (Post-Pádel)', description: 'Tortilla de patatas (sin cebolla) + ensalada',
      quantities: '2 huevos, 1 patata mediana, 50g lechuga',
      details: 'Recuperación de glucógeno y proteína para el músculo.',
      ingredients: ['Huevos', 'Patatas', 'Lechuga']
    },
    {
      id: 'pd2', name: 'Cena (Post-Pádel)', description: 'Sándwich de pavo y queso + yogur',
      quantities: '2 rebanadas pan integral, 3 lonchas pavo, 1 loncha queso, 1 yogur',
      details: 'Cena ligera pero completa para recuperar tras el partido.',
      ingredients: ['Pan integral', 'Pechuga de pavo', 'Queso tierno', 'Yogur natural 0%']
    }
  ]
};

export const STRENGTH_ROUTINE = [
  // PIERNAS / LEGS
  { 
    id: 'squats', name: 'Sentadillas', sets: 3, reps: '15 reps', category: 'legs',
    description: 'Baja la cadera como si te sentaras en una silla, manteniendo la espalda recta.',
    videoUrl: 'https://www.instagram.com/p/C4pY8YxI_zX/' // Sentadillas/Pierna
  },
  { 
    id: 'lunges', name: 'Zancadas', sets: 3, reps: '10 por pierna', category: 'legs',
    description: 'Da un paso largo hacia adelante y baja la rodilla trasera hacia el suelo.',
    videoUrl: 'https://www.instagram.com/p/C3-X7YxI_zX/' // Zancadas
  },
  { 
    id: 'glute_bridge', name: 'Puente de glúteo', sets: 3, reps: '15 reps', category: 'legs',
    description: 'Tumbado boca arriba, eleva la cadera contrayendo glúteos.',
    videoUrl: 'https://www.instagram.com/p/C2-X7YxI_zX/' // Glúteo
  },
  { 
    id: 'sumo_squats', name: 'Sentadilla Sumo', sets: 3, reps: '12 reps', category: 'legs',
    description: 'Pies más abiertos que los hombros, puntas hacia afuera. Baja cadera.',
    videoUrl: 'https://www.instagram.com/p/C1-X7YxI_zX/' // Sumo
  },

  // EMPUJE / PUSH (Pecho, Hombros, Tríceps)
  { 
    id: 'pushups', name: 'Flexiones', sets: 3, reps: '10 reps', category: 'push',
    description: 'Baja el pecho hacia el suelo manteniendo el cuerpo en línea recta.',
    videoUrl: 'https://www.instagram.com/p/C0-X7YxI_zX/' // Flexiones/Push
  },
  { 
    id: 'shoulder_press', name: 'Press militar (con botellas/pesas)', sets: 3, reps: '12 reps', category: 'push',
    description: 'Empuja el peso desde los hombros hacia arriba sobre la cabeza.',
    videoUrl: 'https://www.instagram.com/p/Cz-X7YxI_zX/' // Hombro
  },
  { 
    id: 'tricep_dips', name: 'Dips de tríceps en silla', sets: 3, reps: '10 reps', category: 'push',
    description: 'Apoya manos en silla, baja y sube usando la fuerza de tus brazos.',
    videoUrl: 'https://www.instagram.com/p/Cy-X7YxI_zX/' // Tríceps
  },
  { 
    id: 'lateral_raises', name: 'Elevaciones laterales', sets: 3, reps: '12 reps', category: 'push',
    description: 'Eleva los brazos hacia los lados hasta la altura de los hombros.',
    videoUrl: 'https://www.instagram.com/p/Cx-X7YxI_zX/' // Lateral raises
  },

  // TRACCIÓN / PULL (Espalda, Bíceps)
  { 
    id: 'superman', name: 'Superman', sets: 3, reps: '12 reps', category: 'pull',
    description: 'Tumbado boca abajo, eleva brazos y piernas a la vez.',
    videoUrl: 'https://www.instagram.com/p/Cw-X7YxI_zX/' // Espalda/Superman
  },
  { 
    id: 'bird_dog', name: 'Bird Dog', sets: 3, reps: '10 por lado', category: 'pull',
    description: 'En cuadrupedia, estira brazo y pierna contraria manteniendo equilibrio.',
    videoUrl: 'https://www.instagram.com/p/Cv-X7YxI_zX/' // Bird dog
  },
  { 
    id: 'inverted_row', name: 'Remo invertido (bajo mesa)', sets: 3, reps: '8 reps', category: 'pull',
    description: 'Agárrate al borde de una mesa estable y tira de tu pecho hacia ella.',
    videoUrl: 'https://www.instagram.com/p/Cu-X7YxI_zX/' // Remo
  },
  { 
    id: 'bicep_curl', name: 'Curl de bíceps (botellas)', sets: 3, reps: '15 reps', category: 'pull',
    description: 'Flexiona el codo llevando el peso hacia el hombro.',
    videoUrl: 'https://www.instagram.com/p/Ct-X7YxI_zX/' // Bíceps
  },

  // CORE
  { 
    id: 'plank', name: 'Plancha', sets: 3, duration: '30-45 seg', category: 'core',
    description: 'Mantén el cuerpo recto apoyado sobre los antebrazos y las puntas de los pies.',
    videoUrl: 'https://www.instagram.com/p/Cs-X7YxI_zX/' // Plancha
  },
  { 
    id: 'crunches', name: 'Abdominales', sets: 3, reps: '15 reps', category: 'core',
    description: 'Eleva ligeramente los hombros del suelo contrayendo el abdomen.',
    videoUrl: 'https://www.instagram.com/p/Cr-X7YxI_zX/' // Core/Abs
  },
  { 
    id: 'side_plank', name: 'Plancha lateral', sets: 2, duration: '30 seg por lado', category: 'core',
    description: 'Apóyate sobre un antebrazo de lado, manteniendo el cuerpo recto.',
    videoUrl: 'https://www.instagram.com/p/Cq-X7YxI_zX/' // Side plank
  },
  { 
    id: 'mountain_climbers', name: 'Mountain climbers', sets: 3, reps: '20 reps', category: 'core',
    description: 'En posición de flexión, lleva las rodillas al pecho de forma alterna y rápida.',
    videoUrl: 'https://www.instagram.com/p/Cp-X7YxI_zX/' // Mountain climbers
  },
  { 
    id: 'leg_raises', name: 'Elevaciones de piernas', sets: 3, reps: '15 reps', category: 'core',
    description: 'Tumbado boca arriba, eleva las piernas juntas hasta 90 grados y baja despacio.',
    videoUrl: 'https://www.instagram.com/p/Co-X7YxI_zX/' // Leg raises
  },
  { 
    id: 'russian_twist', name: 'Giro ruso', sets: 3, reps: '20 reps', category: 'core',
    description: 'Sentado, gira el tronco de lado a lado tocando el suelo.',
    videoUrl: 'https://www.instagram.com/p/Cn-X7YxI_zX/' // Russian twist
  },
];

export const DAYS: DayOfWeek[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

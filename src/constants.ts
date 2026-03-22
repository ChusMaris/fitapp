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
  { 
    id: 'squats', name: 'Sentadillas', sets: 3, reps: '15 reps', 
    description: 'Baja la cadera como si te sentaras en una silla, manteniendo la espalda recta.',
    videoUrl: 'https://www.youtube.com/results?search_query=how+to+do+squats' 
  },
  { 
    id: 'pushups', name: 'Flexiones', sets: 3, reps: '10 reps', 
    description: 'Baja el pecho hacia el suelo manteniendo el cuerpo en línea recta.',
    videoUrl: 'https://www.youtube.com/results?search_query=how+to+do+pushups' 
  },
  { 
    id: 'plank', name: 'Plancha', sets: 3, duration: '30-45 seg', 
    description: 'Mantén el cuerpo recto apoyado sobre los antebrazos y las puntas de los pies.',
    videoUrl: 'https://www.youtube.com/results?search_query=how+to+do+plank' 
  },
  { 
    id: 'lunges', name: 'Zancadas', sets: 3, reps: '10 por pierna', 
    description: 'Da un paso largo hacia adelante y baja la rodilla trasera hacia el suelo.',
    videoUrl: 'https://www.youtube.com/results?search_query=how+to+do+lunges' 
  },
  { 
    id: 'crunches', name: 'Abdominales', sets: 3, reps: '15 reps', 
    description: 'Eleva ligeramente los hombros del suelo contrayendo el abdomen.',
    videoUrl: 'https://www.youtube.com/results?search_query=how+to+do+crunches' 
  },
  { 
    id: 'side_plank', name: 'Plancha lateral', sets: 2, duration: '30 seg por lado', 
    description: 'Apóyate sobre un antebrazo de lado, manteniendo el cuerpo recto.',
    videoUrl: 'https://www.youtube.com/results?search_query=how+to+do+side+plank' 
  },
  { 
    id: 'mountain_climbers', name: 'Mountain climbers', sets: 3, reps: '20 reps', 
    description: 'En posición de flexión, lleva las rodillas al pecho de forma alterna y rápida.',
    videoUrl: 'https://www.youtube.com/results?search_query=how+to+do+mountain+climbers' 
  },
  { 
    id: 'leg_raises', name: 'Elevaciones de piernas', sets: 3, reps: '15 reps', 
    description: 'Tumbado boca arriba, eleva las piernas juntas hasta 90 grados y baja despacio.',
    videoUrl: 'https://www.youtube.com/results?search_query=how+to+do+leg+raises' 
  },
];

export const EXERCISE_PLAN: Record<DayOfWeek, DailyExercise> = {
  Lunes: {
    title: 'Elíptica (Intervalos) + Fuerza',
    exercises: [
      { 
        id: 'eliptica_int', name: 'Elíptica (HIIT suave)', duration: '30 min', 
        description: 'Alterna 1 minuto a alta intensidad con 2 minutos a ritmo suave.',
        videoUrl: 'https://www.youtube.com/results?search_query=elliptical+hiit+workout' 
      },
      ...STRENGTH_ROUTINE.slice(0, 5)
    ]
  },
  Martes: {
    title: 'Caminar',
    exercises: [
      { 
        id: 'walk', name: 'Caminar', duration: '30-45 min',
        description: 'Ritmo ligero, que te permita hablar pero te sientas activo.'
      }
    ]
  },
  Miércoles: {
    title: 'Elíptica (Intervalos)',
    exercises: [
      { 
        id: 'eliptica_int', name: 'Elíptica (HIIT suave)', duration: '30 min',
        description: 'Alterna 1 minuto a alta intensidad con 2 minutos a ritmo suave.'
      }
    ]
  },
  Jueves: {
    title: 'Caminar (Descanso Activo)',
    exercises: [
      { id: 'walk', name: 'Caminar', duration: '30 min', description: 'Paseo ligero para recuperar.' }
    ]
  },
  Viernes: {
    title: 'Fuerza + Elíptica Suave',
    exercises: [
      ...STRENGTH_ROUTINE.slice(0, 5),
      { 
        id: 'eliptica_soft', name: 'Elíptica suave', duration: '20 min',
        description: 'Ritmo constante y moderado para recuperación activa.'
      }
    ]
  },
  Sábado: {
    title: 'Caminar (Descanso Activo)',
    exercises: [
      { id: 'walk', name: 'Caminar', duration: '30 min', description: 'Paseo ligero para recuperar.' }
    ]
  },
  Domingo: {
    title: 'Descanso Activo (Caminar)',
    exercises: [
      { 
        id: 'walk', name: 'Caminar suave', duration: '30 min',
        description: 'Paseo tranquilo para movilizar el cuerpo.'
      }
    ]
  }
};

export const DAYS: DayOfWeek[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

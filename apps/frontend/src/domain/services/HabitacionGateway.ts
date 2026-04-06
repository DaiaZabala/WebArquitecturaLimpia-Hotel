// apps/frontend/src/domain/services/HabitacionGateway.ts

import type { Habitacion } from '../models/Habitacion';

// ✅ PASO 1: Asegurarse de que el tipo de datos se exporte (necesario para el HttpHabitacionGateway)
export type HabitacionCreationData = { 
    numero: string; 
    idTipo: string; 
    precioPorNoche: number; 
};

export interface HabitacionGateway {
    // Para la ruta GET /api/habitaciones
    getAvailable(): Promise<Habitacion[]>; 
    
    // ✅ PASO 2: Usar el tipo HabitacionCreationData en lugar de reescribir la estructura.
    // Esto asegura que la interfaz y el tipo exportado sean consistentes.
    create(data: HabitacionCreationData): Promise<Habitacion>;
}
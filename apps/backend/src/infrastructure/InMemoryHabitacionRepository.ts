// apps/backend/src/infrastructure/InMemoryHabitacionRepository.ts

import { Habitacion, HabitacionData } from '../../../../domain/src/entities/Habitacion';
import { HabitacionRepository } from '../../../../domain/src/services/HabitacionRepository';
import { v4 as uuid } from 'uuid'; 

// 💡 Simula la "Base de Datos"
const habitacionesDatabase: Habitacion[] = [];

export class InMemoryHabitacionRepository implements HabitacionRepository {
  
  async save(data: HabitacionData): Promise<Habitacion> {
    const id = uuid();
    const newHabitacion = new Habitacion(
      id,
      data.numero,
      data.idTipo,
      data.precioPorNoche
    );
    
    habitacionesDatabase.push(newHabitacion);
    return newHabitacion;
  }
  
  async findByNumber(numero: string): Promise<Habitacion | null> {
    const habitacion = habitacionesDatabase.find(r => r.numero === numero);
    return habitacion || null;
  }
  
  async findAll(): Promise<Habitacion[]> {
    return habitacionesDatabase;
  }
  
  async findById(id: string): Promise<Habitacion | null> {
      return habitacionesDatabase.find(h => h.id === id) || null;
  }
}
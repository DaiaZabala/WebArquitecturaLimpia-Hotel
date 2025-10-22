import { Habitacion, HabitacionData } from '../entities/Habitacion';

export interface HabitacionRepository {
  save(data: HabitacionData): Promise<Habitacion>; 
  findByNumber(number: string): Promise<Habitacion | null>; 
  findAll(): Promise<Habitacion[]>;
  findById(id: string): Promise<Habitacion | null>;
}
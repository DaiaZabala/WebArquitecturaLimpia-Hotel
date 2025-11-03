// apps/backend/src/infrastructure/InMemoryReservaRepository.ts

import { Reserva } from '../../../../domain/src/entities/Reserva';
import { ReservaRepository } from '../../../../domain/src/services/ReservaRepository';
import { v4 as uuid } from 'uuid'; 

// 💡 Simula la "Base de Datos" de Reservas
const reservasDatabase: Reserva[] = [];

export class InMemoryReservaRepository implements ReservaRepository {
  
    // Guarda la nueva reserva
    async save(reserva: Reserva): Promise<Reserva> {
        reservasDatabase.push(reserva);
        return reserva;
    }

    // Método crucial: Busca reservas existentes para una habitación en un rango de fechas.
    async findOverlappingReservations(
        habitacionId: string,
        fechaInicio: Date,
        fechaFin: Date
    ): Promise<Reserva[]> {
        // En un proyecto real, esta lógica sería más compleja (SQL/NoSQL)
        // Aquí simulamos que no hay solapamiento si la base está vacía.
        return reservasDatabase.filter(reserva => 
            reserva.habitacionId === habitacionId &&
            reserva.fechaInicio < fechaFin &&
            reserva.fechaFin > fechaInicio
        );
    }
}
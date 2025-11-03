// domain/src/services/ReservaRepository.ts

import { Reserva } from '../entities/Reserva';

export interface ReservaRepository {
    // Guarda la nueva reserva
    save(reserva: Reserva): Promise<Reserva>;

    // 💡 Método clave: Busca reservas existentes para una habitación en un rango de fechas.
    findOverlappingReservations(
        habitacionId: string,
        fechaInicio: Date,
        fechaFin: Date
    ): Promise<Reserva[]>;
}
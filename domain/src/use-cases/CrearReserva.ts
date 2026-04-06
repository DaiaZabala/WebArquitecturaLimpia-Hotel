import { HabitacionRepository } from "../services/HabitacionRepository";
import { ReservaRepository } from "../services/ReservaRepository";
import { Reserva } from "../entities/Reserva";
import type { Habitacion } from "../entities/Habitacion";
import * as uuid from "uuid";
const uuidv4 = uuid.v4;

// Comando de entrada
export interface CrearReservaCommand {
  userId: string;
  habitacionId: string;
  fechaInicio: Date;
  fechaFin: Date;
}

// Resultado del Caso de Uso
export type CrearReservaResult = Reserva;

export class CrearReserva {
  constructor(
    private readonly habitacionRepository: HabitacionRepository,
    private readonly reservaRepository: ReservaRepository
  ) {}

  async execute(command: CrearReservaCommand): Promise<CrearReservaResult> {
    // --- 1. VALIDACIÓN BÁSICA DE FECHAS ---
    if (command.fechaInicio.getTime() >= command.fechaFin.getTime()) {
      throw new Error("Las fechas de la reserva son inválidas.");
    }

    // --- 2. VERIFICAR EXISTENCIA DE LA HABITACIÓN ---
    const habitacion = (await this.habitacionRepository.findById(
      command.habitacionId
    )) as Habitacion | null;

    if (!habitacion) {
      throw new Error("La habitación solicitada no existe.");
    }

    // --- 3. VERIFICAR DISPONIBILIDAD (Solapamiento) ---
    const reservasSolapadas =
      await this.reservaRepository.findOverlappingReservations(
        command.habitacionId,
        command.fechaInicio,
        command.fechaFin
      );

    if (reservasSolapadas.length > 0) {
      throw new Error(
        "La habitación no está disponible en las fechas seleccionadas."
      );
    }

    // --- 4. CÁLCULO DEL TOTAL ---
    const msPorDia = 1000 * 3600 * 24;
    const diferenciaDias = Math.ceil(
      (command.fechaFin.getTime() - command.fechaInicio.getTime()) / msPorDia
    );
    const total = diferenciaDias * habitacion.precioPorNoche;

    // --- 5. CREAR ENTIDAD Y GUARDAR ---
    const nuevaReserva = new Reserva(
      uuidv4(), // Generar ID único
      command.userId,
      command.habitacionId,
      command.fechaInicio,
      command.fechaFin,
      total
    );

    const reservaGuardada = await this.reservaRepository.save(nuevaReserva);
    return reservaGuardada;
  }
}


import { HabitacionRepository } from '../services/HabitacionRepository';
import { Habitacion, HabitacionData } from '../entities/Habitacion';

export class CrearHabitacion {
  constructor(private repository: HabitacionRepository) {}

  async execute(data: HabitacionData): Promise<Habitacion> {
    // Verificar duplicado por número
    const existing = await this.repository.findByNumber(data.numero);
    if (existing) {
      throw new Error(`La habitación con el número ${data.numero} ya existe.`);
    }

    // Delegar la creación al repositorio
    const saved = await this.repository.save(data);
    return saved;
  }
}

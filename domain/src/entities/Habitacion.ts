export interface HabitacionData {
  numero: string;
  idTipo: string;  // <--- Nuevo campo para relacionar
  precioPorNoche: number; // Precio base puede ser sobreescrito
}

export class Habitacion {
  constructor(
    public id: string,
    public numero: string,
    public idTipo: string, // <-- Almacena la relación
    public precioPorNoche: number,
    public estaDisponible: boolean = true
  ) {}

  marcarComoNoDisponible(): void {
    this.estaDisponible = false;
  }
}
export class TipoHabitacion {
  constructor(
    public id: string,
    public nombre: string,       // Ej: 'Simple, Doble Estándar y triple'
    public descripcion: string,
    public capacidadMaxima: number, // 1, 2, 3, 4 personas
    public precioBase: number
  ) {}
}
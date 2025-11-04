// apps/frontend/src/domain/models/Habitacion.ts
export interface Habitacion {
    id: string;
    numero: string;
    idTipo: string;
    precioPorNoche: number;
    estaDisponible: boolean;
}
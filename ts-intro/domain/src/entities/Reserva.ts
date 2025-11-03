// domain/src/entities/Reserva.ts

export interface ReservaData {
    id: string;
    userId: string;
    habitacionId: string;
    fechaInicio: Date;
    fechaFin: Date;
    total: number;
}

export class Reserva implements ReservaData {
    public id: string;
    public userId: string;
    public habitacionId: string;
    public fechaInicio: Date;
    public fechaFin: Date;
    public total: number;

    constructor(
        id: string,
        userId: string,
        habitacionId: string,
        fechaInicio: Date,
        fechaFin: Date,
        total: number
    ) {
        this.id = id;
        this.userId = userId;
        this.habitacionId = habitacionId;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.total = total;
    }
}
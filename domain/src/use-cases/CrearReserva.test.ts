// domain/src/use-cases/CrearReserva.test.ts

import { CrearReserva } from '../use-cases/CrearReserva';
import { HabitacionRepository } from '../services/HabitacionRepository';
import { ReservaRepository } from '../services/ReservaRepository';
import { Reserva } from '../entities/Reserva';

// --- MOCKs ---
// 1. Mock de la Habitación (simula que la habitación existe)
const MOCK_HABITACION = {
    id: 'habitacion-101',
    precioPorNoche: 100,
    estaDisponible: true,
};

const mockHabitacionRepository: HabitacionRepository = {
    findById: jest.fn(async (id: string) => (id === MOCK_HABITACION.id ? MOCK_HABITACION : null) as any),
    save: jest.fn(),
    findAll: jest.fn(),
    findByNumber: jest.fn(async () => null), 
};

// 2. Mock del Repositorio de Reservas
const mockReservaRepository: ReservaRepository = {
    save: jest.fn(async (reserva) => reserva),
    // Simula que NO hay reservas que se solapen inicialmente
    findOverlappingReservations: jest.fn(async () => []), 
};

// --- EL CASO DE USO DEBE FALLAR (Aún no existe) ---
describe('CrearReserva', () => {
    let crearReserva: CrearReserva;

    beforeEach(() => {
        // Inicializa el CU con sus dependencias simuladas
        crearReserva = new CrearReserva(mockHabitacionRepository, mockReservaRepository);
        jest.clearAllMocks(); // Limpia los contadores de llamadas de Jest
    });

    test('debe crear una reserva si la habitación existe y está disponible', async () => {
        // Datos de entrada
        const command = {
            userId: 'user-client-123',
            habitacionId: MOCK_HABITACION.id,
            fechaInicio: new Date('2025-11-10'),
            fechaFin: new Date('2025-11-15'),
        };

        const reserva = await crearReserva.execute(command);

        // Verificaciones
        expect(reserva).toBeInstanceOf(Reserva); // Debe devolver una instancia de Reserva
        expect(reserva.userId).toBe(command.userId);
        expect(reserva.total).toBe(5 * MOCK_HABITACION.precioPorNoche); // 5 noches * 100
        expect(mockReservaRepository.save).toHaveBeenCalledTimes(1);
    });

    // --- Primer Test de Lógica Crítica: Habitación no encontrada ---
    test('debe lanzar un error si la habitación no existe', async () => {
        const command = {
            userId: 'user-client-123',
            habitacionId: 'habitacion-inexistente',
            fechaInicio: new Date('2025-11-10'),
            fechaFin: new Date('2025-11-15'),
        };
        
        await expect(crearReserva.execute(command)).rejects.toThrow('La habitación solicitada no existe.');
    });

    // --- Segundo Test de Lógica Crítica: Fechas Inválidas ---
    test('debe lanzar un error si la fecha de inicio es igual o posterior a la fecha de fin', async () => {
        const command = {
            userId: 'user-client-123',
            habitacionId: MOCK_HABITACION.id,
            fechaInicio: new Date('2025-11-15'), // Mismo día
            fechaFin: new Date('2025-11-15'),
        };
        
        await expect(crearReserva.execute(command)).rejects.toThrow('Las fechas de la reserva son inválidas.');
    });
});
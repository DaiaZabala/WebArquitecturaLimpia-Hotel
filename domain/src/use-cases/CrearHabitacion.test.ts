import { HabitacionRepository } from '../services/HabitacionRepository'; 
import { CrearHabitacion } from './CrearHabitacionUseCase'; 
import { Habitacion, HabitacionData } from '../entities/Habitacion';

const MOCK_ID_TIPO = 'doble-estandar-id'; // Usamos un ID de tipo de habitación fijo para el test

// Objeto simulado (Mock) del Repositorio de Habitaciones.
const mockRepository: HabitacionRepository = {
    // Simula la creación: devuelve una Habitacion con los campos actualizados (incluyendo idTipo)
    save: jest.fn(async (data: HabitacionData) => 
        new Habitacion('mock-uuid-123', data.numero, data.idTipo, data.precioPorNoche)
    ),
    // Simula la búsqueda
    findByNumber: jest.fn(async (_numero) => null), 
    findAll: jest.fn(async () => []),
    findById: jest.fn(async () => null),
};

describe('CrearHabitacion Caso de Uso', () => {

  // Limpiamos los mocks antes de cada test para evitar interferencias
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- PRIMERA PRUEBA: La Creación Básica ---
  test('debe crear una habitación correctamente y llamar a save()', async () => {
    // Datos actualizados con el campo idTipo
    const data: HabitacionData = { 
        numero: '101', 
        idTipo: MOCK_ID_TIPO, 
        precioPorNoche: 90 
    };

    const crearHabitacion = new CrearHabitacion(mockRepository); 
    const habitacion = await crearHabitacion.execute(data);

    // Verificación
    expect(habitacion.numero).toBe('101');
    expect(habitacion.idTipo).toBe(MOCK_ID_TIPO);
    expect(mockRepository.save).toHaveBeenCalledTimes(1); 
    expect(mockRepository.findByNumber).toHaveBeenCalledWith('101');
  });

  // --- SEGUNDA PRUEBA: Validación de Duplicados ---
  test('NO debe crear una habitación si el número ya existe', async () => {
    const numeroDuplicado = '202';
    
    // 1. Configurar el mock para SIMULAR que la habitación ya existe en la DB
    const existingHabitacion = new Habitacion('existing-id', numeroDuplicado, MOCK_ID_TIPO, 200);
    
    // Reemplazamos la implementación del mock SÓLO para esta prueba:
    (mockRepository.findByNumber as jest.Mock).mockImplementation(async (num) => {
        return num === numeroDuplicado ? existingHabitacion : null;
    });

    const data: HabitacionData = { 
        numero: numeroDuplicado, 
        idTipo: MOCK_ID_TIPO, 
        precioPorNoche: 90 
    };
    
    const crearHabitacion = new CrearHabitacion(mockRepository); 

    // 2. Ejecutamos la función y verificamos que LANCE el error esperado.
    await expect(crearHabitacion.execute(data)).rejects.toThrow(
        `La habitación con el número ${numeroDuplicado} ya existe.`
    );
    
    // 3. Verificación: Aseguramos que save() NO se haya llamado
    expect(mockRepository.save).not.toHaveBeenCalled(); 
  });
});
// domain/src/use-cases/IniciarSesion.test.ts

import { UserRepository } from '../services/UserRepository';
import { AuthService } from '../services/AuthService'; 
import { IniciarSesion, LoginCommand } from '../use-cases/IniciarSesion'; // Clase que crearemos después
import { User } from '../entities/User';

// --- Datos de Prueba ---
const TEST_EMAIL = 'test@hotel.com';
const TEST_PASSWORD = 'Password123';
const HASHED_PASSWORD = 'hashed_password_from_db';
const MOCK_TOKEN = 'mock-jwt-token';
const MOCK_USER = new User('user-id-1', TEST_EMAIL, HASHED_PASSWORD, 'client');


// --- MOCK 1: Repositorio (Simula la búsqueda del usuario) ---
const mockUserRepository: UserRepository = {
    // Simula encontrar el usuario con la contraseña hasheada
    findByEmail: jest.fn(async (email) => email === TEST_EMAIL ? MOCK_USER : null),
    save: jest.fn(),
    findById: jest.fn(),
};

// --- MOCK 2: AuthService (Simula comparación y generación de token) ---
const mockAuthService: AuthService = {
    // Simula que la contraseña PLANA SIEMPRE coincide con el hash almacenado
    comparePassword: jest.fn(async (_password, _hash) => _password === TEST_PASSWORD),
    // Simula la generación de un token JWT
    generateToken: jest.fn((_userId, _userRole) => MOCK_TOKEN),
};

describe('IniciarSesion Caso de Uso', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
        // Comparación de contraseñas siempre pase para la prueba exitosa
        (mockAuthService.comparePassword as jest.Mock).mockResolvedValue(true);
    });

    // PRUEBA 1: Flujo exitoso (debe encontrar, validar y generar token)
    test('debe retornar un token JWT si las credenciales son correctas', async () => {
        const command: LoginCommand = { 
            email: TEST_EMAIL, 
            password: TEST_PASSWORD 
        };
        
        const iniciarSesion = new IniciarSesion(mockUserRepository, mockAuthService);
        const result = await iniciarSesion.execute(command);

        // 1. Verificaciones Críticas
        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(TEST_EMAIL);
        expect(mockAuthService.comparePassword).toHaveBeenCalledWith(TEST_PASSWORD, HASHED_PASSWORD);
        expect(mockAuthService.generateToken).toHaveBeenCalledWith(MOCK_USER.id, MOCK_USER.role);

        // 2. Resultado esperado
        expect(result.token).toBe(MOCK_TOKEN);
        expect(result.userId).toBe(MOCK_USER.id);
    });

    // PRUEBA 2 (ROJO 🔴): Credenciales incorrectas
    test('debe lanzar un error si la contraseña es incorrecta', async () => {
        // Configuramos el mock para que la comparación FALLE
        (mockAuthService.comparePassword as jest.Mock).mockResolvedValue(false);
        
        const command: LoginCommand = { 
            email: TEST_EMAIL, 
            password: 'wrong_password' 
        };
        
        const iniciarSesion = new IniciarSesion(mockUserRepository, mockAuthService);

        // Verificamos que se lance el error de autenticación
        await expect(iniciarSesion.execute(command)).rejects.toThrow('Credenciales inválidas.');
        
        // Verificamos que NO se genere token
        expect(mockAuthService.generateToken).not.toHaveBeenCalled();
    });
});
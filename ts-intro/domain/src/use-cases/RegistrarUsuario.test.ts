import { UserRepository } from '../services/UserRepository';
import { PasswordHasher } from '../services/PasswordHasher';
import { RegistrarUsuario, RegisterUserCommand } from './RegistrarUsuario';
import { User } from '../entities/User';

// --- Mocks ---

const MOCK_ROLE = 'client';

const mockUserRepository: UserRepository = {
    save: jest.fn(async (data) => new User('user-id-1', data.email, data.passwordHashed, data.role)),
    findByEmail: jest.fn(async () => null),
    findById: jest.fn(async () => null),
};

const mockHasher: PasswordHasher = {
    // Simula que cualquier contraseña se convierte en "hashed-password" + la contraseña
    hash: jest.fn(async (password) => `hashed-${password}`),
};

// --- Test Suite ---

describe('RegistrarUsuario Caso de Uso', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        // Aseguramos que findByEmail no encuentre duplicados en cada prueba
        (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    });

    test('debe registrar un usuario, cifrar la contraseña y llamar a save()', async () => {
        // Datos tipados correctamente
        const data: RegisterUserCommand = {
            email: 'test@example.com',
            password: 'password123',
            role: MOCK_ROLE as 'client'
        };

        const registrarUsuario = new RegistrarUsuario(mockUserRepository, mockHasher);
        const usuario = await registrarUsuario.execute(data);

        // 1. Verificación de Cifrado
        expect(mockHasher.hash).toHaveBeenCalledWith(data.password);

        // 2. Verificación de Persistencia
        expect(mockUserRepository.save).toHaveBeenCalledWith(
            expect.objectContaining({
                // Verifica que se guarde el valor cifrado
                passwordHashed: 'hashed-password123',
                email: 'test@example.com'
            })
        );
        expect(usuario.email).toBe(data.email);
    });

    test('NO debe registrar si el email ya está en uso', async () => {
        const emailDuplicado = 'duplicado@test.com';

        // 1. Configuramos el mock para SIMULAR que el email ya existe
        const existingUser = new User('id-existente', emailDuplicado, 'hash', 'client');
        (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(existingUser);

        const data: RegisterUserCommand = {
            email: emailDuplicado,
            password: 'abc',
            role: MOCK_ROLE as 'client'
        };

        const registrarUsuario = new RegistrarUsuario(mockUserRepository, mockHasher);

        // 2. Verificamos que lance el error de negocio
        await expect(registrarUsuario.execute(data)).rejects.toThrow(
            `El email ${emailDuplicado} ya está registrado.`
        );

        // 3. Aseguramos que NO se haya llamado a save() ni a hash()
        expect(mockUserRepository.save).not.toHaveBeenCalled();
        expect(mockHasher.hash).not.toHaveBeenCalled();
    });
});
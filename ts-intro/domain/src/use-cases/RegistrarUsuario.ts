// domain/src/use-cases/RegistrarUsuario.ts

import { UserRepository } from '../services/UserRepository';
import { PasswordHasher } from '../services/PasswordHasher'; 
import { User, UserData } from '../entities/User';

// Interfaz para los datos que llegan al Caso de Uso
export interface RegisterUserCommand {
    email: string;
    password: string; 
    role: 'client' | 'receptionist' | 'admin';
}

export class RegistrarUsuario {
  constructor(
    private readonly userRepository: UserRepository, 
    private readonly passwordHasher: PasswordHasher
  ) {}
  
  async execute(command: RegisterUserCommand): Promise<User> {
    
    // 1. Verificación de Duplicados
    const existingUser = await this.userRepository.findByEmail(command.email);
    if (existingUser) {
        throw new Error(`El email ${command.email} ya está registrado.`);
    }

    // 2. Cifrado (Hashing) de la contraseña
    const passwordHashed = await this.passwordHasher.hash(command.password);

    // 3. Crear el objeto UserData
    const userData: UserData = {
        email: command.email,
        passwordHashed: passwordHashed,
        role: command.role
    };

    // 4. Guardar en el Repositorio
    const newUser = await this.userRepository.save(userData);

    return newUser;
  }
}
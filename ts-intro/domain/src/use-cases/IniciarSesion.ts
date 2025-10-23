// domain/src/use-cases/IniciarSesion.ts

import { UserRepository } from '../services/UserRepository';
import { AuthService } from '../services/AuthService'; 

// Interfaz para los datos que llegan
export interface LoginCommand {
    email: string;
    password: string;
}

// Interfaz para la respuesta que devolverá el Caso de Uso
interface LoginResult {
    token: string;
    userId: string;
}

export class IniciarSesion {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService
    ) {}

   async execute(command: LoginCommand): Promise<LoginResult> {
        // 1. Buscar al usuario por email
        const user = await this.userRepository.findByEmail(command.email);
        
        // Si el usuario no existe, lanzamos error de credenciales inválidas.
        if (!user) {
            throw new Error("Usuario Inexistente.");
        }

        // 2. Comparar la contraseña (usa AuthService para el hash)
        const isPasswordValid = await this.authService.comparePassword(
            command.password, 
            user.passwordHashed
        );

        // Si la contraseña no coincide, lanzamos error.
        if (!isPasswordValid) {
        
            throw new Error("Contraseña incorrecta.");
        }

        // 3. Generar el Token (usa AuthService)
        const token = this.authService.generateToken(user.id, user.role);

        // 4. Retornar el resultado
        return {
            token,
            userId: user.id
        };
    }
}
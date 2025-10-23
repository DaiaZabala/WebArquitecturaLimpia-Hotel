// apps/backend/src/controllers/user.controller.ts

import { Router, Request, Response } from "express";

// Dominio: Casos de Uso (Usando alias @domain)
import {  RegistrarUsuario, RegisterUserCommand,} from "../../../../domain/src/use-cases/RegistrarUsuario"; 
import { IniciarSesion, LoginCommand } from "../../../../domain/src/use-cases/IniciarSesion";

// Infraestructura: Repositorios e Implementaciones
import { InMemoryUserRepository} from "../infrastructure/InMemoryUserRepository";
import { PasswordHasher } from "../../../../domain/src/services/PasswordHasher";

// Implementaciones: Hashing y JWT
import { BcryptPasswordHasher } from "../../../../domain/src/services/BcryptPasswordHasher";
import { JWTAuthService } from "../../../../domain/src/services/JWTAuthService";




const router = Router();
// Instanciamos las dependencias reales
const userRepository = new InMemoryUserRepository();
const passwordHasher = new BcryptPasswordHasher();
const authService = new JWTAuthService()


// (POST /api/users/register) ---
router.post('/register', async (req: Request, res: Response) => {
    try {
        const registrarUsuario = new RegistrarUsuario(userRepository, passwordHasher);
        const command: RegisterUserCommand = req.body; 
        const newUser = await registrarUsuario.execute(command);
        
        // Se omite el passwordHashed por seguridad
        const { passwordHashed, ...userResponse } = newUser;
        return res.status(201).json(userResponse);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
});


// --- RUTA 2: LOGIN (POST /api/users/login) ---
router.post('/login', async (req: Request, res: Response) => {
    try {
        const command: LoginCommand = req.body;
        
        // Inyección de dependencias para el Caso de Uso IniciarSesion
        const iniciarSesion = new IniciarSesion(userRepository, authService);

        const result = await iniciarSesion.execute(command);

        // Retorna el token y el ID del usuario
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            // Error 401 para credenciales incorrectas
            return res.status(401).json({ message: error.message }); 
        }
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
});


export default router;
// apps/backend/src/controllers/user.controller.ts

import { Router, Request, Response } from "express";

// Dominio: Casos de Uso (Usando alias @domain)
import { BcryptPasswordHasher } from "../../../../domain/src/services/BcryptPasswordHasher";
import { RegistrarUsuario, RegisterUserCommand } from "../../../../domain/src/use-cases/RegistrarUsuario";


// Infraestructura: Repositorios e Implementaciones
import { InMemoryUserRepository } from "../infrastructure/InMemoryUserRepository";



const router = Router();
// Instanciamos las dependencias reales
const userRepository = new InMemoryUserRepository();
const passwordHasher = new BcryptPasswordHasher(); // Usamos la clase importada

// Ruta: POST /api/users/register
router.post("/register", async (req: Request, res: Response) => {
  try {
    // Inyección de dependencias
    const registrarUsuario = new RegistrarUsuario(
      userRepository,
      passwordHasher 
    );

    // El body debe coincidir con la interfaz RegisterUserCommand
    const command: RegisterUserCommand = req.body;

    const newUser = await registrarUsuario.execute(command);

    // Eliminamos la contraseña del objeto de respuesta por seguridad
    const { passwordHashed, ...userResponse } = newUser;

    return res.status(201).json(userResponse);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error interno del servidor." });
  }
});

export default router;

// apps/backend/src/controllers/reserva.controller.ts

import { Router, Request, Response, NextFunction } from 'express';

// 💡 CORRECCIÓN 1: Asegurar que el tipado de Request incluya userId y userRole
import { AuthRequest, authMiddleware } from '../middlewares/auth.middleware'; // Importamos el tipo AuthRequest
// Se asume que authMiddleware.ts exporta interface AuthRequest

// Dominio: Casos de Uso (Usando ruta relativa larga para asegurar visibilidad)
import { CrearReserva, CrearReservaCommand } from '../../../../domain/src/use-cases/CrearReserva';

// Implementaciones de Repositorios (Asumiendo que el archivo de Reservas existe)
import { InMemoryHabitacionRepository } from '../infrastructure/InMemoryHabitacionRepository';
import { InMemoryReservaRepository } from '../infrastructure/InMemoryReservaRepositoy';

// Instanciar dependencias de infraestructura
const habitacionRepository = new InMemoryHabitacionRepository();
const reservaRepository = new InMemoryReservaRepository();
const reservaRouter = Router();
// --- ENDPOINT: POST /api/reservas ---
// Usamos AuthRequest para tipar correctamente y resolver el error de 'userId'
reservaRouter.post('/', authMiddleware, async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // 💡 SOLUCIÓN: TypeScript ahora sabe que req.userId existe
        const userId = req.userId; 
        const { habitacionId, fechaInicio, fechaFin } = req.body;
        
        // El middleware JWT garantiza que userId existe. Si no existe, es 401.
        if (!userId) { 
            return res.status(401).json({ message: 'Usuario no autenticado para crear reserva.' });
        }

        const command: CrearReservaCommand = {
            userId: userId, // Usamos el ID del token
            habitacionId,
            fechaInicio: new Date(fechaInicio),
            fechaFin: new Date(fechaFin),
        };

        // Inyectar y ejecutar el Caso de Uso del Dominio
        const crearReserva = new CrearReserva(habitacionRepository, reservaRepository);
        const reserva = await crearReserva.execute(command);

        // Respuesta exitosa
        res.status(201).json({
            message: 'Reserva creada exitosamente',
            reserva: {
                id: reserva.id,
                userId: reserva.userId,
                habitacionId: reserva.habitacionId,
                total: reserva.total,
                // ...
            },
        });
    } catch (error) {
        // Pasa errores del dominio al manejador de errores de Express
        next(error); 
    }
});

export default reservaRouter;
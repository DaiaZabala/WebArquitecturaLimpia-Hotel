// apps/backend/src/controllers/habitacion.controller.ts (MODIFICADO)

import { Router, Request, Response } from 'express';
import { CrearHabitacion } from '../../../../domain/src/use-cases/CrearHabitacionUseCase';
import { InMemoryHabitacionRepository } from '../infrastructure/InMemoryHabitacionRepository';

type HabitacionRepository = any;

const router = Router();
const habitacionRepository = new InMemoryHabitacionRepository();

//Crear una Habitación (POST /api/habitaciones)
router.post('/', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const crearHabitacion = new CrearHabitacion(habitacionRepository as unknown as HabitacionRepository);
    const newHabitacion = await crearHabitacion.execute(data); 

    return res.status(201).json(newHabitacion);
  
  } catch (error) {
    // 3. Manejo de errores de negocio (ej: Habitación duplicada, código 400)
    if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

//listar habitaciones 
router.get('/', async (req: Request, res: Response) => {
    try {
        const habitaciones = await habitacionRepository.findAll();
        return res.status(200).json(habitaciones);
    } catch (error) {
        return res.status(500).json({ message: 'Error al listar habitaciones.' });
    }
});

export default router;
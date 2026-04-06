// apps/backend/src/app.ts

// --- 1. Importaciones Esenciales ---
import express, { Request, Response, NextFunction } from 'express'; 
import cors from 'cors';
import * as dotenv from 'dotenv';

// Importaciones de Controladores (Asumimos que están en ./controllers)
import habitacionController from './controllers/habitacion.controller';
import userController from './controllers/user.controller';
import reservaController from './controllers/reserva.controller'; // Módulo final de Reservas

// Cargar variables de entorno (JWT_SECRET, etc.)
dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 3000; 

// --- 2. Middlewares Globales ---
app.use(cors()); 
app.use(express.json()); // Permite leer el body JSON

// --- 3. Rutas de la API ---
// Módulo de Habitaciones
app.use('/api/habitaciones', habitacionController);

// Módulo de Usuarios y Autenticación
app.use('/api/users', userController);

// Módulo de Reservas
app.use('/api/reservas', reservaController); 


// --- 4. Manejador de Errores Global (Debe tener 4 argumentos) ---
// 💡 SOLUCIÓN FINAL AL ERROR TS2769
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // Si el error es una instancia de Error lanzada desde el Dominio
    if (err instanceof Error) {
        // Asignamos un código de estado basado en el tipo de error
        let status = 400; // Por defecto: Bad Request (Dominio)
        if (err.message.includes('inválidas') || err.message.includes('Token')) {
            status = 401; // Unauthorized (Autenticación)
        }

        return res.status(status).json({ message: err.message });
    }
    
    // Si es un error 500 desconocido
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor.' });
}); 


// --- 5. Inicio del Servidor ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
});
// apps/backend/src/app.ts

import express from 'express'; // Importa la librería Express
import cors from 'cors';
import habitacionController from './controllers/habitacion.controller';
import userController from './controllers/user.controller';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); 
app.use('/api/habitaciones', habitacionController);
app.use('/api/users', userController);

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
});
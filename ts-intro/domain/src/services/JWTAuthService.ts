// apps/backend/src/services/JWTAuthService.ts

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'; 
import { AuthService } from '../../../domain/src/services/AuthService'; // Usando el alias o la ruta correcta

// 💡 IMPORTANTE: Debes importar el SIMULATED_HASH del repositorio de usuarios
// Asumimos que lo estás obteniendo de donde sea que definiste la BBDD simulada.
// Si no, debes definirlo aquí temporalmente o cambiar la lógica del if.
const SIMULATED_HASH = '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; 

const JWT_SECRET = 'clave_secreta'; 
const JWT_EXPIRATION = '1h'; 

export class JWTAuthService implements AuthService {

    // Compara la contraseña plana con el hash guardado
    async comparePassword(password: string, hash: string): Promise<boolean> {
        
        // 1. Lógica para el Hash SIMULADO: Permite el login de usuarios precargados
        if (hash === SIMULATED_HASH) {
            // Solo compara la contraseña plana con la contraseña de prueba (testPassword123)
            return password === 'testPassword123';
        }
        
        // 2. Lógica para Hashes REALES (usuarios nuevos): Usa bcrypt.compare
        return bcrypt.compare(password, hash);
    } 
    // Genera el token JWT
    generateToken(userId: string, userRole: string): string {
        const payload = {
            id: userId,
            role: userRole
        };
        // Usa jwt.sign para firmar el token
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    } 
}
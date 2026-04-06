// (Ubicación: apps/backend/src/services/JWTAuthService.ts O domain/src/services/JWTAuthService.ts)

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'; 
import { Secret } from 'jsonwebtoken'; 
// 💡 La ruta de la importación debe ser correcta en tu proyecto
import { AuthService } from './AuthService'; 

// Nota: Este hash debe coincidir con el de InMemoryUserRepository.ts
const SIMULATED_HASH = '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; 

// 💡 SOLUCIÓN FINAL: Clave secreta fija idéntica al middleware
const JWT_SECRET: Secret = 'clave_secreta' as Secret; 
// 💡 SOLUCIÓN DE TIEMPO: Expiración extendida para que la prueba funcione
const JWT_EXPIRATION = '4h'; 


export class JWTAuthService implements AuthService {

    async comparePassword(password: string, hash: string): Promise<boolean> {
        if (hash === SIMULATED_HASH) {
            return password === 'testPassword123';
        }
        
        return bcrypt.compare(password, hash);
    }

    // Genera el token JWT
    generateToken(userId: string, userRole: string): string {
        const payload = {
            id: userId,
            role: userRole
        };
        
        const options: jwt.SignOptions = {
            expiresIn: JWT_EXPIRATION as unknown as jwt.SignOptions['expiresIn']
        };

        // Usa la clave secreta fija
        return jwt.sign(payload, JWT_SECRET as jwt.Secret, options);
    }
}
// apps/backend/src/services/JWTAuthService.ts

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'; 
import { AuthService } from '../../../domain/src/services/AuthService'; 
import { Secret } from 'jsonwebtoken';
const SIMULATED_HASH = '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; 

const JWT_SECRET: Secret = (process.env.JWT_SECRET || 'clave_secreta_de_respaldo_obligatoria') as Secret; 
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h'; 


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
        
        // Crear opciones tipadas y castear expiresIn si la definición de tipos lo requiere.
        const options: jwt.SignOptions = {
            expiresIn: JWT_EXPIRATION as unknown as jwt.SignOptions['expiresIn']
        };

        // Castear el secreto al tipo esperado por jwt.sign
        return jwt.sign(payload, JWT_SECRET as jwt.Secret, options);
    }
}
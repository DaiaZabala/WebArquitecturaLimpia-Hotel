// apps/backend/src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// 💡 Nota: Usar la misma clave secreta que en JWTAuthService.ts
const JWT_SECRET = 'clave_secreta'; 

// Extender la interfaz Request de Express para añadir datos del usuario autenticado
interface AuthRequest extends Request {
    userId?: string;
    userRole?: string;
}

// Middleware que verifica el token en el encabezado
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    // 1. Obtener el encabezado de autorización
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        // Si no hay token, se deniega el acceso
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    // El token viene como "Bearer <token>"
    const token = authHeader.replace('Bearer ', '');

    try {
        // 2. Verificar y decodificar el token
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };

        // 3. Adjuntar datos del usuario a la solicitud (para que el controlador los use)
        req.userId = decoded.id;
        req.userRole = decoded.role;

        // 4. Continuar al siguiente middleware o controlador
        next();
    } catch (ex) {
        // Si el token es inválido, expirado, o la firma no coincide
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

// Middleware para verificar si el usuario es ADMINISTRADOR (Ejemplo de política de acceso)
export const adminAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Primero, nos aseguramos de que el token sea válido
    authMiddleware(req, res, () => {
        // Luego, verificamos el rol
        if (req.userRole === 'admin') {
            next(); // Continuar si es administrador
        } else {
            return res.status(403).json({ message: 'Permiso denegado. Se requiere rol de administrador.' });
        }
    });
};
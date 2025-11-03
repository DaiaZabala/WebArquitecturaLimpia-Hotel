// apps/backend/src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
// Importar el tipo Secret para la clave JWT
import { Secret } from 'jsonwebtoken'; 

// 💡 SOLUCIÓN DEL CONFLICTO DE CLAVE: Usamos la clave fija que decidimos.
const JWT_SECRET: Secret = 'clave_secreta'; 


// Extender la interfaz Request de Express para añadir datos del usuario autenticado
// Esto resuelve el error TS2339 (Propiedad 'userId' no existe) en los controllers.
export interface AuthRequest extends Request {
    userId?: string;
    userRole?: string;
}

// Middleware que verifica el token en el encabezado
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    // 1. Obtener el encabezado de autorización
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Si no hay token o no tiene el formato 'Bearer ', denegar acceso.
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    // El token viene como "Bearer <token>"
    const token = authHeader.replace('Bearer ', '');

    try {
        // 2. Verificar y decodificar el token usando la clave secreta
        // Utilizamos el tipo Secret que importamos arriba.
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
    // Primero, nos aseguramos de que la verificación del token pase
    authMiddleware(req, res, () => {
        // Luego, verificamos el rol
        if (req.userRole === 'admin') {
            next(); // Continuar si es administrador
        } else {
            return res.status(403).json({ message: 'Permiso denegado. Se requiere rol de administrador.' });
        }
    });
};
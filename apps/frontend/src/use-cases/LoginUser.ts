// apps/frontend/src/use-cases/LoginUser.ts

import type { AuthGateway, LoginResponse } from '../domain/services/AuthGateway';

// 💡 Exportamos la función que crea el Caso de Uso, inyectando la dependencia (AuthGateway)
export const createLoginUserUseCase = (authGateway: AuthGateway) => {

    // Retornamos la función 'execute' que contiene la lógica de negocio del frontend
    return async (email: string, password: string): Promise<LoginResponse> => {
        
        // 1. Llamar al adaptador HTTP para comunicarse con el backend
        const result = await authGateway.login(email, password);
        
        // 2. Lógica de negocio del Frontend: Guardar el token de acceso
        localStorage.setItem('auth_token', result.token);
        
        return result;
    }
}
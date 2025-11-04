// apps/frontend/src/domain/services/AuthGateway.ts

// Define la respuesta que esperamos de la API de Login
export interface LoginResponse {
    token: string;
    userId: string;
}

// Define el contrato para el servicio de autenticación
export interface AuthGateway {
    // Método para iniciar sesión
    login(email: string, password: string): Promise<LoginResponse>;
}
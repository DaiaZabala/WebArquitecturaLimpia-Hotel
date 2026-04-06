// apps/frontend/src/api/HttpHabitacionGateway.ts

import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
// 💡 La importación es correcta, asumiendo que HabitacionCreationData se exporta en el dominio
import type { HabitacionGateway, HabitacionCreationData } from '../domain/services/HabitacionGateway'; 
import type { Habitacion } from '../domain/models/Habitacion'; 

// Interfaz para la respuesta de error del Backend
interface BackendErrorResponse {
    message: string;
}

// Clase de Error Personalizada para el dominio (para errores de HTTP)
class HttpGatewayError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'HttpGatewayError';
    }
}

// 💡 Configuración Base de Axios
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

// --- INTERCEPTORES ---

// 1. 🔑 Interceptor de Solicitud: Adjuntar Token JWT
api.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        // Adjunta el token JWT en el encabezado Authorization
        config.headers.Authorization = `Bearer ${token}`; 
    }
    return config; 
});


// 2. 🚨 Interceptor de Respuesta: Manejo Centralizado de Errores
// Esto elimina los bloques try/catch de los métodos del Gateway
api.interceptors.response.use(
    (response: AxiosResponse) => response, 
    (error: AxiosError) => {
        const axiosError = error as AxiosError<BackendErrorResponse>;
        
        // Extrae el mensaje de error del cuerpo de la respuesta o usa uno por defecto
        const message = 
            axiosError.response?.data?.message || 
            axiosError.message || 
            'Error desconocido de conexión con el servidor.';
        
        // Lanza una excepción de dominio (HttpGatewayError)
        throw new HttpGatewayError(message);
    }
);

// --- GATEWAY IMPLEMENTACIÓN ---

export class HttpHabitacionGateway implements HabitacionGateway {
    
    async getAvailable(): Promise<Habitacion[]> {
        // GET /api/habitaciones
        const response = await api.get('/habitaciones'); 
        return response.data;
    }
    
    // Usa el tipo de dominio HabitacionCreationData para asegurar la compatibilidad con la interfaz
    async create(data: HabitacionCreationData): Promise<Habitacion> { 
        // POST /api/habitaciones
        const response = await api.post('/habitaciones', data);
        return response.data;
    }
}
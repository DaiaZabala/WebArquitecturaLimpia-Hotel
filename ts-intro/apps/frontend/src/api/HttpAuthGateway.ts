// apps/frontend/src/api/HttpAuthGateway.ts

import axios, { AxiosError } from 'axios';
import type { AuthGateway, LoginResponse } from '../domain/services/AuthGateway'; 

// Define la estructura que el Backend envía en caso de un error 4xx (ej: 401 Unauthorized)
interface BackendErrorResponse {
    message: string;
}

// URL de tu Backend (Express)
const BASE_URL = 'http://localhost:3000/api';

export class HttpAuthGateway implements AuthGateway {
    async login(email: string, password: string): Promise<LoginResponse> {
        try {
            // Envío de credenciales a la API de Login
            const response = await axios.post(`${BASE_URL}/users/login`, {
                email,
                password,
            });

            // Adaptar la respuesta exitosa al contrato del frontend
            return {
                token: response.data.token,
                userId: response.data.userId,
            };
        } catch (error) {
            
            // 💡 Solución: Castear el error para acceder a la respuesta HTTP de Express
            const axiosError = error as AxiosError; 
            
            // Acceder a los datos de respuesta del backend (400, 401)
            const backendData = axiosError.response?.data as BackendErrorResponse;

            // Extraer el mensaje del backend o usar un fallback genérico.
            // Si el backend es correcto, backendData.message contendrá "Credenciales inválidas."
            const message = backendData?.message || 'Error de conexión con el servidor.';
            
            // Lanzar el error para que el Caso de Uso lo capture y lo muestre en la UI.
            throw new Error(message);
        }
    }
}
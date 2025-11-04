// apps/frontend/src/ui/Login.tsx

import { useState } from 'react';
import type { FormEvent, FC } from 'react';
import styles from '../ui/Login.module.css'; 

// Importar lógica de dominio
import { createLoginUserUseCase } from '../use-cases/LoginUser'; 
import { HttpAuthGateway } from '../api/HttpAuthGateway'; 

// 💡 Conexión: Inyección de Dependencias
const authGateway = new HttpAuthGateway();
const loginUserUseCase = createLoginUserUseCase(authGateway); 

// Usamos FC (Functional Component) para tipar el componente
export const LoginComponent: FC = () => {
    // Declaración de estados
    const [email, setEmail] = useState('admin@hotel.com');
    const [password, setPassword] = useState('testPassword123');
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Declaración del manejador de eventos
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            // Llamar al Caso de Uso
            await loginUserUseCase(email, password);
            
            console.log('Login exitoso. Token guardado en LocalStorage.');
            setIsLoggedIn(true);
        } catch (err: unknown) { // Usamos 'unknown' para tipado seguro (resuelve advertencia)
            // Manejamos el error del dominio
            const errorMessage = err instanceof Error ? err.message : 'Fallo desconocido en el login.';
            setError(errorMessage);
        }
    };

    // --- Renderizado Condicional de Éxito ---
    if (isLoggedIn) {
        return (
            // Usamos la clase CSS para el estilo de éxito (resuelve advertencia de inline style)
          <div className={styles.successContainer}> 
            <h2>¡Inicio de Sesión Exitoso!</h2>
            <p>El token JWT ha sido guardado en el LocalStorage del navegador.</p>
            <p>Tu Arquitectura Limpia del Frontend está completa. 🎉</p>
        </div>
        );
    }

    // --- Renderizado del Formulario ---
    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <h3>Iniciar Sesión para Acceder a la API</h3>
            <p className={styles.info}>Credenciales de prueba: <b>admin@hotel.com</b> / <b>testPassword123</b></p>
            
            {/* Mensaje de error usando clase CSS */}
            {error && <p className={styles.error}>{error}</p>}
            
            <div className={styles.inputGroup}>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className={styles.inputField}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="password">Contraseña:</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className={styles.inputField}
                />
            </div>

            <button type="submit" className={styles.button}>
                Login
            </button>
        </form>
    );
};
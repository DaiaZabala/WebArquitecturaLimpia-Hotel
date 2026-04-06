// apps/frontend/src/ui/AvailabilitySearch.tsx (FINAL)

import React, { useState } from 'react';
// 💡 CORRECCIÓN DE RUTA: Importar desde la nueva carpeta styles
import styles from './styles/AvailabilitySearch.module.css'; 

export const AvailabilitySearch: React.FC = () => {
   const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState(''); 
    const [error, setError] = useState<string | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        if (!fechaInicio || !fechaFin) {
            setError("Por favor, seleccione ambas fechas.");
            return;
        }

        console.log(`Buscando disponibilidad de ${fechaInicio} a ${fechaFin}`);
        // 💡 NOTA: Aquí se conectaría el Caso de Uso de ListHabitaciones con las fechas
    };

    return (
        // Aplicar clase del contenedor
        <div className={styles.container}>
            <h4>📅 Verificar Disponibilidad</h4>
            
            <form onSubmit={handleSearch}>
                
                <div className={styles.inputGroup}>
                    <label htmlFor="checkin">Llegada:</label>
                    <input
                        type="date"
                        id="checkin"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        required
                        className={styles.inputField} // Usar clase CSS
                    />
                </div>
                
                <div className={styles.inputGroup}>
                    <label htmlFor="checkout">Salida:</label>
                    <input
                        type="date"
                        id="checkout"
                        value={fechaFin}
                        // 💡 CORRECCIÓN: Usar setFechaFin (asumiendo que fue un error de tipografía en el código anterior)
                        onChange={(e) => setFechaFin(e.target.value)} 
                        required
                        className={styles.inputField} // Usar clase CSS
                    />
                </div>
                
                {error && <p className={styles.errorText}>{error}</p>}

                <button type="submit" className={styles.searchButton}>
                    Buscar
                </button>
            </form>
        </div>
    );
};
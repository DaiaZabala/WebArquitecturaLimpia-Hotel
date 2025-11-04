// apps/frontend/src/ui/Home.tsx

import React from 'react';
import { Header } from './Header'; 
import { AvailabilitySearch } from './AvailabilitySearch'; 
// Asumimos que los siguientes componentes existen o se usarán como placeholders
// import { Footer } from './Footer'; 
// import { Carousel } from './Carousel'; 

import styles from './styles/Home.module.css'; 

export const HomePage: React.FC = () => {
    // 💡 Estado de Autenticación: Simulación que verifica si el token existe
    const isLoggedIn = localStorage.getItem('auth_token') ? true : false; 

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            
            {/* Contenedor Principal (Centrado) */}
            <main className={styles.mainLayout}>
                
                {/* 1. SECCIÓN SUPERIOR: Carrusel + Búsqueda (Sección 'topSection' en Flexbox) */}
                <section className={styles.topSection}>
                    
                    {/* Sidebar de Disponibilidad (a la derecha en tu boceto) */}
                    <div className={styles.sidebarReservation}>
                        <AvailabilitySearch /> 
                    </div>

                    {/* Carrusel/Área Principal (a la izquierda en tu boceto) */}
                    <div className={styles.carouselContainerWrapper}>
                        {/* 💡 Placeholder del Carrusel */}
                        <div className={styles.carouselPlaceholder}>
                            [Área del Carrusel de Imágenes - PENDIENTE]
                        </div>
                    </div>

                </section>

                {/* 2. SECCIÓN INFERIOR: Promociones (Debajo de la sección superior) */}
                <section className={styles.promotionsSection}>
                    <h2>¡Ofertas y Promociones Especiales!</h2>
                    
                    {/* Placeholder de Promociones */}
                    <div className={styles.promotionsPlaceholder}>
                        [Contenido de Promociones - PENDIENTE]
                    </div>
                </section>
                
                {/* Footer Pendiente */}
                {/* <Footer /> */}
            </main>
            
        </div>
    );
};
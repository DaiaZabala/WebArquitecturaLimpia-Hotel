// apps/frontend/src/ui/Carousel.tsx

import React, { useState, useEffect } from 'react';
import styles from '../styles/Carousel.module.css'; // Importa los estilos

// Imágenes de ejemplo (puedes reemplazarlas por URLs reales)
const images = [
    'https://images.unsplash.com/photo-1542314831-068cd1dbf26e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Habitación de lujo
    'https://images.unsplash.com/photo-1571896349882-33ce69f84742?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Piscina
    'https://images.unsplash.com/photo-1570198882885-c6f4a21f7057?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Lobby
    'https://images.unsplash.com/photo-1598925505708-307f59639c07?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Spa / Relax
];

export const Carousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Función para ir a la siguiente imagen
    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Función para ir a la imagen anterior
    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Efecto para el auto-avance del carrusel
    useEffect(() => {
        const interval = setInterval(goToNext, 5000); // Cambia de imagen cada 5 segundos
        return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    }, [currentIndex]); // Se ejecuta cada vez que cambia el índice

    return (
        <div className={styles.carouselContainer}>
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Hotel ForIT ${index + 1}`}
                    className={`${styles.carouselImage} ${index === currentIndex ? styles.active : ''}`}
                />
            ))}

            {/* Botones de navegación (opcional) */}
            <button className={`${styles.arrowButton} ${styles.prev}`} onClick={goToPrev}>
                &#10094;
            </button>
            <button className={`${styles.arrowButton} ${styles.next}`} onClick={goToNext}>
                &#10095;
            </button>

            {/* Puntos de navegación */}
            <div className={styles.carouselNav}>
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.navDot} ${index === currentIndex ? styles.active : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};
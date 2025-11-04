// apps/frontend/src/ui/Header.tsx

import React from 'react';
import styles from './Header.module.css'; // Asumimos que esta importación existe y es correcta

export const Header: React.FC<{isLoggedIn: boolean}> = ({ isLoggedIn }) => {
    return (
        // El estilo del header se carga desde Header.module.css
        <header className={styles.headerContainer}> 
            <h1>Hotel ForIT</h1>
            <nav className={styles.navContainer}>
                {/* 💡 Usuario y estado */}
                <span className={styles.userInfo}>
                    {isLoggedIn ? 'Bienvenido/a' : 'Invitado'}
                </span>
                
                {/* 💡 Botón de Login/Logout */}
                <button className={styles.authButton}>
                    {isLoggedIn ? 'Logout' : 'Login'}
                </button>
            </nav>
        </header>
    );
};
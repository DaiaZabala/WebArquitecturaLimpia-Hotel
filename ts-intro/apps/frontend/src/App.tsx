// apps/frontend/src/App.tsx (CORRECCIÓN FINAL)

import { LoginComponent } from '../src/ui/Logins';
import './App.css'; // Asegúrate de que esta importación esté

function App() {
  return (
    // 💡 SOLUCIÓN: Reemplazamos style={...} por className={styles de App.css}
    <div className="app-container"> 
      <h1>Sistema de Reservas del Hotel</h1>
      <LoginComponent /> 
    </div>
  );
}

export default App;
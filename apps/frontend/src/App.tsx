// apps/frontend/src/App.tsx (CORRECCIÓN FINAL)

import { HomePage } from '../src/ui/Home'; // 💡 Importamos la página principal
import './App.css'; 

function App() {
  return (
    // Renderizamos el componente que ensambla Header, Carrusel y Sidebar
    <div className="app-container"> 
      {/* <h1>Sistema de Reservas del Hotel</h1> <-- Este título ya está en HomePage */}
      <HomePage /> 
    </div>
  );
}

export default App;
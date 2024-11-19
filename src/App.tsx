import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';  // El archivo que tiene las rutas

const App: React.FC = () => {
  return (
    <Router>
      {/* Asegúrate de que las rutas están dentro del Router */}
      <AppRoutes />
    </Router>
  );
};

export default App;

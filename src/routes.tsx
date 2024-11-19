import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './pages/Root';
import LoginPage from './pages/LoginPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Ruta principal que usa RootLayout como contenedor */}
      <Route path="/" element={<RootLayout />}>
        {/* Rutas hijas de RootLayout */}
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

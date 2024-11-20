import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/LoginPage';  // Tu componente de Login
import MainPage from './pages/MainPage';

const router = createBrowserRouter([
  {
    path: "/login",  // Ruta para login
    element: <Login />
  },
  {
    path: "/main",  // Ruta para el menú principal
    element: <MainPage />
  },
  {
    path: "/",  // Ruta raíz
    element: <Navigate to="/login" />  // Redirige a login automáticamente
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

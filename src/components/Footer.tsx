import React from 'react';

export function Footer() {
  return (
    <p className="mt-8 text-center text-sm text-gray-600">
      Al iniciar sesión, aceptas nuestros{' '}
      <a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">
        Términos y Condiciones
      </a>
    </p>
  );
}
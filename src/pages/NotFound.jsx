import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="container py-5 text-center">
      <div className="py-5">
        <h1 className="display-4 fw-bold text-danger">404</h1>
        <h2 className="mb-3">Página no encontrada</h2>
        <p className="text-muted">La ruta solicitada no existe.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
};

export default NotFound;

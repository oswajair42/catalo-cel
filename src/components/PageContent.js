import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './PageContent.css';

const PageContent = ({ pages }) => {
  {/* Obtener el parámetro de la URL */}
  const { id } = useParams();

  {/* Buscar la página correspondiente al ID */}
  const page = pages.find(p => p.id === id);

  {/* Manejar caso cuando la página no existe */}
  if (!page) {
    return (
      <div className="page-not-found">
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <Link to="/" className="back-link">Volver al inicio</Link>
      </div>
    );
  }

  {/* Función para formatear la fecha */}
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    {/* Contenedor principal del contenido de la página */}
    <div className="page-content">
      {/* Título de la página */}
      <h1>{page.title}</h1>

      {/* Metadatos de la página (fecha de creación) */}
      <div className="page-meta">
        <span>Creado: {formatDate(page.createdAt)}</span>
      </div>

      {/* Cuerpo del contenido de la página */}
      <div className="page-body">
        {/* Mapear cada párrafo del contenido */}
        {page.content.split('\n').map((paragraph, index) => (
          paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
        ))}
      </div>
    </div>
  );
};

export default PageContent;
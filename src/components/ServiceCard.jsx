import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars.jsx';
import imagenDefault from '../assets/images/imagendefault.png';

const ServiceCard = ({ service, compact = false }) => {
  if (!service) return null;

  const {
    imagen = imagenDefault,
    nombre = 'Servicio sin nombre',
    descripcion = 'Sin descripción',
    precio = 'Consultar',
    duracion = 'N/A',
    rating = 4,
    id = '#'
  } = service;

  return (
    <div className={`service-card ${compact ? 'compact' : ''}`}>
      {compact ? (
        <div className="service-compact-content">
          <img src={imagen} alt={nombre} className="service-img" />
          <div className="service-text">
            <h3>{nombre}</h3>
            <p><strong>Precio:</strong> ${precio}</p>
            <p><strong>Duración:</strong> {duracion} min</p>
            <Link to={`/service/${id}`} className="btn-primary small">
              Ver Detalles
            </Link>
          </div>
        </div>
      ) : (
        <>
          <img src={imagen} alt={nombre} />
          <div className="service-info">
            <h3>{nombre}</h3>
            <p>{descripcion}</p>
            <p><strong>Precio:</strong> ${precio}</p>
            <p><strong>Duración:</strong> {duracion} min</p>
            <RatingStars rating={rating} />
            <Link to={`/service/${id}`} className="btn-primary">
              Ver Detalles
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceCard;

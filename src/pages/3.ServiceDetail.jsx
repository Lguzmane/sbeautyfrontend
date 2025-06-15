import React from 'react';
import { useParams } from 'react-router-dom';
import RatingStars from '../components/RatingStars.jsx';
import defaultImage from '../assets/images/imagendefault.png';
import defaultProfile from '../assets/images/profiledefaultphoto.png';

const ServiceDetail = () => {
  const { id } = useParams();

  // Simulamos los datos del servicio
  const service = {
    id: id,
    nombre: 'Manicure Profesional',
    descripcion: 'Decoración de uñas con gel y detalles artísticos.',
    precio: 15000,
    duracion: 60,
    categoria: 'Uñas',
    tipo: 'Presencial',
    rating: 4,
    images: [
      'https://via.placeholder.com/400x300',
      'https://via.placeholder.com/400x300',
    ],
    consideraciones: 'Traer uñas limpias y sin esmalte.',
    proveedor: {
      nombre: 'María Fernández',
      foto: null 
    }
  };

  return (
    <section className="service-detail">
      {/* Carrusel de imágenes */}
      <div className="service-carousel">
        {service.images.map((img, index) => (
          <div key={index} className="carousel-image">
            <img src={img || defaultImage} alt={`Imagen ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Información del servicio y proveedor */}
      <div className="service-info">
        <div className="proveedor-info">
          <div className="proveedor-photo">
            <img
              src={service.proveedor.foto || defaultProfile}
              alt="Proveedor"
            />
          </div>
          <div className="proveedor-details">
            <h2>{service.nombre}</h2>
            <RatingStars rating={service.rating} />
            <p><strong>Categoría:</strong> {service.categoria}</p>
            <p><strong>Tipo de atención:</strong> {service.tipo}</p>
            <p><strong>Duración:</strong> {service.duracion} minutos</p>
            <p><strong>Precio:</strong> ${service.precio}</p>
          </div>
        </div>

        <div className="descripcion">
          <h3>Descripción del Servicio</h3>
          <p>{service.descripcion}</p>

          <h3>Consideraciones</h3>
          <p>{service.consideraciones}</p>
        </div>

        <div className="reservar-button">
          <button className="btn-primary">Reservar ahora</button>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetail;

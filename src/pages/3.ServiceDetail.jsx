import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RatingStars from '../components/RatingStars.jsx';
import defaultImage from '../assets/images/imagendefault.png';
import defaultProfile from '../assets/images/profiledefaultphoto.png';
import { AuthContext } from '../context/AuthContext.jsx';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://sbeautybackend.onrender.com/api/servicios/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al cargar el servicio');
        }

        // Procesamiento seguro de los datos
        const processedService = {
          ...data,
          // Aseguramos que las imágenes sean un array
          imagenes: Array.isArray(data.imagenes) ? data.imagenes : [],
          // Tomamos la primera foto si es array o usamos el valor directo
          foto_proveedor: Array.isArray(data.foto_proveedor) 
            ? data.foto_proveedor[0] 
            : data.foto_proveedor
        };

        setService(processedService);
      } catch (error) {
        console.error('Error fetching service:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return <div className="loading">Cargando servicio...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!service) {
    return <div className="not-found">Servicio no encontrado</div>;
  }

  return (
    <section className="service-detail">
      {/* Carrusel de imágenes con manejo seguro */}
      <div className="service-carousel">
        {service.imagenes.length > 0 ? (
          service.imagenes.map((img, index) => (
            <div key={index} className="carousel-image">
              <img 
                src={img || defaultImage} 
                alt={`Imagen ${index + 1}`} 
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
            </div>
          ))
        ) : (
          <div className="carousel-image">
            <img src={defaultImage} alt="Imagen por defecto" />
          </div>
        )}
      </div>

      {/* Información del servicio */}
      <div className="service-info">
        <div className="proveedor-info">
          <div className="proveedor-photo">
            <img
              src={service.foto_proveedor || defaultProfile}
              alt="Proveedor"
              onError={(e) => {
                e.target.src = defaultProfile;
              }}
            />
          </div>
          <div className="proveedor-details">
            <h2>{service.nombre || 'Nombre no disponible'}</h2>
            <RatingStars rating={service.rating || 0} />
            <p><strong>Categoría:</strong> {service.categoria || 'No especificada'}</p>
            <p><strong>Tipo de atención:</strong> {service.tipo_atencion || 'No especificado'}</p>
            <p><strong>Duración:</strong> {service.duracion ? `${service.duracion} minutos` : 'No especificada'}</p>
            <p><strong>Precio:</strong> {service.precio ? `$${service.precio}` : 'Consultar'}</p>
          </div>
        </div>

        <div className="descripcion">
          <h3>Descripción del Servicio</h3>
          <p>{service.descripcion || 'No hay descripción disponible.'}</p>
        </div>

        <div className="reservar-button">
          <button
            className="btn-primary"
            onClick={() => navigate('/booking', { 
              state: { 
                servicio: {
                  id: service.id,
                  nombre: service.nombre,
                  duracion: service.duracion,
                  precio: service.precio,
                  profesional: {
                    id: service.profesional_id
                  }
                }
              }
            })}
          >
            Reservar ahora
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetail;
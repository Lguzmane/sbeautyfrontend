import React from 'react';
import { useNavigate } from 'react-router-dom';
import RatingStars from './RatingStars.jsx';
import profileDefault from '../assets/images/profiledefaultphoto.png';
import imageDefault from '../assets/images/imagendefault.png';
import { FaHeart, FaRegHeart } from "react-icons/fa";


const ProviderCard = ({ provider, compact = false, onToggleFavorite }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/provider/${provider.id}`);
  };

  // Prepara imágenes de portafolio
  const portafolioImgs = provider.portafolio?.slice(0, 3) || [];
  while (portafolioImgs.length < 3) {
    portafolioImgs.push(imageDefault);
  }

  const isFavorite = provider.isFavorite; 
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 
    if (onToggleFavorite) {
      onToggleFavorite(provider.id);
    }
  };



return (
  <div className={`provider-card ${compact ? 'compact' : ''}`} onClick={handleClick}>

    
    {/* Ícono de favorito */}
    <div className="favorite-icon" onClick={handleFavoriteClick}>
      {isFavorite ? <FaHeart color="hotpink" /> : <FaRegHeart color="gray" />}
    </div>

    <div className="provider-content">
      <div className="provider-left">
        <img
          src={provider.foto || profileDefault}
          alt={provider.nombre}
          className="provider-photo"
        />
      </div>

        <div className="provider-center">
          <div className="provider-header">
            {provider.destacado && <span className="badge">FIRST CLASS</span>}
            <h3 className="provider-name">
  {`${provider.nombre} ${provider.apellido_paterno || ''}`.trim()}
</h3>
          </div>

          {provider.categoria && (
            <p className="provider-service">{provider.categoria}</p>
          )}

          <div className="provider-rating">
            <RatingStars rating={provider.rating} />
            {!compact && (
              <span className="rating-count">
                ({provider.cantidadOpiniones || 0} opiniones)
              </span>
            )}
          </div>

          {/* Mostrar botón siempre */}
          <button className="btn-ver-perfil">Ver Perfil</button>

          {/* Datos extra solo si no es compacto */}
          {!compact && (
            <>
              <p className="provider-price">
                Precios desde <strong>$xxxxx</strong>
              </p>
              <p className="provider-location">{provider.ubicacion}</p>
              <p className="provider-attention">
                Atiende en:{' '}
                {Array.isArray(provider.lugarAtencion)
                  ? provider.lugarAtencion.join(', ')
                  : 'No especificado'}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Mostrar solo una imagen en modo compacto */}
      {compact ? (
        <div className="provider-portfolio">
          <div className="portfolio-box">
            <img
              src={portafolioImgs[0]}
              alt="portafolio-0"
              className="portfolio-image"
            />
          </div>
        </div>
      ) : (
        <div className="provider-portfolio">
          {portafolioImgs.map((img, i) => (
            <div key={i} className="portfolio-box">
              <img src={img} alt={`portafolio-${i}`} className="portfolio-image" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderCard;

import React from 'react';
import ProviderCard from '../ProviderCard.jsx';

const Favorites = ({ favoritos }) => {
  console.log('Favoritos recibidos:', favoritos);

  return (
    <div className="favorites-container">
      {Array.isArray(favoritos) && favoritos.length > 0 ? (
        favoritos.map((provider, index) => (
          <ProviderCard
            key={index}
            provider={{
              id: provider.id,
              nombre: provider.nombre,
              foto: provider.foto,
              categoria: provider.categoria,
              rating: provider.rating,
              comuna: provider.comuna,
              ubicacion: provider.comuna, 
              portafolio: [],
              cantidadOpiniones: 0, 
              lugarAtencion: [], 
              destacado: false, 
              isFavorite: true 
            }}
            compact={true}
          />
        ))
      ) : (
        <p>No tienes proveedores favoritos aún.</p>
      )}
    </div>
  );
};

export default Favorites;

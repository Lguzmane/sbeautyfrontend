import React from 'react';
import ProviderCard from '../ProviderCard.jsx';

const Favorites = ({ favoritos }) => {
  return (
    <div className="favorites-container">
      {Array.isArray(favoritos) && favoritos.length > 0 ? (
        favoritos.map((provider, index) => (
          <ProviderCard
            key={index}
            provider={provider}
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


import React, { useState } from 'react';
import ProviderCard from '../components/ProviderCard.jsx';
import ServiceFilters from '../components/ServiceFilters.jsx';

const Search = () => {
  const [filters, setFilters] = useState({
    servicio: '',
    comuna: '',
    lugar: '',
    fecha: ''
  });

  const providers = [
    {
      id: 1,
      nombre: 'María Fernández',
      categoria: 'Manicurista',
      rating: 4,
      comuna: 'Santiago Centro',
      lugarAtencion: ['Local'],
      disponibilidad: 'Hoy',
    },
    {
      id: 2,
      nombre: 'Lucía Rojas',
      categoria: 'Estilista',
      rating: 5,
      comuna: 'Providencia',
      lugarAtencion: ['Domicilio'],
      disponibilidad: 'Próximos 3 días',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filters);
  };

  return (
    <section className="search">
      <h1>Buscar Servicios</h1>

      <div className="search-layout">
        <div className="search-left">
          <form className="search-form" onSubmit={handleSubmit}>
            <ServiceFilters filters={filters} setFilters={setFilters} />
            <button type="submit" className="btn-primary">Buscar</button>
          </form>

          <div className="search-results">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>

        <div className="search-map">
          <h2>Mapa de servicios cercanos</h2>
          <div className="map-placeholder">
            <p>(Aquí irá el mapa con la ubicación de los servicios)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;



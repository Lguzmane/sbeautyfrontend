import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProviderCard from '../components/ProviderCard.jsx';
import ServiceFilters from '../components/ServiceFilters.jsx';

const API_BASE_URL = 'https://sbeautybackend.onrender.com/api';

const Search = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialFilters = {
    servicio: queryParams.get('servicio') || '',
    comuna: queryParams.get('comuna') || '',
    lugar: queryParams.get('lugar') || '',
    fecha: queryParams.get('fecha') || ''
  };

  const [filters, setFilters] = useState(initialFilters);
  const [profesionales, setProfesionales] = useState([]);
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/usuarios/profesionales`)
      .then(res => res.json())
      .then(data => {
        setProfesionales(data);
        aplicarFiltros(data, filters);
      })
      .catch(err => console.error('Error al cargar profesionales:', err));
  }, []);

  const aplicarFiltros = (data, filtros) => {
    const { servicio, comuna, lugar, fecha } = filtros;

    const hoy = new Date();

    const resultado = data.filter((p) => {
      const servicios = p.servicios || [];

      const coincideServicio =
        !servicio ||
        servicios.some(s => s.toLowerCase().includes(servicio.toLowerCase())) ||
        p.categoria?.toLowerCase().includes(servicio.toLowerCase());

      const coincideComuna =
        !comuna ||
        p.comuna?.toLowerCase().includes(comuna.toLowerCase());

      const coincideLugar =
        !lugar ||
        (p.locacion && p.locacion.toLowerCase() === lugar.toLowerCase());

      const coincideFecha = (() => {
        if (!fecha || !p.proxima_fecha) return true;

        const fechaDisponible = new Date(p.proxima_fecha);

        if (fecha === 'hoy') {
          return (
            fechaDisponible.getFullYear() === hoy.getFullYear() &&
            fechaDisponible.getMonth() === hoy.getMonth() &&
            fechaDisponible.getDate() === hoy.getDate()
          );
        }

        if (fecha === '3dias') {
          const tresDiasDespues = new Date();
          tresDiasDespues.setDate(hoy.getDate() + 3);
          return fechaDisponible >= hoy && fechaDisponible <= tresDiasDespues;
        }

        // Para "cualquier", siempre coincide
        return true;
      })();

      return coincideServicio && coincideComuna && coincideLugar && coincideFecha;
    });

    setResultadosFiltrados(resultado);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    aplicarFiltros(profesionales, filters);
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
            {resultadosFiltrados.length > 0 ? (
              resultadosFiltrados.map((profesional) => (
                <ProviderCard key={profesional.id} provider={profesional} />
              ))
            ) : (
              <p>No se encontraron profesionales con los filtros seleccionados.</p>
            )}
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

import React, { useState, useEffect } from 'react';
import serviciosData from '../data/services.json';
import clData from '../data/regions/cl.json';
import Fuse from 'fuse.js';


const ServiceFilters = ({ filters, setFilters, showOnly = [] }) => {
  // Cargar listas desde los JSON
  const allServicios = serviciosData.categorias.flatMap(cat => cat.servicios);
  const allComunas = clData.regiones.flatMap(region => region.comunas);

  // Opciones para autocompletado
  const useAutocomplete = (value, options, name) => {
    const [input, setInput] = useState(value || '');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
      const fuse = new Fuse(options, { threshold: 0.3 });
      if (input.trim() === '') {
        setSuggestions([]);
      } else {
        const results = fuse.search(input);
        setSuggestions(results.map(result => result.item));
      }
    }, [input]);

    const handleChange = (e) => {
      const val = e.target.value;
      setInput(val);
      setFilters(prev => ({ ...prev, [name]: val }));
      setShowSuggestions(true);
    };

    const handleSelect = (option) => {
      setInput(option);
      setFilters(prev => ({ ...prev, [name]: option }));
      setShowSuggestions(false);
    };

    const SuggestionsList = () => (
      showSuggestions && suggestions.length > 0 && (
        <div
          className="autocomplete-suggestions"
          onMouseDown={(e) => e.preventDefault()}
        >
          {suggestions.map((item, i) => (
            <div
              key={i}
              className="suggestion-item"
              onMouseDown={() => handleSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )
    );

    return { input, handleChange, SuggestionsList };
  };

  const servicio = useAutocomplete(filters.servicio, allServicios, 'servicio');
  const comuna = useAutocomplete(filters.comuna, allComunas, 'comuna');

  const handleSelectChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="service-filters">
      {/* Campo servicio */}
      <div className="autocomplete-input-wrapper">
        <input
          type="text"
          placeholder="¿Qué servicio buscas?"
          value={servicio.input}
          onChange={servicio.handleChange}
          onFocus={() => {}}
          className="autocomplete-input-field"
        />
        {servicio.SuggestionsList()}
      </div>

      {/* Campo comuna */}
      <div className="autocomplete-input-wrapper">
        <input
          type="text"
          placeholder="Comuna"
          value={comuna.input}
          onChange={comuna.handleChange}
          onFocus={() => {}}
          className="autocomplete-input-field"
        />
        {comuna.SuggestionsList()}
      </div>

      {/* Lugar de atención */}
      <select name="lugar" value={filters.lugar} onChange={handleSelectChange}>
        <option value="">Lugar de atención</option>
        <option value="online">Online</option>
        <option value="domicilio">Domicilio</option>
        <option value="local">Local</option>
      </select>

      {/* Fecha disponible */}
      <select name="fecha" value={filters.fecha} onChange={handleSelectChange}>
        <option value="">Fechas disponibles</option>
        <option value="hoy">Hoy</option>
        <option value="3dias">Próximos 3 días</option>
        <option value="cualquier">Cualquier fecha</option>
      </select>
    </div>
  );
};

export default ServiceFilters;

import React, { useState } from 'react';
import serviciosData from '../data/services.json';

const CreateService = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    duracion: '',
    categoria: '',
    tipoAtencion: 'Presencial',
    consideraciones: '',
    fotos: []
  });

  const categorias = serviciosData.categorias.map(c => c.nombre);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'fotos') {
      setFormData({
        ...formData,
        fotos: Array.from(files)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí conectarás con la API en el Hito 3
    console.log('Nuevo servicio:', formData);
  };

  return (
    <section className="create-service">
      <div className="create-service-container">
        <h1>Crear Nuevo Servicio</h1>
        <form onSubmit={handleSubmit} className="create-service-form">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del Servicio"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción del Servicio"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
          <div className="form-group">
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={formData.precio}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="duracion"
              placeholder="Duración (min)"
              value={formData.duracion}
              onChange={handleChange}
              required
            />
          </div>

          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            name="tipoAtencion"
            value={formData.tipoAtencion}
            onChange={handleChange}
          >
            <option value="Presencial">Presencial</option>
            <option value="Online">Online</option>
          </select>

          <textarea
            name="consideraciones"
            placeholder="Consideraciones"
            value={formData.consideraciones}
            onChange={handleChange}
          />

          <label htmlFor="fotos">Subir Fotografías (máx 3)</label>
          <input
            type="file"
            name="fotos"
            id="fotos"
            accept="image/*"
            multiple
            onChange={handleChange}
          />

          <button type="submit" className="btn-primary">Guardar Servicio</button>
        </form>
      </div>
    </section>
  );
};

export default CreateService;

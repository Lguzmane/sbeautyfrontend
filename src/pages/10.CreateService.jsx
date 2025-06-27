import React, { useState, useContext } from 'react';
import serviciosData from '../data/services.json';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const CreateService = () => {
  const { createService } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    duracion: '',
    categoria: '',
    tipoAtencion: 'Presencial',
    consideraciones: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categorias = serviciosData.categorias.map(c => c.nombre);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const datos = {
        ...formData,
        fotos: [] // no se envían imágenes por ahora
      };

      await createService(datos);
      setSuccess('✅ Servicio creado exitosamente');
      setTimeout(() => navigate('/profile'), 1000);
    } catch (err) {
      console.error('❌ Error al crear servicio:', err.message);
      setError(err.message || 'Error al crear servicio');
    }
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

          {/* Campo eliminado temporalmente */}
          {/* <label htmlFor="fotos">Subir Fotografías (máx 3)</label>
          <input
            type="file"
            name="fotos"
            id="fotos"
            accept="image/*"
            multiple
            onChange={handleChange}
          /> */}

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button type="submit" className="btn-primary">Guardar Servicio</button>
        </form>
      </div>
    </section>
  );
};

export default CreateService;

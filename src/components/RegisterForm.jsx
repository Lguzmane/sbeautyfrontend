import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clData from '../data/regions/cl.json';
import servicesData from '../data/services.json';
import { AuthContext } from '../context/AuthContext.jsx';

const RegisterForm = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const regiones = clData.regiones.map(r => r.nombre);
  const categorias = servicesData.categorias.map(cat => cat.nombre);

  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '', apellidoPaterno: '', apellidoMaterno: '', rut: '',
    email: '', telefono: '', password: '', confirmPassword: '',
    region: '', comuna: '', tipoUsuario: 'Cliente',
    experiencia: '', certificaciones: '', categoria: '', otraCategoria: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'region') {
      const regionSeleccionada = clData.regiones.find(r => r.nombre === value);
      setComunasDisponibles(regionSeleccionada ? regionSeleccionada.comunas : []);
      setFormData(prev => ({ ...prev, region: value, comuna: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      nombre, apellidoPaterno, apellidoMaterno, email, telefono,
      password, confirmPassword, region, comuna,
      categoria, otraCategoria, tipoUsuario, rut
    } = formData;

    if (!nombre || !apellidoPaterno || !apellidoMaterno || !email || !telefono || !password || !confirmPassword || !region || !comuna) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    if (!email.includes('@')) {
      setError('El correo electrónico no es válido.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (tipoUsuario === 'Profesional' && categoria === '') {
      setError('Selecciona una categoría de servicio.');
      return;
    }

    if (tipoUsuario === 'Profesional' && categoria === 'Otra' && !otraCategoria.trim()) {
      setError('Especifica tu categoría de servicio.');
      return;
    }

    setError('');
    const categoriaFinal = categoria === 'Otra' ? otraCategoria : categoria;
    const datosFinales = {
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      rut,
      email,
      telefono,
      password,
      region,
      comuna,
      rol: tipoUsuario,
      categoria: categoriaFinal,
      experiencia: formData.experiencia,
      certificaciones: formData.certificaciones
    };

    try {
      const response = await fetch('https://sbeautybackend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosFinales)
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Error en el registro.');
        return;
      }

      // Guardar token y usuario si se desea
localStorage.setItem('token', data.token);
localStorage.setItem('user', JSON.stringify(data.user));
setUser(data.user); 
navigate('/');

    } catch (err) {
      console.error('Error en el registro:', err);
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input type="text" name="apellidoPaterno" placeholder="Apellido Paterno" value={formData.apellidoPaterno} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <input type="text" name="apellidoMaterno" placeholder="Apellido Materno" value={formData.apellidoMaterno} onChange={handleChange} required />
        <input type="text" name="rut" placeholder="RUT" value={formData.rut} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" value={formData.confirmPassword} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <select name="region" value={formData.region} onChange={handleChange} required>
          <option value="">Selecciona una región</option>
          {regiones.map((region, i) => (
            <option key={i} value={region}>{region}</option>
          ))}
        </select>

        <select name="comuna" value={formData.comuna} onChange={handleChange} required>
          <option value="">Selecciona una comuna</option>
          {comunasDisponibles.map((comuna, i) => (
            <option key={i} value={comuna}>{comuna}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <select name="tipoUsuario" value={formData.tipoUsuario} onChange={handleChange} required>
          <option value="Cliente">Cliente</option>
          <option value="Profesional">Profesional</option>
        </select>
      </div>

      {formData.tipoUsuario === 'Profesional' && (
        <>
          <div className="form-group">
            <select name="categoria" value={formData.categoria} onChange={handleChange} required>
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
              <option value="Otra">Otra</option>
            </select>
          </div>

          {formData.categoria === 'Otra' && (
            <div className="form-group">
              <input
                type="text"
                name="otraCategoria"
                placeholder="Especifica tu categoría"
                value={formData.otraCategoria}
                onChange={handleChange}
                required
              />
            </div>
          )}
        </>
      )}

      <button type="submit" className="btn-primary">Registrarse</button>
    </form>
  );
};

export default RegisterForm;

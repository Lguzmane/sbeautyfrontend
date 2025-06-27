import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('El correo electrónico no es válido.');
      return;
    }

    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al iniciar sesión.');
        return;
      }

      // Guardar usuario y token en localStorage
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('Usuario logueado:', data.user);
      navigate('/');

    } catch (err) {
      console.error('Error en login:', err);
      setError('Error de conexión con el servidor.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn-primary">
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;

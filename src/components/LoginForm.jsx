import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!email.includes('@')) {
      setError('El correo electrónico no es válido.');
      return;
    }

    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    // Si todo está bien
    setError('');
    login(email, password);  // Simula el login
    console.log(`Usuario autenticado: ${email}`);
    navigate('/');  // Redirige al home después del login
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

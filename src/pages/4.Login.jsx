import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';

const Login = () => {
  return (
    <section className="login">
      <div className="login-container">
        <h1>Iniciar Sesión</h1>
        <LoginForm />  {/* Aquí usamos el componente que conecta con AuthContext */}
        <p className="login-register">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

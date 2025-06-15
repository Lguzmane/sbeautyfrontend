import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm.jsx';

const Register = () => {
  return (
    <section className="register">
      <div className="register-container">
        <h1>Registrarse</h1>
        <RegisterForm />  {/* Aquí usamos el componente que conecta con AuthContext */}
        <p className="register-login">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;

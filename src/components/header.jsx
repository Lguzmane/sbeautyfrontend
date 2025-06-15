import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>SBeauty</h1>
        </Link>
        <nav className="nav">
          <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/search">Buscar Servicios</Link></li>
            {user ? (
              <>
                <li><Link to="/profile">{user.nombre}</Link></li>
                <li><button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Iniciar Sesión</Link></li>
                <li><Link to="/register">Registrarse</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

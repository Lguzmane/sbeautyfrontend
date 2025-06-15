import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Sbeauty. Todos los derechos reservados.</p>
        <p>Contacto: contacto@sbeauty.cl</p>
      </div>
    </footer>
  );
};

export default Footer;

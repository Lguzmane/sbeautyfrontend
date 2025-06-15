import React from 'react';
import { Link } from 'react-router-dom';
import ServiceFilters from '../components/ServiceFilters.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import imagenDefault from '../assets/images/imagendefault.png';

const Home = () => {
  const [filters, setFilters] = React.useState({
    servicio: '',
    comuna: ''
  });

  // Simulación de servicios recomendados
  const recommendedServices = [
    {
      id: 1,
      nombre: 'Peinado Novia',
      descripcion: 'Peinado profesional para novias.',
      precio: 25000,
      imagen: imagenDefault,
      rating: 5
    },
    {
      id: 2,
      nombre: 'Manicure Gel',
      descripcion: 'Manicure con esmalte en gel de larga duración.',
      precio: 15000,
      imagen: imagenDefault,
      rating: 4.8
    },
    {
      id: 3,
      nombre: 'Extensiones de Pestañas',
      descripcion: 'Extensiones pelo a pelo con acabado natural.',
      precio: 20000,
      imagen: imagenDefault,
      rating: 4.9
    }
  ];

  return (
    <section className="home">
      {/* Hero principal */}
      <div className="home-hero">
        <h1 className="hero-title">Bienvenida a SBeauty</h1>
        <p className="hero-subtitle">Encuentra tu especialista en belleza</p>

        <form className="home-search-form filters-home">
          <ServiceFilters filters={filters} setFilters={setFilters} />
          <Link to="/search" className="btn-primary">Buscar Servicios</Link>
        </form>
      </div>

      {/* Categorías destacadas */}
      <div className="home-categories">
        <h2 className="section-title">¿Qué necesitas hoy?</h2>
        <div className="category-list">
          <div className="category-item">Manicure</div>
          <div className="category-item">Pestañas</div>
          <div className="category-item">Maquillaje</div>
          <div className="category-item">Peluquería</div>
          <div className="category-item">Depilación</div>
        </div>
      </div>

      {/* Carrusel de servicios recomendados */}
      <div className="home-carousel">
        <h2 className="section-title">Servicios recomendados en tu comuna</h2>
        <div className="carousel-wrapper">
          {recommendedServices.map(servicio => (
            servicio?.nombre && servicio?.imagen && (
              <ServiceCard key={servicio.id} service={servicio} />
            )
          ))}
        </div>
      </div>

      {/* Sección "Eres una profesional" */}
      <div className="home-pro-section">
        <div className="home-pro-container">
          <div className="pro-img-placeholder" />
          <div className="home-providers-cta">
            <h2 className="section-title">¿Eres una profesional de la belleza?</h2>
            <p>Únete a SBeauty y comienza a ofrecer tus servicios en tu comuna. Llega a más clientas y administra tus reservas fácilmente.</p>
            <Link to="/register" className="btn-primary">Quiero unirme</Link>
          </div>
        </div>
      </div>

      {/* Tips para clientas */}
      <div className="home-client-tips-section">
        <div className="home-client-container">
          <div className="home-client-tips">
            <h2 className="section-title">Tips para clientas</h2>
            <ul className="tips-list">
              <li>Lee con atención las condiciones del servicio.</li>
              <li>Revisa el portafolio y opiniones de otras clientas.</li>
              <li>Llega puntual a tu cita.</li>
              <li>Confirma tu reserva a tiempo.</li>
            </ul>
          </div>
          <div className="client-img-placeholder" />
        </div>
      </div>
    </section>
  );
};

export default Home;

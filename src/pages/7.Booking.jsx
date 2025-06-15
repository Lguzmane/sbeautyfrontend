import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarGrid from '../components/CalendarGrid.jsx';
import { useCart } from '../context/CartContext.jsx';

const Booking = () => {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCart();

  const serviciosDisponibles = [
    { id: 1, nombre: 'Manicure Profesional', duracion: 60, precio: 15000 },
    { id: 2, nombre: 'Pedicure', duracion: 45, precio: 18000 },
    { id: 3, nombre: 'Maquillaje', duracion: 30, precio: 20000 }
  ];

  const profesional = 'María Fernández';
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [selectedBlocks, setSelectedBlocks] = useState([]);

  const duracionTotal = serviciosSeleccionados.reduce(
    (total, servicio) => total + servicio.duracion,
    0
  );

  const precioTotal = serviciosSeleccionados.reduce(
    (total, servicio) => total + servicio.precio,
    0
  );

  const handleServicioClick = (servicio) => {
    setServiciosSeleccionados((prev) =>
      prev.some((s) => s.id === servicio.id)
        ? prev.filter((s) => s.id !== servicio.id)
        : [...prev, servicio]
    );
  };

  const handleIrAlCarrito = () => {
    if (serviciosSeleccionados.length === 0 || selectedBlocks.length === 0) {
      alert('Por favor, selecciona al menos un servicio y un horario disponible.');
      return;
    }
    agregarAlCarrito(serviciosSeleccionados);
    navigate('/cart');
  };

  const handleVerDetalle = (servicio) => {
    navigate(`/service/${servicio.id}`);
  };

  const handleBlockSelect = (day, time) => {
    const [hour, minute] = time.split(':').map(Number);
    const blocksToSelect = Math.ceil(duracionTotal / 30);
    const newSelected = [];

    for (let i = 0; i < blocksToSelect; i++) {
      const blockHour = hour + Math.floor((minute + i * 30) / 60);
      const blockMinute = (minute + i * 30) % 60;
      const blockTime = `${blockHour}:${blockMinute === 0 ? '00' : blockMinute}`;
      newSelected.push({ id: `${day}-${blockTime}`, day, time: blockTime });
    }

    setSelectedBlocks(newSelected);
  };

  return (
    <section className="booking">
      <div className="booking-container">
        <h1>Agendar Hora</h1>
        <h2>Servicios disponibles</h2>
        <div className="servicios-grid">
          {serviciosDisponibles.map((servicio) => {
            const isSelected = serviciosSeleccionados.some((s) => s.id === servicio.id);
            return (
              <div
                key={servicio.id}
                className={`servicio-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleServicioClick(servicio)}
              >
                <h3>{servicio.nombre}</h3>
                <p><strong>Duración:</strong> {servicio.duracion} min</p>
                <p><strong>Precio:</strong> ${servicio.precio}</p>
                <button
                  className="detalle-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVerDetalle(servicio);
                  }}
                >
                  Ver detalle
                </button>
              </div>
            );
          })}
        </div>

        <div className="booking-summary">
          <h2>Resumen</h2>
          <p><strong>Profesional:</strong> {profesional}</p>
          <p><strong>Duración total:</strong> {duracionTotal} minutos</p>
          <p><strong>Precio total:</strong> ${precioTotal}</p>
        </div>

        <CalendarGrid
          duracionServicio={duracionTotal}
          onBlockSelect={handleBlockSelect}
          selectedBlocks={selectedBlocks}
        />

        <button type="button" className="btn-primary" onClick={handleIrAlCarrito}>
          Agregar al carrito
        </button>
      </div>
    </section>
  );
};

export default Booking;


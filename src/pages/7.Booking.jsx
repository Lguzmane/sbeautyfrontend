import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CalendarGrid from '../components/CalendarGrid.jsx';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { fetchWithToken } = useContext(AuthContext);

  const { servicio } = location.state || {};
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarReservas = async () => {
      if (!servicio?.profesional?.id) return;
      try {
        const res = await fetchWithToken(`/api/reservas/profesional/${servicio.profesional.id}`);
        setReservas(Array.isArray(res) ? res : []);
      } catch (err) {
        console.warn("Proveedor sin reservas, se asumirá disponibilidad total.");
        setReservas([]);
      }
    };

    cargarReservas();
  }, [servicio, fetchWithToken]);

  if (!servicio) {
    return <div className="error-message">No se proporcionó información del servicio.</div>;
  }

  const profesional = servicio.profesional?.nombre || 'Profesional';

  const getReservaDate = () => {
    if (selectedBlocks.length === 0) return null;
    const block = selectedBlocks[0];

    if (!block.day || !block.time) return null;

    const [hour, minute] = block.time.split(':');
    const timeFormatted = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
    const dateTimeStr = `${block.day}T${timeFormatted}:00`;
    const date = new Date(dateTimeStr);

    console.log("🧩 Bloque seleccionado:", block);
    console.log("📅 Fecha creada:", date);

    if (isNaN(date)) return null;

    return date;
  };

  const handleConfirmarReserva = async () => {
    const fecha = getReservaDate();

    if (!fecha) {
      setError('Por favor selecciona un horario válido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reservaData = {
        servicio_id: servicio.id,
        fecha: fecha.toISOString(),
        duracion: servicio.duracion,
        monto: servicio.precio,
        metodo_pago: 'Transferencia'
      };

      const reservaCreada = await fetchWithToken('/api/reservas', {
        method: 'POST',
        body: JSON.stringify(reservaData)
      });

      const itemCarrito = {
        id: reservaCreada.id,
        servicioId: servicio.id,
        nombre: servicio.nombre,
        profesional: {
          id: servicio.profesional?.id,
          nombre: servicio.profesional?.nombre
        },
        fecha: fecha.toISOString(),
        duracion: servicio.duracion,
        precio: servicio.precio,
        imagen: servicio.imagenes?.[0] || null
      };

      addToCart(itemCarrito);
      navigate('/cart');
    } catch (error) {
      console.error('Error al crear reserva:', error);
      setError(error.message || 'Error al confirmar la reserva');
    } finally {
      setLoading(false);
    }
  };

  const handleBlockSelect = (day, time) => {
    const [hour, minute] = time.split(':').map(Number);
    const blocksNeeded = Math.ceil(servicio.duracion / 30);
    const newSelected = [];

    for (let i = 0; i < blocksNeeded; i++) {
      const totalMinutes = minute + i * 30;
      const blockHour = hour + Math.floor(totalMinutes / 60);
      const blockMinute = totalMinutes % 60;
      const blockTime = `${blockHour}:${blockMinute.toString().padStart(2, '0')}`;
      
      newSelected.push({
        id: `${day}-${blockTime}`,
        day,
        time: blockTime
      });
    }

    setSelectedBlocks(newSelected);
  };

  return (
    <section className="booking">
      <div className="booking-container">
        <h1>Agendar Hora</h1>

        <div className="booking-summary">
          <p><strong>Profesional:</strong> {profesional}</p>
          <p><strong>Servicio:</strong> {servicio.nombre}</p>
          <p><strong>Duración:</strong> {servicio.duracion} minutos</p>
          <p><strong>Precio:</strong> ${servicio.precio}</p>
        </div>

        <CalendarGrid
          reservations={reservas}
          duracionServicio={servicio.duracion}
          onBlockSelect={handleBlockSelect}
          selectedBlocks={selectedBlocks}
        />

        {error && <div className="error-message">{error}</div>}

        <button
          type="button"
          className="btn-primary"
          onClick={handleConfirmarReserva}
          disabled={loading || selectedBlocks.length === 0}
        >
          {loading ? 'Procesando...' : 'Confirmar reserva'}
        </button>
      </div>
    </section>
  );
};

export default Booking;

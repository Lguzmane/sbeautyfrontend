import React, { useState, useEffect, useContext } from 'react';
import CalendarGrid from '../components/CalendarGrid.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const Schedule = () => {
  const { fetchWithToken } = useContext(AuthContext);
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [calendarData, setCalendarData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleBlockSelect = (day, time) => {
    const blockId = `${day}-${time}`;
    setSelectedBlocks((prev) =>
      prev.some((b) => b.id === blockId)
        ? prev.filter((b) => b.id !== blockId)
        : [...prev, { id: blockId, day, time }]
    );
  };

  const handleReservar = async () => {
    if (selectedBlocks.length === 0 || loading) return;

    setLoading(true);
    try {
      const horarios = selectedBlocks.map(block => {
        const [hours, minutes] = block.time.split(':');
        const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
        const fecha = new Date(`${block.day}T${formattedTime}:00`);
        return { fecha: fecha.toISOString() };
      });

      console.log("Horarios a enviar:", horarios);

      const response = await fetchWithToken('/api/bloqueos/bloquear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ horarios, tipo_reserva: 'bloqueo' }) // ✅ CORREGIDO
      });

      console.log("Respuesta del backend:", response);
      alert("Horarios bloqueados");

      if (!response) throw new Error('No hubo respuesta del servidor');
      
      setSelectedBlocks([]);
      await cargarBloqueos();
    } catch (error) {
      console.error("Error en reserva:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLiberar = async () => {
    if (selectedBlocks.length === 0 || loading) return;

    setLoading(true);
    try {
      const horarios = selectedBlocks.map(block => {
        const [hours, minutes] = block.time.split(':');
        const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
        return { fecha: new Date(`${block.day}T${formattedTime}:00`).toISOString() };
      });

      const response = await fetchWithToken('/api/profesional/bloqueos/liberar', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ horarios })
      });

      if (!response) throw new Error('No hubo respuesta del servidor');
      
      setSelectedBlocks([]);
      await cargarBloqueos();
    } catch (error) {
      console.error("Error liberando horarios:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const cargarBloqueos = async () => {
    setLoading(true);
    try {
      const response = await fetchWithToken('/api/reservas/profesional');
      
      if (!response) {
        throw new Error('Error al conectar con el servidor');
      }

      const bloqueos = response.filter(r => r.tipo_reserva === 'bloqueo');

      const nuevaAgenda = {};
      bloqueos.forEach(({ fecha, estado }) => {
        if (estado === 'activo') {
          const date = new Date(fecha);
          const dia = date.toISOString().split('T')[0];
          const hora = date.getHours().toString().padStart(2, '0') + ':' + 
                      date.getMinutes().toString().padStart(2, '0');
          
          nuevaAgenda[dia] = nuevaAgenda[dia] || {};
          nuevaAgenda[dia][hora] = 'Bloqueado';
        }
      });

      setCalendarData(nuevaAgenda);
    } catch (error) {
      console.error("Error cargando agenda:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarBloqueos();
  }, []);

  return (
    <section className="schedule">
      <div className="schedule-container">
        <h1>Gestión de Agenda Profesional</h1>
        <p>Selecciona horarios y gestiona tu disponibilidad</p>

        <div className="acciones-container">
          <button 
            className={`btn-action ${loading ? 'disabled' : ''}`}
            onClick={handleReservar}
            disabled={loading || selectedBlocks.length === 0}
          >
            {loading ? 'Procesando...' : 'Reservar'}
          </button>
          <button 
            className={`btn-action ${loading ? 'disabled' : ''}`}
            onClick={handleLiberar}
            disabled={loading || selectedBlocks.length === 0}
          >
            {loading ? 'Procesando...' : 'Liberar'}
          </button>
        </div>

        <CalendarGrid
          onBlockSelect={handleBlockSelect}
          selectedBlocks={selectedBlocks}
          calendarData={calendarData}
          reservations={calendarData}
          loading={loading}
        />
      </div>
    </section>
  );
};

export default Schedule;

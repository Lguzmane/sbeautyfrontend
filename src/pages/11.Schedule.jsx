import React, { useState } from 'react';
import CalendarGrid from '../components/CalendarGrid.jsx';

const Schedule = () => {
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [calendarData, setCalendarData] = useState({});

  const handleBlockSelect = (day, time) => {
    const blockId = `${day}-${time}`;
    setSelectedBlocks((prev) =>
      prev.some((b) => b.id === blockId)
        ? prev.filter((b) => b.id !== blockId)
        : [...prev, { id: blockId, day, time }]
    );
  };

  const handleReservar = () => {
    setCalendarData((prev) => {
      const updated = { ...prev };
      selectedBlocks.forEach(({ day, time }) => {
        if (!updated[day]) updated[day] = {};
        updated[day][time] = 'Reservado';
      });
      return updated;
    });
    setSelectedBlocks([]);
  };

  const handleLiberar = () => {
    setCalendarData((prev) => {
      const updated = { ...prev };
      selectedBlocks.forEach(({ day, time }) => {
        if (updated[day]) {
          delete updated[day][time];
          if (Object.keys(updated[day]).length === 0) {
            delete updated[day];
          }
        }
      });
      return updated;
    });
    setSelectedBlocks([]);
  };

  return (
    <section className="schedule">
      <div className="schedule-container">
        <h1>Agenda de Citas</h1>
        <p>Visualiza y gestiona tus horarios disponibles y citas reservadas.</p>

        {/* Botones de acción */}
        <div className="acciones-container">
          <button className="btn-action" onClick={handleReservar}>
            Reservar
          </button>
          <button className="btn-action" onClick={handleLiberar}>
            Liberar
          </button>
        </div>

        {/* Calendario */}
        <CalendarGrid
          onBlockSelect={handleBlockSelect}
          selectedBlocks={selectedBlocks}
          calendarData={calendarData}
        />
      </div>
    </section>
  );
};

export default Schedule;

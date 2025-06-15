import React, { useState } from 'react';

// Helpers
const getDayAbbreviation = (date) =>
  date.toLocaleDateString('es-ES', { weekday: 'short' }).charAt(0).toUpperCase() +
  date.toLocaleDateString('es-ES', { weekday: 'short' }).slice(1, 3);

const formatDate = (date) =>
  `${date.getDate()} ${date.toLocaleDateString('es-ES', { month: 'short' })}`;

const generateTimeSlots = (start, end, interval) => {
  const slots = [];
  let current = start * 60;
  const endTime = end * 60;
  while (current < endTime) {
    const hours = Math.floor(current / 60);
    const minutes = current % 60;
    slots.push(`${hours}:${minutes === 0 ? '00' : minutes}`);
    current += interval;
  }
  return slots;
};

const CalendarGrid = ({
  reservations = [],
  onBlockSelect,
  onDaySelect,
  selectedBlocks = [],
  calendarData = {}
}) => {
  const [isAM, setIsAM] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  const toggleAMPM = () => {
    setIsAM(!isAM);
  };

  const nextDays = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);
    return date;
  });

  const timeSlots = isAM
    ? generateTimeSlots(8, 12, 30)
    : generateTimeSlots(12, 18, 30);

  const isReserved = (day, time) =>
    reservations.some((r) => r.day === day && r.time === time);

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const handleDayClick = (dayStr) => {
    timeSlots.forEach((time) => {
      onBlockSelect(dayStr, time, timeSlots, reservations);
    });
  };

  return (
    <div className="calendar-container">
      {/* AM/PM */}
      <div className="ampm-toggle">
        <button
          className={`btn-toggle ${isAM ? 'active' : ''}`}
          onClick={toggleAMPM}
        >
          AM
        </button>
        <button
          className={`btn-toggle ${!isAM ? 'active' : ''}`}
          onClick={toggleAMPM}
        >
          PM
        </button>
      </div>

      {/* Cabecera de días */}
      <div className="days-header">
        <button className="nav-arrow prev" onClick={handlePrev}>
          &lt;
        </button>
        <div className="days-container">
          {nextDays.map((date, idx) => {
            const dayStr = date.toDateString();
            const isSelectedDay = selectedBlocks.some((b) => b.day === dayStr);
            return (
              <div
                key={idx}
                className={`day-card ${isSelectedDay ? 'selected' : ''}`}
                onClick={() => handleDayClick(dayStr)}
              >
                <div className="day-name">{getDayAbbreviation(date)}</div>
                <div className="day-date">{formatDate(date)}</div>
              </div>
            );
          })}
        </div>
        <button className="nav-arrow next" onClick={handleNext}>
          &gt;
        </button>
      </div>

      {/* Cuerpo del calendario */}
      <div className="calendar-grid">
        {timeSlots.map((time, idx) => (
          <div key={idx} className="time-row">
            {nextDays.map((date, j) => {
              const dayStr = date.toDateString();
              const isSelected = selectedBlocks.some(
                (b) => b.day === dayStr && b.time === time
              );
              const motivo = calendarData[dayStr]?.[time];

              return (
                <div
                  key={j}
                  className={`time-slot ${isReserved(dayStr, time) ? 'reserved' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => onBlockSelect(dayStr, time, timeSlots, reservations)}
                >
                  {motivo ? motivo : time}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;

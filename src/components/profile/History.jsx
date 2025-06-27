import React, { useState } from 'react';
import profileDefault from "../../assets/images/profiledefaultphoto.png";

const History = ({ historialRecibidos = [], historialRealizados = [] }) => {
  const [activeHistoryTab, setActiveHistoryTab] = useState('recibidos');

  const currentItems =
    activeHistoryTab === 'recibidos' ? historialRecibidos : historialRealizados;

  // 👉 Función para formatear fecha
const formatearFecha = (fechaStr) => {
  if (!fechaStr) return 'Fecha no disponible';
  const fecha = new Date(fechaStr);
  return fecha.toLocaleDateString('es-CL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};


  return (
    <div className="history-grid">
      <div className="history-tabs">
        <button
          className={activeHistoryTab === 'recibidos' ? 'active' : ''}
          onClick={() => setActiveHistoryTab('recibidos')}
        >
          Recibidos <span>➤</span>
        </button>
        <button
          className={activeHistoryTab === 'realizados' ? 'active' : ''}
          onClick={() => setActiveHistoryTab('realizados')}
        >
          Realizados <span>➤</span>
        </button>
      </div>

      <div className="history-content">
        {Array.isArray(currentItems) && currentItems.length > 0 ? (
          currentItems.map((item, index) => {
            const {
              nombreServicio = 'Servicio desconocido',
              contraparte = 'Sin nombre',
              rol = 'cliente',
              fecha = 'Fecha no disponible',
              estado = 'completado',
              foto = '',
              monto = null
            } = item;

            return (
              <div key={index} className="history-item">
                <img
                  src={foto || profileDefault}
                  alt="contraparte"
                  className="history-photo"
                />
                <div className="history-info">
                  <h4>{nombreServicio}</h4>
                  <p>{rol === 'cliente' ? `Con: ${contraparte}` : `Cliente: ${contraparte}`}</p>
                  <p>{formatearFecha(fecha)}</p>
                  <p>Estado: {estado}</p>
                  {monto !== null && (
                    <p>Monto: ${monto.toLocaleString('es-CL')}</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>No hay historial disponible.</p>
        )}
      </div>
    </div>
  );
};

export default History;

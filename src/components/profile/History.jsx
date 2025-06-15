import React, { useState } from 'react';
import profileDefault from "../../assets/images/profiledefaultphoto.png";


const History = ({ historialRecibidos = [], historialRealizados = [] }) => {
  const [activeHistoryTab, setActiveHistoryTab] = useState('recibidos');

  const currentItems =
    activeHistoryTab === 'recibidos' ? historialRecibidos : historialRealizados;

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
              hora = '',
              estado = 'completado',
              foto = profileDefault,
              monto = null
            } = item;

            return (
              <div key={index} className="history-item">
                <img src={foto || profileDefault} alt="contraparte" className="history-photo" />
                <div className="history-info">
                  <h4>{nombreServicio}</h4>
                  <p>{rol === 'cliente' ? `Con: ${contraparte}` : `Cliente: ${contraparte}`}</p>
                  <p>{fecha} {hora && `– ${hora}`}</p>
                  <p>Estado: {estado}</p>
                  {monto && <p>Monto: ${monto}</p>}
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

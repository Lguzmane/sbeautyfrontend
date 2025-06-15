import React from 'react';
import profileDefault from '../assets/images/profiledefaultphoto.png';

const HistoryItem = ({ item }) => {
  const {
    nombreServicio = 'Servicio desconocido',
    contraparte = 'Sin nombre',
    rol = 'cliente', // 'cliente' o 'proveedor'
    fecha = 'Fecha no disponible',
    hora = '',
    estado = 'completado',
    foto = profileDefault,
    monto = null
  } = item;

  return (
    <div className="history-item">
      <img src={foto} alt="contraparte" className="history-photo" />
      <div className="history-info">
        <h4>{nombreServicio}</h4>
        <p>{rol === 'cliente' ? `Con: ${contraparte}` : `Cliente: ${contraparte}`}</p>
        <p>{fecha} {hora && `– ${hora}`}</p>
        <p>Estado: {estado}</p>
        {monto && <p>Monto: ${monto}</p>}
      </div>
    </div>
  );
};

export default HistoryItem;

import React, { createContext, useState } from 'react';

// Creamos el contexto
export const ServicesContext = createContext();

// Creamos el proveedor del contexto
const ServicesProvider = ({ children }) => {
  const [servicios, setServicios] = useState([]);

  // Simulación de carga de servicios (esto se conectará a la API en el Hito 3)
  const cargarServicios = () => {
    const fakeServicios = [
      {
        id: 1,
        nombre: 'Manicure Profesional',
        descripcion: 'Uñas de gel y decoración artística.',
        precio: 15000,
        imagen: 'https://via.placeholder.com/200'
      },
      {
        id: 2,
        nombre: 'Peinado de Fiesta',
        descripcion: 'Peinados modernos para ocasiones especiales.',
        precio: 20000,
        imagen: 'https://via.placeholder.com/200'
      }
    ];
    setServicios(fakeServicios);
    console.log('Servicios cargados:', fakeServicios);
  };

  return (
    <ServicesContext.Provider value={{ servicios, cargarServicios }}>
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;

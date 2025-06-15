import React, { createContext, useState } from 'react';

// Creamos el contexto
export const AuthContext = createContext();

// Creamos el proveedor del contexto
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulación de login
  const login = (email, password) => {
    const fakeUser = {
      nombre: 'María Fernández',
      email: email,
      rol: 'Profesional'
    };
    setUser(fakeUser);
    console.log('Usuario logueado:', fakeUser);
  };

  // Simulación de registro
  const register = (formData) => {
    const fakeUser = {
      nombre: formData.nombre,
      email: formData.email,
      rol: formData.tipoUsuario || 'Cliente'
    };
    setUser(fakeUser);
    console.log('Usuario registrado y logueado:', fakeUser);
  };

  const logout = () => {
    setUser(null);
    console.log('Usuario deslogueado');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verifica si hay token y usuario guardado al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.id && parsedUser?.email) {
          setUser(parsedUser);
          console.log('✅ Usuario restaurado desde localStorage:', parsedUser);
        } else {
          throw new Error('Formato inválido');
        }
      } catch (error) {
        console.error('❌ Error al parsear usuario desde localStorage:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } else {
      console.log('ℹ️ No hay usuario guardado en localStorage');
    }
  }, []);

  // Login real
  const login = async (email, password) => {
    try {
      const response = await fetch('https://sbeautybackend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Credenciales inválidas');

      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('✅ Usuario logueado:', data.user);
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error.message);
    }
  };

  // Registro real
  const register = async (formData) => {
    try {
      const response = await fetch('https://sbeautybackend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al registrar');

      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('✅ Usuario registrado y logueado:', data.user);
    } catch (error) {
      console.error('❌ Error en el registro:', error.message);
    }
  };

  // Obtener perfil actualizado desde backend
  const getProfile = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch('https://sbeautybackend.onrender.com/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al obtener perfil');
    }

    setUser(result.user);
    localStorage.setItem('user', JSON.stringify(result.user));
    return result.user;
  };

  // Actualizar perfil
  const updateProfile = async (id, data) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`https://sbeautybackend.onrender.com/api/auth/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al actualizar perfil');
    }

    setUser(result.user);
    localStorage.setItem('user', JSON.stringify(result.user));
    return result.user;
  };

  // Crear servicio (nuevo)
  const createService = async (formData) => {
    const token = localStorage.getItem('token');

    const response = await fetch('https://sbeautybackend.onrender.com/api/servicios', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al crear servicio');
    return data;
  };

  // Función para peticiones autenticadas con token
  const fetchWithToken = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error en la solicitud');
    return data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    console.log('👋 Usuario deslogueado');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        setUser,
        getProfile,
        updateProfile,
        fetchWithToken,
        createService // ✅ ¡NUEVO!
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

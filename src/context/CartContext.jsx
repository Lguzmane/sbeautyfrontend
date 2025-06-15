import { createContext, useContext, useState } from 'react';

// 1. Crear el contexto
const CartContext = createContext();

// 2. Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Agregar servicio al carrito
  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  // Eliminar servicio del carrito
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Hook para usar el contexto fácilmente
export const useCart = () => useContext(CartContext);

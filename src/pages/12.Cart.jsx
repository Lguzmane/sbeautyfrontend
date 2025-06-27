import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

const Cart = () => {
  const { cartItems, eliminarDelCarrito } = useCart();

  // 🔧 Aseguramos que todos los precios sean números
  const subtotal = cartItems.reduce((total, item) => total + Number(item.precio), 0);

  const [descuento, setDescuento] = useState(0);
  const [codigoCupon, setCodigoCupon] = useState('');

  const total = subtotal - descuento;

  const handlePagar = () => {
    alert('Ir a pagar (aquí implementas la lógica de pago).');
  };

  const handleAplicarCupon = () => {
    if (codigoCupon.trim().toUpperCase() === 'BIENVENIDA') {
      setDescuento(2000);
    } else {
      setDescuento(0);
      alert('Cupón no válido o expirado.');
    }
  };

  return (
    <section className="cart">
      <div className="cart-container">
        <h1>Carrito de Compras</h1>

        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-details">
                    <h3>{item.nombre}</h3>
                    <p>${Number(item.precio).toLocaleString()}</p>
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarDelCarrito(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-coupon">
              <label htmlFor="coupon">Cupón de descuento:</label>
              <input
                type="text"
                id="coupon"
                placeholder="Ingresa tu cupón"
                value={codigoCupon}
                onChange={(e) => setCodigoCupon(e.target.value)}
              />
              <button className="btn-aplicar" onClick={handleAplicarCupon}>
                Aplicar
              </button>
            </div>

            <div className="cart-summary">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              {descuento > 0 && (
                <div className="summary-line">
                  <span>Descuento</span>
                  <span>${descuento.toLocaleString()}</span>
                </div>
              )}
              <div className="summary-line total">
                <span>TOTAL</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            <button className="btn-pagar" onClick={handlePagar}>
              Pagar ahora
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;


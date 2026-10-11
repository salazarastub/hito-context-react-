import React, { useState } from 'react';
import { pizzaCart } from './pizzas';

const Cart = () => {
  const [cart, setCart] = useState(pizzaCart);

  const actualizarCantidad = (id, cambio) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, count: item.count + cambio } : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Carrito de compras</h2>

      {cart.length === 0 ? (
        <p>No hay pizzas en el carrito.</p>
      ) : (
        <>
          {cart.map((pizza) => (
            <div
              key={pizza.id}
              className="d-flex align-items-center justify-content-between border rounded p-3 mb-3"
            >
              <div className="d-flex align-items-center gap-3">
                <img
                  src={pizza.img}
                  alt={pizza.name}
                  style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px' }}
                />

                <div>
                  <h5 className="mb-1">{pizza.name}</h5>
                  <p className="mb-1">Precio: ${pizza.price.toLocaleString()}</p>
                  <p className="mb-0">Cantidad: {pizza.count}</p>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => actualizarCantidad(pizza.id, -1)}
                >
                  -
                </button>

                <span className="fw-bold">{pizza.count}</span>

                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => actualizarCantidad(pizza.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-4 border-top pt-3">
            <h4>Total: ${total.toLocaleString()}</h4>
            <button className="btn btn-primary">Pagar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;


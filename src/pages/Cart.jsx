import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Cart = () => {
  const { cart, total, updateQuantity, clearCart } = useCart();
  const { token } = useUser();

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Carrito de compras</h2>
        {cart.length > 0 && (
          <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
            Vaciar carrito
          </button>
        )}
      </div>

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
                  <h5 className="mb-1 text-capitalize">{pizza.name}</h5>
                  <p className="mb-1">Precio: ${Number(pizza.price || 0).toLocaleString()}</p>
                  <p className="mb-0">Cantidad: {pizza.count}</p>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => updateQuantity(pizza.id, -1)}
                >
                  -
                </button>

                <span className="fw-bold">{pizza.count}</span>

                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => updateQuantity(pizza.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-4 border-top pt-3">
            <h4 className="mb-0">Total: ${total.toLocaleString()}</h4>
            <button className="btn btn-primary" disabled={!token}>
              {token ? 'Pagar' : 'Inicia sesión para pagar'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;


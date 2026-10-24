/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { pizzaCart } from '../components/pizzas';

const CartContext = createContext(null);

const STORAGE_KEY = 'mamma-mia-cart';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : pizzaCart;
    } catch (error) {
      console.error('No se pudo leer el carrito guardado:', error);
      return pizzaCart;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (pizza) => {
    if (!pizza) return;

    setCart((prevCart) => {
      const normalizedPizza = {
        id: pizza.id || pizza.pizzaId || pizza.name,
        name: pizza.name || 'Pizza',
        price: Number(pizza.price || 0),
        img: pizza.img || '',
      };

      const existingItem = prevCart.find((item) => item.id === normalizedPizza.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === normalizedPizza.id ? { ...item, count: item.count + 1 } : item
        );
      }

      return [...prevCart, { ...normalizedPizza, count: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id !== id) return item;

          const updatedCount = item.count + change;
          return { ...item, count: updatedCount };
        })
        .filter((item) => item.count > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const itemCount = cart.reduce((sum, item) => sum + item.count, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  const value = useMemo(
    () => ({
      cart,
      itemCount,
      total,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [cart, itemCount, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }

  return context;
};

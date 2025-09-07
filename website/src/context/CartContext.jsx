// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create context
const CartContext = createContext();

// Custom hook for using the cart
export const useCart = () => {
  return useContext(CartContext);
};

// Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart (if exists, just increase qty)
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Remove item completely
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Increase qty
  const increaseQty = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Decrease qty (remove if qty becomes 0)
  const decreaseQty = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId && item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Cart total qty
  const cartQty = cart.reduce((sum, item) => sum + item.qty, 0);

  // Cart total price
  const total = cart.reduce(
    (sum, item) => sum + item.salePrice * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        cartQty,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

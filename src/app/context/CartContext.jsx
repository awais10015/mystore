"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    let addedNew = false;

    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      addedNew = true;
      return [...prev, { ...product, quantity: 1 }];
    });

    if (addedNew) {
      toast.success("Product added to Cart");
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success("Product removed to Cart");
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cleared Cart");
  };

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * parseInt(item.price),
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

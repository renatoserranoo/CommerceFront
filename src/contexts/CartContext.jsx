import React, { createContext, useState, useEffect } from "react";
import api from "../api/Api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addToCart = async (productId, quantity) => {
    try {
      const response = await api.post("/cart", { productId, quantity });
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  const getCart = async () => {
    try {
      const response = await api.get("/cart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to load cart", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await api.delete("/cart/remove", {
        params: { itemId },
      });
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        getCart,
        removeFromCart,
        setIsLoggedIn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

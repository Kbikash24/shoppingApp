import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item, size) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.name === item.name && cartItem.size === size
    );

    if (existingCartItem) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.name === item.name && cartItem.size === size
          ? { ...cartItem, qty: cartItem.qty + 1 }
          : cartItem
      );

      setCartItems(updatedCartItems);
    } else {
      const newItem = { ...item, size, qty: 1 };
      setCartItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartContextValue = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

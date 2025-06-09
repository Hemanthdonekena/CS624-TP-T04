// context/AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  const addToCart = (item) => setCart(prev => [...prev, item]);
  const removeFromCart = (itemId) => setCart(prev => prev.filter(i => i.id !== itemId));

  const placeOrder = () => {
    const order = { id: Date.now(), items: cart, status: 'Processing' };
    setOrders(prev => [...prev, order]);
    setCart([]);
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      cart, addToCart, removeFromCart,
      orders, placeOrder
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

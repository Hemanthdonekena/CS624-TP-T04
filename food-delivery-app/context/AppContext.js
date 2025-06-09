import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const placeOrder = () => {
    const newOrder = { id: Date.now(), items: cart, status: 'Preparing' };
    setOrders((prev) => [...prev, newOrder]);
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

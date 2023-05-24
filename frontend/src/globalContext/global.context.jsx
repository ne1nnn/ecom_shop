import React, { useState } from "react";

export const GlobalContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataSession, setDataSession] = useState({
    _id: "",
    name: "",
    email: "",
  });
  const [cartItems, setCartItems] = useState([]);

  const updateDataSession = (newDataSession) => {
    localStorage.setItem("user.id", newDataSession._id);
    localStorage.setItem("user.name", newDataSession.name);
    localStorage.setItem("user.email", newDataSession.email);
    console.log("session updated", newDataSession);
    setDataSession({
      _id: newDataSession._id,
      name: newDataSession.name,
      email: newDataSession.email,
    });
    setIsLoggedIn(true);
  };

  const clearDataSession = () => {
    localStorage.clear();
    setDataSession({ _id: "", name: "", email: "" });
    setIsLoggedIn(false);
  };

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (!existingProduct) {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    } else {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      setCartItems(updatedCartItems);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        dataSession,
        setDataSession,
        updateDataSession,
        clearDataSession,
        cartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

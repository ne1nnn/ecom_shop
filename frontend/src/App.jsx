import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import ProductList from "./components/products/products";
import { DataProvider } from "../src/globalContext/global.context";
import LoginForm from "./components/user/loginform/loginform";
import CartProducts from "./components/cart/cart.products";
import RegisterForm from "./components/user/registerform/registerform";
import ControlPanel from "./components/user/controlpanel/generalpanel";
import CreateProductForm from "./components/products/createnewproduct/newproductform";
import EditProductForm from "./components/products/editproduct";

const App = () => {
  const [mostrarCart, setMostrarCart] = useState(false);

  function toggleCart() {
    setMostrarCart(!mostrarCart);
  }

  return (
    <DataProvider>
      <Router>
        <div>
          <Navbar toggleCart={toggleCart} />
          {mostrarCart && <CartProducts />}
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/home" element={<ProductList />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/userpanel" element={<ControlPanel />} />
            <Route path="/create-product" element={<CreateProductForm />} />
            <Route path="/edit-product" element={<EditProductForm />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;

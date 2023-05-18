import React, { useState } from 'react';
import Navbar from "./components/navbar/navbar"
import ProductList from "./components/products/products"
import CreateProductForm from './components/products/createnewproduct/newproductform'; // Importa el formulario de creación de producto

const App = () => {
  const [showProductForm, setShowProductForm] = useState(false);

  const toggleProductForm = () => {
    setShowProductForm(!showProductForm);
  };

  return (
    <div>
      <div>
        <Navbar onUserIconClick={toggleProductForm} /> {/* Pasa la función de toggle al Navbar */}
        <ProductList />
      </div>

      {showProductForm && <CreateProductForm />} {/* Muestra el formulario si showProductForm es verdadero */}
    </div>
  );
};

export default App;

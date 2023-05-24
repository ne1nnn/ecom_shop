import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";

import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5010/products/all")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={`http://localhost:5010/images/${product.image}`}
              alt={product.title}
              className="w-full h-40 object-cover mb-4"
            />
            <h3 className="text-lg font-medium mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-2">Price: {product.price}</p>
            <p className="text-gray-600 mb-4">
              Description: {product.description}
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center px-5 py-2 rounded">
              <FaShoppingCart className="mr-4" />
              Añadir al carro
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

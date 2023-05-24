import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiPencilLine, RiDeleteBinLine } from "react-icons/ri";

const ControlPanel = () => {
  const navigate = useNavigate();

  const [editProductId, setEditProductId] = useState(null);
  const handleEditClick = (productId) => {
    setEditProductId(productId);
  };

  const CreateProductForm = () => {
    navigate("/create-product");
  };

  // Ejemplo de datos de productos
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

  const handleEdit = () => {
    navigate(`/edit-product/`);
  };

  const handleDelete = (productId) => {
    // Lógica para eliminar el producto con el ID especificado
    console.log("Eliminar producto:", productId);
  };

  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-3 bg-white-100 h-screen border border-gray rounded-lg shadow-sm shadow-black">
        <div className="px-4 text-3xl font-bold">
          <h1>Control Panel</h1>
        </div>
        <div>
          <div className="py-2 px-4">
            <button
              className="bg-blue-500 hover:bg-green-400 text-white font-bold  py-2 px-4 rounded"
              onClick={CreateProductForm}
            >
              Añadir Producto
            </button>
          </div>
        </div>
        <div>
          <div className="py-2 px-4">
            <button
              className="bg-yellow-500 hover:bg-green-400 text-white font-bold  py-2 px-4 rounded"
              onClick={CreateProductForm}
            >
              Añadir Categoria
            </button>
          </div>
        </div>
      </div>

      <div className="px-2 col-span-9 bg-white-300 h-screen">
        <h1 className="text-2xl font-bold mb-4">Listado de Productos</h1>
        <table className="w-full border border-black-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Título</th>
              <th className="px-4 py-2 border-b">Categoría</th>
              <th className="px-4 py-2 border-b">Stock</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-2 border-b border-r">{product.title}</td>
                <td className="px-4 py-2 border-b border-r">
                  {product.category}
                </td>
                <td className="px-4 py-2 border-b border-r">
                  {product.quantity}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => handleEditClick(product.id)}
                  >
                    <RiPencilLine />
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(product.id)}
                  >
                    <RiDeleteBinLine />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ControlPanel;

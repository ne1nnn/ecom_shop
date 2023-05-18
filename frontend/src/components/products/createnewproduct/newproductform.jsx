import React, { useState } from "react";
import axios from "axios";

const CreateProductForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el objeto del producto
    const newProduct = {
      title,
      price,
      image,
      description,
      quantity,
      category,
    };

    try {
      // Enviar el producto al servidor
      const response = await axios.post("/api/products", newProduct);
      console.log(response.data); // Hacer algo con la respuesta del servidor
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto max-w-md">
      <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium">
            Título del producto
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block font-medium">
            Precio
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="w-full border rounded py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block font-medium">
            URL de la imagen
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border rounded py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded py-2 px-3"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block font-medium">
            Cantidad
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full border rounded py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block font-medium">
            Categoría
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded py-2 px-3"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;

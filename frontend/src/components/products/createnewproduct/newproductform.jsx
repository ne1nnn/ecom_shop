import React, { useState } from "react";
import axios from "axios";

const CreateProductForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el objeto FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("category", category);

    try {
      // Enviar el producto al servidor
      const response = await axios.post(
        "http://localhost:5010/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Establecer el encabezado correcto para el envío de archivos
          },
        }
      );
      console.log(response.data); // Hacer algo con la respuesta del servidor
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form bg-white p-8 rounded-lg shadow-md w-1/2 mx-auto"
      encType="multipart/form-data"
    >
      <div className="mb-4">
        <label htmlFor="name" className="font-bold mb-2">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="border rounded-md border-black p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="font-bold mb-2">
          Precio:
        </label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          className="border rounded-md border-black p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="font-bold mb-2">
          Cantidad:
        </label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          className="border rounded-md border-black p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="font-bold mb-2">
          Descripción:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="border rounded-md border-black p-2 w-full"
        />
        <div className="mb-4">
          <label htmlFor="category" className="font-bold mb-2">
            Categoría:
          </label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="border rounded-md border-black p-2 w-full"
          >
            <option value="">Seleccione una categoría</option>
            {/* Agrega más opciones de categorías aquí */}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="font-bold mb-2">
          Imagen:
        </label>
        <input
          id="image"
          type="file"
          multiple
          onChange={(event) => setImage(event.target.files[0])}
          className="border rounded-md border-black p-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white p-2 px-4 rounded-md cursor-pointer mt-4 hover:bg-gray-700"
      >
        Cargar producto
      </button>
    </form>
  );
};

export default CreateProductForm;

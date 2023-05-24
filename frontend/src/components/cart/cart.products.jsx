import React, { useContext } from "react";
import { GlobalContext } from "../../globalContext/global.context";

import { FaShoppingCart } from "react-icons/fa";

function Cart() {
  const { cartItems, removeFromCart } = useContext(GlobalContext);

  const handleDelete = (id) => {
    removeFromCart(id);
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed right-0 top-20 bottom-20 w-1/4 bg-gray-100 z-10 p-5 rounded shadow">
      <div className="flex items-center mb-5">
        <FaShoppingCart className="text-2xl mr-2" />
        <h1 className="text-lg font-bold">Carrito de productos</h1>
      </div>
      <table className="w-full mb-5">
        <thead>
          <tr>
            <th className="p-2">Producto</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Cant.</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((producto, index) => (
            <tr key={index}>
              <td className="p-2">{producto.title}</td>
              <td className="p-2">${producto.price}</td>
              <td className="p-2">{producto.quantity}</td>
              <td className="p-2">
                <button
                  className="px-2 py-1 bg-black text-white rounded"
                  onClick={() => handleDelete(producto.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between text-lg font-bold">
        Total: ${total}
        <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-black">
          Pagar
        </button>
      </div>
    </div>
  );
}

export default Cart;

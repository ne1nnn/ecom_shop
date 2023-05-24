import React from "react";
import { useNavigate } from "react-router-dom";

import { RiHome2Line, RiUserLine, RiShoppingCartLine } from "react-icons/ri";

const Navbar = ({ toggleCart }) => {
  const navigate = useNavigate();
  const goUserPanel = () => {
    navigate("/login");
  };
  const goHome = () => {
    navigate("/home");
  };
  const cartProducts = () => {
    toggleCart();
  };

  return (
    <nav className="bg-gray-800 py-6 px-4 rounded-lg mb-8">
      <ul className="flex items-center justify-between">
        <li>
          <button
            className="flex items-center text-white focus:outline-none hover:bg-gray-700 rounded-lg p-2"
            onClick={goHome}
          >
            <RiHome2Line className="h-8 w-8 mr-2" />
            <span>Home</span>
          </button>
        </li>
        <li>
          <button
            className="flex items-center text-white focus:outline-none hover:bg-gray-700 rounded-lg p-2"
            onClick={cartProducts}
          >
            <RiShoppingCartLine className="h-8 w-8 mr-2" />
            <span>Cart</span>
          </button>
        </li>
        <li>
          <button
            className="flex items-center text-white focus:outline-none hover:bg-gray-700 rounded-lg p-2"
            onClick={goUserPanel}
          >
            <RiUserLine className="h-8 w-8 mr-2" />
            <span>Panel de Control</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

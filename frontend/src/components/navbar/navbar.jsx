import React from 'react';
import { FaHome, FaUser, FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ onUserIconClick }) => { // Recibe la función onUserIconClick como prop
  return (
    <nav className="bg-gray-800 py-4">
      <ul className="flex items-center justify-between p-4">
        <li>
          <FaHome className="text-white" />
        </li>
        <li>
          <FaUser className="text-white" onClick={onUserIconClick} /> {/* Agrega el evento onClick */}
        </li>
        <li>
          <FaShoppingCart className="text-white" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../globalContext/global.context";
import axios from "axios";

export default function LoginForm() {
  // Global
  const { setIsLoading, isLoggedIn, updateDataSession } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  // Form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) navigate("/userpanel");
  }, [isLoggedIn, navigate]);

  const goRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5010/user/login`, {
        email,
        password,
      })
      .then(
        (response) => {
          console.log("[login] response api", response.data);
          if (response.data.status === 1) {
            const user = response.data.data;
            updateDataSession(user);
          } else {
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {});
  };

  return (
    <div className="animate-zoomIn-fast login-form-container transition-all duration-200">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8">
        <h2 className="mb-6 text-2xl font-bold">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-bold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="border rounded-md border-black p-2 w-full"
            placeholder="ejemplo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-bold">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            className="border rounded-md border-black p-2 w-full"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-black text-white p-2 px-4 rounded-md cursor-pointer mt-4 hover:bg-gray-700">
          Iniciar Sesión
        </button>
      </form>
      <p className="text-sm text-blue-500 cursor-pointer" onClick={goRegister}>
        ¿No tienes una cuenta? Regístrate aquí
      </p>
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../../globalContext/global.context";

export default function RegisterForm() {
  // Global
  const { isLoggedIn, updateDataSession } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/userpanel");
  }, [isLoggedIn, navigate]);

  const goLogin = () => {
    navigate("/login");
  };

  // Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return;
    }
    if (!passwordsMatch) {
      return;
    }

    axios
      .post(`http://localhost:5010/user/register`, {
        name,
        email,
        password,
      })
      .then(
        (response) => {
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
        <h2 className="mb-6 text-2xl font-bold">Registro</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-bold">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            className="border rounded-md border-black p-2 w-full"
            placeholder="Ingrese su nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2 font-bold">
            Confirmar contraseña:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={`border rounded-md border-black p-2 w-full ${
              !passwordsMatch ? "border-red-500" : ""
            }`}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordsMatch(e.target.value === password);
            }}
          />
          {!passwordsMatch && (
            <span className="text-red-500 text-sm">
              Las contraseñas no coinciden
            </span>
          )}
        </div>
        <button
          className="bg-blue-500 text-white font-bold rounded-md py-2 px-4 hover:bg-blue-600"
          type="submit"
        >
          Registrarme
        </button>
      </form>
      <p
        className="mt-4 text-sm text-blue-500 cursor-pointer"
        onClick={goLogin}
      >
        ¿Ya tienes una cuenta? Inicia sesión aquí
      </p>
    </div>
  );
}

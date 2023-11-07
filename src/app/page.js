"use client";
import Image from "next/image";
import { useState } from "react";
import Axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [dir, setDir] = useState("");
  const [tel, setTel] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios.post("/api/user", {
        name,
        address: dir,
        phone: tel,
      });

      if (res.statusText === "OK") return router.push("/dashboard");
    } catch (error) {
      setError(error.response?.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        Biblioteca
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Ingresa
          </h1>
          {error && (
            <div className="bg-red-500 text-white p-2 mb-2">{error}</div>
          )}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tu nombre
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="string"
                name="nombre"
                id="nombre"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Gabriel Mora"
                required=""
              />
            </div>
            <div>
              <label
                for="string"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Direccion
              </label>
              <input
                onChange={(e) => setDir(e.target.value)}
                type="string"
                name="direccion"
                id="direccion"
                placeholder="Bayamon #123"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div>
              <label
                for="string"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Telefono
              </label>
              <input
                onChange={(e) => setTel(e.target.value)}
                type="Number"
                name="telefono"
                id="telefono"
                placeholder="321000000"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>

            <button className="w-full text-black bg-gray-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Ingresa
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

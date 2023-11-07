"use client";
import { useEffect, useState } from "react";
import Libro from "../components/Libro";
import AddLibro from "../components/AddLibro";
import AddLoan from "../components/AddLoan";
import ReturnLoan from "../components/ReturnLoan";
import Axios from "axios";
import Link from "next/link";

export default function page() {
  const [libros, setLibro] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormLoan, setShowFormLoan] = useState(false);
  const [showReturnLoan, setShowReturnLoan] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await Axios.get(`/api/book`);
      setLibro(res.data);
    } catch (error) {
      console.log("hay un error");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="h-screen bg-gray-100 p-10">
      <div className="bg-white p-4 rounded-md shadow-md mb-6">
        <input
          className="w-full p-2 rounded border border-gray-300"
          type="text"
          placeholder="Buscar libros por título o autor..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {libros
          ?.filter((libro) => {
            const searchLower = searchTerm.toLowerCase();
            return (
              libro.title.toLowerCase().includes(searchLower) ||
              libro.author.toLowerCase().includes(searchLower)
            );
          })
          .map((item, index) => (
            <Libro key={index} book={item} />
          ))}
      </div>

      <div className="bg-white p-4 rounded-md shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Gestión de Libros</h2>
        <button
          onClick={() => setShowForm(!showForm)} // Alterna la visibilidad del formulario
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Agregar Libro
        </button>
        {showForm && <AddLibro />}{" "}
        {/* Renderiza el formulario solo si showForm es true */}
      </div>

      <div className="bg-white p-4 rounded-md shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Prestar y Devolver Libros
        </h2>
        <button
          onClick={() => setShowFormLoan(!showFormLoan)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Prestar Libro
        </button>
        <button
          onClick={() => setShowReturnLoan(!showReturnLoan)}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Devolver Libro
        </button>
        {showReturnLoan && <ReturnLoan />}
        {showFormLoan && <AddLoan />}
      </div>

      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Registro de Usuarios</h2>
        <Link
          href={"/"}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Registrar Usuario
        </Link>
      </div>
    </div>
  );
}

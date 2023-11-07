import React, { useEffect, useState } from "react";
import axios from "axios";

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState({});
  const [books, setBooks] = useState({});

  // Función para cargar todos los préstamos
  const fetchLoans = async () => {
    try {
      const response = await axios.get("/api/loan"); // Reemplaza con tu endpoint correcto
      setLoans(response.data);

      // Ahora carga los detalles de usuarios y libros para cada préstamo
      response.data.forEach((loan) => {
        
        fetchUser(loan.user._id);
        fetchBook(loan.book._id);
        
      });
    } catch (error) {
      console.error("Error al cargar los préstamos:", error);
    }
  };

  // Función para obtener detalles del usuario por ID
  const fetchUser = async (userId) => {
    if (users[userId]) return; // Si ya se cargaron, no hacer nada

    try {
      const response = await axios.get(`/api/user/${userId}`); // Reemplaza con tu endpoint correcto
      setUsers((prev) => ({ ...prev, [userId]: response.data }));
    } catch (error) {
      console.error("Error al cargar el usuario:", error);
    }
  };

  // Función para obtener detalles del libro por ID
  const fetchBook = async (bookId) => {
    if (books[bookId]) return; // Si ya se cargaron, no hacer nada

    try {
      const response = await axios.get(`/api/book/${bookId}`); // Reemplaza con tu endpoint correcto
      setBooks((prev) => ({ ...prev, [bookId]: response.data }));
    } catch (error) {
      console.error("Error al cargar el libro:", error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {loans.map((loan, index) => (
        <div
          key={index}
          className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-2"
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              {books[loan.book._id]?.title || "Cargando..."}
            </div>
            <p className="text-gray-700 text-base">
              Prestado a: {users[loan.user._id]?.name || "Cargando..."}
            </p>
            {/* Aquí podrías incluir más información del préstamo si fuera necesario */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanList;

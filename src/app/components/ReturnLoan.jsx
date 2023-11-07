import React, { useEffect, useState } from "react";
import axios from "axios";

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState({});
  const [books, setBooks] = useState({});


  const handleReturn = async (loanId) => {
    try {
      // Realiza una solicitud PUT al endpoint de devolución
      await axios.put(`/api/loan`,{
        loanId:loanId
      });
      // Actualiza la lista de préstamos después de la devolución
      fetchLoans();
    } catch (error) {
      console.error("Error al devolver el libro:", error);
    }
  };

  // Función para cargar todos los préstamos
  const fetchLoans = async () => {
    try {
      const response = await axios.get("/api/loan"); // Reemplaza con tu endpoint correcto
      // Filtrar los préstamos que tienen el estado 'PRESTADO'
      const filteredLoans = response.data.filter(loan => loan.status === 'PRESTADO');
      setLoans(filteredLoans);

      // Cargar detalles de usuarios y libros para los préstamos filtrados
      filteredLoans.forEach((loan) => {
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
      const response = await axios.get(`/api/books/${bookId}`); // Reemplaza con tu endpoint correcto
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
            {loan.status === 'PRESTADO' && (
              <button
                onClick={() => handleReturn(loan._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Devolver
              </button>
            )}
            {/* Aquí podrías incluir más información del préstamo si fuera necesario */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoanBookForm = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedBook, setSelectedBook] = useState('');

  useEffect(() => {
    // Cargar usuarios
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user'); // Asegúrate de que esta es la URL correcta para tu API
        setUsers(response.data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    // Cargar libros
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/book'); // Asegúrate de que esta es la URL correcta para tu API
        setBooks(response.data);
      } catch (error) {
        console.error('Error al cargar libros:', error);
      }
    };

    fetchUsers();
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(selectedUser,selectedBook)
      // Aquí enviarías la información del préstamo a tu API
      const payload = { user: selectedUser, book: selectedBook };
      const response = await axios.post('/api/loan', payload); // Asegúrate de que esta es la URL correcta para tu API
      console.log(response.data);
      // Aquí podrías manejar la respuesta como resetear el formulario o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al realizar el préstamo:', error.response);
      // Aquí podrías manejar el error como mostrar un mensaje al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="user" className="block text-gray-700 text-sm font-bold mb-2">
          Seleccionar usuario:
        </label>
        <select
          id="user"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded shadow-inner"
          required
        >
          <option value="">-- Elija un usuario --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="book" className="block text-gray-700 text-sm font-bold mb-2">
          Seleccionar libro:
        </label>
        <select
          id="book"
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded shadow-inner"
          required
        >
          <option value="">-- Elija un libro --</option>
          {books.map((book) => (
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Realizar préstamo
      </button>
    </form>
  );
};

export default LoanBookForm;

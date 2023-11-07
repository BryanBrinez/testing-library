import React, { useState } from 'react';
import axios from 'axios';

const BookForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [copies, setCopies] = useState(0);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Asegúrate de reemplazar la URL con la URL correcta de tu API
      const response = await axios.post('/api/book', {
        title,
        author,
        copiesAvailable: copies 
      });
      console.log(response.data);
      // Aquí puedes manejar la respuesta, como limpiar el formulario o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al enviar el formulario:', error.response);
      // Aquí puedes manejar el error, como mostrar un mensaje al usuario
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            
            onChange={(e) => setAuthor(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="copiesAvailable" className="block text-gray-700 text-sm font-bold mb-2">Copies Available:</label>
          <input
            type="number"
            id="copiesAvailable"
            name="copiesAvailable"
            onChange={(e) => setCopies(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookForm;

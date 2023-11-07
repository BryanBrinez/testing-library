import React from "react";
import Axios from "axios";

const BookCard = ({ book }) => {
  // No es necesario el estado para ID si se pasa como prop y no cambia

  const deleteBook = async () => {
    try {
      // Asegúrate de que la URL es correcta y de que la ruta del backend esté esperando el ID en esta forma
      const response = await Axios.delete(`/api/book/${book._id}`);
      console.log(response.data);
      // Aquí podrías agregar lógica para actualizar la UI después de borrar el libro
    } catch (error) {
      console.error("Error al borrar el libro:", error.response);
      // Aquí podrías manejar el error, como mostrar un mensaje al usuario
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-2">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{book.title}</div>
        <p className="text-gray-700 text-base">Author: {book.author}</p>
        <p className="text-gray-600 text-base">
          Copies Available: {book.copiesAvailable}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          onClick={deleteBook}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

export default BookCard;

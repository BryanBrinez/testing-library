import { NextResponse } from "next/server";
import { connectDB } from "../../../../libs/mongodb";

import BOOK from "../../../../models/libros";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const { id } = params; // Asumiendo que el parámetro se llama 'id'

    const bookFound = await BOOK.findById(id); // Encuentra el libro por ID

    if (!bookFound) {
      return new Response(JSON.stringify({ message: "Book not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(bookFound), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Si hay un error al buscar por ID, podría ser debido a un formato de ID inválido
    if (error.name === 'CastError') {
      return new Response(JSON.stringify({ message: "Invalid book ID format" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // Otros errores no capturados
    return new Response(JSON.stringify({ message: "Failed to fetch book", error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

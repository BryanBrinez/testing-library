import { NextResponse } from "next/server";
import { connectDB } from "../../../libs/mongodb";

import BOOK from "../../../models/libros";

export async function POST(request) {
  const { title, author, copiesAvailable } = await request.json();

  console.log(title, author, copiesAvailable);

  try {
    await connectDB();

    const newBook = new BOOK({
      title,
      author,
      copiesAvailable,
    });

    const savedBook = await newBook.save();

    //console.log(savedBook);

    return NextResponse.json(savedBook);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 400 }
      );
    }
  }
}

// Suponiendo que se use un ID de libro en la URL como '/api/books/:id'
export async function DELETE(request) {
  
  
  try {
    await connectDB();


    // Extracción del ID del libro desde la URL (ajustar según tu implementación de routing)
    const { bookId } = await request.json();

    console.log("entroooo")
    console.log(bookId)

    // Si no se proporciona un ID, retornar error
    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      );
    }

    await BOOK.findByIdAndDelete(bookId);

    return NextResponse.json({ message: "Book successfully deleted" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}


export const GET = async (request) => {
  try {
    await connectDB();
    

    

    const searchFound = await BOOK.find();

    return NextResponse.json(searchFound);
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
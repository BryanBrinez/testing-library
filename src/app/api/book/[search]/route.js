import { NextResponse } from "next/server";
import { connectDB } from "../../../../libs/mongodb";

import BOOK from "../../../../models/libros";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const { search } = params;

    

    const searchFound = await BOOK.findOne({
        $or: [
          
          { author: new RegExp(search, 'i') },
          { title: new RegExp(search, 'i') },
          
        ]
      });

    return NextResponse.json(searchFound);
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};


export async function DELETE(request,{ params }) {
  
  
  try {
    await connectDB();


    // Extracción del ID del libro desde la URL (ajustar según tu implementación de routing)
    const { search } = await params;

    console.log("entroooo")
    console.log(search)

    // Si no se proporciona un ID, retornar error
    if (!search) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      );
    }

    await BOOK.findByIdAndDelete(search);

    return NextResponse.json({ message: "Book successfully deleted" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}
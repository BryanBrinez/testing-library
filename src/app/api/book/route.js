import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";

import BOOK from "@/models/libros";

export async function POST(request) {
  const {
    title,
    author,
    copiesAvailable,
    
  } = await request.json();

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
import { NextResponse } from "next/server";
import { connectDB } from "../../../libs/mongodb";
import USUARIOS from "../../../models/usuarios";
import LOAN from "../../../models/prestamos";
import BOOK from "../../../models/libros";


export const GET = async () => {
  try {
    await connectDB();

    // Encuentra todos los préstamos y realiza un join con las colecciones de libros y usuarios
    // Asumiendo que 'book' y 'user' son ObjectId que hacen referencia a sus respectivas colecciones
    const loans = await LOAN.find()
      .populate('book')
      .populate('user');

    return new Response(JSON.stringify(loans), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to fetch loans", error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
export async function POST(request) {
  const { book, user } = await request.json();

  //console.log(title, author, copiesAvailable);

  try {
    await connectDB();

    // Validar que el libro y el usuario existen
    const bookExists = await BOOK.findById(book);
    const userExists = await USUARIOS.findById(user);

   // console.log(bookExists);
    //console.log(userExists);

    if (!bookExists || !userExists) {
      return NextResponse.json(
        {
          message: "Libro o usuario no encontrado.",
        },
        { status: 404 }
      );
    }

    // Verificar la disponibilidad del libro
    if (bookExists.copiesAvailable <= 0) {
      return NextResponse.json(
        {
          message: "No hay copias disponibles del libro.",
        },
        { status: 400 }
      );
    }

    //console.log("antes del copies");
    // Disminuir la cantidad de copias disponibles en 1
    try {
      bookExists.copiesAvailable -= 1;
      await bookExists.save();
    } catch (error) {
      console.log("Error saving book:", error);
    }

   // console.log("despues del copies");

    const loan = new LOAN({
      book,
      user,
      status: "PRESTADO",
    });

    //console.log(loan, "llega al loan");

    try {
       await loan.save();
    } catch (error) {
      console.log("Error saving book:", error);
    }


    

    return NextResponse.json({
      message: "Prestamo hecho correctamente",
    });
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

export async function PUT(request) {
  const { loanId } = await request.json();
  console.log(loanId);

  try {
    await connectDB();

    // Validar que el préstamo exista
    const loanExists = await LOAN.findById(loanId);
    
    console.log("no falla")
    console.log(loanExists)

    if (!loanExists) {
      return NextResponse.json(
        {
          message: "Préstamo no encontrado.",
        },
        { status: 404 }
      );
    }

    // Verificar si el préstamo ya fue devuelto
    if (loanExists.status === "devuelto") {
      return NextResponse.json(
        {
          message: "El libro ya fue devuelto previamente.",
        },
        { status: 400 }
      );
    }

    // Actualizar el estado del préstamo a "devuelto"
    loanExists.status = "devuelto";
    await loanExists.save();

    // Aumentar la cantidad de copias disponibles del libro en 1
    const bookToReturn = await BOOK.findById(loanExists.book);
    bookToReturn.copiesAvailable += 1;
    await bookToReturn.save();

    return NextResponse.json({
      message: "Devolución realizada correctamente",
    });
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

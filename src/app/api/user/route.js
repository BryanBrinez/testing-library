import { NextResponse } from "next/server";
import { connectDB } from "../../../libs/mongodb";

import USUARIOS from "../../../models/usuarios";

export async function POST(request) {
  const { name, address, phone } = await request.json();

  if (!name) {
    return NextResponse.json(
      {
        message: "Name is required",
      },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const newUser = new USUARIOS({
      name,
      address,
      phone,
    });

    const savedUser = await newUser.save();

    //console.log(savedBook);

    return NextResponse.json({ status: 200 });
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


export async function GET() {
  try {
    await connectDB();

    const users = await USUARIOS.find({}); // Encuentra todos los usuarios en la base de datos

    return new Response(
      JSON.stringify(users),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
import { NextResponse } from "next/server";
import { connectDB } from "../../../../libs/mongodb";

import USUARIO from "../../../../models/usuarios";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const { id } = params; // Asumiendo que el parámetro se llama 'userId'

    const userFound = await USUARIO.findById(id); // Encuentra el usuario por ID

    if (!userFound) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(userFound), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to fetch user" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

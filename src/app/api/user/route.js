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

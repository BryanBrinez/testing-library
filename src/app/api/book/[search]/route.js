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
          { title: new RegExp(search, 'i') }
        ]
      });

    return NextResponse.json(searchFound);
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

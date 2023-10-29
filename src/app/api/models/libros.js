import { Schema, model, models } from "mongoose";

const bookSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    copiesAvailable: {
      type: Number,
      default: 0,
    },
  });

const BOOK = models.BOOK || model("BOOK", bookSchema);
export default BOOK;

// models/Loan.js
import { Schema, model, models } from "mongoose";

const loanSchema = Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'BOOK',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'USUARIO',
    required: true,
  },
  status: String,
  loanDate: {
    type: Date,
    default: Date.now,
  },

  // ... otros campos que necesites
});

const LOAN = models.LOAN || model("LOAN", loanSchema);
export default LOAN;


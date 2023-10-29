import { Schema, model, models } from "mongoose";

const usuarioSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  phone: String,
  // ... otros campos que necesites
});


const USUARIO = models.USUARIO || model("USUARIO", usuarioSchema);
export default USUARIO;

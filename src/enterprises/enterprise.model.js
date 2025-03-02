import { Schema, model } from "mongoose";

const EnterpriseSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      maxLength: [50, "No puede exceder los 50 caracteres"],
      trim: true,
    },
    nivelImpacto: {
      type: String,
      required: [true, "El nivel de impacto es obligatorio"],
      enum: ["Alto", "Medio", "Bajo"],
    },
    aniosTrayectoria: {
      type: Number,
      required: [true, "Los años de trayectoria son obligatorios"],
      min: [0, "No puede ser un número negativo"],
    },
    categoriaEmpresarial: {
      type: String,
      required: [true, "La categoría empresarial es obligatoria"],
      trim: true,
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

EnterpriseSchema.methods.toJSON = function () {
  const { __v, _id, ...empresa } = this.toObject();
  empresa.uid = _id;
  return empresa;
};

export default model("Enterprise", EnterpriseSchema);

import { Schema, model, models } from "mongoose";

const ConsoleTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.ConsoleType || model("ConsoleType", ConsoleTypeSchema);

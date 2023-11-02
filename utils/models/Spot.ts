import { Schema, model, models } from "mongoose";

const SpotSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    console: {
      type: Schema.Types.ObjectId,
      ref: "Console",
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Spot || model("Spot", SpotSchema);

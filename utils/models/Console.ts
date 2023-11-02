import { Schema, model, models } from "mongoose";

const ConsoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "ConsoleType",
    },
    image: {
      type: String,
      required: true,
    },
    spot: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    games: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default models.Console || model("Console", ConsoleSchema);

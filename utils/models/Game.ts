import { Schema, model, models } from "mongoose";

const GameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    consoleType: {
      type: Schema.Types.ObjectId,
      ref: "ConsoleType",
    },
    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },
    console: {
      type: Schema.Types.ObjectId,
      ref: "Console",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Game || model("Game", GameSchema);

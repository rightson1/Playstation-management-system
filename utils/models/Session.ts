import { Schema, model, models } from "mongoose";

const SessionSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["current", "completed", "cancelled"],
      default: "current",
    },
    players: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: false,
      default: [],
    },
    startTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endTime: {
      type: Date,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    console: {
      type: Schema.Types.ObjectId,
      ref: "Console",
      required: true,
    },
    spot: {
      type: Schema.Types.ObjectId,
      ref: "Spot",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Session || model("Session", SessionSchema);

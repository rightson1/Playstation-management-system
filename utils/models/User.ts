import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
    },

    photoURL: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.User || model("User", UserSchema);

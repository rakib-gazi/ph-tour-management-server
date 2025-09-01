import { model, Schema } from "mongoose";
import { IUser } from "./users.interface";

const usersSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
      trim: true,
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


export const User = model<IUser>("User", usersSchema);

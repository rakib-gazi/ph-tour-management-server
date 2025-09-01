import { model, Schema } from "mongoose";
import { IDeposit } from "./deposit.interface";

const depositSchema = new Schema<IDeposit>(
  {
    member: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "The member is required"],
      trim: true,
    },
    amount: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: "Amount must positive number",
      },
      required: [true, "The Amount is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Deposit = model<IDeposit>("Deposit", depositSchema);

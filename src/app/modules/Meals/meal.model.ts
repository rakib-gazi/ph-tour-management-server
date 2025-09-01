import { model, Schema } from "mongoose";
import { IMeal } from "./meal.interface";

const mealSchema = new Schema<IMeal>(
  {
    meals: [
      {
        member: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: [true, "The member is required"],
          trim: true,
        },
        meal: {
          type: String,
          required: [true, "The meal is required"],
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Meal = model<IMeal>("Meal", mealSchema);

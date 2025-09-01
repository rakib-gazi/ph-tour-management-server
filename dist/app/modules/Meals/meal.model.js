"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meal = void 0;
const mongoose_1 = require("mongoose");
const mealSchema = new mongoose_1.Schema({
    meals: [
        {
            member: {
                type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    versionKey: false,
    timestamps: true,
});
exports.Meal = (0, mongoose_1.model)("Meal", mealSchema);

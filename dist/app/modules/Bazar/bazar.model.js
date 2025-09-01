"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bazar = void 0;
const mongoose_1 = require("mongoose");
const bazarSchema = new mongoose_1.Schema({
    member: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    versionKey: false,
    timestamps: true,
});
exports.Bazar = (0, mongoose_1.model)("Bazar", bazarSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_model_1 = require("./users.model");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.post("/", async (req, res) => {
    try {
        const body = req.body;
        const user = await users_model_1.User.create(body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
});
exports.userRoutes.get("/", async (req, res) => {
    try {
        const users = await users_model_1.User.find();
        res.status(200).json({
            success: true,
            message: "users retrieved successfully",
            data: users,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Data Not Found",
            success: false,
            error: error,
        });
    }
});
exports.userRoutes.put("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedBody = req.body;
        const user = await users_model_1.User.findByIdAndUpdate(userId, updatedBody, {
            new: true,
        });
        if (!user) {
            res.status(404).json({
                success: false,
                message: `User not found`,
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "user updated successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
});
exports.userRoutes.delete("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await users_model_1.User.findByIdAndDelete(userId);
        if (!user) {
            res.status(404).json({
                success: false,
                message: `user not found`,
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "user deleted  successfully",
            data: user ? null : user,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
});

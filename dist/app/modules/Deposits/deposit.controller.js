"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositRoutes = void 0;
const express_1 = __importDefault(require("express"));
const deposit_model_1 = require("./deposit.model");
exports.depositRoutes = express_1.default.Router();
exports.depositRoutes.post("/", async (req, res) => {
    try {
        const body = req.body;
        const deposit = await deposit_model_1.Deposit.create(body);
        res.status(201).json({
            success: true,
            message: "Deposited successfully",
            data: deposit,
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
exports.depositRoutes.get("/", async (req, res) => {
    try {
        const deposits = await deposit_model_1.Deposit.find()
            .populate("member", "name")
            .sort({ createdAt: 1 });
        res.status(200).json({
            success: true,
            message: "Deposits retrieved successfully",
            data: deposits,
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
exports.depositRoutes.put("/:depositId", async (req, res) => {
    try {
        const depositId = req.params.depositId;
        const updatedBody = req.body;
        const deposit = await deposit_model_1.Deposit.findByIdAndUpdate(depositId, updatedBody, {
            new: true,
        });
        if (!deposit) {
            res.status(404).json({
                success: false,
                message: `Deposit not found`,
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Deposit updated successfully",
            data: deposit,
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
exports.depositRoutes.delete("/:depositId", async (req, res) => {
    try {
        const depositId = req.params.depositId;
        const deposit = await deposit_model_1.Deposit.findByIdAndDelete(depositId);
        if (!deposit) {
            res.status(404).json({
                success: false,
                message: `Deposit not found`,
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted  successfully",
            data: deposit ? null : deposit,
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
